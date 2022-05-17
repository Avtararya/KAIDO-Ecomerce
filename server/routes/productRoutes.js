import express from 'express';
import {
  createProduct,
  deleteProduct,
  getProduct,
  getProducts,
  updateProduct,
} from '../controller/productController.js';

import { verifyTokenAndAdmin } from '../middleware/authMiddleware.js';

const router = express.Router();

//CREATE
router.post('/', verifyTokenAndAdmin, createProduct);

//UPDATE
router.put('/:id', verifyTokenAndAdmin, updateProduct);

//DELETE
router.delete('/:id', verifyTokenAndAdmin, deleteProduct);

//GET
router.get('/find/:id', getProduct);

//GET ALL
router.get('/', getProducts);

export default router;
