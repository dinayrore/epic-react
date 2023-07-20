import {server, rest} from 'test/server'
import { apiURL } from './api-client'

export const endpoint = 'test-endpoint'

export const customConfig = {
  method: 'PUT',
  headers: {'Content-Type': 'fake-type'},
}

export const testPostRequest = async (endpoint) => {
   return server.use(
        rest.post(`${apiURL}/${endpoint}`, async (req, res, ctx) => {
          return res(ctx.json(req.body))
        }),
      )
}

