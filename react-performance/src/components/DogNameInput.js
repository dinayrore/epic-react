import { useAppDispatch, useAppState } from "../hooks/useApp"

export const DogNameInput = () => {
    const state = useAppState()
    const dispatch = useAppDispatch()
    const {dogName} = state

  
    function handleChange(event) {
      const newDogName = event.target.value
      dispatch({type: 'TYPED_IN_DOG_INPUT', dogName: newDogName})
    }
  
    return (
      <form onSubmit={e => e.preventDefault()}>
        <label htmlFor="dogName">Dog Name</label>
        <input
          value={dogName}
          onChange={handleChange}
          id="dogName"
          placeholder="Toto"
        />
        {dogName ? (
          <div>
            <strong>{dogName}</strong>, I've a feeling we're not in Kansas anymore
          </div>
        ) : null}
      </form>
    )
  }