import { useState, useEffect } from 'react';
import axios from 'axios';
import { Zap, Code, MessageCircle, TrendingUp, Loader2 } from 'lucide-react';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

const categoryConfig = {
  confidence: {
    icon: Zap,
    color: '#FFB800',
    bg: 'bg-[#FFB800]/10',
    text: 'text-[#FFB800]'
  },
  technical: {
    icon: Code,
    color: '#00D4FF',
    bg: 'bg-[#00D4FF]/10',
    text: 'text-[#00D4FF]'
  },
  clarity: {
    icon: MessageCircle,
    color: '#00FF88',
    bg: 'bg-[#00FF88]/10',
    text: 'text-[#00FF88]'
  },
  depth: {
    icon: TrendingUp,
    color: '#FF6B6B',
    bg: 'bg-[#FF6B6B]/10',
    text: 'text-[#FF6B6B]'
  }
};

const defaultCategory = {
  icon: Zap,
  color: '#B600A8',
  bg: 'bg-[#B600A8]/10',
  text: 'text-[#B600A8]'
};

export default function InterviewTips({ history, jobTitle }) {
  const [tips, setTips] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTips = async () => {
      try {
        const response = await axios.post(`${API_URL}/api/interview/tips`, {
          history,
          jobTitle
        });
        setTips(response.data.tips || []);
      } catch (err) {
        console.error('Error fetching tips:', err);
        setError('Failed to load personalized tips.');
        // Tips endpoint provides fallback tips on error, but if even that fails:
        if (err.response && err.response.data && err.response.data.tips) {
            setTips(err.response.data.tips);
            setError(null);
        }
      } finally {
        setLoading(false);
      }
    };

    if (history && history.length > 0 && jobTitle) {
      fetchTips();
    }
  }, [history, jobTitle]);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-16 space-y-4">
        <Loader2 className="w-10 h-10 animate-spin text-[#B600A8]" />
        <p className="text-[#D7E2EA]/80">Generating personalized AI tips...</p>
      </div>
    );
  }

  if (error && tips.length === 0) {
    return null;
  }

  return (
    <div className="bg-[#0C0C0C] py-12 md:py-16 max-w-5xl mx-auto w-full animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
      <div className="text-center mb-10">
        <h2 className="text-3xl md:text-4xl font-black bg-clip-text text-transparent bg-gradient-to-r from-[#B600A8] to-[#00D4FF] mb-4">
          Interview Tips Based on Your Performance
        </h2>
        <p className="text-[#D7E2EA]/70 text-lg max-w-2xl mx-auto">
          We analyzed your answers to provide actionable advice for your real interview.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 px-4">
        {tips.map((tip, idx) => {
          const config = categoryConfig[tip.category] || defaultCategory;
          const IconComponent = config.icon;

          return (
            <div 
              key={idx} 
              className="border border-[#D7E2EA]/30 rounded-2xl p-6 hover:bg-[#D7E2EA]/5 transition duration-300 group flex flex-col h-full"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="p-3 rounded-xl bg-gray-900 border border-gray-800 shadow-inner group-hover:scale-110 transition-transform duration-300">
                  <IconComponent className="w-8 h-8" style={{ color: '#B600A8' }} />
                </div>
                <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${config.bg} ${config.text}`}>
                  {tip.category}
                </span>
              </div>
              
              <h3 className="font-semibold text-lg text-[#D7E2EA] mb-2">{tip.title}</h3>
              
              <p className="font-light text-base text-[#D7E2EA]/80 mb-4 flex-grow">
                {tip.description}
              </p>
              
              {tip.example && (
                <div className="mt-auto bg-black/40 rounded-xl p-4 border border-white/5">
                  <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1">Example</p>
                  <p className="text-sm italic text-[#D7E2EA]/90">"{tip.example}"</p>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
