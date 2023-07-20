export const deferred = () => {
    let resolve, reject
    const promise = new Promise((res, rej) => {
      resolve = res
      reject = rej
    })
    return {promise, resolve, reject}
  }
  
  export const defaultState = {
    status: 'idle',
    data: null,
    error: null,
  
    isIdle: true,
    isLoading: false,
    isError: false,
    isSuccess: false,
  
    run: expect.any(Function),
    reset: expect.any(Function),
    setData: expect.any(Function),
    setError: expect.any(Function),
  }
  
  export const pendingState = {
    ...defaultState,
    status: 'pending',
    isIdle: false,
    isLoading: true,
  }
  
  export const resolvedState = {
    ...defaultState,
    status: 'resolved',
    isIdle: false,
    isSuccess: true,
  }
  
  export const rejectedState = {
    ...defaultState,
    status: 'rejected',
    isIdle: false,
    isError: true,
  }
  