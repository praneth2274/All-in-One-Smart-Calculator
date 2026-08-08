import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { registerUser } from '../services/authService';
import {
  Calculator,
  Lock,
  Mail,
  User as UserIcon,
  ArrowRight,
  Eye,
  EyeOff,
  Sparkles,
  CheckCircle2,
  AlertCircle,
  ShieldCheck,
  Zap
} from 'lucide-react';

export const RegisterPage: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [agreeTerms, setAgreeTerms] = useState(true);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const { login } = useAuth();
  const navigate = useNavigate();

  // Password strength calculation
  const getPasswordStrength = (pass: string) => {
    if (!pass) return { score: 0, label: '', color: 'bg-gray-200 dark:bg-gray-800' };
    let score = 0;
    if (pass.length >= 6) score += 1;
    if (pass.length >= 10) score += 1;
    if (/[0-9]/.test(pass)) score += 1;
    if (/[^A-Za-z0-9]/.test(pass)) score += 1;

    if (score <= 1) return { score, label: 'Weak', color: 'bg-red-500' };
    if (score === 2 || score === 3) return { score, label: 'Medium', color: 'bg-amber-500' };
    return { score, label: 'Strong', color: 'bg-emerald-500' };
  };

  const strength = getPasswordStrength(password);

  const fillSampleData = () => {
    const randomId = Math.floor(Math.random() * 900) + 100;
    setName('Praneth Kumar');
    setEmail(`student${randomId}@calchub.com`);
    setPassword('Password@123');
    setConfirmPassword('Password@123');
    setError('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (password !== confirmPassword) {
      setError('Passwords do not match. Please verify your confirm password input.');
      return;
    }

    if (!agreeTerms) {
      setError('Please agree to the Terms of Service & Privacy Policy to register.');
      return;
    }

    setLoading(true);
    try {
      const user = await registerUser(name, email, password);
      login(user);
      navigate('/dashboard');
    } catch (err: any) {
      setError(err.response?.data?.message || 'Registration failed. Email might already be registered.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-[85vh] flex items-center justify-center py-8 px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Background Ambient Glow Orbs */}
      <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-brand-500/15 rounded-full blur-3xl pointer-events-none animate-pulse-glow" />
      <div className="absolute bottom-10 left-10 w-80 h-80 bg-indigo-500/15 rounded-full blur-3xl pointer-events-none" />

      {/* Main Glassmorphic Container */}
      <div className="relative w-full max-w-4xl grid grid-cols-1 lg:grid-cols-12 gap-0 bg-white/80 dark:bg-[#111827]/80 backdrop-blur-2xl border border-gray-200/80 dark:border-gray-800/80 rounded-3xl shadow-2xl overflow-hidden">
        
        {/* Left Decorative Showcase Panel (Desktop) */}
        <div className="hidden lg:flex lg:col-span-5 flex-col justify-between p-8 bg-gradient-to-br from-indigo-600 via-purple-600 to-brand-700 text-white relative overflow-hidden">
          <div className="absolute -top-12 -left-12 w-48 h-48 bg-white/10 rounded-full blur-2xl pointer-events-none" />
          <div className="absolute -bottom-16 -right-16 w-56 h-56 bg-indigo-400/20 rounded-full blur-2xl pointer-events-none" />

          {/* Floating Math Symbols Watermark */}
          <div className="absolute inset-0 pointer-events-none opacity-10 flex flex-col justify-between p-6 font-mono text-3xl font-bold select-none">
            <div className="flex justify-between"><span>cos(θ)</span><span>Δx → 0</span></div>
            <div className="flex justify-between"><span>log(x)</span><span>BMI = kg/m²</span></div>
            <div className="flex justify-between"><span>EMI Formula</span><span>% Ratio</span></div>
          </div>

          <div className="relative z-10 space-y-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-white/20 backdrop-blur-md flex items-center justify-center text-white border border-white/30 shadow-inner">
                <Calculator className="w-5 h-5" />
              </div>
              <span className="font-extrabold tracking-tight text-xl">CalcHub AI</span>
            </div>

            <div className="space-y-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-white/15 backdrop-blur-md border border-white/20">
                <Sparkles className="w-3.5 h-3.5 text-amber-300 animate-pulse" /> Join Free Today
              </span>
              <h3 className="text-2xl font-black leading-tight">
                Create Your Account & Sync Calculations
              </h3>
              <p className="text-xs text-white/80 leading-relaxed">
                Save calculation history, pin favorite tools, access admin metrics, and receive step-by-step AI math breakdowns.
              </p>
            </div>
          </div>

          {/* Feature List */}
          <div className="relative z-10 space-y-3 my-6">
            <div className="flex items-center gap-3 text-xs text-white/90">
              <CheckCircle2 className="w-4 h-4 text-emerald-300 shrink-0" />
              <span>Full Access to 40+ Specialized Calculators</span>
            </div>
            <div className="flex items-center gap-3 text-xs text-white/90">
              <CheckCircle2 className="w-4 h-4 text-emerald-300 shrink-0" />
              <span>Gemini AI Step-by-Step Problem Solver</span>
            </div>
            <div className="flex items-center gap-3 text-xs text-white/90">
              <CheckCircle2 className="w-4 h-4 text-emerald-300 shrink-0" />
              <span>Styled PDF & Excel Document Exports</span>
            </div>
          </div>

          {/* Footer Badge */}
          <div className="relative z-10 pt-4 border-t border-white/20 flex items-center justify-between text-[11px] text-white/70">
            <span>B.Tech Information Technology</span>
            <span className="font-semibold text-white">Major Project</span>
          </div>
        </div>

        {/* Right Authentication Form Panel */}
        <div className="lg:col-span-7 p-6 sm:p-10 flex flex-col justify-center space-y-5">
          <div className="text-center sm:text-left space-y-1.5">
            <div className="lg:hidden w-12 h-12 rounded-2xl bg-gradient-to-tr from-indigo-600 to-purple-600 text-white flex items-center justify-center mx-auto mb-3 shadow-lg shadow-indigo-500/30">
              <Calculator className="w-6 h-6" />
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-gray-900 dark:text-white tracking-tight">
              Create Account
            </h2>
            <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">
              Join CalcHub AI to manage calculation history & preferences.
            </p>
          </div>

          {/* Error Notice */}
          {error && (
            <div className="p-3.5 rounded-2xl bg-red-500/10 text-red-600 dark:text-red-400 text-xs font-semibold border border-red-500/20 flex items-start gap-2.5 animate-fadeIn">
              <AlertCircle className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
              <span>{error}</span>
            </div>
          )}

          {/* Quick Fill Button */}
          <div className="flex items-center justify-between px-3 py-2 rounded-2xl bg-gray-50 dark:bg-gray-900/60 border border-gray-200/60 dark:border-gray-800">
            <span className="text-[11px] font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider flex items-center gap-1">
              <Zap className="w-3 h-3 text-amber-500" /> Fast Registration
            </span>
            <button
              type="button"
              onClick={fillSampleData}
              className="px-2.5 py-1 rounded-xl text-[11px] font-semibold bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-brand-600 dark:text-brand-400 hover:bg-brand-50 dark:hover:bg-brand-950/40 transition-all shadow-sm"
            >
              Fill Sample Details
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-3.5">
            <div>
              <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-1 uppercase tracking-wider">
                Full Name
              </label>
              <div className="relative">
                <UserIcon className="w-4 h-4 text-gray-400 absolute left-3.5 top-3" />
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Praneth Kumar"
                  className="w-full pl-10 pr-4 py-2.5 text-xs sm:text-sm rounded-xl border border-gray-300 dark:border-gray-700 bg-gray-50/50 dark:bg-gray-900/50 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-brand-500/50 focus:border-brand-500 transition-all"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-1 uppercase tracking-wider">
                Email Address
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-gray-400 absolute left-3.5 top-3" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="praneth@example.com"
                  className="w-full pl-10 pr-4 py-2.5 text-xs sm:text-sm rounded-xl border border-gray-300 dark:border-gray-700 bg-gray-50/50 dark:bg-gray-900/50 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-brand-500/50 focus:border-brand-500 transition-all"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-1 uppercase tracking-wider">
                  Password
                </label>
                <div className="relative">
                  <Lock className="w-4 h-4 text-gray-400 absolute left-3.5 top-3" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full pl-10 pr-9 py-2.5 text-xs sm:text-sm rounded-xl border border-gray-300 dark:border-gray-700 bg-gray-50/50 dark:bg-gray-900/50 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-brand-500/50 focus:border-brand-500 transition-all"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-2.5 top-3 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors"
                  >
                    {showPassword ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-1 uppercase tracking-wider">
                  Confirm Password
                </label>
                <div className="relative">
                  <Lock className="w-4 h-4 text-gray-400 absolute left-3.5 top-3" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full pl-10 pr-4 py-2.5 text-xs sm:text-sm rounded-xl border border-gray-300 dark:border-gray-700 bg-gray-50/50 dark:bg-gray-900/50 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-brand-500/50 focus:border-brand-500 transition-all"
                  />
                </div>
              </div>
            </div>

            {/* Password Strength Indicator */}
            {password && (
              <div className="space-y-1 animate-fadeIn">
                <div className="flex items-center justify-between text-[11px]">
                  <span className="text-gray-500 dark:text-gray-400">Password Strength</span>
                  <span className={`font-bold ${strength.label === 'Weak' ? 'text-red-500' : strength.label === 'Medium' ? 'text-amber-500' : 'text-emerald-500'}`}>
                    {strength.label}
                  </span>
                </div>
                <div className="h-1.5 w-full bg-gray-200 dark:bg-gray-800 rounded-full overflow-hidden flex">
                  <div
                    className={`h-full transition-all duration-300 ${strength.color}`}
                    style={{ width: `${(strength.score / 4) * 100}%` }}
                  />
                </div>
              </div>
            )}

            <div className="flex items-start gap-2 pt-1 text-xs text-gray-600 dark:text-gray-400">
              <input
                type="checkbox"
                id="terms"
                checked={agreeTerms}
                onChange={(e) => setAgreeTerms(e.target.checked)}
                className="w-4 h-4 mt-0.5 rounded text-brand-600 focus:ring-brand-500 border-gray-300 dark:border-gray-700 dark:bg-gray-800 shrink-0 cursor-pointer"
              />
              <label htmlFor="terms" className="cursor-pointer select-none leading-tight">
                I agree to the{' '}
                <span className="font-semibold text-brand-600 dark:text-brand-400">Terms of Service</span> and{' '}
                <span className="font-semibold text-brand-600 dark:text-brand-400">Privacy Policy</span>.
              </label>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-indigo-600 via-brand-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-extrabold text-xs sm:text-sm shadow-lg shadow-indigo-500/25 transition-all transform active:scale-[0.99] flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {loading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  <span>Creating Profile...</span>
                </>
              ) : (
                <>
                  <span>Create CalcHub AI Account</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          <div className="text-center text-xs text-gray-500 dark:text-gray-400 pt-3 border-t border-gray-200/80 dark:border-gray-800">
            Already have an account?{' '}
            <Link to="/login" className="font-bold text-brand-600 dark:text-brand-400 hover:underline">
              Sign in here
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
