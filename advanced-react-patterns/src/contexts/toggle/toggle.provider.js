import { ToggleContext } from "./toggle.context"
import { useState } from "react"

export const ToggleProvider = ({children}) => {
    const [isOn, setIsOn] = useState(false)
    const toggle = () => setIsOn(!isOn)

    return (
        <ToggleContext.Provider value={{isOn, toggle}}>
            {children}
        </ToggleContext.Provider>
    )
}