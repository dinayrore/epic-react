// // Cache resources
// // http://localhost:3000/isolated/exercise/04.js

// import * as React from 'react'
// import {
//   PokemonInfoFallback,
//   PokemonForm,
//   PokemonDataView,
//   PokemonErrorBoundary,
// } from '../pokemon'
// import usePokemonResourceCache from '../utils'

// function PokemonInfo({pokemonResource}) {
//   const pokemon = pokemonResource.read()
//   return (
//     <div>
//       <div className="pokemon-info__img-wrapper">
//         <img src={pokemon.image} alt={pokemon.name} />
//       </div>
//       <PokemonDataView pokemon={pokemon} />
//     </div>
//   )
// }

// const SUSPENSE_CONFIG = {
//   timeoutMs: 4000,
//   busyDelayMs: 300,
//   busyMinDurationMs: 700,
// }

// function App() {
//   const [pokemonName, setPokemonName] = React.useState('')
//   const [startTransition, isPending] = React.useTransition(SUSPENSE_CONFIG)
//   const [pokemonResource, setPokemonResource] = React.useState(null)
//   const getPokemonResource = usePokemonResourceCache();

//   React.useEffect(() => {
//     if (!pokemonName) {
//       setPokemonResource(null)
//       return
//     }
//     startTransition(() => {
//       // 🐨 change this to getPokemonResource instead
//       setPokemonResource(getPokemonResource(pokemonName))
//     })
//   }, [getPokemonResource, pokemonName, startTransition])

//   function handleSubmit(newPokemonName) {
//     setPokemonName(newPokemonName)
//   }

//   function handleReset() {
//     setPokemonName('')
//   }

//   return (
//     <div className="pokemon-info-app">
//       <PokemonForm pokemonName={pokemonName} onSubmit={handleSubmit} />
//       <hr />
//       <div className={`pokemon-info ${isPending ? 'pokemon-loading' : ''}`}>
//         {pokemonResource ? (
//           <PokemonErrorBoundary
//             onReset={handleReset}
//             resetKeys={[pokemonResource]}
//           >
//             <React.Suspense
//               fallback={<PokemonInfoFallback name={pokemonName} />}
//             >
//               <PokemonInfo pokemonResource={pokemonResource} />
//             </React.Suspense>
//           </PokemonErrorBoundary>
//         ) : (
//           'Submit a pokemon'
//         )}
//       </div>
//     </div>
//   )
// }

// export default App
