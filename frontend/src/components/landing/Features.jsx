import FadeIn from './FadeIn';
import { Briefcase, TrendingUp, Zap } from 'lucide-react';

export default function Features() {
  const features = [
    {
      title: 'Dynamic Questions',
      description: 'Our AI analyzes your job role and adjusts its questions dynamically based on your previous answers, just like a real interview.',
      icon: <Briefcase className="w-12 h-12 text-[#B600A8]" />
    },
    {
      title: 'Real-Time Scoring',
      description: 'Get immediate feedback on your answers with real-time scoring metrics that help you track your progress instantly.',
      icon: <TrendingUp className="w-12 h-12 text-[#B600A8]" />
    },
    {
      title: 'Instant Feedback',
      description: 'Receive detailed actionable feedback, identifying both your strengths and areas for improvement right after you speak.',
      icon: <Zap className="w-12 h-12 text-[#B600A8]" />
    }
  ];

  return (
    <section id="features" className="bg-[#0C0C0C] py-20 md:py-32 border-t border-[#D7E2EA]/10">
      <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">
        <FadeIn y={30}>
          <h2 className="text-[clamp(2.5rem,10vw,4rem)] font-black text-center text-gradient-hero mb-16 md:mb-24 leading-tight">
            Why Our Interview Agent?
          </h2>
        </FadeIn>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
          {features.map((feature, index) => (
            <FadeIn key={index} delay={index * 0.15} y={30}>
              <div className="group h-full bg-transparent border border-[#D7E2EA]/20 rounded-2xl p-6 md:p-8 transition-all duration-300 ease-out hover:bg-[#D7E2EA]/5 hover:border-[#D7E2EA]/40 hover:-translate-y-[5px] hover:shadow-[0_20px_40px_rgba(215,226,234,0.1)]">
                <div className="mb-6">{feature.icon}</div>
                <h3 className="text-xl md:text-2xl font-semibold text-[#D7E2EA] mb-4">
                  {feature.title}
                </h3>
                <p className="font-light text-base text-[#D7E2EA]/80 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
