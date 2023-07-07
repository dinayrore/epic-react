
import React from "react"
import { PokemonResourceCacheContext } from "./pokemon-resource-cache.context"
import { createPokemonResource } from "./pokemon-resource-cache.utils"

export const PokemonCacheProvider = ({children}) => {
    const cache = React.useRef({})
  
    const getPokemonResource = React.useCallback(name => {
      const lowerName = name.toLowerCase()
      let resource = cache.current[lowerName]
      if (!resource) {
        resource = createPokemonResource(lowerName)
        cache.current[lowerName] = resource
      }
      return resource
    }, [])
  
    return (
      <PokemonResourceCacheContext.Provider value={getPokemonResource}>
        {children}
      </PokemonResourceCacheContext.Provider>
    )
  }