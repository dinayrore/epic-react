import { useState } from 'react'
import * as React from 'react'
import { ToggleOn, ToggleOff, ToggleButton } from './index'

export const Toggle = ({children}) => {
    const [isOn, setIsOn] = useState(false)
    const toggle = () => setIsOn(!isOn)
    const allowedTypes = [ToggleOn, ToggleOff, ToggleButton]
  
    // 🐨 replace this with a call to React.Children.map and map each child in
    // props.children to a clone of that child with the props they need using
    // React.cloneElement.
    return React.Children.map(children, child => {
        if (allowedTypes.includes(child.type)) {
        return React.cloneElement(child, {isOn, toggle})
        }
    })  
}