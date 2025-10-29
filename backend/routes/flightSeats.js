import { Router } from 'express';
import {
  getFlightSeats,
  getFlightSeatById,
  insertFlightSeat,
  updateFlightSeat,
  deleteFlightSeat,
} from '../controllers/flightSeats.js';

const router = Router();

router.get('/', getFlightSeats);
router.get('/:id', getFlightSeatById);
router.post('/', insertFlightSeat);
router.put('/:id', updateFlightSeat);
router.delete('/:id', deleteFlightSeat);

export default router;