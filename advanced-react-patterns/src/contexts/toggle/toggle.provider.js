import { ToggleContext } from "./toggle.context"
import { useState } from "react"

export const ToggleProvider = ({children}) => {
    const [isOn, setIsOn] = useState(false)
    const toggle = () => setIsOn(!isOn)

    // 🐨 Add a property called `togglerProps`. It should be an object that has
    // `aria-pressed` and `onClick` properties.
    // 💰 {'aria-pressed': on, onClick: toggle}
    const togglerProps = {
        'aria-pressed': isOn, 
        onClick: toggle, 
        id: 'custom-button-id',
    }

    return (
        <ToggleContext.Provider value={{isOn, toggle, togglerProps}}>
            {children}
        </ToggleContext.Provider>
    )
}