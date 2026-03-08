export type Lesson = {
  slug: string;
  id: number;
  title: string;
  otReference: string;
  otText: string;
  ntReference: string;
  ntText: string;
  summary: string;
  quiz: {
    question: string;
    choices: string[];
    answer: number;
  };
};

export const lessons: Lesson[] = [
  {
    slug: 'the-first-promise',
    id: 1,
    title: 'The First Promise',
    otReference: 'Genesis 3:15',
    otText: 'He will crush your head, and you will strike his heel.',
    ntReference: 'Hebrews 2:14 / 1 John 3:8',
    ntText: 'Jesus came to destroy the works of the devil and defeat sin and death.',
    summary:
      'Immediately after the fall, God gave the first promise of a coming Deliverer. Christians understand this as pointing forward to Christ.',
    quiz: {
      question: 'Who would crush the serpent?',
      choices: ['A prophet', 'A king', 'A descendant of the woman', 'An angel'],
      answer: 2,
    },
  },
  {
    slug: 'blessing-through-abraham',
    id: 2,
    title: 'Blessing Through Abraham',
    otReference: 'Genesis 12:3',
    otText: 'All peoples on earth will be blessed through you.',
    ntReference: 'Galatians 3:16',
    ntText: 'The promises were spoken to Abraham and to his seed... who is Christ.',
    summary:
      'God promised Abraham that blessing would come to the nations through his family line. Jesus fulfills that promise.',
    quiz: {
      question: 'Through whose family would the blessing come?',
      choices: ['Moses', 'Abraham', 'David', 'Elijah'],
      answer: 1,
    },
  },
  {
    slug: 'the-passover-lamb',
    id: 3,
    title: 'The Passover Lamb',
    otReference: 'Exodus 12',
    otText: 'A lamb without blemish... and when I see the blood, I will pass over you.',
    ntReference: 'John 1:29',
    ntText: 'Behold, the Lamb of God, who takes away the sin of the world!',
    summary:
      'The Passover lamb foreshadows Jesus, whose sacrifice saves from judgment and death.',
    quiz: {
      question: 'What animal was sacrificed at Passover?',
      choices: ['Goat', 'Lamb', 'Dove', 'Bull'],
      answer: 1,
    },
  },
];
