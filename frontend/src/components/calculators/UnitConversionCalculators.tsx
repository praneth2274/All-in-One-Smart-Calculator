import React, { useState } from 'react';

export const UnitConverterView: React.FC<{ type: string }> = ({ type }) => {
  const [value, setValue] = useState<number>(10);

  // Define conversion factors relative to base unit for each converter type
  const lengthFactors: Record<string, number> = {
    meter: 1,
    kilometer: 0.001,
    centimeter: 100,
    millimeter: 1000,
    mile: 0.000621371,
    foot: 3.28084,
    inch: 39.3701,
  };

  const weightFactors: Record<string, number> = {
    kilogram: 1,
    gram: 1000,
    milligram: 1000000,
    pound: 2.20462,
    ounce: 35.274,
  };

  const areaFactors: Record<string, number> = {
    'sq meter': 1,
    'sq feet': 10.7639,
    acre: 0.000247105,
    hectare: 0.0001,
    'sq km': 0.000001,
  };

  const volumeFactors: Record<string, number> = {
    liter: 1,
    milliliter: 1000,
    gallon: 0.264172,
    'cubic meter': 0.001,
    'fl oz': 33.814,
  };

  const speedFactors: Record<string, number> = {
    'km/h': 1,
    mph: 0.621371,
    'm/s': 0.277778,
    knots: 0.539957,
  };

  const pressureFactors: Record<string, number> = {
    Pascal: 1,
    Bar: 0.00001,
    PSI: 0.000145038,
    Atmosphere: 0.0000098692,
  };

  const timeFactors: Record<string, number> = {
    Second: 1,
    Minute: 1 / 60,
    Hour: 1 / 3600,
    Day: 1 / 86400,
    Week: 1 / 604800,
  };

  const energyFactors: Record<string, number> = {
    Joule: 1,
    Kilojoule: 0.001,
    Calorie: 0.239006,
    Kilocalorie: 0.000239006,
    'Watt-hour': 0.000277778,
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
    weight: weightFactors,
    area: areaFactors,
    volume: volumeFactors,
    speed: speedFactors,
    pressure: pressureFactors,
    time: timeFactors,
    energy: energyFactors,
    data: dataFactors,
  };

  const isTemp = type === 'temperature';
  const currentUnits = unitMap[type] || lengthFactors;

  const [fromUnit, setFromUnit] = useState<string>(isTemp ? 'Celsius' : Object.keys(currentUnits)[0]);
  const [toUnit, setToUnit] = useState<string>(isTemp ? 'Fahrenheit' : Object.keys(currentUnits)[1] || Object.keys(currentUnits)[0]);

  // Special handling for Temperature conversions
  const convertTemperature = (val: number, from: string, to: string) => {
    let celsius = val;
    if (from === 'Fahrenheit') celsius = (val - 32) * (5 / 9);
    if (from === 'Kelvin') celsius = val - 273.15;

    if (to === 'Celsius') return celsius;
    if (to === 'Fahrenheit') return (celsius * 9 / 5) + 32;
    if (to === 'Kelvin') return celsius + 273.15;
    return celsius;
  };

  const converted = isTemp
    ? convertTemperature(value, fromUnit, toUnit)
    : (value / (currentUnits[fromUnit] || 1)) * (currentUnits[toUnit] || 1);

  const availableUnits = isTemp ? ['Celsius', 'Fahrenheit', 'Kelvin'] : Object.keys(currentUnits);

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
            {availableUnits.map((u) => (
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
            {availableUnits.map((u) => (
              <option key={u} value={u}>{u}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="p-6 rounded-2xl bg-gradient-to-r from-brand-600 to-indigo-600 text-white text-center shadow-xl">
        <span className="text-xs uppercase font-bold text-white/80">Converted Result ({type})</span>
        <div className="text-4xl font-black mt-1">
          {converted.toLocaleString(undefined, { maximumFractionDigits: 6 })} <span className="capitalize">{toUnit}</span>
        </div>
      </div>
    </div>
  );
};
