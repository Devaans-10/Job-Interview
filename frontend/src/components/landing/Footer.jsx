export default function Footer() {
  return (
    <footer className="bg-[#0C0C0C] border-t border-[#D7E2EA]/20 py-16 md:py-20 px-5 md:px-10">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12 mb-16">
        {/* Brand */}
        <div className="space-y-4">
          <h3 className="text-[#D7E2EA] font-black tracking-tight text-2xl uppercase">AI Interview Agent</h3>
          <p className="text-[#D7E2EA]/60 font-light text-sm max-w-xs">
            Practice job interviews with an AI interviewer that adapts to your answers.
          </p>
        </div>

        {/* Links */}
        <div className="space-y-4">
          <h4 className="text-[#D7E2EA] font-semibold tracking-wider uppercase text-sm mb-6">Quick Links</h4>
          <ul className="space-y-3">
            <li><a href="#features" className="text-[#D7E2EA]/60 hover:text-[#D7E2EA] hover:opacity-70 transition-opacity font-light text-sm">Features</a></li>
            <li><a href="#how-it-works" className="text-[#D7E2EA]/60 hover:text-[#D7E2EA] hover:opacity-70 transition-opacity font-light text-sm">How It Works</a></li>
            <li><a href="#demo" className="text-[#D7E2EA]/60 hover:text-[#D7E2EA] hover:opacity-70 transition-opacity font-light text-sm">Demo</a></li>
            <li><a href="#contact" className="text-[#D7E2EA]/60 hover:text-[#D7E2EA] hover:opacity-70 transition-opacity font-light text-sm">Contact</a></li>
          </ul>
        </div>

        {/* Social Placeholder */}
        <div id="contact" className="space-y-4">
          <h4 className="text-[#D7E2EA] font-semibold tracking-wider uppercase text-sm mb-6">Connect</h4>
          <div className="flex gap-4">
            <a href="#" className="w-10 h-10 rounded-full border border-[#D7E2EA]/20 flex items-center justify-center text-[#D7E2EA]/60 hover:text-[#D7E2EA] hover:bg-[#D7E2EA]/10 transition-colors">
              X
            </a>
            <a href="#" className="w-10 h-10 rounded-full border border-[#D7E2EA]/20 flex items-center justify-center text-[#D7E2EA]/60 hover:text-[#D7E2EA] hover:bg-[#D7E2EA]/10 transition-colors">
              IN
            </a>
            <a href="#" className="w-10 h-10 rounded-full border border-[#D7E2EA]/20 flex items-center justify-center text-[#D7E2EA]/60 hover:text-[#D7E2EA] hover:bg-[#D7E2EA]/10 transition-colors">
              GH
            </a>
          </div>
        </div>
      </div>
      
      <div className="text-center pt-8 border-t border-[#D7E2EA]/10">
        <p className="text-[#D7E2EA] opacity-60 font-light text-xs">
          &copy; {new Date().getFullYear()} AI Interview Agent. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
