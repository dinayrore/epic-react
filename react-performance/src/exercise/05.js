// Optimize context value
// http://localhost:3000/isolated/exercise/05.js

import React from 'react'
import {useForceRerender} from '../utils'
import {AppProvider} from '../contexts/app/app.provider'
import {DogNameInput} from '../components/DogNameInput'
import {Grid} from '../components/Grid'

function App() {
  const forceRerender = useForceRerender()
  return (
    <div className="grid-app">
      <button onClick={forceRerender}>force rerender</button>
      <AppProvider>
        <div>
          <DogNameInput />
          <Grid />
        </div>
      </AppProvider>
    </div>
  )
}

export default App