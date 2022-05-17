import express from 'express';
import {
  createCart,
  deleteCart,
  getAllCarts,
  getCart,
  updateCart,
} from '../controller/cartController.js';

import {
  verifyToken,
  verifyTokenAndAdmin,
  verifyTokenAndAuthorization,
} from '../middleware/authMiddleware.js';

const router = express.Router();

//CREATE
router.post('/', verifyToken, createCart);

//UPDATE
router.put('/:id', verifyTokenAndAuthorization, updateCart);

//DELETE
router.delete('/:id', verifyTokenAndAuthorization, deleteCart);

//GET
router.get('/find/:userId', verifyTokenAndAuthorization, getCart);

//GET ALL
router.get('/', verifyTokenAndAdmin, getAllCarts);

export default router;
