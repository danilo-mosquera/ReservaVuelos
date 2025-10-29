import { Router } from 'express';
import {
  getSeats,
  getSeatById,
  insertSeat,
  updateSeat,
  deleteSeat,
} from '../controllers/seats.js';

const router = Router();

router.get('/', getSeats);
router.get('/:id', getSeatById);
router.post('/', insertSeat);
router.put('/:id', updateSeat);
router.delete('/:id', deleteSeat);

export default router;