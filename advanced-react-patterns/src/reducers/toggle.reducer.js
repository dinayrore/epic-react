// If using TS this is unnecessary
export const actionTypes = {
    toggle: 'toggle',
    reset: 'reset',
  }
  

export const toggleReducer = (state, {type, initialState}) => {
    switch (type) {
      case actionTypes.toggle: {
        return {on: !state.on}
      }
      case actionTypes.reset: {
        return initialState
      }
      default: {
        throw new Error(`Unsupported type: ${type}`)
      }
    }
}