import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { ArrowLeft, Trash2 } from 'lucide-react';
import { FaSignOutAlt, FaUser } from 'react-icons/fa';
import InterviewAnalytics from './InterviewAnalytics';
import InterviewHistory from './InterviewHistory';
import SummaryReport from './SummaryReport';
import { getInterviewHistory, getInterviewStats, clearAllHistory } from '../utils/localStorage';
import { useAuth } from '../context/AuthContext';

export default function HistoryDashboard() {
  const [historyList, setHistoryList] = useState([]);
  const [stats, setStats] = useState(null);
  const [selectedInterview, setSelectedInterview] = useState(null);
  
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    loadData();
  }, [user]);

  const loadData = () => {
    if (user) {
      setHistoryList(getInterviewHistory(user.userId));
      setStats(getInterviewStats(user.userId));
    }
  };

  const handleClearHistory = () => {
    if (user && window.confirm('Are you sure you want to clear all interview history? This cannot be undone.')) {
      clearAllHistory(user.userId);
      loadData();
    }
  };

  const handleViewInterview = (interview) => {
    setSelectedInterview(interview);
  };

  const handleCloseView = () => {
    setSelectedInterview(null);
  };

  // If an interview is selected, show the SummaryReport for it
  if (selectedInterview) {
    return (
      <div className="min-h-screen bg-[#0C0C0C] text-[#D7E2EA] font-sans">
        <header className="bg-[#0C0C0C] shadow-md py-4 px-6 border-b border-[#D7E2EA]/10 flex justify-between items-center">
          <div className="flex items-center gap-4 cursor-pointer" onClick={handleCloseView}>
            <ArrowLeft className="w-5 h-5 text-gray-400 hover:text-white transition-colors" />
            <h1 className="text-xl font-bold tracking-tight text-[#D7E2EA] uppercase">
              Back to History
            </h1>
          </div>
          <span className="px-3 py-1 bg-[#B600A8]/20 border border-[#B600A8]/30 rounded-full text-xs font-medium text-[#D7E2EA]">
            Role: {selectedInterview.jobTitle}
          </span>
        </header>

        <main className="container mx-auto px-4 py-8 max-w-4xl">
          <SummaryReport 
            summary={selectedInterview.summary} 
            onRestart={handleCloseView} // Repurpose onRestart as back button in this context
            history={selectedInterview.history}
            jobTitle={selectedInterview.jobTitle}
            isHistoryView={true}
          />
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0C0C0C] text-[#D7E2EA] font-sans selection:bg-[#B600A8]/50 selection:text-white animate-fade-in">
      <header className="bg-[#0C0C0C] shadow-md py-4 px-6 border-b border-[#D7E2EA]/10 flex justify-between items-center">
        <div className="cursor-pointer flex items-center gap-2" onClick={() => navigate('/')}>
          <ArrowLeft className="w-5 h-5 text-gray-400 hover:text-[#B600A8] transition-colors" />
          <h1 className="text-xl font-bold tracking-tight text-[#D7E2EA] uppercase">
            Interview History
          </h1>
        </div>
        
        <div className="flex items-center gap-4">
          {historyList.length > 0 && (
            <button 
              onClick={handleClearHistory}
              className="flex items-center gap-2 px-3 py-1.5 text-sm text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded-lg transition-colors"
            >
              <Trash2 className="w-4 h-4" />
              <span className="hidden sm:inline">Clear History</span>
            </button>
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

      <main className="container mx-auto px-4 py-8 max-w-5xl space-y-12">
        <section>
          <h2 className="text-2xl font-bold mb-6 text-white">Analytics Overview</h2>
          <InterviewAnalytics stats={stats} />
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-6 text-white">Past Interviews</h2>
          <InterviewHistory 
            history={historyList} 
            onViewInterview={handleViewInterview} 
          />
        </section>
      </main>
    </div>
  );
}
