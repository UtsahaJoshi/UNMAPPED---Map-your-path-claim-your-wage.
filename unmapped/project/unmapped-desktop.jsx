// Desktop layout — single dashboard

function DesktopLayout({ t, lang, selected, setSelected, setTweak }) {
  return (
    <div style={{
      width: 1280, height: 820,
      background: '#F5F1E8',
      backgroundImage:
        'radial-gradient(circle at 0% 0%, oklch(0.78 0.13 75 / 0.07) 0%, transparent 30%), radial-gradient(circle at 100% 100%, oklch(0.5 0.04 250 / 0.06) 0%, transparent 35%)',
      display: 'flex', flexDirection: 'column',
      fontFamily: 'Inter, sans-serif',
      color: '#0A1F3D', overflow: 'hidden',
      borderRadius: 12,
    }}>
      <DesktopTopBar t={t} lang={lang} onLangToggle={() => setTweak('language', lang === 'en' ? 'ne' : 'en')} />

      <div style={{
        flex: 1, padding: '20px 32px 24px',
        display: 'grid', gridTemplateColumns: '1.15fr 1fr', gap: 20,
        minHeight: 0, overflow: 'hidden',
      }}>
        {/* LEFT column */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16, minHeight: 0, overflow: 'hidden' }}>
          <DesktopHero t={t} lang={lang} selected={selected} onSelect={setSelected} />
          <DesktopBridge t={t} lang={lang} selected={selected} />
        </div>

        {/* RIGHT column */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16, minHeight: 0, overflow: 'hidden' }}>
          <DesktopSkills t={t} lang={lang} />
          <DesktopPassport t={t} lang={lang} selected={selected} />
        </div>
      </div>
    </div>
  );
}

