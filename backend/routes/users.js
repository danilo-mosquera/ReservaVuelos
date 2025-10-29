import { Router } from 'express';
import {
  getUsers,
  getUserById,
  insertUser,
  updateUser,
  deleteUser,
  register,
  login,
  profile
} from '../controllers/users.js';

const router = Router();

router.get('/', getUsers);
router.get('/:id', getUserById);
router.get('/profile', profile);
router.post('/', insertUser);
router.post('/register', register);
router.post('/login', login);
router.put('/:id', updateUser);
router.delete('/:id', deleteUser);

export default router;