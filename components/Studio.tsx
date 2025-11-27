import React, { useState, useEffect, useRef } from 'react';
import { 
  Monitor, Smartphone, Share2, DollarSign, Repeat, Save, Zap, 
  Settings, Layers, Box, Code, Play, Maximize2, Palette, 
  MousePointer2, ArrowLeft, Download, Rocket, Gamepad2
} from 'lucide-react';
import { Game, Template } from '../types';
import { generateGameCode, generateGameMetadata } from '../services/geminiService';

interface StudioProps {
  initialPrompt?: string;
  onSaveGame: (game: Game) => void;
  onExit: () => void;
}

const TEMPLATES: Template[] = [
  { id: 't1', name: 'Infinite Runner', description: 'Side-scrolling obstacle dodge', icon: '🏃', category: 'Action', basePrompt: 'Create an infinite runner game where a character jumps over obstacles in a cyberpunk city.' },
  { id: 't2', name: 'Space Shooter', description: 'Classic arcade vertical shooter', icon: '🚀', category: 'Arcade', basePrompt: 'Create a vertical space shooter game with waves of enemies and powerups.' },
  { id: 't3', name: 'Physics Puzzle', description: 'Stacking or physics-based challenges', icon: '🧱', category: 'Puzzle', basePrompt: 'Create a physics puzzle game where you must stack shapes without them falling.' },
  { id: 't4', name: 'Dungeon Crawler', description: 'Top-down exploration', icon: '🗝️', category: 'Action', basePrompt: 'Create a top-down dungeon crawler with enemies and loot.' },
];

