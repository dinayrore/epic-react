import { queryCache } from 'react-query'
import {client} from './api-client'

const setQueryDataForBook = (book) => {
    queryCache.setQueryData(['book', {bookId: book.id}], book)
  }

const getBookSearchConfig = (query, user) => ({
    queryKey: ['bookSearch', {query}],
    queryFn: () =>
      client(`books?query=${encodeURIComponent(query)}`, {
        token: user.token,
      }).then(data => data.books),
    config: {
      onSuccess(books) {
        for (const book of books) {
          setQueryDataForBook(book)
        }
      },
    },
  })

export const refetchBookSearchQuery = async(user) => {
    queryCache.removeQueries('bookSearch')
    await queryCache.prefetchQuery(getBookSearchConfig('', user))
  }