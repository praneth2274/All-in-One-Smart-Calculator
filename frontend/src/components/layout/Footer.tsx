import React from 'react';
import { Link } from 'react-router-dom';
import { Calculator, Heart, Shield, Github, Globe, Sparkles } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="w-full bg-white dark:bg-[#080B11] border-t border-gray-200 dark:border-gray-800/80 transition-colors py-12 mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-10">
          
          {/* Brand */}
          <div className="space-y-4 md:col-span-1">
            <Link to="/" className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-brand-600 via-accent-500 to-indigo-600 flex items-center justify-center text-white shadow-md">
                <Calculator className="w-5 h-5" />
              </div>
              <span className="text-xl font-black gradient-text">CalcHub AI</span>
            </Link>
            <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed">
              All-in-One Smart Calculator Suite engineered for students, engineers, financial analysts, and everyday calculations powered by AI.
            </p>
            <div className="flex items-center gap-3 pt-1">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-semibold bg-brand-50 dark:bg-brand-950 text-brand-600 dark:text-brand-400 border border-brand-200 dark:border-brand-800">
                <Sparkles className="w-3 h-3 text-accent-500" /> B.Tech IT Major Project
              </span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-gray-900 dark:text-white mb-4">Calculators</h4>
            <ul className="space-y-2.5 text-xs text-gray-600 dark:text-gray-400">
              <li><Link to="/calculators?category=basic" className="hover:text-brand-500 transition-colors">Basic & Scientific</Link></li>
              <li><Link to="/calculators?category=finance" className="hover:text-brand-500 transition-colors">EMI & SIP Finance</Link></li>
              <li><Link to="/calculators?category=student" className="hover:text-brand-500 transition-colors">GPA & Attendance</Link></li>
              <li><Link to="/calculators?category=health" className="hover:text-brand-500 transition-colors">BMI & Calorie Fitness</Link></li>
              <li><Link to="/calculators?category=unit-conversion" className="hover:text-brand-500 transition-colors">Unit Converters</Link></li>
            </ul>
          </div>

          {/* Platform Features */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-gray-900 dark:text-white mb-4">Features</h4>
            <ul className="space-y-2.5 text-xs text-gray-600 dark:text-gray-400">
              <li><Link to="/ai-assistant" className="hover:text-accent-500 transition-colors">AI Step Solver</Link></li>
              <li><Link to="/history" className="hover:text-brand-500 transition-colors">Calculation History</Link></li>
              <li><Link to="/favorites" className="hover:text-brand-500 transition-colors">Favorite Calculators</Link></li>
              <li><Link to="/dashboard" className="hover:text-brand-500 transition-colors">Analytics Dashboard</Link></li>
              <li><Link to="/admin" className="hover:text-brand-500 transition-colors">Admin Portal</Link></li>
            </ul>
          </div>

          {/* Information & Legal */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-gray-900 dark:text-white mb-4">Support & Info</h4>
            <ul className="space-y-2.5 text-xs text-gray-600 dark:text-gray-400">
              <li><Link to="/about" className="hover:text-brand-500 transition-colors">About Project</Link></li>
              <li><Link to="/contact" className="hover:text-brand-500 transition-colors">Contact Support</Link></li>
              <li><Link to="/settings" className="hover:text-brand-500 transition-colors">User Preferences</Link></li>
              <li className="pt-2 text-[11px] text-gray-400">
                <span>Made with <Heart className="w-3 h-3 text-red-500 inline mx-0.5" /> for Final Year Major Evaluation.</span>
              </li>
            </ul>
          </div>

        </div>

        <div className="pt-6 border-t border-gray-200 dark:border-gray-800/60 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-gray-500 dark:text-gray-400">
          <p>© {new Date().getFullYear()} CalcHub AI. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <span className="flex items-center gap-1.5"><Shield className="w-3.5 h-3.5 text-emerald-500" /> 256-bit JWT Secure</span>
            <span className="flex items-center gap-1.5"><Globe className="w-3.5 h-3.5 text-blue-500" /> React 18 & Node REST</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
