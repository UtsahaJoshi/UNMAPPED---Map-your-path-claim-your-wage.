// Logic Bridge — financial dashboard

function BridgeSection({ t, lang, selected }) {
  const [rate, setRate] = React.useState(BRIDGE.currentRate);
  const [unit, setUnit] = React.useState('month');
  const [unitOpen, setUnitOpen] = React.useState(false);

  // Normalize to monthly for delta math
  const monthly = unit === 'month' ? rate : unit === 'day' ? rate * 26 : rate * 200;
  const delta = Math.max(BRIDGE.marketRate - monthly, 0);
  const growthPct = monthly > 0 ? Math.round((delta / monthly) * 100) : 0;

  const fmt = (n) => n.toLocaleString('en-IN');
  const unitLabels = { month: t.perMonth, day: t.perDay, hour: t.perHour };

  return (
    <section style={{ padding: '4px 20px 24px' }}>
      <SectionHeader num="02" title={t.bridgeTitle} sub={t.bridgeSub} lang={lang} />

      {/* Rate input card */}
      <div style={{
        background: 'rgba(255,255,255,0.7)',
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
        border: '1px solid rgba(10,31,61,0.08)',
        borderRadius: 20, padding: 18, marginBottom: 12,
      }}>
        <div style={{
          fontSize: 11, fontWeight: 600, letterSpacing: 0.6, textTransform: 'uppercase',
          color: 'rgba(10,31,61,0.55)', marginBottom: 10,
          fontFamily: 'JetBrains Mono, monospace',
        }}>
          {t.yourRate}
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{
            fontSize: 13, fontWeight: 500,
            color: 'rgba(10,31,61,0.55)',
            fontFamily: 'JetBrains Mono, monospace',
          }}>
            {t.npr}
          </div>
          <input
            type="number"
            value={rate}
            onChange={(e) => setRate(Number(e.target.value) || 0)}
            style={{
              flex: 1, border: 0, background: 'transparent', outline: 'none',
              fontSize: 28, fontWeight: 600, color: '#0A1F3D',
              fontFamily: 'Inter', minWidth: 0,
              letterSpacing: -0.5,
            }}
          />
          <div style={{ position: 'relative' }}>
            <button onClick={() => setUnitOpen(v => !v)} style={{
              border: '1px solid rgba(10,31,61,0.12)', background: 'rgba(10,31,61,0.04)',
              borderRadius: 10, padding: '8px 12px',
              fontSize: 13, fontWeight: 500, color: '#0A1F3D',
              display: 'flex', alignItems: 'center', gap: 4,
              cursor: 'pointer', fontFamily: 'Inter',
            }}>
              {unitLabels[unit]}
              <IconChevron size={14} />
            </button>
            {unitOpen && (
              <div style={{
                position: 'absolute', top: '100%', right: 0, marginTop: 6,
                background: '#fff', border: '1px solid rgba(10,31,61,0.1)',
                borderRadius: 12, overflow: 'hidden', minWidth: 110, zIndex: 20,
                boxShadow: '0 10px 24px rgba(10,31,61,0.12)',
              }}>
                {['month', 'day', 'hour'].map(u => (
                  <button key={u} onClick={() => { setUnit(u); setUnitOpen(false); }}
                    style={{
                      display: 'block', width: '100%', textAlign: 'left',
                      padding: '10px 14px', border: 0,
                      background: u === unit ? 'rgba(10,31,61,0.05)' : 'transparent',
                      fontSize: 13, color: '#0A1F3D', cursor: 'pointer',
                      fontFamily: 'Inter',
                    }}>
                    {unitLabels[u]}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
        {/* Slider */}
        <input
          type="range" min={5000} max={40000} step={500}
          value={unit === 'month' ? rate : BRIDGE.currentRate}
          onChange={(e) => { setUnit('month'); setRate(Number(e.target.value)); }}
          style={{
            width: '100%', marginTop: 14, accentColor: '#0A1F3D',
          }}
        />
      </div>

      {/* Market rate compare */}
      <div style={{
        background: '#0A1F3D', color: '#F5F1E8',
        borderRadius: 20, padding: 18, marginBottom: 12,
        position: 'relative', overflow: 'hidden',
      }}>
        <div style={{
          position: 'absolute', inset: 0,
          background: 'radial-gradient(ellipse at 90% 0%, rgba(212,175,55,0.18), transparent 60%)',
          pointerEvents: 'none',
        }} />
        <div style={{ position: 'relative' }}>
          <div style={{
            fontSize: 11, fontWeight: 600, letterSpacing: 0.6, textTransform: 'uppercase',
            color: 'rgba(245,241,232,0.6)', marginBottom: 6,
            fontFamily: 'JetBrains Mono, monospace',
          }}>
            {t.marketRate} · ISCO {selected.isco}
          </div>
          <div style={{
            fontSize: 30, fontWeight: 600, letterSpacing: -0.5,
          }}>
            {t.npr} {fmt(BRIDGE.marketRate)}
            <span style={{ fontSize: 14, fontWeight: 400, opacity: 0.6, marginLeft: 6 }}>
              {t.perMonth}
            </span>
          </div>
          {/* Comparison bars */}
          <div style={{ marginTop: 16, display: 'flex', flexDirection: 'column', gap: 8 }}>
            <RateBar label={lang === 'ne' ? 'तपाईं' : 'You'} value={monthly} max={BRIDGE.marketRate} color="rgba(245,241,232,0.4)" textColor="#F5F1E8" fmt={fmt} npr={t.npr} />
            <RateBar label={lang === 'ne' ? 'बजार' : 'Market'} value={BRIDGE.marketRate} max={BRIDGE.marketRate} color="oklch(0.78 0.13 75)" textColor="#F5F1E8" fmt={fmt} npr={t.npr} />
          </div>
        </div>
      </div>

      {/* Delta hero */}
      <div style={{
        background: 'linear-gradient(180deg, oklch(0.97 0.02 95) 0%, oklch(0.93 0.05 80) 100%)',
        border: '1px solid oklch(0.78 0.13 75 / 0.4)',
        borderRadius: 20, padding: 22, marginBottom: 12,
        position: 'relative', overflow: 'hidden',
      }}>
        <div style={{
          fontSize: 11, fontWeight: 600, letterSpacing: 0.6, textTransform: 'uppercase',
          color: 'oklch(0.45 0.08 60)', marginBottom: 8,
          fontFamily: 'JetBrains Mono, monospace',
          display: 'flex', alignItems: 'center', gap: 6,
        }}>
          <IconSparkle size={12} /> {t.delta}
        </div>
        <div style={{
          fontFamily: "'Instrument Serif', serif",
          fontSize: 56, fontWeight: 400, letterSpacing: -2,
          lineHeight: 1, color: '#0A1F3D',
          display: 'flex', alignItems: 'baseline', gap: 6,
        }}>
          <span style={{ fontSize: 28, fontStyle: 'italic' }}>+{t.npr}</span>
          {fmt(delta)}
        </div>
        <div style={{
          marginTop: 14, display: 'flex', alignItems: 'center', gap: 10,
          paddingTop: 14, borderTop: '1px solid oklch(0.78 0.13 75 / 0.3)',
        }}>
          <div style={{
            background: 'oklch(0.55 0.16 145)', color: '#fff',
            padding: '5px 10px', borderRadius: 8,
            fontSize: 12, fontWeight: 600,
            display: 'flex', alignItems: 'center', gap: 4,
            fontFamily: 'JetBrains Mono, monospace',
          }}>
            <IconArrowUp size={12} stroke={2.5} /> {growthPct}%
          </div>
          <div style={{ fontSize: 12, color: 'rgba(10,31,61,0.65)' }}>
            {t.expectedGrowth}
          </div>
        </div>
      </div>

      {/* Confidence */}
      <ConfidenceCard t={t} />
    </section>
  );
}

function RateBar({ label, value, max, color, textColor, fmt, npr }) {
  const pct = max > 0 ? Math.min((value / max) * 100, 100) : 0;
  return (
    <div>
      <div style={{
        display: 'flex', justifyContent: 'space-between',
        fontSize: 11, marginBottom: 4,
        fontFamily: 'JetBrains Mono, monospace',
        color: textColor, opacity: 0.85,
      }}>
        <span>{label}</span>
        <span>{npr} {fmt(value)}</span>
      </div>
      <div style={{ height: 8, borderRadius: 4, background: 'rgba(245,241,232,0.1)', overflow: 'hidden' }}>
        <div style={{
          width: `${pct}%`, height: '100%', background: color,
          borderRadius: 4, transition: 'width .4s ease',
        }} />
      </div>
    </div>
  );
}

function ConfidenceCard({ t }) {
  return (
    <div style={{
      background: 'rgba(255,255,255,0.7)',
      backdropFilter: 'blur(12px)',
      WebkitBackdropFilter: 'blur(12px)',
      border: '1px solid rgba(10,31,61,0.08)',
      borderRadius: 14, padding: '12px 14px',
      display: 'flex', alignItems: 'center', gap: 12,
    }}>
      <div style={{
        width: 36, height: 36, borderRadius: 10,
        background: 'oklch(0.55 0.16 145 / 0.1)', color: 'oklch(0.4 0.16 145)',
        display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
      }}>
        <IconShield size={18} />
      </div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ fontSize: 12, fontWeight: 600, color: '#0A1F3D' }}>
          {t.dataConfidence} <span style={{ fontFamily: 'JetBrains Mono, monospace', color: 'oklch(0.4 0.16 145)' }}>{BRIDGE.confidence}%</span>
        </div>
        <div style={{ fontSize: 10.5, color: 'rgba(10,31,61,0.55)', marginTop: 2,
          fontFamily: 'JetBrains Mono, monospace', letterSpacing: 0.2,
        }}>
          {t.verifiedBy}: {BRIDGE.source} · n={BRIDGE.sampleSize}
        </div>
      </div>
      <IconLock size={14} style={{ color: 'rgba(10,31,61,0.4)' }} />
    </div>
  );
}

function SectionHeader({ num, title, sub, lang }) {
  return (
    <div style={{ marginBottom: 14 }}>
      <div style={{ display: 'flex', alignItems: 'baseline', gap: 8, marginBottom: 4 }}>
        <span style={{
          fontFamily: 'JetBrains Mono, monospace',
          fontSize: 10, fontWeight: 600, letterSpacing: 1,
          color: 'rgba(10,31,61,0.45)',
        }}>
          §{num}
        </span>
        <h2 style={{
          margin: 0, fontFamily: "'Instrument Serif', serif",
          fontSize: 24, fontWeight: 400, color: '#0A1F3D',
          letterSpacing: -0.3,
        }}>{title}</h2>
      </div>
      <div style={{
        fontSize: 12, color: 'rgba(10,31,61,0.55)',
        fontFamily: lang === 'ne' ? "'Noto Sans Devanagari', sans-serif" : 'Inter',
        lineHeight: 1.4,
      }}>{sub}</div>
    </div>
  );
}

Object.assign(window, { BridgeSection, SectionHeader });
