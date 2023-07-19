import React from 'react'
import {queryCache} from 'react-query'
import {getBookSearchConfig} from 'utils/books'
import {useClient} from 'hooks/useClient'

const useRefetchBookSearchQuery = () => {
    const client = useClient()
    return React.useCallback(
      async function refetchBookSearchQuery() {
        queryCache.removeQueries('bookSearch')
        await queryCache.prefetchQuery(getBookSearchConfig('', client))
      },
      [client],
    )
  }

  export {useRefetchBookSearchQuery}