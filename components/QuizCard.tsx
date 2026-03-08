'use client';

import { useState } from 'react';
import type { Lesson } from '@/lib/types';

export default function QuizCard({ quiz }: { quiz: Lesson['quiz'] }) {
  const [selected, setSelected] = useState<number | null>(null);
  const [submitted, setSubmitted] = useState(false);

  return (
    <div className="glass-card rounded-[2rem] p-6">
      <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#7e622a]">Quick Check</p>
      <h3 className="mt-3 text-2xl font-semibold text-[#1b1a17]">{quiz.question}</h3>
      <div className="mt-4 grid gap-3">
        {quiz.choices.map((choice, idx) => {
          const isCorrect = submitted && idx === quiz.answer;
          const isWrong = submitted && selected === idx && idx !== quiz.answer;
          return (
            <button
              key={choice}
              onClick={() => setSelected(idx)}
              className={`rounded-2xl border px-4 py-3 text-left transition ${
                isCorrect
                  ? 'border-emerald-400 bg-emerald-50'
                  : isWrong
                    ? 'border-rose-400 bg-rose-50'
                    : selected === idx
                      ? 'border-[#cab187] bg-[#fff7e6]'
                      : 'border-[#d8ccb8] bg-[#fefcf8] hover:bg-[#faf3e4]'
              }`}
            >
              {choice}
            </button>
          );
        })}
      </div>
      <button
        onClick={() => setSubmitted(true)}
        disabled={selected === null}
        className="mt-5 rounded-xl bg-[#5a332f] px-4 py-2 font-semibold text-[#fefcf8] disabled:cursor-not-allowed disabled:bg-[#9e8674]"
      >
        Submit
      </button>
      {submitted && (
        <p className="mt-4 text-sm text-[#4a4338]">
          {selected === quiz.answer ? 'Correct - well done.' : 'Not quite. Review the lesson and try again.'}
        </p>
      )}
    </div>
  );
}
