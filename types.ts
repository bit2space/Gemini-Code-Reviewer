
export interface Language {
  value: string;
  label: string;
}

export interface ReviewResult {
  status: 'idle' | 'loading' | 'success' | 'error';
  feedback: string | null;
  error: string | null;
}
