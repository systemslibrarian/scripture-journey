import Link from 'next/link';

export default function Hero() {
  return (
    <section className="grid gap-8 py-14 lg:grid-cols-[1.08fr_0.92fr] lg:items-center">
      <div className="rise-in">
        <p className="gold-pill mb-4 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.22em]">Scripture Journey V1</p>
        <h1 className="text-5xl font-semibold leading-tight text-[#1b1a17] sm:text-6xl">
          Discover Jesus
          <span className="block text-[#7e622a]">Through the Whole Bible</span>
        </h1>
        <p className="mt-5 max-w-xl text-lg leading-8 text-[#4a4338]">
          Walk through promises, prophecies, and patterns in short lessons that connect the Old Testament to Christ's life,
          death, and resurrection.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Link
            href="/story"
            className="rounded-2xl bg-[#5a332f] px-5 py-3 font-semibold text-[#fefcf8] transition hover:bg-[#472823]"
          >
            Start the Journey
          </Link>
          <Link
            href="/map"
            className="rounded-2xl border border-[#d8ccb8] bg-[#fefcf8] px-5 py-3 font-semibold text-[#2f3e36] transition hover:bg-[#f7f1e4]"
          >
            Explore the Map
          </Link>
        </div>
      </div>
      <div className="rise-in glass-card rounded-[2rem] p-6 [animation-delay:120ms]">
        <div className="rounded-[1.5rem] bg-[#2e3f36] p-6 text-[#f7f4ea]">
          <p className="text-xs uppercase tracking-[0.2em] text-[#d6c8a5]">Lesson Preview</p>
          <h2 className="mt-3 text-3xl font-semibold">The First Promise</h2>
          <div className="mt-5 rounded-2xl bg-white/10 p-4">
            <p className="text-xs uppercase tracking-wide text-[#eadfca]">Old Testament</p>
            <p className="mt-2 font-semibold">Genesis 3:15</p>
            <p className="mt-2 text-sm text-[#f4efe0]">"He will crush your head, and you will strike his heel."</p>
          </div>
          <div className="mt-4 rounded-2xl border border-white/20 p-4">
            <p className="text-xs uppercase tracking-wide text-[#eadfca]">New Testament</p>
            <p className="mt-2 font-semibold">Hebrews 2:14</p>
            <p className="mt-2 text-sm text-[#f4efe0]">Jesus shares our humanity to destroy the one who held the power of death.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
