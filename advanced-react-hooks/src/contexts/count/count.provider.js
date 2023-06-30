import React, { useState } from "react"
import { CountContext } from "./count.context"

// 🐨 create a CountProvider component here that does this:
//   🐨 get the count state and setCount updater with React.useState
//   🐨 create a `value` array with count and setCount
//   🐨 return your context provider with the value assigned to that array and forward all the other props
//   💰 more specifically, we need the children prop forwarded to the context provider

export const CountProvider = ({ children }) => {
    const [count, setCount] = useState(0)
    const value = [count, setCount]
    return <CountContext.Provider value={value}>{children}</CountContext.Provider>
}