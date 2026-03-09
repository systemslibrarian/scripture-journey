const mapData = [
  {
    title: 'Torah',
    items: ['Genesis 3:15', 'Abraham', 'Judah', 'Passover', 'Prophet Like Moses'],
  },
  {
    title: 'Kings',
    items: ['Davidic Covenant', 'Everlasting Throne', 'Righteous Branch'],
  },
  {
    title: 'Psalms',
    items: ['Psalm 2', 'Psalm 16', 'Psalm 22', 'Psalm 41', 'Psalm 69', 'Psalm 110'],
  },
  {
    title: 'Prophets',
    items: ['Isaiah 7', 'Isaiah 9', 'Isaiah 35', 'Isaiah 42', 'Isaiah 53', 'Micah 5', 'Zechariah 9', 'Zechariah 11', 'Zechariah 12', 'Malachi 3'],
  },
  {
    title: 'Gospels',
    items: ['Birth', 'Ministry', 'Rejection', 'Cross', 'Burial', 'Resurrection', 'Ascension'],
  },
];

export default function MapPage() {
  return (
    <main className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
        <div className="text-sm font-semibold uppercase tracking-[0.18em] text-amber-700">
          Prophecy Map
        </div>
        <h1 className="mt-2 text-3xl font-bold">A Visual Map of Scripture</h1>
        <p className="mt-3 max-w-3xl text-slate-600">
          This page gives a simple visual overview of how promises, prophecies,
          and patterns across Scripture are fulfilled in Jesus.
        </p>
      </div>

      <div className="mt-8 grid gap-6 lg:grid-cols-5">
        {mapData.map((section, index) => (
          <div
            key={section.title}
            className="rounded-[2rem] border border-slate-200 bg-white p-5 shadow-sm"
          >
            <div className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-500">
              {section.title}
            </div>

            <div className="mt-4 space-y-3">
              {section.items.map((item) => (
                <div
                  key={item}
                  className={`rounded-2xl px-4 py-3 text-sm font-medium ${
                    index === 4
                      ? 'bg-amber-100 text-amber-900'
                      : 'bg-slate-50 text-slate-700'
                  }`}
                >
                  {item}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}