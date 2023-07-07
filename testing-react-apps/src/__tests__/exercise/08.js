// testing custom hooks
// http://localhost:3000/counter-hook

import * as React from 'react'
import {render, screen, act, renderHook} from 'test/test-utils'
import useCounter from 'components/use-counter'
import userEvent from '@testing-library/user-event'
import Counter from 'examples/counter-hook'

describe('useCounter', () => {
  test('exposes the count and increment/decrement functions', async () => {
    render(<Counter />)
    const increment = screen.getByRole('button', {name: /increment/i})
    const decrement = screen.getByRole('button', {name: /decrement/i})
    const message = screen.getByText(/current count/i)
  
    expect(message).toHaveTextContent('Current count: 0')
    await userEvent.click(increment)
    expect(message).toHaveTextContent('Current count: 1')
    await userEvent.click(decrement)
    expect(message).toHaveTextContent('Current count: 0')
  
  })

  test('use fake component', async () => {
    let result
    function TestComponent() {
      result = useCounter()
      return null
    }
    render(<TestComponent />)

    expect(result.count).toBe(0)
    act(() => result.increment())
    expect(result.count).toBe(1)
    act(() => result.decrement())
    expect(result.count).toBe(0)
  })


test('test using react hooks', () => {
  const {result} = renderHook(useCounter, {initialProps: {step: 2}})
  
  expect(result.current.count).toBe(0)
  act(() => result.current.increment())
  expect(result.current.count).toBe(2)
  act(() => result.current.decrement())
  expect(result.current.count).toBe(0)
})
})


