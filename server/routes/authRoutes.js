import express from 'express';
import { postLogin, postSignUp } from '../controller/authController.js';

const router = express.Router();

//REGISTER
router.post('/signup', postSignUp);

//LOGIN
router.post('/login', postLogin);

export default router;
