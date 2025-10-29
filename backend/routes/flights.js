import { Router } from 'express';
import {
  getFlights,
  getFlightById,
  insertFlight,
  updateFlight,
  deleteFlight,
} from '../controllers/flights.js';

const router = Router();

router.get('/', getFlights);
router.get('/:id', getFlightById);
router.post('/', insertFlight);
router.put('/:id', updateFlight);
router.delete('/:id', deleteFlight);

export default router;