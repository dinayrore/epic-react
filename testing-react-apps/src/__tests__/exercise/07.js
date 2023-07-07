// testing with context and a custom render method
// http://localhost:3000/easy-button

import * as React from 'react'
import {screen} from '@testing-library/react'
import EasyButton from '../../components/easy-button'
import {renderWithProviders} from '../../test/helpers'


describe('EasyButton', () => {
  test('renders with the light styles for the light theme', () => {
    renderWithProviders(<EasyButton>Easy</EasyButton>)
    const button = screen.getByRole('button', {name: /easy/i})
    expect(button).toHaveStyle(`
      background-color: white;
      color: black;
    `)
  })

  test('renders with the dark styles for the dark theme', () => {
    renderWithProviders(<EasyButton>Easy</EasyButton>, {
      theme: 'dark',
    })
    const button = screen.getByRole('button', {name: /easy/i})
    expect(button).toHaveStyle(`
    background-color: black;
    color: white;`)
  })
})


