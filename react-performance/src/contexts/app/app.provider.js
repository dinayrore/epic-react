 import { AppStateContext, AppDispatchContext } from "./app.context"
 import { appReducer } from "reducers/appReducer"
 import { useReducer } from "react"
 
 const initialGrid = Array.from({length: 100}, () =>
  Array.from({length: 100}, () => Math.random() * 100),
)
 
 export const AppProvider = ({children}) => {
    const [state, dispatch] = useReducer(appReducer, {
      dogName: '',
      grid: initialGrid,
    })
  
    return (
      <AppStateContext.Provider value={state}>
        <AppDispatchContext.Provider value={dispatch}>
        {children}
        </AppDispatchContext.Provider>
      </AppStateContext.Provider>
    )
  }