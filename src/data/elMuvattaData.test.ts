import test from 'node:test';
import assert from 'node:assert/strict';
import {
  AUTHENTICITY_EVALUATIONS,
  COMMENTARY_RECORDS,
  COMPILATION_TIMELINE,
  DISTILLATION_STAGES,
  GOLDEN_CHAINS,
  NARRATION_CATEGORIES,
  RIWAYAH_RECORDS,
  computeNarrationShares,
  filterCommentaries,
  filterRiwayahs,
  getTotalNarrationCount,
} from './elMuvattaData';

test('el-Muvatta narration breakdown matches Ebheri total of exactly 1,720 narrations', () => {
  assert.equal(getTotalNarrationCount(NARRATION_CATEGORIES), 1720);

  const byId = Object.fromEntries(NARRATION_CATEGORIES.map((c) => [c.id, c.count]));
  assert.equal(byId.musned, 600);
  assert.equal(byId.mursel, 222);
  assert.equal(byId.mevkuf, 613);
  assert.equal(byId.maktu, 285);

  const shares = computeNarrationShares(NARRATION_CATEGORIES);
  assert.equal(shares.length, 4);
  assert.equal(Math.round(shares[shares.length - 1].endAngle), 360);
  const sumPct = shares.reduce((acc, s) => acc + s.percentage, 0);
  assert.ok(sumPct >= 99.8 && sumPct <= 100.2, `Expected ~100%, got ${sumPct}`);
});

test('el-Muvatta timeline and authenticity evaluations include 40-year compilation, refusal, and Silsiletuz-Zeheb', () => {
  assert.ok(COMPILATION_TIMELINE.length >= 5);
  assert.ok(COMPILATION_TIMELINE.some((m) => m.era.includes('159')));
  assert.ok(COMPILATION_TIMELINE.some((m) => m.id === 'state-code-refusal'));
  assert.equal(DISTILLATION_STAGES[0].count, 10000);
  assert.equal(DISTILLATION_STAGES[2].count, 1720);

  assert.ok(AUTHENTICITY_EVALUATIONS.some((e) => e.id === 'shafii'));
  assert.ok(AUTHENTICITY_EVALUATIONS.some((e) => e.id === 'zehebi'));
  assert.ok(GOLDEN_CHAINS.some((c) => c.id === 'silsiletuz-zeheb'));
});

test('All 9 surviving riwayahs are present and filterable by region', () => {
  assert.equal(RIWAYAH_RECORDS.length, 9);
  assert.deepEqual(
    RIWAYAH_RECORDS.map((r) => r.number),
    [1, 2, 3, 4, 5, 6, 7, 8, 9]
  );

  const primary = RIWAYAH_RECORDS.find((r) => r.isPrimaryForAtlas);
  assert.equal(primary?.id, 'yahya-el-leysi');

  const iraq = filterRiwayahs('iraq');
  assert.equal(iraq.length, 3);
  assert.ok(iraq.some((r) => r.id === 'seybani'));
  assert.ok(iraq.some((r) => r.id === 'kanebi'));
  assert.ok(iraq.some((r) => r.id === 'suveyd-el-hadesani'));
});

test('Commentaries catalog distinguishes the 5 Seybani-based commentaries and supports search + focus filters', () => {
  assert.ok(COMMENTARY_RECORDS.length >= 14);

  const seybani = filterCommentaries({ baseRecension: 'seybani', focus: 'all', query: '' });
  assert.equal(seybani.length, 5);
  assert.deepEqual(
    seybani.map((c) => c.id).sort(),
    ['ali-el-kari', 'ibn-asur', 'kemahi', 'leknevi', 'pirizade']
  );

  const ibnAbdulber = filterCommentaries({ baseRecension: 'leysi', focus: 'all', query: 'temhîd' });
  assert.ok(ibnAbdulber.some((c) => c.id === 'et-temhid'));
});
