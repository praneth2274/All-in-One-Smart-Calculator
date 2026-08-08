import React from 'react';
import { PageHeader } from '../components/layout/PageHeader';
import { ThemeToggle } from '../components/common/ThemeToggle';
import { Settings, Moon, Sun, Bell, Volume2, Shield } from 'lucide-react';

export const SettingsPage: React.FC = () => {
  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <PageHeader
        title="Application Settings"
        description="Configure theme, voice readouts, notification preferences, and system defaults."
        badge="Preferences"
      />

      <div className="glass-card p-6 space-y-6 text-xs">
        
        {/* Appearance */}
        <div className="flex items-center justify-between pb-4 border-b border-gray-200 dark:border-gray-800">
          <div>
            <h4 className="font-bold text-sm text-gray-900 dark:text-white">Color Theme</h4>
            <p className="text-gray-500">Switch between Light and Dynamic Dark Glassmorphism Mode</p>
          </div>
          <ThemeToggle />
        </div>

        {/* Voice Readout default */}
        <div className="flex items-center justify-between pb-4 border-b border-gray-200 dark:border-gray-800">
          <div>
            <h4 className="font-bold text-sm text-gray-900 dark:text-white">Voice Speech Synthesis</h4>
            <p className="text-gray-500">Automatically speak out calculation output results</p>
          </div>
          <input type="checkbox" defaultChecked className="rounded text-brand-600 w-4 h-4" />
        </div>

        {/* Save History */}
        <div className="flex items-center justify-between">
          <div>
            <h4 className="font-bold text-sm text-gray-900 dark:text-white">Auto-Save History</h4>
            <p className="text-gray-500">Store every calculation to cloud & local database automatically</p>
          </div>
          <input type="checkbox" defaultChecked className="rounded text-brand-600 w-4 h-4" />
        </div>

      </div>
    </div>
  );
};
