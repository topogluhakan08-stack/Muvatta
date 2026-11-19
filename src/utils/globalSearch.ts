import {
  AUTHENTICITY_EVALUATIONS,
  COMMENTARY_RECORDS,
  COMPILATION_TIMELINE,
  GOLDEN_CHAINS,
  NARRATION_CATEGORIES,
  RELATED_STUDIES,
  RIWAYAH_RECORDS,
} from '../data/elMuvattaData';
import { buildGlossaryEntries, normalizeSearchText } from '../data/glossaryData';
import { HADITHS_DATA } from '../data/hadithsData';
import {
  HISTORICAL_MAP_LOCATIONS,
  IMAM_MALIK_TIMELINE,
  SCHOLARLY_FACETS,
  SCHOLARS_NETWORK,
  USUL_SOURCES,
  WISDOM_QUOTES,
} from '../data/imamMalikData';
import type { AtlasRoute, BilingualString } from '../types/atlas';

export type SearchCategory =
  | 'hadisler'
  | 'sozluk'
  | 'imam-malik'
  | 'el-muvatta'
  | 'harita';

export interface SearchDocument {
  id: string;
  category: SearchCategory;
  categoryLabel: BilingualString;
  metaBadge: BilingualString;
  title: BilingualString;
  arabic?: string;
  snippet: BilingualString;
  route: AtlasRoute;
  targetItemId?: string;
  searchPrimary: string;
  searchBody: string;
}

export interface SearchResultItem {
  doc: SearchDocument;
  score: number;
}

export interface GlobalSearchOutput {
  query: string;
  results: SearchResultItem[];
  countsByCategory: Record<SearchCategory, number>;
  totalCount: number;
}

export const SEARCH_CATEGORY_OPTIONS: { id: 'all' | SearchCategory; label: BilingualString }[] = [
  { id: 'all', label: { tr: 'Tümü', fr: 'Tout' } },
  { id: 'hadisler', label: { tr: 'Hadisler', fr: 'Hadiths' } },
  { id: 'sozluk', label: { tr: 'Sözlük', fr: 'Lexique' } },
  { id: 'imam-malik', label: { tr: 'İmam Mâlik', fr: 'Imam Mâlik' } },
  { id: 'el-muvatta', label: { tr: 'el-Muvatta’', fr: 'al-Muwatta’' } },
  { id: 'harita', label: { tr: 'Harita', fr: 'Carte' } },
];

export const SUGGESTED_SEARCH_QUERIES: { query: string; label: BilingualString }[] = [
  { query: 'Amel-i Ehl-i Medîne', label: { tr: 'Amel-i Ehl-i Medîne', fr: 'Pratique médinoise' } },
  { query: 'أوزاع', label: { tr: 'أَوْزَاعٌ (Evzâ‘)', fr: 'Groupes dispersés' } },
  { query: 'Nevevî', label: { tr: 'İmam en-Nevevî', fr: 'Glose d’an-Nawawî' } },
  { query: '23 rekât', label: { tr: '23 Rekât', fr: '23 Rak‘ât' } },
  { query: 'Yahyâ el-Leysî', label: { tr: 'Yahyâ el-Leysî', fr: 'Recension andalouse' } },
  { query: 'Endülüs', label: { tr: 'Endülüs / Kurtuba', fr: 'al-Andalus / Cordoue' } },
  { query: 'Silsiletü', label: { tr: 'Silsiletü’z-Zeheb', fr: 'Chaîne d’or' } },
  { query: 'Feyyûmî', label: { tr: 'Feyyûmî (Tedbîr)', fr: 'al-Fayyûmî (Tadbîr)' } },
];

let cachedIndex: SearchDocument[] | null = null;

