import { useState, useEffect } from 'react'
// 💯 Exercise 2 - custom hook

const useGreeting = (defaultValue: string) => {
  // 💯 lazy state initialization
  const getNameFromLocalStorage = () =>
    window.localStorage.getItem('name') ?? defaultValue

  // 🐨 initialize the state to the value from localStorage
  const [name, setName] = useState<string>(getNameFromLocalStorage)

  // 🐨 Here's where you'll use `React.useEffect`.
  useEffect(() => {
    window.localStorage.setItem('name', name)
    // 💯 effect dependencies
  }, [name])

  return { name, setName }
}

export default useGreeting
