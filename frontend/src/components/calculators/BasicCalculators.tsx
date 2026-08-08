import React, { useState } from 'react';
import { useCalculatorContext } from '../../context/CalculatorContext';
import { ExportButtons } from '../common/ExportButtons';
import { AIStepExplainer } from '../ai/AIStepExplainer';
import { Calculator as CalcIcon, RefreshCw, Equal } from 'lucide-react';

// --- 1. Basic Calculator ---
export const BasicCalculatorView: React.FC = () => {
  const [display, setDisplay] = useState('0');
  const [equation, setEquation] = useState('');
  const { addHistoryItem } = useCalculatorContext();

  const handleBtn = (val: string) => {
    if (val === 'C') {
      setDisplay('0');
      setEquation('');
      return;
    }
    if (val === '=') {
      try {
        const sanitized = display.replace(/×/g, '*').replace(/÷/g, '/');
        // Safe evaluation for basic math
        const res = eval(sanitized);
        setEquation(`${display} =`);
        setDisplay(String(res));

        addHistoryItem({
          calculatorSlug: 'basic-calculator',
          calculatorTitle: 'Basic Calculator',
          category: 'Basic',
          inputs: { Expression: display },
          results: { Result: res },
          formattedSummary: `${display} = ${res}`,
        });
      } catch (e) {
        setDisplay('Error');
      }
      return;
    }

    if (display === '0' || display === 'Error') {
      setDisplay(val);
    } else {
      setDisplay(prev => prev + val);
    }
  };

  const keys = [
    'C', '(', ')', '÷',
    '7', '8', '9', '×',
    '4', '5', '6', '-',
    '1', '2', '3', '+',
    '0', '.', '%', '='
  ];

  return (
    <div className="max-w-xl mx-auto glass-card p-6">
      <div className="mb-4 bg-gray-900 text-white rounded-2xl p-4 text-right shadow-inner">
        <div className="text-xs text-gray-400 h-5 font-mono">{equation}</div>
        <div className="text-3xl sm:text-4xl font-black font-mono tracking-wider truncate">{display}</div>
      </div>

      <div className="grid grid-cols-4 gap-3">
        {keys.map((k) => (
          <button
            key={k}
            onClick={() => handleBtn(k)}
            className={`py-3.5 rounded-xl font-extrabold text-lg transition-all shadow-md active:scale-95 ${
              k === '='
                ? 'bg-brand-600 text-white hover:bg-brand-500 col-span-1'
                : k === 'C'
                ? 'bg-rose-500/20 text-rose-500 hover:bg-rose-500/30'
                : ['÷', '×', '-', '+', '%'].includes(k)
                ? 'bg-accent-500/20 text-accent-600 dark:text-accent-400 hover:bg-accent-500/30'
                : 'bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-700'
            }`}
          >
            {k}
          </button>
        ))}
      </div>

      <div className="mt-6 pt-4 border-t border-gray-200 dark:border-gray-800">
        <ExportButtons
          calculatorTitle="Basic Calculator"
          inputs={{ Expression: equation || display }}
          results={{ Output: display }}
        />
      </div>
    </div>
  );
};

