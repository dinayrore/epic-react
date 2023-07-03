import { useAuth } from "../../auth-context"
import { useReducer } from "react"
import { userReducer } from "../../reducers/user.reducer"
import { UserContext } from "./user.context"

export const UserProvider = ({children}) => {
    const {user} = useAuth()
    const [state, dispatch] = useReducer(userReducer, {
      status: null,
      error: null,
      storedUser: user,
      user,
    })
    const value = [state, dispatch]
    return <UserContext.Provider value={value}>{children}</UserContext.Provider>
  }