export function buildGlobalSearchIndex(): SearchDocument[] {
  if (cachedIndex) return cachedIndex;

  const docs: SearchDocument[] = [];

  // 1. Hadiths (all 8 hadiths + classical footnotes + isnad narrators)
  for (const h of HADITHS_DATA) {
    const footnotesText = h.footnotes
      .map((f) => `${f.commentator.tr} ${f.commentator.fr} ${f.lemmaArabic} ${f.textArabic} ${f.translation.tr} ${f.translation.fr}`)
      .join(' ');
    const isnadText = h.isnad.map((l) => `${l.name} ${l.arabicName} ${l.bioNote.tr}`).join(' ');

    docs.push({
      id: `search-hadis-${h.number}`,
      category: 'hadisler',
      categoryLabel: { tr: 'Hadisler', fr: 'Hadiths' },
      metaBadge: {
        tr: `Hadis ${h.number} · ${h.bab}. Bab · s. ${h.pageNumber}`,
        fr: `Hadith ${h.number} · Chap. ${h.bab} · p. ${h.pageNumber}`,
      },
      title: {
        tr: `Hadis ${h.number}: ${h.title.tr}`,
        fr: `Hadith ${h.number} : ${h.title.fr}`,
      },
      arabic: h.arabicFull.slice(0, 145) + (h.arabicFull.length > 145 ? '…' : ''),
      snippet: h.fiqhSummary,
      route: 'hadisler',
      targetItemId: h.id,
      searchPrimary: normalizeSearchText(`Hadis ${h.number} ${h.title.tr} ${h.title.fr} ${h.typeLabel.tr}`),
      searchBody: normalizeSearchText(
        `${h.arabicFull} ${h.translation.tr} ${h.translation.fr} ${h.fiqhSummary.tr} ${h.fiqhSummary.fr} ${h.tahric?.tr ?? ''} ${h.tahric?.arabic ?? ''} ${footnotesText} ${isnadText}`
      ),
    });
  }

  // 2. Glossary entries (auto-populated from 8 Hadiths + DİA Usûl)
  for (const entry of buildGlossaryEntries()) {
    docs.push({
      id: `search-${entry.id}`,
      category: 'sozluk',
      categoryLabel: { tr: 'Sözlük', fr: 'Lexique' },
      metaBadge: {
        tr:
          entry.sourceGroup === 'dia-usul'
            ? `DİA Usûl/Hadis · Kök: ${entry.root}`
            : `${entry.posLabel.tr} · Kök: ${entry.root} · Hadis ${entry.hadithNumbers.join(', ')}`,
        fr:
          entry.sourceGroup === 'dia-usul'
            ? `Terme DİA · Racine : ${entry.root}`
            : `${entry.posLabel.fr} · Racine : ${entry.root}`,
      },
      title: {
        tr: `${entry.transliteration} — ${entry.meaning.tr}`,
        fr: `${entry.transliteration} — ${entry.meaning.fr}`,
      },
      arabic: entry.lemma,
      snippet: {
        tr: `${entry.sarf.tr} ${entry.nahiv.tr}`,
        fr: `${entry.sarf.fr} ${entry.nahiv.fr}`,
      },
      route: 'sozluk',
      targetItemId: entry.id,
      searchPrimary: normalizeSearchText(
        `${entry.lemma} ${entry.surfaceForms.join(' ')} ${entry.transliteration} ${entry.root} ${entry.meaning.tr} ${entry.meaning.fr}`
      ),
      searchBody: normalizeSearchText(
        `${entry.sarf.tr} ${entry.sarf.fr} ${entry.nahiv.tr} ${entry.nahiv.fr} ${entry.derivatives
          .map((d) => `${d.arabic} ${d.translit} ${d.meaning.tr} ${d.meaning.fr}`)
          .join(' ')}`
      ),
    });
  }

  // 3. Imam Malik (Timeline, Usul, Scholars, Quotes, Facets)
  for (const ev of IMAM_MALIK_TIMELINE) {
    docs.push({
      id: `search-malik-tl-${ev.id}`,
      category: 'imam-malik',
      categoryLabel: { tr: 'İmam Mâlik', fr: 'Imam Mâlik' },
      metaBadge: {
        tr: `Kronoloji · ${ev.hijriYear} / ${ev.gregorianYear}`,
        fr: `Chronologie · ${ev.hijriYear} / ${ev.gregorianYear}`,
      },
      title: ev.title,
      snippet: ev.summary,
      route: 'imam-malik',
      targetItemId: 'biography',
      searchPrimary: normalizeSearchText(`${ev.title.tr} ${ev.title.fr} ${ev.hijriYear} ${ev.gregorianYear}`),
      searchBody: normalizeSearchText(`${ev.summary.tr} ${ev.summary.fr} ${ev.sourceRef}`),
    });
  }

  for (const usul of USUL_SOURCES) {
    docs.push({
      id: `search-malik-usul-${usul.id}`,
      category: 'imam-malik',
      categoryLabel: { tr: 'İmam Mâlik', fr: 'Imam Mâlik' },
      metaBadge: {
        tr: `Usûl-i Fıkıh · Kaynak #${usul.rank}`,
        fr: `Usûl al-Fiqh · Source #${usul.rank}`,
      },
      title: usul.name,
      arabic: usul.arabic,
      snippet: usul.explanation,
      route: 'imam-malik',
      targetItemId: 'usul',
      searchPrimary: normalizeSearchText(`${usul.name.tr} ${usul.name.fr} ${usul.arabic} ${usul.shortRole.tr}`),
      searchBody: normalizeSearchText(
        `${usul.explanation.tr} ${usul.explanation.fr} ${usul.malikDistinction.tr} ${usul.malikDistinction.fr}`
      ),
    });
  }

  for (const scholar of SCHOLARS_NETWORK) {
    docs.push({
      id: `search-malik-scholar-${scholar.id}`,
      category: 'imam-malik',
      categoryLabel: { tr: 'İmam Mâlik', fr: 'Imam Mâlik' },
      metaBadge: {
        tr: `${scholar.categoryLabel.tr} · ${scholar.region}`,
        fr: `${scholar.categoryLabel.fr} · ${scholar.region}`,
      },
      title: { tr: scholar.name, fr: scholar.name },
      snippet: scholar.note,
      route: 'imam-malik',
      targetItemId: 'biography',
      searchPrimary: normalizeSearchText(`${scholar.name} ${scholar.region} ${scholar.categoryLabel.tr}`),
      searchBody: normalizeSearchText(`${scholar.note.tr} ${scholar.note.fr}`),
    });
  }

  for (const quote of WISDOM_QUOTES) {
    docs.push({
      id: `search-malik-quote-${quote.id}`,
      category: 'imam-malik',
      categoryLabel: { tr: 'İmam Mâlik', fr: 'Imam Mâlik' },
      metaBadge: { tr: 'Hikmetli Söz', fr: 'Parole de sagesse' },
      title: { tr: quote.tr.slice(0, 95) + (quote.tr.length > 95 ? '…' : ''), fr: quote.fr.slice(0, 95) + (quote.fr.length > 95 ? '…' : '') },
      arabic: quote.arabic,
      snippet: quote.context,
      route: 'imam-malik',
      targetItemId: 'quotes',
      searchPrimary: normalizeSearchText(`${quote.arabic} ${quote.tr} ${quote.fr}`),
      searchBody: normalizeSearchText(`${quote.context.tr} ${quote.context.fr} ${quote.source}`),
    });
  }

  for (const facet of SCHOLARLY_FACETS) {
    docs.push({
      id: `search-malik-facet-${facet.id}`,
      category: 'imam-malik',
      categoryLabel: { tr: 'İmam Mâlik', fr: 'Imam Mâlik' },
      metaBadge: { tr: 'İlmî Şahsiyet', fr: 'Portrait savant' },
      title: facet.title,
      snippet: facet.body,
      route: 'imam-malik',
      targetItemId: 'biography',
      searchPrimary: normalizeSearchText(`${facet.title.tr} ${facet.title.fr}`),
      searchBody: normalizeSearchText(`${facet.body.tr} ${facet.body.fr} ${facet.keyFact.tr}`),
    });
  }

  // 4. el-Muvatta (Timeline, Golden Chains, Evaluations, Narration Categories, 9 Riwayahs, 15 Commentaries, Related Studies)
  for (const m of COMPILATION_TIMELINE) {
    docs.push({
      id: `search-muv-tl-${m.id}`,
      category: 'el-muvatta',
      categoryLabel: { tr: 'el-Muvatta’', fr: 'al-Muwatta’' },
      metaBadge: { tr: `Telif Tarihi · ${m.era}`, fr: `Compilation · ${m.era}` },
      title: m.title,
      snippet: m.summary,
      route: 'el-muvatta',
      targetItemId: 'overview',
      searchPrimary: normalizeSearchText(`${m.title.tr} ${m.title.fr} ${m.era}`),
      searchBody: normalizeSearchText(`${m.summary.tr} ${m.summary.fr} ${m.sourceRef}`),
    });
  }

  for (const chain of GOLDEN_CHAINS) {
    docs.push({
      id: `search-muv-chain-${chain.id}`,
      category: 'el-muvatta',
      categoryLabel: { tr: 'el-Muvatta’', fr: 'al-Muwatta’' },
      metaBadge: { tr: 'Silsiletü’z-Zeheb', fr: 'Chaîne d’or' },
      title: chain.label,
      arabic: chain.arabicChain,
      snippet: chain.note,
      route: 'el-muvatta',
      targetItemId: 'overview',
      searchPrimary: normalizeSearchText(`${chain.label.tr} ${chain.label.fr} ${chain.chain.join(' ')} ${chain.arabicChain}`),
      searchBody: normalizeSearchText(`${chain.authority.tr} ${chain.note.tr} ${chain.note.fr}`),
    });
  }

  for (const ev of AUTHENTICITY_EVALUATIONS) {
    docs.push({
      id: `search-muv-auth-${ev.id}`,
      category: 'el-muvatta',
      categoryLabel: { tr: 'el-Muvatta’', fr: 'al-Muwatta’' },
      metaBadge: { tr: `Sıhhat Değerlendirmesi · ${ev.dates}`, fr: `Authenticité · ${ev.dates}` },
      title: { tr: `${ev.scholar}: ${ev.stance.tr}`, fr: `${ev.scholar} : ${ev.stance.fr}` },
      arabic: ev.arabicQuote,
      snippet: ev.quoteOrSummary,
      route: 'el-muvatta',
      targetItemId: 'overview',
      searchPrimary: normalizeSearchText(`${ev.scholar} ${ev.stance.tr} ${ev.stance.fr}`),
      searchBody: normalizeSearchText(`${ev.quoteOrSummary.tr} ${ev.quoteOrSummary.fr} ${ev.arabicQuote ?? ''} ${ev.citation}`),
    });
  }

  for (const cat of NARRATION_CATEGORIES) {
    docs.push({
      id: `search-muv-stat-${cat.id}`,
      category: 'el-muvatta',
      categoryLabel: { tr: 'el-Muvatta’', fr: 'al-Muwatta’' },
      metaBadge: { tr: `1.720 Rivâyet · ${cat.count} adet`, fr: `1 720 récits · ${cat.count}` },
      title: { tr: `${cat.name.tr} (${cat.count})`, fr: `${cat.name.fr} (${cat.count})` },
      arabic: cat.arabicTerm,
      snippet: cat.definition,
      route: 'el-muvatta',
      targetItemId: 'stats',
      searchPrimary: normalizeSearchText(`${cat.name.tr} ${cat.name.fr} ${cat.arabicTerm} ${cat.count}`),
      searchBody: normalizeSearchText(`${cat.definition.tr} ${cat.definition.fr} ${cat.scholarlyNote.tr}`),
    });
  }

  for (const r of RIWAYAH_RECORDS) {
    docs.push({
      id: `search-muv-riw-${r.id}`,
      category: 'el-muvatta',
      categoryLabel: { tr: 'el-Muvatta’', fr: 'al-Muwatta’' },
      metaBadge: {
        tr: `Rivâyet #${r.number} · ${r.regionLabel.tr} (${r.deathDate})`,
        fr: `Recension #${r.number} · ${r.regionLabel.fr} (${r.deathDate})`,
      },
      title: { tr: r.narrator, fr: r.narrator },
      arabic: r.arabicName,
      snippet: r.description,
      route: 'el-muvatta',
      targetItemId: 'riwayahs',
      searchPrimary: normalizeSearchText(`${r.narrator} ${r.arabicName} ${r.alias ?? ''} ${r.regionLabel.tr} ${r.regionLabel.fr}`),
      searchBody: normalizeSearchText(`${r.distinction.tr} ${r.distinction.fr} ${r.description.tr} ${r.description.fr} ${r.modernEditions}`),
    });
  }

  for (const c of COMMENTARY_RECORDS) {
    docs.push({
      id: `search-muv-com-${c.id}`,
      category: 'el-muvatta',
      categoryLabel: { tr: 'el-Muvatta’', fr: 'al-Muwatta’' },
      metaBadge: {
        tr: `Şerh · ${c.author} (${c.century})`,
        fr: `Commentaire · ${c.author} (${c.century})`,
      },
      title: { tr: `${c.title} — ${c.author}`, fr: `${c.title} — ${c.author}` },
      arabic: c.arabicTitle,
      snippet: c.summary,
      route: 'el-muvatta',
      targetItemId: 'commentaries',
      searchPrimary: normalizeSearchText(`${c.title} ${c.arabicTitle} ${c.author}`),
      searchBody: normalizeSearchText(`${c.summary.tr} ${c.summary.fr} ${c.volumesOrFormat}`),
    });
  }

  for (const st of RELATED_STUDIES) {
    docs.push({
      id: `search-muv-study-${st.id}`,
      category: 'el-muvatta',
      categoryLabel: { tr: 'el-Muvatta’', fr: 'al-Muwatta’' },
      metaBadge: st.category,
      title: { tr: `${st.work} (${st.author})`, fr: `${st.work} (${st.author})` },
      snippet: st.note,
      route: 'el-muvatta',
      targetItemId: 'commentaries',
      searchPrimary: normalizeSearchText(`${st.work} ${st.author} ${st.category.tr}`),
      searchBody: normalizeSearchText(`${st.note.tr} ${st.note.fr}`),
    });
  }

  // 5. Historical Map Locations
  for (const loc of HISTORICAL_MAP_LOCATIONS) {
    docs.push({
      id: `search-map-${loc.id}`,
      category: 'harita',
      categoryLabel: { tr: 'Harita', fr: 'Carte' },
      metaBadge: loc.role,
      title: loc.name,
      arabic: loc.arabicName,
      snippet: loc.significance,
      route: 'harita',
      targetItemId: loc.id,
      searchPrimary: normalizeSearchText(`${loc.name.tr} ${loc.name.fr} ${loc.arabicName} ${loc.keyFigures.join(' ')}`),
      searchBody: normalizeSearchText(`${loc.significance.tr} ${loc.significance.fr} ${loc.worksAndLegacy.tr} ${loc.worksAndLegacy.fr}`),
    });
  }

  cachedIndex = docs;
  return cachedIndex;
}

