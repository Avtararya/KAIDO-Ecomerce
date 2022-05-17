import express from 'express';
import {
  createOrder,
  deleteOrder,
  getAllOrders,
  getMonthlyIncome,
  getOrders,
  updateOrder,
} from '../controller/orderController.js';

import {
  verifyToken,
  verifyTokenAndAdmin,
  verifyTokenAndAuthorization,
} from '../middleware/authMiddleware.js';

const router = express.Router();

//CREATE
router.post('/', verifyToken, createOrder);

//UPDATE
router.put('/:id', verifyTokenAndAdmin, updateOrder);

//DELETE
router.delete('/:id', verifyTokenAndAdmin, deleteOrder);

//GET
router.get('/find/:userId', verifyTokenAndAuthorization, getOrders);

//GET ALL
router.get('/', verifyTokenAndAdmin, getAllOrders);

//GET MONTHLY INCOME
router.get('/income', getMonthlyIncome);

export default router;
