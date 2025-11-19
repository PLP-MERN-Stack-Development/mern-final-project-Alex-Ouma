# Deployment Guide

This guide will help you deploy the Task Management System to production.

## Prerequisites

- GitHub account
- MongoDB Atlas account (or other MongoDB hosting)
- Accounts on deployment platforms:
  - Backend: Render, Railway, or Heroku
  - Frontend: Vercel or Netlify

## Step 1: MongoDB Atlas Setup

1. Create a MongoDB Atlas account at https://www.mongodb.com/cloud/atlas
2. Create a new cluster
3. Create a database user
4. Whitelist your IP address (or use 0.0.0.0/0 for all IPs in development)
5. Get your connection string
6. Replace `<password>` with your database user password

## Step 2: Backend Deployment (Render)

1. **Create a new Web Service on Render**
   - Connect your GitHub repository
   - Select the `backend` folder as the root directory
   - Build command: `npm install`
   - Start command: `npm start`

2. **Set Environment Variables**
   ```
   PORT=5000
   NODE_ENV=production
   MONGODB_URI=your_mongodb_atlas_connection_string
   JWT_SECRET=your_secure_random_secret_key
   JWT_EXPIRE=7d
   FRONTEND_URL=https://your-frontend-url.vercel.app
   ```

3. **Deploy**
   - Render will automatically deploy on every push to main branch

## Step 3: Frontend Deployment (Vercel)

1. **Create a new project on Vercel**
   - Import your GitHub repository
   - Root directory: `frontend`
   - Framework preset: Vite

2. **Set Environment Variables**
   ```
   VITE_API_URL=https://your-backend-url.onrender.com/api
   ```

3. **Build Settings**
   - Build command: `npm run build`
   - Output directory: `dist`

4. **Deploy**
   - Vercel will automatically deploy on every push

## Step 4: Update CORS Settings

Update your backend `.env` or environment variables to include your frontend URL:

```
FRONTEND_URL=https://your-frontend-url.vercel.app
```

## Step 5: Update README

Update the main README.md with:
- Live frontend URL
- Live backend URL
- Video demonstration link
- Screenshots

## Alternative Deployment Options

### Backend Alternatives

**Railway:**
- Similar to Render
- Automatic deployments from GitHub
- Free tier available

**Heroku:**
- Requires credit card for verification
- Add-ons available for MongoDB

### Frontend Alternatives

**Netlify:**
- Similar to Vercel
- Continuous deployment from GitHub
- Free tier available

## Post-Deployment Checklist

- [ ] Backend is accessible and health check returns OK
- [ ] Frontend can connect to backend API
- [ ] User registration works
- [ ] User login works
- [ ] Tasks can be created, updated, and deleted
- [ ] Real-time updates work via Socket.io
- [ ] All environment variables are set correctly
- [ ] CORS is configured properly
- [ ] MongoDB connection is working
- [ ] Error handling is working correctly

## Troubleshooting

### Backend Issues

1. **Connection to MongoDB fails**
   - Check MongoDB Atlas IP whitelist
   - Verify connection string
   - Check database user credentials

2. **CORS errors**
   - Verify FRONTEND_URL environment variable
   - Check CORS configuration in server.js

3. **JWT errors**
   - Ensure JWT_SECRET is set
   - Check token expiration settings

### Frontend Issues

1. **API calls fail**
   - Verify VITE_API_URL is correct
   - Check backend is running
   - Verify CORS settings

2. **Socket.io connection fails**
   - Check Socket.io server URL
   - Verify Socket.io CORS settings
   - Check network connectivity

## Monitoring

Consider setting up:
- Error tracking (Sentry, LogRocket)
- Analytics (Google Analytics)
- Uptime monitoring (UptimeRobot)
- Performance monitoring (New Relic, Datadog)

## Security Checklist

- [ ] JWT_SECRET is strong and unique
- [ ] MongoDB connection string is secure
- [ ] Environment variables are not exposed
- [ ] HTTPS is enabled
- [ ] Rate limiting is configured
- [ ] Input validation is working
- [ ] Error messages don't expose sensitive information

