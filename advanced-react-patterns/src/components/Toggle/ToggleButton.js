import { Switch } from "../../switch"
import { useToggle } from "../../hooks/useToggle"

export const ToggleButton = ({props}) => {
    const {isOn, toggle} = useToggle()
    return (
        <Switch on={isOn} onClick={toggle} {...props} /> 

    )
}
