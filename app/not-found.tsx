import Link from "next/link"

export default function NotFoundPage() {
  return (
    <div className="flex min-h-[60vh] items-center justify-center">

      <div className="max-w-lg rounded-[2rem] border border-[#d8ccb8] bg-white p-10 text-center shadow-sm">

        <div className="text-sm font-semibold uppercase tracking-[0.22em] text-[#7e622a]">
          Page Not Found
        </div>

        <h1 className="mt-3 text-3xl font-bold text-[#1b1a17]">
          We couldn&apos;t find that lesson
        </h1>

        <p className="mt-4 text-[#4a4338]">
          The page you were looking for may have moved or does not exist.
          You can explore the prophecy lessons or return to the homepage.
        </p>

        <div className="mt-6 flex flex-wrap justify-center gap-3">

          <Link
            href="/"
            className="rounded-xl bg-[#1b1a17] px-5 py-3 text-sm font-semibold text-white transition hover:opacity-90"
          >
            Go Home
          </Link>

          <Link
            href="/prophecies"
            className="rounded-xl border border-[#d8ccb8] px-5 py-3 text-sm font-semibold text-[#1b1a17] transition hover:bg-[#fbf7ee]"
          >
            Browse Prophecies
          </Link>

        </div>

      </div>

    </div>
  )
}