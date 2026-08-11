import API from './api';
import { Calculator, Category } from '../types';

export const FALLBACK_CALCULATOR_DATA: Calculator[] = [
  // Basic (5)
  { id: '1', title: 'Basic Calculator', slug: 'basic-calculator', category: 'Basic', description: 'Standard arithmetic calculations (+, -, *, /, %, sqrt)', icon: 'Calculator', isPopular: true, usageCount: 1420 },
  { id: '2', title: 'Scientific Calculator', slug: 'scientific-calculator', category: 'Basic', description: 'Advanced trigonometry, logarithms, exponents, powers, and constants', icon: 'Atom', isPopular: true, usageCount: 2310 },
  { id: '3', title: 'Percentage Calculator', slug: 'percentage-calculator', category: 'Basic', description: 'Calculate percentage values, increases, decreases, and fractions', icon: 'Percent', isPopular: true, usageCount: 980 },
  { id: '4', title: 'Average Calculator', slug: 'average-calculator', category: 'Basic', description: 'Calculate mean, median, mode, range, and standard deviation', icon: 'BarChart2', isPopular: false, usageCount: 430 },
  { id: '5', title: 'Ratio Calculator', slug: 'ratio-calculator', category: 'Basic', description: 'Solve ratio proportions A:B = C:D and scale values', icon: 'Scale', isPopular: false, usageCount: 310 },

  // Finance (13)
  { id: '6', title: 'EMI Calculator', slug: 'emi-calculator', category: 'Finance', description: 'Calculate Equated Monthly Installments for loans with charts', icon: 'Landmark', isPopular: true, usageCount: 3540 },
  { id: '7', title: 'Loan Calculator', slug: 'loan-calculator', category: 'Finance', description: 'Determine loan eligibility, interest schedules, and payoff terms', icon: 'CreditCard', isPopular: true, usageCount: 2110 },
  { id: '8', title: 'SIP Calculator', slug: 'sip-calculator', category: 'Finance', description: 'Calculate systematic investment plan returns and wealth growth', icon: 'TrendingUp', isPopular: true, usageCount: 4120 },
  { id: '9', title: 'FD Calculator', slug: 'fd-calculator', category: 'Finance', description: 'Fixed deposit maturity calculator with compounding frequencies', icon: 'PiggyBank', isPopular: false, usageCount: 1250 },
  { id: '10', title: 'RD Calculator', slug: 'rd-calculator', category: 'Finance', description: 'Recurring deposit return estimator with interest breakdowns', icon: 'Coins', isPopular: false, usageCount: 890 },
  { id: '11', title: 'Simple Interest', slug: 'simple-interest', category: 'Finance', description: 'Calculate simple interest P * R * T / 100', icon: 'DollarSign', isPopular: false, usageCount: 750 },
  { id: '12', title: 'Compound Interest', slug: 'compound-interest', category: 'Finance', description: 'Calculate compound interest with flexible compounding periods', icon: 'Sparkles', isPopular: true, usageCount: 2900 },
  { id: '13', title: 'GST Calculator', slug: 'gst-calculator', category: 'Finance', description: 'Goods & Services Tax inclusive and exclusive amount calculation', icon: 'Receipt', isPopular: true, usageCount: 3100 },
  { id: '14', title: 'Income Tax Calculator', slug: 'income-tax-calculator', category: 'Finance', description: 'Estimate tax liability based on current income tax slabs', icon: 'FileText', isPopular: true, usageCount: 3800 },
  { id: '15', title: 'Discount Calculator', slug: 'discount-calculator', category: 'Finance', description: 'Determine final sale prices after discounts and tax savings', icon: 'Tag', isPopular: false, usageCount: 640 },
  { id: '16', title: 'Profit & Loss Calculator', slug: 'profit-loss-calculator', category: 'Finance', description: 'Compute profit margin, cost price, and gross margin percentage', icon: 'BadgeDollarSign', isPopular: false, usageCount: 1120 },
  { id: '17', title: 'Salary Calculator', slug: 'salary-calculator', category: 'Finance', description: 'Calculate CTC to take-home salary after deductions (HRA, PF, Tax)', icon: 'Briefcase', isPopular: true, usageCount: 2670 },
  { id: '18', title: 'Currency Converter', slug: 'currency-converter', category: 'Finance', description: 'Convert live foreign exchange rates for 25+ global currencies', icon: 'Globe', isPopular: true, usageCount: 3490 },

  // Student (6)
  { id: '19', title: 'GPA Calculator', slug: 'gpa-calculator', category: 'Student', description: 'Calculate semester Grade Point Average based on course credits', icon: 'GraduationCap', isPopular: true, usageCount: 2890 },
  { id: '20', title: 'CGPA Calculator', slug: 'cgpa-calculator', category: 'Student', description: 'Calculate overall Cumulative GPA across multiple semesters', icon: 'Award', isPopular: true, usageCount: 3100 },
  { id: '21', title: 'Attendance Calculator', slug: 'attendance-calculator', category: 'Student', description: 'Calculate current attendance % and safe bunk / required classes', icon: 'CalendarCheck', isPopular: true, usageCount: 4200 },
  { id: '22', title: 'Marks Calculator', slug: 'marks-calculator', category: 'Student', description: 'Calculate total percentage, average, and percentile ranking', icon: 'CheckSquare', isPopular: false, usageCount: 940 },
  { id: '23', title: 'Grade Calculator', slug: 'grade-calculator', category: 'Student', description: 'Convert scores to letter grades (A+, A, B, C, D, F) and scales', icon: 'Bookmark', isPopular: false, usageCount: 710 },
  { id: '24', title: 'Study Time Calculator', slug: 'study-time-calculator', category: 'Student', description: 'Plan study sessions, break times, and exam preparation hours', icon: 'Clock', isPopular: false, usageCount: 520 },

  // Health (5)
  { id: '25', title: 'BMI Calculator', slug: 'bmi-calculator', category: 'Health', description: 'Calculate Body Mass Index and healthy weight category', icon: 'Activity', isPopular: true, usageCount: 4900 },
  { id: '26', title: 'BMR Calculator', slug: 'bmr-calculator', category: 'Health', description: 'Calculate Basal Metabolic Rate and daily resting caloric burn', icon: 'Flame', isPopular: true, usageCount: 2150 },
  { id: '27', title: 'Calorie Calculator', slug: 'calorie-calculator', category: 'Health', description: 'Daily recommended calorie intake for weight loss, maintenance, or bulk', icon: 'Apple', isPopular: true, usageCount: 3400 },
  { id: '28', title: 'Water Intake Calculator', slug: 'water-intake-calculator', category: 'Health', description: 'Calculate daily recommended hydration target based on weight & activity', icon: 'Droplets', isPopular: false, usageCount: 1600 },
  { id: '29', title: 'Body Fat Calculator', slug: 'body-fat-calculator', category: 'Health', description: 'Estimate body fat percentage using US Navy circumference method', icon: 'HeartPulse', isPopular: false, usageCount: 1420 },

  // Unit Conversion (10)
  { id: '30', title: 'Length Converter', slug: 'length-converter', category: 'Unit Conversion', description: 'Meters, Kilometers, Miles, Feet, Inches, Yards, Centimeters', icon: 'Ruler', isPopular: false, usageCount: 1100 },
  { id: '31', title: 'Weight Converter', slug: 'weight-converter', category: 'Unit Conversion', description: 'Kilograms, Grams, Pounds, Ounces, Tons, Milligrams', icon: 'Weight', isPopular: false, usageCount: 950 },
  { id: '32', title: 'Temperature Converter', slug: 'temperature-converter', category: 'Unit Conversion', description: 'Celsius, Fahrenheit, Kelvin temperature conversions', icon: 'Thermometer', isPopular: false, usageCount: 820 },
  { id: '33', title: 'Area Converter', slug: 'area-converter', category: 'Unit Conversion', description: 'Square Meters, Sq Feet, Acres, Hectares, Sq Kilometers', icon: 'Grid', isPopular: false, usageCount: 610 },
  { id: '34', title: 'Volume Converter', slug: 'volume-converter', category: 'Unit Conversion', description: 'Liters, Milliliters, Gallons, Cubic Meters, Fluid Ounces', icon: 'Box', isPopular: false, usageCount: 540 },
  { id: '35', title: 'Speed Converter', slug: 'speed-converter', category: 'Unit Conversion', description: 'Km/h, Mph, Meters/sec, Knots, Mach', icon: 'Zap', isPopular: false, usageCount: 490 },
  { id: '36', title: 'Pressure Converter', slug: 'pressure-converter', category: 'Unit Conversion', description: 'Pascal, Bar, PSI, Atmosphere, Torr', icon: 'Gauge', isPopular: false, usageCount: 380 },
  { id: '37', title: 'Time Converter', slug: 'time-converter', category: 'Unit Conversion', description: 'Seconds, Minutes, Hours, Days, Weeks, Months, Years', icon: 'Hourglass', isPopular: false, usageCount: 450 },
  { id: '38', title: 'Energy Converter', slug: 'energy-converter', category: 'Unit Conversion', description: 'Joules, Kilojoules, Calories, Kilocalories, Watt-hours', icon: 'BatteryCharging', isPopular: false, usageCount: 310 },
  { id: '39', title: 'Data Storage Converter', slug: 'data-storage-converter', category: 'Unit Conversion', description: 'Bytes, KB, MB, GB, TB, PB, Bits', icon: 'HardDrive', isPopular: true, usageCount: 1890 },

  // Daily Life (7)
  { id: '40', title: 'Age Calculator', slug: 'age-calculator', category: 'Daily Life', description: 'Exact age in years, months, days, total hours & birthday countdown', icon: 'UserCheck', isPopular: true, usageCount: 5200 },
  { id: '41', title: 'Date Difference Calculator', slug: 'date-difference-calculator', category: 'Daily Life', description: 'Calculate total days, business days, and weeks between two dates', icon: 'Calendar', isPopular: false, usageCount: 1340 },
  { id: '42', title: 'Fuel Cost Calculator', slug: 'fuel-cost-calculator', category: 'Daily Life', description: 'Estimate trip fuel expenditure based on mileage and fuel price', icon: 'Fuel', isPopular: true, usageCount: 2450 },
  { id: '43', title: 'Electricity Bill Calculator', slug: 'electricity-bill-calculator', category: 'Daily Life', description: 'Estimate monthly power cost based on appliance wattage & rates', icon: 'Zap', isPopular: true, usageCount: 1980 },
  { id: '44', title: 'Water Bill Calculator', slug: 'water-bill-calculator', category: 'Daily Life', description: 'Calculate household water consumption charges', icon: 'Droplet', isPopular: false, usageCount: 490 },
  { id: '45', title: 'Split Bill Calculator', slug: 'split-bill-calculator', category: 'Daily Life', description: 'Easily divide restaurant bills & tips among friends', icon: 'Users', isPopular: true, usageCount: 3120 },
  { id: '46', title: 'Tip Calculator', slug: 'tip-calculator', category: 'Daily Life', description: 'Compute tip amount per person based on service rating percentage', icon: 'Coins', isPopular: false, usageCount: 870 },

  // Utility (4)
  { id: '47', title: 'Password Generator', slug: 'password-generator', category: 'Utility', description: 'Generate strong, customizable cryptographic passwords with strength meter', icon: 'KeyRound', isPopular: true, usageCount: 4100 },
  { id: '48', title: 'QR Code Generator', slug: 'qr-code-generator', category: 'Utility', description: 'Convert text, URLs, or contact details into downloadable QR Codes', icon: 'QrCode', isPopular: true, usageCount: 4500 },
  { id: '49', title: 'QR Scanner', slug: 'qr-scanner', category: 'Utility', description: 'Scan QR codes using web camera or image upload', icon: 'Scan', isPopular: false, usageCount: 1780 },
  { id: '50', title: 'Random Number Generator', slug: 'random-number-generator', category: 'Utility', description: 'Generate random numbers within custom ranges, dice rolls, coin flips', icon: 'Dices', isPopular: false, usageCount: 1210 },
];

