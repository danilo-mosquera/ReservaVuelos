import { Router } from 'express';
import {
  getAircrafts,
  getAircraftById,
  insertAircraft,
  updateAircraft,
  deleteAircraft,
} from '../controllers/aircrafts.js';

const router = Router();

router.get('/', getAircrafts);
router.get('/:id', getAircraftById);
router.post('/', insertAircraft);
router.put('/:id', updateAircraft);
router.delete('/:id', deleteAircraft);

export default router;