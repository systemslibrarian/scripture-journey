import Link from 'next/link';

export default function NotFoundPage() {
  return (
    <main className="mx-auto max-w-3xl px-4 py-20 text-center sm:px-6 lg:px-8">
      <div className="rounded-[2rem] border border-slate-200 bg-white p-10 shadow-sm">
        <div className="text-sm font-semibold uppercase tracking-[0.18em] text-amber-700">
          Not Found
        </div>
        <h1 className="mt-2 text-3xl font-bold">Lesson not found</h1>
        <p className="mt-4 text-slate-600">
          The lesson you were looking for could not be found.
        </p>
        <Link
          href="/prophecies"
          className="mt-6 inline-block rounded-2xl bg-slate-900 px-5 py-3 font-semibold text-white"
        >
          Go to Top 100 Prophecies
        </Link>
      </div>
    </main>
  );
}