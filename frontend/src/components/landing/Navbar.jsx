import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const { user, logout } = useAuth();

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
            {user ? (
              <>
                <button
                  onClick={() => navigate('/interview')}
                  className="text-[#D7E2EA] hover:opacity-70 transition-opacity duration-200 uppercase tracking-wider font-medium text-sm"
                >
                  Dashboard
                </button>
                <button
                  onClick={() => {
                    logout();
                    navigate('/');
                  }}
                  className="text-[#D7E2EA] hover:opacity-70 transition-opacity duration-200 uppercase tracking-wider font-medium text-sm"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <button
                  onClick={() => navigate('/login')}
                  className="text-[#D7E2EA] hover:opacity-70 transition-opacity duration-200 uppercase tracking-wider font-medium text-sm"
                >
                  Login
                </button>
                <button
                  onClick={() => navigate('/signup')}
                  className="px-5 py-2 bg-gradient-to-r from-[#B600A8] to-[#00D4FF] hover:from-[#95008a] hover:to-[#00b3d6] text-white rounded-full font-medium uppercase tracking-wide transition-all duration-300 shadow-[0_0_15px_rgba(182,0,168,0.3)] hover:shadow-[0_0_25px_rgba(182,0,168,0.5)] text-sm"
                >
                  Sign Up
                </button>
              </>
            )}
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
            {user ? (
              <>
                <button
                  onClick={() => {
                    setIsOpen(false);
                    navigate('/interview');
                  }}
                  className="block w-full text-left px-3 py-4 text-[#B600A8] font-bold uppercase tracking-wider text-sm border-b border-[#D7E2EA]/10"
                >
                  Dashboard
                </button>
                <button
                  onClick={() => {
                    setIsOpen(false);
                    logout();
                    navigate('/');
                  }}
                  className="block w-full text-left px-3 py-4 text-[#D7E2EA] font-medium uppercase tracking-wider text-sm"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <button
                  onClick={() => {
                    setIsOpen(false);
                    navigate('/login');
                  }}
                  className="block w-full text-left px-3 py-4 text-[#D7E2EA] font-medium uppercase tracking-wider text-sm border-b border-[#D7E2EA]/10"
                >
                  Login
                </button>
                <button
                  onClick={() => {
                    setIsOpen(false);
                    navigate('/signup');
                  }}
                  className="block w-full text-left px-3 py-4 text-[#B600A8] font-bold uppercase tracking-wider text-sm"
                >
                  Sign Up
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
