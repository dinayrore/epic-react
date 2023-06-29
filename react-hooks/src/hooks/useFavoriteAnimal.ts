import { useState } from 'react'

const useFavoriteAnimal = () => {
  const [name, setName] = useState<string>('')
  // 🐨 add a useState for the animal
  const [animal, setAnimal] = useState<string>('')
  return { name, setName, animal, setAnimal }
}

export default useFavoriteAnimal
