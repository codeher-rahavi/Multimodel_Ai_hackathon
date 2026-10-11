export type PageId =
  | 'dashboard'
  | 'materials'
  | 'tutor'
  | 'quiz'
  | 'results'
  | 'analytics';

export interface NavItem {
  id: PageId;
  label: string;
  icon: string;
  description: string;
}

export interface TopicProgress {
  topic: string;
  mastery: number;
  totalQuestions: number;
  correctAnswers: number;
  lastStudied: string;
}

export interface QuizSummary {
  id: string;
  title: string;
  topic: string;
  score: number;
  totalQuestions: number;
  date: string;
  difficulty: 'easy' | 'medium' | 'hard';
}

export interface WeakTopic {
  topic: string;
  mastery: number;
  recommendation: string;
  attemptedQuestions: number;
}

export interface StudyRecommendation {
  id: string;
  title: string;
  type: 'review' | 'practice' | 'watch' | 'read';
  topic: string;
  priority: 'high' | 'medium' | 'low';
  estimatedTime: string;
}

export interface StudyMaterial {
  id: string;
  title: string;
  type: 'pdf' | 'slides' | 'video';
  size: string;
  uploadDate: string;
  topic: string;
  uploaded: boolean;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'tutor';
  content: string;
  timestamp: string;
  citations?: Citation[];
}

export interface Citation {
  id: string;
  source: string;
  page: string;
  snippet: string;
}

export interface QuizQuestion {
  id: string;
  type: 'multiple-choice' | 'short-answer';
  question: string;
  options?: string[];
  correctAnswer: string;
  explanation: string;
  topic: string;
  difficulty: 'easy' | 'medium' | 'hard';
  userAnswer?: string;
  isCorrect?: boolean;
}

export interface QuizResult {
  quizId: string;
  title: string;
  topic: string;
  difficulty: 'easy' | 'medium' | 'hard';
  score: number;
  totalQuestions: number;
  date: string;
  questions: QuizQuestion[];
  weakTopics: WeakTopic[];
}

export interface ProgressPoint {
  date: string;
  mastery: number;
  quizzesTaken: number;
}

export interface StatCard {
  label: string;
  value: string;
  change: string;
  trend: 'up' | 'down' | 'stable';
  icon: string;
}
