import { useState } from 'react';
import InterviewSetup from './InterviewSetup';
import ChatInterface from './ChatInterface';
import ScoreDisplay from './ScoreDisplay';
import SummaryReport from './SummaryReport';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import { getInterviewHistory } from '../utils/localStorage';
import { FaHistory, FaSignOutAlt, FaUser } from 'react-icons/fa';
import { useAuth } from '../context/AuthContext';
import { 
  mockQuestions, 
  generateMockScore, 
  generateMockReasoning,
  generateMockStrengths,
  generateMockImprovements,
  getRandomQuestion,
  generateMockSummary
} from '../data/mockInterviews';

const API_URL = import.meta.env.VITE_API_URL || (import.meta.env.PROD ? '' : 'http://localhost:5000');

function InterviewApp() {
  const [jobTitle, setJobTitle] = useState('');
  const [stage, setStage] = useState('setup'); // 'setup', 'interview', 'summary'
  const [currentQuestion, setCurrentQuestion] = useState('');
  const [history, setHistory] = useState([]); // { question, answer, scoreData }
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [lastScore, setLastScore] = useState(null);
  const [summary, setSummary] = useState(null);
  
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const [askedQuestionIds, setAskedQuestionIds] = useState([]);
  const [scores, setScores] = useState([]);
  const [answers, setAnswers] = useState([]);

  const MAX_QUESTIONS = 7; // Changed to 7 as per requirements

  const startInterview = async (title) => {
    setLoading(true);
    setError(null);
    try {
      setJobTitle(title);
      
      // Use mock data for first question
      const firstQuestion = getRandomQuestion(title, []);
      setCurrentQuestion(firstQuestion.question);
      setAskedQuestionIds([firstQuestion.id]);
      
      setHistory([]);
      setScores([]);
      setAnswers([]);
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
    
    // Simulate AI processing delay
    setTimeout(async () => {
      try {
        // Use mock scoring
        const score = generateMockScore(answer);
        const reasoning = generateMockReasoning(score, answer);
        const strengths = generateMockStrengths(score, answer);
        const improvements = generateMockImprovements(score, answer);
        
        const scoreData = { score, reasoning, good: strengths, improve: improvements };
        
        const newHistoryItem = {
          question: currentQuestion,
          answer,
          scoreData
        };
        
        const updatedHistory = [...history, newHistoryItem];
        const updatedAnswers = [...answers, answer];
        const updatedScores = [...scores, score];
        
        setHistory(updatedHistory);
        setAnswers(updatedAnswers);
        setScores(updatedScores);
        setLastScore(scoreData);

        if (updatedHistory.length >= MAX_QUESTIONS) {
          await finishInterview(updatedHistory, updatedAnswers, updatedScores, title);
        } else {
          // Get the actual question object to find its follow-up
          const currentQObj = mockQuestions[jobTitle]?.find(q => q.question === currentQuestion) || 
                             mockQuestions['Software Engineer'].find(q => q.question === currentQuestion);
                             
          // If we just answered a main question, ask its follow up
          if (currentQObj && currentQObj.followUp && !currentQuestion.includes(currentQObj.followUp)) {
             setCurrentQuestion(currentQObj.followUp);
          } else {
             // If we just answered a follow-up, get a new random question
             const nextQuestion = getRandomQuestion(jobTitle, askedQuestionIds);
             setAskedQuestionIds([...askedQuestionIds, nextQuestion.id]);
             setCurrentQuestion(nextQuestion.question);
          }
        }
      } catch (err) {
        setError('Failed to process answer. Please try again.');
      } finally {
        setLoading(false);
      }
    }, 1500); // 1.5 second artificial delay
  };

  const finishInterview = async (completedHistory, finalAnswers, finalScores, currentJobTitle) => {
    setLoading(true);
    setError(null);
    
    // Simulate generation delay
    setTimeout(() => {
      try {
        const titleToUse = currentJobTitle || jobTitle;
        const mockSummary = generateMockSummary(titleToUse, finalAnswers || answers, finalScores || scores);
        setSummary(mockSummary);
        setStage('summary');
      } catch (err) {
        setError('Failed to generate summary. Please try again.');
      } finally {
        setLoading(false);
      }
    }, 1500);
  };

  const resetInterview = () => {
    setStage('setup');
    setJobTitle('');
    setHistory([]);
    setCurrentQuestion('');
    setLastScore(null);
    setSummary(null);
    setAskedQuestionIds([]);
    setScores([]);
    setAnswers([]);
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
        <div className="flex items-center gap-4">
          {jobTitle && stage !== 'setup' && (
            <span className="px-3 py-1 bg-[#B600A8]/20 border border-[#B600A8]/30 rounded-full text-xs font-medium text-[#D7E2EA] hidden sm:inline-block">
              Role: {jobTitle}
            </span>
          )}
          {getInterviewHistory(user?.userId).length > 0 && (
            <Link 
              to="/history"
              className="flex items-center gap-2 text-sm font-medium text-[#D7E2EA]/70 hover:text-white transition-colors"
            >
              <FaHistory /> <span className="hidden sm:inline">History</span>
            </Link>
          )}
          {user && (
            <div className="flex items-center gap-4 ml-2 pl-4 border-l border-gray-700">
              <div className="flex items-center gap-2 text-sm text-[#D7E2EA]">
                <FaUser className="text-[#B600A8]" />
                <span className="hidden sm:inline">{user.name}</span>
              </div>
              <button 
                onClick={() => {
                  logout();
                  navigate('/login');
                }}
                className="flex items-center gap-2 text-sm text-red-400 hover:text-red-300 transition-colors"
                title="Logout"
              >
                <FaSignOutAlt />
              </button>
            </div>
          )}
        </div>
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
            <SummaryReport summary={summary} onRestart={resetInterview} history={history} jobTitle={jobTitle} />
          </div>
        )}
      </main>
    </div>
  );
}

export default InterviewApp;
