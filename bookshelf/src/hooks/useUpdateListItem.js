import { useMutation, queryCache } from 'react-query';
import { client } from 'utils/api-client';
import { defaultMutationOptions } from 'utils/default-mutation-options';

const useUpdateListItem = (user, options) => {
    return useMutation(
        updates =>
          client(`list-items/${updates.id}`, {
            method: 'PUT',
            data: updates,
            token: user.token,
          }),
        {
          onMutate(newItem) {
            const previousItems = queryCache.getQueryData('list-items')
    
            queryCache.setQueryData('list-items', old => {
              return old.map(item => {
                return item.id === newItem.id ? {...item, ...newItem} : item
              })
            })
    
            return () => queryCache.setQueryData('list-items', previousItems)
          },
          ...defaultMutationOptions,
          ...options,
        },
      )
}

export default useUpdateListItem;