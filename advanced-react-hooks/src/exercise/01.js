// useReducer: simple Counter
// http://localhost:3000/isolated/exercise/01.js

import React, {useReducer} from 'react'

// const countReducer = (state, action) => ({
  //   ...state, 
  //   // 💯 simulate setState with an object or a function
  //   ...typeof action === 'function' ? action(state) : action
  // })

// 💯 traditional dispatch object with a type and switch statement
const countReducer = (state, action) => {
  switch (action.type) {
    case 'INCREMENT':
      return {count: state.count + action.step}
    default:
      throw new Error(`Unsupported action type: ${action.type}`)
  }
}

function Counter({initialCount = 0, step = 1}) { 
  // 🐨 replace React.useState with React.useReducer.
  // 💯 accept the step as the action
  const [state, dispatch] = useReducer(countReducer, {count: initialCount})
  
  const {count} = state
  const increment = () => dispatch({type: 'INCREMENT', step})

  return <button onClick={increment}>{count}</button>
}

function App() {
  return <Counter />
}

export default App
