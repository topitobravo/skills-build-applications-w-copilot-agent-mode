# OctoFit Tracker - Multi-tier Application

A fitness tracking application for Mergington High School built with React, Express, Node.js, and MongoDB.

## Architecture

```
octofit-tracker/
├── backend/                 # Logic tier (Node.js/Express)
│   ├── src/
│   ├── package.json
│   ├── tsconfig.json
│   ├── .gitignore
│   └── README.md           # Backend setup guide
│
└── frontend/               # Presentation tier (React/Vite)
    ├── src/
    │   ├── components/     # React components
    │   ├── App.jsx
    │   ├── main.jsx
    │   ├── App.css
    │   └── index.css
    ├── index.html
    ├── vite.config.js
    ├── package.json
    ├── .env.local         # Environment variables (Git-ignored)
    ├── .gitignore
    ├── ENV_SETUP.md       # Environment setup guide
    ├── README.md          # Frontend setup guide
    └── .gitignore
```

## Quick Start

### Prerequisites

- Node.js (LTS)
- npm or yarn
- MongoDB running locally or in cloud
- GitHub Codespace (recommended for development)

### Frontend Setup

```bash
cd frontend
npm install
# Edit .env.local with your VITE_CODESPACE_NAME
npm run dev
```

Access at: `http://localhost:5173`

### Backend Setup

```bash
cd backend
npm install
npm run dev
```

API available at: `https://{CODESPACE_NAME}-8000.app.github.dev/api/`

## Technology Stack

### Presentation Tier (Frontend)
- **React 19** - UI library
- **Vite** - Build tool and dev server
- **react-router-dom** - Client-side routing
- **Bootstrap 5** - CSS framework
- **Port**: 5173

### Logic Tier (Backend)
- **Node.js** - JavaScript runtime
- **Express** - Web framework
- **TypeScript** - Type safety
- **Mongoose** - MongoDB ORM
- **Port**: 8000

### Data Tier
- **MongoDB** - Document database
- **Mongoose** - Schema validation and data modeling
- **Port**: 27017

## Features

- User authentication and profiles
- Activity logging and tracking
- Team creation and management
- Competitive leaderboard
- Personalized workout suggestions

## Component Details

### Frontend Components

| Component | Purpose |
|-----------|---------|
| **Activities** | Display and manage activities |
| **Workouts** | Log and view workouts |
| **Leaderboard** | Show user rankings by points |
| **Teams** | Display teams and members |
| **Users** | Manage user profiles |

### API Endpoints

All endpoints use the base URL:
```
https://{VITE_CODESPACE_NAME}-8000.app.github.dev/api/
```

- `GET /api/activities/` - List all activities
- `GET /api/workouts/` - List all workouts
- `GET /api/leaderboard/` - Get leaderboard rankings
- `GET /api/teams/` - List teams
- `GET /api/users/` - List users

## Environment Configuration

### Frontend (.env.local)

```
VITE_CODESPACE_NAME=your-codespace-name
```

See [frontend/ENV_SETUP.md](./frontend/ENV_SETUP.md) for details.

### Backend (.env or .env.local)

Configure MongoDB connection, API keys, etc. (Backend README coming soon)

## Development

### Frontend Development
```bash
cd frontend
npm run dev          # Start dev server
npm run build        # Build for production
npm run preview      # Preview production build
npm run lint         # Run linter
```

### Backend Development
```bash
cd backend
npm run dev          # Start server with hot reload
npm run build        # Compile TypeScript
npm start            # Start from compiled output
npm run lint         # Run linter
```

## API Response Format

Components handle both response formats:

**Paginated Response**:
```json
{
  "results": [
    { "id": 1, "name": "Activity 1" },
    { "id": 2, "name": "Activity 2" }
  ],
  "count": 2,
  "next": null,
  "previous": null
}
```

**Direct Array Response**:
```json
[
  { "id": 1, "name": "Activity 1" },
  { "id": 2, "name": "Activity 2" }
]
```

## Troubleshooting

### Cannot reach API endpoints
1. Verify backend is running on port 8000
2. Check `VITE_CODESPACE_NAME` is set correctly
3. Ensure CORS is enabled on backend

### "VITE_CODESPACE_NAME is not defined" error
1. Create/edit `.env.local` in the `frontend/` directory
2. Add your Codespace name
3. Restart dev server

### MongoDB connection issues
1. Check MongoDB is running: `ps aux | grep mongod`
2. Verify connection string in backend .env
3. Use `mongosh` to test connection

## Project Documentation

- [Frontend README](./frontend/README.md) - React app setup and usage
- [Frontend ENV Setup](./frontend/ENV_SETUP.md) - Environment variable configuration
- Backend README - Coming soon

## Contributing

This is a training project for Mergington High School. Guidelines and contribution instructions to follow.

## License

See LICENSE file in root directory.
