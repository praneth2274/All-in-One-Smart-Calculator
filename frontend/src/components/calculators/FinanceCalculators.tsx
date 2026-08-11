import React, { useState } from 'react';
import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip } from 'recharts';
import { ExportButtons } from '../common/ExportButtons';
import { AIStepExplainer } from '../ai/AIStepExplainer';
import { useCalculatorContext } from '../../context/CalculatorContext';

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

// --- 2. Loan Eligibility Calculator ---
export const LoanEligibilityView: React.FC = () => {
  const [monthlyIncome, setMonthlyIncome] = useState<number>(75000);
  const [existingEMI, setExistingEMI] = useState<number>(10000);
  const [interestRate, setInterestRate] = useState<number>(8.5);
  const [tenureYears, setTenureYears] = useState<number>(20);

  const maxAffordableEMI = (monthlyIncome * 0.5) - existingEMI;
  const availableEMI = Math.max(0, maxAffordableEMI);
  const monthlyRate = interestRate / 12 / 100;
  const totalMonths = tenureYears * 12;

  const eligibleLoan = monthlyRate > 0
    ? (availableEMI * (Math.pow(1 + monthlyRate, totalMonths) - 1)) / (monthlyRate * Math.pow(1 + monthlyRate, totalMonths))
    : availableEMI * totalMonths;

  return (
    <div className="max-w-4xl mx-auto glass-card p-6 space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-bold mb-1">Monthly Gross Income (₹)</label>
          <input type="number" value={monthlyIncome} onChange={(e) => setMonthlyIncome(Number(e.target.value))} className="w-full glass-input" />
        </div>
        <div>
          <label className="block text-xs font-bold mb-1">Existing Monthly EMIs (₹)</label>
          <input type="number" value={existingEMI} onChange={(e) => setExistingEMI(Number(e.target.value))} className="w-full glass-input" />
        </div>
        <div>
          <label className="block text-xs font-bold mb-1">Expected Interest Rate (%)</label>
          <input type="number" value={interestRate} onChange={(e) => setInterestRate(Number(e.target.value))} className="w-full glass-input" />
        </div>
        <div>
          <label className="block text-xs font-bold mb-1">Desired Tenure (Years)</label>
          <input type="number" value={tenureYears} onChange={(e) => setTenureYears(Number(e.target.value))} className="w-full glass-input" />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="p-4 rounded-2xl bg-gray-100 dark:bg-gray-800">
          <span className="text-xs text-gray-500 font-bold block">Max Affordable Monthly EMI</span>
          <span className="text-2xl font-bold text-brand-600 dark:text-brand-400">₹{Math.round(availableEMI).toLocaleString()}</span>
        </div>
        <div className="p-5 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-xl">
          <span className="text-xs font-bold uppercase text-white/80 block">Maximum Eligible Loan Amount</span>
          <span className="text-3xl font-black">₹{Math.round(eligibleLoan).toLocaleString()}</span>
        </div>
      </div>
    </div>
  );
};

// --- 3. SIP Calculator ---
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
          <label className="block text-xs font-bold mb-1">Monthly Investment (₹)</label>
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

// --- 4. FD Calculator ---
export const FDCalculatorView: React.FC = () => {
  const [principal, setPrincipal] = useState<number>(100000);
  const [interestRate, setInterestRate] = useState<number>(7.5);
  const [tenureYears, setTenureYears] = useState<number>(5);
  const [compounding, setCompounding] = useState<number>(4); // Quarterly

  const r = interestRate / 100;
  const n = compounding;
  const t = tenureYears;
  const maturityValue = principal * Math.pow(1 + r / n, n * t);
  const interestEarned = maturityValue - principal;

  return (
    <div className="max-w-2xl mx-auto glass-card p-6 space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-bold mb-1">Deposit Principal (₹)</label>
          <input type="number" value={principal} onChange={(e) => setPrincipal(Number(e.target.value))} className="w-full glass-input" />
        </div>
        <div>
          <label className="block text-xs font-bold mb-1">Interest Rate (% p.a.)</label>
          <input type="number" value={interestRate} onChange={(e) => setInterestRate(Number(e.target.value))} className="w-full glass-input" />
        </div>
        <div>
          <label className="block text-xs font-bold mb-1">Tenure (Years)</label>
          <input type="number" value={tenureYears} onChange={(e) => setTenureYears(Number(e.target.value))} className="w-full glass-input" />
        </div>
        <div>
          <label className="block text-xs font-bold mb-1">Compounding Frequency</label>
          <select value={compounding} onChange={(e) => setCompounding(Number(e.target.value))} className="w-full glass-input">
            <option value={1}>Yearly</option>
            <option value={2}>Half-Yearly</option>
            <option value={4}>Quarterly</option>
            <option value={12}>Monthly</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="p-4 rounded-2xl bg-gray-100 dark:bg-gray-800">
          <span className="text-xs text-gray-500 font-bold block">Interest Earned</span>
          <span className="text-xl font-bold text-emerald-600 dark:text-emerald-400">₹{Math.round(interestEarned).toLocaleString()}</span>
        </div>
        <div className="p-4 rounded-2xl bg-brand-600 text-white shadow-lg">
          <span className="text-xs text-white/80 font-bold block">Maturity Amount</span>
          <span className="text-2xl font-black">₹{Math.round(maturityValue).toLocaleString()}</span>
        </div>
      </div>
    </div>
  );
};

