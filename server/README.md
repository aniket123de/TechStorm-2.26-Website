# TechStorm Backend with Role-Based Access Control (RBAC)

## Overview

This backend implementation provides a comprehensive Role-Based Access Control (RBAC) system for the TechStorm website with three distinct user roles and their corresponding permissions.

## User Roles and Permissions

### 🔴 Core
- **Permissions**: Create, Read, Update, Delete (Full Access)
- **Description**: System administrators with complete control over all resources and user management

### 🟡 Coordinator  
- **Permissions**: Read, Update
- **Description**: Event coordinators who can view and modify existing content but cannot create new resources or delete existing ones

### 🟢 Volunteer
- **Permissions**: Read Only
- **Description**: General users who can only view content and participate in events

## Features

- ✅ **JWT Authentication** - Secure token-based authentication
- ✅ **Password Hashing** - BCrypt with salt rounds for security
- ✅ **Account Lockout** - Protection against brute force attacks
- ✅ **Role-Based Authorization** - Fine-grained permission control
- ✅ **Rate Limiting** - API protection against abuse
- ✅ **Input Validation** - Comprehensive request validation with Joi
- ✅ **Security Headers** - Helmet.js for security best practices
- ✅ **Audit Logging** - Security operation logging
- ✅ **Error Handling** - Comprehensive error management
- ✅ **Pagination** - Efficient data retrieval
- ✅ **MongoDB Integration** - Mongoose ODM with optimization

## Installation

1. **Navigate to server directory**:
   ```powershell
   cd server
   ```

2. **Install dependencies**:
   ```powershell
   npm install
   ```

3. **Environment Setup**:
   ```powershell
   # Copy .env file and update with your settings
   copy .env.example .env
   ```

4. **Update Environment Variables**:
   ```env
   NODE_ENV=development
   PORT=5000
   MONGODB_URI=mongodb+srv://AnikPaul:AnikPaul123@cluster0.gvubzsp.mongodb.net/techstorm
   JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
   JWT_EXPIRES_IN=24h
   FRONTEND_URL=http://localhost:3000
   RATE_LIMIT_WINDOW_MS=900000
   RATE_LIMIT_MAX_REQUESTS=100
   ```

5. **Start the server**:
   ```powershell
   # Development mode with auto-reload
   npm run dev
   
   # Production mode
   npm start
   ```

## API Endpoints

### Authentication Routes (`/api/auth`)

| Method | Endpoint | Description | Permission |
|--------|----------|-------------|------------|
| POST | `/register` | Register new user | Public |
| POST | `/login` | User login | Public |
| GET | `/profile` | Get current user profile | Authenticated |
| POST | `/change-password` | Change password | Authenticated |
| POST | `/logout` | Logout user | Authenticated |
| POST | `/refresh` | Refresh JWT token | Authenticated |
| GET | `/check` | Check auth status | Authenticated |

### User Management Routes (`/api/users`)

| Method | Endpoint | Description | Permission |
|--------|----------|-------------|------------|
| GET | `/` | Get all users (paginated) | READ |
| GET | `/:id` | Get user by ID | READ (own) / CORE |
| PUT | `/:id` | Update user profile | UPDATE (own) / CORE |
| PATCH | `/:id/role` | Update user role | CORE only |
| PATCH | `/:id/status` | Activate/Deactivate user | CORE only |
| DELETE | `/:id` | Delete user | CORE only |
| GET | `/admin/stats` | Get user statistics | CORE only |

### Event Routes (`/api/events`)

| Method | Endpoint | Description | Permission |
|--------|----------|-------------|------------|
| GET | `/` | Get all events | Public (limited) / READ (full) |
| GET | `/:id` | Get event by ID | Public (limited) / READ (full) |
| POST | `/` | Create new event | CREATE |
| PUT | `/:id` | Update event | UPDATE |
| DELETE | `/:id` | Delete event | DELETE |
| POST | `/:id/register` | Register for event | Authenticated |
| GET | `/:id/registrations` | Get event registrations | READ |

