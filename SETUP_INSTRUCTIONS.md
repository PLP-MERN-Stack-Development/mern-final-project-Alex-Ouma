# Setup Instructions

Follow these step-by-step instructions to set up and run the Task Management System locally.

## Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v18 or higher) - [Download](https://nodejs.org/)
- **MongoDB** - Either:
  - Local MongoDB installation, or
  - MongoDB Atlas account (free tier available)
- **Git** - [Download](https://git-scm.com/)
- **Code Editor** - VS Code recommended

## Step 1: Clone the Repository

```bash
git clone <https://github.com/PLP-MERN-Stack-Development/mern-final-project-Alex-Ouma.git>
cd mern-final-project-Alex-Ouma
```

## Step 2: Backend Setup

### 2.1 Navigate to Backend Directory

```bash
cd backend
```

### 2.2 Install Dependencies

```bash
npm install
```

### 2.3 Create Environment File

Create a `.env` file in the `backend` directory:

```bash
# Windows (PowerShell)
New-Item .env

# Mac/Linux
touch .env
```

### 2.4 Configure Environment Variables

Open the `.env` file and add the following:

```env
PORT=5000
NODE_ENV=development
MONGODB_URI=mongodb://localhost:27017/taskmanager
JWT_SECRET=your_super_secret_jwt_key_change_this_in_production
JWT_EXPIRE=7d
FRONTEND_URL=http://localhost:3000
```

**Important Notes:**
- Replace `MONGODB_URI` with your MongoDB connection string
  - For local MongoDB: `mongodb://localhost:27017/taskmanager`
  - For MongoDB Atlas: Use your Atlas connection string
- Replace `JWT_SECRET` with a strong, random secret key
- Keep this file secure and never commit it to version control

### 2.5 Start MongoDB (if using local installation)

**Windows:**
```bash
# If MongoDB is installed as a service, it should start automatically
# Otherwise, navigate to MongoDB bin directory and run:
mongod
```

**Mac:**
```bash
brew services start mongodb-community
```

**Linux:**
```bash
sudo systemctl start mongod
```

### 2.6 Start the Backend Server

```bash
npm run dev
```

You should see:
```
MongoDB Connected: ...
Server running on port 5000
```

## Step 3: Frontend Setup

### 3.1 Open a New Terminal

Keep the backend server running and open a new terminal window.

### 3.2 Navigate to Frontend Directory

```bash
cd frontend
```

### 3.3 Install Dependencies

```bash
npm install
```

### 3.4 Create Environment File

Create a `.env` file in the `frontend` directory:

```bash
# Windows (PowerShell)
New-Item .env

# Mac/Linux
touch .env
```

### 3.5 Configure Environment Variables

Open the `.env` file and add:

```env
VITE_API_URL=http://localhost:5000/api
```

### 3.6 Start the Frontend Development Server

```bash
npm run dev
```

You should see:
```
VITE v5.x.x  ready in xxx ms

➜  Local:   http://localhost:3000/
```

## Step 4: Access the Application

1. Open your web browser
2. Navigate to `http://localhost:3000`
3. You should see the Task Management System home page

## Step 5: Create Your First Account

1. Click "Sign Up" or "Get Started"
2. Fill in your information:
   - Name
   - Email
   - Password (minimum 6 characters)
3. Click "Sign Up"
4. You'll be automatically logged in and redirected to the dashboard

## Troubleshooting

### Backend Issues

**Problem: MongoDB connection fails**
- Solution: 
  - Verify MongoDB is running (local) or connection string is correct (Atlas)
  - Check if the database name in the connection string is correct
  - Ensure MongoDB port (27017) is not blocked by firewall

**Problem: Port 5000 already in use**
- Solution:
  - Change PORT in `.env` to a different port (e.g., 5001)
  - Update FRONTEND_URL accordingly

**Problem: JWT errors**
- Solution:
  - Ensure JWT_SECRET is set in `.env`
  - Use a strong, random string for JWT_SECRET

### Frontend Issues

**Problem: Cannot connect to API**
- Solution:
  - Verify backend is running on port 5000
  - Check VITE_API_URL in frontend `.env` matches backend URL
  - Check browser console for CORS errors

**Problem: Port 3000 already in use**
- Solution:
  - Vite will automatically use the next available port
  - Or specify a port in `vite.config.js`

**Problem: Module not found errors**
- Solution:
  - Delete `node_modules` and `package-lock.json`
  - Run `npm install` again

### General Issues

**Problem: Changes not reflecting**
- Solution:
  - Restart the development servers
  - Clear browser cache
  - Check for console errors

**Problem: Dependencies installation fails**
- Solution:
  - Ensure Node.js version is 18 or higher: `node --version`
  - Clear npm cache: `npm cache clean --force`
  - Try deleting `node_modules` and `package-lock.json`, then reinstall

## Running Tests

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

## Building for Production

### Backend

The backend doesn't need a build step. Just ensure all environment variables are set correctly.

### Frontend

```bash
cd frontend
npm run build
```

The production build will be in the `dist` directory.

## Next Steps

1. Explore the application features
2. Create some tasks
3. Test the real-time updates
4. Review the code structure
5. Check out the documentation files

## Getting Help

- Check the main README.md for overview
- Review USER_GUIDE.md for usage instructions
- See ARCHITECTURE.md for technical details
- Check DEPLOYMENT.md for deployment instructions

## Additional Resources

- [MongoDB Documentation](https://docs.mongodb.com/)
- [Express.js Documentation](https://expressjs.com/)
- [React Documentation](https://react.dev/)
- [Node.js Documentation](https://nodejs.org/en/docs/)

Happy coding! 🚀

