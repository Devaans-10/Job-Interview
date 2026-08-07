import { FaChartLine, FaCheckCircle, FaExclamationTriangle } from 'react-icons/fa';

export default function ScoreDisplay({ scoreData }) {
  if (!scoreData) {
    return (
      <div className="bg-gray-800 rounded-2xl shadow-xl border border-gray-700 h-full flex flex-col items-center justify-center p-8 text-center opacity-70">
        <FaChartLine className="text-4xl text-gray-600 mb-4" />
        <h3 className="text-lg font-medium text-gray-400">Awaiting Feedback</h3>
        <p className="text-sm text-gray-500 mt-2">Answer the question to see your score and AI feedback.</p>
      </div>
    );
  }

  const { score, reasoning, good, improve } = scoreData;
  
  // Determine color based on score
  let scoreColor = "text-red-400";
  let bgGlow = "shadow-[0_0_30px_rgba(248,113,113,0.2)]";
  let ringColor = "ring-red-500/30";
  
  if (score >= 8) {
    scoreColor = "text-green-400";
    bgGlow = "shadow-[0_0_30px_rgba(74,222,128,0.2)]";
    ringColor = "ring-green-500/30";
  } else if (score >= 5) {
    scoreColor = "text-yellow-400";
    bgGlow = "shadow-[0_0_30px_rgba(250,204,21,0.2)]";
    ringColor = "ring-yellow-500/30";
  }

  return (
    <div className="bg-gray-800 rounded-2xl shadow-xl border border-gray-700 h-full flex flex-col overflow-hidden animate-fade-in-up">
      <div className="px-6 py-4 border-b border-gray-700 bg-gray-800/50">
        <h3 className="font-bold text-white flex items-center gap-2">
          <FaChartLine className="text-purple-400" /> Instant Feedback
        </h3>
      </div>

      <div className="p-6 flex-1 overflow-y-auto">
        {/* Score Circle */}
        <div className="flex justify-center mb-8">
          <div className={`w-32 h-32 rounded-full bg-gray-900 border border-gray-700 flex flex-col items-center justify-center ring-4 ring-offset-4 ring-offset-gray-800 ${ringColor} ${bgGlow} transition-all duration-500`}>
            <span className={`text-4xl font-black ${scoreColor}`}>{score}</span>
            <span className="text-gray-500 text-sm font-medium">out of 10</span>
          </div>
        </div>

        {/* Feedback Sections */}
        <div className="space-y-6">
          <div className="bg-gray-750 p-4 rounded-xl border border-gray-700">
            <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Reasoning</h4>
            <p className="text-sm text-gray-200 leading-relaxed">{reasoning}</p>
          </div>

          <div className="bg-green-900/20 p-4 rounded-xl border border-green-800/30">
            <h4 className="text-xs font-bold text-green-400 uppercase tracking-wider mb-2 flex items-center gap-2">
              <FaCheckCircle /> What was good
            </h4>
            <p className="text-sm text-gray-300 leading-relaxed">{good}</p>
          </div>

          <div className="bg-yellow-900/20 p-4 rounded-xl border border-yellow-800/30">
            <h4 className="text-xs font-bold text-yellow-400 uppercase tracking-wider mb-2 flex items-center gap-2">
              <FaExclamationTriangle /> What to improve
            </h4>
            <p className="text-sm text-gray-300 leading-relaxed">{improve}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