### Admin Routes (`/api/admin`)

| Method | Endpoint | Description | Permission |
|--------|----------|-------------|------------|
| GET | `/dashboard` | System dashboard | CORE only |
| GET | `/health` | System health check | CORE only |
| POST | `/bulk-role-update` | Bulk update user roles | CORE only |
| POST | `/bulk-status-update` | Bulk update user status | CORE only |
| POST | `/create-core-user` | Create core user | CORE only |
| GET | `/user-activity` | Get user activity logs | CORE only |
| POST | `/reset-password/:userId` | Reset user password | CORE only |

## Usage Examples

### 1. User Registration

```javascript
// POST /api/auth/register
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "securepassword123",
  "role": "volunteer", // optional, defaults to volunteer
  "phone": "+1234567890",
  "department": "Computer Science",
  "studentId": "CS001"
}

// Response
{
  "message": "User registered successfully",
  "user": {
    "_id": "...",
    "name": "John Doe",
    "email": "john@example.com",
    "role": "volunteer",
    "permissions": ["read"]
  },
  "token": "eyJhbGciOiJIUzI1NiIs...",
  "expiresIn": "24h"
}
```

### 2. User Login

```javascript
// POST /api/auth/login
{
  "email": "john@example.com",
  "password": "securepassword123"
}

// Response
{
  "message": "Login successful",
  "user": {
    "_id": "...",
    "name": "John Doe",
    "email": "john@example.com",
    "role": "volunteer",
    "permissions": ["read"]
  },
  "token": "eyJhbGciOiJIUzI1NiIs...",
  "expiresIn": "24h"
}
```

### 3. Create Event (Core/CREATE permission required)

```javascript
// POST /api/events
// Headers: Authorization: Bearer <token>
{
  "title": "Web Development Workshop",
  "description": "Learn modern web development with React and Node.js",
  "eventType": "workshop",
  "date": "2024-03-15T10:00:00Z",
  "location": "Tech Hall, Room 101",
  "maxParticipants": 50,
  "registrationDeadline": "2024-03-10T23:59:59Z",
  "tags": ["web", "react", "nodejs"],
  "requirements": ["Basic programming knowledge", "Laptop required"]
}

// Response (Success for CORE users)
{
  "message": "Event created successfully",
  "event": { /* event details */ }
}

// Response (Error for VOLUNTEER users)
{
  "error": "Insufficient permissions",
  "message": "You don't have permission to create this resource",
  "required": "create",
  "userRole": "volunteer",
  "userPermissions": ["read"]
}
```

### 4. Update User Role (Core only)

```javascript
// PATCH /api/users/64a7b8c9e1234567890abcde/role
// Headers: Authorization: Bearer <core_user_token>
{
  "role": "coordinator",
  "reason": "Promoting to event coordinator for hackathon organization"
}

// Response
{
  "message": "User role updated successfully",
  "user": {
    "_id": "64a7b8c9e1234567890abcde",
    "name": "Jane Smith",
    "email": "jane@example.com",
    "role": "coordinator",
    "permissions": ["read", "update"]
  },
  "change": {
    "from": "volunteer",
    "to": "coordinator",
    "changedBy": "admin@techstorm.com",
    "reason": "Promoting to event coordinator for hackathon organization",
    "timestamp": "2024-03-01T10:00:00Z"
  }
}
```

## Authentication Headers

All protected routes require the JWT token in the Authorization header:

```javascript
Headers: {
  'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
  'Content-Type': 'application/json'
}
```

## Error Responses

The API returns consistent error responses:

