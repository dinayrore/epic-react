import { createContext } from 'react'
import { getPokemonResource } from 'helpers'

export const PokemonResourceCacheContext = createContext(getPokemonResource)