import React, { useState } from 'react';
import { AIStepExplainer } from '../ai/AIStepExplainer';

// --- 1. BMI Calculator ---
export const BMICalculatorView: React.FC = () => {
  const [weight, setWeight] = useState<number>(70); // kg
  const [height, setHeight] = useState<number>(175); // cm

  const heightM = height / 100;
  const bmi = heightM > 0 ? weight / (heightM * heightM) : 0;

  let category = 'Normal';
  let colorClass = 'text-emerald-500 bg-emerald-50 dark:bg-emerald-950/40 border-emerald-300';
  if (bmi < 18.5) {
    category = 'Underweight';
    colorClass = 'text-blue-500 bg-blue-50 dark:bg-blue-950/40 border-blue-300';
  } else if (bmi >= 25 && bmi < 29.9) {
    category = 'Overweight';
    colorClass = 'text-amber-500 bg-amber-50 dark:bg-amber-950/40 border-amber-300';
  } else if (bmi >= 30) {
    category = 'Obese';
    colorClass = 'text-rose-500 bg-rose-50 dark:bg-rose-950/40 border-rose-300';
  }

  return (
    <div className="max-w-2xl mx-auto glass-card p-6 space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <div className="flex justify-between text-xs font-bold mb-1">
            <span>Weight (kg)</span>
            <span>{weight} kg</span>
          </div>
          <input type="range" min={30} max={180} value={weight} onChange={(e) => setWeight(Number(e.target.value))} className="w-full accent-brand-500" />
        </div>

        <div>
          <div className="flex justify-between text-xs font-bold mb-1">
            <span>Height (cm)</span>
            <span>{height} cm</span>
          </div>
          <input type="range" min={100} max={230} value={height} onChange={(e) => setHeight(Number(e.target.value))} className="w-full accent-brand-500" />
        </div>
      </div>

      <div className={`p-6 rounded-3xl border text-center space-y-2 ${colorClass}`}>
        <span className="text-xs font-bold uppercase tracking-wider">Body Mass Index</span>
        <div className="text-5xl font-black">{bmi.toFixed(1)}</div>
        <div className="text-base font-extrabold uppercase tracking-wide">{category}</div>
      </div>

      <AIStepExplainer
        calculatorTitle="BMI Calculator"
        formula="BMI = Weight (kg) / Height (m)^2"
        inputs={{ WeightKg: weight, HeightCm: height }}
        results={{ BMIValue: bmi.toFixed(1), Category: category }}
      />
    </div>
  );
};

// --- 2. Calorie & BMR Calculator ---
export const CalorieCalculatorView: React.FC = () => {
  const [age, setAge] = useState<number>(22);
  const [gender, setGender] = useState<'male' | 'female'>('male');
  const [weight, setWeight] = useState<number>(70);
  const [height, setHeight] = useState<number>(175);
  const [activity, setActivity] = useState<number>(1.375); // moderate

  const bmr = gender === 'male'
    ? 10 * weight + 6.25 * height - 5 * age + 5
    : 10 * weight + 6.25 * height - 5 * age - 161;

  const tdee = bmr * activity;

  return (
    <div className="max-w-2xl mx-auto glass-card p-6 space-y-6">
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div>
          <label className="block text-xs font-bold mb-1">Age</label>
          <input type="number" value={age} onChange={(e) => setAge(Number(e.target.value))} className="w-full glass-input" />
        </div>
        <div>
          <label className="block text-xs font-bold mb-1">Gender</label>
          <select value={gender} onChange={(e) => setGender(e.target.value as any)} className="w-full glass-input">
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
        </div>
        <div>
          <label className="block text-xs font-bold mb-1">Weight (kg)</label>
          <input type="number" value={weight} onChange={(e) => setWeight(Number(e.target.value))} className="w-full glass-input" />
        </div>
        <div>
          <label className="block text-xs font-bold mb-1">Height (cm)</label>
          <input type="number" value={height} onChange={(e) => setHeight(Number(e.target.value))} className="w-full glass-input" />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-center">
        <div className="p-4 rounded-2xl bg-gray-100 dark:bg-gray-800">
          <span className="text-[10px] text-gray-500 font-bold block">BMR (Basal Burn)</span>
          <span className="text-xl font-bold">{Math.round(bmr)} kcal</span>
        </div>
        <div className="p-4 rounded-2xl bg-brand-600 text-white shadow-lg">
          <span className="text-[10px] text-white/80 font-bold block">Maintenance (TDEE)</span>
          <span className="text-xl font-black">{Math.round(tdee)} kcal</span>
        </div>
        <div className="p-4 rounded-2xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-bold">
          <span className="text-[10px] block">Weight Loss (-500 kcal)</span>
          <span className="text-xl font-black">{Math.round(tdee - 500)} kcal</span>
        </div>
      </div>
    </div>
  );
};

