import { useState } from 'react'

const useFavoriteAnimal = () => {
  const [name, setName] = useState<string>('Kris')
  // 🐨 add a useState for the animal
  const [animal, setAnimal] = useState<string>('Flerkens')
  return { name, setName, animal, setAnimal }
}

export default useFavoriteAnimal
