import { useNavigate } from 'react-router-dom';
import FadeIn from './FadeIn';

export default function Hero() {
  const navigate = useNavigate();

  return (
    <section className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden bg-[#0C0C0C]">
      {/* Background ambient glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[50vh] bg-gradient-to-br from-[#18011F] to-[#B600A8] blur-[120px] opacity-20 pointer-events-none rounded-full"></div>

      <div className="container mx-auto px-4 z-10 text-center flex flex-col items-center gap-8 md:gap-12">
        
        <FadeIn delay={0.15}>
          <h1 className="text-[3rem] sm:text-[4rem] md:text-[5rem] lg:text-[6rem] font-black uppercase tracking-tight leading-none bg-clip-text text-transparent bg-gradient-to-b from-[#646973] to-[#BBCCD7]">
            Master Your Interviews
          </h1>
        </FadeIn>

        <FadeIn delay={0.3}>
          <p className="font-light text-[#D7E2EA] text-lg md:text-2xl max-w-2xl mx-auto leading-relaxed">
            Practice with an AI interviewer that asks follow-up questions and scores your answers in real-time
          </p>
        </FadeIn>

        <FadeIn delay={0.45} className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6 w-full sm:w-auto mt-4">
          <button
            onClick={() => navigate('/interview')}
            className="w-full sm:w-auto px-10 py-4 rounded-full font-medium uppercase tracking-wider text-white bg-gradient-to-r from-[#18011F] to-[#B600A8] hover:scale-105 transition-transform duration-200 shadow-[0_0_30px_rgba(182,0,168,0.4)]"
          >
            Start Interview Now
          </button>
          <a
            href="#demo"
            className="w-full sm:w-auto px-10 py-4 rounded-full font-medium uppercase tracking-wider text-[#D7E2EA] border-2 border-[#D7E2EA] hover:scale-105 transition-transform duration-200 hover:bg-[#D7E2EA]/5"
          >
            Watch Demo
          </a>
        </FadeIn>

      </div>
    </section>
  );
}
