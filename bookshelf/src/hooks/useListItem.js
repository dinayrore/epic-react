import useListItems from "./useListItems"

const useListItem = (user, bookId) => {
    const listItems = useListItems(user)
    return listItems.find(li => li.bookId === bookId) ?? null
}

export default useListItem;