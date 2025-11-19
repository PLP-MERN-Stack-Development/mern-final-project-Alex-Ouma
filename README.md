# Task Management System - MERN Stack Capstone Project

A comprehensive full-stack task management application built with MongoDB, Express.js, React, and Node.js. This application demonstrates modern web development practices including RESTful API design, real-time updates, authentication, and responsive UI design.

## 🚀 Live Demo

- **Frontend**: [Add your deployed frontend URL here]
- **Backend API**: [Add your deployed backend URL here]
- **Video Demonstration**: [Add your video link here]

## 📸 Screenshots

### Dashboard
![Dashboard](screenshots/dashboard.png)

### Task Management
![Tasks](screenshots/tasks.png)

### Task Details
![Task Detail](screenshots/task-detail.png)

## ✨ Features

- **User Authentication**: Secure registration and login with JWT tokens
- **Task Management**: Create, read, update, and delete tasks
- **Task Filtering**: Filter tasks by status, priority, and search
- **Real-time Updates**: Socket.io integration for instant task updates
- **Task Assignment**: Assign tasks to team members
- **Priority & Status**: Organize tasks with priority levels and status tracking
- **Due Dates**: Set and track task due dates
- **Tags**: Categorize tasks with custom tags
- **Dashboard Analytics**: View task statistics and overview
- **Responsive Design**: Mobile-friendly interface
- **User Profiles**: Manage user profiles and settings

## 🛠️ Tech Stack

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - Database
- **Mongoose** - ODM for MongoDB
- **Socket.io** - Real-time communication
- **JWT** - Authentication
- **bcryptjs** - Password hashing
- **Jest** - Testing framework

### Frontend
- **React** - UI library
- **React Router** - Client-side routing
- **Axios** - HTTP client
- **Socket.io Client** - Real-time updates
- **React Toastify** - Notifications
- **Vite** - Build tool
- **Vitest** - Testing framework

## 📋 Prerequisites

- Node.js (v18 or higher)
- MongoDB (local installation or MongoDB Atlas account)
- npm or yarn
- Git

## 🚀 Getting Started

### Installation

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd mern-final-project-Alex-Ouma
   ```

2. **Install backend dependencies**
   ```bash
   cd backend
   npm install
   ```

3. **Install frontend dependencies**
   ```bash
   cd ../frontend
   npm install
   ```

### Configuration

1. **Backend Environment Variables**
   
   Create a `.env` file in the `backend` directory:
   ```env
   PORT=5000
   NODE_ENV=development
   MONGODB_URI=mongodb://localhost:27017/taskmanager
   JWT_SECRET=your_super_secret_jwt_key_change_this_in_production
   JWT_EXPIRE=7d
   FRONTEND_URL=http://localhost:3000
   ```

2. **Frontend Environment Variables**
   
   Create a `.env` file in the `frontend` directory:
   ```env
   VITE_API_URL=http://localhost:5000/api
   ```

### Running the Application

1. **Start MongoDB**
   - If using local MongoDB: `mongod`
   - If using MongoDB Atlas: Ensure your connection string is correct in `.env`

2. **Start the backend server**
   ```bash
   cd backend
   npm run dev
   ```
   The backend will run on `http://localhost:5000`

3. **Start the frontend development server**
   ```bash
   cd frontend
   npm run dev
   ```
   The frontend will run on `http://localhost:3000`

4. **Open your browser**
   Navigate to `http://localhost:3000`

## 🧪 Testing

### Backend Tests
```bash
cd backend
npm test
```

### Frontend Tests
```bash
cd frontend
npm test
```

## 📚 API Documentation

### Authentication Endpoints

#### Register User
```
POST /api/auth/register
Body: { name, email, password }
```

#### Login
```
POST /api/auth/login
Body: { email, password }
```

#### Get Current User
```
GET /api/auth/me
Headers: Authorization: Bearer <token>
```

### Task Endpoints

#### Get All Tasks
```
GET /api/tasks
Headers: Authorization: Bearer <token>
Query Params: status, priority, assignedTo, search
```

#### Get Single Task
```
GET /api/tasks/:id
Headers: Authorization: Bearer <token>
```

#### Create Task
```
POST /api/tasks
Headers: Authorization: Bearer <token>
Body: { title, description, status, priority, dueDate, assignedTo, tags }
```

#### Update Task
```
PUT /api/tasks/:id
Headers: Authorization: Bearer <token>
Body: { title, description, status, priority, dueDate, assignedTo, tags }
```

#### Delete Task
```
DELETE /api/tasks/:id
Headers: Authorization: Bearer <token>
```

#### Get Task Statistics
```
GET /api/tasks/stats
Headers: Authorization: Bearer <token>
```

### User Endpoints

#### Get All Users (Admin only)
```
GET /api/users
Headers: Authorization: Bearer <token>
```

#### Get Single User
```
GET /api/users/:id
Headers: Authorization: Bearer <token>
```

#### Update User
```
PUT /api/users/:id
Headers: Authorization: Bearer <token>
Body: { name, email }
```

## 🏗️ Project Structure

```
mern-final-project-Alex-Ouma/
├── backend/
│   ├── config/
│   │   └── db.js
│   ├── controllers/
│   │   ├── auth.controller.js
│   │   ├── task.controller.js
│   │   └── user.controller.js
│   ├── middleware/
│   │   ├── auth.js
│   │   ├── errorHandler.js
│   │   └── validator.js
│   ├── models/
│   │   ├── User.js
│   │   └── Task.js
│   ├── routes/
│   │   ├── auth.routes.js
│   │   ├── task.routes.js
│   │   └── user.routes.js
│   ├── socket/
│   │   └── socketHandler.js
│   ├── tests/
│   │   ├── auth.test.js
│   │   └── task.test.js
│   ├── utils/
│   │   └── generateToken.js
│   ├── server.js
│   └── package.json
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   ├── context/
│   │   ├── pages/
│   │   ├── services/
│   │   ├── test/
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   ├── index.html
│   └── package.json
├── README.md
└── Week8-Assignment.md
```

## 🔒 Security Features

- Password hashing with bcrypt
- JWT token authentication
- Protected routes and middleware
- Input validation and sanitization
- CORS configuration
- Rate limiting
- Helmet.js for security headers

## 🚢 Deployment

### Backend Deployment (Render/Railway/Heroku)

1. Set environment variables in your hosting platform
2. Ensure MongoDB Atlas connection string is configured
3. Deploy using Git integration or CLI

### Frontend Deployment (Vercel/Netlify)

1. Build the frontend: `npm run build`
2. Deploy the `dist` folder
3. Set environment variables for API URL

## 📝 License

This project is licensed under the MIT License.

## 👤 Author

**Alex Ouma**

## 🙏 Acknowledgments

- MERN Stack course instructors
- MongoDB, Express, React, and Node.js communities
- All open-source contributors

## 📞 Support

For support, email [your-email] or open an issue in the repository.

---

**Note**: Remember to update the live demo URLs, video link, and screenshots before final submission!
