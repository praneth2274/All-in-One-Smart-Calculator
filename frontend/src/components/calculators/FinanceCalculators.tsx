import React, { useState } from 'react';
import { ResponsiveContainer, PieChart, Pie, Cell, AreaChart, Area, XAxis, YAxis, Tooltip } from 'recharts';
import { ExportButtons } from '../common/ExportButtons';
import { AIStepExplainer } from '../ai/AIStepExplainer';
import { useCalculatorContext } from '../../context/CalculatorContext';
import { Landmark, TrendingUp, DollarSign, Receipt, Briefcase, Globe } from 'lucide-react';

// --- 1. EMI Calculator ---
export const EMICalculatorView: React.FC = () => {
  const [loanAmount, setLoanAmount] = useState<number>(500000);
  const [interestRate, setInterestRate] = useState<number>(8.5);
  const [tenureYears, setTenureYears] = useState<number>(5);
  const { addHistoryItem } = useCalculatorContext();

  const monthlyRate = interestRate / 12 / 100;
  const totalMonths = tenureYears * 12;

  const emi = monthlyRate > 0
    ? (loanAmount * monthlyRate * Math.pow(1 + monthlyRate, totalMonths)) /
      (Math.pow(1 + monthlyRate, totalMonths) - 1)
    : loanAmount / totalMonths;

  const totalPayment = emi * totalMonths;
  const totalInterest = totalPayment - loanAmount;

  const chartData = [
    { name: 'Principal Loan', value: loanAmount, color: '#3B82F6' },
    { name: 'Total Interest', value: totalInterest, color: '#8B5CF6' },
  ];

  return (
    <div className="max-w-4xl mx-auto glass-card p-6 space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        
        {/* Inputs */}
        <div className="space-y-5">
          <div>
            <div className="flex justify-between text-xs font-bold mb-1">
              <span>Loan Amount</span>
              <span className="text-brand-600 dark:text-brand-400">₹{loanAmount.toLocaleString()}</span>
            </div>
            <input
              type="range" min={50000} max={10000000} step={50000}
              value={loanAmount} onChange={(e) => setLoanAmount(Number(e.target.value))}
              className="w-full accent-brand-500"
            />
          </div>

          <div>
            <div className="flex justify-between text-xs font-bold mb-1">
              <span>Interest Rate (% p.a.)</span>
              <span className="text-brand-600 dark:text-brand-400">{interestRate}%</span>
            </div>
            <input
              type="range" min={1} max={25} step={0.1}
              value={interestRate} onChange={(e) => setInterestRate(Number(e.target.value))}
              className="w-full accent-brand-500"
            />
          </div>

          <div>
            <div className="flex justify-between text-xs font-bold mb-1">
              <span>Tenure (Years)</span>
              <span className="text-brand-600 dark:text-brand-400">{tenureYears} Years</span>
            </div>
            <input
              type="range" min={1} max={30} step={1}
              value={tenureYears} onChange={(e) => setTenureYears(Number(e.target.value))}
              className="w-full accent-brand-500"
            />
          </div>
        </div>

        {/* Results Card */}
        <div className="p-6 rounded-3xl bg-gradient-to-br from-brand-600 to-indigo-600 text-white shadow-xl flex flex-col justify-between">
          <div>
            <span className="text-xs uppercase font-bold tracking-wider text-white/80">Monthly EMI</span>
            <div className="text-4xl font-black mt-1">₹{Math.round(emi).toLocaleString()}</div>
          </div>

          <div className="grid grid-cols-2 gap-4 mt-6 pt-6 border-t border-white/20 text-xs">
            <div>
              <span className="text-white/70 block">Total Interest</span>
              <span className="text-lg font-bold">₹{Math.round(totalInterest).toLocaleString()}</span>
            </div>
            <div>
              <span className="text-white/70 block">Total Amount</span>
              <span className="text-lg font-bold">₹{Math.round(totalPayment).toLocaleString()}</span>
            </div>
          </div>
        </div>

      </div>

      {/* Pie Chart */}
      <div className="h-64 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie data={chartData} dataKey="value" cx="50%" cy="50%" innerRadius={60} outerRadius={80} paddingAngle={5}>
              {chartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip formatter={(value: any) => `₹${Math.round(value).toLocaleString()}`} />
          </PieChart>
        </ResponsiveContainer>
      </div>

      <ExportButtons
        calculatorTitle="EMI Calculator"
        inputs={{ LoanAmount: `₹${loanAmount}`, InterestRate: `${interestRate}%`, Tenure: `${tenureYears} Yrs` }}
        results={{ MonthlyEMI: `₹${Math.round(emi)}`, TotalInterest: `₹${Math.round(totalInterest)}`, TotalPayment: `₹${Math.round(totalPayment)}` }}
      />
    </div>
  );
};

// --- 2. SIP Calculator ---
export const SIPCalculatorView: React.FC = () => {
  const [monthlyInvestment, setMonthlyInvestment] = useState<number>(5000);
  const [expectedReturn, setExpectedReturn] = useState<number>(12);
  const [timePeriod, setTimePeriod] = useState<number>(10);

  const i = expectedReturn / 12 / 100;
  const n = timePeriod * 12;

  const totalInvested = monthlyInvestment * n;
  const maturityValue = monthlyInvestment * ((Math.pow(1 + i, n) - 1) / i) * (1 + i);
  const estReturns = maturityValue - totalInvested;

  return (
    <div className="max-w-4xl mx-auto glass-card p-6 space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div>
          <label className="block text-xs font-bold mb-1">Monthly Investment</label>
          <input type="number" value={monthlyInvestment} onChange={(e) => setMonthlyInvestment(Number(e.target.value))} className="w-full glass-input" />
        </div>
        <div>
          <label className="block text-xs font-bold mb-1">Expected Return (% p.a.)</label>
          <input type="number" value={expectedReturn} onChange={(e) => setExpectedReturn(Number(e.target.value))} className="w-full glass-input" />
        </div>
        <div>
          <label className="block text-xs font-bold mb-1">Time Period (Years)</label>
          <input type="number" value={timePeriod} onChange={(e) => setTimePeriod(Number(e.target.value))} className="w-full glass-input" />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-4 rounded-2xl bg-gray-100 dark:bg-gray-800">
          <span className="text-xs text-gray-500 font-bold">Invested Amount</span>
          <div className="text-2xl font-bold text-gray-900 dark:text-white">₹{Math.round(totalInvested).toLocaleString()}</div>
        </div>
        <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-600 dark:text-emerald-400">
          <span className="text-xs font-bold">Est. Wealth Returns</span>
          <div className="text-2xl font-black">₹{Math.round(estReturns).toLocaleString()}</div>
        </div>
        <div className="p-4 rounded-2xl bg-brand-600 text-white shadow-lg">
          <span className="text-xs text-white/80 font-bold">Total Maturity Value</span>
          <div className="text-2xl font-black">₹{Math.round(maturityValue).toLocaleString()}</div>
        </div>
      </div>
    </div>
  );
};

// --- 3. GST Calculator ---
export const GSTCalculatorView: React.FC = () => {
  const [amount, setAmount] = useState<number>(10000);
  const [gstRate, setGstRate] = useState<number>(18);
  const [mode, setMode] = useState<'exclusive' | 'inclusive'>('exclusive');

  const gstAmount = mode === 'exclusive'
    ? (amount * gstRate) / 100
    : amount - amount * (100 / (100 + gstRate));

  const totalAmount = mode === 'exclusive' ? amount + gstAmount : amount;
  const netAmount = mode === 'exclusive' ? amount : amount - gstAmount;

  return (
    <div className="max-w-2xl mx-auto glass-card p-6 space-y-6">
      <div className="flex rounded-xl p-1 bg-gray-100 dark:bg-gray-800">
        <button
          onClick={() => setMode('exclusive')}
          className={`flex-1 py-2 rounded-lg text-xs font-bold transition-all ${mode === 'exclusive' ? 'bg-brand-600 text-white shadow' : 'text-gray-500'}`}
        >
          Add GST (Exclusive)
        </button>
        <button
          onClick={() => setMode('inclusive')}
          className={`flex-1 py-2 rounded-lg text-xs font-bold transition-all ${mode === 'inclusive' ? 'bg-brand-600 text-white shadow' : 'text-gray-500'}`}
        >
          Remove GST (Inclusive)
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-bold mb-1">Base Amount (₹)</label>
          <input type="number" value={amount} onChange={(e) => setAmount(Number(e.target.value))} className="w-full glass-input" />
        </div>
        <div>
          <label className="block text-xs font-bold mb-1">GST Rate (%)</label>
          <select value={gstRate} onChange={(e) => setGstRate(Number(e.target.value))} className="w-full glass-input">
            <option value={5}>5%</option>
            <option value={12}>12%</option>
            <option value={18}>18%</option>
            <option value={28}>28%</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-3">
        <div className="p-3 rounded-xl bg-gray-100 dark:bg-gray-800 text-center">
          <span className="text-[10px] text-gray-500 font-bold block">CGST ({gstRate/2}%)</span>
          <span className="text-lg font-bold">₹{(gstAmount / 2).toFixed(2)}</span>
        </div>
        <div className="p-3 rounded-xl bg-gray-100 dark:bg-gray-800 text-center">
          <span className="text-[10px] text-gray-500 font-bold block">SGST ({gstRate/2}%)</span>
          <span className="text-lg font-bold">₹{(gstAmount / 2).toFixed(2)}</span>
        </div>
        <div className="p-3 rounded-xl bg-brand-600 text-white text-center shadow-md">
          <span className="text-[10px] text-white/80 font-bold block">Total Amount</span>
          <span className="text-lg font-black">₹{totalAmount.toFixed(2)}</span>
        </div>
      </div>
    </div>
  );
};

// --- 4. Currency Converter ---
export const CurrencyConverterView: React.FC = () => {
  const [fromAmount, setFromAmount] = useState<number>(100);
  const [fromCurr, setFromCurr] = useState<string>('USD');
  const [toCurr, setToCurr] = useState<string>('INR');

  const rates: Record<string, number> = {
    USD: 1,
    INR: 83.25,
    EUR: 0.92,
    GBP: 0.79,
    JPY: 155.40,
    CAD: 1.36,
    AUD: 1.51,
  };

  const converted = (fromAmount / (rates[fromCurr] || 1)) * (rates[toCurr] || 1);

  return (
    <div className="max-w-2xl mx-auto glass-card p-6 space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 items-center">
        <div>
          <label className="block text-xs font-bold mb-1">Amount</label>
          <input type="number" value={fromAmount} onChange={(e) => setFromAmount(Number(e.target.value))} className="w-full glass-input" />
        </div>

        <div>
          <label className="block text-xs font-bold mb-1">From Currency</label>
          <select value={fromCurr} onChange={(e) => setFromCurr(e.target.value)} className="w-full glass-input">
            {Object.keys(rates).map(c => <option key={c} value={c}>{c}</option>)}
          </select>
        </div>

        <div>
          <label className="block text-xs font-bold mb-1">To Currency</label>
          <select value={toCurr} onChange={(e) => setToCurr(e.target.value)} className="w-full glass-input">
            {Object.keys(rates).map(c => <option key={c} value={c}>{c}</option>)}
          </select>
        </div>
      </div>

      <div className="p-6 rounded-2xl bg-gradient-to-r from-brand-600 to-accent-600 text-white text-center shadow-xl">
        <span className="text-xs uppercase font-bold text-white/80">Converted Exchange Value</span>
        <div className="text-4xl font-black mt-1">
          {converted.toLocaleString(undefined, { maximumFractionDigits: 2 })} {toCurr}
        </div>
      </div>
    </div>
  );
};
