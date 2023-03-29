import { useAuthContext } from './useAuthContext'

const API_URL = process.env.REACT_APP_API_URL;

export const useLogout = () => {
  const { dispatch } = useAuthContext()




  const logout = async (_id) => {

    await fetch(API_URL + '/user/logout', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ _id })
    })

    localStorage.removeItem('user')
    // localStorage.clear()
    // remove user from storage

    // dispatch logout action
    dispatch({ type: 'LOGOUT' })

  }

  return { logout }
}