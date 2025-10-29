import { Router } from 'express';
import {
  getClasses,
  getClassById,
  insertClass,
  updateClass,
  deleteClass,
} from '../controllers/classes.js';

const router = Router();

router.get('/', getClasses);
router.get('/:id', getClassById);
router.post('/', insertClass);
router.put('/:id', updateClass);
router.delete('/:id', deleteClass);

export default router;