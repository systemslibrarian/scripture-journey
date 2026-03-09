export type LessonCategory =
  | 'Identity'
  | 'Ministry'
  | 'Rejection'
  | 'Passion'
  | 'Resurrection';

export interface QuizData {
  question: string;
  choices: string[];
  answer: number;
}

export interface Lesson {
  id: number;
  slug: string;
  title: string;
  category: LessonCategory;
  otReference: string;
  otText: string;
  ntReference: string;
  ntText: string;
  summary: string;
  whyItMatters: string;
  reflection: string;
  quiz: QuizData;
}

export interface Badge {
  id: string;
  title: string;
  description: string;
}