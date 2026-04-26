// Institutional Passport card

function PassportSection({ t, lang, selected }) {
  const docNo = 'NPL-UMP-2026-' + selected.isco + '-0114';
  return (
    <section style={{ padding: '4px 20px 32px' }}>
      <SectionHeader num="04" title={t.passportTitle} sub={t.passportSub} lang={lang} />

      {/* Passport card */}
      <div style={{
        position: 'relative',
        background: 'linear-gradient(165deg, #0A1F3D 0%, #112D54 50%, #0A1F3D 100%)',
        color: '#F5F1E8',
        borderRadius: 22, padding: 22,
        boxShadow: '0 24px 48px -12px rgba(10,31,61,0.4), 0 1px 0 rgba(255,255,255,0.08) inset',
        overflow: 'hidden',
      }}>
        {/* Foil texture overlay */}
        <div style={{
          position: 'absolute', inset: 0,
          background: 'radial-gradient(ellipse at 100% 0%, oklch(0.78 0.13 75 / 0.18), transparent 50%), radial-gradient(ellipse at 0% 100%, oklch(0.78 0.13 75 / 0.1), transparent 50%)',
          pointerEvents: 'none',
        }} />
        {/* Microprint border line */}
        <div style={{
          position: 'absolute', inset: 10, borderRadius: 14,
          border: '1px solid oklch(0.78 0.13 75 / 0.3)',
          pointerEvents: 'none',
        }} />
        {/* Subtle guilloché */}
        <div style={{
          position: 'absolute', inset: 0,
          backgroundImage: 'repeating-linear-gradient(45deg, transparent 0 8px, oklch(0.78 0.13 75 / 0.04) 8px 9px)',
          pointerEvents: 'none',
        }} />

        <div style={{ position: 'relative' }}>
          {/* Header */}
          <div style={{
            display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start',
            paddingBottom: 14, borderBottom: '1px solid oklch(0.78 0.13 75 / 0.3)',
          }}>
            <div>
              <div style={{
                fontSize: 9, fontWeight: 700, letterSpacing: 1.5,
                color: 'oklch(0.78 0.13 75)',
                fontFamily: 'JetBrains Mono, monospace',
              }}>
                ◆ TRANSITION PASSPORT
              </div>
              <div style={{
                fontFamily: "'Instrument Serif', serif", fontStyle: 'italic',
                fontSize: 22, marginTop: 4, letterSpacing: -0.3,
              }}>
                Federal Democratic<br/>Republic of Nepal
              </div>
            </div>
            <div style={{
              width: 44, height: 44, borderRadius: 22,
              border: '1.5px solid oklch(0.78 0.13 75)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontFamily: "'Instrument Serif', serif", fontSize: 22,
              color: 'oklch(0.78 0.13 75)',
            }}>
              U
            </div>
          </div>

          {/* Standing transition */}
          <div style={{ marginTop: 18 }}>
            <PassportRow label={t.currentStanding} value={t.informal} status="bad" lang={lang} />
            <div style={{
              display: 'flex', justifyContent: 'center', margin: '6px 0',
              color: 'oklch(0.78 0.13 75)',
            }}>
              <IconRoute size={20} />
            </div>
            <PassportRow label={t.transitionTarget} value={t.formal} status="good" lang={lang} sub={'ISCO ' + selected.isco + ' · ' + (lang === 'ne' ? selected.formalNe : selected.formal)} />
          </div>

          {/* Wage uplift */}
          <div style={{
            marginTop: 18, padding: 14,
            background: 'rgba(245,241,232,0.05)',
            border: '1px solid oklch(0.78 0.13 75 / 0.3)',
            borderRadius: 12,
            display: 'flex', alignItems: 'center', gap: 14,
          }}>
            <div style={{ flex: 1 }}>
              <div style={{
                fontSize: 9, fontWeight: 700, letterSpacing: 1.2,
                color: 'oklch(0.78 0.13 75)',
                fontFamily: 'JetBrains Mono, monospace',
              }}>
                MONTHLY WAGE UPLIFT
              </div>
              <div style={{
                fontFamily: "'Instrument Serif', serif",
                fontSize: 34, fontStyle: 'italic',
                marginTop: 2, letterSpacing: -0.5,
                color: 'oklch(0.78 0.13 75)',
              }}>
                +{t.npr} 14,500
              </div>
            </div>
            {/* QR placeholder */}
            <QRPlaceholder />
          </div>

          {/* Footer */}
          <div style={{
            marginTop: 16, paddingTop: 12,
            borderTop: '1px solid oklch(0.78 0.13 75 / 0.3)',
            display: 'flex', justifyContent: 'space-between',
            fontFamily: 'JetBrains Mono, monospace',
            fontSize: 9, letterSpacing: 0.5,
            color: 'rgba(245,241,232,0.55)',
          }}>
            <div>
              <div style={{ opacity: 0.7 }}>{t.documentNo}</div>
              <div style={{ color: '#F5F1E8', marginTop: 2 }}>{docNo}</div>
            </div>
            <div style={{ textAlign: 'right' }}>
              <div style={{ opacity: 0.7 }}>ISSUED 2026.04.26</div>
              <div style={{ color: '#F5F1E8', marginTop: 2 }}>VALID 24 MONTHS</div>
            </div>
          </div>
          <div style={{
            marginTop: 10,
            fontSize: 9, letterSpacing: 0.4,
            color: 'rgba(245,241,232,0.4)',
            fontFamily: 'JetBrains Mono, monospace',
            textAlign: 'center',
          }}>
            ◆ {t.issuedBy} ◆
          </div>
          <div style={{
            marginTop: 10,
            fontSize: 6, letterSpacing: 0.5,
            color: 'rgba(245,241,232,0.18)',
            fontFamily: 'JetBrains Mono, monospace',
            textAlign: 'center',
            wordBreak: 'break-all',
            lineHeight: 1.2,
          }}>
            UNMAPPEDUNMAPPEDUNMAPPEDUNMAPPEDUNMAPPEDUNMAPPEDUNMAPPED
          </div>
        </div>
      </div>

      {/* Action buttons */}
      <div style={{ display: 'flex', gap: 10, marginTop: 14 }}>
        <button style={{
          flex: 1, padding: '14px 12px', border: 0,
          background: 'oklch(0.55 0.16 145)', color: '#fff',
          borderRadius: 14, fontWeight: 600, fontSize: 14,
          display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
          cursor: 'pointer', fontFamily: 'Inter',
          boxShadow: '0 6px 18px oklch(0.55 0.16 145 / 0.35)',
        }}>
          <IconWhatsapp size={16} />
          {t.shareWa}
        </button>
        <button style={{
          padding: '14px 16px',
          border: '1px solid rgba(10,31,61,0.15)', background: 'rgba(255,255,255,0.7)',
          color: '#0A1F3D',
          borderRadius: 14, fontWeight: 500, fontSize: 14,
          display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6,
          cursor: 'pointer', fontFamily: 'Inter',
        }}>
          <IconDownload size={14} />
          PDF
        </button>
      </div>
    </section>
  );
}

