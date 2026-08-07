import { useState, useRef, useEffect } from 'react';
import { FaPaperPlane, FaRobot, FaUser } from 'react-icons/fa';

export default function ChatInterface({ currentQuestion, history, onSubmit, loading, questionCount, maxQuestions }) {
  const [answer, setAnswer] = useState('');
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [history, currentQuestion]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (answer.trim() && !loading) {
      onSubmit(answer.trim());
      setAnswer('');
    }
  };

  return (
    <div className="bg-gray-800 rounded-2xl shadow-xl border border-gray-700 flex flex-col h-[70vh]">
      {/* Header */}
      <div className="px-6 py-4 border-b border-gray-700 bg-gray-800/50 rounded-t-2xl flex justify-between items-center">
        <h3 className="font-bold text-white flex items-center gap-2">
          <FaRobot className="text-blue-400 text-xl" /> Interview in Progress
        </h3>
        <span className="bg-blue-900/50 text-blue-300 text-xs font-bold px-3 py-1 rounded-full border border-blue-700/50">
          Question {Math.min(questionCount, maxQuestions)} of {maxQuestions}
        </span>
      </div>

      {/* Chat History */}
      <div className="flex-1 overflow-y-auto p-6 space-y-6 scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-transparent">
        {history.map((item, index) => (
          <div key={index} className="space-y-6">
            {/* AI Question */}
            <div className="flex gap-4">
              <div className="w-8 h-8 rounded-full bg-blue-900/50 flex items-center justify-center border border-blue-700/50 flex-shrink-0 mt-1">
                <FaRobot className="text-blue-400 text-sm" />
              </div>
              <div className="bg-gray-700/50 text-gray-200 rounded-2xl rounded-tl-sm px-5 py-3 max-w-[85%] border border-gray-600">
                <p className="text-sm leading-relaxed">{item.question}</p>
              </div>
            </div>

            {/* User Answer */}
            <div className="flex gap-4 justify-end">
              <div className="bg-blue-600 text-white rounded-2xl rounded-tr-sm px-5 py-3 max-w-[85%] shadow-md">
                <p className="text-sm leading-relaxed whitespace-pre-wrap">{item.answer}</p>
              </div>
              <div className="w-8 h-8 rounded-full bg-gray-700 flex items-center justify-center border border-gray-600 flex-shrink-0 mt-1">
                <FaUser className="text-gray-400 text-sm" />
              </div>
            </div>
          </div>
        ))}

        {/* Current Question */}
        {currentQuestion && (
          <div className="flex gap-4 animate-fade-in">
            <div className="w-8 h-8 rounded-full bg-blue-900/50 flex items-center justify-center border border-blue-700/50 flex-shrink-0 mt-1 shadow-[0_0_15px_rgba(59,130,246,0.5)]">
              <FaRobot className="text-blue-400 text-sm" />
            </div>
            <div className="bg-gray-700/80 text-white rounded-2xl rounded-tl-sm px-5 py-4 max-w-[85%] border border-blue-500/30 shadow-lg">
              <p className="text-sm leading-relaxed font-medium">{currentQuestion}</p>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="p-4 bg-gray-900/50 border-t border-gray-700 rounded-b-2xl">
        <form onSubmit={handleSubmit} className="flex gap-3">
          <textarea
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
            placeholder="Type your answer here..."
            className="flex-1 bg-gray-800 border border-gray-600 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none min-h-[60px] max-h-[150px]"
            rows={2}
            disabled={loading}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                handleSubmit(e);
              }
            }}
          />
          <button
            type="submit"
            disabled={loading || !answer.trim()}
            className="bg-blue-600 hover:bg-blue-500 text-white p-4 rounded-xl flex items-center justify-center transition-colors disabled:opacity-50 disabled:cursor-not-allowed group"
          >
            {loading ? (
              <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
            ) : (
              <FaPaperPlane className="group-hover:scale-110 transition-transform" />
            )}
          </button>
        </form>
        <p className="text-xs text-gray-500 text-center mt-2">Press Enter to send, Shift + Enter for new line</p>
      </div>
    </div>
  );
}