export function runGlobalSearch(
  rawQuery: string,
  categoryFilter: 'all' | SearchCategory = 'all'
): GlobalSearchOutput {
  const index = buildGlobalSearchIndex();
  const normalized = normalizeSearchText(rawQuery);

  const emptyCounts: Record<SearchCategory, number> = {
    hadisler: 0,
    sozluk: 0,
    'imam-malik': 0,
    'el-muvatta': 0,
    harita: 0,
  };

  if (!normalized) {
    return {
      query: rawQuery,
      results: [],
      countsByCategory: emptyCounts,
      totalCount: 0,
    };
  }

  const terms = normalized.split(/\s+/).filter(Boolean);
  const scoredAll: SearchResultItem[] = [];

  for (const doc of index) {
    let score = 0;

    if (doc.searchPrimary.includes(normalized)) {
      score += 100;
    }
    if (doc.searchBody.includes(normalized)) {
      score += 45;
    }

    // Multi-word AND match support (e.g., "23 rekat", "ibn hacer")
    if (terms.length > 1) {
      let matchedTerms = 0;
      for (const term of terms) {
        if (doc.searchPrimary.includes(term)) {
          score += 25;
          matchedTerms += 1;
        } else if (doc.searchBody.includes(term)) {
          score += 12;
          matchedTerms += 1;
        }
      }
      if (matchedTerms < terms.length && score < 45) {
        score = 0;
      }
    }

    if (score > 0) {
      // Slight relevance boost for hadiths & exact encyclopedia concepts over minor particles
      if (doc.category === 'hadisler') score += 10;
      if (doc.category === 'harita') score += 6;
      emptyCounts[doc.category] += 1;
      scoredAll.push({ doc, score });
    }
  }

  scoredAll.sort((a, b) => b.score - a.score || a.doc.title.tr.localeCompare(b.doc.title.tr, 'tr'));

  const filtered =
    categoryFilter === 'all'
      ? scoredAll
      : scoredAll.filter((item) => item.doc.category === categoryFilter);

  return {
    query: rawQuery,
    results: filtered,
    countsByCategory: emptyCounts,
    totalCount: scoredAll.length,
  };
}