function DesktopTopBar({ t, lang, onLangToggle }) {
  return (
    <div style={{
      padding: '14px 32px',
      borderBottom: '1px solid rgba(10,31,61,0.08)',
      background: 'rgba(255,255,255,0.5)',
      backdropFilter: 'blur(12px)',
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        <div style={{
          width: 34, height: 34, borderRadius: 8,
          background: '#0A1F3D', color: 'oklch(0.78 0.13 75)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontFamily: "'Instrument Serif', serif", fontSize: 22,
        }}>U</div>
        <div>
          <div style={{
            fontFamily: 'JetBrains Mono, monospace',
            fontSize: 13, fontWeight: 700, letterSpacing: 1.2,
            color: '#0A1F3D',
          }}>
            {t.appName} <span style={{ opacity: 0.4, marginLeft: 4 }}>·</span>
            <span style={{ marginLeft: 6, fontWeight: 500, opacity: 0.7,
              fontFamily: lang === 'ne' ? "'Noto Sans Devanagari', sans-serif" : 'JetBrains Mono, monospace' }}>{t.tagline}</span>
          </div>
          <div style={{
            fontSize: 10, letterSpacing: 0.5, marginTop: 2,
            color: 'rgba(10,31,61,0.5)',
            fontFamily: 'JetBrains Mono, monospace',
          }}>
            ◆ KATHMANDU/NPL · ISCO-08 ALIGNED · NRB DATA
          </div>
        </div>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
        <div style={{
          fontSize: 10, fontFamily: 'JetBrains Mono, monospace',
          color: 'rgba(10,31,61,0.5)', letterSpacing: 0.5,
          display: 'flex', alignItems: 'center', gap: 6,
        }}>
          <span style={{
            width: 6, height: 6, borderRadius: 3,
            background: 'oklch(0.6 0.18 145)',
            boxShadow: '0 0 8px oklch(0.6 0.18 145)',
          }} />
          LIVE · NRB SYNC 2026.04.26
        </div>
        <button onClick={onLangToggle} style={{
          border: '1px solid rgba(10,31,61,0.15)',
          background: 'rgba(255,255,255,0.7)',
          borderRadius: 10, padding: '7px 12px',
          fontSize: 12, fontWeight: 600,
          color: '#0A1F3D', cursor: 'pointer',
          display: 'flex', alignItems: 'center', gap: 6,
          fontFamily: 'JetBrains Mono, monospace',
          letterSpacing: 0.5,
        }}>
          <span style={{ opacity: lang === 'en' ? 1 : 0.4 }}>EN</span>
          <span style={{ opacity: 0.3 }}>/</span>
          <span style={{ opacity: lang === 'ne' ? 1 : 0.4, fontFamily: "'Noto Sans Devanagari', sans-serif" }}>ने</span>
        </button>
        <div style={{
          width: 36, height: 36, borderRadius: 18,
          background: 'linear-gradient(135deg, oklch(0.78 0.13 75), oklch(0.65 0.14 50))',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          color: '#0A1F3D', fontWeight: 700, fontSize: 13,
          border: '1.5px solid rgba(10,31,61,0.1)',
        }}>
          B
        </div>
      </div>
    </div>
  );
}

function DesktopHero({ t, lang, selected, onSelect }) {
  const [q, setQ] = React.useState('bike rid');
  const [focused, setFocused] = React.useState(false);
  const showDropdown = focused && q.trim().length > 0;
  const hits = SEARCH_HITS.filter(h => h.informal.toLowerCase().includes(q.toLowerCase().split(' ')[0]) || q === '').slice(0, 4);

  return (
    <div style={{
      background: 'rgba(255,255,255,0.7)',
      backdropFilter: 'blur(20px)',
      border: '1px solid rgba(10,31,61,0.1)',
      borderRadius: 18,
      padding: 22, position: 'relative',
    }}>
      <div style={{ display: 'flex', alignItems: 'baseline', gap: 10, marginBottom: 4 }}>
        <span style={{
          fontFamily: 'JetBrains Mono, monospace', fontSize: 10,
          fontWeight: 600, letterSpacing: 1.2, color: 'rgba(10,31,61,0.5)',
        }}>§01 · INFORMAL SEARCH</span>
      </div>
      <h1 style={{
        margin: '2px 0 4px', fontFamily: "'Instrument Serif', serif",
        fontSize: 30, fontStyle: 'italic', fontWeight: 400,
        letterSpacing: -0.5,
      }}>{t.greeting}.</h1>
      <div style={{
        fontSize: 13, color: 'rgba(10,31,61,0.6)', marginBottom: 14,
        fontFamily: lang === 'ne' ? "'Noto Sans Devanagari', sans-serif" : 'Inter',
      }}>{t.greetingSub}</div>

      <div style={{
        background: '#fff',
        border: focused ? '1.5px solid #0A1F3D' : '1px solid rgba(10,31,61,0.12)',
        borderRadius: 14, padding: '14px 14px',
        display: 'flex', alignItems: 'center', gap: 12,
        boxShadow: focused ? '0 8px 28px rgba(10,31,61,0.1)' : '0 1px 0 rgba(255,255,255,0.6) inset',
        transition: 'all .2s',
      }}>
        <IconSearch size={18} />
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          onFocus={() => setFocused(true)}
          onBlur={() => setTimeout(() => setFocused(false), 150)}
          placeholder={t.searchPlaceholder}
          style={{
            flex: 1, border: 0, outline: 'none', background: 'transparent',
            fontSize: 15, color: '#0A1F3D', fontFamily: 'Inter',
          }}
        />
        <button style={{
          border: 0, background: 'rgba(10,31,61,0.06)', color: '#0A1F3D',
          width: 34, height: 34, borderRadius: 10, cursor: 'pointer',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
          <IconMic size={16} />
        </button>
      </div>

      {showDropdown && (
        <div style={{
          position: 'absolute', left: 22, right: 22, top: 'calc(100% - 8px)',
          marginTop: 6,
          background: '#fff',
          border: '1px solid rgba(10,31,61,0.1)',
          borderRadius: 14, overflow: 'hidden', zIndex: 30,
          boxShadow: '0 16px 40px rgba(10,31,61,0.14)',
        }}>
          {hits.map((h, i) => (
            <SearchHitRow key={h.id} hit={h} t={t} lang={lang}
              isLast={i === hits.length - 1}
              onClick={() => { onSelect(h); setFocused(false); }} />
          ))}
        </div>
      )}

      {selected && (
        <div style={{
          marginTop: 12, display: 'flex', gap: 10, alignItems: 'center',
          padding: '10px 14px',
          background: '#0A1F3D', color: '#F5F1E8',
          borderRadius: 12, fontSize: 12,
        }}>
          <IconCheck size={14} />
          <div style={{ flex: 1 }}>
            <span style={{ fontWeight: 600 }}>{lang === 'ne' ? selected.informalNe : selected.informal}</span>
            <span style={{ opacity: 0.5, margin: '0 8px' }}>→</span>
            <span style={{ fontFamily: 'JetBrains Mono, monospace', opacity: 0.85 }}>
              ISCO {selected.isco} · {lang === 'ne' ? selected.formalNe : selected.formal}
            </span>
          </div>
        </div>
      )}
    </div>
  );
}

function DesktopBridge({ t, lang, selected }) {
  const fmt = (n) => n.toLocaleString('en-IN');
  return (
    <div style={{
      flex: 1, minHeight: 0,
      background: 'rgba(255,255,255,0.7)',
      backdropFilter: 'blur(20px)',
      border: '1px solid rgba(10,31,61,0.1)',
      borderRadius: 18, padding: 22,
      display: 'flex', flexDirection: 'column', gap: 14,
    }}>
      <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between' }}>
        <div>
          <div style={{
            fontFamily: 'JetBrains Mono, monospace', fontSize: 10,
            fontWeight: 600, letterSpacing: 1.2, color: 'rgba(10,31,61,0.5)',
          }}>§02 · LOGIC BRIDGE</div>
          <h2 style={{
            margin: '2px 0 0', fontFamily: "'Instrument Serif', serif",
            fontSize: 22, fontWeight: 400, letterSpacing: -0.3,
          }}>{t.bridgeTitle}</h2>
        </div>
        <ConfidenceCard t={t} />
      </div>

      <ThreeCardCompare t={t} lang={lang} fmt={fmt} />

      {/* Delta hero */}
      <div style={{
        flex: 1, minHeight: 0,
        background: 'linear-gradient(135deg, oklch(0.97 0.02 95), oklch(0.92 0.05 80))',
        border: '1px solid oklch(0.78 0.13 75 / 0.4)',
        borderRadius: 14, padding: 18,
        display: 'flex', alignItems: 'center', gap: 18,
        position: 'relative', overflow: 'hidden',
      }}>
        <div style={{
          position: 'absolute', top: 12, right: 14,
          fontFamily: 'JetBrains Mono, monospace',
          fontSize: 9, color: 'oklch(0.45 0.08 60)',
          letterSpacing: 1, fontWeight: 700,
        }}>
          ◆ TRANSITION DELTA
        </div>
        <div style={{ flex: 1 }}>
          <div style={{
            fontSize: 11, fontWeight: 600, letterSpacing: 0.6, textTransform: 'uppercase',
            color: 'oklch(0.45 0.08 60)', marginBottom: 4,
            fontFamily: 'JetBrains Mono, monospace',
          }}>{t.delta}</div>
          <div style={{
            fontFamily: "'Instrument Serif', serif",
            fontSize: 64, fontWeight: 400, letterSpacing: -2,
            lineHeight: 0.95, color: '#0A1F3D',
            display: 'flex', alignItems: 'baseline', gap: 6,
          }}>
            <span style={{ fontSize: 30, fontStyle: 'italic' }}>+{t.npr}</span>
            {fmt(BRIDGE.delta)}
          </div>
          <div style={{
            marginTop: 10, display: 'flex', gap: 10, alignItems: 'center',
          }}>
            <div style={{
              background: 'oklch(0.55 0.16 145)', color: '#fff',
              padding: '4px 9px', borderRadius: 7,
              fontSize: 11, fontWeight: 700,
              fontFamily: 'JetBrains Mono, monospace',
              display: 'flex', alignItems: 'center', gap: 4,
            }}>
              <IconArrowUp size={11} stroke={2.5} /> {BRIDGE.growthPct}%
            </div>
            <div style={{ fontSize: 11, color: 'rgba(10,31,61,0.65)' }}>{t.expectedGrowth}</div>
          </div>
        </div>
      </div>
    </div>
  );
}

function DesktopSkills({ t, lang }) {
  const [items, setItems] = React.useState(SKILLS);
  const completed = items.filter(i => i.done).length;
  const pct = Math.round((completed / items.length) * 100);
  const toggle = (id) => setItems(items.map(i => i.id === id ? { ...i, done: !i.done } : i));

  return (
    <div style={{
      background: 'rgba(255,255,255,0.7)',
      backdropFilter: 'blur(20px)',
      border: '1px solid rgba(10,31,61,0.1)',
      borderRadius: 18, padding: 18,
      display: 'flex', flexDirection: 'column', minHeight: 0,
    }}>
      <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', marginBottom: 10 }}>
        <div>
          <div style={{
            fontFamily: 'JetBrains Mono, monospace', fontSize: 10,
            fontWeight: 600, letterSpacing: 1.2, color: 'rgba(10,31,61,0.5)',
          }}>§03 · SKILL GAP</div>
          <h2 style={{
            margin: '2px 0 0', fontFamily: "'Instrument Serif', serif",
            fontSize: 20, fontWeight: 400, letterSpacing: -0.3,
          }}>{t.skillsTitle}</h2>
        </div>
        <div style={{
          fontFamily: 'JetBrains Mono, monospace',
          fontSize: 12, fontWeight: 600, color: '#0A1F3D',
        }}>{completed}/{items.length} · {pct}%</div>
      </div>

      {/* Progress bar */}
      <div style={{
        height: 6, borderRadius: 3, background: 'rgba(10,31,61,0.08)',
        overflow: 'hidden', marginBottom: 12,
      }}>
        <div style={{
          width: `${pct}%`, height: '100%',
          background: 'linear-gradient(90deg, oklch(0.55 0.16 145), oklch(0.65 0.18 140))',
          borderRadius: 3, transition: 'width .35s ease',
        }} />
      </div>

      <div style={{ flex: 1, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: 6 }}>
        {items.map(it => (
          <div key={it.id} style={{
            display: 'flex', alignItems: 'center', gap: 10,
            padding: '8px 10px', borderRadius: 10,
            background: it.done ? 'rgba(10,31,61,0.03)' : 'transparent',
          }}>
            <button onClick={() => toggle(it.id)} style={{
              flexShrink: 0,
              width: 20, height: 20, borderRadius: 6,
              border: it.done ? 0 : '1.5px solid rgba(10,31,61,0.25)',
              background: it.done ? '#0A1F3D' : 'transparent',
              color: '#F5F1E8',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              cursor: 'pointer',
            }}>{it.done && <IconCheck size={12} stroke={2.5} />}</button>
            <div style={{
              flex: 1, fontSize: 13,
              color: it.done ? 'rgba(10,31,61,0.4)' : '#0A1F3D',
              textDecoration: it.done ? 'line-through' : 'none',
              fontFamily: lang === 'ne' ? "'Noto Sans Devanagari', sans-serif" : 'Inter',
            }}>
              {lang === 'ne' ? it.ne : it.en}
            </div>
            <button style={{
              flexShrink: 0,
              width: 26, height: 26, borderRadius: 7,
              border: 0, background: 'rgba(10,31,61,0.05)',
              color: 'rgba(10,31,61,0.5)', cursor: 'pointer',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}><IconSpeaker size={12} /></button>
          </div>
        ))}
      </div>
    </div>
  );
}

function DesktopPassport({ t, lang, selected }) {
  const fmt = (n) => n.toLocaleString('en-IN');
  return (
    <div style={{
      background: 'linear-gradient(165deg, #0A1F3D 0%, #112D54 50%, #0A1F3D 100%)',
      color: '#F5F1E8',
      borderRadius: 18, padding: 18,
      position: 'relative', overflow: 'hidden',
      boxShadow: '0 16px 40px -12px rgba(10,31,61,0.4)',
    }}>
      <div style={{
        position: 'absolute', inset: 0,
        background: 'radial-gradient(ellipse at 100% 0%, oklch(0.78 0.13 75 / 0.18), transparent 50%)',
        pointerEvents: 'none',
      }} />
      <div style={{
        position: 'absolute', inset: 8, borderRadius: 12,
        border: '1px solid oklch(0.78 0.13 75 / 0.3)',
        pointerEvents: 'none',
      }} />
      <div style={{
        position: 'absolute', inset: 0,
        backgroundImage: 'repeating-linear-gradient(45deg, transparent 0 8px, oklch(0.78 0.13 75 / 0.04) 8px 9px)',
        pointerEvents: 'none',
      }} />

      <div style={{ position: 'relative', display: 'flex', gap: 18 }}>
        {/* Left: identity */}
        <div style={{ flex: 1.2 }}>
          <div style={{
            fontSize: 9, fontWeight: 700, letterSpacing: 1.5,
            color: 'oklch(0.78 0.13 75)',
            fontFamily: 'JetBrains Mono, monospace',
          }}>◆ §04 · TRANSITION PASSPORT</div>
          <div style={{
            fontFamily: "'Instrument Serif', serif", fontStyle: 'italic',
            fontSize: 22, marginTop: 4, letterSpacing: -0.3, lineHeight: 1.1,
          }}>
            Federal Democratic<br/>Republic of Nepal
          </div>

          <div style={{ marginTop: 12, paddingTop: 10, borderTop: '1px solid oklch(0.78 0.13 75 / 0.3)' }}>
            <PassportRow label={t.currentStanding} value={t.informal} status="bad" lang={lang} />
            <div style={{ display: 'flex', justifyContent: 'flex-start', margin: '2px 0 2px 2px', color: 'oklch(0.78 0.13 75)' }}>
              <IconRoute size={16} />
            </div>
            <PassportRow label={t.transitionTarget} value={t.formal} status="good" lang={lang}
              sub={'ISCO ' + selected.isco + ' · ' + (lang === 'ne' ? selected.formalNe : selected.formal)} />
          </div>
        </div>

        {/* Right: uplift + qr */}
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 10 }}>
          <div style={{
            width: 44, height: 44, borderRadius: 22, alignSelf: 'flex-end',
            border: '1.5px solid oklch(0.78 0.13 75)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontFamily: "'Instrument Serif', serif", fontSize: 22,
            color: 'oklch(0.78 0.13 75)',
          }}>U</div>
          <div style={{
            background: 'rgba(245,241,232,0.05)',
            border: '1px solid oklch(0.78 0.13 75 / 0.3)',
            borderRadius: 10, padding: 12,
            flex: 1,
          }}>
            <div style={{
              fontSize: 9, fontWeight: 700, letterSpacing: 1.2,
              color: 'oklch(0.78 0.13 75)',
              fontFamily: 'JetBrains Mono, monospace',
            }}>MONTHLY WAGE UPLIFT</div>
            <div style={{
              fontFamily: "'Instrument Serif', serif",
              fontSize: 30, fontStyle: 'italic',
              marginTop: 2, letterSpacing: -0.5,
              color: 'oklch(0.78 0.13 75)',
            }}>
              +{t.npr} {fmt(BRIDGE.delta)}
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginTop: 8 }}>
              <QRPlaceholder />
              <div style={{
                fontSize: 8, fontFamily: 'JetBrains Mono, monospace',
                color: 'rgba(245,241,232,0.55)', letterSpacing: 0.4, lineHeight: 1.4,
              }}>
                NPL-UMP-2026<br/>ISCO-{selected.isco}<br/>VALID 24M
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Action buttons */}
      <div style={{ position: 'relative', display: 'flex', gap: 8, marginTop: 12 }}>
        <button style={{
          flex: 1, padding: '10px 12px', border: 0,
          background: 'oklch(0.55 0.16 145)', color: '#fff',
          borderRadius: 10, fontWeight: 600, fontSize: 12,
          display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6,
          cursor: 'pointer', fontFamily: 'Inter',
        }}>
          <IconWhatsapp size={14} />
          {t.shareWa}
        </button>
        <button style={{
          padding: '10px 14px', border: '1px solid oklch(0.78 0.13 75 / 0.3)',
          background: 'rgba(245,241,232,0.05)', color: '#F5F1E8',
          borderRadius: 10, fontWeight: 500, fontSize: 12,
          display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6,
          cursor: 'pointer', fontFamily: 'Inter',
        }}>
          <IconDownload size={12} /> PDF
        </button>
      </div>
    </div>
  );
}

Object.assign(window, { DesktopLayout });
