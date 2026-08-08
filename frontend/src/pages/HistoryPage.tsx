import React from 'react';
import { PageHeader } from '../components/layout/PageHeader';
import { useCalculatorContext } from '../context/CalculatorContext';
import { History, Trash2, FileText, Search } from 'lucide-react';
import { exportToPDF } from '../utils/pdfExporter';
import { exportToExcel } from '../utils/excelExporter';

export const HistoryPage: React.FC = () => {
  const { history, removeHistoryItem, clearAllHistory } = useCalculatorContext();
  const [query, setQuery] = React.useState('');

  const filtered = history.filter(h =>
    h.calculatorTitle.toLowerCase().includes(query.toLowerCase()) ||
    h.category.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="space-y-8">
      <PageHeader
        title="Calculation History"
        description="Comprehensive log of all performed calculations with export options."
        badge={`${history.length} Saved Records`}
        action={
          history.length > 0 ? (
            <button
              onClick={clearAllHistory}
              className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-rose-500/10 text-rose-500 hover:bg-rose-500/20 text-xs font-bold transition-colors"
            >
              <Trash2 className="w-4 h-4" /> Clear All History
            </button>
          ) : undefined
        }
      />

      {/* Filter Search */}
      <div className="glass-card p-4">
        <div className="relative max-w-md">
          <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-3" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search history records..."
            className="w-full pl-10 pr-4 py-2 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl text-xs outline-none"
          />
        </div>
      </div>

      {filtered.length > 0 ? (
        <div className="space-y-3">
          {filtered.map((item) => (
            <div key={item._id} className="glass-card p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <h4 className="font-bold text-gray-900 dark:text-white text-sm">{item.calculatorTitle}</h4>
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-brand-100 dark:bg-brand-950 text-brand-600 dark:text-brand-400">
                    {item.category}
                  </span>
                </div>
                <div className="text-xs font-mono text-emerald-500 font-bold">
                  {item.formattedSummary || JSON.stringify(item.results)}
                </div>
                <div className="text-[10px] text-gray-400 mt-1">
                  {new Date(item.createdAt).toLocaleString()}
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => exportToPDF(item.calculatorTitle, item.inputs, item.results)}
                  className="px-2.5 py-1.5 rounded-lg bg-red-500/10 text-red-500 text-xs font-bold hover:bg-red-500/20"
                >
                  PDF
                </button>
                <button
                  onClick={() => exportToExcel(item.calculatorTitle, item.inputs, item.results)}
                  className="px-2.5 py-1.5 rounded-lg bg-emerald-500/10 text-emerald-500 text-xs font-bold hover:bg-emerald-500/20"
                >
                  Excel
                </button>
                <button
                  onClick={() => removeHistoryItem(item._id)}
                  className="p-1.5 text-gray-400 hover:text-rose-500 rounded-lg"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="glass-card p-12 text-center text-xs text-gray-400">
          No calculation history records found.
        </div>
      )}
    </div>
  );
};
