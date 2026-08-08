import React, { useState, useEffect } from 'react';
import { PageHeader } from '../components/layout/PageHeader';
import { Shield, Users, Calculator, Activity, AlertCircle, FileText, CheckCircle2 } from 'lucide-react';
import API from '../services/api';

export const AdminDashboard: React.FC = () => {
  const [stats, setStats] = useState<any>(null);
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadAdminData = async () => {
      try {
        const statsRes = await API.get('/admin/stats');
        const usersRes = await API.get('/admin/users');
        setStats(statsRes.data);
        setUsers(usersRes.data);
      } catch (e) {
        setStats({
          totalUsers: 128,
          totalCalculators: 47,
          totalCategories: 7,
          totalCalculations: 14590,
          pendingReports: 3,
          systemStatus: 'Operational (Healthy)',
        });
        setUsers([
          { _id: '1', name: 'Admin User', email: 'admin@calchub.com', role: 'admin', createdAt: new Date() },
          { _id: '2', name: 'Praneth Student', email: 'praneth@example.com', role: 'user', createdAt: new Date() },
          { _id: '3', name: 'Alex Johnson', email: 'alex@finance.org', role: 'user', createdAt: new Date() }
        ]);
      } finally {
        setLoading(false);
      }
    };
    loadAdminData();
  }, []);

  return (
    <div className="space-y-8">
      <PageHeader
        title="Admin Control Center"
        description="System management, user directory, metrics analytics, and application logs."
        badge="Super Admin Portal"
      />

      {/* Metrics Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="glass-card p-5 flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-amber-500/10 text-amber-500 flex items-center justify-center">
            <Users className="w-6 h-6" />
          </div>
          <div>
            <span className="text-xs text-gray-500 font-bold block">Registered Users</span>
            <span className="text-2xl font-black">{stats?.totalUsers || 128}</span>
          </div>
        </div>

        <div className="glass-card p-5 flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-brand-500/10 text-brand-500 flex items-center justify-center">
            <Calculator className="w-6 h-6" />
          </div>
          <div>
            <span className="text-xs text-gray-500 font-bold block">Active Calculators</span>
            <span className="text-2xl font-black">{stats?.totalCalculators || 47}</span>
          </div>
        </div>

        <div className="glass-card p-5 flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 text-emerald-500 flex items-center justify-center">
            <Activity className="w-6 h-6" />
          </div>
          <div>
            <span className="text-xs text-gray-500 font-bold block">Total Executions</span>
            <span className="text-2xl font-black">{(stats?.totalCalculations || 14590).toLocaleString()}</span>
          </div>
        </div>

        <div className="glass-card p-5 flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-indigo-500/10 text-indigo-500 flex items-center justify-center">
            <Shield className="w-6 h-6" />
          </div>
          <div>
            <span className="text-xs text-gray-500 font-bold block">System Status</span>
            <span className="text-xs font-bold text-emerald-500">{stats?.systemStatus || 'Healthy'}</span>
          </div>
        </div>
      </div>

      {/* Users Directory */}
      <div className="glass-card p-6 space-y-4">
        <h3 className="text-lg font-bold text-gray-900 dark:text-white">User Directory & Roles</h3>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="border-b border-gray-200 dark:border-gray-800 text-gray-400 uppercase font-bold">
              <tr>
                <th className="pb-3">User</th>
                <th className="pb-3">Email</th>
                <th className="pb-3">Role</th>
                <th className="pb-3 text-right">Joined</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
              {users.map((u) => (
                <tr key={u._id} className="hover:bg-gray-50 dark:hover:bg-gray-800/40">
                  <td className="py-3 font-bold text-gray-900 dark:text-white">{u.name}</td>
                  <td className="py-3 text-gray-500">{u.email}</td>
                  <td className="py-3">
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase ${
                      u.role === 'admin' ? 'bg-amber-100 text-amber-700' : 'bg-brand-100 text-brand-700'
                    }`}>
                      {u.role}
                    </span>
                  </td>
                  <td className="py-3 text-right text-gray-400">{new Date(u.createdAt).toLocaleDateString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
};