const Studio: React.FC<StudioProps> = ({ initialPrompt, onSaveGame, onExit }) => {
  // State
  const [activeTab, setActiveTab] = useState<'create' | 'design' | 'monetize'>('create');
  const [selectedTemplate, setSelectedTemplate] = useState<Template | null>(null);
  const [prompt, setPrompt] = useState(initialPrompt || '');
  const [isBuilding, setIsBuilding] = useState(false);
  const [buildProgress, setBuildProgress] = useState(0);
  const [generatedGame, setGeneratedGame] = useState<Game | null>(null);
  const [viewMode, setViewMode] = useState<'desktop' | 'mobile'>('desktop');
  const [monetization, setMonetization] = useState({ enabled: false, type: 'ads' as 'ads' | 'paywall', price: 0.99 });
  const [history, setHistory] = useState<string[]>([]);
  
  const iframeRef = useRef<HTMLIFrameElement>(null);

  // Auto-start if prompt provided
  useEffect(() => {
    if (initialPrompt && !generatedGame) {
      handleBuild();
    }
  }, [initialPrompt]);

  // Update Iframe
  useEffect(() => {
    if (generatedGame && iframeRef.current) {
      const doc = iframeRef.current.contentDocument;
      if (doc) {
        doc.open();
        doc.write(generatedGame.code);
        doc.close();
      }
    }
  }, [generatedGame]);

  const handleBuild = async () => {
    if (!prompt) return;
    setIsBuilding(true);
    setBuildProgress(0);

    // Simulated progress
    const interval = setInterval(() => {
      setBuildProgress(prev => Math.min(prev + 2, 95));
    }, 100);

    try {
      const fullPrompt = selectedTemplate 
        ? `${selectedTemplate.basePrompt} customization: ${prompt}`
        : prompt;

      const [code, metadata] = await Promise.all([
        generateGameCode(fullPrompt),
        generateGameMetadata(fullPrompt)
      ]);

      const newGame: Game = {
        id: Date.now().toString(),
        title: metadata.title,
        description: metadata.description,
        prompt: prompt,
        code: code,
        thumbnailUrl: `https://picsum.photos/400/300?seed=${Date.now()}`,
        views: 0,
        earnings: 0,
        author: 'You',
        tags: metadata.tags,
        isMonetized: false,
        createdAt: Date.now()
      };

      setGeneratedGame(newGame);
      setHistory(prev => [...prev, fullPrompt]);
      setBuildProgress(100);
      setActiveTab('design'); // Switch to design tab after build
    } catch (error) {
      console.error(error);
      alert("Build failed. Please try again.");
    } finally {
      clearInterval(interval);
      setIsBuilding(false);
    }
  };

  const handlePublish = () => {
    if (generatedGame) {
      onSaveGame({ ...generatedGame, isMonetized: monetization.enabled });
    }
  };

  return (
    <div className="fixed inset-0 bg-[#0B0E14] text-white flex flex-col font-inter z-50">
      
      {/* 1. Studio Header */}
      <header className="h-14 border-b border-[#1F242F] bg-[#0F1219] flex items-center justify-between px-4 shrink-0">
        <div className="flex items-center gap-4">
          <button onClick={onExit} className="text-slate-400 hover:text-white transition-colors">
            <ArrowLeft size={20} />
          </button>
          <div className="flex items-center gap-3 group">
            <div className="relative flex items-center justify-center w-8 h-8 bg-white/5 rounded-lg border border-white/10 group-hover:border-cyan-500/50 transition-colors duration-500">
               <Gamepad2 className="h-4 w-4 text-white group-hover:text-cyan-400 transition-colors" />
            </div>
            <span className="font-bold font-rajdhani text-lg tracking-wide uppercase text-white group-hover:text-cyan-400 transition-colors">Arcadeen Studio</span>
            <span className="text-xs bg-[#1F242F] text-slate-400 px-2 py-0.5 rounded border border-[#2A303C]">Beta</span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="bg-[#151921] rounded-lg p-1 flex border border-[#2A303C]">
            <button 
              onClick={() => setViewMode('desktop')} 
              className={`p-1.5 rounded transition-all ${viewMode === 'desktop' ? 'bg-[#2A303C] text-white' : 'text-slate-500 hover:text-slate-300'}`}
            >
              <Monitor size={16} />
            </button>
            <button 
              onClick={() => setViewMode('mobile')} 
              className={`p-1.5 rounded transition-all ${viewMode === 'mobile' ? 'bg-[#2A303C] text-white' : 'text-slate-500 hover:text-slate-300'}`}
            >
              <Smartphone size={16} />
            </button>
          </div>
          <div className="h-6 w-px bg-[#2A303C]"></div>
          <button 
            onClick={handlePublish}
            className="bg-cyan-500 hover:bg-cyan-400 text-black font-bold text-sm px-4 py-2 rounded-lg flex items-center gap-2 transition-all"
          >
            <Rocket size={16} /> Publish Game
          </button>
        </div>
      </header>

      {/* 2. Main Workspace */}
      <div className="flex flex-1 overflow-hidden">
        
        {/* LEFT PANEL: Tools & Assets */}
        <div className="w-72 bg-[#0F1219] border-r border-[#1F242F] flex flex-col">
          {/* Tab Navigation */}
          <div className="flex border-b border-[#1F242F]">
            <button 
              onClick={() => setActiveTab('create')}
              className={`flex-1 py-3 text-xs font-bold uppercase tracking-wider transition-colors ${activeTab === 'create' ? 'text-cyan-400 border-b-2 border-cyan-400 bg-[#151921]' : 'text-slate-500 hover:text-white'}`}
            >
              Create
            </button>
            <button 
              onClick={() => setActiveTab('design')}
              disabled={!generatedGame}
              className={`flex-1 py-3 text-xs font-bold uppercase tracking-wider transition-colors ${activeTab === 'design' ? 'text-cyan-400 border-b-2 border-cyan-400 bg-[#151921]' : 'text-slate-500 hover:text-white disabled:opacity-30'}`}
            >
              Design
            </button>
            <button 
              onClick={() => setActiveTab('monetize')}
              disabled={!generatedGame}
              className={`flex-1 py-3 text-xs font-bold uppercase tracking-wider transition-colors ${activeTab === 'monetize' ? 'text-cyan-400 border-b-2 border-cyan-400 bg-[#151921]' : 'text-slate-500 hover:text-white disabled:opacity-30'}`}
            >
              Earn
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-4 custom-scrollbar">
            
            {/* CREATE TAB */}
            {activeTab === 'create' && (
              <div className="space-y-6 animate-fade-in">
                <div>
                  <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-3">Choose Template</h3>
                  <div className="grid grid-cols-2 gap-2">
                    {TEMPLATES.map(t => (
                      <button
                        key={t.id}
                        onClick={() => setSelectedTemplate(t)}
                        className={`p-3 rounded-xl border text-left transition-all ${selectedTemplate?.id === t.id ? 'bg-cyan-900/20 border-cyan-500/50 ring-1 ring-cyan-500/50' : 'bg-[#151921] border-[#2A303C] hover:border-slate-600'}`}
                      >
                        <div className="text-2xl mb-2">{t.icon}</div>
                        <div className="text-sm font-bold text-white mb-1">{t.name}</div>
                        <div className="text-[10px] text-slate-500 leading-tight">{t.category}</div>
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                   <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-3">Prompt</h3>
                   <div className="bg-[#151921] border border-[#2A303C] rounded-xl p-3 focus-within:border-cyan-500/50 transition-colors">
                     <textarea 
                        value={prompt}
                        onChange={(e) => setPrompt(e.target.value)}
                        placeholder="Describe your game idea... e.g. 'A platformer where you play as a cyberpunk cat'"
                        className="w-full bg-transparent text-sm text-white placeholder-slate-600 focus:outline-none resize-none h-24"
                     />
                   </div>
                   <button 
                      onClick={handleBuild}
                      disabled={isBuilding || (!prompt && !selectedTemplate)}
                      className="w-full mt-3 bg-white hover:bg-slate-200 text-black font-bold text-sm py-3 rounded-lg flex items-center justify-center gap-2 transition-all disabled:opacity-50"
                   >
                      {isBuilding ? <Zap size={16} className="animate-spin"/> : <Zap size={16}/>}
                      {isBuilding ? 'Generating...' : 'Generate Game'}
                   </button>
                </div>
              </div>
            )}

            {/* DESIGN TAB */}
            {activeTab === 'design' && (
              <div className="space-y-6 animate-fade-in">
                <div className="bg-blue-900/20 border border-blue-500/20 p-4 rounded-xl">
                    <div className="flex items-start gap-3">
                        <div className="w-8 h-8 rounded-full bg-blue-500/20 flex items-center justify-center shrink-0">
                            <Code size={16} className="text-blue-400" />
                        </div>
                        <div>
                            <h3 className="text-sm font-bold text-white mb-1">AI Copilot Active</h3>
                            <p className="text-xs text-slate-400">Describe changes to modify the code instantly.</p>
                        </div>
                    </div>
                </div>

                <div>
                   <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-3">Refine Gameplay</h3>
                   <textarea 
                      value={prompt}
                      onChange={(e) => setPrompt(e.target.value)}
                      onKeyDown={(e) => e.key === 'Enter' && !e.shiftKey && handleBuild()}
                      placeholder="e.g. 'Make the player jump higher', 'Change background to Mars', 'Add double jump'"
                      className="w-full bg-[#151921] border border-[#2A303C] rounded-xl p-3 text-sm text-white focus:border-cyan-500/50 focus:outline-none resize-none h-32 mb-2"
                   />
                   <button 
                      onClick={handleBuild}
                      disabled={isBuilding}
                      className="w-full bg-[#1F242F] hover:bg-[#2A303C] text-white font-bold text-xs py-2 rounded-lg border border-[#2A303C] transition-all"
                   >
                      Apply Changes
                   </button>
                </div>

                <div>
                   <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-3">Quick Actions</h3>
                   <div className="grid grid-cols-2 gap-2">
                      <button onClick={() => setPrompt("Make it harder")} className="bg-[#151921] hover:bg-[#1F242F] text-xs text-slate-300 py-2 rounded border border-[#2A303C]">Make Harder</button>
                      <button onClick={() => setPrompt("Add a score counter")} className="bg-[#151921] hover:bg-[#1F242F] text-xs text-slate-300 py-2 rounded border border-[#2A303C]">Add Score</button>
                      <button onClick={() => setPrompt("Change colors to neon")} className="bg-[#151921] hover:bg-[#1F242F] text-xs text-slate-300 py-2 rounded border border-[#2A303C]">Neon Theme</button>
                      <button onClick={() => setPrompt("Add sound effects")} className="bg-[#151921] hover:bg-[#1F242F] text-xs text-slate-300 py-2 rounded border border-[#2A303C]">Add SFX</button>
                   </div>
                </div>
              </div>
            )}

             {/* MONETIZE TAB */}
            {activeTab === 'monetize' && (
              <div className="space-y-6 animate-fade-in">
                 <div className="bg-[#151921] border border-[#2A303C] rounded-xl p-4">
                    <div className="flex items-center justify-between mb-4">
                        <span className="text-sm font-bold text-white">Enable Monetization</span>
                        <button 
                           onClick={() => setMonetization(m => ({...m, enabled: !m.enabled}))}
                           className={`w-10 h-5 rounded-full p-0.5 transition-colors ${monetization.enabled ? 'bg-cyan-500' : 'bg-slate-700'}`}
                        >
                            <div className={`w-4 h-4 rounded-full bg-white shadow transition-transform ${monetization.enabled ? 'translate-x-5' : 'translate-x-0'}`}></div>
                        </button>
                    </div>
                    
                    {monetization.enabled && (
                        <div className="space-y-4 pt-4 border-t border-[#2A303C]">
                            <div>
                                <label className="block text-xs text-slate-400 mb-2">Revenue Model</label>
                                <div className="flex rounded-lg bg-[#0F1219] p-1 border border-[#2A303C]">
                                    <button 
                                      onClick={() => setMonetization(m => ({...m, type: 'ads'}))}
                                      className={`flex-1 py-1.5 text-xs rounded font-medium transition-colors ${monetization.type === 'ads' ? 'bg-[#1F242F] text-white shadow' : 'text-slate-500'}`}
                                    >
                                        Ads
                                    </button>
                                    <button 
                                      onClick={() => setMonetization(m => ({...m, type: 'paywall'}))}
                                      className={`flex-1 py-1.5 text-xs rounded font-medium transition-colors ${monetization.type === 'paywall' ? 'bg-[#1F242F] text-white shadow' : 'text-slate-500'}`}
                                    >
                                        Paywall
                                    </button>
                                </div>
                            </div>

                            {monetization.type === 'paywall' && (
                                <div>
                                    <label className="block text-xs text-slate-400 mb-2">Price ($USD)</label>
                                    <input 
                                      type="number" 
                                      value={monetization.price}
                                      onChange={(e) => setMonetization(m => ({...m, price: parseFloat(e.target.value)}))}
                                      className="w-full bg-[#0F1219] border border-[#2A303C] rounded px-3 py-2 text-sm text-white focus:border-cyan-500/50 outline-none"
                                    />
                                </div>
                            )}

                             <div className="bg-green-500/10 border border-green-500/20 p-3 rounded">
                                <div className="flex justify-between text-xs mb-1">
                                    <span className="text-green-400 font-bold">Estimated Share</span>
                                    <span className="text-white">70%</span>
                                </div>
                                <div className="text-[10px] text-slate-400">You keep majority of revenue generated.</div>
                            </div>
                        </div>
                    )}
                 </div>
              </div>
            )}

          </div>
        </div>

        {/* CENTER: Canvas */}
        <div className="flex-1 bg-[#090b0f] flex flex-col relative">
          {/* Canvas Toolbar */}
          <div className="h-10 border-b border-[#1F242F] bg-[#0F1219] flex items-center justify-between px-4">
              <div className="flex items-center gap-2">
                 <span className="text-xs text-slate-500">{generatedGame ? `${generatedGame.title} (Draft)` : 'Untitled Project'}</span>
              </div>
              <div className="flex items-center gap-2">
                 {isBuilding && <span className="text-xs text-cyan-400 animate-pulse flex items-center gap-1"><Zap size={12}/> Building... {Math.round(buildProgress)}%</span>}
              </div>
          </div>

          {/* Canvas Container */}
          <div className="flex-1 overflow-auto flex items-center justify-center p-8 bg-dots-pattern">
              {!generatedGame && !isBuilding && (
                  <div className="text-center">
                      <div className="w-16 h-16 rounded-2xl bg-[#151921] border border-[#2A303C] flex items-center justify-center mx-auto mb-4">
                          <Layers size={32} className="text-slate-600" />
                      </div>
                      <h3 className="text-slate-300 font-bold mb-1">Ready to Create</h3>
                      <p className="text-slate-500 text-sm">Select a template or type a prompt to begin.</p>
                  </div>
              )}

              {generatedGame && (
                  <div 
                    className={`transition-all duration-300 shadow-2xl relative ${
                        viewMode === 'mobile' 
                        ? 'w-[375px] h-[667px] rounded-[40px] border-[8px] border-[#1F242F] bg-black' 
                        : 'w-full h-full max-w-4xl max-h-[800px] rounded-lg border border-[#2A303C] bg-black'
                    }`}
                  >
                     <iframe 
                        ref={iframeRef}
                        className="w-full h-full rounded-[inherit]"
                        sandbox="allow-scripts allow-same-origin allow-modals"
                     />
                  </div>
              )}
          </div>
        </div>

      </div>
    </div>
  );
};

export default Studio;