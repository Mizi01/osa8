import { useMutation } from '@apollo/client'
import { useState, useEffect } from 'react'
import { LOGIN } from '../queries'

const LoginForm = ({ setToken, setPage }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  
  const [login, result] = useMutation(LOGIN)

  useEffect(() => {
    if (result.data) {
      const token = result.data.login.value
      setToken(token)
      localStorage.setItem('book-user-token', token)
    }
  }, [result.data]) // eslint-disable-line

  const submit = async (event) => {
    event.preventDefault()

    await login({ variables: { username, password } })
    setPage('authors')
    setUsername('')
    setPassword('')
  }

  const handleUsername = (event) => {
    console.log(event.target.value)
    setUsername(event.target.value)
  }

  const handlePassword = (event) => {
    console.log(event.target.value)
    setPassword(event.target.value)
  }

  return (
    <div>
      <form onSubmit={submit}>
          <div>username <input value={username} onChange={handleUsername}/></div>
          <div>password <input value={password} onChange={handlePassword}/></div>
          <button type="submit">login</button>
          </form>
    </div>
  )
}

export default LoginForm