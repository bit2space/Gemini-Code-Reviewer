
import React, { useState, useCallback } from 'react';
import { CodeInput } from './components/CodeInput';
import { ReviewOutput } from './components/ReviewOutput';
import { Header } from './components/Header';
import { reviewCode } from './services/geminiService';
import { SUPPORTED_LANGUAGES } from './constants';
import type { ReviewResult } from './types';

const App: React.FC = () => {
  const [code, setCode] = useState<string>('');
  const [language, setLanguage] = useState<string>(SUPPORTED_LANGUAGES[0].value);
  const [reviewResult, setReviewResult] = useState<ReviewResult>({ status: 'idle', feedback: null, error: null });

  const handleReview = useCallback(async () => {
    if (!code.trim()) {
      setReviewResult({ status: 'error', feedback: null, error: 'Please enter some code to review.' });
      return;
    }
    setReviewResult({ status: 'loading', feedback: null, error: null });
    try {
      const feedback = await reviewCode(code, language);
      setReviewResult({ status: 'success', feedback, error: null });
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'An unknown error occurred.';
      setReviewResult({ status: 'error', feedback: null, error: `Failed to get review: ${errorMessage}` });
    }
  }, [code, language]);

  return (
    <div className="min-h-screen bg-slate-900 text-slate-200 flex flex-col font-sans">
      <Header />
      <main className="flex-grow grid grid-cols-1 lg:grid-cols-2 gap-4 p-4 lg:p-6">
        <CodeInput
          code={code}
          setCode={setCode}
          language={language}
          setLanguage={setLanguage}
          onReview={handleReview}
          isLoading={reviewResult.status === 'loading'}
        />
        <ReviewOutput result={reviewResult} />
      </main>
    </div>
  );
};

export default App;
