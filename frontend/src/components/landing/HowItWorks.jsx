import FadeIn from './FadeIn';

export default function HowItWorks() {
  const steps = [
    {
      number: '01',
      title: 'Choose Your Role',
      description: 'Enter the job title you are applying for to initiate a customized interview session tailored to that specific position.'
    },
    {
      number: '02',
      title: 'Answer Questions',
      description: 'The AI will present you with industry-standard interview questions. Answer them verbally or by typing.'
    },
    {
      number: '03',
      title: 'Real-Time Scoring',
      description: 'As you answer, our AI evaluates your responses instantly and assigns scores based on relevance and clarity.'
    },
    {
      number: '04',
      title: 'Get Feedback',
      description: 'Receive a comprehensive performance review highlighting your strengths and providing actionable tips to improve.'
    }
  ];

  return (
    <section id="how-it-works" className="bg-[#0C0C0C] py-20 md:py-32 px-5 md:px-10 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <FadeIn y={30}>
          <h2 className="text-[clamp(2.5rem,10vw,4rem)] font-black text-center text-gradient-hero mb-20 md:mb-32 leading-tight">
            How It Works
          </h2>
        </FadeIn>

        {/* Timeline Container */}
        <div className="relative flex flex-col md:flex-row justify-between items-start md:items-center gap-12 md:gap-4">
          
          {/* Connecting Line (Desktop) */}
          <div className="hidden md:block absolute top-[44px] left-[10%] right-[10%] h-[3px] bg-tech-gradient opacity-40 -z-10"></div>
          
          {/* Connecting Line (Mobile) */}
          <div className="md:hidden absolute top-10 bottom-10 left-[34px] w-[2px] bg-tech-gradient opacity-30 -z-10"></div>

          {steps.map((step, index) => (
            <FadeIn 
              key={index} 
              delay={index * 0.15} 
              y={30}
              className="flex-1 w-full max-w-xs group"
            >
              <div className="relative flex md:flex-col items-start md:items-center gap-6 md:gap-4 text-left md:text-center transition-all duration-300">
                {/* Step Number Badge */}
                <div className="flex-shrink-0">
                  <div className="bg-tech-gradient p-3 rounded-lg opacity-80 transition-transform duration-300 group-hover:scale-110">
                    <span className="text-5xl md:text-6xl font-black text-[#B600A8]">
                      {step.number}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="mt-2 md:mt-4">
                  <h3 className="text-lg md:text-xl font-semibold text-[#D7E2EA] mb-2 group-hover:text-white transition-colors">
                    {step.title}
                  </h3>
                  <p className="text-base font-light text-[#D7E2EA]/80 leading-relaxed group-hover:text-[#D7E2EA] transition-colors">
                    {step.description}
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
