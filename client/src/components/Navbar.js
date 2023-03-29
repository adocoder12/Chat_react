import { Link } from 'react-router-dom'
import { useLogout } from '../hooks/useLogout'
import { useAuthContext } from '../hooks/useAuthContext'

const Navbar = () => {
  const { logout } = useLogout()
  const { user } = useAuthContext()

  const handleClick = () => {
    logout(user._id)
  }

  return (
    <header>
      <div className="container">
        <Link to="/">
          <h1>Chat</h1>
        </Link>
        <nav>
          {user && (
            <div>
              <img className='avatar' alt='profilePicture' src={user.picture} />
              <span className='UserName'>  {user.username} </span>
              <button className='btn-logout' onClick={handleClick}>Log out</button>
            </div>
          )}
        </nav>
      </div>
    </header>
  )
}

export default Navbar