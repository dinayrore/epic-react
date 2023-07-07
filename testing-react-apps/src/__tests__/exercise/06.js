// mocking Browser APIs and modules
// http://localhost:3000/location

import * as React from 'react'
import {render, screen, act} from '@testing-library/react'
import Location from '../../examples/location'
import faker from 'faker'

// 🐨 set window.navigator.geolocation to an object that has a getCurrentPosition mock function
beforeAll(() => {
  window.navigator.geolocation = {
    getCurrentPosition: jest.fn()
  }
})


function deferred() {
  let resolve, reject
  const promise = new Promise((res, rej) => {
    resolve = res
    reject = rej
  })
  return {promise, resolve, reject}
}

describe(('Location'), () => {
  test('displays the users current location', async () => {
    const fakeCoords = {
      coords: {
        latitude: faker.address.latitude(),
        longitude: faker.address.longitude(),
      } 
    }
  
    const {promise, resolve} = deferred()
    window.navigator.geolocation.getCurrentPosition.mockImplementation(
      callback => {
        promise.then(() => callback(fakeCoords))
      },
    )
  
    render(<Location />)
  
    expect(screen.getByLabelText(/loading/i)).toBeInTheDocument()
  
    await act(async () => {
      resolve()
      await promise
    })
  
    expect(screen.queryByLabelText(/loading/i)).not.toBeInTheDocument()
  
    expect(screen.getByText(/latitude/i)).toHaveTextContent(
      `Latitude: ${fakeCoords.coords.latitude}`,
    )
    expect(screen.getByText(/longitude/i)).toHaveTextContent(
      `Longitude: ${fakeCoords.coords.longitude}`,
    )
  
  })
})