// --- 5. RD Calculator ---
export const RDCalculatorView: React.FC = () => {
  const [monthlyDeposit, setMonthlyDeposit] = useState<number>(2000);
  const [interestRate, setInterestRate] = useState<number>(7.0);
  const [months, setMonths] = useState<number>(36);

  const n = months;
  const r = interestRate / 100;
  let totalInvested = monthlyDeposit * n;
  let maturityValue = 0;
  for (let i = 1; i <= n; i++) {
    const t = (n - i + 1) / 12;
    maturityValue += monthlyDeposit * Math.pow(1 + r / 4, 4 * t);
  }

  return (
    <div className="max-w-2xl mx-auto glass-card p-6 space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div>
          <label className="block text-xs font-bold mb-1">Monthly Deposit (₹)</label>
          <input type="number" value={monthlyDeposit} onChange={(e) => setMonthlyDeposit(Number(e.target.value))} className="w-full glass-input" />
        </div>
        <div>
          <label className="block text-xs font-bold mb-1">Interest Rate (%)</label>
          <input type="number" value={interestRate} onChange={(e) => setInterestRate(Number(e.target.value))} className="w-full glass-input" />
        </div>
        <div>
          <label className="block text-xs font-bold mb-1">Tenure (Months)</label>
          <input type="number" value={months} onChange={(e) => setMonths(Number(e.target.value))} className="w-full glass-input" />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="p-4 rounded-2xl bg-gray-100 dark:bg-gray-800">
          <span className="text-xs text-gray-500 font-bold block">Total Deposited</span>
          <span className="text-xl font-bold">₹{Math.round(totalInvested).toLocaleString()}</span>
        </div>
        <div className="p-4 rounded-2xl bg-indigo-600 text-white shadow-lg">
          <span className="text-xs text-white/80 font-bold block">RD Maturity Value</span>
          <span className="text-2xl font-black">₹{Math.round(maturityValue).toLocaleString()}</span>
        </div>
      </div>
    </div>
  );
};

// --- 6. Simple Interest ---
export const SimpleInterestView: React.FC = () => {
  const [principal, setPrincipal] = useState<number>(50000);
  const [rate, setRate] = useState<number>(6.5);
  const [time, setTime] = useState<number>(3);

  const interest = (principal * rate * time) / 100;
  const total = principal + interest;

  return (
    <div className="max-w-2xl mx-auto glass-card p-6 space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div>
          <label className="block text-xs font-bold mb-1">Principal (₹)</label>
          <input type="number" value={principal} onChange={(e) => setPrincipal(Number(e.target.value))} className="w-full glass-input" />
        </div>
        <div>
          <label className="block text-xs font-bold mb-1">Rate (% p.a.)</label>
          <input type="number" value={rate} onChange={(e) => setRate(Number(e.target.value))} className="w-full glass-input" />
        </div>
        <div>
          <label className="block text-xs font-bold mb-1">Time (Years)</label>
          <input type="number" value={time} onChange={(e) => setTime(Number(e.target.value))} className="w-full glass-input" />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="p-4 rounded-2xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
          <span className="text-xs font-bold block">Simple Interest</span>
          <span className="text-2xl font-black">₹{interest.toFixed(2)}</span>
        </div>
        <div className="p-4 rounded-2xl bg-brand-600 text-white shadow-lg">
          <span className="text-xs text-white/80 font-bold block">Total Amount</span>
          <span className="text-2xl font-black">₹{total.toFixed(2)}</span>
        </div>
      </div>
    </div>
  );
};

