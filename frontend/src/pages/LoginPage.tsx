import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { loginUser } from '../services/authService';
import {
  Calculator,
  Lock,
  Mail,
  ArrowRight,
  Eye,
  EyeOff,
  Sparkles,
  ShieldCheck,
  Zap,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';

export const LoginPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const user = await loginUser(email, password);
      login(user);
      navigate('/dashboard');
    } catch (err: any) {
      setError(err.response?.data?.message || 'Invalid credentials. Please verify email and password.');
    } finally {
      setLoading(false);
    }
  };

  const fillDemo = (role: 'student' | 'admin') => {
    if (role === 'admin') {
      setEmail('admin@calchub.com');
      setPassword('admin123');
    } else {
      setEmail('student@calchub.com');
      setPassword('student123');
    }
    setError('');
  };

  return (
    <div className="relative min-h-[85vh] flex items-center justify-center py-8 px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Background Ambient Glow Orbs */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-brand-500/15 rounded-full blur-3xl pointer-events-none animate-pulse-glow" />
      <div className="absolute bottom-10 right-10 w-80 h-80 bg-purple-500/15 rounded-full blur-3xl pointer-events-none" />

      {/* Main Glassmorphic Container */}
      <div className="relative w-full max-w-4xl grid grid-cols-1 lg:grid-cols-12 gap-0 bg-white/80 dark:bg-[#111827]/80 backdrop-blur-2xl border border-gray-200/80 dark:border-gray-800/80 rounded-3xl shadow-2xl overflow-hidden">
        
        {/* Left Decorative Showcase Panel (Desktop) */}
        <div className="hidden lg:flex lg:col-span-5 flex-col justify-between p-8 bg-gradient-to-br from-brand-600 via-indigo-600 to-purple-700 text-white relative overflow-hidden">
          <div className="absolute -top-12 -right-12 w-48 h-48 bg-white/10 rounded-full blur-2xl pointer-events-none" />
          <div className="absolute -bottom-16 -left-16 w-56 h-56 bg-brand-400/20 rounded-full blur-2xl pointer-events-none" />

          {/* Floating Math Symbols Watermark */}
          <div className="absolute inset-0 pointer-events-none opacity-10 flex flex-col justify-between p-6 font-mono text-3xl font-bold select-none">
            <div className="flex justify-between"><span>∫f(x)dx</span><span>∑x²</span></div>
            <div className="flex justify-between"><span>π ≈ 3.14159</span><span>e = mc²</span></div>
            <div className="flex justify-between"><span>√x + y</span><span>lim x→∞</span></div>
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
                <Sparkles className="w-3.5 h-3.5 text-amber-300 animate-pulse" /> AI-Powered Platform
              </span>
              <h3 className="text-2xl font-black leading-tight">
                Unlock 40+ Smart Calculators & AI Explanations
              </h3>
              <p className="text-xs text-white/80 leading-relaxed">
                Seamlessly compute financial EMIs, GPA, body metrics, unit conversions, and receive step-by-step Gemini AI breakdown.
              </p>
            </div>
          </div>

          {/* Feature List */}
          <div className="relative z-10 space-y-3 my-6">
            <div className="flex items-center gap-3 text-xs text-white/90">
              <CheckCircle2 className="w-4 h-4 text-emerald-300 shrink-0" />
              <span>Cloud Sync for History & Favorites</span>
            </div>
            <div className="flex items-center gap-3 text-xs text-white/90">
              <CheckCircle2 className="w-4 h-4 text-emerald-300 shrink-0" />
              <span>One-Click Export to PDF & Excel</span>
            </div>
            <div className="flex items-center gap-3 text-xs text-white/90">
              <CheckCircle2 className="w-4 h-4 text-emerald-300 shrink-0" />
              <span>Audio Solution Readout Engine</span>
            </div>
          </div>

          {/* Footer Badge */}
          <div className="relative z-10 pt-4 border-t border-white/20 flex items-center justify-between text-[11px] text-white/70">
            <span>B.Tech IT Major Project</span>
            <span className="font-semibold text-white">v1.0 Production</span>
          </div>
        </div>

        {/* Right Authentication Form Panel */}
        <div className="lg:col-span-7 p-6 sm:p-10 flex flex-col justify-center space-y-6">
          <div className="text-center sm:text-left space-y-1.5">
            <div className="lg:hidden w-12 h-12 rounded-2xl bg-gradient-to-tr from-brand-600 to-indigo-600 text-white flex items-center justify-center mx-auto mb-3 shadow-lg shadow-brand-500/30">
              <Calculator className="w-6 h-6" />
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-gray-900 dark:text-white tracking-tight">
              Welcome Back
            </h2>
            <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">
              Sign in to access your saved calculations and AI features.
            </p>
          </div>

          {/* Error Notice */}
          {error && (
            <div className="p-3.5 rounded-2xl bg-red-500/10 text-red-600 dark:text-red-400 text-xs font-semibold border border-red-500/20 flex items-start gap-2.5 animate-fadeIn">
              <AlertCircle className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
              <span>{error}</span>
            </div>
          )}

          {/* Quick Demo Credentials Autofill */}
          <div className="p-3 rounded-2xl bg-gray-50 dark:bg-gray-900/60 border border-gray-200/60 dark:border-gray-800 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider flex items-center gap-1">
                <Zap className="w-3 h-3 text-amber-500" /> Quick Demo Login
              </span>
              <span className="text-[10px] text-gray-400">Click to autofill</span>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => fillDemo('student')}
                className="px-3 py-1.5 rounded-xl text-xs font-medium bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-200 hover:bg-brand-50 dark:hover:bg-brand-950/40 hover:border-brand-300 dark:hover:border-brand-800 transition-all flex items-center justify-center gap-1.5 shadow-sm"
              >
                <span>🎓 Demo Student</span>
              </button>
              <button
                type="button"
                onClick={() => fillDemo('admin')}
                className="px-3 py-1.5 rounded-xl text-xs font-medium bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-200 hover:bg-amber-50 dark:hover:bg-amber-950/40 hover:border-amber-300 dark:hover:border-amber-800 transition-all flex items-center justify-center gap-1.5 shadow-sm"
              >
                <ShieldCheck className="w-3.5 h-3.5 text-amber-500" />
                <span>🛡️ Demo Admin</span>
              </button>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-1.5 uppercase tracking-wider">
                Email Address
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-gray-400 absolute left-3.5 top-3.5" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@calchub.com"
                  className="w-full pl-10 pr-4 py-2.5 text-xs sm:text-sm rounded-xl border border-gray-300 dark:border-gray-700 bg-gray-50/50 dark:bg-gray-900/50 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-brand-500/50 focus:border-brand-500 transition-all"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 uppercase tracking-wider">
                  Password
                </label>
                <button
                  type="button"
                  onClick={() => alert('Demo account password: "password123" or use Quick Demo buttons above!')}
                  className="text-[11px] font-semibold text-brand-600 dark:text-brand-400 hover:underline"
                >
                  Forgot password?
                </button>
              </div>
              <div className="relative">
                <Lock className="w-4 h-4 text-gray-400 absolute left-3.5 top-3.5" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-10 pr-10 py-2.5 text-xs sm:text-sm rounded-xl border border-gray-300 dark:border-gray-700 bg-gray-50/50 dark:bg-gray-900/50 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-brand-500/50 focus:border-brand-500 transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-3 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between text-xs text-gray-600 dark:text-gray-400 pt-1">
              <label className="flex items-center gap-2 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="w-4 h-4 rounded text-brand-600 focus:ring-brand-500 border-gray-300 dark:border-gray-700 dark:bg-gray-800"
                />
                <span>Remember me on this browser</span>
              </label>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-brand-600 via-indigo-600 to-purple-600 hover:from-brand-500 hover:to-purple-500 text-white font-extrabold text-xs sm:text-sm shadow-lg shadow-brand-500/25 transition-all transform active:scale-[0.99] flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {loading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  <span>Authenticating...</span>
                </>
              ) : (
                <>
                  <span>Sign In to CalcHub AI</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          <div className="text-center text-xs text-gray-500 dark:text-gray-400 pt-3 border-t border-gray-200/80 dark:border-gray-800">
            Don't have an account yet?{' '}
            <Link to="/register" className="font-bold text-brand-600 dark:text-brand-400 hover:underline">
              Create an Account free
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
