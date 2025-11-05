// types.ts

export interface Law {
  id: string;
  category: string;
  title: string;
  articleOrSection: string;
  hindiTitle: string;
  hindiArticleOrSection: string;
  explanation: string;
  hindiExplanation: string;
  keywords: string[];
  updatedAt: string;
}

export interface User {
  id: string;
  username: string;
  email: string;
  role: 'user' | 'admin';
  notifications: string[];
}

export interface AuthContextType {
  isAuthenticated: boolean;
  currentUser: User | null;
  login: (username: string, password: string) => Promise<boolean>;
  signup: (username: string, email: string, password: string) => Promise<boolean>;
  logout: () => void;
  // Add `updateCurrentUser` to the AuthContextType interface
  updateCurrentUser: (user: User) => void; 
}

export interface LawContextType {
  laws: Law[];
  addLaw: (law: Law) => void;
  updateLaw: (law: Law) => void;
  deleteLaw: (id: string) => void;
  searchLaws: (query: string, language: 'en' | 'hi') => Law[];
  getLawById: (id: string) => Law | undefined;
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'bot';
  text: string;
  timestamp: string;
}

export type ChatSession = ChatMessage[];

export interface ProblemSolverResult {
  lawName: string;
  articleOrSection: string;
  explanation: string;
  url?: string;
}

export enum Language {
  ENGLISH = 'en',
  HINDI = 'hi',
}

export interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
}