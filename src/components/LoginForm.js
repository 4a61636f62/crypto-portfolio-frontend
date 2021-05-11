import React, { useState } from 'react'

// eslint-disable-next-line react/prop-types
const LoginForm = ({ login }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [retry, setRetry] = useState(false)

  const handleLogin = async (event) => {
    event.preventDefault()
    setPassword('')
    const successful = await login(username, password)
    if (!successful) {
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
