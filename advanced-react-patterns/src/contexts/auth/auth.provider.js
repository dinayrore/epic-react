import { AuthContext } from "./auth.context"

export const AuthProvider = ({user, ...props}) => (
    <AuthContext.Provider value={user} {...props} />
)