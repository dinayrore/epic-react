import faker from 'faker'

export const incrementClickEvent = new MouseEvent('click', {
    bubbles: true,
    cancelable: true,
    button: 0,
  })

  export const decrementClickEvent = new MouseEvent('click', {
    bubbles: true,
    cancelable: true,
    button: 0,
  })

  export const generateLoginFormData = (overrides) => {
    return {
      username: faker.internet.userName(),
      password: faker.internet.password(),
      ...overrides
    }
  }