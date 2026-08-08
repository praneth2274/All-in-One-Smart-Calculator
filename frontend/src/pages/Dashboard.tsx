import React from 'react';
import { PageHeader } from '../components/layout/PageHeader';
import { useCalculatorContext } from '../context/CalculatorContext';
import { useAuth } from '../context/AuthContext';
import { CalculatorCard } from '../components/common/CalculatorCard';
import { Calculator, Heart, History, TrendingUp, Sparkles, UserCheck } from 'lucide-react';
import { Link } from 'react-router-dom';

export const Dashboard: React.FC = () => {
  const { user } = useAuth();
  const { favorites, history } = useCalculatorContext();

  return (
    <div className="space-y-8">
      <PageHeader
        title={`Welcome back, ${user?.name || 'User'}!`}
        description="Your personal CalcHub AI analytics dashboard and quick action launcher."
        badge="Dashboard"
      />

      {/* Quick Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="glass-card p-5 flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-blue-500/10 text-blue-500 flex items-center justify-center">
            <Calculator className="w-6 h-6" />
          </div>
          <div>
            <span className="text-xs text-gray-500 font-bold block">Total Suite Tools</span>
            <span className="text-2xl font-black text-gray-900 dark:text-white">40+ Calculators</span>
          </div>
        </div>

        <div className="glass-card p-5 flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-rose-500/10 text-rose-500 flex items-center justify-center">
            <Heart className="w-6 h-6" />
          </div>
          <div>
            <span className="text-xs text-gray-500 font-bold block">Favorite Calculators</span>
            <span className="text-2xl font-black text-gray-900 dark:text-white">{favorites.length} Saved</span>
          </div>
        </div>

        <div className="glass-card p-5 flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-indigo-500/10 text-indigo-500 flex items-center justify-center">
            <History className="w-6 h-6" />
          </div>
          <div>
            <span className="text-xs text-gray-500 font-bold block">Calculations Logged</span>
            <span className="text-2xl font-black text-gray-900 dark:text-white">{history.length} Records</span>
          </div>
        </div>

        <div className="glass-card p-5 flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-accent-500/10 text-accent-500 flex items-center justify-center">
            <Sparkles className="w-6 h-6" />
          </div>
          <div>
            <span className="text-xs text-gray-500 font-bold block">AI Engine Status</span>
            <span className="text-sm font-extrabold text-emerald-500">Active & Ready</span>
          </div>
        </div>
      </div>

      {/* Recent Calculations Table */}
      <div className="glass-card p-6 space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-bold text-gray-900 dark:text-white">Recently Executed Calculations</h3>
          <Link to="/history" className="text-xs font-bold text-brand-600 dark:text-brand-400 hover:underline">
            View All History →
          </Link>
        </div>

        {history.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="border-b border-gray-200 dark:border-gray-800 text-gray-400 uppercase font-bold">
                <tr>
                  <th className="pb-3">Calculator</th>
                  <th className="pb-3">Category</th>
                  <th className="pb-3">Summary / Result</th>
                  <th className="pb-3 text-right">Time</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
                {history.slice(0, 5).map((item) => (
                  <tr key={item._id} className="hover:bg-gray-50 dark:hover:bg-gray-800/40 transition-colors">
                    <td className="py-3 font-bold text-gray-900 dark:text-white">{item.calculatorTitle}</td>
                    <td className="py-3 text-brand-600 dark:text-brand-400 font-semibold">{item.category}</td>
                    <td className="py-3 font-mono font-bold text-emerald-500">{item.formattedSummary || JSON.stringify(item.results)}</td>
                    <td className="py-3 text-right text-gray-400">{new Date(item.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="py-8 text-center text-xs text-gray-400">
            No recent calculations yet. Try running EMI, Scientific, or BMI calculator!
          </div>
        )}
      </div>

    </div>
  );
};
