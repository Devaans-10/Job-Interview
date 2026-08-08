import FadeIn from './FadeIn';
import { User, Bot } from 'lucide-react';

export default function DemoPreview() {
  return (
    <section id="demo-section" className="bg-[#0C0C0C] py-20 md:py-32 px-5 md:px-10 border-t border-[#D7E2EA]/10">
      <div className="max-w-7xl mx-auto">
        <FadeIn y={30}>
          <h2 className="text-[clamp(2.5rem,10vw,4rem)] font-black text-center text-gradient-hero mb-16 md:mb-24 leading-tight">
            See It In Action
          </h2>
        </FadeIn>

        <FadeIn delay={0.2} y={40} className="w-full flex justify-center">
          <div className="w-full max-w-2xl bg-[#0C0C0C] border-2 border-[#D7E2EA]/30 rounded-2xl p-6 md:p-8 transition-all duration-300 hover:border-[#D7E2EA]/60 hover:shadow-[0_0_30px_rgba(215,226,234,0.15)] relative overflow-hidden">
            
            {/* Decorative background glow */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-premium-gradient opacity-10 blur-3xl -z-10 rounded-full"></div>

            {/* AI Message */}
            <div className="flex gap-4 mb-6">
              <div className="flex-shrink-0 w-10 h-10 rounded-full bg-tech-gradient border border-[#D7E2EA]/20 flex items-center justify-center mt-1">
                <Bot className="w-5 h-5 text-[#B600A8]" />
              </div>
              <div className="flex flex-col gap-2">
                <span className="text-xs text-[#D7E2EA]/60 uppercase tracking-widest font-semibold ml-1">AI Interviewer</span>
                <div className="bg-transparent border border-[#D7E2EA]/40 text-[#D7E2EA] p-4 rounded-2xl rounded-tl-sm text-sm md:text-base font-light leading-relaxed">
                  Could you tell me about a time when you had to optimize the performance of a React application? What specific techniques did you use?
                </div>
              </div>
            </div>

            {/* User Message */}
            <div className="flex gap-4 mb-6 flex-row-reverse">
              <div className="flex-shrink-0 w-10 h-10 rounded-full bg-[#B600A8] border border-[#D7E2EA]/20 flex items-center justify-center mt-1">
                <User className="w-5 h-5 text-white" />
              </div>
              <div className="flex flex-col gap-2 items-end">
                <span className="text-xs text-[#D7E2EA]/60 uppercase tracking-widest font-semibold mr-1">You</span>
                <div className="bg-[#B600A8] text-white p-4 rounded-2xl rounded-tr-sm text-sm md:text-base font-light leading-relaxed shadow-lg">
                  In my last project, the dashboard was rendering too slowly. I used React.memo for static components, implemented useMemo for heavy calculations, and utilized virtualization for long lists. This reduced load times by 40%.
                </div>
              </div>
            </div>

            {/* AI Scoring Response */}
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-10 h-10 rounded-full bg-tech-gradient border border-[#D7E2EA]/20 flex items-center justify-center mt-1">
                <Bot className="w-5 h-5 text-[#B600A8]" />
              </div>
              <div className="flex flex-col gap-2 w-full">
                <span className="text-xs text-[#D7E2EA]/60 uppercase tracking-widest font-semibold ml-1">AI Score</span>
                <div className="bg-[#1c1a27]/50 border border-[#22C55E]/30 p-4 rounded-2xl rounded-tl-sm w-full backdrop-blur-sm">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs text-[#D7E2EA]/80 font-medium uppercase tracking-wider">Response Evaluation</span>
                    <div className="bg-[#22C55E]/20 text-[#22C55E] px-3 py-1 rounded-full font-bold text-sm border border-[#22C55E]/30 shadow-[0_0_10px_rgba(34,197,94,0.2)]">
                      Score: 9/10
                    </div>
                  </div>
                  <p className="text-sm md:text-base text-[#D7E2EA]/90 font-light leading-relaxed">
                    Excellent response. You clearly outlined the problem and provided specific, industry-standard React techniques (memoization, virtualization) to solve it. Quantifying the result with "40%" makes your impact measurable.
                  </p>
                </div>
              </div>
            </div>

          </div>
        </FadeIn>
      </div>
    </section>
  );
}
