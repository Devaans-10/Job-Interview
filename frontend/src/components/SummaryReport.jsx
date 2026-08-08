import { useEffect, useRef } from 'react';
import { FaRedo, FaTrophy, FaStar, FaArrowUp, FaBullseye, FaHistory } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import InterviewTips from './InterviewTips';
import { saveInterview } from '../utils/localStorage';
import { useAuth } from '../context/AuthContext';

export default function SummaryReport({ summary, onRestart, history, jobTitle, isHistoryView = false }) {
  const hasSaved = useRef(false);
  const { user } = useAuth();

  useEffect(() => {
    if (summary && !isHistoryView && !hasSaved.current) {
      saveInterview({
        jobTitle,
        summary,
        history,
        overallScore: summary.overall_score
      }, user?.userId);
      hasSaved.current = true;
    }
  }, [summary, isHistoryView, jobTitle, history, user]);
  if (!summary) return null;

  const { overall_score, strengths, improvements, feedback } = summary;

  // Determine overall color based on score
  let scoreColor = "text-red-400";
  let bgGradient = "from-red-500 to-orange-500";
  
  if (overall_score >= 8) {
    scoreColor = "text-green-400";
    bgGradient = "from-green-400 to-emerald-600";
  } else if (overall_score >= 5) {
    scoreColor = "text-yellow-400";
    bgGradient = "from-yellow-400 to-amber-600";
  }

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-fade-in-up">
      {/* Header Card */}
      <div className="bg-gray-800 rounded-3xl shadow-2xl border border-gray-700 overflow-hidden relative">
        <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500"></div>
        
        <div className="p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="text-center md:text-left">
            <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-4">Interview Complete</h2>
            <p className="text-gray-400 max-w-lg">
              Here is your comprehensive performance review based on your answers. Use this feedback to prepare for your real interview.
            </p>
          </div>
          
          <div className="flex-shrink-0 relative">
            <div className="w-48 h-48 rounded-full bg-gray-900 border-8 border-gray-800 shadow-inner flex flex-col items-center justify-center z-10 relative">
              <span className={`text-6xl font-black ${scoreColor}`}>{overall_score}</span>
              <span className="text-gray-500 font-bold uppercase tracking-widest mt-1">Overall</span>
            </div>
            {/* Glow effect behind circle */}
            <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-gradient-to-br ${bgGradient} rounded-full blur-2xl opacity-20 -z-0`}></div>
          </div>
        </div>
      </div>

      {/* Details Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Strengths */}
        <div className="bg-gray-800 rounded-2xl shadow-xl border border-gray-700 p-6 md:p-8">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-full bg-green-900/50 flex items-center justify-center border border-green-700/50">
              <FaStar className="text-green-400" />
            </div>
            <h3 className="text-xl font-bold text-white">Top Strengths</h3>
          </div>
          <ul className="space-y-4">
            {strengths && strengths.map((item, idx) => (
              <li key={idx} className="flex gap-3 text-gray-300">
                <span className="text-green-400 mt-1">✦</span>
                <span className="leading-relaxed">{item}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Improvements */}
        <div className="bg-gray-800 rounded-2xl shadow-xl border border-gray-700 p-6 md:p-8">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-full bg-yellow-900/50 flex items-center justify-center border border-yellow-700/50">
              <FaArrowUp className="text-yellow-400" />
            </div>
            <h3 className="text-xl font-bold text-white">Areas to Improve</h3>
          </div>
          <ul className="space-y-4">
            {improvements && improvements.map((item, idx) => (
              <li key={idx} className="flex gap-3 text-gray-300">
                <span className="text-yellow-400 mt-1">✦</span>
                <span className="leading-relaxed">{item}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Key Feedback */}
        <div className="bg-gray-800 rounded-2xl shadow-xl border border-gray-700 p-6 md:p-8 md:col-span-2">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-full bg-blue-900/50 flex items-center justify-center border border-blue-700/50">
              <FaBullseye className="text-blue-400" />
            </div>
            <h3 className="text-xl font-bold text-white">Key Takeaways</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {feedback && feedback.map((item, idx) => (
              <div key={idx} className="bg-gray-750 p-4 rounded-xl border border-gray-700 text-gray-300 leading-relaxed">
                {item}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* AI Interview Tips */}
      <InterviewTips history={history} jobTitle={jobTitle} />

      {/* Actions */}
      <div className="flex flex-col sm:flex-row justify-center items-center gap-4 pt-4 pb-12">
        <button
          onClick={onRestart}
          className="flex items-center justify-center gap-3 w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white rounded-xl font-bold text-lg shadow-[0_0_20px_rgba(59,130,246,0.3)] hover:shadow-[0_0_30px_rgba(59,130,246,0.5)] transition-all duration-300 hover:-translate-y-1"
        >
          <FaRedo /> {isHistoryView ? 'Back to History' : 'Start New Interview'}
        </button>
        
        {!isHistoryView && (
          <Link
            to="/history"
            className="flex items-center justify-center gap-3 w-full sm:w-auto px-8 py-4 bg-gray-800 hover:bg-gray-700 border border-gray-600 text-white rounded-xl font-bold text-lg shadow-[0_0_20px_rgba(0,0,0,0.3)] hover:shadow-[0_0_30px_rgba(0,0,0,0.5)] transition-all duration-300 hover:-translate-y-1"
          >
            <FaHistory /> View All Interviews
          </Link>
        )}
      </div>
    </div>
  );
}
