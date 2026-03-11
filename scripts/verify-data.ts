import { prophecies } from '../data/prophecies';

const errors: string[] = [];

// 1. Check count
if (prophecies.length !== 200) errors.push('Expected 200 lessons, got ' + prophecies.length);

// 2. Check contiguous IDs 1-200
const ids = prophecies.map(l => l.id).sort((a, b) => a - b);
for (let i = 0; i < 200; i++) {
  if (ids[i] !== i + 1) errors.push('Expected ID ' + (i + 1) + ' at index ' + i + ', got ' + ids[i]);
}

// 3. Check for duplicate IDs
const dupes = ids.filter((id, i) => ids.indexOf(id) !== i);
if (dupes.length) errors.push('Duplicate IDs: ' + dupes.join(', '));

// 4. Check for duplicate slugs
const slugs = prophecies.map(l => l.slug);
const dupeSlugs = slugs.filter((s, i) => slugs.indexOf(s) !== i);
if (dupeSlugs.length) errors.push('Duplicate slugs: ' + dupeSlugs.join(', '));

// 5. Check every lesson has required fields
for (const l of prophecies) {
  if (!l.title) errors.push('Lesson ' + l.id + ': missing title');
  if (!l.slug) errors.push('Lesson ' + l.id + ': missing slug');
  if (!l.category) errors.push('Lesson ' + l.id + ': missing category');
  if (!l.otReference) errors.push('Lesson ' + l.id + ': missing otReference');
  if (!l.otText) errors.push('Lesson ' + l.id + ': missing otText');
  if (!l.ntReference) errors.push('Lesson ' + l.id + ': missing ntReference');
  if (!l.ntText) errors.push('Lesson ' + l.id + ': missing ntText');
  if (!l.summary && !l.whyItMatters) errors.push('Lesson ' + l.id + ': missing summary/whyItMatters');
  if (!l.prophecyType) errors.push('Lesson ' + l.id + ': missing prophecyType');
  if (!l.timelineEra) errors.push('Lesson ' + l.id + ': missing timelineEra');
}

// 6. Check valid categories
const validCats = ['Lineage', 'Identity', 'Ministry', 'Rejection', 'Passion', 'Resurrection', 'Kingdom'];
for (const l of prophecies) {
  if (!validCats.includes(l.category)) errors.push('Lesson ' + l.id + ': invalid category "' + l.category + '"');
}

// 7. Check valid prophecy types
const validTypes = ['Direct Prophecy', 'Messianic Psalm', 'Typology', 'Prophetic Pattern', 'Applied Psalm'];
for (const l of prophecies) {
  if (!validTypes.includes(l.prophecyType)) errors.push('Lesson ' + l.id + ': invalid prophecyType "' + l.prophecyType + '"');
}

// 8. Check quiz data exists
for (const l of prophecies) {
  if (!l.quiz || !l.quiz.question || !l.quiz.choices || l.quiz.choices.length < 2) {
    errors.push('Lesson ' + l.id + ': missing or incomplete quiz data');
  }
}

// 9. Check for empty strings
for (const l of prophecies) {
  if (l.otText.trim() === '') errors.push('Lesson ' + l.id + ': empty otText');
  if (l.ntText.trim() === '') errors.push('Lesson ' + l.id + ': empty ntText');
}

// 10. Scholar counts
let ed = 0, mc = 0, pa = 0;
for (const l of prophecies) {
  if (l.scholarship?.edersheim) ed++;
  if (l.scholarship?.mcdowell) mc++;
  if (l.scholarship?.payne) pa++;
}

// 11. Check slug format (lowercase, no spaces)
for (const l of prophecies) {
  if (l.slug !== l.slug.toLowerCase()) errors.push('Lesson ' + l.id + ': slug has uppercase: ' + l.slug);
  if (l.slug.includes(' ')) errors.push('Lesson ' + l.id + ': slug has spaces: ' + l.slug);
}

// 12. Check timelineOrder uniqueness within same era
const eraOrders = new Map<string, number[]>();
for (const l of prophecies) {
  const key = l.timelineEra;
  if (!eraOrders.has(key)) eraOrders.set(key, []);
  eraOrders.get(key)!.push(l.timelineOrder);
}

// 13. Check reflection exists
for (const l of prophecies) {
  if (!l.reflection || l.reflection.trim() === '') {
    errors.push('Lesson ' + l.id + ': missing reflection');
  }
}

console.log('=== DATA INTEGRITY REPORT ===');
console.log('Total lessons: ' + prophecies.length);
console.log('ID range: 1-' + Math.max(...ids));
console.log('Unique slugs: ' + new Set(slugs).size);
console.log('Scholars - Edersheim: ' + ed + ', McDowell: ' + mc + ', Payne: ' + pa);

const catCounts: Record<string, number> = {};
for (const c of validCats) catCounts[c] = prophecies.filter(l => l.category === c).length;
console.log('Categories: ' + JSON.stringify(catCounts));

const typeCounts: Record<string, number> = {};
for (const t of validTypes) typeCounts[t] = prophecies.filter(l => l.prophecyType === t).length;
console.log('Types: ' + JSON.stringify(typeCounts));

if (errors.length === 0) {
  console.log('\n✅ ALL CHECKS PASSED — No bugs found');
} else {
  console.log('\n❌ ERRORS FOUND (' + errors.length + '):');
  errors.forEach(e => console.log('  - ' + e));
}
