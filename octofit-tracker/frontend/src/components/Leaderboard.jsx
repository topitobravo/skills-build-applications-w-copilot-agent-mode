import { useState, useEffect } from 'react'

/**
 * API Configuration
 * 
 * VITE_CODESPACE_NAME environment variable must be defined in .env.local
 * Example: VITE_CODESPACE_NAME=myuser-myrepo-g5w4vx96x9234f4w
 * 
 * This will construct API endpoints like:
 * https://myuser-myrepo-g5w4vx96x9234f4w-8000.app.github.dev/api/leaderboard/
 */
const getApiBaseUrl = () => {
  const codespaceName = import.meta.env.VITE_CODESPACE_NAME
  if (!codespaceName) {
    console.warn('VITE_CODESPACE_NAME is not defined. Please set it in .env.local')
    return null
  }
  return `https://${codespaceName}-8000.app.github.dev/api`
}

function Leaderboard() {
  const [leaderboard, setLeaderboard] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const apiUrl = getApiBaseUrl()
    if (!apiUrl) {
      setError('VITE_CODESPACE_NAME is not configured. Please update .env.local')
      setLoading(false)
      return
    }

    const fetchLeaderboard = async () => {
      try {
        const response = await fetch(`${apiUrl}/leaderboard/`)
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`)
        }
        const data = await response.json()
        
        // Handle both paginated response and array response
        const leaderboardList = data.results || (Array.isArray(data) ? data : [])
        setLeaderboard(leaderboardList)
        setError(null)
      } catch (err) {
        setError(err.message)
        setLeaderboard([])
      } finally {
        setLoading(false)
      }
    }

    fetchLeaderboard()
  }, [])

  if (loading) {
    return <div className="container mt-5"><div className="loading">Loading leaderboard...</div></div>
  }

  return (
    <div className="container mt-5">
      <h1>Leaderboard</h1>
      
      {error && <div className="error">{error}</div>}
      
      {leaderboard.length === 0 ? (
        <div className="no-data">No leaderboard data available</div>
      ) : (
        <table className="table table-striped">
          <thead>
            <tr>
              <th>Rank</th>
              <th>Name</th>
              <th>Points</th>
              <th>Activities</th>
              <th>Team</th>
            </tr>
          </thead>
          <tbody>
            {leaderboard.map((entry, index) => (
              <tr key={entry.id || entry._id}>
                <td>{index + 1}</td>
                <td>{entry.name || entry.username}</td>
                <td className="fw-bold">{entry.points || entry.score}</td>
                <td>{entry.activityCount || 0}</td>
                <td>{entry.team || 'N/A'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  )
}

export default Leaderboard
