import * as React from 'react'
import {
  render,
  screen,
  waitForLoadingToFinish,
  userEvent,
} from 'test/app-test-utils'
import faker from 'faker'
import {server, rest} from 'test/server'
import {queryCache} from 'react-query'
import * as auth from 'auth-provider'
import {buildBook, buildUser} from 'test/generate'
import * as listItemsDB from 'test/data/list-items'
import {formatDate} from 'utils/misc'
import {App} from 'app'
import { renderBookScreen, fakeTimerUserEvent } from 'utils/helpers'
import { AppProviders } from 'context'
import {waitForElementToBeRemoved} from '@testing-library/react'
import { apiURL } from 'utils/api-client'

describe('BookScreen', () => {
    // 🐨 after each test, clear the queryCache and auth.logout
    afterEach(() => { 
        queryCache.clear()
        auth.logout()
    })

    test('renders all the book information', async () => {
        // 🐨 "authenticate" the client by setting the auth.localStorageKey in localStorage to some string value (can be anything for now)
        const user = buildUser()
        window.localStorage.setItem(auth.localStorageKey, 'SOME_FAKE_TOKEN')
    
        const book = buildBook()
        const route = `/book/${book.id}`
        window.history.pushState({}, 'Test page', route)
    
        const originalFetch = window.fetch
        window.fetch = async (url, config) => {
        if (url.endsWith('/bootstrap')) {
            return {
            ok: true,
            json: async () => ({
                user: {...user, token: 'SOME_FAKE_TOKEN'},
                listItems: [],
            }),
            }
        } else if (url.endsWith(`/books/${book.id}`)) {
            return {ok: true, json: async () => ({book})}
        }
        return originalFetch(url, config)
        }
    
        render(<App />, {wrapper: AppProviders})
    
        await waitForElementToBeRemoved(() => [
        ...screen.queryAllByLabelText(/loading/i),
        ...screen.queryAllByText(/loading/i),
        ])
    
        expect(screen.getByRole('heading', {name: book.title})).toBeInTheDocument()
        expect(screen.getByText(book.author)).toBeInTheDocument()
        expect(screen.getByText(book.publisher)).toBeInTheDocument()
        expect(screen.getByText(book.synopsis)).toBeInTheDocument()
        expect(screen.getByRole('img', {name: /book cover/i})).toHaveAttribute(
        'src',
        book.coverImageUrl,
        )
        expect(screen.getByRole('button', {name: /add to list/i})).toBeInTheDocument()
    
        expect(
        screen.queryByRole('button', {name: /remove from list/i}),
        ).not.toBeInTheDocument()
        expect(
        screen.queryByRole('button', {name: /mark as read/i}),
        ).not.toBeInTheDocument()
        expect(
        screen.queryByRole('button', {name: /mark as unread/i}),
        ).not.toBeInTheDocument()
        expect(
        screen.queryByRole('textbox', {name: /notes/i}),
        ).not.toBeInTheDocument()
        expect(screen.queryByRole('radio', {name: /star/i})).not.toBeInTheDocument()
        expect(screen.queryByLabelText(/start date/i)).not.toBeInTheDocument()
    })
  
    test('can create a list item for the book', async () => {
        await renderBookScreen({listItem: null})
    
        const addToListButton = screen.getByRole('button', {name: /add to list/i})
        await userEvent.click(addToListButton)
        expect(addToListButton).toBeDisabled()
    
        await waitForLoadingToFinish()
    
        expect(
        screen.getByRole('button', {name: /mark as read/i}),
        ).toBeInTheDocument()
        expect(
        screen.getByRole('button', {name: /remove from list/i}),
        ).toBeInTheDocument()
        expect(screen.getByRole('textbox', {name: /notes/i})).toBeInTheDocument()
    
        const startDateNode = screen.getByLabelText(/start date/i)
        expect(startDateNode).toHaveTextContent(formatDate(Date.now()))
    
        expect(
        screen.queryByRole('button', {name: /add to list/i}),
        ).not.toBeInTheDocument()
        expect(
        screen.queryByRole('button', {name: /mark as unread/i}),
        ).not.toBeInTheDocument()
        expect(screen.queryByRole('radio', {name: /star/i})).not.toBeInTheDocument()
    })
  
    test('can remove a list item for the book', async () => {
        await renderBookScreen()
    
        const removeFromListButton = screen.getByRole('button', {
        name: /remove from list/i,
        })
        await userEvent.click(removeFromListButton)
        expect(removeFromListButton).toBeDisabled()
    
        await waitForLoadingToFinish()
    
        expect(screen.getByRole('button', {name: /add to list/i})).toBeInTheDocument()
    
        expect(
        screen.queryByRole('button', {name: /remove from list/i}),
        ).not.toBeInTheDocument()
    })
  
    test('can mark a list item as read', async () => {
        const {listItem} = await renderBookScreen()
    
        // set the listItem to be unread in the DB
        await listItemsDB.update(listItem.id, {finishDate: null})
    
        const markAsReadButton = screen.getByRole('button', {name: /mark as read/i})
        await userEvent.click(markAsReadButton)
        expect(markAsReadButton).toBeDisabled()
    
        await waitForLoadingToFinish()
    
        expect(
        screen.getByRole('button', {name: /mark as unread/i}),
        ).toBeInTheDocument()
        expect(screen.getAllByRole('radio', {name: /star/i})).toHaveLength(5)
    
        const startAndFinishDateNode = screen.getByLabelText(/start and finish date/i)
        expect(startAndFinishDateNode).toHaveTextContent(
        `${formatDate(listItem.startDate)} — ${formatDate(Date.now())}`,
        )
    
        expect(
        screen.queryByRole('button', {name: /mark as read/i}),
        ).not.toBeInTheDocument()
    })
  
    test('can edit a note', async () => {
        // using fake timers to skip debounce time
        jest.useFakeTimers()
        const {listItem} = await renderBookScreen()
    
        const newNotes = faker.lorem.words()
        const notesTextarea = screen.getByRole('textbox', {name: /notes/i})
    
        await fakeTimerUserEvent.clear(notesTextarea)
        await fakeTimerUserEvent.type(notesTextarea, newNotes)
    
        // wait for the loading spinner to show up
        await screen.findByLabelText(/loading/i)
        // wait for the loading spinner to go away
        await waitForLoadingToFinish()
    
        expect(notesTextarea.value).toBe(newNotes)
    
        expect(await listItemsDB.read(listItem.id)).toMatchObject({
        notes: newNotes,
        })
    })
})
  
