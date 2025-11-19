# Backend API Documentation

## Overview

This is the backend API for the Task Management System, built with Node.js, Express.js, and MongoDB.

## Setup

1. Install dependencies:
   ```bash
   npm install
   ```

2. Create a `.env` file with the following variables:
   ```env
   PORT=5000
   NODE_ENV=development
   MONGODB_URI=mongodb://localhost:27017/taskmanager
   JWT_SECRET=your_super_secret_jwt_key
   JWT_EXPIRE=7d
   FRONTEND_URL=http://localhost:3000
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

## API Endpoints

### Authentication

- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user (Protected)

### Tasks

- `GET /api/tasks` - Get all tasks (Protected)
- `GET /api/tasks/:id` - Get single task (Protected)
- `POST /api/tasks` - Create task (Protected)
- `PUT /api/tasks/:id` - Update task (Protected)
- `DELETE /api/tasks/:id` - Delete task (Protected)
- `GET /api/tasks/stats` - Get task statistics (Protected)

### Users

- `GET /api/users` - Get all users (Admin only)
- `GET /api/users/:id` - Get single user (Protected)
- `PUT /api/users/:id` - Update user (Protected)
- `DELETE /api/users/:id` - Delete user (Admin only)

## Testing

Run tests with:
```bash
npm test
```

## Technologies

- Express.js
- MongoDB with Mongoose
- Socket.io for real-time features
- JWT for authentication
- Jest for testing