// --- 7. Compound Interest ---
export const CompoundInterestView: React.FC = () => {
  const [principal, setPrincipal] = useState<number>(50000);
  const [rate, setRate] = useState<number>(8.0);
  const [time, setTime] = useState<number>(5);
  const [frequency, setFrequency] = useState<number>(1);

  const amount = principal * Math.pow(1 + (rate / 100) / frequency, frequency * time);
  const interest = amount - principal;

  return (
    <div className="max-w-2xl mx-auto glass-card p-6 space-y-6">
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div>
          <label className="block text-xs font-bold mb-1">Principal</label>
          <input type="number" value={principal} onChange={(e) => setPrincipal(Number(e.target.value))} className="w-full glass-input" />
        </div>
        <div>
          <label className="block text-xs font-bold mb-1">Rate (% p.a.)</label>
          <input type="number" value={rate} onChange={(e) => setRate(Number(e.target.value))} className="w-full glass-input" />
        </div>
        <div>
          <label className="block text-xs font-bold mb-1">Years</label>
          <input type="number" value={time} onChange={(e) => setTime(Number(e.target.value))} className="w-full glass-input" />
        </div>
        <div>
          <label className="block text-xs font-bold mb-1">Frequency</label>
          <select value={frequency} onChange={(e) => setFrequency(Number(e.target.value))} className="w-full glass-input">
            <option value={1}>Annual</option>
            <option value={2}>Semi-Annual</option>
            <option value={4}>Quarterly</option>
            <option value={12}>Monthly</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="p-4 rounded-2xl bg-amber-500/10 text-amber-600 dark:text-amber-400">
          <span className="text-xs font-bold block">Compound Interest</span>
          <span className="text-2xl font-black">₹{interest.toFixed(2)}</span>
        </div>
        <div className="p-4 rounded-2xl bg-brand-600 text-white shadow-lg">
          <span className="text-xs text-white/80 font-bold block">Final Balance</span>
          <span className="text-2xl font-black">₹{amount.toFixed(2)}</span>
        </div>
      </div>
    </div>
  );
};

