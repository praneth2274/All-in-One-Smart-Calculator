import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { PageHeader } from '../components/layout/PageHeader';
import { fetchCalculatorBySlug } from '../services/calculatorService';
import { Calculator } from '../types';
import { useCalculatorContext } from '../context/CalculatorContext';
import { Heart, ArrowLeft, Sparkles, Shield, Share2 } from 'lucide-react';

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
  SIPCalculatorView,
  GSTCalculatorView,
  CurrencyConverterView,
} from '../components/calculators/FinanceCalculators';

import {
  GPACalculatorView,
  AttendanceCalculatorView,
} from '../components/calculators/StudentCalculators';

import {
  BMICalculatorView,
  CalorieCalculatorView,
} from '../components/calculators/HealthCalculators';

import {
  UnitConverterView,
} from '../components/calculators/UnitConversionCalculators';

import {
  AgeCalculatorView,
  SplitBillCalculatorView,
} from '../components/calculators/DailyLifeCalculators';

import {
  PasswordGeneratorView,
  QRCodeGeneratorView,
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

  // Render proper calculator component view
  const renderCalculatorComponent = () => {
    switch (calc.slug) {
      case 'basic-calculator': return <BasicCalculatorView />;
      case 'scientific-calculator': return <ScientificCalculatorView />;
      case 'percentage-calculator': return <PercentageCalculatorView />;
      case 'average-calculator': return <AverageCalculatorView />;
      case 'ratio-calculator': return <RatioCalculatorView />;
      case 'emi-calculator': case 'loan-calculator': return <EMICalculatorView />;
      case 'sip-calculator': case 'fd-calculator': case 'rd-calculator': return <SIPCalculatorView />;
      case 'gst-calculator': return <GSTCalculatorView />;
      case 'currency-converter': return <CurrencyConverterView />;
      case 'gpa-calculator': case 'cgpa-calculator': return <GPACalculatorView />;
      case 'attendance-calculator': return <AttendanceCalculatorView />;
      case 'bmi-calculator': return <BMICalculatorView />;
      case 'calorie-calculator': case 'bmr-calculator': return <CalorieCalculatorView />;
      case 'length-converter': case 'data-storage-converter': case 'weight-converter': return <UnitConverterView type={calc.slug.includes('data') ? 'data' : 'length'} />;
      case 'age-calculator': case 'date-difference-calculator': return <AgeCalculatorView />;
      case 'split-bill-calculator': case 'tip-calculator': return <SplitBillCalculatorView />;
      case 'password-generator': return <PasswordGeneratorView />;
      case 'qr-code-generator': case 'qr-scanner': return <QRCodeGeneratorView />;
      default: return <EMICalculatorView />;
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
