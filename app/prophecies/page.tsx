import { prophecies } from '@/data/prophecies';

export default function PropheciesPage() {
  return (
    <main className="mx-auto max-w-6xl px-4 py-10">
      <div className="glass-card rounded-[2rem] p-6">
        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#7e622a]">Prophecy Path</p>
        <h1 className="mt-2 text-4xl font-semibold text-[#1b1a17]">Major Prophecies Fulfilled in Jesus</h1>
        <p className="mt-3 max-w-3xl text-[#4a4338]">Each card pairs an Old Testament witness with New Testament fulfillment.</p>
      </div>

      <div className="mt-6 grid gap-4 md:grid-cols-2">
        {prophecies.map((prophecy) => (
          <article key={prophecy.id} className="glass-card rounded-[2rem] p-6">
            <p className="gold-pill px-3 py-1 text-xs font-semibold uppercase tracking-[0.15em]">{prophecy.category}</p>
            <h2 className="mt-3 text-2xl font-semibold text-[#1b1a17]">{prophecy.title}</h2>

            <div className="mt-4 space-y-3 text-sm leading-6 text-[#4a4338]">
              <div className="rounded-xl border border-[#dfd2be] bg-[#fffaf0] p-3">
                <p className="text-xs uppercase tracking-[0.14em] text-[#7e622a]">Old Testament</p>
                <p className="mt-1 font-semibold text-[#1b1a17]">{prophecy.otReference}</p>
                <p className="mt-1">{prophecy.otText}</p>
              </div>

              <div className="rounded-xl border border-[#d3d7c7] bg-[#f4f8f2] p-3">
                <p className="text-xs uppercase tracking-[0.14em] text-[#44584d]">New Testament</p>
                <p className="mt-1 font-semibold text-[#1b1a17]">{prophecy.ntReference}</p>
                <p className="mt-1">{prophecy.ntText}</p>
              </div>
            </div>

            <p className="mt-4 text-sm text-[#5f5548]">{prophecy.significance}</p>
          </article>
        ))}
      </div>
    </main>
  );
}
