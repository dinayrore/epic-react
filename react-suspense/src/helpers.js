import { fetchPokemon } from "pokemon"

// 💯 generic createResource
export const createResource = (promise) => {
    let status = 'pending'
    let result = promise.then(
      resolved => {
        status = 'success'
        result = resolved
      },
      rejected => {
        status = 'error'
        result = rejected
      },
    )
    return {
      read() {
        if (status === 'pending') throw result
        if (status === 'error') throw result
        if (status === 'success') return result
      },
    }
  }

  const pokemonResourceCache = {}

  export const createPokemonResource = (pokemonName) => {
    return createResource(fetchPokemon(pokemonName))
  }

  export const getPokemonResource = (pokemonName) => {
    const lowerCasedName = pokemonName.toLowerCase()
    let resource = pokemonResourceCache[lowerCasedName]
    if (!resource) {
      resource = createPokemonResource(lowerCasedName)
      pokemonResourceCache[lowerCasedName] = resource
    }
    return resource
  }

  export const SUSPENSE_CONFIG = {
    timeoutMs: 4000,
    busyDelayMs: 300,
    busyMinDurationMs: 700,
  }