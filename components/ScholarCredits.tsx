import type { Scholarship } from "@/lib/types";

type Props = {
  scholarship?: Scholarship;
};

export default function ScholarCredits({ scholarship }: Props) {
  const hasPayne = scholarship?.payne?.attested;
  const hasEdersheim = scholarship?.edersheim?.attested;
  const hasMcDowell = scholarship?.mcdowell?.attested;

  if (!hasPayne && !hasEdersheim && !hasMcDowell) {
    return null;
  }

  return (
    <section className="rounded-[2rem] border border-[#d8ccb8] bg-white p-8 shadow-sm">
      <div className="text-sm font-semibold uppercase tracking-[0.22em] text-[#7e622a]">
        Scholar Credits
      </div>

      <div className="mt-3 flex flex-wrap gap-2">
        {hasPayne && (
          <span className="inline-flex items-center rounded-full bg-[#efe8fb] px-2 py-1 text-xs font-medium text-[#5f3a8a]">
            📘 Payne ✓
          </span>
        )}
        {hasEdersheim && (
          <span className="inline-flex items-center rounded-full bg-[#f5f0e5] px-2 py-1 text-xs font-medium text-[#7e622a]">
            📚 Edersheim ✓
          </span>
        )}
        {hasMcDowell && (
          <span className="inline-flex items-center rounded-full bg-[#e8f0f5] px-2 py-1 text-xs font-medium text-[#2a5a7e]">
            📖 McDowell ✓
          </span>
        )}
      </div>

      <div className="mt-6 grid gap-4 md:grid-cols-3">
        {hasPayne && scholarship?.payne && (
          <article className="rounded-2xl border border-[#d9c9ee] bg-[#fbf8ff] p-4">
            <h3 className="text-sm font-semibold text-[#3f2a5f]">J. Barton Payne</h3>
            <p className="mt-2 text-xs font-semibold uppercase tracking-wide text-[#5f3a8a]">
              Payne #{scholarship.payne.encyclopediaNumber} — {scholarship.payne.prophecyReference}
            </p>
            <p className="mt-2 text-sm leading-6 text-[#4a4338]">{scholarship.payne.note}</p>
          </article>
        )}

        {hasEdersheim && scholarship?.edersheim && (
          <article className="rounded-2xl border border-[#d8ccb8] bg-[#fffdf8] p-4">
            <h3 className="text-sm font-semibold text-[#1b1a17]">Alfred Edersheim</h3>
            <p className="mt-2 text-xs font-semibold uppercase tracking-wide text-[#7e622a]">
              {scholarship.edersheim.work} • Appendix {scholarship.edersheim.appendix}
            </p>
            <p className="mt-2 text-sm leading-6 text-[#4a4338]">{scholarship.edersheim.note}</p>
          </article>
        )}

        {hasMcDowell && scholarship?.mcdowell && (
          <article className="rounded-2xl border border-[#cfe0ea] bg-[#f8fbfd] p-4">
            <h3 className="text-sm font-semibold text-[#1b1a17]">Josh McDowell</h3>
            <p className="mt-2 text-xs font-semibold uppercase tracking-wide text-[#2a5a7e]">
              {scholarship.mcdowell.work} • #{scholarship.mcdowell.prophecyNumber} {scholarship.mcdowell.prophecyTitle}
            </p>
            <p className="mt-2 text-sm leading-6 text-[#4a4338]">{scholarship.mcdowell.note}</p>
          </article>
        )}
      </div>
    </section>
  );
}