export const FALLBACK_CATEGORIES_DATA: Category[] = [
  { name: 'Basic', slug: 'basic', description: 'Essential arithmetic, percentage, ratio & scientific calculators', icon: 'Calculator', calculatorCount: 5 },
  { name: 'Finance', slug: 'finance', description: 'EMI, SIP, Income Tax, GST, Loans, Compound Interest & Salary calculators', icon: 'Landmark', calculatorCount: 13 },
  { name: 'Student', slug: 'student', description: 'GPA, CGPA, Attendance, Marks & Exam study tools', icon: 'GraduationCap', calculatorCount: 6 },
  { name: 'Health', slug: 'health', description: 'BMI, BMR, Calorie burn, Water Intake & Body Fat tools', icon: 'Activity', calculatorCount: 5 },
  { name: 'Unit Conversion', slug: 'unit-conversion', description: 'Length, Weight, Temperature, Area, Data Storage & Speed converters', icon: 'Ruler', calculatorCount: 10 },
  { name: 'Daily Life', slug: 'daily-life', description: 'Age, Date difference, Electricity bill, Fuel & Split bill tools', icon: 'Sun', calculatorCount: 7 },
  { name: 'Utility', slug: 'utility', description: 'Password generator, QR code builder, scanner & random numbers', icon: 'Wrench', calculatorCount: 4 },
];

