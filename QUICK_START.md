# Quick Start Guide

Get up and running in 5 minutes!

## Prerequisites Check

```bash
node --version  # Should be v18 or higher
npm --version   # Should be v8 or higher
```

## Quick Setup

### 1. Install Dependencies

**Backend:**
```bash
cd backend
npm install
```

**Frontend:**
```bash
cd frontend
npm install
```

### 2. Configure Environment

**Backend `.env` file:**
```env
PORT=5000
NODE_ENV=development
MONGODB_URI=mongodb://localhost:27017/taskmanager
JWT_SECRET=your_secret_key_here
JWT_EXPIRE=7d
FRONTEND_URL=http://localhost:3000
```

**Frontend `.env` file:**
```env
VITE_API_URL=http://localhost:5000/api
```

### 3. Start MongoDB

**Local MongoDB:**
- Windows: MongoDB should run as a service
- Mac: `brew services start mongodb-community`
- Linux: `sudo systemctl start mongod`

**Or use MongoDB Atlas** (free tier available)

### 4. Run the Application

**Terminal 1 - Backend:**
```bash
cd backend
npm run dev
```

**Terminal 2 - Frontend:**
```bash
cd frontend
npm run dev
```

### 5. Open Browser

Navigate to: `http://localhost:3000`

## First Steps

1. Click "Sign Up"
2. Create an account
3. Create your first task
4. Explore the dashboard

## Common Commands

```bash
# Backend
npm run dev      # Start development server
npm test         # Run tests
npm start        # Start production server

# Frontend
npm run dev      # Start development server
npm run build    # Build for production
npm test         # Run tests
```

## Need Help?

- See `SETUP_INSTRUCTIONS.md` for detailed setup
- See `USER_GUIDE.md` for usage instructions
- See `README.md` for full documentation

