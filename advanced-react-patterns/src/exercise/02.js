// Compound Components
// http://localhost:3000/isolated/exercise/02.js

import * as React from 'react'
import {Toggle, ToggleOn, ToggleOff, ToggleButton} from '../components/Toggle'

function App() {
  return (
    <div>
      <Toggle>
        <ToggleOn>The button is on</ToggleOn>
        <ToggleOff>The button is off</ToggleOff>
        <ToggleButton />
      </Toggle>
    </div>
  )
}

export default App

