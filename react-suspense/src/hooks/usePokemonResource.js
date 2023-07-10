import { useState, useEffect, useTransition } from 'react'
import {getPokemonResource, SUSPENSE_CONFIG} from '../helpers'



  

export const usePokemonResource = (pokemonName) => {
    const [pokemonResource, setPokemonResource] = useState(null)
    const [startTransition, isPending] = useTransition(SUSPENSE_CONFIG)
  
    useEffect(() => {
      if (!pokemonName) {
        setPokemonResource(null)
        return
      }
      startTransition(() => {
        setPokemonResource(getPokemonResource(pokemonName))
      })
    }, [pokemonName, startTransition])
  
    return [pokemonResource, isPending]
  }
  