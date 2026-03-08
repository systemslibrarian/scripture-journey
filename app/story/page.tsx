import LessonCard from '@/components/LessonCard';
import { lessons } from '@/data/lessons';

export default function StoryPage() {
  return (
    <main className="mx-auto max-w-6xl px-4 py-10">
      <div className="glass-card rounded-[2rem] p-6">
        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#7e622a]">Story Path</p>
        <h1 className="mt-2 text-4xl font-semibold text-[#1b1a17]">From Promise to Fulfillment</h1>
        <p className="mt-3 max-w-3xl text-[#4a4338]">
          Move through short lessons that connect the storyline of Scripture from Eden, to covenant, to cross, to
          resurrection.
        </p>
      </div>

      <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {lessons.map((lesson) => (
          <LessonCard key={lesson.slug} lesson={lesson} />
        ))}
      </div>
    </main>
  );
}
