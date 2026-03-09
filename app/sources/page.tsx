export default function SourcesPage() {
  return (
    <div className="space-y-8">
      <div className="rounded-[2rem] border border-[#d8ccb8] bg-white p-8 shadow-sm">
        <div className="text-sm font-semibold uppercase tracking-[0.22em] text-[#7e622a]">
          Sources
        </div>
        <h1 className="mt-2 text-3xl font-bold text-[#1b1a17]">Primary And Scholarly Sources</h1>
        <p className="mt-4 max-w-3xl text-[#4a4338]">
          Scripture Journey is built on Scripture first, then supported by major reference works in messianic prophecy scholarship.
        </p>
      </div>

      <section className="rounded-[2rem] border border-[#d8ccb8] bg-white p-8 shadow-sm">
        <h2 className="text-xl font-bold text-[#1b1a17]">Primary Sources (Scripture)</h2>
        <p className="mt-4 leading-7 text-[#4a4338]">
          The Holy Bible, New International Version (NIV). Biblica, Inc., 1973, 1978, 1984, 2011. Used for educational and devotional purposes.
        </p>
      </section>

      <section className="rounded-[2rem] border border-[#d8ccb8] bg-white p-8 shadow-sm">
        <h2 className="text-xl font-bold text-[#1b1a17]">Scholarly Sources</h2>

        <div className="mt-6 grid gap-6 md:grid-cols-3">
          <article className="rounded-2xl border border-[#d9c9ee] bg-[#fbf8ff] p-6">
            <h3 className="text-lg font-semibold text-[#3f2a5f]">J. Barton Payne (1922-1979)</h3>
            <p className="mt-3 text-sm leading-6 text-[#4a4338]">
              <em>Encyclopedia of Biblical Prophecy: The Complete Guide to Scriptural Predictions and Their Fulfillments</em>. Harper &amp; Row, 1973.
            </p>
            <p className="mt-3 text-sm leading-6 text-[#4a4338]">
              Payne was Professor of Old Testament at Covenant Theological Seminary. His encyclopedia catalogues 191 messianic prophecies and remains a landmark reference work in evangelical Old Testament scholarship.
            </p>
            <p className="mt-3 text-sm leading-6 text-[#4a4338]">
              This app uses Payne&apos;s prophecy numbering system (#1-191) to identify and cross-reference messianic predictions.
            </p>
          </article>

          <article className="rounded-2xl border border-[#d8ccb8] bg-[#fffdf8] p-6">
            <h3 className="text-lg font-semibold text-[#1b1a17]">Alfred Edersheim (1825-1889)</h3>
            <p className="mt-3 text-sm leading-6 text-[#4a4338]">
              <em>The Life and Times of Jesus the Messiah</em>. Longmans, Green &amp; Co., 1883. Appendix IX.
            </p>
            <p className="mt-3 text-sm leading-6 text-[#4a4338]">
              Edersheim was a Jewish scholar and Christian theologian at Oxford. Appendix IX catalogues Old Testament passages applied to the Messiah in the Talmud and Midrash, providing authoritative evidence of pre-Christian Jewish messianic expectation.
            </p>
          </article>

          <article className="rounded-2xl border border-[#cfe0ea] bg-[#f8fbfd] p-6">
            <h3 className="text-lg font-semibold text-[#1b1a17]">Josh McDowell (b. 1939)</h3>
            <p className="mt-3 text-sm leading-6 text-[#4a4338]">
              <em>The New Evidence That Demands a Verdict</em>. Thomas Nelson, 1999.
            </p>
            <p className="mt-3 text-sm leading-6 text-[#4a4338]">
              McDowell&apos;s work synthesizes apologetic evidence for the reliability of Scripture, including a detailed treatment of Old Testament messianic prophecy and its fulfillment in Christ.
            </p>
          </article>
        </div>
      </section>

      <section className="rounded-[2rem] border border-[#d8ccb8] bg-white p-8 shadow-sm">
        <h2 className="text-xl font-bold text-[#1b1a17]">A Note On Methodology</h2>
        <p className="mt-4 leading-7 text-[#4a4338]">
          Scripture Journey uses these three scholars in combination: Payne provides the canonical list of messianic prophecies; Edersheim establishes that these passages were understood as messianic by Jewish interpreters before Jesus; and McDowell provides apologetic context for each fulfillment.
        </p>
        <p className="mt-4 text-sm leading-6 text-[#7a6f60]">
          Prophecy numbering follows J. Barton Payne, <em>Encyclopedia of Biblical Prophecy</em> (Harper &amp; Row, 1973). All lesson content, notes, and presentation are original work by Scripture Journey.
        </p>
      </section>
    </div>
  );
}
