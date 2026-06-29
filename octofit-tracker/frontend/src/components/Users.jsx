import { useState, useEffect } from 'react'

/**
 * API Configuration
 * 
 * VITE_CODESPACE_NAME environment variable must be defined in .env.local
 * Example: VITE_CODESPACE_NAME=myuser-myrepo-g5w4vx96x9234f4w
 * 
 * This will construct API endpoints like:
 * https://myuser-myrepo-g5w4vx96x9234f4w-8000.app.github.dev/api/users/
 */
const getApiBaseUrl = () => {
  const codespaceName = import.meta.env.VITE_CODESPACE_NAME
  if (!codespaceName) {
    console.warn('VITE_CODESPACE_NAME is not defined. Please set it in .env.local')
    return null
  }
  return `https://${codespaceName}-8000.app.github.dev/api`
}

function Users() {
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const apiUrl = getApiBaseUrl()
    if (!apiUrl) {
      setError('VITE_CODESPACE_NAME is not configured. Please update .env.local')
      setLoading(false)
      return
    }

    const fetchUsers = async () => {
      try {
        const response = await fetch(`${apiUrl}/users/`)
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`)
        }
        const data = await response.json()
        
        // Handle both paginated response and array response
        const usersList = data.results || (Array.isArray(data) ? data : [])
        setUsers(usersList)
        setError(null)
      } catch (err) {
        setError(err.message)
        setUsers([])
      } finally {
        setLoading(false)
      }
    }

    fetchUsers()
  }, [])

  if (loading) {
    return <div className="container mt-5"><div className="loading">Loading users...</div></div>
  }

  return (
    <div className="container mt-5">
      <h1>Users</h1>
      
      {error && <div className="error">{error}</div>}
      
      {users.length === 0 ? (
        <div className="no-data">No users found</div>
      ) : (
        <table className="table table-striped">
          <thead>
            <tr>
              <th>Username</th>
              <th>Email</th>
              <th>Team</th>
              <th>Points</th>
              <th>Joined</th>
            </tr>
          </thead>
          <tbody>
            {users.map(user => (
              <tr key={user.id || user._id}>
                <td>{user.username}</td>
                <td>{user.email}</td>
                <td>{user.team || 'N/A'}</td>
                <td>{user.points || 0}</td>
                <td>{new Date(user.joinedAt || user.createdAt).toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  )
}

export default Users
