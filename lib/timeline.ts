import type { TimelineEra, Lesson } from "@/lib/types";

export const TIMELINE_ERAS: {
  id: TimelineEra;
  order: number;
  title: string;
  description: string;
  arcPhrase: string;
  dateRange: string;
  keyBooks: string;
}[] = [
  {
    id: "Beginnings", order: 1, title: "Beginnings",
    description: "The promise begins in the earliest chapters of Scripture, where God first reveals that redemption will come through the woman's seed.",
    arcPhrase: "The First Promise",
    dateRange: "Creation – c. 2100 BC",
    keyBooks: "Genesis 1–11",
  },
  {
    id: "Patriarchs", order: 2, title: "Patriarchs",
    description: "Through Abraham, Isaac, Jacob, and Judah, God narrows the promise to a covenant family through whom blessing will come to the nations.",
    arcPhrase: "The Promise Narrowed",
    dateRange: "c. 2100 – 1800 BC",
    keyBooks: "Genesis 12–50",
  },
  {
    id: "Exodus and Wilderness", order: 3, title: "Exodus and Wilderness",
    description: "God reveals patterns of redemption through sacrifice, deliverance, covenant, and a prophet like Moses.",
    arcPhrase: "Redemption Pictured",
    dateRange: "c. 1450 – 1400 BC",
    keyBooks: "Exodus – Deuteronomy",
  },
  {
    id: "Conquest and Judges", order: 4, title: "Conquest and Judges",
    description: "The longing for a faithful deliverer continues as God preserves the messianic line and foreshadows a coming righteous ruler.",
    arcPhrase: "A Deliverer Awaited",
    dateRange: "c. 1400 – 1050 BC",
    keyBooks: "Joshua – Ruth",
  },
  {
    id: "Kingdom and David", order: 5, title: "Kingdom and David",
    description: "The promise takes royal shape as God reveals the Messiah as David's greater Son, eternal King, and covenant ruler.",
    arcPhrase: "The Throne Established",
    dateRange: "c. 1050 – 970 BC",
    keyBooks: "1–2 Samuel, 1 Chronicles",
  },
  {
    id: "Psalms and Worship", order: 6, title: "Psalms and Worship",
    description: "Through songs, prayers, and royal psalms, Scripture reveals the suffering, reign, priesthood, and victory of the Messiah.",
    arcPhrase: "The Messiah in Song",
    dateRange: "c. 1000 – 500 BC",
    keyBooks: "Psalms",
  },
  {
    id: "Divided Kingdom", order: 7, title: "Divided Kingdom",
    description: "The prophets speak into a fractured kingdom, revealing the coming Servant, righteous Branch, light to the nations, and suffering Redeemer.",
    arcPhrase: "The Prophets Speak",
    dateRange: "c. 930 – 586 BC",
    keyBooks: "Isaiah, Jeremiah, Hosea, Micah",
  },
  {
    id: "Exile and Prophetic Hope", order: 8, title: "Exile and Prophetic Hope",
    description: "In exile and longing, God deepens messianic hope through promises of a new covenant, renewed hearts, and an everlasting kingdom.",
    arcPhrase: "Hope in Exile",
    dateRange: "c. 605 – 538 BC",
    keyBooks: "Ezekiel, Daniel, Jeremiah",
  },
  {
    id: "Return and Restoration", order: 9, title: "Return and Restoration",
    description: "The final Old Testament prophets intensify expectation with visions of the humble King, pierced Shepherd, coming Messenger, and day of the Lord.",
    arcPhrase: "The Final Expectation",
    dateRange: "c. 538 – 400 BC",
    keyBooks: "Haggai, Zechariah, Malachi",
  },
];

export function getTimelineEraMeta(era: TimelineEra) {
  return TIMELINE_ERAS.find((e) => e.id === era)!;
}

export function groupLessonsByTimelineEra(lessons: Lesson[]): Map<TimelineEra, Lesson[]> {
  const map = new Map<TimelineEra, Lesson[]>();
  for (const era of TIMELINE_ERAS) map.set(era.id, []);
  for (const lesson of lessons) {
    map.get(lesson.timelineEra)?.push(lesson);
  }
  return map;
}

export function sortLessonsByTimeline(lessons: Lesson[]): Lesson[] {
  return [...lessons].sort(
    (a, b) => a.timelineOrder - b.timelineOrder || a.id - b.id
  );
}
