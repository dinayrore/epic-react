import {renderHook, act} from '@testing-library/react'
import {useAsync} from '../hooks'
import {deferred, defaultState, pendingState, resolvedState, rejectedState} from 'utils/helpers'

describe('useAsync', () => {
    beforeEach(() => {
        jest.spyOn(console, 'error')
      })
      
    afterEach(() => {
    console.error.mockRestore()
    })

    test('calling run with a promise which resolves', async () => {
        // 🐨 get a promise and resolve function from the deferred utility
        const {promise, resolve} = deferred()
        // 🐨 use renderHook with useAsync to get the result
        const {result} = renderHook(() => useAsync())
        // 🐨 assert the result.current is the correct default state
        expect(result.current).toEqual(defaultState)

        // 🐨 call `run`, passing the promise
        let newPromise
        act(() => {
            newPromise = result.current.run(promise)
        })
        // 🐨 assert that result.current is the correct pending state
        expect(result.current).toEqual(pendingState)
        // 🐨 call resolve and wait for the promise to be resolved
        const resolvedValue = Symbol('resolved value')
        await act(async () => {
            resolve(resolvedValue)
            await newPromise
        })
        // 🐨 assert the resolved state
        expect(result.current).toEqual({
            ...resolvedState,
            data: resolvedValue,
        })
        // 🐨 call `reset`
        act(() => {
            result.current.reset()
        })
        // 🐨 assert the result.current has actually been reset
        expect(result.current).toEqual(defaultState)
    })


    test('calling run with a promise which rejects', async () => {
        const {promise, reject} = deferred()
        const {result} = renderHook(() => useAsync())
        expect(result.current).toEqual(defaultState)
        let newPromise
        act(() => {
            newPromise = result.current.run(promise)
        })
        expect(result.current).toEqual(pendingState)
        const rejectedValue = Symbol('rejected value')
        await act(async () => {
            reject(rejectedValue)
            await newPromise.catch(() => {
            /* ignore error */
            })
        })
        expect(result.current).toEqual({...rejectedState, error: rejectedValue})
    })


    test('can specify an initial state', async () => {
        const mockData = Symbol('resolved value')
        const customInitialState = {status: 'resolved', data: mockData}
        const {result} = renderHook(() => useAsync(customInitialState))
        expect(result.current).toEqual({
            ...resolvedState,
            ...customInitialState,
        })
    })

    test('can set the data', async () => {
        const mockData = Symbol('resolved value')
        const {result} = renderHook(() => useAsync())
        act(() => {
            result.current.setData(mockData)
        })
        expect(result.current).toEqual({
            ...resolvedState,
            data: mockData,
        })
    })

    test('can set the error', async () => {
        const mockError = Symbol('rejected value')
        const {result} = renderHook(() => useAsync())
        act(() => {
            result.current.setError(mockError)
        })
        expect(result.current).toEqual({
            ...rejectedState,
            error: mockError,
        })
    })

    test('No state updates happen if the component is unmounted while pending', async () => {
        const {promise, resolve} = deferred()
        const {result, unmount} = renderHook(() => useAsync())
        let newPromise
        act(() => {
          newPromise = result.current.run(promise)
        })
        unmount()
        await act(async () => {
          resolve()
          await newPromise
        })
        // 🐨 ensure that console.error is not called (React will call console.error if updates happen when unmounted)
        expect(console.error).not.toHaveBeenCalled()
    })

    test('calling "run" without a promise results in an early error', async () => {
        const {result} = renderHook(() => useAsync())
        expect(() => result.current.run()).toThrowErrorMatchingInlineSnapshot(
        `"The argument passed to useAsync().run must be a promise. Maybe a function that's passed isn't returning anything?"`,
        )
    })
})