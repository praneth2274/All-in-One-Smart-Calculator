import React from 'react';
import { FileText, FileSpreadsheet, Volume2, VolumeX, Share2, Copy } from 'lucide-react';
import { exportToPDF } from '../../utils/pdfExporter';
import { exportToExcel } from '../../utils/excelExporter';
import { speakText, stopSpeech } from '../../utils/speech';

interface ExportButtonsProps {
  calculatorTitle: string;
  inputs: Record<string, any>;
  results: Record<string, any>;
  aiExplanation?: string;
  summaryText?: string;
}

export const ExportButtons: React.FC<ExportButtonsProps> = ({
  calculatorTitle,
  inputs,
  results,
  aiExplanation,
  summaryText,
}) => {
  const [isSpeaking, setIsSpeaking] = React.useState(false);
  const [copied, setCopied] = React.useState(false);

  const handlePDF = () => {
    exportToPDF(calculatorTitle, inputs, results, aiExplanation);
  };

  const handleExcel = () => {
    exportToExcel(calculatorTitle, inputs, results);
  };

  const handleVoice = () => {
    if (isSpeaking) {
      stopSpeech();
      setIsSpeaking(false);
    } else {
      const speechPayload = summaryText || `${calculatorTitle} summary: ${Object.entries(results).map(([k,v]) => `${k} is ${v}`).join(', ')}`;
      speakText(speechPayload);
      setIsSpeaking(true);
    }
  };

  const handleCopy = () => {
    const textToCopy = `${calculatorTitle} Result:\n` + Object.entries(results).map(([k,v]) => `${k}: ${v}`).join('\n');
    navigator.clipboard.writeText(textToCopy);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="flex flex-wrap items-center gap-2">
      <button
        onClick={handlePDF}
        className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-red-50 dark:bg-red-950/40 text-red-600 dark:text-red-400 border border-red-200 dark:border-red-800 text-xs font-bold hover:bg-red-100 transition-colors"
        title="Download PDF Report"
      >
        <FileText className="w-4 h-4" /> PDF Report
      </button>

      <button
        onClick={handleExcel}
        className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800 text-xs font-bold hover:bg-emerald-100 transition-colors"
        title="Export Excel Worksheet"
      >
        <FileSpreadsheet className="w-4 h-4" /> Export Excel
      </button>

      <button
        onClick={handleVoice}
        className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl border text-xs font-bold transition-colors ${
          isSpeaking
            ? 'bg-amber-500 text-white border-amber-600 animate-pulse'
            : 'bg-amber-50 dark:bg-amber-950/40 text-amber-600 dark:text-amber-400 border-amber-200 dark:border-amber-800 hover:bg-amber-100'
        }`}
        title="Voice Readout"
      >
        {isSpeaking ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
        {isSpeaking ? 'Stop Voice' : 'Read Aloud'}
      </button>

      <button
        onClick={handleCopy}
        className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-700 text-xs font-bold hover:bg-gray-200 transition-colors"
        title="Copy Results to Clipboard"
      >
        <Copy className="w-4 h-4" />
        {copied ? 'Copied!' : 'Copy Summary'}
      </button>
    </div>
  );
};
