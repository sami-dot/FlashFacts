// /server/seed/seedQuestions.js

const mongoose = require('mongoose');
const axios = require('axios');
require('dotenv').config();

const Question = require('../models/Question');

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log("🥴 MongoDB connected"))
.catch(err => console.error("❌ MongoDB connection error:", err));

// Function to fetch and save questions
const fetchAndSaveQuestions = async () => {
  try {
    const { data } = await axios.get('https://opentdb.com/api.php?amount=10&type=multiple');
    
    const formattedQuestions = data.results.map(q => {
      const allAnswers = [...q.incorrect_answers, q.correct_answer];
      
      return {
        question: decodeHTML(q.question),
        choices: shuffle(allAnswers.map(decodeHTML)),
        correctAnswer: decodeHTML(q.correct_answer),
        category: q.category || "General"
      };
    });

    await Question.insertMany(formattedQuestions);
    console.log(`✅ Inserted ${formattedQuestions.length} questions`);
    process.exit();

  } catch (err) {
    console.error("🔥 Something went wrong:", err);
    process.exit(1);
  }
};

const { decode } = require('he');

function decodeHTML(html) {
  return decode(html);
}


const shuffle = (array) => array.sort(() => Math.random() - 0.5);

// Run it
fetchAndSaveQuestions();