```javascript
// Authentication Error (401)
{
  "error": "Access denied",
  "message": "No authentication token provided",
  "timestamp": "2024-03-01T10:00:00Z"
}

// Authorization Error (403)
{
  "error": "Insufficient permissions",
  "message": "You don't have permission to delete this resource",
  "required": "delete",
  "userRole": "coordinator",
  "userPermissions": ["read", "update"],
  "timestamp": "2024-03-01T10:00:00Z"
}

// Validation Error (400)
{
  "error": "Validation failed",
  "details": [
    {
      "field": "email",
      "message": "Please provide a valid email address",
      "value": "invalid-email"
    }
  ],
  "timestamp": "2024-03-01T10:00:00Z"
}
```

## Database Schema

### User Schema
```javascript
{
  name: String (required, 2-50 chars),
  email: String (required, unique, email format),
  password: String (required, hashed, 6+ chars),
  role: String (enum: ['core', 'coordinator', 'volunteer'], default: 'volunteer'),
  isActive: Boolean (default: true),
  phone: String (optional),
  department: String (optional),
  studentId: String (optional),
  lastLogin: Date,
  loginAttempts: Number (default: 0, max: 5),
  lockUntil: Date,
  profilePicture: String,
  createdAt: Date,
  updatedAt: Date
}
```

### Event Schema
```javascript
{
  title: String (required, max: 100),
  description: String (required, max: 1000),
  eventType: String (enum: ['workshop', 'competition', 'seminar', 'hackathon', 'gaming']),
  date: Date (required),
  location: String (max: 200),
  maxParticipants: Number (min: 1),
  registrationDeadline: Date,
  isActive: Boolean (default: true),
  createdBy: ObjectId (ref: User, required),
  updatedBy: ObjectId (ref: User),
  tags: [String],
  images: [{ url: String, alt: String }],
  requirements: [String],
  prizes: [{ position: String, prize: String, amount: Number }],
  registrations: [{
    user: ObjectId (ref: User),
    registeredAt: Date (default: now),
    status: String (enum: ['pending', 'confirmed', 'cancelled'], default: 'pending')
  }],
  createdAt: Date,
  updatedAt: Date
}
```

## Security Features

### 1. Password Security
- BCrypt hashing with 12 salt rounds
- Minimum 6 characters requirement
- Password change validation

### 2. Account Protection
- Account lockout after 5 failed login attempts
- 2-hour lock duration
- Automatic unlock after expiry

### 3. JWT Security
- Configurable expiration time
- Secure secret key requirement
- Token validation on each request

### 4. Rate Limiting
- 100 requests per 15 minutes per IP
- Configurable limits via environment variables

### 5. Input Validation
- Joi schema validation
- SQL injection prevention
- XSS protection through sanitization

### 6. CORS Configuration
- Configurable allowed origins
- Credentials support for authenticated requests

## Deployment Considerations

### Environment Variables
Ensure all environment variables are properly set in production:

```env
NODE_ENV=production
JWT_SECRET=extremely-secure-secret-key-minimum-32-characters-long
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/production_db
FRONTEND_URL=https://yourdomain.com
```

### Security Checklist
- [ ] Change default JWT secret
- [ ] Use HTTPS in production
- [ ] Configure proper CORS origins
- [ ] Set up MongoDB connection with authentication
- [ ] Enable MongoDB connection encryption
- [ ] Configure proper logging and monitoring
- [ ] Set up backup strategies
- [ ] Implement SSL/TLS certificates
- [ ] Configure firewall rules
- [ ] Set up monitoring and alerts

## Development

### Available Scripts
```powershell
npm start          # Start production server
npm run dev        # Start development server with nodemon
npm test           # Run tests (when implemented)
```

### Development Tools
- **Nodemon** - Auto-restart during development
- **Jest** - Testing framework (ready for implementation)
- **Supertest** - API testing utilities (ready for implementation)

## Contributing

1. Follow the existing code structure
2. Add comprehensive input validation for new routes
3. Include appropriate RBAC permissions
4. Add security logging for sensitive operations
5. Update documentation for new endpoints
6. Write tests for new functionality

## Support

For questions or issues, please refer to the development team or create an issue in the project repository.
