import { prophecies } from "../data/prophecies";
import { TIMELINE_ERAS } from "../lib/timeline";
import { writeFileSync } from "fs";
import { join } from "path";

const eraDateRange: Record<string, string> = {};
for (const era of TIMELINE_ERAS) {
  eraDateRange[era.id] = era.dateRange;
}

const lines: string[] = [];
lines.push("# Scripture Journey — All Lessons");
lines.push("");

const sorted = [...prophecies].sort((a, b) => a.id - b.id);

for (let i = 0; i < sorted.length; i++) {
  const l = sorted[i];
  const next = sorted[i + 1];

  lines.push("---");
  lines.push("");
  lines.push(`## Lesson ${l.id} — ${l.title}`);
  lines.push(`**Category:** ${l.category} · ${l.prophecyType}`);
  lines.push("");

  lines.push("### Old Testament");
  lines.push(`**${l.otReference}** — ${l.otText}`);
  lines.push("");

  lines.push("### New Testament");
  lines.push(`**${l.ntReference}** — ${l.ntText}`);
  lines.push("");

  lines.push("### Why This Matters");
  lines.push(l.whyItMatters);
  lines.push("");

  lines.push("### Reflection");
  lines.push(l.reflection);
  lines.push("");

  // Scholar Credits
  if (l.scholarship) {
    const s = l.scholarship;
    const rows: string[] = [];

    if (s.edersheim) {
      rows.push(`| Edersheim | ${s.edersheim.work} | ${s.edersheim.note} |`);
    }
    if (s.mcdowell) {
      rows.push(`| McDowell | ${s.mcdowell.work} | ${s.mcdowell.note} |`);
    }
    if (s.payne) {
      rows.push(`| Payne | ${s.payne.work} | ${s.payne.note} |`);
    }
    if (s.scholarNote) {
      rows.push(`| — | — | ${s.scholarNote} |`);
    }

    if (rows.length > 0) {
      lines.push("### Scholar Credits");
      lines.push("| Scholar | Source | Note |");
      lines.push("|---------|--------|------|");
      for (const row of rows) {
        lines.push(row);
      }
      lines.push("");
    }
  }

  // Timeline
  const dateRange = eraDateRange[l.timelineEra] ?? "";
  lines.push("### Timeline");
  lines.push(`**Era:** ${l.timelineEra} · ${dateRange}`);
  if (next) {
    lines.push(`**Next:** Lesson ${next.id} — ${next.title}`);
  }
  lines.push("");
}

lines.push("---");

const output = lines.join("\n");
const outPath = join(__dirname, "..", "scripture-journey-lessons.md");
writeFileSync(outPath, output, "utf-8");
console.log(`Written ${sorted.length} lessons to ${outPath}`);
