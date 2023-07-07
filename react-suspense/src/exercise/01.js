// Simple Data-fetching
// http://localhost:3000/isolated/exercise/01.js

import * as React from 'react'
import { PokemonDataView, PokemonInfoFallback, } from '../pokemon'
import {createResource} from '../helpers'

function PokemonInfo() {
  const pokemon = createResource.read()
  
  return (
    <div>
      <div className="pokemon-info__img-wrapper">
        <img src={pokemon.image} alt={pokemon.name} />
      </div>
      <PokemonDataView pokemon={pokemon} />
    </div>
  )
}

function App() {
  return (
    <div className="pokemon-info-app">
      <div className="pokemon-info">
        {/* 🐨 Wrap the PokemonInfo component with a React.Suspense component with a fallback */}
        <React.Suspense fallback={<PokemonInfoFallback/>}>
          <PokemonInfo />
        </React.Suspense>
      </div>
    </div>
  )
}

export default App
