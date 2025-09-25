# User Module

The User Module provides comprehensive user management functionality for applications. Users are scoped to specific applications, ensuring proper multi-tenancy.

## Features

- **User CRUD Operations**: Create, read, update, and delete users
- **Application Scoped**: Users belong to specific applications
- **Email Validation**: Unique email per application
- **Status Management**: Activate/deactivate users
- **Search by Email**: Find users by email address
- **Soft Delete**: Users are deactivated rather than permanently deleted

## API Endpoints

All endpoints require authentication headers:
- `x-api-key`: Application API key
- `app-id`: Application ID
- `user-id`: User ID (for chat endpoints)

### 1. Create User

**POST** `/users`

Creates a new user under the specified application.

**Headers:**
```
x-api-key: your-api-key
app-id: your-application-id
```

**Request Body:**
```json
{
  "email": "user@example.com",
  "displayName": "John Doe",
  "avatarUrl": "https://example.com/avatar.jpg"
}
```

**Response:**
```json
{
  "status": "USER_CREATED",
  "message": "User created successfully",
  "data": {
    "id": "user-uuid",
    "email": "user@example.com",
    "displayName": "John Doe",
    "avatarUrl": "https://example.com/avatar.jpg",
    "isActive": true,
    "createdAt": "2024-01-01T00:00:00Z",
    "updatedAt": "2024-01-01T00:00:00Z"
  }
}
```

### 2. Get All Users

**GET** `/users`

Retrieves all active users for the application.

**Headers:**
```
x-api-key: your-api-key
app-id: your-application-id
```

**Response:**
```json
{
  "status": "USERS_FETCHED",
  "message": "Users fetched successfully",
  "data": [
    {
      "id": "user-uuid",
      "email": "user@example.com",
      "displayName": "John Doe",
      "avatarUrl": "https://example.com/avatar.jpg",
      "isActive": true,
      "createdAt": "2024-01-01T00:00:00Z",
      "updatedAt": "2024-01-01T00:00:00Z"
    }
  ]
}
```

### 3. Get User by ID

**GET** `/users/{id}`

Retrieves a specific user by ID.

**Headers:**
```
x-api-key: your-api-key
app-id: your-application-id
```

**Response:**
```json
{
  "status": "USER_FETCHED",
  "message": "User fetched successfully",
  "data": {
    "id": "user-uuid",
    "email": "user@example.com",
    "displayName": "John Doe",
    "avatarUrl": "https://example.com/avatar.jpg",
    "isActive": true,
    "createdAt": "2024-01-01T00:00:00Z",
    "updatedAt": "2024-01-01T00:00:00Z"
  }
}
```

### 4. Get User by Email

**GET** `/users/by-email?email=user@example.com`

Retrieves a user by email address.

**Headers:**
```
x-api-key: your-api-key
app-id: your-application-id
```

**Response:**
```json
{
  "status": "USER_FETCHED",
  "message": "User fetched successfully",
  "data": {
    "id": "user-uuid",
    "email": "user@example.com",
    "displayName": "John Doe",
    "avatarUrl": "https://example.com/avatar.jpg",
    "isActive": true,
    "createdAt": "2024-01-01T00:00:00Z",
    "updatedAt": "2024-01-01T00:00:00Z"
  }
}
```

### 5. Update User

**PATCH** `/users/{id}`

Updates user information.

**Headers:**
```
x-api-key: your-api-key
app-id: your-application-id
```

**Request Body:**
```json
{
  "displayName": "Jane Doe",
  "avatarUrl": "https://example.com/new-avatar.jpg"
}
```

**Response:**
```json
{
  "status": "USER_UPDATED",
  "message": "User updated successfully",
  "data": {
    "id": "user-uuid",
    "email": "user@example.com",
    "displayName": "Jane Doe",
    "avatarUrl": "https://example.com/new-avatar.jpg",
    "isActive": true,
    "createdAt": "2024-01-01T00:00:00Z",
    "updatedAt": "2024-01-01T01:00:00Z"
  }
}
```

### 6. Delete User

**DELETE** `/users/{id}`

Soft deletes a user (sets isActive to false).

**Headers:**
```
x-api-key: your-api-key
app-id: your-application-id
```

**Response:**
```json
{
  "status": "USER_DELETED",
  "message": "User deleted successfully",
  "data": {}
}
```

### 7. Toggle User Status

**PATCH** `/users/{id}/toggle-status`

Toggles the active status of a user.

**Headers:**
```
x-api-key: your-api-key
app-id: your-application-id
```

**Response:**
```json
{
  "status": "USER_STATUS_TOGGLED",
  "message": "User activated successfully",
  "data": {
    "id": "user-uuid",
    "email": "user@example.com",
    "displayName": "John Doe",
    "avatarUrl": "https://example.com/avatar.jpg",
    "isActive": true,
    "createdAt": "2024-01-01T00:00:00Z",
    "updatedAt": "2024-01-01T01:00:00Z"
  }
}
```

## Error Responses

### 400 Bad Request
```json
{
  "status": "BAD_REQUEST",
  "message": "Validation failed",
  "code": 400,
  "data": {}
}
```

### 404 Not Found
```json
{
  "status": "NOT_FOUND",
  "message": "User not found",
  "code": 404,
  "data": {}
}
```

### 409 Conflict
```json
{
  "status": "CONFLICT",
  "message": "User with this email already exists",
  "code": 409,
  "data": {}
}
```

### 401 Unauthorized
```json
{
  "status": "UNAUTHORIZED",
  "message": "API key is required",
  "code": 401,
  "data": {}
}
```

## Data Validation

### CreateUserDto
- `email`: Required, valid email format, max 255 characters
- `displayName`: Optional, max 100 characters
- `avatarUrl`: Optional, max 500 characters

### UpdateUserDto
- All fields from CreateUserDto are optional
- Same validation rules apply

## Database Constraints

- **Unique Email per Application**: Each email can only exist once per application
- **Cascade Delete**: When an application is deleted, all its users are deleted
- **Soft Delete**: Users are deactivated rather than permanently deleted
- **Timestamps**: Automatic createdAt and updatedAt timestamps

## Security Features

- **Application Scoped**: Users can only be accessed within their application
- **Authentication Required**: All endpoints require valid API key and app ID
- **Data Isolation**: Users from different applications are completely isolated
- **Input Validation**: All inputs are validated and sanitized

## Usage Examples

### Creating a User
```bash
curl -X POST http://localhost:3000/users \
  -H "x-api-key: your-api-key" \
  -H "app-id: your-application-id" \
  -H "Content-Type: application/json" \
  -d '{
    "email": "john@example.com",
    "displayName": "John Doe",
    "avatarUrl": "https://example.com/avatar.jpg"
  }'
```

### Getting All Users
```bash
curl -X GET http://localhost:3000/users \
  -H "x-api-key: your-api-key" \
  -H "app-id: your-application-id"
```

### Updating a User
```bash
curl -X PATCH http://localhost:3000/users/user-uuid \
  -H "x-api-key: your-api-key" \
  -H "app-id: your-application-id" \
  -H "Content-Type: application/json" \
  -d '{
    "displayName": "John Smith"
  }'
```
