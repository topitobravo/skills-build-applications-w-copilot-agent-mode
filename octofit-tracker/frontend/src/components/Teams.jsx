import { useState, useEffect } from 'react'

/**
 * API Configuration
 * 
 * VITE_CODESPACE_NAME environment variable must be defined in .env.local
 * Example: VITE_CODESPACE_NAME=myuser-myrepo-g5w4vx96x9234f4w
 * 
 * This will construct API endpoints like:
 * https://myuser-myrepo-g5w4vx96x9234f4w-8000.app.github.dev/api/teams/
 */
const getApiBaseUrl = () => {
  const codespaceName = import.meta.env.VITE_CODESPACE_NAME
  if (!codespaceName) {
    console.warn('VITE_CODESPACE_NAME is not defined. Please set it in .env.local')
    return null
  }
  return `https://${codespaceName}-8000.app.github.dev/api`
}

function Teams() {
  const [teams, setTeams] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const apiUrl = getApiBaseUrl()
    if (!apiUrl) {
      setError('VITE_CODESPACE_NAME is not configured. Please update .env.local')
      setLoading(false)
      return
    }

    const fetchTeams = async () => {
      try {
        const response = await fetch(`${apiUrl}/teams/`)
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`)
        }
        const data = await response.json()
        
        // Handle both paginated response and array response
        const teamsList = data.results || (Array.isArray(data) ? data : [])
        setTeams(teamsList)
        setError(null)
      } catch (err) {
        setError(err.message)
        setTeams([])
      } finally {
        setLoading(false)
      }
    }

    fetchTeams()
  }, [])

  if (loading) {
    return <div className="container mt-5"><div className="loading">Loading teams...</div></div>
  }

  return (
    <div className="container mt-5">
      <h1>Teams</h1>
      
      {error && <div className="error">{error}</div>}
      
      {teams.length === 0 ? (
        <div className="no-data">No teams found</div>
      ) : (
        <div className="row">
          {teams.map(team => (
            <div key={team.id || team._id} className="col-md-6 col-lg-4 mb-4">
              <div className="card">
                <div className="card-body">
                  <h5 className="card-title">{team.name}</h5>
                  <p className="card-text">{team.description}</p>
                  <p className="card-text">
                    <small className="text-muted">Members: {team.memberCount || 0}</small>
                  </p>
                  <p className="card-text">
                    <small className="text-muted">Points: {team.points || 0}</small>
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default Teams
