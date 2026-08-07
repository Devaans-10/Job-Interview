import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const navLinks = [
    { name: 'Features', href: '#features' },
    { name: 'How It Works', href: '#how-it-works' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <nav className="fixed w-full z-50 top-0 left-0 bg-[#0C0C0C]/80 backdrop-blur-md border-b border-[#D7E2EA]/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <div className="flex-shrink-0 flex items-center cursor-pointer" onClick={() => window.scrollTo(0, 0)}>
            <span className="text-[#D7E2EA] text-xl font-bold tracking-tight">AI INTERVIEW AGENT</span>
          </div>
          
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-[#D7E2EA] hover:opacity-70 transition-opacity duration-200 uppercase tracking-wider font-medium text-sm"
              >
                {link.name}
              </a>
            ))}
            <button
              onClick={() => navigate('/interview')}
              className="text-[#D7E2EA] hover:opacity-70 transition-opacity duration-200 uppercase tracking-wider font-medium text-sm"
            >
              Try Now
            </button>
          </div>

          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-[#D7E2EA] hover:opacity-70 focus:outline-none"
            >
              {isOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="md:hidden bg-[#0C0C0C] border-b border-[#D7E2EA]/10">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="block px-3 py-4 text-[#D7E2EA] font-medium uppercase tracking-wider text-sm border-b border-[#D7E2EA]/10"
                onClick={() => setIsOpen(false)}
              >
                {link.name}
              </a>
            ))}
            <button
              onClick={() => {
                setIsOpen(false);
                navigate('/interview');
              }}
              className="block w-full text-left px-3 py-4 text-[#B600A8] font-bold uppercase tracking-wider text-sm"
            >
              Try Now
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}
