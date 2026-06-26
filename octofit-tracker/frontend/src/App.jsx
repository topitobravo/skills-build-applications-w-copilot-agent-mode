import './App.css'
import { Link, Route, Routes } from 'react-router-dom'

function Home() {
  return (
    <div className="container py-5">
      <div className="row align-items-center">
        <div className="col-lg-7">
          <h1 className="display-5 fw-bold mb-3">OctoFit Tracker</h1>
          <p className="lead text-muted">
            Track workouts, lead teams, and stay motivated with a modern multi-tier fitness platform.
          </p>
          <Link className="btn btn-primary btn-lg" to="/dashboard">
            Explore dashboard
          </Link>
        </div>
        <div className="col-lg-5">
          <div className="card shadow-sm border-0">
            <div className="card-body">
              <h2 className="h4">Ready to level up?</h2>
              <p className="mb-0 text-muted">
                Log activities, compare leaderboard scores, and receive personalized suggestions.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function Dashboard() {
  return (
    <div className="container py-5">
      <h1 className="display-6 fw-semibold">Dashboard</h1>
      <p className="text-muted">Your activity overview and team insights will appear here.</p>
    </div>
  )
}

function App() {
  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container">
          <Link className="navbar-brand" to="/">
            OctoFit
          </Link>
          <div className="navbar-nav ms-auto">
            <Link className="nav-link" to="/">
              Home
            </Link>
            <Link className="nav-link" to="/dashboard">
              Dashboard
            </Link>
          </div>
        </div>
      </nav>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </div>
  )
}

export default App
