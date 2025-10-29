import { Router } from 'express';
import {
  getCities,
  getCityById,
  insertCity,
  updateCity,
  deleteCity,
} from '../controllers/cities.js';

const router = Router();

router.get('/', getCities);
router.get('/:id', getCityById);
router.post('/', insertCity);
router.put('/:id', updateCity);
router.delete('/:id', deleteCity);

export default router;