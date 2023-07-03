import { Switch } from "../../switch"

export const ToggleButton = ({isOn, toggle, ...props}) => <Switch on={isOn} onClick={toggle} {...props} /> 

