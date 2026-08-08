import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  LayoutDashboard,
  Calculator,
  Grid,
  Heart,
  History,
  Bot,
  User,
  Settings,
  Shield,
  Info,
  Mail,
  Zap,
  Landmark,
  GraduationCap,
  Activity,
  Ruler,
  Sun,
  Wrench
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export const Sidebar: React.FC = () => {
  const { isAdmin } = useAuth();

  const categoriesNav = [
    { name: 'Basic', slug: 'basic', icon: Calculator, color: 'text-blue-500' },
    { name: 'Finance', slug: 'finance', icon: Landmark, color: 'text-emerald-500' },
    { name: 'Student', slug: 'student', icon: GraduationCap, color: 'text-indigo-500' },
    { name: 'Health', slug: 'health', icon: Activity, color: 'text-rose-500' },
    { name: 'Unit Conversion', slug: 'unit-conversion', icon: Ruler, color: 'text-amber-500' },
    { name: 'Daily Life', slug: 'daily-life', icon: Sun, color: 'text-orange-500' },
    { name: 'Utility', slug: 'utility', icon: Wrench, color: 'text-purple-500' },
  ];

  return (
    <aside className="w-64 hidden lg:block shrink-0 p-4 border-r border-gray-200/80 dark:border-gray-800/80 bg-white/50 dark:bg-[#0B0F17]/50 backdrop-blur-md min-h-[calc(100vh-4rem)]">
      <div className="space-y-6">
        
        {/* Main Navigation */}
        <div>
          <h3 className="px-3 text-[11px] font-bold uppercase tracking-wider text-gray-400 dark:text-gray-500 mb-2">Main Menu</h3>
          <nav className="space-y-1">
            <NavLink
              to="/dashboard"
              className={({ isActive }) =>
                `flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-medium transition-all ${
                  isActive
                    ? 'bg-brand-500 text-white shadow-md shadow-brand-500/25'
                    : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800/60'
                }`
              }
            >
              <LayoutDashboard className="w-4 h-4" />
              <span>Dashboard</span>
            </NavLink>

            <NavLink
              to="/calculators"
              className={({ isActive }) =>
                `flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-medium transition-all ${
                  isActive
                    ? 'bg-brand-500 text-white shadow-md shadow-brand-500/25'
                    : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800/60'
                }`
              }
            >
              <Calculator className="w-4 h-4" />
              <span>All 40+ Calculators</span>
            </NavLink>

            <NavLink
              to="/categories"
              className={({ isActive }) =>
                `flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-medium transition-all ${
                  isActive
                    ? 'bg-brand-500 text-white shadow-md shadow-brand-500/25'
                    : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800/60'
                }`
              }
            >
              <Grid className="w-4 h-4" />
              <span>Categories</span>
            </NavLink>

            <NavLink
              to="/ai-assistant"
              className={({ isActive }) =>
                `flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-medium transition-all ${
                  isActive
                    ? 'bg-gradient-to-r from-accent-600 to-brand-600 text-white shadow-md'
                    : 'text-accent-600 dark:text-accent-400 hover:bg-accent-50 dark:hover:bg-accent-950/40'
                }`
              }
            >
              <Bot className="w-4 h-4" />
              <span>AI Assistant</span>
            </NavLink>

            <NavLink
              to="/favorites"
              className={({ isActive }) =>
                `flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-medium transition-all ${
                  isActive
                    ? 'bg-brand-500 text-white shadow-md shadow-brand-500/25'
                    : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800/60'
                }`
              }
            >
              <Heart className="w-4 h-4" />
              <span>Favorites</span>
            </NavLink>

            <NavLink
              to="/history"
              className={({ isActive }) =>
                `flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-medium transition-all ${
                  isActive
                    ? 'bg-brand-500 text-white shadow-md shadow-brand-500/25'
                    : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800/60'
                }`
              }
            >
              <History className="w-4 h-4" />
              <span>Calculation History</span>
            </NavLink>
          </nav>
        </div>

        {/* Categories Quick Nav */}
        <div>
          <h3 className="px-3 text-[11px] font-bold uppercase tracking-wider text-gray-400 dark:text-gray-500 mb-2">Categories</h3>
          <nav className="space-y-0.5">
            {categoriesNav.map((cat) => {
              const IconComp = cat.icon;
              return (
                <NavLink
                  key={cat.slug}
                  to={`/categories?cat=${cat.slug}`}
                  className={({ isActive }) =>
                    `flex items-center gap-3 px-3 py-2 rounded-xl text-xs font-medium transition-colors ${
                      isActive
                        ? 'bg-gray-200/80 dark:bg-gray-800 text-gray-900 dark:text-white font-semibold'
                        : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800/40'
                    }`
                  }
                >
                  <IconComp className={`w-3.5 h-3.5 ${cat.color}`} />
                  <span>{cat.name}</span>
                </NavLink>
              );
            })}
          </nav>
        </div>

        {/* Account & Settings */}
        <div>
          <h3 className="px-3 text-[11px] font-bold uppercase tracking-wider text-gray-400 dark:text-gray-500 mb-2">System</h3>
          <nav className="space-y-1">
            <NavLink
              to="/profile"
              className="flex items-center gap-3 px-3.5 py-2 rounded-xl text-xs font-medium text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800/40 transition-colors"
            >
              <User className="w-3.5 h-3.5" />
              <span>Profile</span>
            </NavLink>

            <NavLink
              to="/settings"
              className="flex items-center gap-3 px-3.5 py-2 rounded-xl text-xs font-medium text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800/40 transition-colors"
            >
              <Settings className="w-3.5 h-3.5" />
              <span>Settings</span>
            </NavLink>

            {isAdmin && (
              <NavLink
                to="/admin"
                className="flex items-center gap-3 px-3.5 py-2 rounded-xl text-xs font-medium text-amber-600 dark:text-amber-400 hover:bg-amber-50 dark:hover:bg-amber-950/40 transition-colors"
              >
                <Shield className="w-3.5 h-3.5" />
                <span>Admin Dashboard</span>
              </NavLink>
            )}

            <NavLink
              to="/about"
              className="flex items-center gap-3 px-3.5 py-2 rounded-xl text-xs font-medium text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800/40 transition-colors"
            >
              <Info className="w-3.5 h-3.5" />
              <span>About Project</span>
            </NavLink>

            <NavLink
              to="/contact"
              className="flex items-center gap-3 px-3.5 py-2 rounded-xl text-xs font-medium text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800/40 transition-colors"
            >
              <Mail className="w-3.5 h-3.5" />
              <span>Contact Support</span>
            </NavLink>
          </nav>
        </div>

      </div>
    </aside>
  );
};
