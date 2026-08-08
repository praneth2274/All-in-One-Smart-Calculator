import React, { useState } from 'react';
import { UserCheck, Fuel, Zap, Users, Gift } from 'lucide-react';
import { ExportButtons } from '../common/ExportButtons';

// --- 1. Age Calculator ---
export const AgeCalculatorView: React.FC = () => {
  const [birthDate, setBirthDate] = useState('2002-05-15');

  const birth = new Date(birthDate);
  const now = new Date();

  let years = now.getFullYear() - birth.getFullYear();
  let months = now.getMonth() - birth.getMonth();
  let days = now.getDate() - birth.getDate();

  if (days < 0) {
    months -= 1;
    days += new Date(now.getFullYear(), now.getMonth(), 0).getDate();
  }
  if (months < 0) {
    years -= 1;
    months += 12;
  }

  const diffTime = Math.abs(now.getTime() - birth.getTime());
  const totalDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  const totalHours = totalDays * 24;

  return (
    <div className="max-w-2xl mx-auto glass-card p-6 space-y-6">
      <div>
        <label className="block text-xs font-bold mb-1">Select Date of Birth</label>
        <input
          type="date"
          value={birthDate}
          onChange={(e) => setBirthDate(e.target.value)}
          className="w-full glass-input"
        />
      </div>

      <div className="grid grid-cols-3 gap-4 text-center">
        <div className="p-4 rounded-2xl bg-brand-600 text-white shadow-lg">
          <span className="text-[10px] text-white/80 font-bold uppercase block">Years</span>
          <span className="text-3xl font-black">{years}</span>
        </div>
        <div className="p-4 rounded-2xl bg-accent-600 text-white shadow-lg">
          <span className="text-[10px] text-white/80 font-bold uppercase block">Months</span>
          <span className="text-3xl font-black">{months}</span>
        </div>
        <div className="p-4 rounded-2xl bg-indigo-600 text-white shadow-lg">
          <span className="text-[10px] text-white/80 font-bold uppercase block">Days</span>
          <span className="text-3xl font-black">{days}</span>
        </div>
      </div>

      <div className="p-4 rounded-2xl bg-gray-100 dark:bg-gray-800 text-xs flex justify-between">
        <span>Total Lifetime Days: <strong>{totalDays.toLocaleString()} days</strong></span>
        <span>Total Hours: <strong>{totalHours.toLocaleString()} hrs</strong></span>
      </div>
    </div>
  );
};

// --- 2. Split Bill Calculator ---
export const SplitBillCalculatorView: React.FC = () => {
  const [totalBill, setTotalBill] = useState<number>(2500);
  const [tipPercent, setTipPercent] = useState<number>(10);
  const [people, setPeople] = useState<number>(4);

  const tipAmount = (totalBill * tipPercent) / 100;
  const grandTotal = totalBill + tipAmount;
  const perPerson = people > 0 ? grandTotal / people : grandTotal;

  return (
    <div className="max-w-2xl mx-auto glass-card p-6 space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div>
          <label className="block text-xs font-bold mb-1">Total Bill (₹)</label>
          <input type="number" value={totalBill} onChange={(e) => setTotalBill(Number(e.target.value))} className="w-full glass-input" />
        </div>
        <div>
          <label className="block text-xs font-bold mb-1">Tip (%)</label>
          <input type="number" value={tipPercent} onChange={(e) => setTipPercent(Number(e.target.value))} className="w-full glass-input" />
        </div>
        <div>
          <label className="block text-xs font-bold mb-1">Number of People</label>
          <input type="number" value={people} onChange={(e) => setPeople(Number(e.target.value))} className="w-full glass-input" />
        </div>
      </div>

      <div className="p-6 rounded-2xl bg-gradient-to-br from-brand-600 to-accent-600 text-white text-center shadow-xl">
        <span className="text-xs font-bold uppercase text-white/80">Each Person Pays</span>
        <div className="text-4xl font-black mt-1">₹{perPerson.toFixed(2)}</div>
        <div className="text-xs text-white/80 mt-2">
          Grand Total: ₹{grandTotal.toFixed(2)} (Tip: ₹{tipAmount.toFixed(2)})
        </div>
      </div>
    </div>
  );
};
