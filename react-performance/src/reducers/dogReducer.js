export const dogReducer = (state, action) => {
    switch (action.type) {
      case 'TYPED_IN_DOG_INPUT': {
        return {...state, dogName: action.dogName}
      }
      default: {
        throw new Error(`Unhandled action type: ${action.type}`)
      }
    }
}