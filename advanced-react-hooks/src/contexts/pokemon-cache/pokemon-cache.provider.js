import React, {useReducer} from 'react';
import {pokemonCacheReducer} from '../../reducers/pokemonCacheReducer';
import {PokemonCacheContext} from './pokemon-cache.context';

// 🐨 create a PokemonCacheProvider function
export const PokemonCacheProvider = ({children}) => {
    // 🐨 useReducer with pokemonCacheReducer in your PokemonCacheProvider
    const [cache, dispatch] = useReducer(pokemonCacheReducer, {})
    const value = [cache, dispatch]
    // 🐨 return your context provider with the value assigned to what you get back from useReducer
    return <PokemonCacheContext.Provider value={value}>{children}</PokemonCacheContext.Provider>
}
