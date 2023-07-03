import { useContext } from 'react'
import { ToggleContext } from '../contexts/toggle/toggle.context'

export const useToggle =() => {
    const context = useContext(ToggleContext)
    if (context === undefined) {
      throw new Error(`useToggle must be used within a ToggleProvider`)
    }
    return context
}