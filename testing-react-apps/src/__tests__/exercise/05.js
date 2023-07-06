// mocking HTTP requests
// http://localhost:3000/login-submission

import * as React from 'react'
// 🐨 you'll need to grab waitForElementToBeRemoved from '@testing-library/react'
import {render, screen, waitForElementToBeRemoved} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import {build, fake} from '@jackfranklin/test-data-bot'
// 🐨 you'll need to import rest from 'msw' and setupServer from msw/node
import {rest} from 'msw'
import {setupServer} from 'msw/node'
import Login from '../../components/login-submission'
import {handlers} from 'test/server-handlers'


const buildLoginForm = build({
  fields: {
    username: fake(f => f.internet.userName()),
    password: fake(f => f.internet.password()),
  },
})

// 🐨 get the server setup with an async function to handle the login POST request:
const server = setupServer(...handlers)

// 🐨 before all the tests, start the server with `server.listen()`
beforeAll(() => {
  server.listen()
})

afterEach(() => server.resetHandlers())

// 🐨 after all the tests, stop the server with `server.close()`
 afterAll(() => {
  server.close()
 })

 describe('login form', () => {
  test(`logging in displays the user's username`, async () => {
    render(<Login />)
    const {username, password} = buildLoginForm()
  
    await userEvent.type(screen.getByLabelText(/username/i), username)
    await userEvent.type(screen.getByLabelText(/password/i), password)
    // 🐨 uncomment this and you'll start making the request!
    await userEvent.click(screen.getByRole('button', {name: /submit/i}))
    // 🐨 wait for the loading spinner to be removed using waitForElementToBeRemoved
    await waitForElementToBeRemoved(() => screen.getByLabelText(/loading/i))
    // 🐨 assert that the username is on the screen
    expect(screen.getByText(username)).toBeVisible()
  
  })

  test(`logging in without a password displays an error`, async () => {
    render(<Login />)
    const {username} = buildLoginForm()
  
    await userEvent.type(screen.getByLabelText(/username/i), username)
    await userEvent.click(screen.getByRole('button', {name: /submit/i}))  
    await waitForElementToBeRemoved(() => screen.getByLabelText(/loading/i))
   
    expect(screen.getByText('password required')).toBeVisible()
  })

  test(`logging in without a password displays an error`, async () => {
    render(<Login />)
    const {password } = buildLoginForm()
  
    await userEvent.type(screen.getByLabelText(/password/i), password)
    await userEvent.click(screen.getByRole('button', {name: /submit/i}))  
    await waitForElementToBeRemoved(() => screen.getByLabelText(/loading/i))

    expect(screen.getByText('username required')).toBeVisible()
  })

  test('unknown server error displays the error message', async () => {
    const testErrorMessage = 'Oh no, something bad happened'
    server.use(
      rest.post(
        'https://auth-provider.example.com/api/login',
        async (request, response, context) => {
          return response(context.status(500), context.json({message: testErrorMessage}))
        },
      ),
    )
    render(<Login />)
    await userEvent.click(screen.getByRole('button', {name: /submit/i}))
  
    await waitForElementToBeRemoved(() => screen.getByLabelText(/loading/i))
  
    expect(screen.getByRole('alert')).toHaveTextContent(testErrorMessage)
  })  
 })

