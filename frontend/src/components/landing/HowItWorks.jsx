import FadeIn from './FadeIn';

export default function HowItWorks() {
  const steps = [
    {
      num: "01",
      title: "Choose Your Role",
      description: "Select the job title you're interviewing for and we'll tailor questions to that position"
    },
    {
      num: "02",
      title: "Answer Questions",
      description: "Our AI interviewer asks you relevant questions and follows up based on your responses"
    },
    {
      num: "03",
      title: "Get Scored",
      description: "Each answer is evaluated on multiple criteria with detailed reasoning provided"
    },
    {
      num: "04",
      title: "Review & Improve",
      description: "Read comprehensive feedback and identify areas to strengthen before your real interview"
    }
  ];

  return (
    <section id="how-it-works" className="bg-[#0C0C0C] py-20 md:py-32 px-5 md:px-10">
      <div className="max-w-7xl mx-auto">
        <FadeIn>
          <h2 className="text-[clamp(2.5rem,10vw,4rem)] text-center font-black tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-[#646973] to-[#D7E2EA] mb-16 md:mb-24">
            How It Works
          </h2>
        </FadeIn>

        <div className="relative">
          {/* Desktop connecting line */}
          <div className="hidden md:block absolute top-12 left-[10%] right-[10%] h-0.5 bg-[#D7E2EA]/30 -z-10"></div>

          <div className="flex flex-col md:flex-row justify-between gap-12 md:gap-6 relative z-10">
            {steps.map((step, index) => (
              <FadeIn key={index} delay={index * 0.1} y={30} className="flex-1 flex flex-col max-w-xs mx-auto md:mx-0">
                <div className="bg-[#0C0C0C] pb-4">
                  <span className="text-6xl font-black text-[#B600A8] opacity-80">{step.num}</span>
                </div>
                <h3 className="text-2xl font-semibold text-[#D7E2EA] mt-2 mb-3">
                  {step.title}
                </h3>
                <p className="font-light text-[#D7E2EA]/80 leading-relaxed text-base">
                  {step.description}
                </p>
              </FadeIn>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
