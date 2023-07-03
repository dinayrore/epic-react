// Compound Components
// http://localhost:3000/isolated/exercise/02.js

import * as React from 'react'
import {Toggle, ToggleOn, ToggleOff, ToggleButton} from '../components/Toggle'
import { ToggleProvider } from '../contexts/toggle/toggle.provider'

function App() {
  return (
    <div>
      <ToggleProvider>
        <Toggle>
          <ToggleOn>The button is on</ToggleOn>
          <ToggleOff>The button is off</ToggleOff>
          <ToggleButton />
        </Toggle>
      </ToggleProvider>
    </div>
  )
}

export default App

