// form testing
// http://localhost:3000/login

import * as React from 'react'
import {render, screen} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Login from '../../components/login'
import { generateLoginFormData } from 'test/helpers'

describe ('Login', () => {
  test('submitting the form calls onSubmit with username and password', () => {
    const {username, password} = generateLoginFormData()

    const handleSubmit = jest.fn()
    render(<Login onSubmit={handleSubmit({username, password})}/>)

    userEvent.type(screen.getByLabelText(/username/i), username)
    userEvent.type(screen.getByLabelText(/password/i), password)
    userEvent.click(screen.getByRole('button', {name: /submit/i}))
    
    expect(handleSubmit).toHaveBeenCalledTimes(1)
    expect(handleSubmit).toHaveBeenCalledWith({
      username,
      password,
    })
  })
})


