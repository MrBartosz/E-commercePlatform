'use client'
import { useState } from 'react'
import LoginForm from './LoginForm'

const LoginPage = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  const handleLogin = () => {
    setIsLoggedIn(true)
  }

  return <div>{isLoggedIn ? <p>Welcome! You are now logged in.</p> : <LoginForm onLogin={handleLogin} />}</div>
}

export default LoginPage
