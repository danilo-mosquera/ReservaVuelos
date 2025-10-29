import { Router } from 'express';
import {
  getAirports,
  getAirportById,
  insertAirport,
  updateAirport,
  deleteAirport,
} from '../controllers/airports.js';

const router = Router();

router.get('/', getAirports);
router.get('/:id', getAirportById);
router.post('/', insertAirport);
router.put('/:id', updateAirport);
router.delete('/:id', deleteAirport);

export default router;