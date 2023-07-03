// State Reducer
// http://localhost:3000/isolated/exercise/05.js

import React, {useReducer, useRef} from 'react'
import {Switch} from '../switch'
import { toggleReducer } from '../reducers/toggle.reducer'
import { getTogglerProps, getResetterProps } from '../utils/helpers'

// 🐨 add a new option called `reducer` that defaults to `toggleReducer`
function useToggle({initialOn = false, reducer = toggleReducer} = {}) {
  const {current: initialState} = useRef({on: initialOn})
  // 🐨 instead of passing `toggleReducer` here, pass the `reducer` that's
  // provided as an option
  const [state, dispatch] = useReducer(reducer, initialState)
  const {on} = state

  const toggle = () => dispatch({type: 'toggle'})
  const reset = () => dispatch({type: 'reset', initialState})

  return {
    on,
    reset,
    toggle,
  }
  
}

function App() {
  const [timesClicked, setTimesClicked] = React.useState(0)
  const clickedTooMuch = timesClicked >= 4
  
  // 💯 default state reducer
  const toggleStateReducer = (state, action) => {
    if (action.type === 'toggle' && clickedTooMuch) {
      return {on: state.on}
    }
    return toggleReducer(state, action)
  }

  const {on, toggle, reset} = useToggle({
    reducer: toggleStateReducer,
  })

  return (
    <div>
      <Switch
        {...getTogglerProps({
          disabled: clickedTooMuch,
          on: on,
          toggle: toggle,
          onClick: () => setTimesClicked(count => count + 1),
        })}
      />
      {clickedTooMuch ? (
        <div data-testid="notice">
          Whoa, you clicked too much!
          <br />
        </div>
      ) : timesClicked > 0 ? (
        <div data-testid="click-count">Click count: {timesClicked}</div>
      ) : null}
      <button {...getResetterProps({onClick: () => setTimesClicked(0), reset: reset})}>
        Reset
      </button>
    </div>
  )
}

export default App
