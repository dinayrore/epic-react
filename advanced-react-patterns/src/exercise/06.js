// Control Props
// http://localhost:3000/isolated/exercise/06.js

import React, {useEffect, useRef, useReducer} from 'react'
import {Switch} from '../switch'
import {toggleReducer, actionTypes} from '../reducers/toggle.reducer'
import {getTogglerProps} from '../utils/helpers'
import { useSwitchWarning } from '../hooks/useSwitchWarning'



function useToggle({
  initialOn = false,
  reducer = toggleReducer,
  // 🐨 add an `onChange` prop.
  onChange,
  // 🐨 add an `on` option here
  on: controlledOn,
  readOnly = false,
  // 💰 you can alias it to `controlledOn` to avoid "variable shadowing."
} = {}) {
  const {current: initialState} = useRef({on: initialOn})
  const [state, dispatch] = useReducer(reducer, initialState)
  // 🐨 determine whether on is controlled and assign that to `onIsControlled`
  const onIsControlled =  controlledOn != null

  // 🐨 Replace the next line with `const on = ...` which should be `controlledOn` if
  // `onIsControlled`, otherwise, it should be `state.on`.
  const on = onIsControlled ? controlledOn : state.on

  if (process.env.NODE_ENV !== 'production') {
    // 💯 don't warn in production; but the unit tests are expecting this for now...
    // useSwitchWarning(
    //   controlledOn,
    //   'on',
    //   'useToggle',
    //   Boolean(onChange),
    //   readOnly,
    //   'readOnly',
    //   'initialOn',
    //   'onChange',
    // ) 

   }

  useSwitchWarning(
    controlledOn,
    'on',
    'useToggle',
    Boolean(onChange),
    readOnly,
    'readOnly',
    'initialOn',
    'onChange',
  )
  
  // We want to call `onChange` any time we need to make a state change, but we
  // only want to call `dispatch` if `!onIsControlled` (otherwise we could get
  // unnecessary renders).
  // 🐨 To simplify things a bit, let's make a `dispatchWithOnChange` function
  // right here. This will:
  // 1. accept an action
  // 2. if onIsControlled is false, call dispatch with that action
  // 3. Then call `onChange` with our "suggested changes" and the action.

  // make these call `dispatchWithOnChange` instead
  const dispatchWithOnChange = (action) => {
    if(!onIsControlled) {
      dispatch(action)
    }
    onChange?.(reducer({...state, on}, action), action)
  }
  const toggle = () => dispatchWithOnChange({type: actionTypes.toggle})
  const reset = () => dispatchWithOnChange({type: actionTypes.reset, initialState})

  return {
    on,
    reset,
    toggle,
  }
}

export const Toggle = ({on: controlledOn, onChange, readOnly, initialOn, reducer}) => {
  const {on, toggle} = useToggle({
    on: controlledOn,
    onChange,
    readOnly,
    initialOn,
    reducer,
  })
  const props = getTogglerProps({on, toggle})
  return <Switch {...props} />
}

function App() {
  const [bothOn, setBothOn] = React.useState(false)
  const [timesClicked, setTimesClicked] = React.useState(0)

  function handleToggleChange(state, action) {
    if (action.type === actionTypes.toggle && timesClicked > 4) {
      return
    }
    setBothOn(state.on)
    setTimesClicked(c => c + 1)
  }

  function handleResetClick() {
    setBothOn(false)
    setTimesClicked(0)
  }

  return (
    <div>
      <div>
        <Toggle on={bothOn} onChange={handleToggleChange} />
        <Toggle on={bothOn} onChange={handleToggleChange} />
      </div>
      {timesClicked > 4 ? (
        <div data-testid="notice">
          Whoa, you clicked too much!
          <br />
        </div>
      ) : (
        <div data-testid="click-count">Click count: {timesClicked}</div>
      )}
      <button onClick={handleResetClick}>Reset</button>
      <hr />
      <div>
        <div>Uncontrolled Toggle:</div>
        <Toggle
          onChange={(...args) =>
            console.info('Uncontrolled Toggle onChange', ...args)
          }
        />
      </div>
    </div>
  )
}

export default App


