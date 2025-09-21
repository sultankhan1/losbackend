# Chat API Documentation

This module provides a comprehensive conversational chat system with OpenAI integration for multi-tenant applications with project-based API key management.

## Features

- **Multi-tenant Support**: Each application can have multiple users with separate chats
- **Project-based OpenAI Integration**: Each project has its own OpenAI API key
- **Dynamic Project Selection**: Users can specify project type for different AI behaviors
- **Thread Management**: Each conversation has a unique thread ID for OpenAI
- **Message History**: Persistent conversation history with context
- **Response Service**: Consistent API responses across all endpoints

## API Endpoints

### Authentication
All endpoints require:
- `x-api-key` header with application API key
- `user-id` header with user identifier

### Chat Management

#### Create Chat
```
POST /chat
Content-Type: application/json
x-api-key: <application-api-key>
user-id: <user-id>

{
  "title": "My New Chat",
  "description": "Optional description",
  "projectId": "project-uuid-here"
}
```

#### Get All Chats
```
GET /chat
x-api-key: <application-api-key>
user-id: <user-id>
```

#### Get Chat by ID
```
GET /chat/:chatId
x-api-key: <application-api-key>
user-id: <user-id>
```

#### Update Chat
```
PATCH /chat/:chatId
Content-Type: application/json
x-api-key: <application-api-key>
user-id: <user-id>

{
  "title": "Updated Title",
  "description": "Updated description"
}
```

#### Delete Chat
```
DELETE /chat/:chatId
x-api-key: <application-api-key>
user-id: <user-id>
```

### Conversation Management

#### Create Conversation
```
POST /chat/:chatId/conversations
Content-Type: application/json
x-api-key: <application-api-key>
user-id: <user-id>

{
  "title": "New Conversation"
}
```

### Message Management

#### Send Message
```
POST /chat/:chatId/messages
Content-Type: application/json
x-api-key: <application-api-key>
user-id: <user-id>

{
  "content": "Hello, how are you?",
  "conversationId": "optional-existing-conversation-id",
  "projectType": "optional-project-type-for-dynamic-selection"
}
```

#### Get Conversation Messages
```
GET /chat/:chatId/conversations/:conversationId/messages
x-api-key: <application-api-key>
user-id: <user-id>
```

## Response Format

All responses follow the standard response service format:

```json
{
  "status": "SUCCESS_STATUS",
  "message": "Human readable message",
  "code": 200,
  "data": {
    // Response data
  }
}
```

## Database Schema

The chat system uses the following models:
- `Application` - Multi-tenant applications
- `User` - Users within applications
- `Project` - Projects with specific OpenAI API keys and types
- `Chat` - Chat sessions for users under specific projects
- `Conversation` - Individual conversations within chats
- `Message` - Messages within conversations

## Project-based API Key Management

- Each project has its own OpenAI API key
- Chats are created under specific projects
- Users can specify `projectType` in messages for dynamic project selection
- The system will use the project's API key for OpenAI calls
- If no `projectType` is specified, it uses the chat's default project

## Error Handling

The system handles various error scenarios:
- Invalid API keys
- Missing user IDs
- Non-existent chats/conversations
- OpenAI API failures
- Database errors

All errors are returned in the standard response format with appropriate HTTP status codes.
