export default function ScriptureBlock({ label, reference, text }: { label: string; reference: string; text: string }) {
  return (
    <section className="glass-card rounded-[2rem] p-6">
      <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#7e622a]">{label}</p>
      <h2 className="mt-2 text-xl font-semibold text-[#1b1a17]">{reference}</h2>
      <p className="mt-3 text-lg leading-8 text-[#4a4338]">"{text}"</p>
    </section>
  );
}
