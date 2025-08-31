
import React from 'react';
import { LanguageSelector } from './LanguageSelector';
import { Spinner } from './Spinner';

interface CodeInputProps {
  code: string;
  setCode: (code: string) => void;
  language: string;
  setLanguage: (language: string) => void;
  onReview: () => void;
  isLoading: boolean;
}

export const CodeInput: React.FC<CodeInputProps> = ({ code, setCode, language, setLanguage, onReview, isLoading }) => {
  return (
    <div className="flex flex-col bg-slate-800 rounded-lg border border-slate-700 shadow-xl overflow-hidden">
      <div className="flex items-center justify-between p-3 bg-slate-900/50 border-b border-slate-700">
        <h2 className="text-lg font-semibold text-white">Your Code</h2>
        <LanguageSelector selectedLanguage={language} onLanguageChange={setLanguage} />
      </div>
      <textarea
        value={code}
        onChange={(e) => setCode(e.target.value)}
        placeholder={`Paste your ${language} code here...`}
        className="flex-grow p-4 bg-transparent text-slate-300 font-mono text-sm resize-none focus:outline-none placeholder-slate-500"
        spellCheck="false"
      />
      <div className="p-3 bg-slate-900/50 border-t border-slate-700">
        <button
          onClick={onReview}
          disabled={isLoading}
          className="w-full flex items-center justify-center gap-2 bg-cyan-600 text-white font-bold py-2 px-4 rounded-md hover:bg-cyan-500 disabled:bg-slate-600 disabled:cursor-not-allowed transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:ring-opacity-75"
        >
          {isLoading ? (
            <>
              <Spinner />
              Analyzing...
            </>
          ) : (
            'Review Code'
          )}
        </button>
      </div>
    </div>
  );
};
