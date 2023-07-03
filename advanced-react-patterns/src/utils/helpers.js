import * as userClient from '../user-client'

// 🐨 add a function here called `updateUser`
export const updateUser = (dispatch, user, updates) => {
    dispatch({type: 'start update', updates})
    return userClient.updateUser(user, updates).then(
      updatedUser => dispatch({type: 'finish update', updatedUser}),
      error => dispatch({type: 'fail update', error}),
    )
  }


export const getTogglerProps = ({onClick, isOn, toggle, ...props} = {}) => {
  return {
    'aria-pressed': isOn,
    onClick: () => {
      onClick && onClick()
      toggle()
    },
    ...props,
  }
}
