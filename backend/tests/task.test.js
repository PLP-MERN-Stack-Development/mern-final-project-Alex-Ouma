import request from 'supertest';
import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import taskRoutes from '../routes/task.routes.js';
import authRoutes from '../routes/auth.routes.js';
import { errorHandler } from '../middleware/errorHandler.js';
import User from '../models/User.js';

dotenv.config();

const app = express();
app.use(express.json());
app.use('/api/auth', authRoutes);
app.use('/api/tasks', taskRoutes);
app.use(errorHandler);

describe('Task Routes', () => {
  let authToken;
  let userId;

  beforeAll(async () => {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/taskmanager-test');
    
    // Create test user and get token
    const registerRes = await request(app)
      .post('/api/auth/register')
      .send({
        name: 'Task Test User',
        email: 'tasktest@example.com',
        password: 'password123'
      });
    
    authToken = registerRes.body.token;
    userId = registerRes.body.user.id;
  });

  afterAll(async () => {
    await mongoose.connection.dropDatabase();
    await mongoose.connection.close();
  });

  describe('POST /api/tasks', () => {
    it('should create a new task', async () => {
      const res = await request(app)
        .post('/api/tasks')
        .set('Authorization', `Bearer ${authToken}`)
        .send({
          title: 'Test Task',
          description: 'This is a test task',
          status: 'todo',
          priority: 'high'
        });

      expect(res.statusCode).toBe(201);
      expect(res.body.success).toBe(true);
      expect(res.body.data.title).toBe('Test Task');
    });

    it('should require authentication', async () => {
      const res = await request(app)
        .post('/api/tasks')
        .send({
          title: 'Test Task'
        });

      expect(res.statusCode).toBe(401);
    });
  });

  describe('GET /api/tasks', () => {
    it('should get all tasks for user', async () => {
      const res = await request(app)
        .get('/api/tasks')
        .set('Authorization', `Bearer ${authToken}`);

      expect(res.statusCode).toBe(200);
      expect(res.body.success).toBe(true);
      expect(Array.isArray(res.body.data)).toBe(true);
    });
  });
});

