import assert from 'node:assert/strict';
import test from 'node:test';
import {
  buildGlossaryEntries,
  filterGlossaryEntries,
  getUniqueRoots,
  normalizeSearchText,
} from './glossaryData';

test('buildGlossaryEntries auto-populates all 8 hadiths plus DİA Usûl terms with exact hadithNumbers', () => {
  const entries = buildGlossaryEntries();
  assert.ok(entries.length >= 160, `Expected >= 160 glossary entries, got ${entries.length}`);

  const diaEntries = entries.filter((e) => e.sourceGroup === 'dia-usul');
  assert.ok(diaEntries.length >= 10, 'Expected curated DİA Usûl & Hadith entries');

  // Verify أَوْزَاعٌ is mapped strictly to Hadis 3, Bab 2
  const awza = entries.find((e) => e.key === 'اوزاع');
  assert.ok(awza, 'Expected اوزاع entry');
  assert.deepEqual(awza.hadithNumbers, [3]);
  assert.deepEqual(awza.babs, [2]);
  assert.equal(awza.root, 'و ز ع');

  // Verify both أُبَيّ and أَبِي exist distinctly
  const ubayy = entries.find((e) => e.id === 'lex-ubayy');
  const abi = entries.find((e) => e.id === 'lex-abi');
  assert.ok(ubayy && abi, 'Expected distinct entries for Ubayy and Abî');
  assert.deepEqual(ubayy.hadithNumbers, [3, 4]);
  assert.ok(abi.hadithNumbers.includes(2) && abi.hadithNumbers.includes(7));
});

test('getUniqueRoots extracts Arabic roots sorted by productivity', () => {
  const entries = buildGlossaryEntries();
  const roots = getUniqueRoots(entries);
  assert.ok(roots.length >= 60, `Expected >= 60 unique roots, got ${roots.length}`);
  assert.ok(roots.some((r) => r.root === 'ص ل و'));
  assert.ok(roots.some((r) => r.root === 'ق و م'));
  assert.ok(roots.some((r) => r.root === 'و ز ع'));
});

test('filterGlossaryEntries handles unvocalized Arabic, Turkish/French folding, POS, Root, and Bab filters', () => {
  const entries = buildGlossaryEntries();

  // Unvocalized Arabic search
  const awzaResults = filterGlossaryEntries(entries, { query: 'اوزاع' });
  assert.ok(awzaResults.some((e) => e.key === 'اوزاع'));

  // Turkish accent-folded search
  const bidatResults = filterGlossaryEntries(entries, { query: 'bidat' });
  assert.ok(bidatResults.some((e) => e.key === 'البدعة' || e.key === 'البدعه'));

  // French search
  const frenchResults = filterGlossaryEntries(entries, { query: 'pardon' });
  assert.ok(frenchResults.some((e) => e.key === 'غفر'));

  // Bab 1 + Fiil filter
  const bab1Verbs = filterGlossaryEntries(entries, { bab: 1, pos: 'fiil' });
  assert.ok(bab1Verbs.length >= 10);
  assert.ok(bab1Verbs.every((e) => e.babs.includes(1) && e.pos === 'fiil'));

  // Root filter (ق و م)
  const qwmRoot = filterGlossaryEntries(entries, { root: normalizeSearchText('قوم') });
  assert.ok(qwmRoot.length >= 5);
  assert.ok(qwmRoot.every((e) => e.root === 'ق و م'));

  // DİA Usûl filter
  const diaOnly = filterGlossaryEntries(entries, { bab: 'dia' });
  assert.ok(diaOnly.length >= 10);
  assert.ok(diaOnly.every((e) => e.sourceGroup === 'dia-usul'));
});
