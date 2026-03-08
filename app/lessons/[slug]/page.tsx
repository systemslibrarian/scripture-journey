import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import QuizCard from '@/components/QuizCard';
import ScriptureBlock from '@/components/ScriptureBlock';
import { lessons } from '@/data/lessons';

export function generateStaticParams() {
  return lessons.map((lesson) => ({ slug: lesson.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const lesson = lessons.find((item) => item.slug === params.slug);

  return {
    title: lesson ? `${lesson.title} | Scripture Journey` : 'Lesson | Scripture Journey',
    description: lesson?.summary,
  };
}

export default function LessonPage({ params }: { params: { slug: string } }) {
  const lesson = lessons.find((item) => item.slug === params.slug);

  if (!lesson) {
    notFound();
  }

  return (
    <main className="mx-auto max-w-4xl px-4 py-10">
      <div className="glass-card mb-6 rounded-[2rem] p-6">
        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#7e622a]">Lesson {lesson.id}</p>
        <h1 className="mt-2 text-4xl font-semibold text-[#1b1a17]">{lesson.title}</h1>
        <p className="mt-3 text-[#5f5548]">Estimated time: {lesson.durationMinutes} minutes</p>
      </div>

      <div className="space-y-6">
        <ScriptureBlock label="The Promise" reference={lesson.otReference} text={lesson.otText} />
        <ScriptureBlock label="Fulfilled in Jesus" reference={lesson.ntReference} text={lesson.ntText} />

        <section className="glass-card rounded-[2rem] p-6">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#7e622a]">Why this matters</p>
          <p className="mt-3 leading-7 text-[#4a4338]">{lesson.summary}</p>
          <p className="mt-4 rounded-xl border border-[#d8ccb8] bg-[#fff8ea] px-4 py-3 text-sm font-medium text-[#5a332f]">
            Key idea: {lesson.keyIdea}
          </p>
        </section>

        <QuizCard quiz={lesson.quiz} />
      </div>
    </main>
  );
}
