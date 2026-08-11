import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { ThemeToggle } from '../common/ThemeToggle';
import {
  Calculator,
  Search,
  Bot,
  History,
  Heart,
  User as UserIcon,
  LogOut,
  LayoutDashboard,
  Shield,
  Menu,
  X,
  Sparkles
} from 'lucide-react';
import { SearchModal } from '../common/SearchModal';

export const Navbar: React.FC = () => {
  const { user, isAuthenticated, isAdmin, logout } = useAuth();
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <>
      <header className="sticky top-0 z-40 w-full backdrop-blur-xl bg-white/75 dark:bg-[#0B0F17]/80 border-b border-gray-200/80 dark:border-gray-800/80 transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2.5 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-brand-600 via-accent-500 to-indigo-600 flex items-center justify-center text-white shadow-lg shadow-brand-500/25 group-hover:scale-105 transition-transform">
              <Calculator className="w-6 h-6" />
            </div>
            <div>
              <span className="text-xl font-black tracking-tight gradient-text">CalcHub AI</span>
              <span className="hidden sm:inline-block ml-2 text-[10px] uppercase font-bold tracking-widest px-2 py-0.5 rounded-full bg-brand-100 dark:bg-brand-950/80 text-brand-700 dark:text-brand-300 border border-brand-300 dark:border-brand-800">
                Major Project
              </span>
            </div>
          </Link>

          {/* Center Search Trigger */}
          <button
            onClick={() => setIsSearchOpen(true)}
            className="hidden md:flex items-center gap-3 px-4 py-2 rounded-xl bg-gray-100/80 dark:bg-gray-800/60 border border-gray-200 dark:border-gray-700 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 hover:bg-gray-200/60 dark:hover:bg-gray-700/60 transition-all text-sm w-72"
          >
            <Search className="w-4 h-4 text-brand-500" />
            <span>Search 40+ calculators...</span>
            <kbd className="ml-auto text-[10px] font-mono bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-700 rounded px-1.5 py-0.5 text-gray-500">⌘K</kbd>
          </button>

          {/* Right Action Icons */}
          <div className="hidden md:flex items-center gap-3">
            <Link
              to="/ai-assistant"
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-gradient-to-r from-accent-500/10 to-brand-500/10 hover:from-accent-500/20 hover:to-brand-500/20 border border-accent-500/30 text-accent-600 dark:text-accent-400 text-xs font-semibold transition-all"
            >
              <Sparkles className="w-4 h-4 text-accent-500 animate-pulse" />
              <span>AI Assistant</span>
            </Link>

            <ThemeToggle />

            <div className="flex items-center gap-1 border-l border-gray-200 dark:border-gray-800 pl-2">
              <Link
                to="/dashboard"
                className="p-2 rounded-xl text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                title="Dashboard"
              >
                <LayoutDashboard className="w-5 h-5" />
              </Link>

              <Link
                to="/favorites"
                className="p-2 rounded-xl text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                title="Favorites"
              >
                <Heart className="w-5 h-5" />
              </Link>

              <Link
                to="/history"
                className="p-2 rounded-xl text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                title="History"
              >
                <History className="w-5 h-5" />
              </Link>

              {isAuthenticated ? (
                <div className="flex items-center gap-2 pl-2 border-l border-gray-200 dark:border-gray-800">
                  {isAdmin && (
                    <Link
                      to="/admin"
                      className="p-2 rounded-xl text-amber-600 dark:text-amber-400 hover:bg-amber-50 dark:hover:bg-amber-950/40 transition-colors"
                      title="Admin Panel"
                    >
                      <Shield className="w-5 h-5" />
                    </Link>
                  )}

                  <Link
                    to="/profile"
                    className="flex items-center gap-2 p-1.5 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                  >
                    <img
                      src={user?.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150'}
                      alt={user?.name}
                      className="w-7 h-7 rounded-full object-cover border border-brand-500"
                    />
                    <span className="text-xs font-medium max-w-[100px] truncate">{user?.name}</span>
                  </Link>

                  <button
                    onClick={() => { logout(); navigate('/login'); }}
                    className="p-2 rounded-xl text-red-500 hover:bg-red-50 dark:hover:bg-red-950/30 transition-colors"
                    title="Logout"
                  >
                    <LogOut className="w-5 h-5" />
                  </button>
                </div>
              ) : (
                <div className="flex items-center gap-2 pl-2 border-l border-gray-200 dark:border-gray-800">
                  <span className="hidden lg:inline-flex items-center px-2.5 py-1 rounded-full text-[10px] font-extrabold bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
                    Free Guest Mode
                  </span>
                  <Link
                    to="/login"
                    className="px-3.5 py-1.5 rounded-xl text-xs font-semibold text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                  >
                    Log in
                  </Link>
                </div>
              )}
            </div>
          </div>

          {/* Mobile menu trigger */}
          <div className="flex md:hidden items-center gap-2">
            <button
              onClick={() => setIsSearchOpen(true)}
              className="p-2 text-gray-600 dark:text-gray-300"
            >
              <Search className="w-5 h-5" />
            </button>
            <ThemeToggle />
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 rounded-xl text-gray-700 dark:text-gray-200"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-b border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 px-4 py-4 space-y-3">
            <Link
              to="/calculators"
              onClick={() => setIsMobileMenuOpen(false)}
              className="block px-3 py-2 rounded-lg text-base font-medium hover:bg-gray-100 dark:hover:bg-gray-800"
            >
              All 40+ Calculators
            </Link>
            <Link
              to="/categories"
              onClick={() => setIsMobileMenuOpen(false)}
              className="block px-3 py-2 rounded-lg text-base font-medium hover:bg-gray-100 dark:hover:bg-gray-800"
            >
              Categories
            </Link>
            <Link
              to="/ai-assistant"
              onClick={() => setIsMobileMenuOpen(false)}
              className="block px-3 py-2 rounded-lg text-base font-medium text-accent-500 hover:bg-gray-100 dark:hover:bg-gray-800"
            >
              AI Assistant
            </Link>

            {isAuthenticated ? (
              <>
                <Link
                  to="/dashboard"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block px-3 py-2 rounded-lg text-base font-medium hover:bg-gray-100 dark:hover:bg-gray-800"
                >
                  Dashboard
                </Link>
                <Link
                  to="/favorites"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block px-3 py-2 rounded-lg text-base font-medium hover:bg-gray-100 dark:hover:bg-gray-800"
                >
                  Favorites
                </Link>
                <Link
                  to="/history"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block px-3 py-2 rounded-lg text-base font-medium hover:bg-gray-100 dark:hover:bg-gray-800"
                >
                  History
                </Link>
                <Link
                  to="/profile"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block px-3 py-2 rounded-lg text-base font-medium hover:bg-gray-100 dark:hover:bg-gray-800"
                >
                  Profile & Settings
                </Link>
                <button
                  onClick={() => { logout(); setIsMobileMenuOpen(false); }}
                  className="w-full text-left px-3 py-2 rounded-lg text-base font-medium text-red-500 hover:bg-red-50 dark:hover:bg-red-950/40"
                >
                  Logout
                </button>
              </>
            ) : (
              <div className="pt-2 flex flex-col gap-2">
                <Link
                  to="/login"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="w-full text-center py-2.5 rounded-xl border border-gray-300 dark:border-gray-700 font-semibold"
                >
                  Log in
                </Link>
                <Link
                  to="/register"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="w-full text-center py-2.5 rounded-xl bg-brand-600 text-white font-semibold"
                >
                  Register
                </Link>
              </div>
            )}
          </div>
        )}
      </header>

      {/* Global Search Modal */}
      <SearchModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
    </>
  );
};
