import { useEffect, useState } from 'react'
import { PokemonState } from '../types'
import { fetchPokemon } from '../pokemon'
import { Status } from '../constants'

const usePokemon = (pokemonName: string) => {
  // 🐨 Have state for the pokemon (null)
  // 💯 store the state in an object
  const [state, setState] = useState<PokemonState>({
    // 💯 use a status
    status: pokemonName ? Status.pending : Status.idle,
    pokemon: null,
    // 💯 handle errors
    error: null,
  })

  const { status, pokemon, error } = state

  // 🐨 use React.useEffect where the callback should be called whenever the
  // pokemon name changes.
  useEffect(() => {
    // 💰 if the pokemonName is falsy (an empty string) then don't bother making the request (exit early).
    if (!pokemonName) {
      return
    }

    // 🐨 before calling `fetchPokemon`, clear the current pokemon state by setting it to null.
    setState({ status: Status.pending, pokemon: null, error: null })

    // 💰 Use the `fetchPokemon` function to fetch a pokemon by its name:
    fetchPokemon(pokemonName).then(
      pokemon => {
        setState({ status: Status.resolved, pokemon, error: null })
      },
      error => {
        setState({ status: Status.rejected, pokemon: null, error })
      },
    )
  }, [pokemonName])

  return { pokemon, error, status }
}

export default usePokemon
