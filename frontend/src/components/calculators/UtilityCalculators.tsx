import React, { useState } from 'react';
import { Copy, RefreshCw, Check } from 'lucide-react';

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

// --- 3. QR Scanner View ---
export const QRScannerView: React.FC = () => {
  const [scannedResult, setScannedResult] = useState<string>('https://calchub-ai.com/demo');

  return (
    <div className="max-w-md mx-auto glass-card p-6 text-center space-y-6">
      <div className="h-48 rounded-2xl border-2 border-dashed border-gray-400 dark:border-gray-700 flex flex-col items-center justify-center p-4 space-y-2">
        <span className="text-sm font-bold text-gray-600 dark:text-gray-300">Scan QR Code via Camera / Image</span>
        <button onClick={() => setScannedResult('https://calchub-ai.com/result_' + Math.floor(Math.random()*1000))} className="px-4 py-2 rounded-xl bg-brand-600 text-white text-xs font-bold shadow">
          Simulate Camera Scan
        </button>
      </div>

      <div className="p-4 rounded-xl bg-gray-100 dark:bg-gray-800 text-left space-y-1">
        <span className="text-[10px] font-bold text-gray-500 uppercase block">Scanned Output</span>
        <div className="font-mono text-xs text-brand-600 dark:text-brand-400 font-bold truncate">{scannedResult}</div>
      </div>
    </div>
  );
};

// --- 4. Random Number Generator ---
export const RandomNumberGeneratorView: React.FC = () => {
  const [min, setMin] = useState<number>(1);
  const [max, setMax] = useState<number>(100);
  const [randomVal, setRandomVal] = useState<number>(42);
  const [coinState, setCoinState] = useState<'Heads' | 'Tails'>('Heads');

  const generateRandom = () => {
    const res = Math.floor(Math.random() * (max - min + 1)) + min;
    setRandomVal(res);
  };

  const flipCoin = () => {
    setCoinState(Math.random() > 0.5 ? 'Heads' : 'Tails');
  };

  return (
    <div className="max-w-2xl mx-auto glass-card p-6 space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-bold mb-1">Min Value</label>
          <input type="number" value={min} onChange={(e) => setMin(Number(e.target.value))} className="w-full glass-input" />
        </div>
        <div>
          <label className="block text-xs font-bold mb-1">Max Value</label>
          <input type="number" value={max} onChange={(e) => setMax(Number(e.target.value))} className="w-full glass-input" />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 text-center">
        <div className="p-6 rounded-2xl bg-brand-600 text-white shadow-xl space-y-2">
          <span className="text-xs uppercase font-bold text-white/80 block">Random Number</span>
          <div className="text-4xl font-black">{randomVal}</div>
          <button onClick={generateRandom} className="px-4 py-1.5 rounded-xl bg-white/20 hover:bg-white/30 text-xs font-bold transition-all">
            Generate New
          </button>
        </div>

        <div className="p-6 rounded-2xl bg-indigo-600 text-white shadow-xl space-y-2">
          <span className="text-xs uppercase font-bold text-white/80 block">Coin Flipper</span>
          <div className="text-4xl font-black">{coinState}</div>
          <button onClick={flipCoin} className="px-4 py-1.5 rounded-xl bg-white/20 hover:bg-white/30 text-xs font-bold transition-all">
            Flip Coin 🪙
          </button>
        </div>
      </div>
    </div>
  );
};
