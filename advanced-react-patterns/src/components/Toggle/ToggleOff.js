// Accepts `on` and `children` props and returns `children` if `on` is false
export const ToggleOff = ({isOn, children}) => (isOn ? null : children)

