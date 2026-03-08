import { notFound } from 'next/navigation';
import QuizCard from '@/components/QuizCard';
import ScriptureBlock from '@/components/ScriptureBlock';
import { lessons } from '@/data/lessons';

export default function LessonPage({ params }: { params: { slug: string } }) {
  const lesson = lessons.find((item) => item.slug === params.slug);

  if (!lesson) {
    notFound();
  }

  return (
    <main className="mx-auto max-w-4xl px-4 py-10">
      <div className="mb-6 rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-amber-700">Lesson {lesson.id}</p>
        <h1 className="mt-2 text-3xl font-bold">{lesson.title}</h1>
        <p className="mt-3 text-slate-600">Estimated time: 2–3 minutes</p>
      </div>
      <div className="space-y-6">
        <ScriptureBlock label="The Promise" reference={lesson.otReference} text={lesson.otText} />
        <ScriptureBlock label="Fulfilled in Jesus" reference={lesson.ntReference} text={lesson.ntText} />
        <section className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-500">Why this matters</p>
          <p className="mt-3 leading-7 text-slate-700">{lesson.summary}</p>
        </section>
        <QuizCard quiz={lesson.quiz} />
      </div>
    </main>
  );
}
