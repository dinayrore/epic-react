import { useContext } from 'react'
import { AppStateContext, AppDispatchContext } from '../contexts/app/app.context'

export const useAppState = () => {
    const context = useContext(AppStateContext)
    if (!context) {
        throw new Error('useAppState must be used within the AppStateProvider')
    }
    return context
}

export const useAppDispatch = () => {
    const context = useContext(AppDispatchContext)
    if (!context) {
        throw new Error('useAppDispatch must be used within the AppDispatchProvider')
    }
    return context
}