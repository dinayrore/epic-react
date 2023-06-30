import {useReducer,  useCallback} from 'react'
import { asyncReducer } from '../reducers/asyncReducer'
import { useSafeDispatch } from './useSafeDispatch'

// 🐨 move all the code between the lines into a new useAsync function.
export const useAsync = (initialState) => {
    const [state, unsafeDispatch] = useReducer(asyncReducer, {
        status: 'idle',
        data: null,
        error: null,
        ...initialState,
      })

      const dispatch = useSafeDispatch(unsafeDispatch)
    
      // 💯 return a memoized run function from useAsync
      const run = useCallback(promise => {
        if (!promise) {
          return
        }

        dispatch({type: 'pending'})
        promise.then(
          data => {
            dispatch({type: 'resolved', data})
          },
          error => {
            dispatch({type: 'rejected', error})
          },
        )
      }, [dispatch])
    
      
      return {...state, run}
}