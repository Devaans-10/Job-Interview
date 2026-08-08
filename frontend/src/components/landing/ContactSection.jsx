import { Mail, Code, Briefcase } from 'lucide-react';
import FadeIn from './FadeIn';

export default function ContactSection() {
  const contactMethods = [
    {
      title: 'Email',
      content: 'pdevaans@gmail.com',
      link: 'mailto:pdevaans@gmail.com',
      icon: <Mail className="w-8 h-8 text-[#B600A8] group-hover:text-[#D7E2EA] transition-colors duration-300" />,
      target: '_self'
    },
    {
      title: 'GitHub',
      content: 'View Project',
      link: 'https://github.com/Devaans-10/Job-Interview',
      icon: <Code className="w-8 h-8 text-[#B600A8] group-hover:text-[#D7E2EA] transition-colors duration-300" />,
      target: '_blank',
      rel: 'noopener noreferrer'
    },
    {
      title: 'LinkedIn',
      content: 'Connect with me',
      link: 'https://www.linkedin.com/in/devaans-patwari-b22617383/?skipRedirect=true',
      icon: <Briefcase className="w-8 h-8 text-[#B600A8] group-hover:text-[#D7E2EA] transition-colors duration-300" />,
      target: '_blank',
      rel: 'noopener noreferrer'
    }
  ];

  return (
    <section id="contact" className="bg-[#0C0C0C] border-t border-[#D7E2EA]/10 py-20 md:py-28 px-5 md:px-10">
      <div className="max-w-4xl mx-auto text-center">
        <FadeIn y={40}>
          <h2 className="text-[clamp(2.5rem,10vw,3.5rem)] font-black uppercase tracking-tight text-gradient-hero mb-6">
            Get in Touch
          </h2>
        </FadeIn>
        
        <FadeIn delay={0.15} y={20}>
          <p className="max-w-2xl mx-auto text-lg md:text-xl font-light text-[#D7E2EA] opacity-90 mb-12">
            Questions? Feedback? Let's connect!
          </p>
        </FadeIn>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10">
          {contactMethods.map((method, index) => (
            <FadeIn key={method.title} delay={index * 0.1} y={30}>
              <a
                href={method.link}
                target={method.target}
                rel={method.rel}
                className="group flex flex-col items-center justify-center bg-transparent border border-[#D7E2EA]/20 rounded-2xl p-6 transition-all duration-300 ease-out hover:-translate-y-[5px] hover:bg-[#D7E2EA]/5 hover:border-[#D7E2EA]/50"
                title={`Visit my ${method.title}`}
              >
                <div className="mb-4">
                  {method.icon}
                </div>
                <h3 className="font-semibold text-lg text-[#D7E2EA] mb-2">{method.title}</h3>
                <span className="text-[#D7E2EA] group-hover:text-[#B600A8] group-hover:underline transition-colors duration-300 font-light text-base text-center break-all">
                  {method.content}
                </span>
              </a>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
