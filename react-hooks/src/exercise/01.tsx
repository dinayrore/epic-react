// useState: greeting

import React, { ChangeEvent, useState } from 'react'

interface GreetingProps {
  initialName?: string
}

const Greeting = ({ initialName = '' }: GreetingProps) => {
  const [name, setName] = useState<string>(initialName)

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    // 🐨 update the name here based on event.target.value
    setName(event.target.value)
  }

  return (
    <div>
      <form>
        <label htmlFor="name">Name: </label>
        <input value={name} onChange={handleChange} id="name" />
      </form>
      {name ? <strong>Hello {name}</strong> : 'Please type your name above'}
    </div>
  )
}

const App = () => {
  // 💯 accept an initialName prop and use that to initialize the state
  return <Greeting initialName="My Name" />
}

export default App
