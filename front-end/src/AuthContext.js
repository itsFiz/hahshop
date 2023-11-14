import { createContext, useContext, useState } from 'react'
import setting from './setting.js'

const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
  const [authenticated, setAuthenticated] = useState(false)
  const [jwt, setJwt] = useState()
  const [msg, setMsg] = useState('')
  const [role, setRole] = useState(['public'])
  const [username, setUsername] = useState()
  const [token, setToken] = useState()

  const login = (username, password) => {
    console.log(username, password)
    let login = { userId: username, password: password }

    let setting = {
      method: 'POST',
      body: JSON.stringify(login),
      headers: { 'Content-type': 'application/json' },
    }

    fetch('http://localhost:8080/auth/signin', setting)
      .then((body) => {
        console.log('status', body.status)
        if (body.status === 200) {
          return body.json()
        } else {
          setMsg('Username and Password do not match')
          return { user: '' }
        }
      })
      .then((json) => {
        console.log(json)
        if (json.user !== '') {
          setAuthenticated(true)
          setMsg('')
          let roles = json.user.roles.split(',')
          setRole(roles)
          setToken(json.token)
          setUsername(json.user.name)
        } else {
          // show login failed message
          setMsg('Username and Password do not match')
        }
      })
      .catch((err) => {
        console.log(err)
        setMsg('Technical Error')
      })

    // Implement your authentication logic here
    // if (username === 'johndoe' && password === '1234') {
    //     setAuthenticated(true);
    //     setJwt('1234');
    //     setMsg('');
    //     setRole('ADMIN');
    //     setUsername(username);
    // } else if (username === 'abu' && password === '1234') {
    //     setAuthenticated(true);
    //     setMsg('');
    //     setRole('AUTHOR');
    //     setUsername(username);
    // } else {
    //     // show login failed message
    //     setMsg('Username and Password do not match');
    // }
  }

  const logout = () => {
    setAuthenticated(false)
    window.location.href = '/'
  }

  return (
    <AuthContext.Provider
      value={{ authenticated, login, logout, jwt, msg, role, username, token }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  return useContext(AuthContext)
}
