type ScriptureBlockProps = {
  label: string
  reference: string
  text: string
}

export default function ScriptureBlock({
  label,
  reference,
  text,
}: ScriptureBlockProps) {
  return (
    <section className="rounded-3xl border bg-white p-6 shadow-sm" aria-label={`${label} scripture: ${reference}`}>

      <div className="text-xs font-semibold uppercase tracking-wide text-slate-500">
        {label}
      </div>

      <h3 className="mt-2 text-lg font-bold text-slate-900">
        {reference}
      </h3>

      <p className="mt-3 text-lg leading-relaxed text-slate-700">
        {text}
      </p>

    </section>
  )
}