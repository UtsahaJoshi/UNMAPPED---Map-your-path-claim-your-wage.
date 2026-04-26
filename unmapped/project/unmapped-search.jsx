// Hero search with badge dropdown

function SearchSection({ t, lang, onSelect, selected }) {
  const [q, setQ] = React.useState('bike rid');
  const [focused, setFocused] = React.useState(true);
  const [voiceOn, setVoiceOn] = React.useState(false);

  const hits = q.trim()
    ? SEARCH_HITS.filter(h =>
        h.informal.toLowerCase().includes(q.toLowerCase()) ||
        h.informalNe.includes(q) ||
        q.toLowerCase().includes(h.informal.toLowerCase().split(' ')[0])
      ).slice(0, 4)
    : SEARCH_HITS.slice(0, 3);

  const showDropdown = focused && q.trim().length > 0 && !selected;

  return (
    <section style={{ padding: '8px 20px 20px' }}>
      {/* Greeting */}
      <div style={{ marginBottom: 22 }}>
        <div style={{
          fontFamily: "'Instrument Serif', serif",
          fontSize: 34, lineHeight: 1.05, fontStyle: 'italic',
          letterSpacing: -0.5, color: '#0A1F3D',
        }}>
          {t.greeting}
        </div>
        <div style={{
          fontSize: 14, color: 'rgba(10,31,61,0.6)',
          marginTop: 6, lineHeight: 1.4,
          fontFamily: lang === 'ne' ? "'Noto Sans Devanagari', sans-serif" : 'Inter',
        }}>
          {t.greetingSub}
        </div>
      </div>

      {/* Search label */}
      <div style={{
        fontSize: 11, fontWeight: 600, letterSpacing: 0.8,
        textTransform: 'uppercase', color: 'rgba(10,31,61,0.5)',
        marginBottom: 10, fontFamily: 'JetBrains Mono, monospace',
      }}>
        ◆ {t.searchLabel}
      </div>

      {/* Search bar */}
      <div style={{
        position: 'relative',
        background: 'rgba(255,255,255,0.65)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        border: focused ? '1.5px solid #0A1F3D' : '1px solid rgba(10,31,61,0.12)',
        borderRadius: 18,
        padding: '16px 14px',
        display: 'flex', alignItems: 'center', gap: 12,
        transition: 'all .2s',
        boxShadow: focused
          ? '0 8px 28px rgba(10,31,61,0.12), 0 1px 0 rgba(255,255,255,0.8) inset'
          : '0 2px 10px rgba(10,31,61,0.04), 0 1px 0 rgba(255,255,255,0.8) inset',
      }}>
        <div style={{ color: '#0A1F3D', flexShrink: 0 }}>
          <IconSearch size={20} />
        </div>
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          onFocus={() => setFocused(true)}
          placeholder={t.searchPlaceholder}
          style={{
            flex: 1, border: 0, background: 'transparent', outline: 'none',
            fontSize: 16, color: '#0A1F3D', fontFamily: lang === 'ne' ? "'Noto Sans Devanagari', sans-serif" : 'Inter',
            minWidth: 0,
          }}
        />
        <button
          onClick={() => setVoiceOn(v => !v)}
          aria-label="voice search"
          style={{
            border: 0, background: voiceOn ? '#0A1F3D' : 'rgba(10,31,61,0.06)',
            color: voiceOn ? '#F5F1E8' : '#0A1F3D',
            width: 36, height: 36, borderRadius: 12,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            cursor: 'pointer', transition: 'all .2s',
            position: 'relative', flexShrink: 0,
          }}
        >
          <IconMic size={18} />
          {voiceOn && (
            <span style={{
              position: 'absolute', inset: -4, borderRadius: 14,
              border: '1.5px solid #0A1F3D', opacity: 0.4,
              animation: 'pulse 1.4s ease-out infinite',
            }} />
          )}
        </button>
      </div>

      {/* Dropdown */}
      {showDropdown && (
        <div style={{
          marginTop: 10,
          background: 'rgba(255,255,255,0.92)',
          backdropFilter: 'blur(24px)',
          WebkitBackdropFilter: 'blur(24px)',
          border: '1px solid rgba(10,31,61,0.1)',
          borderRadius: 18,
          overflow: 'hidden',
          boxShadow: '0 12px 36px rgba(10,31,61,0.1)',
        }}>
          {hits.length === 0 && (
            <div style={{ padding: '20px', fontSize: 13, color: 'rgba(10,31,61,0.5)', textAlign: 'center' }}>
              No matches yet. Try another term.
            </div>
          )}
          {hits.map((h, i) => (
            <SearchHitRow key={h.id} hit={h} t={t} lang={lang}
              isLast={i === hits.length - 1}
              onClick={() => onSelect(h)} />
          ))}
        </div>
      )}

      {/* Selected pill (when a hit was clicked) */}
      {selected && (
        <div style={{
          marginTop: 12,
          display: 'flex', alignItems: 'center', gap: 10,
          padding: '12px 14px',
          background: '#0A1F3D', color: '#F5F1E8',
          borderRadius: 14,
          fontSize: 13,
        }}>
          <IconCheck size={16} />
          <div style={{ flex: 1 }}>
            <div style={{ fontWeight: 600 }}>{lang === 'ne' ? selected.informalNe : selected.informal}</div>
            <div style={{ opacity: 0.7, fontSize: 11, fontFamily: 'JetBrains Mono, monospace', marginTop: 2 }}>
              ISCO {selected.isco} · {lang === 'ne' ? selected.formalNe : selected.formal}
            </div>
          </div>
          <button onClick={() => onSelect(null)} style={{
            border: 0, background: 'rgba(245,241,232,0.12)', color: '#F5F1E8',
            borderRadius: 8, padding: '6px 10px', cursor: 'pointer', fontSize: 11,
            fontFamily: 'JetBrains Mono, monospace', letterSpacing: 0.5,
          }}>
            CLEAR
          </button>
        </div>
      )}

      <style>{`
        @keyframes pulse {
          0% { transform: scale(1); opacity: .5; }
          100% { transform: scale(1.4); opacity: 0; }
        }
      `}</style>
    </section>
  );
}

