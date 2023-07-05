import { dogReducer } from "reducers/dogReducer"
import { useReducer } from "react"
import { DogContext } from "./dog.context"


export const DogProvider = ({children}) => {
   const [state, dispatch] = useReducer(dogReducer, {
     dogName: '',
   })
 const value = [state, dispatch]
   return (
     <DogContext.Provider value={value}>
       {children}
     </DogContext.Provider>
   )
 }