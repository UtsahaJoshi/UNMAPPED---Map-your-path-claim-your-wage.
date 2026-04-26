// Main app shell — mobile + desktop layouts

const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "language": "en",
  "layout": "desktop"
}/*EDITMODE-END*/;

function App() {
  const [tweaks, setTweak] = useTweaks(TWEAK_DEFAULTS);
  const [selected, setSelected] = React.useState(SELECTED);
  const lang = tweaks.language || 'en';
  const layout = tweaks.layout || 'desktop';
  const t = STRINGS[lang];

  // Auto scale-to-fit
  const [scale, setScale] = React.useState(1);
  React.useEffect(() => {
    const compute = () => {
      const W = layout === 'desktop' ? 1280 : 402;
      const H = layout === 'desktop' ? 820 : 874;
      const padX = 40, padY = 60;
      const sw = (window.innerWidth - padX) / W;
      const sh = (window.innerHeight - padY) / H;
      setScale(Math.min(1, sw, sh));
    };
    compute();
    window.addEventListener('resize', compute);
    return () => window.removeEventListener('resize', compute);
  }, [layout]);

  return (
    <div style={{
      minHeight: '100vh', display: 'flex',
      alignItems: 'center', justifyContent: 'center',
      padding: 20,
    }}>
      <div style={{
        transform: `scale(${scale})`, transformOrigin: 'center',
        width: layout === 'desktop' ? 1280 : 402,
        height: layout === 'desktop' ? 820 : 874,
      }}>
        {layout === 'desktop' ? (
          <DesktopLayout
            t={t} lang={lang}
            selected={selected} setSelected={setSelected}
            setTweak={setTweak}
          />
        ) : (
          <MobileLayout
            t={t} lang={lang}
            selected={selected} setSelected={setSelected}
            setTweak={setTweak}
          />
        )}
      </div>

      <TweaksPanel title="Tweaks">
        <TweakSection label="Layout" />
        <TweakRadio
          label="Form factor"
          value={layout}
          onChange={(v) => setTweak('layout', v)}
          options={[
            { value: 'mobile', label: 'Mobile' },
            { value: 'desktop', label: 'Desktop' },
          ]}
        />
        <TweakSection label="Display" />
        <TweakRadio
          label="Language"
          value={lang}
          onChange={(v) => setTweak('language', v)}
          options={[
            { value: 'en', label: 'English' },
            { value: 'ne', label: 'नेपाली' },
          ]}
        />
        <TweakSection label="Demo" />
        <TweakButton label="Clear selection" onClick={() => setSelected(null)} />
        <TweakButton label="Reset to bike rider" secondary onClick={() => setSelected(SELECTED)} />
      </TweaksPanel>
    </div>
  );
}

function MobileLayout({ t, lang, selected, setSelected, setTweak }) {
  return (
    <IOSDevice width={402} height={874}>
      <div style={{
        paddingTop: 54,
        background: '#F5F1E8',
        backgroundImage:
          'radial-gradient(circle at 0% 0%, oklch(0.78 0.13 75 / 0.07) 0%, transparent 35%), radial-gradient(circle at 100% 100%, oklch(0.5 0.04 250 / 0.05) 0%, transparent 40%)',
        minHeight: '100%',
      }}>
        <Header t={t} lang={lang} onLangToggle={() => setTweak('language', lang === 'en' ? 'ne' : 'en')} />
        <SearchSection t={t} lang={lang} onSelect={setSelected} selected={selected} />
        {selected && (
          <>
            <Divider />
            <BridgeSection t={t} lang={lang} selected={selected} />
            <Divider />
            <SkillsSection t={t} lang={lang} />
            <Divider />
            <PassportSection t={t} lang={lang} selected={selected} />
          </>
        )}
        <div style={{ height: 60 }} />
      </div>
    </IOSDevice>
  );
}

function Header({ t, lang, onLangToggle }) {
  return (
    <div style={{
      padding: '10px 20px 4px',
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
        <div style={{
          width: 24, height: 24, borderRadius: 6,
          background: '#0A1F3D', color: 'oklch(0.78 0.13 75)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontFamily: "'Instrument Serif', serif", fontSize: 16,
        }}>U</div>
        <div>
          <div style={{
            fontFamily: 'JetBrains Mono, monospace',
            fontSize: 11, fontWeight: 700, letterSpacing: 1,
            color: '#0A1F3D',
          }}>
            {t.appName}
          </div>
          <div style={{
            fontSize: 9, letterSpacing: 0.5,
            color: 'rgba(10,31,61,0.5)',
            fontFamily: lang === 'ne' ? "'Noto Sans Devanagari', sans-serif" : 'JetBrains Mono, monospace',
            textTransform: lang === 'ne' ? 'none' : 'uppercase',
          }}>
            {t.tagline}
          </div>
        </div>
      </div>
      <button onClick={onLangToggle} style={{
        border: '1px solid rgba(10,31,61,0.15)',
        background: 'rgba(255,255,255,0.6)',
        backdropFilter: 'blur(10px)',
        borderRadius: 10, padding: '6px 10px',
        fontSize: 11, fontWeight: 600,
        color: '#0A1F3D', cursor: 'pointer',
        display: 'flex', alignItems: 'center', gap: 6,
        fontFamily: 'JetBrains Mono, monospace',
        letterSpacing: 0.5,
      }}>
        <span style={{ opacity: lang === 'en' ? 1 : 0.4 }}>EN</span>
        <span style={{ opacity: 0.3 }}>/</span>
        <span style={{ opacity: lang === 'ne' ? 1 : 0.4, fontFamily: "'Noto Sans Devanagari', sans-serif" }}>ने</span>
      </button>
    </div>
  );
}

function Divider() {
  return (
    <div style={{
      margin: '8px 20px', height: 1,
      background: 'linear-gradient(90deg, transparent, rgba(10,31,61,0.12), transparent)',
    }} />
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);
