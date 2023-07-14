/** @jsx jsx */
import {jsx} from '@emotion/core'

import './bootstrap'
import Tooltip from '@reach/tooltip'
import {FaSearch, FaTimes} from 'react-icons/fa'
import {Input, BookListUL, Spinner} from './components/lib'
import {BookRow} from './components/book-row'
import {useEffect, useState} from 'react'
import {client} from './utils/api-client'
import * as colors from './styles/colors'
import {useAsync} from './utils/hooks'


function DiscoverBooksScreen() {
  const {data, error, run, isLoading, isError, isSuccess} = useAsync()
const [query, setQuery] = useState('')


  useEffect(() => {
    if (!query) {
      return
    }
    run(client(`books?query=${encodeURIComponent(query)}`))
  }, [query, run])

  function handleSearchSubmit(event) {
    event.preventDefault()
    const searchQuery = event.target.elements.search.value
    setQuery(searchQuery)
  }

  return (
    <div
      css={{maxWidth: 800, margin: 'auto', width: '90vw', padding: '40px 0'}}
    >
      <form onSubmit={handleSearchSubmit}>
        <Input
          placeholder="Search books..."
          id="search"
          css={{width: '100%'}}
        />
        <Tooltip label="Search Books">
          <label htmlFor="search">
            <button
              type="submit"
              css={{
                border: '0',
                position: 'relative',
                marginLeft: '-35px',
                background: 'transparent',
              }}
            >
              
              {isLoading ? (
                <Spinner /> 
              ) : isError ? (
                 <FaTimes aria-label='error' css={{color: colors.danger}}/>
              ) : (
                  <FaSearch aria-label="search" />
              )}

            </button>
          </label>
        </Tooltip>
      </form>

      {isError && (
        <div css={{color: colors.danger}}>
          <pre>Error: {error.message}</pre>
        </div>
      )}

      {isSuccess ? (
        data?.books?.length ? (
          <BookListUL css={{marginTop: 20}}>
            {data.books.map(book => (
              <li key={book.id} aria-label={book.title}>
                <BookRow key={book.id} book={book} />
              </li>
            ))}
          </BookListUL>
        ) : (
          <p>No books found. Try another search.</p>
        )
      ) : null}
    </div>
  )
}

export {DiscoverBooksScreen}
