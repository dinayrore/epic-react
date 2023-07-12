import React from 'react'

const Form = ({buttonText, onSubmit}) => {
    const handleSubmit = event => {
        event.preventDefault()
        const {username, password} = event.target.elements
        onSubmit({
            username: username.value,
            password: password.value,
        })
    }

    return (
        <form>
            <div>
                <label htmlFor="username">Username</label>
                <input id="username" type="text" />
            </div>
            <div>
                <label htmlFor="password">Password</label>
                <input id="password" type="password" />
            </div>
            <div>
                <button type="submit" onSubmit={handleSubmit}>{buttonText}</button>
            </div>
        </form>
    )
}

export default Form