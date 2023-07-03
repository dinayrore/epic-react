import { useToggle } from "../../hooks/useToggle"

export const ToggleOff = ({children}) => {
    const {isOn} = useToggle()
    return (isOn ? null : children)
}

