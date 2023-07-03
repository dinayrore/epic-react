// Prop Collections and Getters
// http://localhost:3000/isolated/exercise/04.js

import * as React from 'react'
import {Switch} from '../switch'
import {useToggle} from '../hooks/useToggle'
import { ToggleProvider } from '../contexts/toggle/toggle.provider'
import { getTogglerProps } from '../utils/helpers'

const Toggle = () => {
  const {isOn, toggle, togglerProps} = useToggle()
  return(
    <div>
      <Switch on={isOn} {...togglerProps} />
        <hr />
        <button
        {...getTogglerProps({
          'aria-label': 'custom-button',
          onClick: () => console.info('onButtonClick'),
          id: 'custom-button-id',
          isOn,
          toggle
        })}
      >          
        {isOn ? 'on' : 'off'}
      </button>
    </div>
  )
}

function App() {
  return (
    <div>
      <ToggleProvider>
        <Toggle />
      </ToggleProvider>
    </div>
  )
}

export default App

/*
eslint
  no-unused-vars: "off",
*/
