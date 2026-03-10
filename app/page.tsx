import { Suspense } from "react"
import ProphecySearch from "@/components/ProphecySearch"
import ContinueCard from "@/components/ContinueCard"
import { prophecies } from "@/data/prophecies"

export default function HomePage() {
  const totalLessons = prophecies.length

  return (
    <div className="space-y-8">
      <div className="text-center">
        <p className="text-lg italic text-[#4a4338]">
          &ldquo;And beginning with Moses and all the Prophets, he explained to them what was said in all the Scriptures concerning himself.&rdquo;
        </p>
        <p className="mt-2 text-sm font-semibold text-[#7e622a]">— Luke 24:27 (NIV)</p>
      </div>

      <div className="rounded-[2rem] border border-[#d8ccb8] bg-white p-8 shadow-sm">
        <div className="text-sm font-semibold uppercase tracking-[0.22em] text-[#7e622a]">
          Top {totalLessons} Prophecies
        </div>

        <h1 className="mt-2 text-3xl font-bold text-[#1b1a17]">
          Search and Explore {totalLessons} Lessons That Point to Jesus
        </h1>

        <p className="mt-4 max-w-3xl text-[#4a4338]">
          Browse the full prophecy track or search by title, Scripture
          reference, or theme.
        </p>
      </div>

      <ContinueCard />

      <Suspense>
        <ProphecySearch />
      </Suspense>
    </div>
  )
}
