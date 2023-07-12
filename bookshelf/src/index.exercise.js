import '@reach/dialog/styles.css'
import React from 'react'
import {createRoot} from 'react-dom'
import { Dialog } from '@reach/dialog'
import {Logo} from './components/logo'
import {useModal} from './hooks/useModal'
import Form from './components/Form'

const App = () => {
    const {openModal, setOpenModal} = useModal()

    return (
        <div>
        <Logo width="80" height='80' />
        <h1>Bookshelf</h1>
        <button onClick={() => setOpenModal('login')}>Log In</button>
        <button onClick={() => setOpenModal('register')}>Register</button>
        <Dialog aria-label="Registration Form" isOpen={openModal === 'register'}>
            <button onClick={() => setOpenModal('none')}>
                Close
            </button>
            <h3>Register</h3>
            <Form buttonText={'submit'} />
        </Dialog>
        <Dialog aria-label="Login Form" isOpen={openModal === 'login'}>
            <button onClick={() => setOpenModal('none')}>
                Close
            </button>
            <h3>Login</h3>
            <Form />
        </Dialog>
        </div>
    )
}

createRoot(document.getElementById('root')).render(<App />)

export default App
