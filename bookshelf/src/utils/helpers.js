import * as React from 'react'
import {
  render,
  loginAsUser,
} from 'test/app-test-utils'
import { userEvent } from '@testing-library/user-event/'
import {buildBook, buildListItem} from 'test/generate'
import * as booksDB from 'test/data/books'
import * as listItemsDB from 'test/data/list-items'
import {App} from 'app'

export const renderBookScreen = async({user, book, listItem} = {}) =>{
    if (user === undefined) {
      user = await loginAsUser()
    }
    if (book === undefined) {
      book = await booksDB.create(buildBook())
    }
    if (listItem === undefined) {
      listItem = await listItemsDB.create(buildListItem({owner: user, book}))
    }
    const route = `/book/${book.id}`
  
    const utils = await render(<App />, {user, route})
  
    return {
      ...utils,
      book,
      user,
      listItem,
    }
}


export const fakeTimerUserEvent = userEvent.setup({
  advanceTimers: () => jest.runOnlyPendingTimers(),
})