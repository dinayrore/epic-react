import { useMutation } from 'react-query';
import { defaultMutationOptions } from 'utils/default-mutation-options';
import { client } from 'utils/api-client';

const useCreateListItem = (user, options) => {
    return useMutation(
        ({bookId}) => client(`list-items`, {data: {bookId}, token: user.token}),
        {...defaultMutationOptions, ...options},
    )
}

export default useCreateListItem;