function SearchHitRow({ hit, t, lang, isLast, onClick }) {
  const isNS = hit.badge === 'NEGATIVE_SPACE';
  const badgeLabel = isNS ? t.badgeNS : t.badgeIA;
  const badgeBg = isNS
    ? 'linear-gradient(180deg, oklch(0.78 0.13 68), oklch(0.7 0.14 55))'
    : 'linear-gradient(180deg, oklch(0.55 0.12 245), oklch(0.42 0.14 250))';

  return (
    <button onClick={onClick} style={{
      display: 'flex', width: '100%', alignItems: 'flex-start', gap: 12,
      padding: '14px 16px', border: 0, background: 'transparent',
      textAlign: 'left', cursor: 'pointer',
      borderBottom: isLast ? 'none' : '1px solid rgba(10,31,61,0.06)',
      fontFamily: 'inherit',
    }}>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{
          fontSize: 15, fontWeight: 600, color: '#0A1F3D',
          fontFamily: lang === 'ne' ? "'Noto Sans Devanagari', sans-serif" : 'Inter',
        }}>
          {lang === 'ne' ? hit.informalNe : hit.informal}
        </div>
        <div style={{
          fontSize: 12, color: 'rgba(10,31,61,0.55)',
          marginTop: 4, display: 'flex', alignItems: 'center', gap: 6,
          fontFamily: lang === 'ne' ? "'Noto Sans Devanagari', sans-serif" : 'Inter',
        }}>
          <IconArrowRight size={11} />
          <span>{t.mapsTo}-{hit.isco} · {lang === 'ne' ? hit.formalNe : hit.formal}</span>
        </div>
      </div>
      <span style={{
        fontSize: 9, fontWeight: 700, letterSpacing: 0.5,
        textTransform: 'uppercase',
        padding: '5px 8px', borderRadius: 6,
        color: '#fff', background: badgeBg,
        whiteSpace: 'nowrap', flexShrink: 0,
        fontFamily: 'JetBrains Mono, monospace',
        boxShadow: '0 1px 0 rgba(255,255,255,0.3) inset',
      }}>
        {badgeLabel}
      </span>
    </button>
  );
}

Object.assign(window, { SearchSection });
