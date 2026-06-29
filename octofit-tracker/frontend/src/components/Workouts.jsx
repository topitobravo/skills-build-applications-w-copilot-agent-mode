import { useState, useEffect } from 'react'

/**
 * API Configuration
 * 
 * VITE_CODESPACE_NAME environment variable must be defined in .env.local
 * Example: VITE_CODESPACE_NAME=myuser-myrepo-g5w4vx96x9234f4w
 * 
 * This will construct API endpoints like:
 * https://myuser-myrepo-g5w4vx96x9234f4w-8000.app.github.dev/api/workouts/
 */
const getApiBaseUrl = () => {
  const codespaceName = import.meta.env.VITE_CODESPACE_NAME
  if (!codespaceName) {
    console.warn('VITE_CODESPACE_NAME is not defined. Please set it in .env.local')
    return null
  }
  return `https://${codespaceName}-8000.app.github.dev/api`
}

function Workouts() {
  const [workouts, setWorkouts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const apiUrl = getApiBaseUrl()
    if (!apiUrl) {
      setError('VITE_CODESPACE_NAME is not configured. Please update .env.local')
      setLoading(false)
      return
    }

    const fetchWorkouts = async () => {
      try {
        const response = await fetch(`${apiUrl}/workouts/`)
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`)
        }
        const data = await response.json()
        
        // Handle both paginated response and array response
        const workoutsList = data.results || (Array.isArray(data) ? data : [])
        setWorkouts(workoutsList)
        setError(null)
      } catch (err) {
        setError(err.message)
        setWorkouts([])
      } finally {
        setLoading(false)
      }
    }

    fetchWorkouts()
  }, [])

  if (loading) {
    return <div className="container mt-5"><div className="loading">Loading workouts...</div></div>
  }

  return (
    <div className="container mt-5">
      <h1>Workouts</h1>
      
      {error && <div className="error">{error}</div>}
      
      {workouts.length === 0 ? (
        <div className="no-data">No workouts found</div>
      ) : (
        <table className="table table-striped">
          <thead>
            <tr>
              <th>ID</th>
              <th>Title</th>
              <th>Duration (mins)</th>
              <th>Intensity</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {workouts.map(workout => (
              <tr key={workout.id || workout._id}>
                <td>{workout.id || workout._id}</td>
                <td>{workout.title}</td>
                <td>{workout.duration}</td>
                <td>{workout.intensity}</td>
                <td>{new Date(workout.date).toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  )
}

export default Workouts
