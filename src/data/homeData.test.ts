import test from 'node:test';
import assert from 'node:assert/strict';
import {
  HERO_OVERVIEW_CARDS,
  MIND_MAP_NODES,
  PRIMARY_NAV_ITEMS,
  SECONDARY_NAV_ITEMS,
  getHadithNodesByBab,
  getMindMapNodeById,
  getThemeNodes,
} from './homeData';

test('Home displays exactly 3 Hero Overview Cards with bilingual TR+FR fields', () => {
  assert.equal(HERO_OVERVIEW_CARDS.length, 3);
  for (const card of HERO_OVERVIEW_CARDS) {
    assert.ok(card.title.tr.length > 0);
    assert.ok(card.title.fr.length > 0);
    assert.ok(card.summary.tr.length > 20);
    assert.ok(card.summary.fr.length > 20);
    assert.ok(card.arabicTitle.length > 0);
  }
});

test('Interactive Mind Map covers 2 Babs, all 8 Hadiths, and jurisprudential themes', () => {
  const root = getMindMapNodeById('root');
  assert.ok(root);
  assert.equal(root.kind, 'root');

  const bab1Hadiths = getHadithNodesByBab(1);
  const bab2Hadiths = getHadithNodesByBab(2);
  assert.equal(bab1Hadiths.length, 2, 'Bab 1 must have Hadiths 1-2');
  assert.equal(bab2Hadiths.length, 6, 'Bab 2 must have Hadiths 3-8');

  const allNumbers = [...bab1Hadiths, ...bab2Hadiths]
    .map((h) => h.hadithNumber)
    .sort((a, b) => (a ?? 0) - (b ?? 0));
  assert.deepEqual(allNumbers, [1, 2, 3, 4, 5, 6, 7, 8]);

  const themes = getThemeNodes();
  assert.ok(themes.length >= 4);

  for (const node of MIND_MAP_NODES) {
    assert.ok(node.label.tr.length > 0 && node.label.fr.length > 0);
    assert.ok(node.summary.tr.length > 0 && node.summary.fr.length > 0);
  }
});

test('Navigation structure includes all 5 primary and 4 secondary routes', () => {
  assert.deepEqual(
    PRIMARY_NAV_ITEMS.map((i) => i.route),
    ['home', 'imam-malik', 'el-muvatta', 'hadisler', 'ogren']
  );
  assert.deepEqual(
    SECONDARY_NAV_ITEMS.map((i) => i.route),
    ['sozluk', 'harita', 'ara', 'ayarlar']
  );
});
