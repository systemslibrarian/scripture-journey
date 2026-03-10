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
    <section className="rounded-3xl border border-[#d8ccb8] bg-white p-6 shadow-sm" aria-label={`${label} scripture: ${reference}`}>

      <div className="text-xs font-semibold uppercase tracking-wide text-[#7e622a]">
        {label}
      </div>

      <h3 className="mt-2 text-lg font-bold text-[#1b1a17]">
        {reference}
      </h3>

      <p className="mt-3 text-lg leading-relaxed text-[#4a4338]">
        {text}
      </p>

    </section>
  )
}