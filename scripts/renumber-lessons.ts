import * as fs from 'fs';
import * as path from 'path';

/**
 * Comprehensive migration script:
 * 1. Apply Phase 5 corrections (OT/NT ref fixes)
 * 2. Apply Phase 6 corrections (deletions, title changes, category fixes)
 * 3. Renumber lessons to close gaps at 175 and 200
 */

const propheciesPath = path.join(__dirname, '..', 'data', 'prophecies.ts');
let content = fs.readFileSync(propheciesPath, 'utf-8');

// ========== PHASE 5: Text corrections ==========
console.log('Phase 5: Applying text corrections...');

// 1. Lesson 101: Numbers 27:16 → Numbers 11:17
content = content.replace(
  `makeLesson(101, "spirit-without-measure", "Spirit Without Measure", "Identity",\n  "Numbers 27:16", "John 3:34", "Moses said to the LORD, \\"May the LORD, the God who gives breath to all living things, appoint someone over this community.\\"",`,
  `makeLesson(101, "spirit-without-measure", "Spirit Without Measure", "Identity",\n  "Numbers 11:17", "John 3:34", "I will come down and speak with you there, and I will take some of the power of the Spirit that is on you and put that Spirit on them.",`
);
console.log('  101: Numbers 27:16 → 11:17 ✓');

// Also update lesson 101 "Why It Matters" text
content = content.replace(
  `"Moses asked God to raise a leader empowered by God's Spirit. Jesus is that leader, and unlike every prophet before Him, He received the Spirit without measure."`,
  `"God gave the Spirit to Moses' seventy elders in measured portions — taking from the Spirit on Moses and distributing it among them. But Jesus received the Spirit without any such limit. John declares that God gives the Spirit to His Son without measure, setting Him apart from every prophet and leader who came before."`
);
console.log('  101: Updated summary text ✓');

// 2. Lesson 112: Hebrews 1:8 → Luke 4:22
content = content.replace(
  `makeLesson(112, "fairer-than-the-sons-of-men", "Fairer Than the Sons of Men", "Identity",\n  "Psalm 45:2", "Hebrews 1:8", "You are the most excellent of men and your lips have been anointed with grace, since God has forever blessed you.", "But about the Son he says, \\"Your throne, O God, will last for ever and ever; a scepter of justice will be the scepter of your kingdom.\\"",`,
  `makeLesson(112, "fairer-than-the-sons-of-men", "Fairer Than the Sons of Men", "Identity",\n  "Psalm 45:2", "Luke 4:22", "You are the most excellent of men and your lips have been anointed with grace, since God has forever blessed you.", "All spoke well of him and were amazed at the gracious words that came from his lips.",`
);
console.log('  112: Hebrews 1:8 → Luke 4:22 ✓');

// 3. Lesson 115: Psalm 72:1 → Psalm 72:5
content = content.replace(
  `makeLesson(115, "sun-and-moon-endure", "Sun and Moon Endure", "Kingdom",\n  "Psalm 72:1", "Luke 1:33", "Endow the king with your justice, O God, the royal son with your righteousness.",`,
  `makeLesson(115, "sun-and-moon-endure", "Sun and Moon Endure", "Kingdom",\n  "Psalm 72:5", "Luke 1:33", "May he endure as long as the sun, as long as the moon, through all generations.",`
);
console.log('  115: Psalm 72:1 → 72:5 ✓');

// 4. Lesson 117: Psalm 92:8 → Psalm 110:1
content = content.replace(
  `makeLesson(117, "enemies-made-a-footstool", "Enemies Made a Footstool", "Kingdom",\n  "Psalm 92:8", "Hebrews 1:13", "The LORD is on high, yet he regards the lowly; but the proud he knows from afar.",`,
  `makeLesson(117, "enemies-made-a-footstool", "Enemies Made a Footstool", "Kingdom",\n  "Psalm 110:1", "Hebrews 1:13", "The LORD says to my lord: 'Sit at my right hand until I make your enemies a footstool for your feet.'",`
);
console.log('  117: Psalm 92:8 → 110:1 ✓');

