export type QuizQuestion = {
  question: string;
  choices: string[];
  answer: number;
};

export type Lesson = {
  id: number;
  slug: string;
  title: string;
  otReference: string;
  otText: string;
  ntReference: string;
  ntText: string;
  summary: string;
  keyIdea: string;
  durationMinutes: number;
  quiz: QuizQuestion;
};

export type Prophecy = {
  id: number;
  title: string;
  category: 'Promise' | 'Prophecy' | 'Pattern';
  otReference: string;
  otText: string;
  ntReference: string;
  ntText: string;
  significance: string;
};

export type Track = {
  slug: string;
  title: string;
  description: string;
  href: string;
  totalSteps: number;
};

export type Badge = {
  id: string;
  title: string;
  description: string;
};
