import React, { useState, useEffect } from 'react';
import { Mic, MicOff, X, Sparkles, Check } from 'lucide-react';

interface VoiceInputModalProps {
  isOpen: boolean;
  onClose: () => void;
  onTranscript: (text: string) => void;
}

export const VoiceInputModal: React.FC<VoiceInputModalProps> = ({ isOpen, onClose, onTranscript }) => {
  const [isListening, setIsListening] = useState(false);
  const [spokenText, setSpokenText] = useState('');
  const [recognition, setRecognition] = useState<any>(null);

  useEffect(() => {
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
      const rec = new SpeechRecognition();
      rec.continuous = false;
      rec.interimResults = true;
      rec.lang = 'en-US';

      rec.onresult = (event: any) => {
        let transcript = '';
        for (let i = event.resultIndex; i < event.results.length; i++) {
          transcript += event.results[i][0].transcript;
        }
        setSpokenText(transcript);
      };

      rec.onend = () => {
        setIsListening(false);
      };

      setRecognition(rec);
    }
  }, []);

  const toggleListening = () => {
    if (!recognition) {
      alert('Speech Recognition is not supported on your browser.');
      return;
    }
    if (isListening) {
      recognition.stop();
      setIsListening(false);
    } else {
      setSpokenText('');
      recognition.start();
      setIsListening(true);
    }
  };

  const handleApply = () => {
    if (spokenText) {
      onTranscript(spokenText);
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gray-900/60 backdrop-blur-sm">
      <div className="w-full max-w-md bg-white dark:bg-gray-900 rounded-3xl p-6 shadow-2xl border border-gray-200 dark:border-gray-800 text-center relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-xl text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="w-16 h-16 rounded-3xl bg-brand-500/10 text-brand-500 mx-auto flex items-center justify-center mb-4">
          <Sparkles className="w-8 h-8 animate-pulse" />
        </div>

        <h3 className="text-xl font-extrabold text-gray-900 dark:text-white mb-1">
          Voice Calculation Input
        </h3>
        <p className="text-xs text-gray-500 dark:text-gray-400 mb-6">
          Speak your calculation parameters (e.g. "Loan amount 500000 rate 8.5 tenure 5 years")
        </p>

        {/* Mic Pulse Button */}
        <button
          onClick={toggleListening}
          className={`w-24 h-24 rounded-full mx-auto flex items-center justify-center transition-all duration-300 shadow-xl mb-6 ${
            isListening
              ? 'bg-rose-500 text-white animate-pulse ring-8 ring-rose-500/20'
              : 'bg-brand-600 text-white hover:scale-105'
          }`}
        >
          {isListening ? <Mic className="w-10 h-10 animate-bounce" /> : <MicOff className="w-10 h-10" />}
        </button>

        <p className="text-xs font-semibold text-gray-400 mb-3">
          {isListening ? 'Listening now... Speak clearly' : 'Tap microphone to start speaking'}
        </p>

        {/* Transcript Box */}
        {spokenText && (
          <div className="p-4 rounded-2xl bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-left mb-6">
            <span className="text-[10px] font-bold uppercase tracking-wider text-brand-500 block mb-1">Recognized Speech:</span>
            <p className="text-sm font-medium text-gray-900 dark:text-white">{spokenText}</p>
          </div>
        )}

        <div className="flex gap-3">
          <button
            onClick={onClose}
            className="w-1/2 py-2.5 rounded-xl border border-gray-300 dark:border-gray-700 text-sm font-bold text-gray-700 dark:text-gray-300"
          >
            Cancel
          </button>
          <button
            onClick={handleApply}
            disabled={!spokenText}
            className="w-1/2 py-2.5 rounded-xl bg-brand-600 hover:bg-brand-500 text-white text-sm font-bold flex items-center justify-center gap-2 disabled:opacity-50"
          >
            <Check className="w-4 h-4" /> Apply Input
          </button>
        </div>

      </div>
    </div>
  );
};
