import { useNavigate } from 'react-router-dom';
import FadeIn from './FadeIn';
import WarpText from '../WarpText';

export default function Hero() {
  const navigate = useNavigate();

  return (
    <div className="relative min-h-screen bg-[#0C0C0C] flex items-center justify-center overflow-hidden pt-20">
      {/* Dark gradient overlay */}
      <div className="absolute inset-0 bg-tech-gradient opacity-5"></div>
      
      {/* Decorative premium blur element */}
      <div className="absolute top-1/4 right-0 w-[500px] h-[500px] bg-premium-gradient rounded-full blur-3xl opacity-15 -z-10 translate-x-1/2"></div>
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-premium-gradient rounded-full blur-3xl opacity-10 -z-10 -translate-x-1/2 translate-y-1/2"></div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center text-center">
        <FadeIn delay={0.15} y={40} className="w-full">
          <div className="relative overflow-hidden mb-8 md:mb-12 w-full">
            <WarpText
              text="Master Your Interviews"
              color="#D7E2EA"
              warpStrength={0.08}
              warpScale={1.7}
              speed={0.55}
              pointerInfluence={0.42}
              pointerStrength={0.38}
              refraction={0.018}
              ripple={true}
              fontSize="clamp(2.5rem, 8vw, 5.5rem)"
              fontWeight={800}
              fontFamily="Kanit, sans-serif"
              letterSpacing="-0.02em"
              lineHeight={0.95}
              style={{
                height: 'auto',
                minHeight: '200px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '1rem'
              }}
            />
          </div>
        </FadeIn>

        <FadeIn delay={0.3} y={20}>
          <p className="max-w-2xl mx-auto font-light text-[#D7E2EA] text-lg md:text-2xl opacity-90 mb-10 leading-relaxed">
            Practice with an AI interviewer that asks follow-up questions and scores your answers in real-time.
          </p>
        </FadeIn>

        <FadeIn delay={0.45} y={20}>
          <div className="flex flex-wrap justify-center items-center gap-6">
            <button
              onClick={() => navigate('/interview')}
              className="bg-premium-gradient text-white font-medium uppercase tracking-widest px-10 py-4 rounded-full transition-all duration-300 ease-out hover:scale-105 hover:shadow-[0_0_30px_rgba(182,0,168,0.4)] active:scale-95"
            >
              Start Interview Now
            </button>
            
            <button
              onClick={() => {
                const demo = document.getElementById('demo-section');
                if (demo) demo.scrollIntoView({ behavior: 'smooth' });
              }}
              className="border-2 border-[#D7E2EA] bg-transparent text-[#D7E2EA] font-medium uppercase tracking-wider px-10 py-4 rounded-full transition-all duration-300 ease-out hover:bg-[#D7E2EA]/10 hover:shadow-[0_0_20px_rgba(215,226,234,0.2)]"
            >
              Watch Demo
            </button>
          </div>
        </FadeIn>
      </div>
    </div>
  );
}
