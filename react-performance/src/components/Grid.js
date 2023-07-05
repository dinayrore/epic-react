import { memo } from 'react'
import {useAppDispatch} from '../hooks/useApp'
import {useDebouncedState, AppGrid} from '../utils'
import {Cell} from './Cell'

const GridComponent = () => {
    const  dispatch = useAppDispatch()
    const [rows, setRows] = useDebouncedState(50)
    const [columns, setColumns] = useDebouncedState(50)
    const updateGridData = () => dispatch({type: 'UPDATE_GRID'})
    return (
      <AppGrid
        onUpdateGrid={updateGridData}
        rows={rows}
        handleRowsChange={setRows}
        columns={columns}
        handleColumnsChange={setColumns}
        Cell={Cell}
      />
    )
}

export const Grid = memo(GridComponent)