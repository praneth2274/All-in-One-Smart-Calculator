import React from 'react';
import { PageHeader } from '../components/layout/PageHeader';
import { Calculator, Sparkles, Award, ShieldCheck, Code, Server, Database } from 'lucide-react';

export const AboutPage: React.FC = () => {
  return (
    <div className="max-w-3xl mx-auto space-y-8">
      <PageHeader
        title="About CalcHub AI Project"
        description="Comprehensive All-in-One Smart Calculator Platform for B.Tech Major Project."
        badge="Major Project 2026"
      />

      <div className="glass-card p-8 space-y-6 text-sm leading-relaxed">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-brand-600 text-white flex items-center justify-center shadow-lg">
            <Calculator className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-xl font-black text-gray-900 dark:text-white">CalcHub AI Suite</h2>
            <p className="text-xs text-brand-600 font-bold">Engineering & Information Technology Major Major Project</p>
          </div>
        </div>

        <p className="text-gray-600 dark:text-gray-300">
          CalcHub AI is designed as a production-grade Web Application featuring 40+ specialized calculators across 7 domain modules: Basic Arithmetic, Financial Investments (EMI/SIP), Student Grade Tracking (GPA/Attendance), Fitness & Health (BMI/Calorie), Unit Conversion, Daily Utilities, and Security tools.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4">
          <div className="p-4 rounded-2xl bg-brand-50 dark:bg-brand-950/40 border border-brand-200 text-center">
            <Code className="w-6 h-6 text-brand-600 mx-auto mb-1" />
            <h4 className="font-bold text-xs text-gray-900 dark:text-white">React & TypeScript</h4>
            <p className="text-[10px] text-gray-500">Vite, Tailwind CSS, Framer Motion</p>
          </div>

          <div className="p-4 rounded-2xl bg-accent-50 dark:bg-accent-950/40 border border-accent-200 text-center">
            <Server className="w-6 h-6 text-accent-600 mx-auto mb-1" />
            <h4 className="font-bold text-xs text-gray-900 dark:text-white">Node.js REST API</h4>
            <p className="text-[10px] text-gray-500">Express, JWT Auth, Helmet, Rate Limit</p>
          </div>

          <div className="p-4 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 text-center">
            <Database className="w-6 h-6 text-emerald-600 mx-auto mb-1" />
            <h4 className="font-bold text-xs text-gray-900 dark:text-white">MongoDB & AI</h4>
            <p className="text-[10px] text-gray-500">Mongoose ORM & Gemini AI Engine</p>
          </div>
        </div>
      </div>
    </div>
  );
};
