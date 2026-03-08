import LessonCard from '@/components/LessonCard';
import { lessons } from '@/data/lessons';

export default function StoryPage() {
  return (
    <main className="mx-auto max-w-6xl px-4 py-10">
      <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-amber-700">Story Mode</p>
        <h1 className="mt-2 text-3xl font-bold">The First Lessons</h1>
        <p className="mt-3 text-slate-600">See how the Bible points to Jesus from Genesis to the resurrection.</p>
      </div>
      <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {lessons.map((lesson) => (
          <LessonCard key={lesson.slug} lesson={lesson} />
        ))}
      </div>
    </main>
  );
}
