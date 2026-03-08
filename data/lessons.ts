import type { Lesson } from '@/lib/types';

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
    keyIdea: 'From the first page of human sin, God announces redeeming grace.',
    durationMinutes: 3,
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
    keyIdea: 'The gospel was promised beforehand through Abraham.',
    durationMinutes: 4,
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
    keyIdea: 'Rescue by blood points to Christ, our true Passover Lamb.',
    durationMinutes: 4,
    quiz: {
      question: 'What animal was sacrificed at Passover?',
      choices: ['Goat', 'Lamb', 'Dove', 'Bull'],
      answer: 1,
    },
  },
  {
    slug: 'the-son-of-david',
    id: 4,
    title: 'The Son of David',
    otReference: '2 Samuel 7:12-13',
    otText: 'I will raise up your offspring... and I will establish the throne of his kingdom forever.',
    ntReference: 'Luke 1:32-33',
    ntText: 'The Lord God will give him the throne of his father David... and of his kingdom there will be no end.',
    summary:
      'God promised David an everlasting king. Jesus, born in David\'s line, reigns forever as the promised Messiah.',
    keyIdea: 'Jesus is not only Savior, but the rightful eternal King.',
    durationMinutes: 4,
    quiz: {
      question: 'What did God promise David about his kingdom?',
      choices: ['It would end in exile', 'It would be hidden', 'It would last forever', 'It would move to Egypt'],
      answer: 2,
    },
  },
  {
    slug: 'the-suffering-servant',
    id: 5,
    title: 'The Suffering Servant',
    otReference: 'Isaiah 53:5',
    otText: 'He was pierced for our transgressions... and by his wounds we are healed.',
    ntReference: '1 Peter 2:24',
    ntText: 'He himself bore our sins in his body on the tree... by his wounds you have been healed.',
    summary:
      'Isaiah describes a servant who suffers in the place of sinners. The New Testament identifies this sacrifice in Jesus.',
    keyIdea: 'The cross is substitution: the righteous One for the unrighteous.',
    durationMinutes: 5,
    quiz: {
      question: 'According to Isaiah 53, why did the Servant suffer?',
      choices: ['For his own sins', 'To defeat Rome', 'For our transgressions', 'To teach only by example'],
      answer: 2,
    },
  },
  {
    slug: 'the-empty-tomb-promised',
    id: 6,
    title: 'The Empty Tomb Promised',
    otReference: 'Psalm 16:10',
    otText: 'You will not abandon me to the realm of the dead, nor let your faithful one see decay.',
    ntReference: 'Acts 2:31-32',
    ntText: 'He spoke of the resurrection of the Messiah... God has raised this Jesus to life.',
    summary:
      'David spoke prophetically of one who would not remain in the grave. The apostles proclaim this fulfilled in Jesus\' resurrection.',
    keyIdea: 'The resurrection is promised, historical, and central to Christian hope.',
    durationMinutes: 4,
    quiz: {
      question: 'What does Psalm 16 point forward to?',
      choices: ['Temple rebuilding', 'Messiah\'s resurrection', 'A new exodus', 'The flood'],
      answer: 1,
    },
  },
];