// Also update 117 summary
content = content.replace(
  `"The psalmist celebrates God's supreme authority over all. Hebrews declares that Christ sits at God's right hand while His enemies are made His footstool — ultimate vindication for the risen King."`,
  `"David heard God address his Lord: 'Sit at my right hand until I make your enemies a footstool.' Hebrews applies this directly to Christ — the risen King enthroned at God's right hand while His enemies are subdued beneath Him."`
);
console.log('  117: Updated summary ✓');

// 5. Lesson 128: Isaiah 32:14 → Isaiah 32:15
content = content.replace(
  `makeLesson(128, "spirit-on-the-waste-places", "Spirit on the Waste Places", "Kingdom",\n  "Isaiah 32:14", "Acts 2:17", "Till the Spirit is poured on us from on high`,
  `makeLesson(128, "spirit-on-the-waste-places", "Spirit on the Waste Places", "Kingdom",\n  "Isaiah 32:15", "Acts 2:17", "till the Spirit is poured on us from on high`
);
console.log('  128: Isaiah 32:14 → 32:15 ✓');

// 6. Lesson 137: Isaiah 63:1 → Isaiah 59:17
content = content.replace(
  `makeLesson(137, "garments-of-vengeance", "Garments of Vengeance", "Kingdom",\n  "Isaiah 63:1", "Revelation 19:13",`,
  `makeLesson(137, "garments-of-vengeance", "Garments of Vengeance", "Kingdom",\n  "Isaiah 59:17", "Revelation 19:13",`
);
console.log('  137: Isaiah 63:1 → 59:17 ✓');

// 7. Lesson 157: Revelation 7:4 → Revelation 7:2–3
content = content.replace(
  /"Revelation 7:4", "Then I heard the number of those who were sealed: 144,000 from all the tribes of Israel\."/,
  `"Revelation 7:2\\u20133", "Then I saw another angel coming up from the east, having the seal of the living God. He called out in a loud voice to the four angels who had been given power to harm the land and the sea: 'Do not harm the land or the sea or the trees until we put a seal on the foreheads of the servants of our God.'"`
);
console.log('  157: Rev 7:4 → 7:2–3 ✓');

// 8. Lesson 167: Matthew 11:5 → Romans 8:19–21
content = content.replace(
  /"Matthew 11:5", "Go back and report to John what you hear and see: The blind receive sight, the lame walk, those who have leprosy are cleansed, the deaf hear, the dead are raised\."/,
  `"Romans 8:19\\u201321", "For the creation waits in eager expectation for the children of God to be revealed... the creation itself will be liberated from its bondage to decay and brought into the freedom and glory of the children of God."`
);
console.log('  167: Matt 11:5 → Rom 8:19–21 ✓');

// Also update 167 summary
content = content.replace(
  `"Isaiah prophesied the desert blooming and the weak being strengthened. Jesus pointed to His miracles as evidence — the blind see, the lame walk, the deaf hear. Isaiah's desert has burst into bloom through Christ's ministry."`,
  `"Isaiah prophesied the desert blooming and the weak being strengthened. Paul declared that all creation groans in anticipation of the new world God is bringing. Isaiah's desert has burst into bloom — and one day the whole creation will share in the freedom and glory of God's children."`
);
console.log('  167: Updated summary ✓');

// 9. Lesson 197: Matthew 21:9 → Ephesians 2:14–15
content = content.replace(
  /"Matthew 21:9",\n"The crowds that went ahead of him and those that followed shouted, \\"Hosanna to the Son of David!\\" \\"Blessed is he who comes in the name of the Lord!\\" \\"Hosanna in the highest heaven!\\"/,
  `"Ephesians 2:14\\u201315",\n"For he himself is our peace, who has made the two groups one and has destroyed the barrier, the dividing wall of hostility... His purpose was to create in himself one new humanity out of the two, thus making peace."`
);
console.log('  197: Matt 21:9 → Eph 2:14–15 ✓');

