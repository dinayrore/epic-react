import { FormGroup, Input } from '../lib'
import React, {cloneElement} from 'react'

const Form = ({submitButton, onSubmit}) => {
    const handleSubmit = event => {
        event.preventDefault()
        const {username, password} = event.target.elements
        onSubmit({
            username: username.value,
            password: password.value,
        })
    }

    return (
        <form
        css={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'stretch',
          '> div': {
            margin: '10px auto',
            width: '100%',
            maxWidth: '300px',
          },
        }}
        onSubmit={handleSubmit}
      >
            <FormGroup>
                <label htmlFor="username">Username</label>
                <Input id="username" type="text" />
            </FormGroup>
            <FormGroup>
                <label htmlFor="password">Password</label>
                <Input id="password" type="password" />
            </FormGroup>
            <div>{cloneElement(submitButton, {type: 'submit'})}</div>
        </form>
       
    )
}

export default Form