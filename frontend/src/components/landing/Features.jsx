import { Briefcase, TrendingUp, Zap } from 'lucide-react';
import FadeIn from './FadeIn';

export default function Features() {
  const features = [
    {
      icon: <Briefcase className="w-12 h-12 text-[#B600A8]" />,
      title: "Dynamic Questions",
      description: "AI generates contextual follow-up questions based on your answers, mimicking real interview scenarios"
    },
    {
      icon: <TrendingUp className="w-12 h-12 text-[#B600A8]" />,
      title: "Real-Time Scoring",
      description: "Get scored on relevance, clarity, confidence, and technical depth. See your progress instantly"
    },
    {
      icon: <Zap className="w-12 h-12 text-[#B600A8]" />,
      title: "Instant Feedback",
      description: "Receive personalized feedback on strengths and areas for improvement after each interview"
    }
  ];

  return (
    <section id="features" className="bg-[#0C0C0C] border-t border-[#D7E2EA]/20 py-20 md:py-32 px-5 md:px-10">
      <div className="max-w-7xl mx-auto">
        <FadeIn>
          <h2 className="text-[clamp(2.5rem,10vw,4rem)] text-center font-black tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-[#D7E2EA] to-[#646973] mb-16 md:mb-24">
            Why Our Interview Agent?
          </h2>
        </FadeIn>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
          {features.map((feature, index) => (
            <FadeIn key={index} delay={index * 0.15}>
              <div className="border border-[#D7E2EA]/30 rounded-2xl p-6 md:p-8 bg-transparent hover:bg-[#D7E2EA]/5 transition-colors duration-300 h-full flex flex-col items-start gap-6">
                <div className="p-3 bg-[#18011F]/50 rounded-xl border border-[#B600A8]/30">
                  {feature.icon}
                </div>
                <div>
                  <h3 className="font-semibold text-xl md:text-2xl text-[#D7E2EA] mb-3">
                    {feature.title}
                  </h3>
                  <p className="font-light text-base text-[#D7E2EA]/80 leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
