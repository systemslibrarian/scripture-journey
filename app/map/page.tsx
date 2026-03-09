export default function MapPage() {

  const sections = [
    {
      title: "Torah",
      items: [
        "Genesis 3:15 — First Promise",
        "Genesis 12:3 — Blessing Through Abraham",
        "Genesis 49:10 — Judah's Scepter",
        "Exodus 12 — Passover Lamb",
        "Deuteronomy 18:15 — Prophet Like Moses",
      ],
    },
    {
      title: "Kings",
      items: [
        "2 Samuel 7 — Davidic Covenant",
        "Psalm 2 — Son of God",
        "Psalm 16 — Resurrection Hope",
        "Psalm 22 — Suffering King",
        "Psalm 110 — Priest King",
      ],
    },
    {
      title: "Prophets",
      items: [
        "Isaiah 7 — Virgin Birth",
        "Isaiah 9 — Mighty God",
        "Isaiah 35 — Healing Ministry",
        "Isaiah 42 — Servant of the Lord",
        "Isaiah 53 — Suffering Servant",
        "Micah 5 — Bethlehem Birth",
        "Zechariah 9 — Humble King",
        "Zechariah 12 — Pierced One",
        "Malachi 3 — Messenger Before Messiah",
      ],
    },
    {
      title: "Gospels",
      items: [
        "Birth of Jesus",
        "Ministry in Galilee",
        "Triumphal Entry",
        "Crucifixion",
        "Burial",
        "Resurrection",
        "Ascension",
      ],
    },
  ]

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
          This page gives a simple overview of that journey.
        </p>

      </div>

      <div className="grid gap-6 lg:grid-cols-4">

        {sections.map((section) => (

          <div
            key={section.title}
            className="rounded-[2rem] border border-[#d8ccb8] bg-white p-6 shadow-sm"
          >

            <h2 className="text-lg font-bold text-[#1b1a17]">
              {section.title}
            </h2>

            <ul className="mt-4 space-y-3 text-sm text-[#4a4338]">

              {section.items.map((item) => (

                <li
                  key={item}
                  className="rounded-xl bg-[#fbf7ee] px-3 py-2"
                >
                  {item}
                </li>

              ))}

            </ul>

          </div>

        ))}

      </div>

    </div>
  )
}