// --- 8. GST Calculator ---
export const GSTCalculatorView: React.FC = () => {
  const [amount, setAmount] = useState<number>(10000);
  const [gstRate, setGstRate] = useState<number>(18);
  const [mode, setMode] = useState<'exclusive' | 'inclusive'>('exclusive');

  const gstAmount = mode === 'exclusive'
    ? (amount * gstRate) / 100
    : amount - amount * (100 / (100 + gstRate));

  const totalAmount = mode === 'exclusive' ? amount + gstAmount : amount;

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

// --- 9. Income Tax Calculator ---
export const IncomeTaxView: React.FC = () => {
  const [annualIncome, setAnnualIncome] = useState<number>(1200000);

  const computeNewRegimeTax = (income: number) => {
    let tax = 0;
    if (income > 300000) {
      if (income <= 600000) tax += (income - 300000) * 0.05;
      else tax += 300000 * 0.05;
    }
    if (income > 600000) {
      if (income <= 900000) tax += (income - 600000) * 0.10;
      else tax += 300000 * 0.10;
    }
    if (income > 900000) {
      if (income <= 1200000) tax += (income - 900000) * 0.15;
      else tax += 300000 * 0.15;
    }
    if (income > 1200000) {
      if (income <= 1500000) tax += (income - 1200000) * 0.20;
      else tax += 300000 * 0.20;
    }
    if (income > 1500000) {
      tax += (income - 1500000) * 0.30;
    }
    return tax;
  };

  const taxableNew = Math.max(0, annualIncome - 75000);
  const taxNew = computeNewRegimeTax(taxableNew);
  const cessNew = taxNew * 0.04;
  const totalTaxNew = taxNew + cessNew;

  return (
    <div className="max-w-2xl mx-auto glass-card p-6 space-y-6">
      <div>
        <label className="block text-xs font-bold mb-1">Annual Gross Income (CTC in ₹)</label>
        <input type="number" value={annualIncome} onChange={(e) => setAnnualIncome(Number(e.target.value))} className="w-full glass-input" />
      </div>

      <div className="p-6 rounded-2xl bg-gradient-to-r from-slate-900 to-indigo-950 text-white shadow-xl space-y-4">
        <div className="flex justify-between items-center border-b border-gray-700 pb-3">
          <span className="text-xs font-bold text-gray-300">New Tax Regime Liability</span>
          <span className="text-2xl font-black text-emerald-400">₹{Math.round(totalTaxNew).toLocaleString()}</span>
        </div>
        <div className="flex justify-between text-xs text-gray-400">
          <span>Standard Deduction</span>
          <span>₹75,000</span>
        </div>
        <div className="flex justify-between text-xs text-gray-400">
          <span>Health & Education Cess (4%)</span>
          <span>₹{Math.round(cessNew).toLocaleString()}</span>
        </div>
      </div>
    </div>
  );
};

// --- 10. Discount Calculator ---
export const DiscountCalculatorView: React.FC = () => {
  const [originalPrice, setOriginalPrice] = useState<number>(2999);
  const [discountPercent, setDiscountPercent] = useState<number>(25);

  const discountAmount = (originalPrice * discountPercent) / 100;
  const finalPrice = originalPrice - discountAmount;

  return (
    <div className="max-w-2xl mx-auto glass-card p-6 space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-bold mb-1">Original Price (₹)</label>
          <input type="number" value={originalPrice} onChange={(e) => setOriginalPrice(Number(e.target.value))} className="w-full glass-input" />
        </div>
        <div>
          <label className="block text-xs font-bold mb-1">Discount (%)</label>
          <input type="number" value={discountPercent} onChange={(e) => setDiscountPercent(Number(e.target.value))} className="w-full glass-input" />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="p-4 rounded-2xl bg-rose-500/10 text-rose-600 dark:text-rose-400">
          <span className="text-xs font-bold block">You Save</span>
          <span className="text-2xl font-black">₹{discountAmount.toFixed(2)}</span>
        </div>
        <div className="p-4 rounded-2xl bg-brand-600 text-white shadow-lg">
          <span className="text-xs text-white/80 font-bold block">Final Sale Price</span>
          <span className="text-2xl font-black">₹{finalPrice.toFixed(2)}</span>
        </div>
      </div>
    </div>
  );
};

// --- 11. Profit & Loss Calculator ---
export const ProfitLossView: React.FC = () => {
  const [costPrice, setCostPrice] = useState<number>(500);
  const [sellingPrice, setSellingPrice] = useState<number>(650);

  const diff = sellingPrice - costPrice;
  const isProfit = diff >= 0;
  const percent = costPrice > 0 ? (Math.abs(diff) / costPrice) * 100 : 0;

  return (
    <div className="max-w-2xl mx-auto glass-card p-6 space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-bold mb-1">Cost Price (CP)</label>
          <input type="number" value={costPrice} onChange={(e) => setCostPrice(Number(e.target.value))} className="w-full glass-input" />
        </div>
        <div>
          <label className="block text-xs font-bold mb-1">Selling Price (SP)</label>
          <input type="number" value={sellingPrice} onChange={(e) => setSellingPrice(Number(e.target.value))} className="w-full glass-input" />
        </div>
      </div>

      <div className={`p-6 rounded-2xl text-center shadow-lg ${isProfit ? 'bg-emerald-600 text-white' : 'bg-rose-600 text-white'}`}>
        <span className="text-xs font-bold uppercase tracking-wider">{isProfit ? 'Profit Amount' : 'Loss Amount'}</span>
        <div className="text-4xl font-black mt-1">₹{Math.abs(diff).toFixed(2)}</div>
        <div className="text-sm font-semibold mt-1">{percent.toFixed(2)}% {isProfit ? 'Gain' : 'Loss'} Margin</div>
      </div>
    </div>
  );
};

// --- 12. Salary Calculator ---
export const SalaryCalculatorView: React.FC = () => {
  const [annualCTC, setAnnualCTC] = useState<number>(900000);
  const [pfPercent, setPfPercent] = useState<number>(12);

  const monthlyCTC = annualCTC / 12;
  const basicSalary = monthlyCTC * 0.5;
  const pfDeduction = basicSalary * (pfPercent / 100);
  const estMonthlyTax = monthlyCTC > 60000 ? (monthlyCTC - 60000) * 0.1 : 0;
  const takeHome = monthlyCTC - pfDeduction - estMonthlyTax;

  return (
    <div className="max-w-2xl mx-auto glass-card p-6 space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-bold mb-1">Annual CTC (₹)</label>
          <input type="number" value={annualCTC} onChange={(e) => setAnnualCTC(Number(e.target.value))} className="w-full glass-input" />
        </div>
        <div>
          <label className="block text-xs font-bold mb-1">PF Contribution (%)</label>
          <input type="number" value={pfPercent} onChange={(e) => setPfPercent(Number(e.target.value))} className="w-full glass-input" />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-center">
        <div className="p-4 rounded-2xl bg-gray-100 dark:bg-gray-800">
          <span className="text-[10px] text-gray-500 font-bold block">Gross Monthly CTC</span>
          <span className="text-lg font-bold">₹{Math.round(monthlyCTC).toLocaleString()}</span>
        </div>
        <div className="p-4 rounded-2xl bg-gray-100 dark:bg-gray-800">
          <span className="text-[10px] text-gray-500 font-bold block">PF + Tax Deductions</span>
          <span className="text-lg font-bold text-rose-500">₹{Math.round(pfDeduction + estMonthlyTax).toLocaleString()}</span>
        </div>
        <div className="p-4 rounded-2xl bg-brand-600 text-white shadow-lg">
          <span className="text-[10px] text-white/80 font-bold block">Est. Take-Home In-Hand</span>
          <span className="text-xl font-black">₹{Math.round(takeHome).toLocaleString()}</span>
        </div>
      </div>
    </div>
  );
};

// --- 13. Currency Converter ---
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
    AED: 3.67,
    SGD: 1.35,
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
