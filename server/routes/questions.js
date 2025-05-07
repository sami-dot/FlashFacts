import express from 'express';
import Question from '../models/Question.js';

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const questions = await Question.find().limit(10);
    res.json(questions);
  } catch (error) {
    console.error('Failed to fetch questions:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

export default router;
