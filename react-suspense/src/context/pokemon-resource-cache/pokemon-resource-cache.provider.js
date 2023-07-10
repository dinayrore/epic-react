
import React,  {useRef, useEffect, useCallback} from "react"
import { PokemonResourceCacheContext } from "./pokemon-resource-cache.context"
import { createPokemonResource } from "./pokemon-resource-cache.utils"

export const PokemonCacheProvider = ({children, cacheTime = 5000}) => {
    const cache = useRef({})
    const expirations = useRef({})

    useEffect(() => {
      const interval = setInterval(() => {
        for (const [name, time] of Object.entries(expirations.current)) {
          if (time < Date.now()) {
            delete cache.current[name]
            delete expirations.current[name]
          }
        }
      }, 1000)

      return () => clearInterval(interval)
    }, [])
  
    const getPokemonResource = useCallback(name => {
      const lowerName = name.toLowerCase()
      let resource = cache.current[lowerName]
      if (!resource) {
        resource = createPokemonResource(lowerName)
        cache.current[lowerName] = resource
      }
      expirations.current[lowerName] = Date.now() + cacheTime
      return resource
    }, [cacheTime])
  
    return (
      <PokemonResourceCacheContext.Provider value={getPokemonResource}>
        {children}
      </PokemonResourceCacheContext.Provider>
    )
  }