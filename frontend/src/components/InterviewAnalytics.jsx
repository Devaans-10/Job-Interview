import { BarChart, Trophy, Activity, Target } from 'lucide-react';

export default function InterviewAnalytics({ stats }) {
  if (!stats || stats.totalInterviews === 0) return null;

  const {
    totalInterviews,
    averageScore,
    bestScore,
    mostPracticedRole,
    scoreTrend
  } = stats;

  const getScoreColor = (score) => {
    if (score >= 8) return 'text-green-500';
    if (score >= 6) return 'text-yellow-500';
    if (score >= 4) return 'text-orange-500';
    return 'text-red-500';
  };

  const getScoreBgColor = (score) => {
    if (score >= 8) return 'bg-green-500/20';
    if (score >= 6) return 'bg-yellow-500/20';
    if (score >= 4) return 'bg-orange-500/20';
    return 'bg-red-500/20';
  };

  // Prepare simplified chart data
  // We'll show the last 10 scores
  const recentTrends = scoreTrend.slice(-10);
  const maxChartHeight = 80; // px

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {/* Total Interviews */}
        <div className="bg-[#0C0C0C] border border-[#D7E2EA]/20 rounded-2xl p-5 hover:bg-[#D7E2EA]/5 transition duration-300">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-[#D7E2EA]/70 text-sm font-medium">Total</h3>
            <div className="p-2 bg-blue-500/10 rounded-lg">
              <Activity className="w-5 h-5 text-blue-400" />
            </div>
          </div>
          <p className="text-3xl font-black text-white">{totalInterviews}</p>
        </div>

        {/* Average Score */}
        <div className="bg-[#0C0C0C] border border-[#D7E2EA]/20 rounded-2xl p-5 hover:bg-[#D7E2EA]/5 transition duration-300">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-[#D7E2EA]/70 text-sm font-medium">Avg Score</h3>
            <div className={`p-2 rounded-lg ${getScoreBgColor(averageScore)}`}>
              <BarChart className={`w-5 h-5 ${getScoreColor(averageScore)}`} />
            </div>
          </div>
          <p className={`text-3xl font-black ${getScoreColor(averageScore)}`}>{averageScore}</p>
        </div>

        {/* Best Score */}
        <div className="bg-[#0C0C0C] border border-[#D7E2EA]/20 rounded-2xl p-5 hover:bg-[#D7E2EA]/5 transition duration-300">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-[#D7E2EA]/70 text-sm font-medium">Best</h3>
            <div className={`p-2 rounded-lg ${getScoreBgColor(bestScore)}`}>
              <Trophy className={`w-5 h-5 ${getScoreColor(bestScore)}`} />
            </div>
          </div>
          <p className={`text-3xl font-black ${getScoreColor(bestScore)}`}>{bestScore}</p>
        </div>

        {/* Most Practiced */}
        <div className="bg-[#0C0C0C] border border-[#D7E2EA]/20 rounded-2xl p-5 hover:bg-[#D7E2EA]/5 transition duration-300">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-[#D7E2EA]/70 text-sm font-medium">Top Role</h3>
            <div className="p-2 bg-purple-500/10 rounded-lg">
              <Target className="w-5 h-5 text-purple-400" />
            </div>
          </div>
          <p className="text-xl font-bold text-white truncate" title={mostPracticedRole}>
            {mostPracticedRole}
          </p>
        </div>
      </div>

      {/* Score Trend Chart */}
      {recentTrends.length > 1 && (
        <div className="bg-[#0C0C0C] border border-[#D7E2EA]/20 rounded-2xl p-6">
          <h3 className="text-[#D7E2EA]/80 font-medium mb-6 text-sm uppercase tracking-wider">Recent Score Trend</h3>
          <div className="flex items-end gap-3 h-[80px] w-full">
            {recentTrends.map((trend, idx) => {
              const height = Math.max((trend.score / 10) * maxChartHeight, 4); // min 4px
              const isLatest = idx === recentTrends.length - 1;
              return (
                <div key={idx} className="flex-1 flex flex-col items-center group relative">
                  {/* Tooltip */}
                  <div className="absolute -top-10 opacity-0 group-hover:opacity-100 transition-opacity bg-gray-800 text-xs px-2 py-1 rounded text-white whitespace-nowrap pointer-events-none z-10">
                    Score: {trend.score}
                  </div>
                  <div 
                    className={`w-full rounded-t-sm transition-all duration-500 ${isLatest ? getScoreBgColor(trend.score).replace('/20', '/80') : 'bg-gray-700 group-hover:bg-gray-500'}`}
                    style={{ height: `${height}px` }}
                  ></div>
                </div>
              );
            })}
          </div>
          <div className="flex justify-between mt-3 text-xs text-gray-500">
            <span>Older</span>
            <span>Newer</span>
          </div>
        </div>
      )}
    </div>
  );
}
