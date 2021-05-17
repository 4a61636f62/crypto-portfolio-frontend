import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { login } from '../reducers/userReducer'

// eslint-disable-next-line react/prop-types
const LoginForm = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [retry, setRetry] = useState(false)

  const dispatch = useDispatch()

  const handleLogin = async (event) => {
    event.preventDefault()
    setPassword('')
    let success = false
    dispatch(login(username, password)).then(() => {
      success = true
    })
    if (!success) {
      setRetry(true)
    }
  }

  return (
    <form onSubmit={handleLogin}>
       {retry ? <p>invalid username or password</p> : null}
      <div>
        username
        <input
          id='username-input'
          data-cy='username-input'
          value={username}
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        password
        <input
          type='password'
          id='password-input'
          data-cy='password-input'
          value={password}
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button data-cy='login-button' type='submit'>login</button>
    </form>
  )
}

export default LoginForm
