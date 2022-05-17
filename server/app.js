import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import AuthRoutes from './routes/authRoutes.js';
import UserRoutes from './routes/userRoutes.js';
import ProductRoutes from './routes/productRoutes.js';
import CartRoutes from './routes/cartRoutes.js';
import OrderRoutes from './routes/orderRoutes.js';

const app = express();
app.use(express.json());
dotenv.config();
app.use(cors());

mongoose
  .connect(process.env.MONGO_URL)
  .then(() =>
    app.listen(process.env.PORT, () =>
      console.log(`Server running on ${process.env.PORT}`)
    )
  )
  .catch(e => console.log(e));

//Routes
app.use('/api/auth', AuthRoutes);
app.use('/api/user', UserRoutes);
app.use('/api/product', ProductRoutes);
app.use('/api/cart', CartRoutes);
app.use('/api/order', OrderRoutes);
