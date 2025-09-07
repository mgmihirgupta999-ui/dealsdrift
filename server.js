const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const mongoose = require('mongoose');
const authRoutes = require('./src/routes/auth');
const productRoutes = require('./src/routes/products');
const orderRoutes = require('./src/routes/orders');
const paymentRoutes = require('./src/routes/payments');
const connectDB = require('./src/config/db');

require('dotenv').config();

const app = express();
app.use(helmet());
app.use(cors({origin: process.env.FRONTEND_URL || true}));
app.use(express.json());

connectDB(process.env.MONGO_URI || 'mongodb://localhost:27017/supplier_portal');

app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/payments', paymentRoutes);

app.get('/api/health', (req,res)=>res.json({ok:true}));

const PORT = process.env.PORT || 5000;
app.listen(PORT, ()=> console.log('Server running on', PORT));
