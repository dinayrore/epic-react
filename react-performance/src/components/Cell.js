import {useAppState, useAppDispatch} from '../hooks/useApp'
import { memo, forwardRef } from "react"

// 💯 Slice of App State
const withStateSlice =(Component, slice) => {
  const MemoComp = memo(Component)
  function Wrapper(props, ref) {
    const state = useAppState()
    return <MemoComp ref={ref} state={slice(state, props)} {...props} />
  }
  Wrapper.displayName = `withStateSlice(${Component.displayName || Component.name})`
  return memo(forwardRef(Wrapper))
}

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
  export const Cell = withStateSlice(CellComponent, (state, {row, column}) => state.grid[row][column])
