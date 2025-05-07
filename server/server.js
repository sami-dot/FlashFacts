import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes

import questionRoutes from './routes/questions.js';
app.use('/api/questions', questionRoutes);
console.log('✅ Routes mounted at /api/questions');

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/flashfacts', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('🔥 MongoDB connected');
  app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
  });
}).catch((error) => console.error('❌ MongoDB connection failed:', error));
