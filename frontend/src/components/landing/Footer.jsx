import { Code, Briefcase, Mail } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-[#0C0C0C] border-t border-[#D7E2EA]/10 py-16 md:py-20 px-5 md:px-10">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-16">
        
        {/* Column 1: Brand Info */}
        <div className="flex flex-col gap-4">
          <span className="text-xl font-bold tracking-tight uppercase text-white">AI Interview Agent</span>
          <p className="text-[#D7E2EA]/70 text-sm leading-relaxed max-w-sm">
            Master your interviews with AI. Practice anytime, anywhere, and get real-time actionable feedback.
          </p>
        </div>

        {/* Column 2: Quick Links */}
        <div className="flex flex-col gap-4">
          <h4 className="font-semibold text-[#D7E2EA] uppercase tracking-wider text-sm md:text-base mb-4">
            Quick Links
          </h4>
          <a href="#features" className="font-light text-base text-[#D7E2EA] opacity-80 hover:opacity-100 hover:text-[#B600A8] transition-all duration-200 mb-2 w-fit">
            Features
          </a>
          <a href="#how-it-works" className="font-light text-base text-[#D7E2EA] opacity-80 hover:opacity-100 hover:text-[#B600A8] transition-all duration-200 mb-2 w-fit">
            How It Works
          </a>
          <a href="#contact" className="font-light text-base text-[#D7E2EA] opacity-80 hover:opacity-100 hover:text-[#B600A8] transition-all duration-200 mb-2 w-fit">
            Contact
          </a>
          <a href="/interview" className="font-light text-base text-[#D7E2EA] opacity-80 hover:opacity-100 hover:text-[#B600A8] transition-all duration-200 mb-2 w-fit">
            Dashboard
          </a>
        </div>

        {/* Column 3: Connect (Social Links) */}
        <div className="flex flex-col gap-4">
          <h4 className="font-semibold text-[#D7E2EA] uppercase tracking-wider text-sm md:text-base mb-4">
            Connect
          </h4>
          <a 
            href="https://github.com/Devaans-10/Job-Interview" 
            target="_blank" 
            rel="noopener noreferrer"
            className="group flex gap-2 items-center font-light text-base text-[#D7E2EA] opacity-100 hover:opacity-70 transition-all duration-300 ease-out mb-2 w-fit"
            title="View on GitHub"
          >
            <Code className="w-5 h-5 text-[#B600A8] group-hover:text-[#D7E2EA] transition-colors duration-300 stroke-2" />
            <span>GitHub</span>
          </a>
          <a 
            href="https://www.linkedin.com/in/devaans-patwari-b22617383/?skipRedirect=true" 
            target="_blank" 
            rel="noopener noreferrer"
            className="group flex gap-2 items-center font-light text-base text-[#D7E2EA] opacity-100 hover:opacity-70 transition-all duration-300 ease-out mb-2 w-fit"
            title="Connect on LinkedIn"
          >
            <Briefcase className="w-5 h-5 text-[#B600A8] group-hover:text-[#D7E2EA] transition-colors duration-300 stroke-2" />
            <span>LinkedIn</span>
          </a>
          <a 
            href="mailto:pdevaans@gmail.com" 
            target="_self"
            className="group flex gap-2 items-center font-light text-base text-[#D7E2EA] opacity-100 hover:opacity-70 transition-all duration-300 ease-out mb-2 w-fit"
            title="Send Email"
          >
            <Mail className="w-5 h-5 text-[#B600A8] group-hover:text-[#D7E2EA] transition-colors duration-300 stroke-2" />
            <span>Email</span>
          </a>
        </div>
      </div>

      <div className="max-w-7xl mx-auto mt-8 pt-8 border-t border-[#D7E2EA]/10 text-center">
        <p className="font-light text-sm text-[#D7E2EA]/60">
          &copy; {new Date().getFullYear()} AI Interview Agent. All rights reserved. Built by Devaans Patwari
        </p>
      </div>
    </footer>
  );
}
