import { useState, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';

interface SearchResult {
  term: string;
  code: string;
  score: number;
  isInformal: boolean;
  context: string;
  majorGroup: string;
  targetTitle: string;
  term_np: string;
  targetTitle_np: string;
}

export default function InformalSearch({ onSelect }: { onSelect: (code: string, term: string, majorGroup: string, isInformal: boolean) => void }) {
  const { t, i18n } = useTranslation();
  const isNepali = i18n.language === 'ne-NP';
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  // Format: [term, code, isInformal, context, majorGroup, targetTitle, term_np, targetTitle_np]
  const [searchIndex, setSearchIndex] = useState<[string, string, boolean, string, string, string, string, string][]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    fetch('/data/search_index.json')
      .then(res => res.json())
      .then(data => setSearchIndex(data))
      .catch(err => console.error('Failed to load search index', err));
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSearch = (val: string) => {
    setQuery(val);
    if (val.length < 2) {
      setResults([]);
      setIsOpen(false);
      return;
    }

    const q = val.toLowerCase().trim();
    const matches = searchIndex
      .map(([term, code, isInformal, context, majorGroup, targetTitle, term_np, targetTitle_np]) => {
        const tLower = term.toLowerCase();
        const tNpLower = (term_np || "").toLowerCase();
        let score = 0;

        // 1. Exact Match (Highest) - Check both EN and NP
        if (tLower === q || tNpLower === q) score = 100;
        // 2. Starts With
        else if (tLower.startsWith(q) || tNpLower.startsWith(q)) score = 85;
        // 3. Substring contains
        else if (tLower.includes(q) || tNpLower.includes(q)) score = 75;

        // 4. Word-based overlap (Discovery of phrases)
        const qWords = q.split(/\s+/).filter(w => w.length > 2);
        const tWords = tLower.split(/\s+/);
        if (qWords.length > 0) {
          const overlap = qWords.filter(w => tWords.some(tw => tw.includes(w))).length;
          const wordScore = (overlap / qWords.length) * 70;
          score = Math.max(score, wordScore);
        }

        // 5. Logical Aliases & Cross-Discovery
        const aliases: Record<string, string[]> = {
          'bike': ['bicycle', 'motorcycle', 'scooter', 'mechanic'],
          'painter': ['decorative', 'spray', 'construction', 'artist', 'fine arts'],
          'driver': ['taxi', 'bus', 'delivery', 'chauffeur'],
          'repair': ['mechanic', 'technician', 'fix'],
          'artist': ['painter', 'sculptor', 'creative'],
          'पेन्टर': ['सजावटी', 'स्प्रे', 'रंग'], // Basic Nepali aliases
          'मेकानिक': ['मर्मत', 'टेक्निसियन']
        };

        Object.entries(aliases).forEach(([key, list]) => {
          if (q.includes(key)) {
            // Boost results that contain related terms
            if (list.some(word => tLower.includes(word) || tNpLower.includes(word))) {
              score = Math.max(score, 72);
            }
          }
        });

        // 6. Tie-breaker: Prefer informal gigs for transition context
        if (isInformal && score > 0) score += 1;

        return { term, code, score, isInformal, context, majorGroup, targetTitle, term_np, targetTitle_np };
      })
      .filter(item => item.score > 30)
      .sort((a, b) => b.score - a.score)
      .slice(0, 15);

    setResults(matches);
    setIsOpen(matches.length > 0);
  };

  const getDisplayText = (enText: string, npText: string) => {
    if (isNepali && npText && npText !== enText) {
      return `${npText} (${enText})`;
    }
    return enText;
  };

  return (
    <div className="relative w-full max-w-2xl mx-auto" ref={containerRef}>
      <div className="relative">
        <input
          type="text"
          value={query}
          onChange={(e) => handleSearch(e.target.value)}
          onFocus={() => query.length >= 2 && setIsOpen(results.length > 0)}
          placeholder={t('Index.search_placeholder')}
          className="w-full pl-6 pr-20 py-4 text-lg bg-white rounded-2xl shadow-xl border-2 border-brand-blue/5 focus:border-brand-blue/20 outline-none transition-all placeholder:text-gray-400 text-brand-blue"
        />
        <div className="absolute right-4 top-1/2 -translate-y-1/2 flex items-center space-x-1">
          <button
            type="button"
            className="p-2 text-brand-blue/40 hover:text-brand-blue hover:bg-brand-blue/5 rounded-full transition-colors"
            title="Voice Search"
            onClick={(e) => { e.preventDefault(); alert("Voice search functionality coming soon!"); }}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
            </svg>
          </button>
          <div className="w-px h-6 bg-gray-200 mx-1"></div>
          <svg className="w-5 h-5 text-brand-blue/30 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
      </div>

      {isOpen && (
        <div className="absolute z-50 w-full mt-2 bg-white rounded-xl shadow-2xl border border-gray-100 overflow-hidden animate-in fade-in slide-in-from-top-2 max-h-[60vh] overflow-y-auto">
          {results.map((res, i) => (
            <button
              key={i}
              onClick={() => {
                onSelect(res.code, isNepali && res.term_np && res.term_np !== res.term ? `${res.term_np} (${res.term})` : res.term, res.majorGroup, res.isInformal);
                setQuery(isNepali && res.term_np && res.term_np !== res.term ? `${res.term_np} (${res.term})` : res.term);
                setIsOpen(false);
              }}
              className="w-full px-6 py-4 text-left hover:bg-brand-slate flex items-start justify-between group transition-colors border-b border-gray-50 last:border-0"
            >
              <div className="space-y-1">
                <div className="flex items-center space-x-3">
                  <span className="text-brand-blue font-bold">
                    {getDisplayText(res.term, res.term_np)}
                  </span>
                  {res.context === "Excluded Path" && (
                    <span
                      className="px-1.5 py-0.5 bg-brand-gold/10 text-brand-gold text-[8px] font-black uppercase rounded tracking-tighter border border-brand-gold/20"
                      title={t('Index.tip_identified')}
                    >
                      {t('Index.badge_identified')}
                    </span>
                  )}
                  {res.context === "Included Alias" && (
                    <span
                      className="px-1.5 py-0.5 bg-brand-blue/5 text-brand-blue text-[8px] font-black uppercase rounded tracking-tighter border border-brand-blue/10"
                      title={t('Index.tip_recognized')}
                    >
                      {t('Index.badge_recognized')}
                    </span>
                  )}
                  {res.context === "Exact Standard" && (
                    <span
                      className="px-1.5 py-0.5 bg-brand-green/10 text-brand-green text-[8px] font-black uppercase rounded tracking-tighter border border-brand-green/20"
                      title={t('Index.tip_standard')}
                    >
                      {t('Index.badge_standard')}
                    </span>
                  )}
                </div>
                {res.context !== "Exact Standard" && (
                  <div className="flex items-center space-x-2">
                    <span className="text-[10px] text-gray-400 font-bold uppercase tracking-tighter">Maps to:</span>
                    <span className="text-xs font-medium text-gray-500 line-clamp-1">
                      {getDisplayText(res.targetTitle, res.targetTitle_np)}
                    </span>
                  </div>
                )}
              </div>

              <div className="text-right shrink-0">
                <div className="text-[10px] font-mono text-gray-400 group-hover:text-brand-blue/40 transition-colors">ISCO {res.code}</div>
                <div className="badge bg-gray-50 text-gray-400 group-hover:bg-brand-blue/5 group-hover:text-brand-blue transition-colors mt-1 font-mono">
                  MG{res.majorGroup?.replace('MG', '')}
                </div>
              </div>
            </button>
          ))}
        </div>
      )}

    </div>
  );
}
