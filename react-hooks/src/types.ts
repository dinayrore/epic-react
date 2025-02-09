import { Status } from './constants'

export interface Pokemon {
  image: string
  name: string
  number: string
  attacks: {
    special: {
      name: string
      type: string
      damage: string
    }[]
  }
  fetchedAt: string
}

export interface PokemonDataViewProps {
  pokemon: Pokemon
}

export interface PokemonInfoFallbackProps {
  name: string
}

export interface PokemonFormProps {
  pokemonName: string
  onSubmit: (newPokemonName: string) => void
  initialPokemonName?: string
}

export interface ErrorFallbackProps {
  error: Error
  resetErrorBoundary: () => void
}

export type TicTacToeSquares = 'X' | 'O'

export interface PokemonState {
  status: Status
  pokemon: Pokemon | null
  error: Error | null
}
