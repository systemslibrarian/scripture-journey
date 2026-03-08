'use client';

import { useState } from 'react';
import type { Lesson } from '@/data/lessons';

export default function QuizCard({ quiz }: { quiz: Lesson['quiz'] }) {
  const [selected, setSelected] = useState<number | null>(null);
  const [submitted, setSubmitted] = useState(false);

  return (
    <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
      <p className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-500">Quick Check</p>
      <h3 className="mt-3 text-xl font-bold">{quiz.question}</h3>
      <div className="mt-4 grid gap-3">
        {quiz.choices.map((choice, idx) => {
          const isCorrect = submitted && idx === quiz.answer;
          const isWrong = submitted && selected === idx && idx !== quiz.answer;
          return (
            <button
              key={choice}
              onClick={() => setSelected(idx)}
              className={`rounded-2xl border px-4 py-3 text-left ${
                isCorrect
                  ? 'border-emerald-300 bg-emerald-50'
                  : isWrong
                    ? 'border-rose-300 bg-rose-50'
                    : 'border-slate-200 bg-white'
              }`}
            >
              {choice}
            </button>
          );
        })}
      </div>
      <button onClick={() => setSubmitted(true)} className="mt-5 rounded-xl bg-slate-900 px-4 py-2 font-semibold text-white">
        Submit
      </button>
      {submitted && (
        <p className="mt-4 text-sm text-slate-700">
          {selected === quiz.answer ? 'Correct — well done.' : 'Not quite. Review the lesson and try again.'}
        </p>
      )}
    </div>
  );
}
