import { useNavigate } from 'react-router-dom';
import FadeIn from './FadeIn';
import WarpText from '../WarpText';

export default function CTASection() {
  const navigate = useNavigate();

  return (
    <section className="relative w-full bg-premium-gradient text-center overflow-hidden">
      {/* Dark semi-transparent overlay for text readability */}
      <div className="absolute inset-0 bg-[#0C0C0C]/40 backdrop-blur-sm z-0"></div>
      
      <div className="relative z-10 max-w-4xl mx-auto py-20 md:py-28 px-5">
        <FadeIn y={30}>
          <div className="relative overflow-hidden mb-12 md:mb-16 w-full">
            <WarpText
              text="Ready to Ace Your Interview?"
              color="#ffffff"
              warpStrength={0.1}
              warpScale={1.5}
              speed={0.6}
              pointerInfluence={0.45}
              pointerStrength={0.4}
              refraction={0.022}
              ripple={true}
              fontSize="clamp(2rem, 7vw, 4.5rem)"
              fontWeight={800}
              fontFamily="Kanit, sans-serif"
              letterSpacing="-0.02em"
              lineHeight={0.95}
              style={{
                height: 'auto',
                minHeight: '180px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '1rem',
                textShadow: '0 2px 10px rgba(0, 0, 0, 0.3)'
              }}
            />
          </div>
        </FadeIn>
        
        <FadeIn delay={0.15} y={30}>
          <p className="max-w-2xl mx-auto text-lg md:text-xl font-light text-white/95 mb-12 drop-shadow-md">
            Start practicing now and gain the confidence you need to land your dream job. The AI is ready when you are.
          </p>
        </FadeIn>
        
        <FadeIn delay={0.3} y={30}>
          <button
            onClick={() => navigate('/interview')}
            className="bg-white text-black font-semibold uppercase tracking-widest px-12 py-4 rounded-full transition-all duration-300 ease-out hover:scale-105 hover:shadow-[0_10px_40px_rgba(0,0,0,0.4)] active:scale-95"
          >
            Begin Interview
          </button>
        </FadeIn>
      </div>
    </section>
  );
}
