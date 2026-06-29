import { useState, useEffect } from 'react'

/**
 * API Configuration
 * 
 * VITE_CODESPACE_NAME environment variable must be defined in .env.local
 * Example: VITE_CODESPACE_NAME=myuser-myrepo-g5w4vx96x9234f4w
 * 
 * This will construct API endpoints like:
 * https://myuser-myrepo-g5w4vx96x9234f4w-8000.app.github.dev/api/activities/
 */
const getApiBaseUrl = () => {
  const codespaceName = import.meta.env.VITE_CODESPACE_NAME
  if (!codespaceName) {
    console.warn('VITE_CODESPACE_NAME is not defined. Please set it in .env.local')
    return null
  }
  return `https://${codespaceName}-8000.app.github.dev/api`
}

function Activities() {
  const [activities, setActivities] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const apiUrl = getApiBaseUrl()
    if (!apiUrl) {
      setError('VITE_CODESPACE_NAME is not configured. Please update .env.local')
      setLoading(false)
      return
    }

    const fetchActivities = async () => {
      try {
        const response = await fetch(`${apiUrl}/activities/`)
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`)
        }
        const data = await response.json()
        
        // Handle both paginated response and array response
        const activitiesList = data.results || (Array.isArray(data) ? data : [])
        setActivities(activitiesList)
        setError(null)
      } catch (err) {
        setError(err.message)
        setActivities([])
      } finally {
        setLoading(false)
      }
    }

    fetchActivities()
  }, [])

  if (loading) {
    return <div className="container mt-5"><div className="loading">Loading activities...</div></div>
  }

  return (
    <div className="container mt-5">
      <h1>Activities</h1>
      
      {error && <div className="error">{error}</div>}
      
      {activities.length === 0 ? (
        <div className="no-data">No activities found</div>
      ) : (
        <table className="table table-striped">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Description</th>
              <th>Created At</th>
            </tr>
          </thead>
          <tbody>
            {activities.map(activity => (
              <tr key={activity.id || activity._id}>
                <td>{activity.id || activity._id}</td>
                <td>{activity.name}</td>
                <td>{activity.description}</td>
                <td>{new Date(activity.createdAt).toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  )
}

export default Activities
