import express from 'express';
import {
  deleteUser,
  getStats,
  getUser,
  getUsers,
  updateUser,
} from '../controller/userController.js';
import {
  verifyTokenAndAdmin,
  verifyTokenAndAuthorization,
} from '../middleware/authMiddleware.js';

const router = express.Router();

//UPDATE
router.put('/:id', verifyTokenAndAuthorization, updateUser);

//DELETE
router.delete('/:id', verifyTokenAndAuthorization, deleteUser);

//GET
router.get('/find/:id', verifyTokenAndAdmin, getUser);

//GET ALL
router.get('/find', verifyTokenAndAdmin, getUsers);

//GET STATS
router.get('/stats', verifyTokenAndAdmin, getStats);

export default router;