describe('console errors', () => {
    beforeAll(() => {
      jest.spyOn(console, 'error').mockImplementation(() => {})
    })
  
    afterAll(() => {
      console.error.mockRestore()
    })
  
    test('shows an error message when the book fails to load', async () => {
      const book = {id: 'BAD_ID'}
      await renderBookScreen({listItem: null, book})
  
      expect(
        (await screen.findByRole('alert')).textContent,
      ).toMatchInlineSnapshot(`"There was an error: Book not found"`)
      expect(console.error).toHaveBeenCalled()
    })
  
    test('note update failures are displayed', async () => {
      // using fake timers to skip debounce time
      jest.useFakeTimers()
      await renderBookScreen()
  
      const newNotes = faker.lorem.words()
      const notesTextarea = screen.getByRole('textbox', {name: /notes/i})
  
      const testErrorMessage = '__test_error_message__'
      server.use(
        rest.put(`${apiURL}/list-items/:listItemId`, async (req, res, ctx) => {
          return res(
            ctx.status(400),
            ctx.json({status: 400, message: testErrorMessage}),
          )
        }),
      )
  
      await fakeTimerUserEvent.type(notesTextarea, newNotes)
      // wait for the loading spinner to show up
      await screen.findByLabelText(/loading/i)
      // wait for the loading spinner to go away
      await waitForLoadingToFinish()
  
      expect(screen.getByRole('alert').textContent).toMatchInlineSnapshot(
        `"There was an error: __test_error_message__"`,
      )
    })
})

