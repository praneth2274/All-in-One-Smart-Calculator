import React, { useState } from 'react';
import { PageHeader } from '../components/layout/PageHeader';
import { Mail, Send, Check } from 'lucide-react';
import API from '../services/api';

export const ContactPage: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [sent, setSent] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await API.post('/admin/feedback', { name, email, message });
    } catch (e) {}
    setSent(true);
  };

  return (
    <div className="max-w-xl mx-auto space-y-6">
      <PageHeader
        title="Contact & Feedback"
        description="Send inquiries, bug reports, or project feedback directly to the team."
        badge="Help & Support"
      />

      <div className="glass-card p-6">
        {sent ? (
          <div className="py-12 text-center space-y-3">
            <div className="w-12 h-12 rounded-full bg-emerald-500 text-white flex items-center justify-center mx-auto">
              <Check className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-gray-900 dark:text-white">Message Sent Successfully!</h3>
            <p className="text-xs text-gray-500">Thank you for reaching out to the CalcHub AI team.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4 text-xs">
            <div>
              <label className="block font-bold mb-1">Your Name</label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full glass-input"
              />
            </div>

            <div>
              <label className="block font-bold mb-1">Email Address</label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full glass-input"
              />
            </div>

            <div>
              <label className="block font-bold mb-1">Message / Feedback</label>
              <textarea
                required
                rows={4}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="w-full glass-input"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 rounded-xl bg-brand-600 hover:bg-brand-500 text-white font-extrabold text-xs shadow-lg transition-all flex items-center justify-center gap-2"
            >
              <Send className="w-4 h-4" /> Submit Message
            </button>
          </form>
        )}
      </div>
    </div>
  );
};
