const express = require('express');
const router = express.Router();
const geminiService = require('../services/geminiService');

// POST /api/interview/start
// Input: job_title
// Output: first interview question
router.post('/start', async (req, res) => {
  try {
    const { job_title } = req.body;
    if (!job_title) {
      return res.status(400).json({ error: 'job_title is required' });
    }

    const question = await geminiService.generateOpeningQuestion(job_title);
    res.json({ question });
  } catch (error) {
    console.error('Error in /start:', error);
    res.status(500).json({ error: 'Failed to start interview' });
  }
});

// POST /api/interview/answer
// Input: user_answer, job_title, question_history
// Output: score (1-10), reasoning, follow_up_question
router.post('/answer', async (req, res) => {
  try {
    const { user_answer, job_title, current_question, question_history } = req.body;
    
    if (!user_answer || !current_question) {
      return res.status(400).json({ error: 'user_answer and current_question are required' });
    }

    // Score the answer
    const scoreData = await geminiService.scoreAnswer(current_question, user_answer);
    
    // Generate follow up question
    const follow_up_question = await geminiService.generateFollowUpQuestion(user_answer);

    res.json({
      score: scoreData.score,
      reasoning: scoreData.reasoning,
      good: scoreData.good,
      improve: scoreData.improve,
      follow_up_question
    });
  } catch (error) {
    console.error('Error in /answer:', error);
    res.status(500).json({ error: 'Failed to process answer' });
  }
});

// POST /api/interview/summary
// Input: all_answers and scores
// Output: overall_score, strengths, weaknesses, feedback
router.post('/summary', async (req, res) => {
  try {
    const { history } = req.body;
    
    if (!history || !Array.isArray(history) || history.length === 0) {
      return res.status(400).json({ error: 'history array is required' });
    }

    const summary = await geminiService.generateSummary(history);
    res.json(summary);
  } catch (error) {
    console.error('Error in /summary:', error);
    res.status(500).json({ error: 'Failed to generate summary' });
  }
});

// POST /api/interview/tips
// Input: history, jobTitle
// Output: tips array
router.post('/tips', async (req, res) => {
  try {
    const { history, jobTitle } = req.body;
    
    if (!history || !Array.isArray(history) || history.length === 0) {
      return res.status(400).json({ error: 'history array is required' });
    }
    if (!jobTitle) {
      return res.status(400).json({ error: 'jobTitle is required' });
    }

    const tips = await geminiService.generateTips(history, jobTitle);
    res.json({ tips });
  } catch (error) {
    console.error('Error in /tips:', error);
    // Generic fallback tips in case of failure
    res.json({ tips: [
      {
        title: "Structure Your Answers",
        description: "Use the STAR method (Situation, Task, Action, Result) to structure your behavioral answers more effectively.",
        example: "Instead of 'I fixed the bug', say 'The system was crashing (S/T), so I rewrote the query (A), which reduced latency by 50% (R).'",
        category: "clarity"
      },
      {
        title: "Show Confidence",
        description: "Speak clearly and confidently about your achievements.",
        example: "Avoid filler words and own your success.",
        category: "confidence"
      }
    ]});
  }
});

module.exports = router;
