import assert from 'node:assert/strict';
import test from 'node:test';
import {
  BABS_DATA,
  HADITHS_DATA,
  filterHadiths,
  getHadithWithTokens,
  resolveHadithNumberFromFocusId,
} from './hadithsData';
import { getAllLexiconEntries } from './hadithLexicon';

test('Kitâbü’s-Salât fî Ramadân contains exactly 2 Babs and 8 Hadiths (Bab 1: 1-2, Bab 2: 3-8)', () => {
  assert.equal(BABS_DATA.length, 2);
  assert.equal(HADITHS_DATA.length, 8);
  assert.deepEqual(
    filterHadiths(1).map((h) => h.number),
    [1, 2]
  );
  assert.deepEqual(
    filterHadiths(2).map((h) => h.number),
    [3, 4, 5, 6, 7, 8]
  );
});

test('every Arabic word in all 8 hadiths resolves to a real LexiconEntry with zero missingKeys', () => {
  const missingReport: string[] = [];
  let totalTokens = 0;

  for (const hadith of HADITHS_DATA) {
    const result = getHadithWithTokens(hadith.number);
    assert.ok(result, `Expected tokenized result for hadith ${hadith.number}`);
    assert.ok(result.tokens.length > 10, `Hadith ${hadith.number} should have >10 tokens`);
    totalTokens += result.tokens.length;
    if (result.missingKeys.length > 0) {
      missingReport.push(`Hadis ${hadith.number}: ${result.missingKeys.join(', ')}`);
    }
  }

  assert.equal(
    missingReport.length,
    0,
    `Missing lexicon entries found:\n${missingReport.join('\n')}`
  );
  assert.ok(totalTokens >= 300, `Expected >= 300 total clickable Arabic tokens, got ${totalTokens}`);
});

test('contextual disambiguation distinguishes Ubayy (أُبَيّ) from Abî (أَبِي)', () => {
  const h2 = getHadithWithTokens(2)!;
  const h3 = getHadithWithTokens(3)!;
  const h4 = getHadithWithTokens(4)!;

  const h2Abi = h2.tokens.find((t) => t.normalizedKey === 'ابي');
  assert.ok(h2Abi);
  assert.equal(h2Abi.analysis.root, 'أ ب و');

  const h3Ubayy = h3.tokens.find((t) => t.normalizedKey === 'ابي');
  assert.ok(h3Ubayy);
  assert.equal(h3Ubayy.analysis.root, 'أ ب ي');

  const h4Ubayy = h4.tokens.find((t) => t.normalizedKey === 'ابي');
  assert.ok(h4Ubayy);
  assert.equal(h4Ubayy.analysis.root, 'أ ب ي');
});

test('classical commentators (Nevevî, İbn Hacer, Kādî İyâz, Feyyûmî, İbn Fâris/Cevherî) are present', () => {
  const allCommentators = HADITHS_DATA.flatMap((h) => h.footnotes.map((f) => f.commentator.tr)).join(' ');
  assert.match(allCommentators, /Nevevî/);
  assert.match(allCommentators, /İbn Hacer/);
  assert.match(allCommentators, /Kādî İyâz/);
  assert.match(allCommentators, /Feyyûmî/);
  assert.match(allCommentators, /İbn Fâris/);
});

test('focus id resolution and search filter behave deterministically', () => {
  assert.equal(resolveHadithNumberFromFocusId('hadis-4'), 4);
  assert.equal(resolveHadithNumberFromFocusId('bab-2'), 3);
  assert.equal(resolveHadithNumberFromFocusId('theme-rekats'), 4);
  assert.equal(resolveHadithNumberFromFocusId(undefined), 1);

  assert.equal(filterHadiths('all', 'Nevevî').length, 1);
  assert.equal(filterHadiths('all', 'Nevevî')[0].number, 2);
  assert.equal(filterHadiths('all', 'Bakara sûresi').length, 1);
  assert.equal(filterHadiths('all', 'Bakara sûresi')[0].number, 6);
  assert.ok(getAllLexiconEntries().length >= 150);
});