// --- 3. Water Intake Calculator ---
export const WaterIntakeCalculatorView: React.FC = () => {
  const [weight, setWeight] = useState<number>(70);
  const [workoutMins, setWorkoutMins] = useState<number>(45);

  const baseLiters = weight * 0.033;
  const extraLiters = (workoutMins / 30) * 0.35;
  const totalLiters = baseLiters + extraLiters;
  const glasses = Math.round(totalLiters / 0.25); // 250ml glasses

  return (
    <div className="max-w-2xl mx-auto glass-card p-6 space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-bold mb-1">Body Weight (kg)</label>
          <input type="number" value={weight} onChange={(e) => setWeight(Number(e.target.value))} className="w-full glass-input" />
        </div>
        <div>
          <label className="block text-xs font-bold mb-1">Daily Workout (Minutes)</label>
          <input type="number" value={workoutMins} onChange={(e) => setWorkoutMins(Number(e.target.value))} className="w-full glass-input" />
        </div>
      </div>

      <div className="p-6 rounded-2xl bg-cyan-600 text-white text-center shadow-xl">
        <span className="text-xs uppercase font-bold text-white/80">Recommended Daily Water Intake</span>
        <div className="text-4xl font-black mt-1">{totalLiters.toFixed(2)} Liters</div>
        <div className="text-sm font-semibold mt-1">Approx. {glasses} Glasses (250 ml each)</div>
      </div>
    </div>
  );
};

// --- 4. Body Fat Calculator ---
export const BodyFatCalculatorView: React.FC = () => {
  const [gender, setGender] = useState<'male' | 'female'>('male');
  const [waist, setWaist] = useState<number>(85); // cm
  const [neck, setNeck] = useState<number>(38); // cm
  const [height, setHeight] = useState<number>(175); // cm

  // US Navy Method simplified estimation
  const bodyFat = gender === 'male'
    ? 495 / (1.0324 - 0.19077 * Math.log10(waist - neck) + 0.15456 * Math.log10(height)) - 450
    : 18;

  const validFat = Math.max(4, Math.min(50, isNaN(bodyFat) ? 18 : bodyFat));

  return (
    <div className="max-w-2xl mx-auto glass-card p-6 space-y-6">
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div>
          <label className="block text-xs font-bold mb-1">Gender</label>
          <select value={gender} onChange={(e) => setGender(e.target.value as any)} className="w-full glass-input">
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
        </div>
        <div>
          <label className="block text-xs font-bold mb-1">Waist (cm)</label>
          <input type="number" value={waist} onChange={(e) => setWaist(Number(e.target.value))} className="w-full glass-input" />
        </div>
        <div>
          <label className="block text-xs font-bold mb-1">Neck (cm)</label>
          <input type="number" value={neck} onChange={(e) => setNeck(Number(e.target.value))} className="w-full glass-input" />
        </div>
        <div>
          <label className="block text-xs font-bold mb-1">Height (cm)</label>
          <input type="number" value={height} onChange={(e) => setHeight(Number(e.target.value))} className="w-full glass-input" />
        </div>
      </div>

      <div className="p-6 rounded-2xl bg-indigo-600 text-white text-center shadow-xl">
        <span className="text-xs uppercase font-bold text-white/80">Estimated Body Fat Percentage</span>
        <div className="text-4xl font-black mt-1">{validFat.toFixed(1)}%</div>
      </div>
    </div>
  );
};