// Also update 197 summary
content = content.replace(
  `"Zechariah envisioned a king who would abolish weapons of war and proclaim peace to every nation. When Jesus entered Jerusalem to shouts of 'Hosanna,' the crowd unknowingly announced that peace-bringing king. His kingdom is established not by chariots and warhorses but by the disarming power of sacrificial love."`,
  `"Zechariah envisioned a king who would abolish weapons of war and proclaim peace to every nation. Paul declares that Christ is our peace — He has destroyed the wall of hostility between peoples. His kingdom is established not by chariots and warhorses but by the disarming power of reconciling love."`
);
console.log('  197: Updated summary ✓');

// ========== PHASE 6: Title/OT changes ==========
console.log('\nPhase 6: Title and OT corrections...');

// 10. Lesson 107: Title change
content = content.replace(
  `makeLesson(107, "messiah-raises-the-dead", "Messiah Raises the Dead",`,
  `makeLesson(107, "the-righteous-ruler", "The Righteous Ruler",`
);
console.log('  107: Title → The Righteous Ruler ✓');

// 11. Lesson 180: Title + OT ref + OT text + slug
content = content.replace(
  `makeLesson(180, "fell-under-the-cross", "Fell under the Cross", "Passion",\n  "Psalm 109:24", "John 19:17", "My knees give way from fasting; my body is thin and gaunt.",`,
  `makeLesson(180, "he-bore-our-suffering", "He Bore Our Suffering", "Passion",\n  "Isaiah 53:4", "John 19:17", "Surely he took up our pain and bore our suffering, yet we considered him punished by God, stricken by him, and afflicted.",`
);
console.log('  180: Title → He Bore Our Suffering, OT → Isaiah 53:4 ✓');

// Update 180 summary
content = content.replace(
  `"The psalmist described physical collapse under suffering — weakened knees, a wasted body. Jesus carried His own cross to Golgotha, His body broken by scourging and exhaustion. The psalmist's agony prefigured Christ's."`,
  `"Isaiah declared that the Servant would bear our suffering — taking up our pain though we thought him punished by God. Jesus carried His own cross to Golgotha, bearing the weight of human sin and sorrow. What Isaiah foretold, Christ fulfilled in His body on the way to Calvary."`
);
console.log('  180: Updated summary ✓');

// ========== PHASE 6: Deletions ==========
console.log('\nPhase 6: Deleting lessons 175 and 200...');

// 12. Delete lesson 175
content = content.replace(
  /\nprophecies\.push\(makeLesson\(175, "branch-and-the-engraved-stone"[\s\S]*?\)\);/,
  ''
);
console.log('  175: Deleted ✓');

