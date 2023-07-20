import {server, rest} from 'test/server'
import {client, apiURL} from '../api-client'
import { endpoint, customConfig, testPostRequest} from 'utils/helpers'
import {queryCache} from 'react-query'
import * as auth from 'auth-provider'

jest.mock('react-query')
jest.mock('auth-provider')

// 🐨 flesh these out:
describe('client works happy path', () => {

  beforeAll(() => server.listen())
  afterAll(() => server.close())
  afterEach(() => server.resetHandlers())

  test('makes GET requests to the given endpoint', async () => {
    const endpoint = 'test-endpoint'
    const mockResult = {mockValue: 'VALUE'}
    server.use(
      rest.get(`${apiURL}/${endpoint}`, async (req, res, ctx) => {
        return res(ctx.json(mockResult))
      }),
    )
  
    const result = await client(endpoint)
  
    expect(result).toEqual(mockResult)
  })
  
  test('adds auth token when a token is provided', async () => {
    const token = 'A_COMPLETELY_REAL_TOKEN'
  
    let request
    const endpoint = 'test-endpoint'
    const mockResult = {mockValue: 'VALUE'}
    server.use(
      rest.get(`${apiURL}/${endpoint}`, async (req, res, ctx) => {
        request = req
        return res(ctx.json(mockResult))
      }),
    )
  
    await client(endpoint, {token})
  
    expect(request.headers.get('Authorization')).toBe(`Bearer ${token}`)
  })
  
  
  test('allows for config overrides', async () => {
    let request
    const endpoint = 'test-endpoint'
    const mockResult = {mockValue: 'VALUE'}
    server.use(
      rest.put(`${apiURL}/${endpoint}`, async (req, res, ctx) => {
        request = req
        return res(ctx.json(mockResult))
      }),
    )
    await client(endpoint, customConfig)
    expect(request.headers.get('Content-Type')).toBe(
      customConfig.headers['Content-Type'],
    )
  })
  
  test(
    'when data is provided, it is stringified and the method defaults to POST', async () => {
      testPostRequest(endpoint)

      const data = {a: 'b'}
      const result = await client(endpoint, {data})
    
      expect(result).toEqual(data)
    })


test('automatically logs the user out if a request returns a 401', async () => {
  const endpoint = 'test-endpoint'
  const mockResult = {mockValue: 'VALUE'}
  server.use(
    rest.get(`${apiURL}/${endpoint}`, async (req, res, ctx) => {
      return res(ctx.status(401), ctx.json(mockResult))
    }),
  )

  const error = await client(endpoint).catch(e => e)

  expect(error.message).toMatchInlineSnapshot(`"Please re-authenticate."`)

  expect(queryCache.clear).toHaveBeenCalledTimes(1)
  expect(auth.logout).toHaveBeenCalledTimes(1)
})

test('correctly rejects the promise if there is an error', async () => {
  const endpoint = 'test-endpoint'
  const testError = {message: 'Test error'}
  server.use(
    rest.get(`${apiURL}/${endpoint}`, async (req, res, ctx) => {
      return res(ctx.status(400), ctx.json(testError))
    }),
  )

  await expect(client(endpoint)).rejects.toEqual(testError)
})

})

