export type LessonCategory =
  | 'Lineage'
  | 'Identity'
  | 'Ministry'
  | 'Rejection'
  | 'Passion'
  | 'Resurrection'
  | 'Kingdom';

export interface QuizData {
  question: string;
  choices: string[];
  answer: number;
  explanation?: string;
  fillInBlank?: {
    prompt: string;
    answer: string;
    acceptableAnswers?: string[];
  };
}

export interface EdersheimData {
  attested: boolean;
  work: string;
  appendix: string;
  note: string;
}

export interface McDowellData {
  attested: boolean;
  work: string;
  prophecyNumber: number;
  prophecyTitle: string;
  note: string;
}

export interface PayneData {
  attested: boolean;
  work: string;
  encyclopediaNumber: number;
  prophecyReference: string;
  note: string;
}

export interface Scholarship {
  payne?: PayneData;
  edersheim?: EdersheimData;
  mcdowell?: McDowellData;
}

export type ProphecyType =
  | 'Direct Prophecy'
  | 'Messianic Psalm'
  | 'Typology'
  | 'Prophetic Pattern';

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
  prophecyType: ProphecyType;
  status?: 'active' | 'coming-soon';
  scholarship?: Scholarship;
}

export interface Badge {
  id: string;
  title: string;
  description: string;
}