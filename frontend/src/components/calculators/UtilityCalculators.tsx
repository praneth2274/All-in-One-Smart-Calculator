import React, { useState } from 'react';
import { KeyRound, QrCode, Dices, Copy, RefreshCw, Check } from 'lucide-react';

// --- 1. Password Generator ---
export const PasswordGeneratorView: React.FC = () => {
  const [length, setLength] = useState<number>(16);
  const [includeUpper, setIncludeUpper] = useState(true);
  const [includeLower, setIncludeLower] = useState(true);
  const [includeNumbers, setIncludeNumbers] = useState(true);
  const [includeSymbols, setIncludeSymbols] = useState(true);
  const [password, setPassword] = useState('k9#mP$7vW!2xL8@z');
  const [copied, setCopied] = useState(false);

  const generatePassword = () => {
    let chars = '';
    if (includeUpper) chars += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    if (includeLower) chars += 'abcdefghijklmnopqrstuvwxyz';
    if (includeNumbers) chars += '0123456789';
    if (includeSymbols) chars += '!@#$%^&*()_+-=[]{}|;:,.<>?';

    if (!chars) return;
    let res = '';
    for (let i = 0; i < length; i++) {
      res += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    setPassword(res);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(password);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="max-w-2xl mx-auto glass-card p-6 space-y-6">
      <div className="p-4 rounded-2xl bg-gray-900 text-white flex items-center justify-between shadow-inner">
        <span className="font-mono text-lg font-bold tracking-wider truncate">{password}</span>
        <div className="flex items-center gap-2">
          <button onClick={generatePassword} className="p-2 rounded-xl bg-gray-800 hover:bg-gray-700 text-brand-400">
            <RefreshCw className="w-5 h-5" />
          </button>
          <button onClick={copyToClipboard} className="p-2 rounded-xl bg-brand-600 hover:bg-brand-500 text-white">
            {copied ? <Check className="w-5 h-5" /> : <Copy className="w-5 h-5" />}
          </button>
        </div>
      </div>

      <div className="space-y-4">
        <div>
          <div className="flex justify-between text-xs font-bold mb-1">
            <span>Password Length</span>
            <span>{length} characters</span>
          </div>
          <input type="range" min={6} max={64} value={length} onChange={(e) => setLength(Number(e.target.value))} className="w-full accent-brand-500" />
        </div>

        <div className="grid grid-cols-2 gap-3 text-xs font-bold">
          <label className="flex items-center gap-2 p-3 rounded-xl bg-gray-50 dark:bg-gray-800 cursor-pointer">
            <input type="checkbox" checked={includeUpper} onChange={(e) => setIncludeUpper(e.target.checked)} className="rounded text-brand-600" />
            <span>Uppercase (A-Z)</span>
          </label>
          <label className="flex items-center gap-2 p-3 rounded-xl bg-gray-50 dark:bg-gray-800 cursor-pointer">
            <input type="checkbox" checked={includeLower} onChange={(e) => setIncludeLower(e.target.checked)} className="rounded text-brand-600" />
            <span>Lowercase (a-z)</span>
          </label>
          <label className="flex items-center gap-2 p-3 rounded-xl bg-gray-50 dark:bg-gray-800 cursor-pointer">
            <input type="checkbox" checked={includeNumbers} onChange={(e) => setIncludeNumbers(e.target.checked)} className="rounded text-brand-600" />
            <span>Numbers (0-9)</span>
          </label>
          <label className="flex items-center gap-2 p-3 rounded-xl bg-gray-50 dark:bg-gray-800 cursor-pointer">
            <input type="checkbox" checked={includeSymbols} onChange={(e) => setIncludeSymbols(e.target.checked)} className="rounded text-brand-600" />
            <span>Symbols (!@#$)</span>
          </label>
        </div>
      </div>
    </div>
  );
};

// --- 2. QR Code Generator ---
export const QRCodeGeneratorView: React.FC = () => {
  const [text, setText] = useState('https://calchub-ai.com');

  const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(text)}`;

  return (
    <div className="max-w-md mx-auto glass-card p-6 text-center space-y-6">
      <div>
        <label className="block text-xs font-bold mb-1 text-left">URL or Text to encode</label>
        <input type="text" value={text} onChange={(e) => setText(e.target.value)} className="w-full glass-input" />
      </div>

      <div className="w-56 h-56 mx-auto p-4 rounded-2xl bg-white border border-gray-200 shadow-xl flex items-center justify-center">
        <img src={qrUrl} alt="QR Code" className="w-full h-full object-contain" />
      </div>

      <a href={qrUrl} download="qr_code.png" target="_blank" rel="noreferrer" className="inline-block w-full py-3 rounded-xl bg-brand-600 text-white font-bold text-sm shadow-lg hover:bg-brand-500 transition-colors">
        Download QR Image
      </a>
    </div>
  );
};
