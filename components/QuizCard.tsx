"use client";

import { useState } from "react";
import { QuizQuestion } from "@/lib/types";

export function QuizCard({ quiz }: { quiz: QuizQuestion }) {
  const [selected, setSelected] = useState<number | null>(null);
  const [submitted, setSubmitted] = useState(false);

  return (
    <section className="card p-6">
      <div className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-500">Quick Check</div>
      <h2 className="mt-3 text-xl font-bold">{quiz.prompt}</h2>
      <div className="mt-4 grid gap-3">
        {quiz.choices.map((choice, index) => {
          const isCorrect = submitted && index === quiz.answerIndex;
          const isWrong = submitted && selected === index && index !== quiz.answerIndex;
          return (
            <button
              key={choice}
              onClick={() => setSelected(index)}
              className={`rounded-2xl border px-4 py-3 text-left transition ${
                isCorrect
                  ? "border-emerald-300 bg-emerald-50"
                  : isWrong
                    ? "border-rose-300 bg-rose-50"
                    : selected === index
                      ? "border-ink bg-slate-50"
                      : "border-slate-200 bg-white hover:bg-slate-50"
              }`}
            >
              {choice}
            </button>
          );
        })}
      </div>
      <div className="mt-5 flex flex-wrap gap-3">
        <button
          onClick={() => setSubmitted(true)}
          disabled={selected === null}
          className="rounded-xl bg-ink px-4 py-2 font-semibold text-white disabled:cursor-not-allowed disabled:opacity-50"
        >
          Submit
        </button>
        {submitted && (
          <div className="rounded-xl bg-slate-100 px-4 py-2 text-sm font-medium text-slate-700">
            {selected === quiz.answerIndex ? "Correct — well done." : "Not quite. Read the passage and try again."}
          </div>
        )}
      </div>
    </section>
  );
}
