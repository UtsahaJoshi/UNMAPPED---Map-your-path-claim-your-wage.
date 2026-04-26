// Skill Gap checklist

function SkillsSection({ t, lang }) {
  const [items, setItems] = React.useState(SKILLS);
  const [speaking, setSpeaking] = React.useState(null);

  const completed = items.filter(i => i.done).length;
  const pct = Math.round((completed / items.length) * 100);

  const toggle = (id) => setItems(items.map(i => i.id === id ? { ...i, done: !i.done } : i));
  const speak = (id, text) => {
    setSpeaking(id);
    if ('speechSynthesis' in window) {
      try {
        speechSynthesis.cancel();
        const u = new SpeechSynthesisUtterance(text);
        u.lang = lang === 'ne' ? 'ne-NP' : 'en-US';
        u.rate = 0.95;
        u.onend = () => setSpeaking(null);
        speechSynthesis.speak(u);
      } catch (e) { setTimeout(() => setSpeaking(null), 1200); }
    } else {
      setTimeout(() => setSpeaking(null), 1200);
    }
  };

  return (
    <section style={{ padding: '4px 20px 24px' }}>
      <SectionHeader num="03" title={t.skillsTitle} sub={t.skillsSub} lang={lang} />

      {/* Progress */}
      <div style={{
        background: 'rgba(255,255,255,0.7)',
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
        border: '1px solid rgba(10,31,61,0.08)',
        borderRadius: 16, padding: 14, marginBottom: 12,
      }}>
        <div style={{
          display: 'flex', justifyContent: 'space-between', alignItems: 'baseline',
          marginBottom: 8,
        }}>
          <span style={{
            fontSize: 11, fontWeight: 600, letterSpacing: 0.6, textTransform: 'uppercase',
            color: 'rgba(10,31,61,0.55)', fontFamily: 'JetBrains Mono, monospace',
          }}>{t.progress}</span>
          <span style={{
            fontSize: 13, fontWeight: 600, color: '#0A1F3D',
            fontFamily: 'JetBrains Mono, monospace',
          }}>{completed}/{items.length} · {pct}%</span>
        </div>
        <div style={{
          height: 8, borderRadius: 4, background: 'rgba(10,31,61,0.08)',
          overflow: 'hidden',
        }}>
          <div style={{
            width: `${pct}%`, height: '100%',
            background: 'linear-gradient(90deg, oklch(0.55 0.16 145), oklch(0.65 0.18 140))',
            borderRadius: 4,
            transition: 'width .35s ease',
          }} />
        </div>
        {/* Tick marks */}
        <div style={{
          display: 'flex', justifyContent: 'space-between',
          marginTop: 4,
        }}>
          {items.map((it, i) => (
            <div key={it.id} style={{
              width: 4, height: 4, borderRadius: 2,
              background: it.done ? 'oklch(0.55 0.16 145)' : 'rgba(10,31,61,0.15)',
            }} />
          ))}
        </div>
      </div>

      {/* Checklist */}
      <div style={{
        background: '#fff',
        border: '1px solid rgba(10,31,61,0.08)',
        borderRadius: 18, overflow: 'hidden',
      }}>
        {items.map((it, i) => (
          <SkillRow
            key={it.id}
            item={it}
            isLast={i === items.length - 1}
            lang={lang}
            speaking={speaking === it.id}
            onToggle={() => toggle(it.id)}
            onSpeak={() => speak(it.id, lang === 'ne' ? it.ne : it.en)}
          />
        ))}
      </div>
    </section>
  );
}

function SkillRow({ item, isLast, lang, speaking, onToggle, onSpeak }) {
  return (
    <div style={{
      display: 'flex', alignItems: 'flex-start', gap: 12,
      padding: '14px 14px',
      borderBottom: isLast ? 'none' : '1px solid rgba(10,31,61,0.06)',
    }}>
      <button onClick={onToggle} aria-label="toggle" style={{
        flexShrink: 0, marginTop: 1,
        width: 24, height: 24, borderRadius: 7,
        border: item.done ? 0 : '1.5px solid rgba(10,31,61,0.25)',
        background: item.done ? '#0A1F3D' : 'transparent',
        color: '#F5F1E8',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        cursor: 'pointer', transition: 'all .15s',
      }}>
        {item.done && <IconCheck size={14} stroke={2.5} />}
      </button>
      <div style={{
        flex: 1, minWidth: 0,
        fontSize: 14, lineHeight: 1.4,
        color: item.done ? 'rgba(10,31,61,0.4)' : '#0A1F3D',
        textDecoration: item.done ? 'line-through' : 'none',
        fontFamily: lang === 'ne' ? "'Noto Sans Devanagari', sans-serif" : 'Inter',
      }}>
        {lang === 'ne' ? item.ne : item.en}
      </div>
      <button onClick={onSpeak} aria-label="speak" style={{
        flexShrink: 0,
        width: 30, height: 30, borderRadius: 9,
        border: 0,
        background: speaking ? '#0A1F3D' : 'rgba(10,31,61,0.05)',
        color: speaking ? '#F5F1E8' : 'rgba(10,31,61,0.5)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        cursor: 'pointer', transition: 'all .15s',
      }}>
        <IconSpeaker size={14} />
      </button>
    </div>
  );
}

Object.assign(window, { SkillsSection });
