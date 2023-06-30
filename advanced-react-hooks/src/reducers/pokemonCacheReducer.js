export const pokemonCacheReducer = (state, action) => {
    switch (action.type) {
      case 'ADD_POKEMON': {
        return {...state, [action.pokemonName]: action.pokemonData}
      }
      default: {
        throw new Error(`Unhandled action type: ${action.type}`)
      }
    }
  }