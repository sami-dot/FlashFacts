const mongoose = require('mongoose');

const questionSchema = new mongoose.Schema({
  question: String,
  choices: [String],
  correctAnswer: String,
  category: String
});

module.exports = mongoose.model('Question', questionSchema);
