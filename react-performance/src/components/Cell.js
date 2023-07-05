import {useAppState, useAppDispatch} from '../hooks/useApp'
import { memo } from "react"

const CellComponent = ({row, column}) => {
    const state = useAppState()
    const dispatch = useAppDispatch()
    const cell = state.grid[row][column]
    const handleClick = () => dispatch({type: 'UPDATE_GRID_CELL', row, column})
    return (
      <button
        className="cell"
        onClick={handleClick}
        style={{
          color: cell > 50 ? 'white' : 'black',
          backgroundColor: `rgba(0, 0, 0, ${cell / 100})`,
        }}
      >
        {Math.floor(cell)}
      </button>
    )
  }
  export const Cell = memo(CellComponent)