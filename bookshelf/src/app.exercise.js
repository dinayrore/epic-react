import React, {Suspense, lazy} from 'react'
import {useAuth} from './context/auth-context'
// 🐨 you'll want to render the FullPageSpinner as the fallback
import {FullPageSpinner} from './components/lib'

// 🐨 exchange these for React.lazy calls
const AuthenticatedAppLazy = lazy(() =>   import(/* webpackPrefetch: true */ './authenticated-app'))
const UnauthenticatedAppLazy = lazy(() => import('./unauthenticated-app'))



function App() {
  const {user} = useAuth()
  // 🐨 wrap this in a <React.Suspense /> component
  return (
    <Suspense fallback={<FullPageSpinner />}>
       {user ? <AuthenticatedAppLazy /> : <UnauthenticatedAppLazy />}
    </Suspense>
  )
}

export {App}
