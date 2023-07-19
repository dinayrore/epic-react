import { queryCache } from 'react-query'

export const defaultMutationOptions = {
    onError: (err, variables, recover) =>
      typeof recover === 'function' ? recover() : null,
    onSettled: () => queryCache.invalidateQueries('list-items'),
  }