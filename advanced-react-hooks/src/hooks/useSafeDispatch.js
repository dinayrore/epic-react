import { useCallback, useLayoutEffect, useRef } from 'react'

export const useSafeDispatch = (dispatch) => {
    const mountedRef = useRef(false)
    useLayoutEffect(() => {
      mountedRef.current = true
      return () => {
        mountedRef.current = false
      }
    }, [])
    
   return useCallback((...args) => {
      if (mountedRef.current) {
          dispatch(...args)
      }
    }, [dispatch])
}