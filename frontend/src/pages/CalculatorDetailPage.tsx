import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { PageHeader } from '../components/layout/PageHeader';
import { fetchCalculatorBySlug } from '../services/calculatorService';
import { Calculator } from '../types';
import { useCalculatorContext } from '../context/CalculatorContext';
import { Heart, ArrowLeft } from 'lucide-react';

// Calculator Views Imports
import {
  BasicCalculatorView,
  ScientificCalculatorView,
  PercentageCalculatorView,
  AverageCalculatorView,
  RatioCalculatorView,
} from '../components/calculators/BasicCalculators';

import {
  EMICalculatorView,
  LoanEligibilityView,
  SIPCalculatorView,
  FDCalculatorView,
  RDCalculatorView,
  SimpleInterestView,
  CompoundInterestView,
  GSTCalculatorView,
  IncomeTaxView,
  DiscountCalculatorView,
  ProfitLossView,
  SalaryCalculatorView,
  CurrencyConverterView,
} from '../components/calculators/FinanceCalculators';

import {
  GPACalculatorView,
  CGPACalculatorView,
  AttendanceCalculatorView,
  MarksCalculatorView,
  GradeCalculatorView,
  StudyTimeCalculatorView,
} from '../components/calculators/StudentCalculators';

import {
  BMICalculatorView,
  CalorieCalculatorView,
  WaterIntakeCalculatorView,
  BodyFatCalculatorView,
} from '../components/calculators/HealthCalculators';

import {
  UnitConverterView,
} from '../components/calculators/UnitConversionCalculators';

import {
  AgeCalculatorView,
  DateDifferenceView,
  FuelCostView,
  ElectricityBillView,
  WaterBillView,
  SplitBillCalculatorView,
} from '../components/calculators/DailyLifeCalculators';

import {
  PasswordGeneratorView,
  QRCodeGeneratorView,
  QRScannerView,
  RandomNumberGeneratorView,
} from '../components/calculators/UtilityCalculators';

export const CalculatorDetailPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const [calc, setCalc] = useState<Calculator | null>(null);
  const [loading, setLoading] = useState(true);
  const { isFavorite, toggleFavoriteSlug } = useCalculatorContext();

  useEffect(() => {
    const getTool = async () => {
      if (!slug) return;
      setLoading(true);
      const data = await fetchCalculatorBySlug(slug);
      setCalc(data);
      setLoading(false);
    };
    getTool();
  }, [slug]);

  if (loading) {
    return (
      <div className="py-20 text-center text-sm font-semibold text-brand-500 animate-pulse">
        Loading CalcHub Tool...
      </div>
    );
  }

  if (!calc) {
    return (
      <div className="py-20 text-center space-y-4">
        <h2 className="text-2xl font-bold">Calculator Not Found</h2>
        <Link to="/calculators" className="text-sm font-bold text-brand-600 hover:underline">
          Back to all calculators
        </Link>
      </div>
    );
  }

  const fav = isFavorite(calc.slug);

  // Render proper calculator component view for all 50 calculators
  const renderCalculatorComponent = () => {
    switch (calc.slug) {
      // Basic (5)
      case 'basic-calculator': return <BasicCalculatorView />;
      case 'scientific-calculator': return <ScientificCalculatorView />;
      case 'percentage-calculator': return <PercentageCalculatorView />;
      case 'average-calculator': return <AverageCalculatorView />;
      case 'ratio-calculator': return <RatioCalculatorView />;

      // Finance (13)
      case 'emi-calculator': return <EMICalculatorView />;
      case 'loan-calculator': return <LoanEligibilityView />;
      case 'sip-calculator': return <SIPCalculatorView />;
      case 'fd-calculator': return <FDCalculatorView />;
      case 'rd-calculator': return <RDCalculatorView />;
      case 'simple-interest': return <SimpleInterestView />;
      case 'compound-interest': return <CompoundInterestView />;
      case 'gst-calculator': return <GSTCalculatorView />;
      case 'income-tax-calculator': return <IncomeTaxView />;
      case 'discount-calculator': return <DiscountCalculatorView />;
      case 'profit-loss-calculator': return <ProfitLossView />;
      case 'salary-calculator': return <SalaryCalculatorView />;
      case 'currency-converter': return <CurrencyConverterView />;

      // Student (6)
      case 'gpa-calculator': return <GPACalculatorView />;
      case 'cgpa-calculator': return <CGPACalculatorView />;
      case 'attendance-calculator': return <AttendanceCalculatorView />;
      case 'marks-calculator': return <MarksCalculatorView />;
      case 'grade-calculator': return <GradeCalculatorView />;
      case 'study-time-calculator': return <StudyTimeCalculatorView />;

      // Health (5)
      case 'bmi-calculator': return <BMICalculatorView />;
      case 'bmr-calculator': case 'calorie-calculator': return <CalorieCalculatorView />;
      case 'water-intake-calculator': return <WaterIntakeCalculatorView />;
      case 'body-fat-calculator': return <BodyFatCalculatorView />;

      // Unit Conversion (10)
      case 'length-converter': return <UnitConverterView type="length" />;
      case 'weight-converter': return <UnitConverterView type="weight" />;
      case 'temperature-converter': return <UnitConverterView type="temperature" />;
      case 'area-converter': return <UnitConverterView type="area" />;
      case 'volume-converter': return <UnitConverterView type="volume" />;
      case 'speed-converter': return <UnitConverterView type="speed" />;
      case 'pressure-converter': return <UnitConverterView type="pressure" />;
      case 'time-converter': return <UnitConverterView type="time" />;
      case 'energy-converter': return <UnitConverterView type="energy" />;
      case 'data-storage-converter': return <UnitConverterView type="data" />;

      // Daily Life (7)
      case 'age-calculator': return <AgeCalculatorView />;
      case 'date-difference-calculator': return <DateDifferenceView />;
      case 'fuel-cost-calculator': return <FuelCostView />;
      case 'electricity-bill-calculator': return <ElectricityBillView />;
      case 'water-bill-calculator': return <WaterBillView />;
      case 'split-bill-calculator': case 'tip-calculator': return <SplitBillCalculatorView />;

      // Utility (4)
      case 'password-generator': return <PasswordGeneratorView />;
      case 'qr-code-generator': return <QRCodeGeneratorView />;
      case 'qr-scanner': return <QRScannerView />;
      case 'random-number-generator': return <RandomNumberGeneratorView />;

      default: return <BasicCalculatorView />;
    }
  };

  return (
    <div className="space-y-6">
      
      {/* Top Bar Navigation & Actions */}
      <div className="flex items-center justify-between">
        <Link to="/calculators" className="flex items-center gap-1.5 text-xs font-bold text-gray-500 hover:text-brand-600">
          <ArrowLeft className="w-4 h-4" /> All Tools
        </Link>

        <div className="flex items-center gap-2">
          <button
            onClick={() => toggleFavoriteSlug(calc.slug, calc.title, calc.category)}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl border text-xs font-bold transition-colors ${
              fav
                ? 'bg-rose-50 dark:bg-rose-950/40 text-rose-500 border-rose-300'
                : 'bg-gray-100 dark:bg-gray-800 text-gray-600 border-gray-300 dark:border-gray-700'
            }`}
          >
            <Heart className={`w-4 h-4 ${fav ? 'fill-current' : ''}`} />
            {fav ? 'Favorite' : 'Add Favorite'}
          </button>
        </div>
      </div>

      <PageHeader
        title={calc.title}
        description={calc.description}
        badge={calc.category}
      />

      {/* Main Interactive Tool View */}
      {renderCalculatorComponent()}

    </div>
  );
};
