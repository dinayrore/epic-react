// Lifting state
// http://localhost:3000/isolated/exercise/03.js

import * as React from 'react'
import useFavoriteAnimal from '../hooks/useFavoriteAnimal'

const Name = () => {
  const { name, setName } = useFavoriteAnimal()

  return (
    <div>
      <label htmlFor="name">Name: </label>
      <input
        id="name"
        value={name}
        onChange={event => setName(event.target.value)}
      />
    </div>
  )
}

interface FavoriteAnimalProps {
  animal: string
  onAnimalChange: (event: React.ChangeEvent<HTMLInputElement>) => void
}

// 🐨 accept `animal` and `onAnimalChange` props to this component
function FavoriteAnimal({ animal, onAnimalChange }: FavoriteAnimalProps) {
  return (
    <div>
      <label htmlFor="animal">Favorite Animal: </label>
      <input id="animal" value={animal} onChange={onAnimalChange} />
    </div>
  )
}

interface DisplayProps {
  animal: string
}

// 🐨 uncomment this
const Display = ({ animal }: DisplayProps) => {
  return <div>{`Your favorite animal is: ${animal}!`}</div>
}

function App() {
  // 💯 co-locating state
  const { animal, setAnimal } = useFavoriteAnimal()
  return (
    <form>
      <Name />
      {/* 🐨 pass the animal and onAnimalChange prop here (similar to the Name component above) */}
      <FavoriteAnimal
        animal={animal}
        onAnimalChange={event => setAnimal(event.target.value)}
      />
      {/* 🐨 pass the animal prop here */}
      <Display animal={animal} />
    </form>
  )
}

export default App
