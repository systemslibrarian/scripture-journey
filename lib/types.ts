export type QuizQuestion = {
  prompt: string;
  choices: string[];
  answerIndex: number;
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
  whyItMatters: string;
  quiz: QuizQuestion;
};
