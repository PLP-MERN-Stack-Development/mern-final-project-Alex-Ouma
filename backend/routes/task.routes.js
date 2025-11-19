import express from 'express';
import {
  getTasks,
  getTask,
  createTask,
  updateTask,
  deleteTask,
  getTaskStats
} from '../controllers/task.controller.js';
import { protect } from '../middleware/auth.js';
import { validate, taskValidation } from '../middleware/validator.js';

const router = express.Router();

router.use(protect); // All routes require authentication

router.route('/')
  .get(getTasks)
  .post(validate(taskValidation), createTask);

router.get('/stats', getTaskStats);

router.route('/:id')
  .get(getTask)
  .put(validate(taskValidation), updateTask)
  .delete(deleteTask);

export default router;

