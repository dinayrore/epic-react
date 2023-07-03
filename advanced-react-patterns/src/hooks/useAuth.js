import { useContext } from "react"
import { AuthContext } from "../contexts/auth/auth.context"

export const useAuth = () => {
    return useContext(AuthContext)
}