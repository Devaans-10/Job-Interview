import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { Loader2, AlertCircle } from 'lucide-react';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const { login, isLoading, error, clearError } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await login(email, password, rememberMe);
    if (result.success) {
      navigate('/interview');
    }
  };

  return (
    <div className="min-h-screen bg-[#0C0C0C] flex flex-col items-center justify-center p-5 selection:bg-[#B600A8]/50 selection:text-white">
      {/* Brand */}
      <div 
        className="cursor-pointer mb-8 text-center"
        onClick={() => navigate('/')}
      >
        <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-[#D7E2EA] uppercase">
          AI Interview Agent
        </h1>
      </div>

      {/* Form Card */}
      <div className="w-full max-w-sm bg-[#0C0C0C] border border-[#D7E2EA]/30 rounded-2xl p-8 shadow-2xl">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-black bg-clip-text text-transparent bg-gradient-to-r from-[#B600A8] to-[#00D4FF]">
            Welcome Back
          </h2>
          <p className="text-[#D7E2EA]/60 mt-2 text-sm">Login to continue your interview prep</p>
        </div>

        {error && (
          <div className="mb-6 bg-red-500/10 border border-red-500/50 rounded-xl p-3 flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
            <p className="text-red-500 text-sm">{error}</p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-1">
            <label className="font-light uppercase text-xs tracking-wider text-[#D7E2EA]">
              Email Address
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => { setEmail(e.target.value); clearError(); }}
              required
              className="w-full bg-transparent border-b border-[#D7E2EA]/30 text-[#D7E2EA] px-0 py-3 focus:outline-none focus:border-b-2 focus:border-[#B600A8] transition-colors placeholder-[#D7E2EA]/30"
              placeholder="you@example.com"
            />
          </div>

          <div className="space-y-1">
            <div className="flex justify-between items-center">
              <label className="font-light uppercase text-xs tracking-wider text-[#D7E2EA]">
                Password
              </label>
              <Link to="#" className="text-xs text-[#B600A8] hover:text-[#00D4FF] transition-colors">
                Forgot password?
              </Link>
            </div>
            <input
              type="password"
              value={password}
              onChange={(e) => { setPassword(e.target.value); clearError(); }}
              required
              className="w-full bg-transparent border-b border-[#D7E2EA]/30 text-[#D7E2EA] px-0 py-3 focus:outline-none focus:border-b-2 focus:border-[#B600A8] transition-colors placeholder-[#D7E2EA]/30"
              placeholder="••••••••"
            />
          </div>

          <div className="flex items-center gap-2 pt-2">
            <input
              type="checkbox"
              id="remember"
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
              className="w-4 h-4 rounded border-gray-600 bg-gray-900 text-[#B600A8] focus:ring-[#B600A8] focus:ring-offset-gray-900 cursor-pointer"
            />
            <label htmlFor="remember" className="text-sm text-[#D7E2EA]/70 cursor-pointer">
              Remember me for 30 days
            </label>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full mt-4 py-3 bg-gradient-to-r from-[#B600A8] to-[#00D4FF] hover:from-[#95008a] hover:to-[#00b3d6] text-white rounded-full font-medium uppercase tracking-wide transition-all duration-300 shadow-lg disabled:opacity-70 flex justify-center items-center h-12"
          >
            {isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : 'Log In'}
          </button>
        </form>

        <p className="mt-8 text-center text-sm text-[#D7E2EA]/60">
          Don't have an account?{' '}
          <Link to="/signup" className="text-[#00D4FF] hover:text-[#B600A8] transition-colors font-medium">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
}
