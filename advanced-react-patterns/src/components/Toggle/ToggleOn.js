// Accepts `on` and `children` props and returns `children` if `on` is true
export const ToggleOn = ({isOn, children}) => (isOn ? children : null)

