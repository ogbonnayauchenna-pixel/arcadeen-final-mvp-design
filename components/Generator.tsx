import React, { useState, useEffect, useRef } from 'react';
import { Loader2, Monitor, Smartphone, Share2, DollarSign, Repeat, Save, Zap, Settings } from 'lucide-react';
import { Game } from '../types';
import { generateGameCode, generateGameMetadata } from '../services/geminiService';

interface GeneratorProps {
  initialPrompt?: string;
  onSaveGame: (game: Game) => void;
}

const Generator: React.FC<GeneratorProps> = ({ initialPrompt, onSaveGame }) => {
  const [prompt, setPrompt] = useState(initialPrompt || '');
  const [isGenerating, setIsGenerating] = useState(false);
  const [progress, setProgress] = useState(0);
  const [generatedGame, setGeneratedGame] = useState<Game | null>(null);
  const [monetizeEnabled, setMonetizeEnabled] = useState(false);
  const [viewMode, setViewMode] = useState<'desktop' | 'mobile'>('desktop');
  const [showPaywallPreview, setShowPaywallPreview] = useState(false);

  const iframeRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    if (initialPrompt && !generatedGame) {
      handleGenerate();
    }
  }, [initialPrompt]);

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

  const handleGenerate = async () => {
    if (!prompt) return;
    setIsGenerating(true);
    setGeneratedGame(null);
    setProgress(0);

    const interval = setInterval(() => {
      setProgress(prev => Math.min(prev + (100 / 60), 99)); 
    }, 100);

    try {
      const [code, metadata] = await Promise.all([
        generateGameCode(prompt),
        generateGameMetadata(prompt)
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
      setProgress(100);
    } catch (error) {
      console.error(error);
      alert("Failed to generate game. Please try again.");
    } finally {
      clearInterval(interval);
      setIsGenerating(false);
    }
  };

  const handleSave = () => {
    if (generatedGame) {
        onSaveGame({...generatedGame, isMonetized: monetizeEnabled});
        // Simulate confetti or success feedback
    }
  };

  return (
    <div className="min-h-screen pt-24 px-4 pb-12 max-w-7xl mx-auto flex flex-col h-full bg-slate-950">
      
      {/* Search/Prompt Header */}
      <div className="mb-8 relative z-10">
        <div className="flex gap-4 items-center bg-slate-900 p-2 rounded-lg border border-slate-700 shadow-xl">
            <div className="pl-4 text-cyan-400">
                <Zap size={24} className={isGenerating ? "animate-spin" : ""} />
            </div>
          <input 
            type="text" 
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            disabled={isGenerating}
            placeholder="Describe your game concept..."
            className="flex-1 bg-transparent border-none text-white text-lg px-4 py-2 focus:ring-0 outline-none font-inter placeholder-slate-600"
            onKeyDown={(e) => e.key === 'Enter' && handleGenerate()}
          />
          <button 
            onClick={handleGenerate}
            disabled={isGenerating || !prompt}
            className={`px-8 py-3 rounded font-bold font-rajdhani uppercase tracking-wider transition-all ${isGenerating ? 'bg-slate-800 text-slate-500' : 'bg-cyan-500 hover:bg-cyan-400 text-black shadow-[0_0_15px_rgba(34,211,238,0.5)]'}`}
          >
            {isGenerating ? 'Building...' : 'Generate'}
          </button>
        </div>
        
        {isGenerating && (
          <div className="mt-2 flex items-center gap-2">
            <div className="flex-1 h-1 bg-slate-800 rounded-full overflow-hidden">
                <div className="h-full bg-cyan-400 transition-all duration-100 ease-linear shadow-[0_0_10px_#22d3ee]" style={{ width: `${progress}%` }}></div>
            </div>
            <span className="text-xs font-mono text-cyan-400">{Math.round(progress)}%</span>
          </div>
        )}
      </div>

      <div className="flex flex-col lg:flex-row gap-6 flex-1 min-h-[600px]">
        
        {/* Game Preview Area */}
        <div className="flex-1 bg-slate-900 rounded-xl overflow-hidden border border-slate-800 flex flex-col relative shadow-2xl">
          
          <div className="h-12 bg-slate-950 border-b border-slate-800 flex items-center justify-between px-4">
            <div className="flex gap-2">
                <span className="text-xs font-bold text-slate-500 uppercase tracking-widest flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></span> Live Preview
                </span>
            </div>
            <div className="flex bg-slate-800 rounded p-1">
              <button onClick={() => setViewMode('desktop')} className={`p-1.5 rounded ${viewMode === 'desktop' ? 'bg-slate-700 text-white' : 'text-slate-500'}`}><Monitor size={14}/></button>
              <button onClick={() => setViewMode('mobile')} className={`p-1.5 rounded ${viewMode === 'mobile' ? 'bg-slate-700 text-white' : 'text-slate-500'}`}><Smartphone size={14}/></button>
            </div>
          </div>

          <div className="flex-1 bg-black relative flex items-center justify-center overflow-hidden p-4">
             {!generatedGame && !isGenerating && (
                <div className="text-center opacity-30">
                    <Monitor size={64} className="mx-auto mb-4" />
                    <p className="font-rajdhani uppercase tracking-widest">Waiting for Input</p>
                </div>
             )}
             
             {generatedGame && (
                <div className={`transition-all duration-500 relative shadow-2xl ${viewMode === 'mobile' ? 'w-[360px] h-[640px] rounded-[30px] border-8 border-slate-800 bg-black' : 'w-full h-full'}`}>
                   <iframe 
                     ref={iframeRef}
                     title="Game Preview"
                     className="w-full h-full"
                     style={{ borderRadius: viewMode === 'mobile' ? '20px' : '0' }}
                     sandbox="allow-scripts allow-same-origin allow-modals"
                   />
                   
                   {/* Monetization Overlay Preview */}
                   {monetizeEnabled && showPaywallPreview && (
                       <div className="absolute inset-0 bg-black/80 flex flex-col items-center justify-center z-20 backdrop-blur-sm p-6 text-center animate-in fade-in zoom-in">
                           <div className="bg-slate-900 border border-cyan-500/50 p-6 rounded-xl shadow-[0_0_50px_rgba(34,211,238,0.2)] max-w-xs w-full">
                               <h3 className="text-xl text-white font-rajdhani font-bold mb-1">Premium Unlock</h3>
                               <p className="text-slate-400 text-xs mb-4">Support {generatedGame.title} to play full version.</p>
                               <button className="w-full bg-cyan-500 text-black font-bold py-2 rounded mb-2 hover:bg-cyan-400">Pay $0.99</button>
                               <button 
                                 onClick={() => setShowPaywallPreview(false)}
                                 className="text-xs text-slate-500 underline hover:text-white"
                               >
                                   Close Preview
                               </button>
                           </div>
                       </div>
                   )}
                </div>
             )}
          </div>
        </div>

        {/* Sidebar Controls */}
        <div className="w-full lg:w-80 flex flex-col gap-4">
          {generatedGame ? (
              <>
                 {/* Metadata Card */}
                 <div className="bg-slate-900 p-5 rounded-xl border border-slate-800">
                    <h3 className="text-xl font-bold text-white font-rajdhani mb-2">{generatedGame.title}</h3>
                    <p className="text-xs text-slate-400 mb-4 leading-relaxed">{generatedGame.description}</p>
                    <div className="flex gap-2">
                        <button onClick={handleGenerate} className="flex-1 bg-slate-800 hover:bg-slate-700 text-white py-2 rounded text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 border border-slate-700">
                            <Repeat size={14} /> Remix
                        </button>
                        <button className="flex-1 bg-slate-800 hover:bg-slate-700 text-white py-2 rounded text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 border border-slate-700">
                            <Share2 size={14} /> Share
                        </button>
                    </div>
                 </div>

                 {/* Monetization Card */}
                 <div className={`p-5 rounded-xl border relative overflow-hidden transition-all duration-300 ${monetizeEnabled ? 'bg-cyan-950/20 border-cyan-500/50 shadow-[0_0_20px_rgba(34,211,238,0.1)]' : 'bg-slate-900 border-slate-800'}`}>
                    <div className="flex justify-between items-start mb-4">
                        <div>
                             <h3 className="text-lg font-bold text-white font-rajdhani flex items-center gap-2">
                                <DollarSign className={monetizeEnabled ? "text-green-400" : "text-slate-500"} size={18} /> 
                                Monetize
                            </h3>
                            <p className="text-[10px] text-slate-400">Ads & Paywall Auto-Inject</p>
                        </div>
                        <button 
                           onClick={() => setMonetizeEnabled(!monetizeEnabled)}
                           className={`w-10 h-5 rounded-full p-0.5 transition-colors duration-300 ${monetizeEnabled ? 'bg-cyan-500' : 'bg-slate-700'}`}
                        >
                            <div className={`w-4 h-4 rounded-full bg-white shadow-md transform transition-transform duration-300 ${monetizeEnabled ? 'translate-x-5' : 'translate-x-0'}`}></div>
                        </button>
                    </div>

                    {monetizeEnabled && (
                        <div className="space-y-3 animate-fade-in text-sm">
                            <div className="bg-black/20 p-3 rounded border border-white/5">
                                <div className="flex justify-between text-xs mb-1">
                                    <span className="text-slate-400">Creator Cut</span>
                                    <span className="text-green-400 font-bold">70%</span>
                                </div>
                                <div className="w-full bg-slate-700 h-1 rounded-full"><div className="w-[70%] h-full bg-green-400 rounded-full"></div></div>
                            </div>
                            
                            <div className="flex gap-2 text-xs">
                                <button onClick={() => setShowPaywallPreview(true)} className="flex-1 bg-cyan-900/30 hover:bg-cyan-900/50 text-cyan-300 border border-cyan-800/50 py-1.5 rounded">Preview Paywall</button>
                            </div>
                        </div>
                    )}
                 </div>

                 <button 
                    onClick={handleSave}
                    className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-bold font-rajdhani py-4 rounded-lg uppercase tracking-widest flex items-center justify-center gap-2 shadow-lg hover:shadow-cyan-500/25 transition-all mt-auto"
                 >
                     <Save size={18} /> Publish to Arcade
                 </button>
              </>
          ) : (
            <div className="flex-1 border-2 border-dashed border-slate-800 rounded-xl flex items-center justify-center text-slate-600 p-8">
               <div className="text-center">
                    <Settings size={32} className="mx-auto mb-2 opacity-50" />
                    <p className="text-sm">Generator Settings will appear here.</p>
               </div>
            </div>
          )}
        </div>

      </div>
    </div>
  );
};

export default Generator;