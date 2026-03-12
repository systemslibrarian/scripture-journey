'use client'

import type { ProphecyType } from "@/lib/types"
import {
  ALL_TYPES,
  typeActiveStyles,
  scholarActiveStyles,
} from "@/hooks/useLessonFilters"
import type { ScholarFilter } from "@/hooks/useLessonFilters"

type Props = {
  activeType: ProphecyType | null
  onTypeChange: (type: ProphecyType | null) => void
  scholarFilter: ScholarFilter
  onScholarChange: (filter: ScholarFilter) => void
  scholarCounts: { payne: number; edersheim: number; mcdowell: number }
}

export default function FilterControls({
  activeType,
  onTypeChange,
  scholarFilter,
  onScholarChange,
  scholarCounts,
}: Props) {
  return (
    <>
      <div className="mt-3 flex flex-wrap items-center gap-2" role="group" aria-label="Filter by prophecy type">
        {ALL_TYPES.map((type) => (
          <button
            key={type}
            onClick={() => onTypeChange(activeType === type ? null : type)}
            className={`rounded-full px-3 py-1.5 text-xs font-medium border transition min-h-[44px] md:min-h-0 md:py-1
              ${activeType === type
                ? typeActiveStyles[type]
                : 'bg-white border-[#d8ccb8] text-[#4a4338] hover:border-[#7e622a]'
              }`}
          >
            {type}
          </button>
        ))}
        {activeType && (
          <button
            onClick={() => onTypeChange(null)}
            className="rounded-full px-3 py-1.5 text-xs font-medium border border-[#d8ccb8] text-[#7e622a] hover:bg-[#fbf7ee] min-h-[44px] md:min-h-0 md:py-1"
          >
            Clear ✕
          </button>
        )}
      </div>

      <div className="mt-3 flex flex-wrap items-center gap-2" role="group" aria-label="Filter by scholar">
        <span className="text-xs text-[#7e622a] font-semibold">Scholar:</span>
        <button
          onClick={() => onScholarChange('all')}
          className={`rounded-full px-3 py-1.5 text-xs font-medium border transition min-h-[44px] md:min-h-0 md:py-1 ${scholarFilter === 'all' ? 'bg-[#fbf7ee] border-[#7e622a] text-[#7e622a]' : 'bg-white border-[#d8ccb8] text-[#4a4338] hover:border-[#7e622a]'}`}
        >
          All
        </button>
        <button
          onClick={() => onScholarChange(scholarFilter === 'payne' ? 'all' : 'payne')}
          className={`rounded-full px-3 py-1.5 text-xs font-medium border transition min-h-[44px] md:min-h-0 md:py-1 ${scholarFilter === 'payne' ? scholarActiveStyles.payne : 'bg-white border-[#d8ccb8] text-[#4a4338] hover:border-[#7e622a]'}`}
        >
          📘 Payne ({scholarCounts.payne})
        </button>
        <button
          onClick={() => onScholarChange(scholarFilter === 'edersheim' ? 'all' : 'edersheim')}
          className={`rounded-full px-3 py-1.5 text-xs font-medium border transition min-h-[44px] md:min-h-0 md:py-1 ${scholarFilter === 'edersheim' ? scholarActiveStyles.edersheim : 'bg-white border-[#d8ccb8] text-[#4a4338] hover:border-[#7e622a]'}`}
        >
          📚 Edersheim ({scholarCounts.edersheim})
        </button>
        <button
          onClick={() => onScholarChange(scholarFilter === 'mcdowell' ? 'all' : 'mcdowell')}
          className={`rounded-full px-3 py-1.5 text-xs font-medium border transition min-h-[44px] md:min-h-0 md:py-1 ${scholarFilter === 'mcdowell' ? scholarActiveStyles.mcdowell : 'bg-white border-[#d8ccb8] text-[#4a4338] hover:border-[#7e622a]'}`}
        >
          📖 McDowell ({scholarCounts.mcdowell})
        </button>
      </div>
    </>
  )
}