function PassportRow({ label, value, status, lang, sub }) {
  const dotColor = status === 'good' ? 'oklch(0.7 0.18 145)' : 'oklch(0.65 0.16 30)';
  return (
    <div style={{
      display: 'flex', alignItems: 'center', gap: 12,
      padding: '10px 0',
    }}>
      <div style={{
        width: 8, height: 8, borderRadius: 4, background: dotColor,
        boxShadow: `0 0 12px ${dotColor}`, flexShrink: 0,
      }} />
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{
          fontSize: 9, fontWeight: 700, letterSpacing: 1,
          color: 'rgba(245,241,232,0.55)',
          fontFamily: 'JetBrains Mono, monospace',
        }}>
          {label.toUpperCase()}
        </div>
        <div style={{
          fontSize: 16, fontWeight: 500, marginTop: 2,
          fontFamily: lang === 'ne' ? "'Noto Sans Devanagari', sans-serif" : 'Inter',
        }}>
          {value}
        </div>
        {sub && (
          <div style={{
            fontSize: 10.5, marginTop: 2, opacity: 0.6,
            fontFamily: 'JetBrains Mono, monospace',
          }}>{sub}</div>
        )}
      </div>
    </div>
  );
}

function QRPlaceholder() {
  // Deterministic pseudo-QR pattern
  const cells = React.useMemo(() => {
    const seed = 7;
    const arr = [];
    for (let i = 0; i < 169; i++) {
      arr.push(((i * seed * 13 + i * i) % 7) > 3 ? 1 : 0);
    }
    // Force corners (finder patterns)
    [0, 12, 156].forEach(start => {
      // No-op visual; we'll overlay finder squares.
    });
    return arr;
  }, []);
  return (
    <div style={{
      width: 64, height: 64, padding: 5,
      background: '#F5F1E8', borderRadius: 8,
      position: 'relative', flexShrink: 0,
    }}>
      <div style={{
        display: 'grid', gridTemplateColumns: 'repeat(13, 1fr)', gap: 0,
        width: '100%', height: '100%',
      }}>
        {cells.map((c, i) => (
          <div key={i} style={{
            background: c ? '#0A1F3D' : 'transparent',
            aspectRatio: '1',
          }} />
        ))}
      </div>
      {/* Finder patterns */}
      {[[3, 3], [3, 41], [41, 3]].map(([t, l], i) => (
        <div key={i} style={{
          position: 'absolute', top: t, left: l,
          width: 16, height: 16,
          background: '#F5F1E8',
          border: '3px solid #0A1F3D',
          borderRadius: 1,
        }}>
          <div style={{
            position: 'absolute', inset: 3,
            background: '#0A1F3D',
          }} />
        </div>
      ))}
    </div>
  );
}

Object.assign(window, { PassportSection });
