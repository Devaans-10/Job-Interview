import FadeIn from './FadeIn';
import { Bot, User } from 'lucide-react';

export default function DemoPreview() {
  return (
    <section id="demo" className="bg-[#0C0C0C] py-20 md:py-32 px-5 md:px-10">
      <div className="max-w-5xl mx-auto">
        <FadeIn>
          <h2 className="text-[clamp(2.5rem,10vw,4rem)] text-center font-black tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-[#B600A8] to-[#18011F] mb-12 md:mb-20">
            See It In Action
          </h2>
        </FadeIn>

        <FadeIn y={50} delay={0.2} className="max-w-2xl mx-auto">
          <div className="border border-[#D7E2EA]/30 rounded-2xl p-4 md:p-8 bg-[#0C0C0C] shadow-2xl relative overflow-hidden">
            {/* ambient glow inside mock */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-[#B600A8]/10 blur-[80px] pointer-events-none rounded-full"></div>
            
            <div className="flex justify-between items-center mb-8 border-b border-[#D7E2EA]/10 pb-4">
              <span className="text-[#D7E2EA] font-semibold text-lg flex items-center gap-2">
                <Bot className="text-[#B600A8]" /> Mock Interview
              </span>
              <span className="px-3 py-1 bg-[#D7E2EA]/10 text-[#D7E2EA] rounded-full text-xs font-medium border border-[#D7E2EA]/20">
                Software Engineer
              </span>
            </div>

            <div className="space-y-6">
              {/* AI Message */}
              <div className="flex gap-4">
                <div className="w-8 h-8 rounded-full bg-[#D7E2EA]/10 flex items-center justify-center flex-shrink-0 border border-[#D7E2EA]/20">
                  <Bot size={16} className="text-[#D7E2EA]" />
                </div>
                <div className="bg-transparent border border-[#D7E2EA]/30 rounded-2xl rounded-tl-sm px-5 py-4 max-w-[85%]">
                  <p className="text-[#D7E2EA] text-sm md:text-base font-light">Tell me about your experience with React. What are some of the biggest challenges you've faced with state management?</p>
                </div>
              </div>

              {/* User Message */}
              <div className="flex gap-4 flex-row-reverse">
                <div className="w-8 h-8 rounded-full bg-[#18011F] flex items-center justify-center flex-shrink-0 border border-[#B600A8]/50">
                  <User size={16} className="text-[#B600A8]" />
                </div>
                <div className="flex flex-col items-end gap-2 max-w-[85%]">
                  <div className="bg-[#B600A8] text-white rounded-2xl rounded-tr-sm px-5 py-4">
                    <p className="text-sm md:text-base font-light">I've used React for over 3 years. The biggest challenge is prop drilling in deeply nested components, which is why I usually prefer Context API or Redux for global state...</p>
                  </div>
                  <span className="bg-green-500/20 text-green-400 border border-green-500/30 rounded-full px-4 py-1 text-xs font-bold shadow-[0_0_10px_rgba(34,197,94,0.2)]">
                    Score: 8/10
                  </span>
                </div>
              </div>

              {/* Follow up AI */}
              <div className="flex gap-4">
                <div className="w-8 h-8 rounded-full bg-[#D7E2EA]/10 flex items-center justify-center flex-shrink-0 border border-[#D7E2EA]/20">
                  <Bot size={16} className="text-[#D7E2EA]" />
                </div>
                <div className="bg-transparent border border-[#D7E2EA]/30 rounded-2xl rounded-tl-sm px-5 py-4 max-w-[85%]">
                  <p className="text-[#D7E2EA] text-sm md:text-base font-light">Good answer. When would you choose Redux over the native Context API for a new project?</p>
                </div>
              </div>

            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
