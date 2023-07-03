import { useToggle } from "../../hooks/useToggle"

export const ToggleOn = ({children}) => {
    const {isOn} = useToggle()
    return (isOn ? children : null)
}