// --- 2. Scientific Calculator ---
export const ScientificCalculatorView: React.FC = () => {
  const [expr, setExpr] = useState('');
  const [result, setResult] = useState<string | number>('0');
  const { addHistoryItem } = useCalculatorContext();

  const append = (v: string) => setExpr(prev => prev + v);

  const calculate = () => {
    try {
      let evalExpr = expr
        .replace(/sin/g, 'Math.sin')
        .replace(/cos/g, 'Math.cos')
        .replace(/tan/g, 'Math.tan')
        .replace(/sqrt/g, 'Math.sqrt')
        .replace(/log/g, 'Math.log10')
        .replace(/ln/g, 'Math.log')
        .replace(/π/g, 'Math.PI')
        .replace(/e/g, 'Math.E')
        .replace(/\^/g, '**');

      const res = eval(evalExpr);
      setResult(res);

      addHistoryItem({
        calculatorSlug: 'scientific-calculator',
        calculatorTitle: 'Scientific Calculator',
        category: 'Basic',
        inputs: { Formula: expr },
        results: { Output: res },
        formattedSummary: `${expr} = ${res}`,
      });
    } catch (e) {
      setResult('Invalid Expression');
    }
  };

  const scikeys = [
    'sin(', 'cos(', 'tan(', 'sqrt(',
    'log(', 'ln(', 'π', 'e',
    '(', ')', '^', '/',
    '7', '8', '9', '*',
    '4', '5', '6', '-',
    '1', '2', '3', '+',
    '0', '.', 'C', '='
  ];

  return (
    <div className="max-w-2xl mx-auto glass-card p-6">
      <div className="mb-4 bg-[#0F172A] text-white rounded-2xl p-5 shadow-inner">
        <input
          type="text"
          value={expr}
          onChange={(e) => setExpr(e.target.value)}
          placeholder="Enter equation (e.g. sin(30) + sqrt(16))"
          className="w-full bg-transparent text-sm text-gray-300 font-mono outline-none border-b border-gray-700 pb-2 mb-2"
        />
        <div className="text-3xl font-black font-mono text-emerald-400 text-right truncate">
          = {result}
        </div>
      </div>

      <div className="grid grid-cols-4 sm:grid-cols-7 gap-2">
        {scikeys.map((k) => (
          <button
            key={k}
            onClick={() => {
              if (k === 'C') { setExpr(''); setResult('0'); }
              else if (k === '=') calculate();
              else append(k);
            }}
            className={`py-3 rounded-xl font-mono text-xs font-bold transition-all shadow-sm ${
              k === '='
                ? 'bg-brand-600 text-white sm:col-span-2'
                : k === 'C'
                ? 'bg-rose-500/20 text-rose-500'
                : 'bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white hover:bg-brand-500/20'
            }`}
          >
            {k}
          </button>
        ))}
      </div>

      <AIStepExplainer
        calculatorTitle="Scientific Calculator"
        formula={expr || 'f(x)'}
        inputs={{ MathExpression: expr }}
        results={{ EvaluatedOutput: result }}
      />
    </div>
  );
};

// --- 3. Percentage Calculator ---
export const PercentageCalculatorView: React.FC = () => {
  const [valX, setValX] = useState<number>(15);
  const [valY, setValY] = useState<number>(200);
  const { addHistoryItem } = useCalculatorContext();

  const percentageOf = (valX * valY) / 100;
  const isWhatPercent = valY !== 0 ? (valX / valY) * 100 : 0;

  return (
    <div className="max-w-2xl mx-auto glass-card p-6 space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-bold mb-1">X (Value / Percentage)</label>
          <input
            type="number"
            value={valX}
            onChange={(e) => setValX(Number(e.target.value))}
            className="w-full glass-input"
          />
        </div>
        <div>
          <label className="block text-xs font-bold mb-1">Y (Total / Base)</label>
          <input
            type="number"
            value={valY}
            onChange={(e) => setValY(Number(e.target.value))}
            className="w-full glass-input"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="p-4 rounded-2xl bg-brand-50 dark:bg-brand-950/40 border border-brand-200 dark:border-brand-800">
          <span className="text-xs text-brand-600 dark:text-brand-400 font-bold block mb-1">
            {valX}% of {valY} is:
          </span>
          <div className="text-3xl font-black text-brand-600 dark:text-brand-400">
            {percentageOf.toFixed(2)}
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-accent-50 dark:bg-accent-950/40 border border-accent-200 dark:border-accent-800">
          <span className="text-xs text-accent-600 dark:text-accent-400 font-bold block mb-1">
            {valX} is what % of {valY}?
          </span>
          <div className="text-3xl font-black text-accent-600 dark:text-accent-400">
            {isWhatPercent.toFixed(2)}%
          </div>
        </div>
      </div>

      <ExportButtons
        calculatorTitle="Percentage Calculator"
        inputs={{ X: valX, Y: valY }}
        results={{ PercentageOf: percentageOf, IsWhatPercent: `${isWhatPercent.toFixed(2)}%` }}
      />
    </div>
  );
};

