import {useQuery} from 'react-query'
import {client} from 'utils/api-client'
import { loadingBooks } from 'utils/loading-book'

const useBookSearch = (query, user) => {
    const result = useQuery({
        queryKey: ['bookSearch', {query}],
        queryFn: () =>
          client(`books?query=${encodeURIComponent(query)}`, {
            token: user.token,
          }).then(data => data.books),
      })

    return {...result, books: result.data ?? loadingBooks}
}

export default useBookSearch;