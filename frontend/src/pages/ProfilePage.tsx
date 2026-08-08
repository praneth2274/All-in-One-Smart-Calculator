import React, { useState } from 'react';
import { PageHeader } from '../components/layout/PageHeader';
import { useAuth } from '../context/AuthContext';
import { updateProfile } from '../services/authService';
import { User as UserIcon, Mail, Shield, Camera, Check } from 'lucide-react';

export const ProfilePage: React.FC = () => {
  const { user, updateUser } = useAuth();
  const [name, setName] = useState(user?.name || '');
  const [avatar, setAvatar] = useState(user?.avatar || '');
  const [saved, setSaved] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await updateProfile(name, avatar);
      updateUser({ name, avatar });
      setSaved(true);
      setTimeout(() => setSaved(false), 2000);
    } catch (e) {}
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <PageHeader
        title="User Profile"
        description="Manage your account preferences, avatar, and personal details."
        badge="Account Settings"
      />

      <div className="glass-card p-6 space-y-6">
        <div className="flex items-center gap-4 pb-6 border-b border-gray-200 dark:border-gray-800">
          <img
            src={avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150'}
            alt="Avatar"
            className="w-20 h-20 rounded-full object-cover border-2 border-brand-500 shadow-md"
          />
          <div>
            <h3 className="text-xl font-bold text-gray-900 dark:text-white">{user?.name}</h3>
            <p className="text-xs text-gray-500">{user?.email}</p>
            <span className="inline-block mt-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase bg-brand-100 text-brand-700">
              Role: {user?.role}
            </span>
          </div>
        </div>

        {saved && (
          <div className="p-3 rounded-xl bg-emerald-500/10 text-emerald-500 text-xs font-bold flex items-center gap-2">
            <Check className="w-4 h-4" /> Profile updated successfully!
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          <div>
            <label className="block font-bold mb-1">Full Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full glass-input"
            />
          </div>

          <div>
            <label className="block font-bold mb-1">Avatar Image URL</label>
            <input
              type="text"
              value={avatar}
              onChange={(e) => setAvatar(e.target.value)}
              className="w-full glass-input"
            />
          </div>

          <button
            type="submit"
            className="px-6 py-2.5 rounded-xl bg-brand-600 hover:bg-brand-500 text-white font-bold text-xs shadow-lg transition-colors"
          >
            Save Profile Changes
          </button>
        </form>
      </div>
    </div>
  );
};
