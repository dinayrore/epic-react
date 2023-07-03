// Flexible Compound Components
// http://localhost:3000/isolated/exercise/03.js

import * as React from 'react'
import { ToggleOn, ToggleOff, ToggleButton} from '../components/Toggle'
import { ToggleProvider } from '../contexts/toggle/toggle.provider'

function App() {
  return (
    <div>
      <ToggleProvider>
        <ToggleOn>The button is on</ToggleOn>
        <ToggleOff>The button is off</ToggleOff>
        <div>
          <ToggleButton />
        </div>
      </ToggleProvider>
    </div>
  )
}

export default App