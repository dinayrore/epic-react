import { useQuery } from 'react-query'
import {client} from 'utils/api-client'
import {loadingBook} from 'utils/loading-book'

const useBook = (bookId, user) => {
    const {data} = useQuery({
        queryKey: ['book', {bookId}],
        queryFn: () =>
          client(`books/${bookId}`, {token: user.token}).then(data => data.book),
      })
      return data ?? loadingBook
}

export default useBook;