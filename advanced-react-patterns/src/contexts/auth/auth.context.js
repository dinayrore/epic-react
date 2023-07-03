import * as React from 'react'

// normally this is going to implement a similar pattern
// learn more here: https://kcd.im/auth

export const AuthContext = React.createContext({
  user: {username: 'jakiechan', tagline: '', bio: ''},
})
AuthContext.displayName = 'AuthContext'





