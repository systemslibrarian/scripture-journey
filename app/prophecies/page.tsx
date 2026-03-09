import ProphecySearch from "@/components/ProphecySearch"

export default function PropheciesPage() {
  return (
    <div className="space-y-8">
      <div className="rounded-[2rem] border border-[#d8ccb8] bg-white p-8 shadow-sm">
        <div className="text-sm font-semibold uppercase tracking-[0.22em] text-[#7e622a]">
          Top 100 Prophecies
        </div>
        <h1 className="mt-2 text-3xl font-bold text-[#1b1a17]">
          Search and Explore 100 Lessons That Point to Jesus
        </h1>
        <p className="mt-4 max-w-3xl text-[#4a4338]">
          Browse the full prophecy track or search by title, Scripture
          reference, or theme.
        </p>
      </div>
      <ProphecySearch />
    </div>
  )
}