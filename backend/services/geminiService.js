const { GoogleGenerativeAI } = require("@google/generative-ai");

// Initialize the Google Generative AI with the API key from environment variables
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "dummy_key");

// Get the generative model
const model = genAI.getGenerativeModel({ model: "gemini-3.6-flash" }); // or gemini-3.6-pro if preferred, but flash is good for chat

/**
 * Generate an opening question for the interview based on the job title.
 * @param {string} jobTitle - The role being interviewed for.
 * @returns {Promise<string>} The opening question.
 */
async function generateOpeningQuestion(jobTitle) {
  const prompt = `You are a professional recruiter interviewing for a ${jobTitle} position. Generate ONE realistic, conversational opening question that tests foundational skills for this role. Keep it natural and not too formal.`;
  
  try {
    const result = await model.generateContent(prompt);
    const response = await result.response;
    return response.text();
  } catch (error) {
    console.error("Error generating opening question:", error);
    throw error;
  }
}

/**
 * Score the user's answer and provide feedback.
 * @param {string} question - The question that was asked.
 * @param {string} answer - The user's answer.
 * @returns {Promise<object>} The scoring result (score, reasoning, good, improve).
 */
async function scoreAnswer(question, answer) {
  const prompt = `Score this job interview answer on a scale of 1-10. 
Question: ${question}
Answer: ${answer}

Provide: 
(1) score (1-10)
(2) brief reasoning (1-2 sentences)
(3) what was good
(4) what could improve

Format the response strictly as valid JSON without any markdown formatting blocks like \`\`\`json. 
Example format:
{
  "score": 8,
  "reasoning": "The answer shows good understanding.",
  "good": "Clear communication.",
  "improve": "Could add more technical details."
}`;

  try {
    const result = await model.generateContent(prompt);
    const response = await result.response;
    let text = response.text().trim();
    // In case the model still returns markdown JSON block, clean it up
    text = text.replace(/^```json/i, '').replace(/```$/, '').trim();
    return JSON.parse(text);
  } catch (error) {
    console.error("Error scoring answer:", error);
    throw error;
  }
}

/**
 * Generate a follow-up question based on the user's previous answer.
 * @param {string} answer - The user's previous answer.
 * @returns {Promise<string>} The follow-up question.
 */
async function generateFollowUpQuestion(answer) {
  const prompt = `Based on this job interview answer, generate ONE follow-up question that probes deeper. 
Answer given: ${answer}

Make it test adjacent skills or technical depth. Keep it conversational.`;

  try {
    const result = await model.generateContent(prompt);
    const response = await result.response;
    return response.text();
  } catch (error) {
    console.error("Error generating follow-up question:", error);
    throw error;
  }
}

/**
 * Generate an overall summary of the interview.
 * @param {Array} history - Array of { question, answer, scoreData } objects.
 * @returns {Promise<object>} The interview summary.
 */
async function generateSummary(history) {
  const prompt = `Generate a professional interview summary. 
Answers and scores: ${JSON.stringify(history)}

Provide: 
(1) overall_score (average number out of 10)
(2) strengths (array of 2-3 string bullet points: what they did well)
(3) improvements (array of 2-3 string bullet points: areas to work on)
(4) feedback (array of 2-3 string key feedback points)

Format the response strictly as valid JSON without any markdown formatting blocks like \`\`\`json.
Example format:
{
  "overall_score": 7.5,
  "strengths": ["Good communication", "Strong knowledge of X"],
  "improvements": ["Needs to elaborate more", "Should practice Y"],
  "feedback": ["You did well overall", "Focus on technical depth"]
}`;

  try {
    const result = await model.generateContent(prompt);
    const response = await result.response;
    let text = response.text().trim();
    text = text.replace(/^```json/i, '').replace(/```$/, '').trim();
    return JSON.parse(text);
  } catch (error) {
    console.error("Error generating summary:", error);
    throw error;
  }
}

/**
 * Generate specific, actionable interview tips based on the user's performance.
 * @param {Array} history - Array of { question, answer, scoreData } objects.
 * @param {string} jobTitle - The role being interviewed for.
 * @returns {Promise<Array>} Array of tip objects.
 */
async function generateTips(history, jobTitle) {
  const questionsList = history.map(h => h.question).join('\n');
  const answersList = history.map(h => h.answer).join('\n');
  const scoresList = history.map(h => h.scoreData.score).join('\n');

  const prompt = `Based on this job interview for ${jobTitle}:
- Questions asked: ${questionsList}
- User answers: ${answersList}
- Scores received: ${scoresList}

Generate 4-5 specific, actionable interview tips. For each tip:
- Identify a weakness or area to improve from their answers
- Provide specific, actionable advice
- Include example of what to say/do

Format as JSON with array of objects: 
[{
  "title": "string",
  "description": "string",
  "example": "string",
  "category": "confidence" | "technical" | "clarity" | "depth"
}]

Format the response strictly as valid JSON without any markdown formatting blocks like \`\`\`json.`;

  try {
    const result = await model.generateContent(prompt);
    const response = await result.response;
    let text = response.text().trim();
    text = text.replace(/^```json/i, '').replace(/```$/, '').trim();
    return JSON.parse(text);
  } catch (error) {
    console.error("Error generating tips:", error);
    throw error;
  }
}

module.exports = {
  generateOpeningQuestion,
  scoreAnswer,
  generateFollowUpQuestion,
  generateSummary,
  generateTips
};
