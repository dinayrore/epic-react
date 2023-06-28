import { useEffect, useState } from 'react'
import { TicTacToeSquares } from '../types'

// 💯 useLocalStorage custom hook
const useLocalStorage = (key: string) => {
  // 💯 preserve state in localStorage
  const getLocalStorageValue = window.localStorage.getItem(key)
  let localStorageValue
  if (getLocalStorageValue !== null) {
    try {
      localStorageValue = JSON.parse(getLocalStorageValue)
    } catch (error) {
      window.localStorage.removeItem(key)
    }
  }
  const initialState = Array(9).fill(null)
  const defaultState = localStorageValue || Array(9).fill(null)

  const [state, setState] = useState<TicTacToeSquares[]>(defaultState)

  useEffect(() => {
    window.localStorage.setItem(key, JSON.stringify(state))
  }, [key, state])

  return { initialState, state, setState }
}

export default useLocalStorage
