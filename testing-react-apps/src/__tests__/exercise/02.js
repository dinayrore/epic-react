// simple test with React Testing Library
// http://localhost:3000/counter

import * as React from 'react'
import {render, fireEvent} from '@testing-library/react'
import Counter from '../../components/counter'

describe('Counter', () => {
  test('counter increments when the button is clicked', () => {
    const {container} = render(<Counter />)
    const [, increment] = container.querySelectorAll('button')
    const message = container.firstChild.querySelector('div')
    expect(message).toHaveTextContent('Current count: 0')   
    fireEvent.click(increment) 
    expect(message).toHaveTextContent('Current count: 1')
  })
  
  test('counter decrements when the button is clicked', () => {
    const {container} = render(<Counter />)
    const [decrement] = container.querySelectorAll('button')
    const message = container.firstChild.querySelector('div')
    expect(message).toHaveTextContent('Current count: 0') 
    fireEvent.click(decrement)
    expect(message).toHaveTextContent('Current count: -1')
  })

  test('counter increments and decrements when the buttons are clicked', () => {
    const {container} = render(<Counter />)
    const [decrement, increment] = container.querySelectorAll('button')
    const message = container.firstChild.querySelector('div')
    expect(message).toHaveTextContent('Current count: 0')   
    fireEvent.click(increment) 
    expect(message).toHaveTextContent('Current count: 1')
    fireEvent.click(decrement)
    expect(message).toHaveTextContent('Current count: 0')
  })
  
})

