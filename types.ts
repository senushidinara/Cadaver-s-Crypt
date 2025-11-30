export enum ViewState {
  LAB = 'LAB',
  TRIALS = 'TRIALS',
  PROFILE = 'PROFILE'
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'model';
  text: string;
  isError?: boolean;
}

export interface AnatomyPart {
  id: string;
  name: string;
  description: string;
  path: string; // SVG path d attribute
  cx: number; // center x for label/effects
  cy: number; // center y for label/effects
}

export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswerIndex: number;
  explanation: string;
  difficulty: 'easy' | 'medium' | 'hard';
}

export interface UserStats {
  soulsSaved: number; // Correct answers
  sanityLevel: number; // Percentage
  currentStreak: number;
}