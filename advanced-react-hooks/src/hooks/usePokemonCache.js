import { useContext } from "react";
import { PokemonCacheContext } from "../contexts/pokemon-cache/pokemon-cache.context";

export const usePokemonCache = () => {
    // 🐨 get the cache and dispatch from useContext with PokemonCacheContext
    const context = useContext(PokemonCacheContext)
    if (!context) {
        throw new Error(`usePokemonCache must be used within a PokemonCacheProvider`)
    }
    return context
}