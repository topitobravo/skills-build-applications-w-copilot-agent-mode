# OctoFit Tracker - Frontend Setup Guide

## Overview

This is the presentation tier for the OctoFit Tracker multi-tier application, built with:
- **React 19** with Vite
- **react-router-dom** for client-side navigation
- **Bootstrap** for styling

## Quick Start

### 1. Install Dependencies

```bash
cd frontend
npm install
```

### 2. Configure Environment Variables

Edit `.env.local` and set your Codespace name:

```
VITE_CODESPACE_NAME=your-codespace-name
```

See [ENV_SETUP.md](./ENV_SETUP.md) for detailed instructions.

### 3. Start Development Server

```bash
npm run dev
```

The application will be available at `http://localhost:5173`

## API Integration

All components connect to the backend API using Vite environment variables:

- Base URL: `https://${VITE_CODESPACE_NAME}-8000.app.github.dev/api`
- Endpoints:
  - `/api/activities/`
  - `/api/workouts/`
  - `/api/leaderboard/`
  - `/api/teams/`
  - `/api/users/`

### Safe Fallbacks

Each component includes a `getApiBaseUrl()` function that:
- Checks if `VITE_CODESPACE_NAME` is defined
- Returns `null` if not defined (prevents `https://undefined-8000...` URLs)
- Displays a user-friendly error message

### Paginated Response Handling

Components handle both response formats:
- **Paginated**: `{ results: [...] }`
- **Array**: `[...]`

## Project Structure

```
frontend/
├── index.html              # HTML entry point
├── .env.local             # Environment variables (Git-ignored)
├── ENV_SETUP.md           # Environment setup guide
├── vite.config.js         # Vite configuration
├── package.json
└── src/
    ├── main.jsx           # React entry point with BrowserRouter
    ├── App.jsx            # Main app component with route definitions
    ├── App.css
    ├── index.css
    └── components/
        ├── Activities.jsx # List activities
        ├── Workouts.jsx   # List workouts
        ├── Leaderboard.jsx # Display leaderboard
        ├── Teams.jsx       # Display teams
        └── Users.jsx       # List users
```

## Components

### Activities
Fetches and displays a list of activities from the API.

### Workouts
Displays logged workouts with duration, intensity, and date.

### Leaderboard
Shows ranked users by points, including team affiliation.

### Teams
Displays teams in a card layout with member count and points.

### Users
Lists all users with email, team, and points information.

## Navigation

The main navigation bar provides links to all sections:
- Activities
- Workouts
- Leaderboard
- Teams
- Users

## Building for Production

```bash
npm run build
```

Output will be in the `dist/` directory.

## Troubleshooting

### "VITE_CODESPACE_NAME is not configured"

**Problem**: You see this error in the browser and console.

**Solution**: 
1. Ensure `.env.local` exists in the `frontend/` directory
2. Set `VITE_CODESPACE_NAME` to your Codespace name
3. Restart the dev server: Stop it (Ctrl+C) and run `npm run dev` again

### API requests failing (404 or connection errors)

**Problem**: Network errors when fetching from `/api/` endpoints.

**Possible causes**:
- Backend server is not running on port 8000
- `VITE_CODESPACE_NAME` is incorrect
- CORS headers not configured on backend

**Solution**:
1. Verify the backend is running: `ps aux | grep -i node` or `ps aux | grep -i express`
2. Check the browser's Network tab (DevTools) to see the actual URL being requested
3. Ensure backend has CORS enabled for your frontend URL

### Module not found errors

**Problem**: "Cannot find module" errors during development.

**Solution**:
1. Ensure all dependencies are installed: `npm install`
2. Check that all component files exist in `src/components/`
3. Clear node_modules and reinstall: `rm -r node_modules && npm install`

## Environment Details

- **Port**: 5173 (Vite dev server)
- **API Port**: 8000 (Backend - accessed via Codespace proxy)
- **Stack**: React 19, Vite 5, Bootstrap 5, React Router 6
