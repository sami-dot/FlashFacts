import express from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';

const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET || 'dev-secret';
// Signup
router.post('/signup', async (req, res) => {
    const { username, email, password } = req.body;
    try {
      const existingUser = await User.findOne({ email });
      if (existingUser) return res.status(400).json({ message: 'User already exists' });
  
      const passwordHash = await bcrypt.hash(password, 10);
      const user = new User({ username, email, passwordHash });
      await user.save();
  
      const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: '1h' });
      res.json({ token, username: user.username });
    } catch (err) {
      res.status(500).json({ message: 'Server error' });
    }
  });
  
  // Login
  router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    try {
      const user = await User.findOne({ email });
      if (!user) return res.status(400).json({ message: 'Invalid credentials' });
  
      const match = await user.comparePassword(password);
      if (!match) return res.status(400).json({ message: 'Invalid credentials' });
  
      const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: '1h' });
      res.json({ token, username: user.username });
    } catch (err) {
      res.status(500).json({ message: 'Server error' });
    }
  });
  
  // Get Current User
  router.get('/me', async (req, res) => {
    const authHeader = req.headers.authorization;
    if (!authHeader) return res.status(401).json({ message: 'Missing token' });
  
    try {
      const token = authHeader.split(' ')[1];
      const decoded = jwt.verify(token, JWT_SECRET);
      const user = await User.findById(decoded.id).select('-passwordHash');
      res.json(user);
    } catch (err) {
      res.status(401).json({ message: 'Invalid token' });
    }
  });
  
  export default router;
  