
import React from 'react';

const CodeIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-cyan-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
  </svg>
);

export const Header: React.FC = () => {
  return (
    <header className="bg-slate-800/50 backdrop-blur-sm border-b border-slate-700 p-4 shadow-lg sticky top-0 z-10">
      <div className="container mx-auto flex items-center gap-4">
        <CodeIcon />
        <div>
          <h1 className="text-xl font-bold text-white tracking-wide">Gemini Code Reviewer</h1>
          <p className="text-sm text-slate-400">Automated code analysis powered by Gemini</p>
        </div>
      </div>
    </header>
  );
};
