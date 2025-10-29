import { Router } from 'express';
import {
  getRoles,
  getRoleById,
  insertRole,
  updateRole,
  deleteRole,
} from '../controllers/roles.js';

const router = Router();

router.get('/', getRoles);
router.get('/:id', getRoleById);
router.post('/', insertRole);
router.put('/:id', updateRole);
router.delete('/:id', deleteRole);

export default router;