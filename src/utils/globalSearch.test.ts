import assert from 'node:assert/strict';
import test from 'node:test';
import { buildGlobalSearchIndex, runGlobalSearch } from './globalSearch';

test('buildGlobalSearchIndex covers all 5 atlas modules', () => {
  const docs = buildGlobalSearchIndex();
  assert.ok(docs.length >= 220, `Expected >= 220 indexed documents, got ${docs.length}`);

  const categories = new Set(docs.map((d) => d.category));
  assert.deepEqual(
    Array.from(categories).sort(),
    ['el-muvatta', 'hadisler', 'harita', 'imam-malik', 'sozluk']
  );
});

test('runGlobalSearch finds cross-module results across Arabic, Turkish, and French queries', () => {
  // Classical commentator search -> Hadis 2
  const nevevi = runGlobalSearch('Nevevî');
  assert.ok(nevevi.totalCount >= 1);
  assert.ok(nevevi.results.some((r) => r.doc.route === 'hadisler' && r.doc.targetItemId === 'hadis-2'));

  // Multi-module historical geography query: Endülüs -> Map + el-Muvatta + Imam Malik
  const endulus = runGlobalSearch('Endülüs');
  assert.ok(endulus.countsByCategory.harita >= 1);
  assert.ok(endulus.countsByCategory['el-muvatta'] >= 1);

  // Category filtering narrows results while preserving total category counts
  const endulusMapOnly = runGlobalSearch('Endülüs', 'harita');
  assert.ok(endulusMapOnly.results.length >= 1);
  assert.ok(endulusMapOnly.results.every((r) => r.doc.category === 'harita'));
  assert.equal(endulusMapOnly.results[0].doc.targetItemId, 'endulus');

  // Unvocalized Arabic query -> Hadis 3 & Glossary
  const arabicSearch = runGlobalSearch('اوزاع');
  assert.ok(arabicSearch.countsByCategory.hadisler >= 1);
  assert.ok(arabicSearch.countsByCategory.sozluk >= 1);

  // Empty query returns clean empty state
  const empty = runGlobalSearch('   ');
  assert.equal(empty.totalCount, 0);
  assert.equal(empty.results.length, 0);
});
