import '@testing-library/jest-dom'
import {server} from 'test/server'
import '@testing-library/jest-dom/extend-expect'
import {act, waitFor} from '@testing-library/react'
import {queryCache} from 'react-query'
import * as auth from 'auth-provider'
import * as usersDB from 'test/data/users'
import * as listItemsDB from 'test/data/list-items'
import * as booksDB from 'test/data/books'

// we don't need the profiler in tests
jest.mock('components/profiler')

// enable API mocking in test runs using the same request handlers
// as for the client-side mocking.
beforeAll(() => server.listen())
afterAll(() => server.close())
afterEach(() => server.resetHandlers())

// general cleanup
afterEach(async () => {
  queryCache.clear()
  await Promise.all([
    auth.logout(),
    usersDB.reset(),
    booksDB.reset(),
    listItemsDB.reset(),
  ])
  await waitFor(() => expect(queryCache.isFetching).toBe(0))
  if (jest.isMockFunction(setTimeout)) {
    act(() => jest.runOnlyPendingTimers())
    jest.useRealTimers()
  }
})
