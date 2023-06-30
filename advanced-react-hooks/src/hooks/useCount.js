import {useContext} from 'react'
import { CountContext } from '../contexts/count/count.context'

// 💯 create a consumer hook
export const useCount = () => {
    const context = useContext(CountContext)
  if (!context) {
    throw new Error('useCount must be used within a CountProvider')
  }
  return context
}