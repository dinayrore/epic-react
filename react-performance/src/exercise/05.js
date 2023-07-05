// Optimize context value
// http://localhost:3000/isolated/exercise/05.js

import React from 'react'
import {useForceRerender} from '../utils'
import {AppProvider} from '../contexts/app/app.provider'
import {DogNameInput} from '../components/DogNameInput'
import {Grid} from '../components/Grid'
import { DogProvider } from 'contexts/dog/dog.provider'

function App() {
  const forceRerender = useForceRerender()
  return (
    <div className="grid-app">
      <button onClick={forceRerender}>force rerender</button>
        <div>
          <DogProvider>
            <DogNameInput />
          </DogProvider>
          <AppProvider>
            <Grid />
          </AppProvider>
        </div>
    </div>
  )
}

export default App