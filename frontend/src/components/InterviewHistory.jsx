import { useState, useMemo } from 'react';
import { Calendar, ChevronDown } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function InterviewHistory({ history, onViewInterview }) {
  const [filterRole, setFilterRole] = useState('All');
  const [sortBy, setSortBy] = useState('recent'); // 'recent', 'highest', 'lowest'
  const [visibleCount, setVisibleCount] = useState(10);
  const navigate = useNavigate();

  // Get unique roles for filter
  const roles = useMemo(() => {
    const uniqueRoles = new Set(history.map(item => item.jobTitle || 'Unknown'));
    return ['All', ...Array.from(uniqueRoles)];
  }, [history]);

  const filteredAndSortedHistory = useMemo(() => {
    let result = [...history];

    // Filter
    if (filterRole !== 'All') {
      result = result.filter(item => (item.jobTitle || 'Unknown') === filterRole);
    }

    // Sort
    result.sort((a, b) => {
      const scoreA = a.overallScore || 0;
      const scoreB = b.overallScore || 0;
      const dateA = new Date(a.date).getTime();
      const dateB = new Date(b.date).getTime();

      if (sortBy === 'recent') {
        return dateB - dateA; // Newest first
      } else if (sortBy === 'highest') {
        return scoreB - scoreA;
      } else if (sortBy === 'lowest') {
        return scoreA - scoreB;
      }
      return 0;
    });

    return result;
  }, [history, filterRole, sortBy]);

  const visibleHistory = filteredAndSortedHistory.slice(0, visibleCount);

  const getScoreColor = (score) => {
    if (score >= 8) return 'text-green-500';
    if (score >= 6) return 'text-yellow-500';
    if (score >= 4) return 'text-orange-500';
    return 'text-red-500';
  };

  const getScoreBgColor = (score) => {
    if (score >= 8) return 'bg-green-500/10 border-green-500/30';
    if (score >= 6) return 'bg-yellow-500/10 border-yellow-500/30';
    if (score >= 4) return 'bg-orange-500/10 border-orange-500/30';
    return 'bg-red-500/10 border-red-500/30';
  };

  if (history.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 px-4 text-center border border-[#D7E2EA]/10 rounded-2xl bg-[#0C0C0C]/50">
        <div className="w-24 h-24 bg-gray-800 rounded-full flex items-center justify-center mb-6 border border-gray-700 shadow-inner">
          <Calendar className="w-10 h-10 text-gray-500" />
        </div>
        <h3 className="text-2xl font-bold text-white mb-3">No Interviews Yet</h3>
        <p className="text-[#D7E2EA]/60 max-w-md mb-8">
          You haven't taken any mock interviews yet. Start your first interview to track your progress over time.
        </p>
        <button
          onClick={() => navigate('/interview')}
          className="px-8 py-3 bg-gradient-to-r from-[#B600A8] to-purple-600 hover:from-[#95008a] hover:to-purple-700 text-white rounded-xl font-bold transition-all duration-300 shadow-lg hover:-translate-y-1"
        >
          Start Your First Interview
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
      {/* Filters and Sort */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-[#0C0C0C] p-4 rounded-xl border border-[#D7E2EA]/10">
        <div className="flex items-center gap-2 w-full sm:w-auto">
          <label className="text-sm text-[#D7E2EA]/60 whitespace-nowrap">Filter by Role:</label>
          <div className="relative flex-1 sm:flex-none">
            <select
              value={filterRole}
              onChange={(e) => {
                setFilterRole(e.target.value);
                setVisibleCount(10);
              }}
              className="appearance-none w-full bg-gray-900 border border-gray-700 text-white py-2 pl-3 pr-10 rounded-lg focus:outline-none focus:border-[#B600A8] focus:ring-1 focus:ring-[#B600A8] text-sm"
            >
              {roles.map(role => (
                <option key={role} value={role}>{role}</option>
              ))}
            </select>
            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
          </div>
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          <label className="text-sm text-[#D7E2EA]/60 whitespace-nowrap">Sort by:</label>
          <div className="relative flex-1 sm:flex-none">
            <select
              value={sortBy}
              onChange={(e) => {
                setSortBy(e.target.value);
                setVisibleCount(10);
              }}
              className="appearance-none w-full bg-gray-900 border border-gray-700 text-white py-2 pl-3 pr-10 rounded-lg focus:outline-none focus:border-[#B600A8] focus:ring-1 focus:ring-[#B600A8] text-sm"
            >
              <option value="recent">Most Recent</option>
              <option value="highest">Highest Score</option>
              <option value="lowest">Lowest Score</option>
            </select>
            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
          </div>
        </div>
      </div>

      {/* List */}
      <div className="space-y-4">
        {visibleHistory.map((item) => (
          <div
            key={item.id}
            onClick={() => onViewInterview(item)}
            className="flex flex-row items-center justify-between bg-[#0C0C0C] border border-[#D7E2EA]/30 rounded-2xl p-6 cursor-pointer hover:bg-[#D7E2EA]/5 hover:scale-[1.02] transition-all duration-300"
          >
            <div className="flex flex-col">
              <h3 className="font-semibold text-lg md:text-xl text-white mb-1">
                {item.jobTitle || 'Unknown Role'}
              </h3>
              <p className="font-light text-sm text-[#D7E2EA]/60">
                {new Date(item.date).toLocaleDateString(undefined, { 
                  year: 'numeric', month: 'short', day: 'numeric', 
                  hour: '2-digit', minute:'2-digit' 
                })}
              </p>
            </div>

            <div className={`flex items-center justify-center w-16 h-16 md:w-20 md:h-20 rounded-2xl border ${getScoreBgColor(item.overallScore)}`}>
              <span className={`font-black text-2xl md:text-3xl ${getScoreColor(item.overallScore)}`}>
                {item.overallScore || 0}
              </span>
            </div>
          </div>
        ))}

        {visibleHistory.length === 0 && (
          <div className="text-center py-10 text-gray-500">
            No interviews match your filters.
          </div>
        )}
      </div>

      {/* Load More */}
      {visibleCount < filteredAndSortedHistory.length && (
        <div className="flex justify-center pt-4">
          <button
            onClick={() => setVisibleCount(prev => prev + 10)}
            className="px-6 py-2 border border-gray-600 text-gray-300 hover:text-white hover:border-gray-400 rounded-lg transition-colors text-sm font-medium"
          >
            Load More
          </button>
        </div>
      )}
    </div>
  );
}
