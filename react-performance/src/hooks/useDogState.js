import {  useContext } from 'react'
import { DogContext } from '../contexts/dog/dog.context'

export const useDogState = () => {
    const context = useContext(DogContext)
    if (!context) {
      throw new Error('useDogState must be used within the DogStateProvider')
    }
    return context
  }