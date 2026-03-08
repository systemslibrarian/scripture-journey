export default function ScriptureBlock({ label, reference, text }: { label: string; reference: string; text: string }) {
  return (
    <section className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
      <p className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-500">{label}</p>
      <h2 className="mt-2 text-lg font-bold">{reference}</h2>
      <p className="mt-3 text-lg leading-8 text-slate-700">“{text}”</p>
    </section>
  );
}
