import FadeIn from './FadeIn';
import { useNavigate } from 'react-router-dom';

export default function CTASection() {
  const navigate = useNavigate();

  return (
    <section className="bg-gradient-to-r from-[#18011F] to-[#B600A8] py-20 md:py-28 px-5 relative overflow-hidden">
      {/* Decorative patterns */}
      <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '40px 40px' }}></div>
      
      <div className="max-w-4xl mx-auto text-center relative z-10">
        <FadeIn y={30}>
          <h2 className="text-[clamp(2rem,8vw,3.5rem)] font-black tracking-tight text-white mb-6 leading-tight">
            Ready to Ace Your Interview?
          </h2>
          <p className="text-white/80 font-light text-lg md:text-2xl mb-12 max-w-2xl mx-auto">
            Start practicing now and gain confidence for your real interview.
          </p>
          <button 
            onClick={() => navigate('/interview')}
            className="bg-white text-black px-12 py-4 rounded-full font-semibold uppercase tracking-wider text-sm md:text-base hover:scale-105 transition-transform duration-200 shadow-xl"
          >
            Begin Interview
          </button>
        </FadeIn>
      </div>
    </section>
  );
}
