// Basic Forms
// http://localhost:3000/isolated/exercise/06.js

import * as React from 'react'

function UsernameForm({onSubmitUsername}) {
  // 💯 using refs
  const inputRef = React.useRef();

  const [error, setError] = React.useState(null);
  const [username, setUsername] = React.useState('');

  // 💯 validate lower-case
  const validateCasing = (event) => {
    const {value} = event.target;
    const isLowerCase = (value) => value === value.toLowerCase();
    setError(isLowerCase(value) ? null : 'Username must be lower case');
    // 💯 control the input value
    setUsername(value.toLowerCase());
  }

  // 🐨 add a submit event handler here (`handleSubmit`).
  const onSubmit = (event) => {
    // 💰 Make sure to accept the `event` as an argument and call
    event.preventDefault();
    // 🐨 get the value from the username input
    const value = inputRef.current.value;
    // 🐨 Call `onSubmitUsername` with the value of the input
    onSubmitUsername(value);

  }

  // 🐨 add the onSubmit handler to the <form> below 
  return (
    <form onSubmit={onSubmit}>
      <div>
       {/* 🐨 make sure to associate the label to the input. */}
        <label htmlFor='username'>Username:</label>
        <input style={{marginLeft: 8}} id='username' type="text" ref={inputRef} onChange={validateCasing} value={username} placeholder='lowercase username' />
      </div>
      {error ? <div id='error-message' role="alert" style={{color: 'red'}}>{error}</div> : <div style={{margin: 14}}></div>}
      <button type="submit">Submit</button>
    </form>
  )
}

function App() {
  const onSubmitUsername = username => alert(`You entered: ${username}`)
  return <UsernameForm onSubmitUsername={onSubmitUsername} />
}

export default App
