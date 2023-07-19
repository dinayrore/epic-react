import { useMutation } from 'react-query';
import { defaultMutationOptions } from 'utils/default-mutation-options';
import { client } from 'utils/api-client';

const useRemoveListItem = (user, options) => {
    return useMutation(
        ({id}) => client(`list-items/${id}`, {method: 'DELETE', token: user.token}),
        {...defaultMutationOptions, ...options},
    )
}

export default useRemoveListItem;