export const fetchCalculators = async (params?: { category?: string; search?: string; popular?: boolean }): Promise<Calculator[]> => {
  try {
    const res = await API.get('/calculators', { params });
    if (Array.isArray(res.data) && res.data.length > 0) {
      return res.data;
    }
  } catch (error) {
    console.warn('[Calculator Service] API call failed or backend sleeping. Using local fallback calculators dataset.');
  }

  // Filter local fallback data if API is unreachable/delayed
  let list = [...FALLBACK_CALCULATOR_DATA];

  if (params?.category) {
    list = list.filter(c => c.category.toLowerCase() === params.category!.toLowerCase() || c.category.toLowerCase().replace(/\s+/g, '-') === params.category!.toLowerCase());
  }

  if (params?.popular) {
    list = list.filter(c => c.isPopular);
  }

  if (params?.search) {
    const s = params.search.toLowerCase();
    list = list.filter(c => c.title.toLowerCase().includes(s) || c.description.toLowerCase().includes(s) || c.category.toLowerCase().includes(s));
  }

  return list;
};

export const fetchCalculatorBySlug = async (slug: string): Promise<Calculator | null> => {
  try {
    const res = await API.get(`/calculators/${slug}`);
    if (res.data) return res.data;
  } catch (error) {
    console.warn(`[Calculator Service] API call failed for slug ${slug}. Using local fallback.`);
  }
  return FALLBACK_CALCULATOR_DATA.find(c => c.slug === slug) || null;
};

export const fetchCategories = async (): Promise<Category[]> => {
  try {
    const res = await API.get('/calculators/categories');
    if (Array.isArray(res.data) && res.data.length > 0) {
      return res.data;
    }
  } catch (error) {
    console.warn('[Calculator Service] API categories call failed. Using local fallback categories.');
  }
  return FALLBACK_CATEGORIES_DATA;
};
