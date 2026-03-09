import Link from "next/link"
import { prophecies } from "@/data/prophecies"
import type { LessonCategory } from "@/lib/types"

const categoryOrder: LessonCategory[] = [
  "Identity",
  "Ministry",
  "Rejection",
  "Passion",
  "Resurrection",
]

const categoryColors: Record<LessonCategory, string> = {
  Identity: "border-amber-300 bg-amber-50",
  Ministry: "border-sky-300 bg-sky-50",
  Rejection: "border-rose-300 bg-rose-50",
  Passion: "border-purple-300 bg-purple-50",
  Resurrection: "border-emerald-300 bg-emerald-50",
}

const categoryDescriptions: Record<LessonCategory, string> = {
  Identity: "Prophecies about who the Messiah would be — his lineage, birthplace, and nature.",
  Ministry: "Prophecies about what the Messiah would do — healing, teaching, and his mission.",
  Rejection: "Prophecies about the Messiah being opposed, betrayed, and rejected.",
  Passion: "Prophecies about the suffering and death of the Messiah.",
  Resurrection: "Prophecies about the Messiah's victory over death, ascension, and eternal reign.",
}

export default function MapPage() {
  const grouped = categoryOrder.map((cat) => ({
    category: cat,
    lessons: prophecies.filter((l) => l.category === cat),
  }))

  return (
    <div className="space-y-8">
      <div className="rounded-[2rem] border border-[#d8ccb8] bg-white p-8 shadow-sm">
        <div className="text-sm font-semibold uppercase tracking-[0.22em] text-[#7e622a]">
          Prophecy Map
        </div>

        <h1 className="mt-2 text-3xl font-bold text-[#1b1a17]">
          A Visual Map of Scripture
        </h1>

        <p className="mt-4 max-w-2xl text-[#4a4338]">
          The story of Scripture unfolds through promises, patterns,
          and prophecies that Christians believe ultimately point to Jesus.
          Click any lesson to explore it in detail.
        </p>
      </div>

      <div className="space-y-6">
        {grouped.map(({ category, lessons }) => (
          <div
            key={category}
            className="rounded-[2rem] border border-[#d8ccb8] bg-white p-6 shadow-sm"
          >
            <h2 className="text-lg font-bold text-[#1b1a17]">{category}</h2>
            <p className="mt-1 text-sm text-[#4a4338]">
              {categoryDescriptions[category]}
            </p>

            <div className="mt-4 grid gap-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {lessons.map((lesson) => (
                <Link
                  key={lesson.id}
                  href={`/lessons/${lesson.slug}`}
                  className={`rounded-xl border px-3 py-2 text-sm transition hover:shadow-md ${categoryColors[category]}`}
                >
                  <span className="font-semibold text-[#1b1a17]">
                    {lesson.id}. {lesson.title}
                  </span>
                  <span className="mt-0.5 block text-xs text-[#4a4338]">
                    {lesson.otReference} → {lesson.ntReference}
                  </span>
                  <span className="mt-1 flex flex-wrap gap-1">
                    {lesson.scholarship?.payne?.attested && (
                      <span className="inline-flex items-center rounded-full bg-[#efe8fb] px-1.5 py-0.5 text-[10px] font-medium text-[#5f3a8a]">
                        📘 Payne ✓
                      </span>
                    )}
                    {lesson.scholarship?.edersheim?.attested && (
                      <span className="inline-flex items-center rounded-full bg-[#f5f0e5] px-1.5 py-0.5 text-[10px] font-medium text-[#7e622a]">
                        📚 Edersheim ✓
                      </span>
                    )}
                    {lesson.scholarship?.mcdowell?.attested && (
                      <span className="inline-flex items-center rounded-full bg-[#e8f0f5] px-1.5 py-0.5 text-[10px] font-medium text-[#2a5a7e]">
                        📖 McDowell ✓
                      </span>
                    )}
                  </span>
                </Link>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Scholarly Sources Section */}
      <div className="rounded-[2rem] border border-[#d8ccb8] bg-white p-8 shadow-sm">
        <div className="text-sm font-semibold uppercase tracking-[0.22em] text-[#7e622a]">
          Scholarly Sources
        </div>

        <h2 className="mt-2 text-2xl font-bold text-[#1b1a17]">
          Academic Attribution
        </h2>

        <p className="mt-4 text-sm text-[#4a4338]">
          Lessons in this map are cross-referenced with three major scholarship streams:
          Payne for canonical prophecy numbering, Edersheim for pre-Christian Jewish
          messianic interpretation, and McDowell for apologetic fulfillment analysis.
        </p>

        <div className="mt-6 grid gap-6 md:grid-cols-3">
          {/* Payne Card */}
          <div className="rounded-2xl border border-[#d9c9ee] bg-[#fbf8ff] p-6">
            <div className="flex items-start gap-3">
              <span className="text-2xl">📘</span>
              <div>
                <h3 className="text-base font-bold text-[#1b1a17]">
                  <em>Encyclopedia of Biblical Prophecy</em>
                </h3>
                <p className="mt-1 text-sm font-semibold text-[#5f3a8a]">
                  J. Barton Payne (Harper &amp; Row, 1973)
                </p>
              </div>
            </div>
            <p className="mt-4 text-sm leading-6 text-[#4a4338]">
              Payne&apos;s numbering system (#1-191) is used to tag and cross-reference
              core messianic prophecy entries throughout Scripture Journey.
            </p>
            <div className="mt-3">
              <span className="inline-flex items-center rounded-full bg-[#efe8fb] px-2 py-1 text-xs font-medium text-[#5f3a8a]">
                📘 Payne ✓ = Encyclopedia Attestation
              </span>
            </div>
          </div>

          {/* Edersheim Card */}
          <div className="rounded-2xl border border-[#d8ccb8] bg-[#fffdf8] p-6">
            <div className="flex items-start gap-3">
              <span className="text-2xl">📚</span>
              <div>
                <h3 className="text-base font-bold text-[#1b1a17]">
                  <em>The Life and Times of Jesus the Messiah</em>
                </h3>
                <p className="mt-1 text-sm text-[#7e622a] font-semibold">
                  Alfred Edersheim (1883)
                </p>
              </div>
            </div>
            <p className="mt-4 text-sm leading-6 text-[#4a4338]">
              Appendix IX catalogs 456 Old Testament passages applied to the Messiah
              in ancient Rabbinic writings, grounding Jewish messianic expectation.
            </p>
            <div className="mt-3">
              <span className="inline-flex items-center rounded-full bg-[#f5f0e5] px-2 py-1 text-xs font-medium text-[#7e622a]">
                📚 Edersheim ✓ = Attested in Appendix IX
              </span>
            </div>
          </div>

          {/* McDowell Card */}
          <div className="rounded-2xl border border-[#d8ccb8] bg-[#f8fafc] p-6">
            <div className="flex items-start gap-3">
              <span className="text-2xl">📖</span>
              <div>
                <h3 className="text-base font-bold text-[#1b1a17]">
                  <em>The New Evidence That Demands a Verdict</em>
                </h3>
                <p className="mt-1 text-sm text-[#2a5a7e] font-semibold">
                  Josh McDowell (Thomas Nelson, 1999)
                </p>
              </div>
            </div>
            <p className="mt-4 text-sm leading-6 text-[#4a4338]">
              McDowell synthesizes historical and textual arguments around messianic
              prophecy fulfillment and its apologetic significance.
            </p>
            <div className="mt-3">
              <span className="inline-flex items-center rounded-full bg-[#e8f0f5] px-2 py-1 text-xs font-medium text-[#2a5a7e]">
                📖 McDowell ✓ = Attested in Chapter 8
              </span>
            </div>
          </div>
        </div>

        <p className="mt-5 text-sm text-[#4a4338]">
          See the full bibliography and methodology on the <Link href="/sources" className="font-semibold text-[#7e622a] underline decoration-[#c7b598] underline-offset-4">Sources page</Link>.
        </p>
      </div>
    </div>
  )
}
