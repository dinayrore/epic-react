// useEffect: HTTP requests
// http://localhost:3000/isolated/exercise/06.js

import * as React from 'react'
// 🐨 you'll want the following additional things from '../pokemon':
import {
  PokemonForm,
  PokemonInfoFallback,
  PokemonDataView,
  ErrorFallback,
} from '../pokemon'
import usePokemon from '../hooks/usePokemon'
import { Status } from '../constants'
import { ErrorBoundary } from 'react-error-boundary'

interface PokemonInfoProps {
  pokemonName: string
}

const PokemonInfo = ({ pokemonName }: PokemonInfoProps) => {
  const { pokemon, error, status } = usePokemon(pokemonName)

  // 🐨 return the following things based on the `pokemon` state and `pokemonName` prop:
  //   1. no pokemonName: 'Submit a pokemon'
  //   2. pokemonName but no pokemon: <PokemonInfoFallback name={pokemonName} />
  //   3. pokemon: <PokemonDataView pokemon={pokemon} />
  return (
    <div>
      {/* No search */}
      {status === Status.idle && 'Submit a pokemon'}
      {/* Search initiated */}
      {(pokemonName && !pokemon) ?? <PokemonInfoFallback name={pokemonName} />}
      {/* Search Error */}
      {status === Status.rejected && error && (
        <ErrorFallback error={error} resetErrorBoundary={() => {}} />
      )}
      {/* Search Resolved */}
      {status === Status.resolved && pokemon && (
        <PokemonDataView pokemon={pokemon} />
      )}
    </div>
  )
}

function App() {
  const [pokemonName, setPokemonName] = React.useState('')

  function handleSubmit(newPokemonName: string) {
    setPokemonName(newPokemonName)
  }

  function handleReset() {
    setPokemonName('')
  }

  return (
    <div className="pokemon-info-app">
      <PokemonForm pokemonName={pokemonName} onSubmit={handleSubmit} />
      <hr />
      <div className="pokemon-info">
        {/* 💯 ErrorBoundary */}
        <ErrorBoundary
          FallbackComponent={ErrorFallback}
          onReset={handleReset}
          resetKeys={[pokemonName]}
        >
          <PokemonInfo pokemonName={pokemonName} />
        </ErrorBoundary>
      </div>
    </div>
  )
}

export default App

// 💯 use resetKeys
