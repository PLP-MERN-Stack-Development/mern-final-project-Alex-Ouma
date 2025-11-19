import express from 'express';
import {
  getUsers,
  getUser,
  updateUser,
  deleteUser
} from '../controllers/user.controller.js';
import { protect, admin } from '../middleware/auth.js';

const router = express.Router();

router.use(protect); // All routes require authentication

router.get('/', admin, getUsers);
router.get('/:id', getUser);
router.put('/:id', updateUser);
router.delete('/:id', admin, deleteUser);

export default router;

