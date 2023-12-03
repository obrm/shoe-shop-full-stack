import express from 'express';
import {
  getShoes,
  getShoe,
  addShoe,
  updateShoe,
  deleteShoe
} from '../controllers/shoesController.js';

import { protect, authorize } from '../middleware/authMiddleware.js';

const router = express.Router();

router
  .route('/')
  .get(getShoes)
  .post(protect, authorize('admin'), addShoe);

router
  .route('/:id')
  .get(getShoe)
  .put(protect, authorize('admin'), updateShoe)
  .delete(protect, authorize('admin'), deleteShoe);

export default router;