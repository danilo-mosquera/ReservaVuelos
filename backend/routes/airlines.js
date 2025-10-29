import { Router } from 'express';
import {
  getAirlines,
  getAirlineById,
  insertAirline,
  updateAirline,
  deleteAirline,
} from '../controllers/airlines.js';

const router = Router();

router.get('/', getAirlines);
router.get('/:id', getAirlineById);
router.post('/', insertAirline);
router.put('/:id', updateAirline);
router.delete('/:id', deleteAirline);

export default router;