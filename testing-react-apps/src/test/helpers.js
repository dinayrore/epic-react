import faker from 'faker'
import { ThemeProvider } from 'components/theme'
import { render } from '@testing-library/react'

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

export const renderWithProviders = (ui, {theme = 'light', ...options} = {}) => {
    const Wrapper = ({children}) => (
      <ThemeProvider initialTheme={theme}>{children}</ThemeProvider>
    )
    return render(ui, {wrapper: Wrapper, ...options})
  }