import React, { useState } from "react"
import { useLogin } from "../hooks/useLogin"
import { Link } from "react-router-dom";

const Login = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const { login, error, isLoading } = useLogin()

  const handleSubmit = async (e) => {
    e.preventDefault()
    await login(username, password)
  }

  return (
    <form className="login" onSubmit={handleSubmit}>
      <h3>LOGIN</h3>

      <label>Username:</label>
      <input
        type="text"
        onChange={(e) => setUsername(e.target.value)}
        value={username}
      />
      <label>Password:</label>
      <input
        type="password"
        onChange={(e) => setPassword(e.target.value)}
        value={password}
      />

      <button disabled={isLoading}>Log in</button>
      {error && <div className="error">{error}</div>}
      <p className="small">
        <Link to="/register" className="links">
          Don't you  have an account ?
        </Link>
      </p>
    </form>
  )
}

export default Login