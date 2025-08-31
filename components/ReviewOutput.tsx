
import React from 'react';
import type { ReviewResult } from '../types';
import { Spinner } from './Spinner';

interface ReviewOutputProps {
  result: ReviewResult;
}

const WelcomeMessage = () => (
    <div className="flex flex-col items-center justify-center h-full text-center text-slate-500 p-8">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
        </svg>
        <h3 className="text-xl font-semibold text-slate-400">Code Review Awaits</h3>
        <p className="mt-2">Paste your code in the editor, select the language, and click "Review Code" to get feedback from Gemini.</p>
    </div>
);

const FormattedFeedback: React.FC<{ feedback: string }> = ({ feedback }) => {
    // Basic markdown-like formatting for demonstration.
    // In a real app, a proper markdown parser would be better.
    const sections = feedback.split(/(\*\*.*?\*\*)/g).map((part, index) => {
        if (part.startsWith('**') && part.endsWith('**')) {
            return <strong key={index} className="text-cyan-400 font-bold">{part.slice(2, -2)}</strong>;
        }
        return part;
    });

    return (
        <pre className="whitespace-pre-wrap font-sans text-sm leading-relaxed">
            <code>{sections}</code>
        </pre>
    )
};


export const ReviewOutput: React.FC<ReviewOutputProps> = ({ result }) => {
  const renderContent = () => {
    switch (result.status) {
      case 'idle':
        return <WelcomeMessage />;
      case 'loading':
        return (
          <div className="flex flex-col items-center justify-center h-full text-slate-400">
            <Spinner size="lg" />
            <p className="mt-4 text-lg">Gemini is reviewing your code...</p>
            <p className="text-sm text-slate-500">This may take a moment.</p>
          </div>
        );
      case 'error':
        return (
          <div className="flex flex-col items-center justify-center h-full text-center p-8">
             <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-red-500 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <h3 className="text-xl font-semibold text-red-400">An Error Occurred</h3>
            <p className="mt-2 bg-red-900/50 text-red-300 p-3 rounded-md font-mono text-sm">{result.error}</p>
          </div>
        );
      case 'success':
        return (
            <div className="p-4 lg:p-6 text-slate-300">
               {result.feedback && <FormattedFeedback feedback={result.feedback} />}
            </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="flex flex-col bg-slate-800 rounded-lg border border-slate-700 shadow-xl overflow-y-auto">
      <div className="p-3 bg-slate-900/50 border-b border-slate-700 sticky top-0">
        <h2 className="text-lg font-semibold text-white">Review Feedback</h2>
      </div>
      <div className="flex-grow min-h-[300px]">
        {renderContent()}
      </div>
    </div>
  );
};
