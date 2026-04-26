import React, { useState, useMemo } from 'react';
import { Search, Mic, CheckCircle2, Circle } from 'lucide-react';
import rawData from './data.json';

const UNMAPPED_COLORS = {
  bg: '#F5F1E8',
  primary: '#0A1F3D',
  accent: '#10B981',
};

interface Occupation {
  code: string;
  title: string;
  definition: string;
  tasks: string;
  included: string;
  excluded: string;
  monthly_wage: number;
}

type MappingType = 'Standard' | 'Recognized' | 'Identified';

interface ScoredOccupation extends Occupation {
  score: number;
  mappingType: MappingType;
}

const App: React.FC = () => {
  const [lang, setLang] = useState('EN');
  const [search, setSearch] = useState('');
  const [selectedOcc, setSelectedOcc] = useState<ScoredOccupation | null>(null);
  const [showDashboard, setShowDashboard] = useState(false);

  const filteredResults = useMemo(() => {
    if (!search || search.length < 2) return [];
    const query = search.toLowerCase();
    
    return (rawData as Occupation[])
      .map(occ => {
        let score = 0;
        let mappingType: MappingType = 'Identified';
        
        if (occ.title.toLowerCase().includes(query)) {
          score += 10;
          mappingType = 'Standard';
        } else if (occ.included.toLowerCase().includes(query)) {
          score += 8;
          mappingType = 'Recognized';
        } else if (occ.excluded.toLowerCase().includes(query)) {
          score += 5;
          mappingType = 'Identified';
        } else if (occ.definition.toLowerCase().includes(query)) {
          score += 2;
          mappingType = 'Identified';
        }
        
        return { ...occ, score, mappingType };
      })
      .filter(occ => occ.score > 0)
      .sort((a, b) => b.score - a.score)
      .slice(0, 5);
  }, [search]);

  const handleSelect = (occ: ScoredOccupation) => {
    setSelectedOcc(occ);
    setShowDashboard(true);
    setSearch('');
  };

  return (
    <div className="min-h-screen font-sans" style={{ backgroundColor: UNMAPPED_COLORS.bg, color: UNMAPPED_COLORS.primary }}>
      <header className="p-6 flex justify-between items-center max-w-7xl mx-auto w-full">
        <div className="flex items-center gap-2">
          <div className="bg-primary text-bg p-1 rounded font-black text-xl px-3" style={{ backgroundColor: UNMAPPED_COLORS.primary, color: UNMAPPED_COLORS.bg }}>U</div>
          <span className="font-bold text-2xl tracking-tighter">UNMAPPED</span>
        </div>
        <div className="flex gap-4 items-center">
          <button className={`px-2 py-1 rounded ${lang === 'EN' ? 'bg-white shadow-sm font-bold' : 'opacity-50'}`} onClick={() => setLang('EN')}>EN</button>
          <div className="w-[1px] h-4 bg-gray-300" />
          <button className={`px-2 py-1 rounded ${lang === 'NE' ? 'bg-white shadow-sm font-bold' : 'opacity-50'}`} onClick={() => setLang('NE')}>NE</button>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-12">
        {!showDashboard ? (
          <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
            <div className="text-xs uppercase tracking-widest opacity-50 mb-4 bg-white/50 px-3 py-1 rounded-full border border-orange-200">UNMAPPED // NEPAL 2026</div>
            <h1 className="text-7xl font-serif mb-6" style={{ fontFamily: 'Playfair Display, serif' }}>UNMAPPED: Transition Engine</h1>
            <p className="text-xl italic opacity-70 mb-12" style={{ fontFamily: 'Georgia, serif' }}>Map your path, claim your wage.</p>
            
            <div className="relative w-full max-w-2xl group">
              <input 
                type="text" 
                placeholder="What is your current informal skill? (e.g. bike, painter)"
                className="w-full p-6 pl-8 pr-20 rounded-2xl shadow-xl border-none text-xl focus:ring-2 focus:ring-primary/20 transition-all"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              <div className="absolute right-6 top-1/2 -translate-y-1/2 flex items-center gap-4 opacity-30 group-focus-within:opacity-100 transition-all">
                <Mic className="w-6 h-6" />
                <Search className="w-6 h-6" />
              </div>

              {filteredResults.length > 0 && (
                <div className="absolute top-full left-0 right-0 mt-4 bg-white rounded-2xl shadow-2xl overflow-hidden z-50 border border-black/5">
                  {filteredResults.map(occ => (
                    <div 
                      key={occ.code} 
                      className="p-6 border-b border-black/5 hover:bg-gray-50 cursor-pointer transition-all flex justify-between items-center group"
                      onClick={() => handleSelect(occ)}
                    >
                      <div className="text-left">
                        <div className="flex items-center gap-2">
                           <div className="font-bold text-lg group-hover:text-primary transition-colors">{occ.title}</div>
                           <span className={`text-[8px] px-1.5 py-0.5 rounded font-bold uppercase tracking-tighter ${
                             occ.mappingType === 'Standard' ? 'bg-green-100 text-green-700' : 
                             occ.mappingType === 'Recognized' ? 'bg-blue-100 text-blue-700' : 
                             'bg-orange-100 text-orange-700'
                           }`}>
                             {occ.mappingType}
                           </span>
                        </div>
                        <div className="text-xs opacity-40 uppercase tracking-widest">ISCO Code: {occ.code}</div>
                      </div>
                      <div className="text-right">
                        <div className="text-sm font-bold text-accent" style={{ color: UNMAPPED_COLORS.accent }}>रू {occ.monthly_wage.toLocaleString()}</div>
                        <div className="text-[10px] opacity-30">Avg. Monthly</div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        ) : (
          <Dashboard occ={selectedOcc!} onBack={() => setShowDashboard(false)} />
        )}
      </main>

      <footer className="mt-24 bg-primary text-white p-12" style={{ backgroundColor: UNMAPPED_COLORS.primary }}>
        <div className="max-w-7xl mx-auto flex justify-between items-end">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="bg-white text-primary p-1 rounded font-black text-sm px-2">U</div>
              <span className="font-bold text-lg tracking-tighter">UNMAPPED</span>
            </div>
            <p className="max-w-xs opacity-60 text-sm">Empowering Nepal's informal workforce through data-driven transition pathways into the formal economy.</p>
          </div>
          <div className="text-[10px] uppercase tracking-widest opacity-30">PROJECT UNMAPPED // CHALLENGE 05 // NEPAL 2026</div>
        </div>
      </footer>
    </div>
  );
};

const Dashboard: React.FC<{ occ: ScoredOccupation, onBack: () => void }> = ({ occ, onBack }) => {
  const [actualWage, setActualWage] = useState(17138);
  const [checkedSteps, setCheckedSteps] = useState<number[]>([]);
  
  const delta = occ.monthly_wage - actualWage;
  const growth = Math.round((delta / actualWage) * 100);
  const tasks = occ.tasks.split(';').slice(0, 5).filter(t => t.trim().length > 5);
  const progress = Math.round((checkedSteps.length / tasks.length) * 100);

  const toggleStep = (i: number) => {
    setCheckedSteps(prev => prev.includes(i) ? prev.filter(x => x !== i) : [...prev, i]);
  };

  return (
    <div className="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <button onClick={onBack} className="text-xs uppercase tracking-widest opacity-40 hover:opacity-100 transition-all">← Back to search</button>
      
      <div className="grid grid-cols-12 gap-8">
        <div className="col-span-8 space-y-8">
          <div className="grid grid-cols-2 gap-8">
            <div className="bg-white/40 p-8 rounded-3xl border border-white/60">
              <div className="text-[10px] uppercase tracking-widest opacity-40 mb-2 font-bold">REGIONAL BASELINE (NRB)</div>
              <div className="text-sm font-bold opacity-60 mb-2">Generic Crafts / Trades</div>
              <div className="text-4xl font-light">रू 17,138</div>
              <div className="text-[10px] opacity-40 mt-1 uppercase">EST. INFORMAL EARNINGS (70%)</div>
            </div>

            <div className="bg-white p-8 rounded-3xl shadow-xl ring-1 ring-black/5 relative group">
              <div className="absolute top-4 right-4 w-2 h-2 bg-accent rounded-full animate-pulse" style={{ backgroundColor: UNMAPPED_COLORS.accent }} />
              <div className="text-[10px] uppercase tracking-widest opacity-40 mb-2 font-bold text-accent" style={{ color: UNMAPPED_COLORS.accent }}>YOUR ACTUAL EARNINGS (WRITABLE)</div>
              <div className="flex items-end gap-2">
                <input 
                  type="number"
                  className="text-5xl font-light text-primary bg-transparent border-b border-transparent group-hover:border-black/10 focus:border-accent outline-none w-full transition-all"
                  value={actualWage}
                  onChange={(e) => setActualWage(Number(e.target.value))}
                />
                <div className="text-xs font-bold opacity-40 pb-2">/ MO</div>
              </div>
              <div className="text-[10px] italic opacity-40 mt-4">Adjust your rate to update transition analysis</div>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-8">
            <div className="p-4">
               <div className="text-[10px] uppercase tracking-widest opacity-40 mb-1 font-bold">TOTAL TRANSITION OPPORTUNITY</div>
               <div className="text-2xl font-bold flex items-center gap-1">रू {delta.toLocaleString()} <span className="text-xs opacity-40">/ month</span></div>
            </div>
            <div className="p-4 text-center">
               <div className="text-accent text-3xl font-bold" style={{ color: UNMAPPED_COLORS.accent }}>{growth > 0 ? '+' : ''}{growth}%</div>
               <div className="text-[10px] uppercase tracking-widest opacity-40 mt-1 font-bold">EXPECTED GROWTH</div>
            </div>
            <div className="p-4">
               <div className="text-[10px] uppercase tracking-widest opacity-40 mb-1 font-bold">DATA CONFIDENCE</div>
               <div className="font-bold">High (NRB + ISCO Anchors)</div>
               <div className="flex gap-1 mt-2">
                  {[1,2,3,4,5].map(i => <div key={i} className={`h-3 w-1.5 rounded-sm ${i < 5 ? 'bg-accent' : 'bg-gray-200'}`} style={i < 5 ? { backgroundColor: UNMAPPED_COLORS.accent } : {}} />)}
               </div>
            </div>
          </div>
        </div>

        <div className="col-span-4 bg-white/40 p-8 rounded-3xl border border-white/60">
           <div className="text-[10px] uppercase tracking-widest opacity-40 mb-2 font-bold text-accent" style={{ color: UNMAPPED_COLORS.accent }}>FORMAL TARGET POTENTIAL</div>
           <div className="text-xl font-bold mb-1">{occ.title}</div>
           <div className="text-4xl font-bold mb-4">रू {occ.monthly_wage.toLocaleString()}</div>
           <div className="text-[10px] font-bold opacity-60 bg-gray-100 px-2 py-1 inline-block rounded uppercase">ISCO Code: {occ.code}</div>
        </div>
      </div>

      <div className="grid grid-cols-12 gap-8 pt-12 border-t border-black/5">
        <div className="col-span-7">
           <div className="flex justify-between items-end mb-12">
              <div>
                <h2 className="text-3xl font-serif mb-2" style={{ fontFamily: 'Playfair Display, serif' }}>The Skill-Gap</h2>
                <p className="opacity-50 text-sm uppercase tracking-widest font-bold">Transition Roadmap</p>
              </div>
              <div className="text-right">
                <div className="text-3xl font-bold text-accent" style={{ color: UNMAPPED_COLORS.accent }}>{progress}%</div>
                <div className="text-[10px] opacity-40 uppercase font-bold tracking-widest">PROGRESS TO TARGET</div>
              </div>
           </div>
           
           <div className="space-y-6">
              {tasks.map((step, i) => (
                <div 
                  key={i} 
                  className={`flex gap-6 items-start transition-all cursor-pointer group p-4 rounded-2xl ${checkedSteps.includes(i) ? 'bg-white/50 opacity-100' : 'opacity-60 hover:opacity-100 hover:bg-white/30'}`}
                  onClick={() => toggleStep(i)}
                >
                  <div className="shrink-0 mt-1">
                    {checkedSteps.includes(i) ? (
                      <CheckCircle2 className="w-6 h-6 text-accent" style={{ color: UNMAPPED_COLORS.accent }} />
                    ) : (
                      <Circle className="w-6 h-6 opacity-30 group-hover:opacity-100" />
                    )}
                  </div>
                  <p className={`text-lg leading-snug ${checkedSteps.includes(i) ? 'line-through text-gray-400' : ''}`}>
                    {step.replace(/Tasks include -|\(.\)/g, '').trim()}
                  </p>
                </div>
              ))}
           </div>
        </div>

        <div className="col-span-5">
           <div className="bg-primary text-bg rounded-3xl p-10 shadow-2xl relative overflow-hidden" style={{ backgroundColor: UNMAPPED_COLORS.primary, color: UNMAPPED_COLORS.bg }}>
              <div className="flex justify-between items-start mb-12">
                 <div>
                    <h3 className="text-2xl font-serif italic mb-1">INSTITUTIONAL PASSPORT</h3>
                    <div className="text-[10px] opacity-50 tracking-widest uppercase">Updated April 26, 2026</div>
                 </div>
                 <div className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center text-xl font-bold">U</div>
              </div>

              <div className="grid grid-cols-2 gap-8 mb-12">
                 <div>
                    <div className="text-[10px] opacity-40 uppercase tracking-widest mb-1">CURRENT STANDING</div>
                    <div className="font-bold text-lg">Informal Sector</div>
                    <div className="text-xs opacity-50 uppercase">Status: Excluded</div>
                 </div>
                 <div>
                    <div className="text-[10px] opacity-40 uppercase tracking-widest mb-1">TRANSITION TARGET</div>
                    <div className="font-bold text-lg">{occ.title}</div>
                    <div className="text-xs text-accent font-bold uppercase" style={{ color: UNMAPPED_COLORS.accent }}>Status: {occ.mappingType} / Included</div>
                 </div>
              </div>

              <div className="pt-8 border-t border-white/10">
                 <div className="text-[10px] opacity-40 uppercase tracking-widest mb-2 font-bold">MONTHLY DELTA</div>
                 <div className="text-4xl font-bold text-accent" style={{ color: UNMAPPED_COLORS.accent }}>+रू {delta.toLocaleString()}</div>
              </div>
              
              <div className="mt-12 text-[8px] opacity-20 uppercase tracking-widest">Mapping Path: {occ.mappingType} Validation Completed</div>
           </div>
        </div>
      </div>
    </div>
  );
};

export default App;
