// simple test with ReactDOM
// http://localhost:3000/counter

import * as React from 'react'
import {act} from 'react-dom/test-utils'
import {createRoot} from 'react-dom/client'
import Counter from '../../components/counter'
import { incrementClickEvent, decrementClickEvent } from 'test/helpers'

// NOTE: this is a new requirement in React 18
// https://react.dev/blog/2022/03/08/react-18-upgrade-guide#configuring-your-testing-environment
// Luckily, it's handled for you by React Testing Library :)
global.IS_REACT_ACT_ENVIRONMENT = true

describe('Counter', () => { 
  // 🐨 create a div to render your component to (💰 document.createElement)
  const div = document.createElement('div')
   // 🐨 append the div to document.body (💰 document.body.append)
   document.body.append(div)

   // 🐨 use createRoot to render the <Counter /> to the div
   act(() => createRoot(div).render(<Counter />))

  afterEach(() => {
    act(() => div.remove())
  })
  
  test('counter increments when the button is clicked', () => {
    // 🐨 get a reference to the increment and decrement buttons:
    const [, increment] = div.querySelectorAll('button')
    // 🐨 get a reference to the message div:
    const message = div.firstChild.querySelector('div')  
    // 🐨 expect the message.textContent toBe 'Current count: 0'
    expect(message.textContent).toBe('Current count: 0')
    // 🐨 click the increment button (💰 act(() => increment.click()))
    act(() =>  increment.click())
    // 🐨 assert the message.textContent
    expect(message.textContent).toBe('Current count: 1')
  })
  
  test('counter decrements when the button is clicked', () => {
    const [decrement] = div.querySelectorAll('button')
    const message = div.firstChild.querySelector('div')
  
    // 🐨 expect the message.textContent toBe 'Current count: 1'
    expect(message.textContent).toBe('Current count: 1')
    // 🐨 click the decrement button 
    act(() =>  decrement.click())
    // 🐨 assert the message.textContent
    expect(message.textContent).toBe('Current count: 0')
  })

  test('counter increments and decrements when the buttons are clicked', () => {
    const [decrement, increment] = div.querySelectorAll('button')
    const message = div.firstChild.querySelector('div')
  
    expect(message.textContent).toBe('Current count: 0')
   
    act(() => increment.dispatchEvent(incrementClickEvent))
    expect(message.textContent).toBe('Current count: 1')
    
    act(() => decrement.dispatchEvent(decrementClickEvent))
    expect(message.textContent).toBe('Current count: 0')
  })
})