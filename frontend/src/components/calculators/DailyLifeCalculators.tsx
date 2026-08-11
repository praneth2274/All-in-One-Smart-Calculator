import React, { useState } from 'react';

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

// --- 2. Date Difference Calculator ---
export const DateDifferenceView: React.FC = () => {
  const [startDate, setStartDate] = useState('2025-01-01');
  const [endDate, setEndDate] = useState('2025-12-31');

  const d1 = new Date(startDate);
  const d2 = new Date(endDate);
  const diffTime = Math.abs(d2.getTime() - d1.getTime());
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  const weeks = Math.floor(diffDays / 7);

  return (
    <div className="max-w-2xl mx-auto glass-card p-6 space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-bold mb-1">Start Date</label>
          <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} className="w-full glass-input" />
        </div>
        <div>
          <label className="block text-xs font-bold mb-1">End Date</label>
          <input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} className="w-full glass-input" />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 text-center">
        <div className="p-4 rounded-2xl bg-brand-600 text-white shadow-lg">
          <span className="text-[10px] uppercase font-bold text-white/80 block">Difference in Days</span>
          <span className="text-3xl font-black">{diffDays} Days</span>
        </div>
        <div className="p-4 rounded-2xl bg-indigo-600 text-white shadow-lg">
          <span className="text-[10px] uppercase font-bold text-white/80 block">Difference in Weeks</span>
          <span className="text-3xl font-black">{weeks} Weeks</span>
        </div>
      </div>
    </div>
  );
};

// --- 3. Fuel Cost Calculator ---
export const FuelCostView: React.FC = () => {
  const [distance, setDistance] = useState<number>(350); // km
  const [mileage, setMileage] = useState<number>(15); // km/l
  const [fuelPrice, setFuelPrice] = useState<number>(102); // per liter

  const litersNeeded = mileage > 0 ? distance / mileage : 0;
  const totalCost = litersNeeded * fuelPrice;

  return (
    <div className="max-w-2xl mx-auto glass-card p-6 space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div>
          <label className="block text-xs font-bold mb-1">Distance (km)</label>
          <input type="number" value={distance} onChange={(e) => setDistance(Number(e.target.value))} className="w-full glass-input" />
        </div>
        <div>
          <label className="block text-xs font-bold mb-1">Vehicle Mileage (km/L)</label>
          <input type="number" value={mileage} onChange={(e) => setMileage(Number(e.target.value))} className="w-full glass-input" />
        </div>
        <div>
          <label className="block text-xs font-bold mb-1">Fuel Price (₹/L)</label>
          <input type="number" value={fuelPrice} onChange={(e) => setFuelPrice(Number(e.target.value))} className="w-full glass-input" />
        </div>
      </div>

      <div className="p-6 rounded-2xl bg-gradient-to-r from-amber-600 to-orange-600 text-white text-center shadow-xl">
        <span className="text-xs uppercase font-bold text-white/80">Total Trip Fuel Cost</span>
        <div className="text-4xl font-black mt-1">₹{totalCost.toFixed(2)}</div>
        <div className="text-xs text-white/80 mt-1">Fuel Required: {litersNeeded.toFixed(1)} Liters</div>
      </div>
    </div>
  );
};

// --- 4. Electricity Bill Calculator ---
export const ElectricityBillView: React.FC = () => {
  const [wattage, setWattage] = useState<number>(1500); // watts
  const [hoursPerDay, setHoursPerDay] = useState<number>(8);
  const [costPerkWh, setCostPerkWh] = useState<number>(7.5); // ₹ per unit

  const dailykWh = (wattage * hoursPerDay) / 1000;
  const monthlykWh = dailykWh * 30;
  const monthlyCost = monthlykWh * costPerkWh;

  return (
    <div className="max-w-2xl mx-auto glass-card p-6 space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div>
          <label className="block text-xs font-bold mb-1">Appliance Wattage (W)</label>
          <input type="number" value={wattage} onChange={(e) => setWattage(Number(e.target.value))} className="w-full glass-input" />
        </div>
        <div>
          <label className="block text-xs font-bold mb-1">Hours Used / Day</label>
          <input type="number" value={hoursPerDay} onChange={(e) => setHoursPerDay(Number(e.target.value))} className="w-full glass-input" />
        </div>
        <div>
          <label className="block text-xs font-bold mb-1">Electricity Rate (₹/kWh)</label>
          <input type="number" value={costPerkWh} onChange={(e) => setCostPerkWh(Number(e.target.value))} className="w-full glass-input" />
        </div>
      </div>

      <div className="p-6 rounded-2xl bg-gradient-to-r from-yellow-600 to-amber-600 text-white text-center shadow-xl">
        <span className="text-xs uppercase font-bold text-white/80">Est. Monthly Power Cost</span>
        <div className="text-4xl font-black mt-1">₹{monthlyCost.toFixed(2)}</div>
        <div className="text-xs text-white/80 mt-1">Consumes {monthlykWh.toFixed(1)} Units (kWh) / Month</div>
      </div>
    </div>
  );
};

// --- 5. Water Bill Calculator ---
export const WaterBillView: React.FC = () => {
  const [consumptionLiters, setConsumptionLiters] = useState<number>(15000); // monthly
  const [ratePerKiloLiter, setRatePerKiloLiter] = useState<number>(15);

  const kiloLiters = consumptionLiters / 1000;
  const totalCost = kiloLiters * ratePerKiloLiter;

  return (
    <div className="max-w-2xl mx-auto glass-card p-6 space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-bold mb-1">Monthly Consumption (Liters)</label>
          <input type="number" value={consumptionLiters} onChange={(e) => setConsumptionLiters(Number(e.target.value))} className="w-full glass-input" />
        </div>
        <div>
          <label className="block text-xs font-bold mb-1">Rate per 1000L (₹)</label>
          <input type="number" value={ratePerKiloLiter} onChange={(e) => setRatePerKiloLiter(Number(e.target.value))} className="w-full glass-input" />
        </div>
      </div>

      <div className="p-6 rounded-2xl bg-blue-600 text-white text-center shadow-xl">
        <span className="text-xs uppercase font-bold text-white/80">Estimated Water Bill</span>
        <div className="text-4xl font-black mt-1">₹{totalCost.toFixed(2)}</div>
      </div>
    </div>
  );
};

// --- 6. Split Bill Calculator ---
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
