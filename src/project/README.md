# Project Management API Documentation

This module provides project management functionality for the multi-tenant conversational chat system. Each project has its own OpenAI API key and can be categorized by type.

## Features

- **Project Management**: Create, read, update, delete projects
- **OpenAI API Key Management**: Each project has its own OpenAI API key
- **Project Type Classification**: Categorize projects (e.g., 'general', 'coding', 'writing', 'analysis')
- **Multi-tenant Support**: Projects belong to specific applications
- **Response Service**: Consistent API responses

## API Endpoints

### Authentication
All endpoints require:
- `x-api-key` header with application API key

### Project Management

#### Create Project
```
POST /projects
Content-Type: application/json
x-api-key: <application-api-key>

{
  "name": "My Coding Project",
  "description": "Project for coding assistance",
  "projectType": "coding",
  "openaiApiKey": "sk-..."
}
```

#### Get All Projects
```
GET /projects
x-api-key: <application-api-key>
```

#### Get Projects by Type
```
GET /projects/by-type?type=coding
x-api-key: <application-api-key>
```

#### Get Project by ID
```
GET /projects/:id
x-api-key: <application-api-key>
```

#### Update Project
```
PATCH /projects/:id
Content-Type: application/json
x-api-key: <application-api-key>

{
  "name": "Updated Project Name",
  "description": "Updated description"
}
```

#### Delete Project
```
DELETE /projects/:id
x-api-key: <application-api-key>
```

#### Toggle Project Status
```
PATCH /projects/:id/toggle-status
x-api-key: <application-api-key>
```

## Project Types

Common project types you can use:
- `general` - General purpose AI assistance
- `coding` - Programming and development help
- `writing` - Content writing and editing
- `analysis` - Data analysis and research
- `creative` - Creative writing and brainstorming
- `business` - Business and professional assistance

## Response Format

All responses follow the standard response service format:

```json
{
  "status": "SUCCESS_STATUS",
  "message": "Human readable message",
  "code": 200,
  "data": {
    // Response data (openaiApiKey is excluded for security)
  }
}
```

## Security Notes

- OpenAI API keys are stored securely and never returned in API responses
- Project API keys are only used internally for OpenAI calls
- All project operations are scoped to the authenticated application
