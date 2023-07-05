import { updateGridCellState, updateGridState } from '../utils'

export const appReducer = (state, action) => {
    switch (action.type) {
      case 'TYPED_IN_DOG_INPUT': {
        return {...state, dogName: action.dogName}
      }
      case 'UPDATE_GRID_CELL': {
        return {...state, grid: updateGridCellState(state.grid, action)}
      }
      case 'UPDATE_GRID': {
        return {...state, grid: updateGridState(state.grid)}
      }
      default: {
        throw new Error(`Unhandled action type: ${action.type}`)
      }
    }
  }