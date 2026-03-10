import Link from "next/link"
import type { Metadata } from "next"
import type { ProphecyType } from "@/lib/types"
import ProphecyTypeBadge from "@/components/ProphecyTypeBadge"
import MapCategoryCards from "@/components/MapCategoryCards"

export const metadata: Metadata = {
  title: "Prophecy Map — Scripture Journey",
  description: "A visual map of 211 prophecy lessons organized by category: Lineage, Identity, Ministry, Rejection, Passion, Resurrection, and Kingdom.",
  openGraph: {
    title: "Prophecy Map — Scripture Journey",
    description: "See how 211 messianic prophecies map across seven categories — from Lineage to Kingdom.",
  },
}

const typeGuide: { type: ProphecyType; description: string }[] = [
  { type: 'Direct Prophecy',        description: 'A clear predictive statement in the OT naming or describing a future figure or event, fulfilled literally in Jesus.' },
  { type: 'Messianic Psalm',        description: 'A Psalm applied by New Testament authors directly to Jesus, where the original context carries recognized messianic weight.' },
  { type: 'Typology',               description: 'A person, event, or pattern in the OT that foreshadows Christ structurally. Real connection, but symbolic rather than directly predictive.' },
  { type: 'Prophetic Pattern',      description: 'A passage carrying a theme or image applied to Jesus by NT writers or ancient Rabbinic tradition (Edersheim), understood as thematic rather than predictive.' },
];

export default function MapPage() {
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

      <section className="rounded-[2rem] border border-[#d8ccb8] bg-white p-6 shadow-sm mb-8">
        <div className="text-sm font-semibold uppercase tracking-[0.22em] text-[#7e622a] mb-4">
          Type Guide
        </div>
        <div className="grid gap-3 sm:grid-cols-2">
          {typeGuide.map(({ type, description }) => (
            <div key={type} className="flex items-start gap-3">
              <ProphecyTypeBadge type={type} size="xs" />
              <p className="text-sm text-[#4a4338] leading-relaxed">{description}</p>
            </div>
          ))}
        </div>
      </section>

      <MapCategoryCards />

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

      <div className="grid gap-4 sm:grid-cols-2">
        <Link
          href="/timeline"
          className="rounded-2xl border border-[#d8ccb8] bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
        >
          <div className="text-sm font-semibold text-[#7e622a]">See the Timeline</div>
          <p className="mt-1 text-sm text-[#4a4338]">
            Follow the messianic promise chronologically — from Genesis to the final prophets.
          </p>
        </Link>
        <Link
          href="/quiz"
          className="rounded-2xl border border-[#d8ccb8] bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
        >
          <div className="text-sm font-semibold text-[#7e622a]">Take the Quiz</div>
          <p className="mt-1 text-sm text-[#4a4338]">
            Test your knowledge with 10 questions drawn from the prophecy lessons.
          </p>
        </Link>
      </div>
    </div>
  )
}
