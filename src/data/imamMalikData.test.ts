import test from 'node:test';
import assert from 'node:assert/strict';
import {
  HISTORICAL_MAP_LOCATIONS,
  IMAM_MALIK_TIMELINE,
  SCHOLARS_NETWORK,
  USUL_SOURCES,
  WISDOM_QUOTES,
  getMapLocationById,
  getUsulByTier,
} from './imamMalikData';

test('Imam Malik timeline covers birth (93/712), 146/763 incident, and death (179/795)', () => {
  assert.ok(IMAM_MALIK_TIMELINE.length >= 7);
  assert.ok(IMAM_MALIK_TIMELINE.some((e) => e.hijriYear.includes('93')));
  assert.ok(IMAM_MALIK_TIMELINE.some((e) => e.hijriYear.includes('146')));
  assert.ok(IMAM_MALIK_TIMELINE.some((e) => e.hijriYear.includes('179')));
  for (const event of IMAM_MALIK_TIMELINE) {
    assert.ok(event.title.tr.length > 0 && event.title.fr.length > 0);
    assert.ok(event.summary.tr.length > 20 && event.summary.fr.length > 20);
  }
});

test('Usul al-Fiqh includes all 11 Karafi/Maliki sources including Amel-i Ehl-i Medine, Mesalih-i Mursele, Sedd-i Zerai', () => {
  assert.equal(USUL_SOURCES.length, 11);
  const ids = USUL_SOURCES.map((u) => u.id);
  assert.ok(ids.includes('kuran'));
  assert.ok(ids.includes('sunnet'));
  assert.ok(ids.includes('amel-i-ehl-i-medine'));
  assert.ok(ids.includes('mesalih-i-mursele'));
  assert.ok(ids.includes('sedd-i-zerai'));
  assert.ok(ids.includes('istihsan'));

  assert.equal(getUsulByTier('all').length, 11);
  assert.equal(getUsulByTier('primary').length, 3);
  assert.ok(getUsulByTier('ijtihad').length >= 4);
});

test('Wisdom quotes all include vocalized Arabic, Turkish, and French translations', () => {
  assert.ok(WISDOM_QUOTES.length >= 7);
  for (const q of WISDOM_QUOTES) {
    assert.ok(q.arabic.length > 10);
    assert.ok(q.tr.length > 10);
    assert.ok(q.fr.length > 10);
  }
});

test('Historical Map includes all 8 required locations with valid SVG coordinates and Medina center', () => {
  const expectedIds = ['yemen', 'medine', 'mekke', 'bagdat', 'misir', 'kayrevan', 'endulus', 'sam'];
  assert.equal(HISTORICAL_MAP_LOCATIONS.length, 8);
  for (const id of expectedIds) {
    const loc = getMapLocationById(id);
    assert.ok(loc, `Missing historical map location: ${id}`);
    assert.ok(loc.x > 0 && loc.x < 900);
    assert.ok(loc.y > 0 && loc.y < 460);
    assert.ok(loc.significance.tr.length > 20 && loc.significance.fr.length > 20);
  }
  assert.equal(getMapLocationById('medine')?.isCenter, true);
});

test('Scholars network covers teachers, students, and contemporary peers', () => {
  assert.ok(SCHOLARS_NETWORK.some((s) => s.role === 'teacher'));
  assert.ok(SCHOLARS_NETWORK.some((s) => s.role === 'student'));
  assert.ok(SCHOLARS_NETWORK.some((s) => s.role === 'peer'));
});
