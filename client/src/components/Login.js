import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Cookies from 'universal-cookie'
import jwt from 'jwt-decode'

const Login = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()
  const cookies = new Cookies()

  function validLogin(e) {
    e.preventDefault()

    fetch('http://localhost:3001/login', {
      method: 'POST',
      headers: {
        Accept: 'application/json, text/plain, */*',
        'Content-type': 'application/json'
      },
      body: JSON.stringify({ username, password })
    }).then((res) =>
      res.json().then((data) => {
        if (res.status !== 201) {
          console.log(data, res.status)
          return window.alert(data.msg)
        }
        const decoded = jwt(data.token)
        console.log(decoded, data.token)
        cookies.set('jwt-auth', data.token, {
          expires: new Date(decoded.exp * 1000)
        })
        navigate('/home')
      })
    )
    setUsername('')
    setPassword('')
  }

  return (
    <div className="login-section">
      <div className="login-container">
        <div className="login-form">
          <form onSubmit={validLogin}>
            <label htmlFor="username">Username:</label>
            <input
              type="text"
              id="username"
              value={username}
              className="form-control form-control-lg"
              onChange={(e) => setUsername(e.target.value)}
            />
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              value={password}
              className="form-control form-control-lg"
              onChange={(e) => setPassword(e.target.value)}
            />
            <input
              type="submit"
              value="Login"
              className="btn btn-outline-dark"
              style={{
                display: 'block',
                width: '100%'
              }}
            />
          </form>
        </div>
      </div>
    </div>
  )
}

export default Login