// 13. Delete lesson 200
content = content.replace(
  /\nprophecies\.push\(makeLesson\(200,"the-stone-the-builders-rejected[\s\S]*?\)\);/,
  ''
);
console.log('  200: Deleted ✓');

// ========== PHASE 6: Category fixes in _prophecyTypeMap ==========
console.log('\nPhase 6: Category fixes in _prophecyTypeMap...');

// 14. 88: 'Direct Prophecy' → 'Prophetic Pattern'
content = content.replace(
  `88: 'Direct Prophecy',`,
  `88: 'Prophetic Pattern',`
);
console.log('  88: Direct Prophecy → Prophetic Pattern ✓');

// 15. 167: 'Direct Prophecy' → 'Prophetic Pattern'
// Need to target the specific entry (not 67)
content = content.replace(
  /167: 'Direct Prophecy'/,
  `167: 'Prophetic Pattern'`
);
console.log('  167: Direct Prophecy → Prophetic Pattern ✓');

// 16. 180: 'Messianic Psalm' → 'Direct Prophecy'
content = content.replace(
  `180: 'Messianic Psalm',`,
  `180: 'Direct Prophecy',`
);
console.log('  180: Messianic Psalm → Direct Prophecy ✓');

// 17. 199: 'Direct Prophecy' (check which occurrence)
content = content.replace(
  /199: 'Direct Prophecy'/,
  `199: 'Typology'`
);
console.log('  199: Direct Prophecy → Typology ✓');

// 18. Remove 175 from _prophecyTypeMap
content = content.replace(
  /\s*175: 'Prophetic Pattern',/,
  ''
);
console.log('  175: Removed from _prophecyTypeMap ✓');

// 19. Remove 200 from _prophecyTypeMap
content = content.replace(
  /\s*200: 'Messianic Psalm',/,
  ''
);
console.log('  200: Removed from _prophecyTypeMap ✓');

// 20. Remove 200 from _scholarshipMap
content = content.replace(
  /\s*200: \{[^}]*\},?\n/,
  '\n'
);
console.log('  200: Removed from _scholarshipMap ✓');

// ========== VERIFY PRE-RENUMBER STATE ==========
const preMatches = content.match(/makeLesson\((\d+),/g);
if (preMatches) {
  const preIds = preMatches.map(m => parseInt(m.match(/\d+/)![0])).sort((a,b) => a-b);
  console.log(`\nPre-renumber: ${preIds.length} lessons, max=${Math.max(...preIds)}`);
  const preGaps: number[] = [];
  for (let i = 1; i <= Math.max(...preIds); i++) {
    if (!preIds.includes(i)) preGaps.push(i);
  }
  console.log(`  Gaps: ${preGaps.join(', ')}`);
  if (preGaps.join(', ') !== '175, 200') {
    console.log('  ⚠️ UNEXPECTED GAPS! Expected: 175, 200');
  }
}

// ========== RENUMBERING ==========
console.log('\nRenumbering to close gaps...');

const idsToRename = [
  176, 177, 178, 179, 180, 181, 182, 183, 184, 185,
  186, 187, 188, 189, 190, 191, 192, 193, 194, 195,
  196, 197, 198, 199, 201, 202
];

function newId(oldId: number): number {
  if (oldId >= 176 && oldId <= 199) return oldId - 1;
  if (oldId >= 201) return oldId - 2;
  return oldId;
}

// Phase 1: Replace all old IDs with unique placeholders
for (const id of idsToRename) {
  content = content.replace(
    new RegExp(`makeLesson\\(${id},`, 'g'),
    `makeLesson(__ID_${id}__,`
  );
  // Map keys: space/comma before ID followed by colon
  content = content.replace(
    new RegExp(`([ ,])${id}:`, 'g'),
    `$1__ID_${id}__:`
  );
  // Map keys at start of line (indented)
  content = content.replace(
    new RegExp(`^(\\s+)${id}:`, 'gm'),
    `$1__ID_${id}__:`
  );
}

// Phase 2: Replace all placeholders with new IDs
for (const id of idsToRename) {
  const nid = newId(id);
  content = content.replaceAll(`__ID_${id}__`, String(nid));
  console.log(`  ${id} → ${nid}`);
}

fs.writeFileSync(propheciesPath, content, 'utf-8');
console.log('✅ prophecies.ts updated');

// ========== SCRIPTURELIST.MD ==========
console.log('\nUpdating scripturelist.md...');
const scriptureListPath = path.join(__dirname, '..', 'scripturelist.md');
let slContent = fs.readFileSync(scriptureListPath, 'utf-8');

// Apply ref corrections first
slContent = slContent.replace(`| 101 | Numbers 27:16 |`, `| 101 | Numbers 11:17 |`);
slContent = slContent.replace(`| 112 | Psalm 45:2 | Hebrews 1:8 |`, `| 112 | Psalm 45:2 | Luke 4:22 |`);
slContent = slContent.replace(`| 115 | Psalm 72:1 |`, `| 115 | Psalm 72:5 |`);
slContent = slContent.replace(`| 117 | Psalm 92:8 |`, `| 117 | Psalm 110:1 |`);
slContent = slContent.replace(`| 128 | Isaiah 32:14 |`, `| 128 | Isaiah 32:15 |`);
slContent = slContent.replace(`| 137 | Isaiah 63:1 |`, `| 137 | Isaiah 59:17 |`);
slContent = slContent.replace(/\| 157 \| Zechariah 1:20 \| Revelation 7:4 \|/, `| 157 | Zechariah 1:20 | Revelation 7:2\u20133 |`);
slContent = slContent.replace(/\| 167 \| Isaiah 35:1 \| Matthew 11:5 \|/, `| 167 | Isaiah 35:1 | Romans 8:19\u201321 |`);
slContent = slContent.replace(/\| 180 \| Psalm 109:24 \|/, `| 180 | Isaiah 53:4 |`);
slContent = slContent.replace(/\| 197 \| Zechariah 9:10 \| Matthew 21:9 \|/, `| 197 | Zechariah 9:10 | Ephesians 2:14\u201315 |`);

// Delete lesson 175 and 200 lines
slContent = slContent.replace(/\| 175 \|[^\n]*\n/, '');
slContent = slContent.replace(/\| 200 \|[^\n]*\n/, '');

// Renumber with placeholders
for (const id of idsToRename) {
  slContent = slContent.replace(
    new RegExp(`\\| ${id} \\|`, 'g'),
    `| __ID_${id}__ |`
  );
}
for (const id of idsToRename) {
  slContent = slContent.replaceAll(`__ID_${id}__`, String(newId(id)));
}

fs.writeFileSync(scriptureListPath, slContent, 'utf-8');
console.log('✅ scripturelist.md updated');

// ========== FINAL VERIFICATION ==========
console.log('\n=== FINAL VERIFICATION ===');
const finalContent = fs.readFileSync(propheciesPath, 'utf-8');

// Check lesson count and IDs
const mlFinal = finalContent.match(/makeLesson\((\d+),/g);
if (mlFinal) {
  const ids = mlFinal.map(m => parseInt(m.match(/\d+/)![0])).sort((a,b) => a-b);
  const maxId = Math.max(...ids);
  const gaps: number[] = [];
  for (let i = 1; i <= maxId; i++) {
    if (!ids.includes(i)) gaps.push(i);
  }
  const dupes = ids.filter((id, i) => ids.indexOf(id) !== i);
  console.log(`  Total lessons: ${ids.length}`);
  console.log(`  Max ID: ${maxId}`);
  console.log(`  Gaps: ${gaps.length > 0 ? gaps.join(', ') : 'NONE ✅'}`);
  console.log(`  Duplicates: ${dupes.length > 0 ? dupes.join(', ') : 'NONE ✅'}`);
}

// Check no placeholders remain
if (finalContent.includes('__ID_')) {
  console.log('  ❌ Placeholders remain in prophecies.ts!');
} else {
  console.log('  No placeholders remaining ✅');
}

const slFinal = fs.readFileSync(scriptureListPath, 'utf-8');
if (slFinal.includes('__ID_')) {
  console.log('  ❌ Placeholders remain in scripturelist.md!');
}

// Check deleted lessons are gone
if (finalContent.includes('branch-and-the-engraved-stone')) {
  console.log('  ❌ Lesson 175 still exists!');
} else {
  console.log('  Lesson 175 deleted ✅');
}
if (finalContent.includes('stone-the-builders-rejected-becomes')) {
  console.log('  ❌ Lesson 200 still exists!');
} else {
  console.log('  Lesson 200 deleted ✅');
}

// Check key corrections
if (finalContent.includes('Numbers 11:17')) console.log('  Lesson 101 (Numbers 11:17) ✅');
if (finalContent.includes('"the-righteous-ruler"')) console.log('  Lesson 107 (Righteous Ruler) ✅');
if (finalContent.includes('"Luke 4:22"')) console.log('  Lesson 112 (Luke 4:22) ✅');
if (finalContent.includes('"he-bore-our-suffering"')) console.log('  Lesson 180→179 (He Bore Our Suffering) ✅');
if (finalContent.includes('"Isaiah 53:4"')) console.log('  Lesson 180→179 (Isaiah 53:4) ✅');
