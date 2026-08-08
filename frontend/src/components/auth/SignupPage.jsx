import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { Loader2, AlertCircle, CheckCircle2 } from 'lucide-react';

export default function SignupPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [agreed, setAgreed] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState(0); // 0 to 4
  const [formError, setFormError] = useState('');
  
  const { signup, isLoading, error: authError } = useAuth();
  const navigate = useNavigate();

  // Calculate password strength
  useEffect(() => {
    let strength = 0;
    if (password.length >= 8) strength += 1;
    if (/[A-Z]/.test(password)) strength += 1;
    if (/[0-9]/.test(password)) strength += 1;
    if (/[^A-Za-z0-9]/.test(password)) strength += 1;
    
    // Cap at 4
    setPasswordStrength(Math.min(4, strength));
  }, [password]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormError('');

    if (password !== confirmPassword) {
      setFormError('Passwords do not match');
      return;
    }

    if (!agreed) {
      setFormError('You must agree to the Terms and Conditions');
      return;
    }

    if (passwordStrength < 3) {
      setFormError('Password must be 8+ chars with uppercase and number');
      return;
    }

    const result = await signup(name, email, password);
    if (result.success) {
      navigate('/interview');
    }
  };

  const displayError = formError || authError;

  return (
    <div className="min-h-screen bg-[#0C0C0C] flex flex-col items-center justify-center p-5 selection:bg-[#B600A8]/50 selection:text-white">
      {/* Brand */}
      <div 
        className="cursor-pointer mb-6 text-center"
        onClick={() => navigate('/')}
      >
        <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-[#D7E2EA] uppercase">
          AI Interview Agent
        </h1>
      </div>

      {/* Form Card */}
      <div className="w-full max-w-sm bg-[#0C0C0C] border border-[#D7E2EA]/30 rounded-2xl p-8 shadow-2xl">
        <div className="text-center mb-6">
          <h2 className="text-3xl font-black bg-clip-text text-transparent bg-gradient-to-r from-[#B600A8] to-[#00D4FF]">
            Create Account
          </h2>
          <p className="text-[#D7E2EA]/60 mt-2 text-sm">Join to track your interview progress</p>
        </div>

        {displayError && (
          <div className="mb-6 bg-red-500/10 border border-red-500/50 rounded-xl p-3 flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
            <p className="text-red-500 text-sm">{displayError}</p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="space-y-1">
            <label className="font-light uppercase text-xs tracking-wider text-[#D7E2EA]">
              Full Name
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="w-full bg-transparent border-b border-[#D7E2EA]/30 text-[#D7E2EA] px-0 py-2 focus:outline-none focus:border-b-2 focus:border-[#B600A8] transition-colors placeholder-[#D7E2EA]/30"
              placeholder="John Doe"
            />
          </div>

          <div className="space-y-1">
            <label className="font-light uppercase text-xs tracking-wider text-[#D7E2EA]">
              Email Address
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full bg-transparent border-b border-[#D7E2EA]/30 text-[#D7E2EA] px-0 py-2 focus:outline-none focus:border-b-2 focus:border-[#B600A8] transition-colors placeholder-[#D7E2EA]/30"
              placeholder="you@example.com"
            />
          </div>

          <div className="space-y-1">
            <label className="font-light uppercase text-xs tracking-wider text-[#D7E2EA]">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full bg-transparent border-b border-[#D7E2EA]/30 text-[#D7E2EA] px-0 py-2 focus:outline-none focus:border-b-2 focus:border-[#B600A8] transition-colors placeholder-[#D7E2EA]/30"
              placeholder="••••••••"
            />
            {/* Strength indicator */}
            {password && (
              <div className="mt-2 flex gap-1 h-1">
                {[1, 2, 3, 4].map(level => (
                  <div 
                    key={level} 
                    className={`flex-1 rounded-full ${
                      passwordStrength >= level 
                        ? passwordStrength < 3 ? 'bg-orange-500' : 'bg-green-500'
                        : 'bg-gray-700'
                    }`}
                  />
                ))}
              </div>
            )}
          </div>

          <div className="space-y-1">
            <label className="font-light uppercase text-xs tracking-wider text-[#D7E2EA]">
              Confirm Password
            </label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              className="w-full bg-transparent border-b border-[#D7E2EA]/30 text-[#D7E2EA] px-0 py-2 focus:outline-none focus:border-b-2 focus:border-[#B600A8] transition-colors placeholder-[#D7E2EA]/30"
              placeholder="••••••••"
            />
            {confirmPassword && password === confirmPassword && (
              <div className="flex items-center gap-1 mt-1 text-green-500 text-xs">
                <CheckCircle2 className="w-3 h-3" /> Passwords match
              </div>
            )}
          </div>

          <div className="flex items-start gap-2 pt-2">
            <input
              type="checkbox"
              id="terms"
              checked={agreed}
              onChange={(e) => setAgreed(e.target.checked)}
              className="mt-1 w-4 h-4 rounded border-gray-600 bg-gray-900 text-[#B600A8] focus:ring-[#B600A8] focus:ring-offset-gray-900 cursor-pointer"
            />
            <label htmlFor="terms" className="text-xs text-[#D7E2EA]/70 cursor-pointer leading-tight">
              I agree to the Terms and Conditions and Privacy Policy
            </label>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full mt-4 py-3 bg-gradient-to-r from-[#B600A8] to-[#00D4FF] hover:from-[#95008a] hover:to-[#00b3d6] text-white rounded-full font-medium uppercase tracking-wide transition-all duration-300 shadow-lg disabled:opacity-70 flex justify-center items-center h-12"
          >
            {isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : 'Create Account'}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-[#D7E2EA]/60">
          Already have an account?{' '}
          <Link to="/login" className="text-[#00D4FF] hover:text-[#B600A8] transition-colors font-medium">
            Log in
          </Link>
        </p>
      </div>
    </div>
  );
}
