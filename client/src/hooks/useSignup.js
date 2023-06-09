import { useState, } from 'react'

import { useAuthContext } from './useAuthContext'
// import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL;

export const useSignup = () => {
  const [error, setError] = useState(null)
  const [isLoading, setIsLoading] = useState(null)
  const { dispatch } = useAuthContext()


  const signup = async (username, email, password, picture) => {
    setIsLoading(true)
    setError(null)

    const response = await fetch(API_URL + '/user/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, email, password, picture })
    })
    const json = await response.json()

    if (!response.ok) {
      setIsLoading(false)
      setError(json.error)
    }
    if (response.ok) {
      // save the user to local storage
      localStorage.setItem('user', JSON.stringify(json))

      // update the auth context
      dispatch({ type: 'LOGIN', payload: json })

      // update loading state
      setIsLoading(false)
    }
  }

  return { signup, isLoading, error }
}