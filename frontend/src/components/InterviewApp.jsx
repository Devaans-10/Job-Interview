import { useState } from 'react';
import InterviewSetup from './InterviewSetup';
import ChatInterface from './ChatInterface';
import ScoreDisplay from './ScoreDisplay';
import SummaryReport from './SummaryReport';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

function InterviewApp() {
  const [jobTitle, setJobTitle] = useState('');
  const [stage, setStage] = useState('setup'); // 'setup', 'interview', 'summary'
  const [currentQuestion, setCurrentQuestion] = useState('');
  const [history, setHistory] = useState([]); // { question, answer, scoreData }
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [lastScore, setLastScore] = useState(null);
  const [summary, setSummary] = useState(null);
  
  const navigate = useNavigate();

  const MAX_QUESTIONS = 5;

  const startInterview = async (title) => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.post(`${API_URL}/api/interview/start`, { job_title: title });
      setJobTitle(title);
      setCurrentQuestion(response.data.question);
      setHistory([]);
      setLastScore(null);
      setSummary(null);
      setStage('interview');
    } catch (err) {
      setError('Failed to start interview. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleAnswerSubmit = async (answer) => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.post(`${API_URL}/api/interview/answer`, {
        user_answer: answer,
        job_title: jobTitle,
        current_question: currentQuestion,
        question_history: history
      });

      const { score, reasoning, good, improve, follow_up_question } = response.data;
      const scoreData = { score, reasoning, good, improve };
      
      const newHistoryItem = {
        question: currentQuestion,
        answer,
        scoreData
      };
      
      const updatedHistory = [...history, newHistoryItem];
      setHistory(updatedHistory);
      setLastScore(scoreData);

      if (updatedHistory.length >= MAX_QUESTIONS) {
        await finishInterview(updatedHistory);
      } else {
        setCurrentQuestion(follow_up_question);
      }
    } catch (err) {
      setError('Failed to process answer. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const finishInterview = async (completedHistory) => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.post(`${API_URL}/api/interview/summary`, {
        history: completedHistory
      });
      setSummary(response.data);
      setStage('summary');
    } catch (err) {
      setError('Failed to generate summary. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const resetInterview = () => {
    setStage('setup');
    setJobTitle('');
    setHistory([]);
    setCurrentQuestion('');
    setLastScore(null);
    setSummary(null);
  };

  return (
    <div className="min-h-screen bg-[#0C0C0C] text-[#D7E2EA] font-sans selection:bg-[#B600A8]/50 selection:text-white">
      <header className="bg-[#0C0C0C] shadow-md py-4 px-6 border-b border-[#D7E2EA]/10 flex justify-between items-center">
        <div 
          className="cursor-pointer"
          onClick={() => navigate('/')}
        >
          <h1 className="text-xl font-bold tracking-tight text-[#D7E2EA] uppercase">
            AI Interview Agent
          </h1>
        </div>
        {jobTitle && stage !== 'setup' && (
          <span className="px-3 py-1 bg-[#B600A8]/20 border border-[#B600A8]/30 rounded-full text-xs font-medium text-[#D7E2EA]">
            Role: {jobTitle}
          </span>
        )}
      </header>

      <main className="container mx-auto px-4 py-8 max-w-4xl">
        {error && (
          <div className="bg-red-500/20 border border-red-500/50 text-red-200 px-4 py-3 rounded-xl mb-6 backdrop-blur-sm shadow-[0_0_15px_rgba(239,68,68,0.2)]">
            {error}
          </div>
        )}

        {stage === 'setup' && (
          <div className="transition-all duration-500 ease-in-out transform">
            <InterviewSetup onStart={startInterview} loading={loading} />
          </div>
        )}

        {stage === 'interview' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 transition-all duration-500 ease-in-out transform">
            <div className="lg:col-span-2 flex flex-col gap-6">
              <ChatInterface 
                currentQuestion={currentQuestion}
                history={history}
                onSubmit={handleAnswerSubmit}
                loading={loading}
                questionCount={history.length + 1}
                maxQuestions={MAX_QUESTIONS}
              />
            </div>
            <div className="lg:col-span-1">
              <ScoreDisplay scoreData={lastScore} />
            </div>
          </div>
        )}

        {stage === 'summary' && summary && (
          <div className="transition-all duration-500 ease-in-out transform">
            <SummaryReport summary={summary} onRestart={resetInterview} />
          </div>
        )}
      </main>
    </div>
  );
}

export default InterviewApp;