// --- 4. Average Calculator ---
export const AverageCalculatorView: React.FC = () => {
  const [numbersText, setNumbersText] = useState('10, 25, 40, 85, 90');

  const numbers = numbersText
    .split(/[\s,]+/)
    .map(Number)
    .filter(n => !isNaN(n));

  const count = numbers.length;
  const sum = numbers.reduce((a, b) => a + b, 0);
  const mean = count > 0 ? sum / count : 0;

  const sorted = [...numbers].sort((a, b) => a - b);
  const median = count > 0
    ? count % 2 === 0
      ? (sorted[count / 2 - 1] + sorted[count / 2]) / 2
      : sorted[Math.floor(count / 2)]
    : 0;

  const min = count > 0 ? Math.min(...numbers) : 0;
  const max = count > 0 ? Math.max(...numbers) : 0;

  return (
    <div className="max-w-2xl mx-auto glass-card p-6 space-y-6">
      <div>
        <label className="block text-xs font-bold mb-1">Enter Numbers (comma or space separated)</label>
        <textarea
          rows={3}
          value={numbersText}
          onChange={(e) => setNumbersText(e.target.value)}
          className="w-full glass-input font-mono"
        />
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="p-3 rounded-xl bg-gray-100 dark:bg-gray-800 text-center">
          <span className="text-[10px] text-gray-500 font-bold block">Count</span>
          <span className="text-xl font-bold text-gray-900 dark:text-white">{count}</span>
        </div>
        <div className="p-3 rounded-xl bg-gray-100 dark:bg-gray-800 text-center">
          <span className="text-[10px] text-gray-500 font-bold block">Sum</span>
          <span className="text-xl font-bold text-gray-900 dark:text-white">{sum}</span>
        </div>
        <div className="p-3 rounded-xl bg-brand-500 text-white text-center shadow-lg">
          <span className="text-[10px] text-white/80 font-bold block">Mean (Average)</span>
          <span className="text-xl font-bold">{mean.toFixed(2)}</span>
        </div>
        <div className="p-3 rounded-xl bg-gray-100 dark:bg-gray-800 text-center">
          <span className="text-[10px] text-gray-500 font-bold block">Median</span>
          <span className="text-xl font-bold text-gray-900 dark:text-white">{median}</span>
        </div>
      </div>
    </div>
  );
};

// --- 5. Ratio Calculator ---
export const RatioCalculatorView: React.FC = () => {
  const [valA, setValA] = useState<number>(4);
  const [valB, setValB] = useState<number>(8);
  const [valC, setValC] = useState<number>(12);

  const valD = valA !== 0 ? (valB * valC) / valA : 0;

  return (
    <div className="max-w-2xl mx-auto glass-card p-6 space-y-6">
      <h3 className="text-sm font-bold text-gray-500 uppercase tracking-wider">Solve Proportion: A : B = C : D</h3>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 items-center">
        <div>
          <label className="block text-xs font-bold mb-1">A</label>
          <input type="number" value={valA} onChange={(e) => setValA(Number(e.target.value))} className="w-full glass-input" />
        </div>
        <div>
          <label className="block text-xs font-bold mb-1">B</label>
          <input type="number" value={valB} onChange={(e) => setValB(Number(e.target.value))} className="w-full glass-input" />
        </div>
        <div>
          <label className="block text-xs font-bold mb-1">C</label>
          <input type="number" value={valC} onChange={(e) => setValC(Number(e.target.value))} className="w-full glass-input" />
        </div>
        <div className="p-3 rounded-2xl bg-brand-600 text-white text-center shadow-lg">
          <span className="text-[10px] text-white/80 font-bold block">Result D</span>
          <span className="text-2xl font-black">{valD.toFixed(2)}</span>
        </div>
      </div>
    </div>
  );
};
