import { useState, useEffect } from 'react'
// 💯 Exercise 2 - custom hook

const useGreeting = (defaultValue?: string) => {
  // 💯 lazy state initialization
  const localStorageValue: string | null =
    defaultValue ?? window.localStorage.getItem('name')

  const [name, setName] = useState<string | null>(localStorageValue)

  useEffect(() => {
    if (name) {
      window.localStorage.setItem('name', name)
    }
    // 💯 effect dependencies
  }, [name])

  return { name, setName }
}

export default useGreeting
