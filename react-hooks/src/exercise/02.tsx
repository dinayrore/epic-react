// useEffect: persistent state

import React, { ChangeEvent } from 'react'
import useGreeting from '../hooks/useGreeting'

interface GreetingProps {
  initialName?: string
}

const Greeting = ({ initialName }: GreetingProps) => {
  const { name, setName } = useGreeting(initialName)
  console.log('name', name)

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value)
  }

  return (
    <div>
      <form>
        <label htmlFor="name">Name: </label>
        <input onChange={handleChange} id="name" />
      </form>
      {name ? <strong>Hello {name}</strong> : 'Please type your name above'}
    </div>
  )
}

const App = () => {
  return <Greeting />
}

export default App
