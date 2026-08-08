const mongoose = require('mongoose');

const interviewSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  jobTitle: { type: String, required: true },
  date: { type: Date, default: Date.now },
  duration: { type: Number, required: true },
  answers: [{
    question: String,
    answer: String,
    score: Number
  }],
  overallScore: { type: Number, required: true },
  strengths: [String],
  weaknesses: [String],
  tips: [String]
});

module.exports = mongoose.model('Interview', interviewSchema);
