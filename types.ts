export enum Difficulty {
  EASY = 'Easy',
  MEDIUM = 'Medium',
  HARD = 'Hard'
}

export type Language = 'cpp' | 'java' | 'python';

export interface Explanation {
  line: number; // 1-based line number relative to the snippet
  text: string;
}

export interface Snippet {
  id: string;
  topic: string;
  title?: string;
  code: string;
  difficulty: Difficulty;
  language: Language;
  explanations?: Explanation[];
}

export interface TestStats {
  wpm: number;
  accuracy: number;
  timeElapsed: number;
  errors: number;
  totalChars: number;
  maxCombo: number;
}

export interface GenerationConfig {
  topic: string;
  difficulty: Difficulty;
}