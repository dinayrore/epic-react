const {useQuery} = require('react-query')
const {client} = require('utils/api-client')

const useListItems = (user) => {
    const {data: listItems} = useQuery({
        queryKey: 'list-items',
        queryFn: () => {
          return client(`list-items`, {token: user.token}).then(data => data.listItems)
        }
    })
    return listItems ?? []
}

export default useListItems;