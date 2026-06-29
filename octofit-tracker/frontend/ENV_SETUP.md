# Frontend Environment Variables

This file contains environment variables for the OctoFit Tracker frontend. It is not tracked by Git.

## Required Variables

### VITE_CODESPACE_NAME
**Required**: Yes  
**Type**: String  
**Description**: The name of your GitHub Codespace environment

**Example**:
```
VITE_CODESPACE_NAME=myuser-myrepo-g5w4vx96x9234f4w
```

This environment variable is used to construct API endpoints for the frontend.

**API Endpoint Format**:
```
https://${VITE_CODESPACE_NAME}-8000.app.github.dev/api/[component]/
```

For example, with `VITE_CODESPACE_NAME=user-repo-abc123xyz`, the Activities endpoint will be:
```
https://user-repo-abc123xyz-8000.app.github.dev/api/activities/
```

## How to Find Your Codespace Name

1. In your GitHub Codespace, run:
   ```bash
   echo $CODESPACE_NAME
   ```
2. Or check the URL in your browser - it typically appears as `https://[CODESPACE_NAME].app.github.dev/`
3. Or check your Codespaces dashboard at https://github.com/codespaces

## Setup

1. Copy this file or create a `.env.local` file in the `frontend/` directory
2. Set the `VITE_CODESPACE_NAME` value to your Codespace name
3. Save the file
4. The Vite dev server will automatically pick up these variables

## Local Development (without Codespaces)

If developing locally without Codespaces, you may need to modify the API endpoint configuration in each component file or create a separate `.env.development` file with different endpoints.
