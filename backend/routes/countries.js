import { Router } from 'express';
import {
  getCountries,
  getCountryById,
  insertCountry,
  updateCountry,
  deleteCountry,
} from '../controllers/countries.js';

const router = Router();

router.get('/', getCountries);
router.get('/:id', getCountryById);
router.post('/', insertCountry);
router.put('/:id', updateCountry);
router.delete('/:id', deleteCountry);

export default router;