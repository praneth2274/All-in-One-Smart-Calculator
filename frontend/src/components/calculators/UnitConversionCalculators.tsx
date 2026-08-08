import React, { useState } from 'react';
import { Ruler, Weight, Thermometer, HardDrive, ArrowRightLeft } from 'lucide-react';

export const UnitConverterView: React.FC<{ type: string }> = ({ type }) => {
  const [value, setValue] = useState<number>(10);
  const [fromUnit, setFromUnit] = useState<string>('meter');
  const [toUnit, setToUnit] = useState<string>('kilometer');

  // Conversion conversion tables
  const lengthFactors: Record<string, number> = {
    meter: 1,
    kilometer: 0.001,
    centimeter: 100,
    millimeter: 1000,
    mile: 0.000621371,
    foot: 3.28084,
    inch: 39.3701,
  };

  const dataFactors: Record<string, number> = {
    Byte: 1,
    KB: 1 / 1024,
    MB: 1 / (1024 * 1024),
    GB: 1 / (1024 * 1024 * 1024),
    TB: 1 / (1024 * 1024 * 1024 * 1024),
  };

  const unitMap: Record<string, Record<string, number>> = {
    length: lengthFactors,
    data: dataFactors,
  };

  const currentUnits = unitMap[type] || lengthFactors;
  const converted = (value / (currentUnits[fromUnit] || 1)) * (currentUnits[toUnit] || 1);

  return (
    <div className="max-w-2xl mx-auto glass-card p-6 space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 items-center">
        <div>
          <label className="block text-xs font-bold mb-1">Enter Value</label>
          <input
            type="number"
            value={value}
            onChange={(e) => setValue(Number(e.target.value))}
            className="w-full glass-input"
          />
        </div>

        <div>
          <label className="block text-xs font-bold mb-1">From Unit</label>
          <select
            value={fromUnit}
            onChange={(e) => setFromUnit(e.target.value)}
            className="w-full glass-input capitalize"
          >
            {Object.keys(currentUnits).map((u) => (
              <option key={u} value={u}>{u}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-xs font-bold mb-1">To Unit</label>
          <select
            value={toUnit}
            onChange={(e) => setToUnit(e.target.value)}
            className="w-full glass-input capitalize"
          >
            {Object.keys(currentUnits).map((u) => (
              <option key={u} value={u}>{u}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="p-6 rounded-2xl bg-gradient-to-r from-brand-600 to-indigo-600 text-white text-center shadow-xl">
        <span className="text-xs uppercase font-bold text-white/80">Converted Result</span>
        <div className="text-4xl font-black mt-1">
          {converted.toLocaleString(undefined, { maximumFractionDigits: 6 })} <span className="capitalize">{toUnit}</span>
        </div>
      </div>
    </div>
  );
};
