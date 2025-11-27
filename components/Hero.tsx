import React, { useState, useEffect } from 'react';
import { Lightbulb, Gamepad2, Share2, Sparkles, ArrowRight, Play, Clock, Zap, ChevronRight, ClipboardList, X, Send, Repeat, TrendingUp, Check } from 'lucide-react';
import { Game } from '../types';

interface HeroProps {
  onStartCreate: (initialPrompt?: string) => void;
  onPlay: (game: Game) => void;
  isWaitlistOpen: boolean;
  setIsWaitlistOpen: (isOpen: boolean) => void;
}

const Hero: React.FC<HeroProps> = ({ onStartCreate, onPlay, isWaitlistOpen, setIsWaitlistOpen }) => {
  const [prompt, setPrompt] = useState('');
  const [loopPhase, setLoopPhase] = useState(0); // 0: Idea, 1: Build, 2: Earn
  const [waitlistData, setWaitlistData] = useState({ email: '', reason: '' });
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Cycle the "Proof" animation
  useEffect(() => {
    const interval = setInterval(() => {
      setLoopPhase((prev) => (prev + 1) % 3);
    }, 2000); // 2 seconds per phase
    return () => clearInterval(interval);
  }, []);

  const handleWaitlistSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, send data to backend here
    setIsSubmitted(true);
    setTimeout(() => {
      setIsWaitlistOpen(false);
      setIsSubmitted(false);
      setWaitlistData({ email: '', reason: '' });
      // Optional: Clear prompt or keep it for their "dream"
    }, 2500);
  };

  // Simplified Gallery Data with VIBRANT ARCADE IMAGES
  const dummyGames: Game[] = [
    {
      id: '1', title: 'Zombie Pizza Dash', description: 'Fun run game – shared 500 times',
      prompt: '', code: '', 
      thumbnailUrl: 'https://images.unsplash.com/photo-1552820728-8b83bb6b773f?q=80&w=1080&auto=format&fit=crop', // Gaming/Arcade
      views: 5400, earnings: 20.50, author: 'Alex', tags: ['#Casual', '#AI'], isMonetized: true, createdAt: Date.now()
    },
    {
      id: '2', title: 'Space Cat Rescue', description: 'Jump & collect. Simple & addictive.',
      prompt: '', code: '', 
      thumbnailUrl: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=1080&auto=format&fit=crop', // Retro Tech/Neon
      views: 1200, earnings: 5.00, author: 'Sarah', tags: ['#Jump', '#Cute'], isMonetized: true, createdAt: Date.now()
    },
    {
      id: '3', title: 'Neon Puzzle Block', description: 'Classic vibe with a twist.',
      prompt: '', code: '', 
      thumbnailUrl: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=1080&auto=format&fit=crop', // Cyberpunk City
      views: 300, earnings: 0, author: 'Mike', tags: ['#Puzzle', '#Retro'], isMonetized: false, createdAt: Date.now()
    },
    {
      id: '4', title: 'Dino Skater 3000', description: 'Physics fun. Built in 45s.',
      prompt: '', code: '', 
      thumbnailUrl: 'https://images.unsplash.com/photo-1614728853913-6591d0012f27?q=80&w=1080&auto=format&fit=crop', // Pixel Grid
      views: 8900, earnings: 42.00, author: 'Jen', tags: ['#Skate', '#Physics'], isMonetized: true, createdAt: Date.now()
    }
  ];

  const quickPrompts = [
      { emoji: '🧟', label: 'Casual Fun', text: 'Zombies vs. pizza runner' },
      { emoji: '🚀', label: 'Adventure', text: 'Space rocket dodging asteroids' },
      { emoji: '🎮', label: 'Puzzle', text: 'Neon block matching puzzle' }
  ];

  return (
    <div className="relative min-h-screen pt-32 flex flex-col items-center bg-brand-dark overflow-x-hidden">
        {/* Cinematic Spotlight Background */}
        <div className="absolute top-0 left-0 w-full h-[80vh] overflow-hidden pointer-events-none z-0">
             {/* Main top spotlight */}
             <div className="absolute top-[-50%] left-1/2 -translate-x-1/2 w-[120%] h-[150%] bg-aurora opacity-100 mix-blend-screen"></div>
             {/* Subtle scanline grid */}
             <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20"></div>
             {/* Bottom fade */}
             <div className="absolute bottom-0 w-full h-32 bg-gradient-to-t from-brand-dark to-transparent"></div>
        </div>

      {/* 0. Top Visual: Idea -> Build -> Earn */}
      <div className="relative z-10 mb-10 animate-fade-in-up">
         <div className="flex items-center gap-6 px-8 py-4 rounded-full glass-panel shadow-2xl">
             {/* Phase 0: Idea */}
             <div className={`flex flex-col items-center gap-2 transition-all duration-700 ${loopPhase === 0 ? 'opacity-100 scale-105' : 'opacity-40 scale-100 grayscale'}`}>
                 <div className="relative">
                    {loopPhase === 0 && <div className="absolute inset-0 bg-brand-cyan blur-md opacity-50 animate-pulse"></div>}
                    <div className="relative w-8 h-8 rounded-lg bg-black/40 flex items-center justify-center border border-white/10">
                        <Zap size={16} className="text-brand-cyan" />
                    </div>
                 </div>
                 <span className="text-[9px] font-bold uppercase tracking-[0.2em] text-brand-cyan">Idea</span>
             </div>
             
             <div className="h-px w-12 bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>

             {/* Phase 1: Build */}
             <div className={`flex flex-col items-center gap-2 transition-all duration-700 ${loopPhase === 1 ? 'opacity-100 scale-105' : 'opacity-40 scale-100 grayscale'}`}>
                 <div className="relative">
                    {loopPhase === 1 && <div className="absolute inset-0 bg-purple-500 blur-md opacity-50 animate-pulse"></div>}
                    <div className="relative w-8 h-8 rounded-lg bg-black/40 flex items-center justify-center border border-white/10">
                        <Gamepad2 size={16} className="text-purple-400" />
                    </div>
                 </div>
                 <span className="text-[9px] font-bold uppercase tracking-[0.2em] text-purple-400">Build</span>
             </div>

             <div className="h-px w-12 bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>

              {/* Phase 2: Earn */}
             <div className={`flex flex-col items-center gap-2 transition-all duration-700 ${loopPhase === 2 ? 'opacity-100 scale-105' : 'opacity-40 scale-100 grayscale'}`}>
                 <div className="relative">
                    {loopPhase === 2 && <div className="absolute inset-0 bg-brand-accent blur-md opacity-50 animate-pulse"></div>}
                    <div className="relative w-8 h-8 rounded-lg bg-black/40 flex items-center justify-center border border-white/10">
                        <Sparkles size={16} className="text-brand-accent" />
                    </div>
                 </div>
                 <span className="text-[9px] font-bold uppercase tracking-[0.2em] text-brand-accent">Earn</span>
             </div>
         </div>
      </div>

      {/* 2. Headlines */}
      <div className="relative z-10 text-center px-6 max-w-5xl mx-auto mb-16 animate-fade-in-up" style={{animationDelay: '0.1s'}}>
          <h1 className="text-6xl md:text-8xl font-bold font-rajdhani text-white mb-6 leading-[0.9] tracking-tight drop-shadow-2xl">
            Turn Ideas Into Games.<br/>
            {/* Shimmer Text */}
            <span className="bg-shimmer-gradient bg-[length:200%_auto] animate-text-shimmer bg-clip-text text-transparent">
               No Code Needed.
            </span>
          </h1>
          <p className="text-lg md:text-xl text-slate-400 font-light leading-relaxed max-w-2xl mx-auto">
             Chat and play in 60 seconds. Share with friends and watch it grow
             <span className="block mt-4 text-white opacity-90">
               We handle the code. You keep <span className="font-bold text-brand-accent border-b border-brand-accent/30 pb-0.5">70% of the revenue.</span>
            </span>
          </p>
      </div>

      {/* 3. Input Action - HUD Style */}
      <div className="relative z-20 w-full max-w-2xl px-6 mb-24 animate-fade-in-up" style={{animationDelay: '0.2s'}}>
          <div className="relative group">
              {/* Subtle background glow, less blurry/bloby */}
              <div className="absolute -inset-[1px] bg-gradient-to-r from-brand-cyan/30 via-transparent to-brand-accent/30 rounded-xl opacity-0 group-hover:opacity-100 transition duration-700"></div>
              
              <div className="relative flex items-center bg-[#080808] border border-white/10 rounded-xl p-2 shadow-2xl backdrop-blur-xl ring-1 ring-white/5">
                  <div className="pl-4 pr-2 text-slate-500">
                      <Sparkles size={18} />
                  </div>
                  <input 
                      type="text" 
                      value={prompt}
                      onChange={(e) => setPrompt(e.target.value)}
                      placeholder="e.g. A cyberpunk snake game with neon lights..."
                      className="flex-1 bg-transparent border-none text-white text-lg px-2 py-4 focus:ring-0 outline-none placeholder-slate-700 font-inter font-light"
                      onKeyDown={(e) => e.key === 'Enter' && onStartCreate(prompt)}
                  />
                  <button 
                      onClick={() => onStartCreate(prompt)}
                      className="bg-white hover:bg-brand-cyan hover:text-black text-black font-bold font-rajdhani uppercase tracking-widest px-8 py-4 rounded-lg transition-all duration-300 flex items-center gap-2 text-xs shadow-lg"
                  >
                      Create <ArrowRight size={14} />
                  </button>
              </div>
          </div>
          
          {/* Quick Prompts - Minimal Pills */}
          <div className="flex flex-wrap justify-center gap-3 mt-8">
              {quickPrompts.map((qp, idx) => (
                  <button 
                      key={idx}
                      onClick={() => onStartCreate(qp.text)}
                      className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/5 hover:bg-white/10 hover:border-white/20 text-slate-500 hover:text-white transition-all text-xs font-medium tracking-wide"
                  >
                      <span className="grayscale opacity-70 group-hover:grayscale-0">{qp.emoji}</span> {qp.label}
                  </button>
              ))}
          </div>
      </div>

       {/* 4. Trending Games Gallery - SQUARE CARDS */}
       <div className="w-full max-w-7xl px-6 pb-20 animate-fade-in-up" style={{animationDelay: '0.3s'}}>
          <div className="flex items-end justify-between mb-8 border-b border-white/5 pb-4">
               <div>
                  <h3 className="text-xl font-bold font-rajdhani text-white uppercase tracking-widest flex items-center gap-3">
                     <TrendingUp size={18} className="text-brand-accent"/> Trending Now
                  </h3>
               </div>
               <button className="text-slate-500 hover:text-white text-xs font-bold uppercase tracking-widest flex items-center gap-1 transition-colors">
                   View Gallery <ChevronRight size={12} />
               </button>
          </div>
          
          {/* GRID: Square Cards (aspect-square) */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
             {dummyGames.map(game => (
                <div key={game.id} onClick={() => onPlay(game)} className="group relative aspect-square bg-[#0A0A0A] border border-white/5 rounded-xl overflow-hidden cursor-pointer hover:border-brand-cyan/30 transition-all duration-500 hover:shadow-2xl">
                    
                    {/* Full Background Image - No Grayscale for pop */}
                    <img src={game.thumbnailUrl} alt={game.title} className="absolute inset-0 w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-all duration-700 scale-100 group-hover:scale-105" />
                    
                    {/* Dark overlay for readability */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent opacity-90 transition-opacity"></div>
                    
                    {/* Hover Glow Overlay */}
                    <div className="absolute inset-0 bg-brand-cyan/5 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-10"></div>

                    {/* Stats Top Right */}
                    <div className="absolute top-4 right-4 z-20 flex gap-2">
                        <div className="flex items-center gap-1 bg-black/60 backdrop-blur-md px-2 py-1 rounded border border-white/10 text-[10px] text-white font-mono">
                            <Play size={8} fill="white" /> {game.views}
                        </div>
                        {game.isMonetized && (
                            <div className="flex items-center gap-1 bg-black/80 backdrop-blur-md px-2 py-1 rounded text-[10px] font-bold text-brand-accent border border-brand-accent/20 shadow-lg">
                                <span className="w-1.5 h-1.5 rounded-full bg-brand-accent animate-pulse"></span>
                                ${game.earnings.toFixed(0)}
                            </div>
                        )}
                    </div>

                    {/* Content Overlay (Bottom) */}
                    <div className="absolute bottom-0 inset-x-0 p-5 z-20 flex flex-col justify-end translate-y-0 transition-transform">
                        <h4 className="font-bold text-white font-rajdhani truncate text-xl mb-1 group-hover:text-brand-cyan transition-colors shadow-black drop-shadow-md">{game.title}</h4>
                        <p className="text-xs text-slate-300 line-clamp-1 mb-4 font-medium opacity-80">{game.description}</p>
                        
                        {/* Action Buttons */}
                        <div className="flex gap-3">
                             <button 
                                onClick={(e) => { e.stopPropagation(); onStartCreate(`${game.title} Remix`); }} 
                                className="flex-1 bg-white/10 hover:bg-white text-white hover:text-black py-3 rounded text-[10px] font-bold uppercase tracking-widest flex items-center justify-center gap-2 transition-all border border-white/10 hover:border-white backdrop-blur-md"
                             >
                                <Repeat size={10} /> Remix
                             </button>
                             <button 
                                onClick={(e) => { e.stopPropagation(); onPlay(game); }} 
                                className="flex-1 bg-brand-cyan hover:bg-brand-glow text-black py-3 rounded text-[10px] font-bold uppercase tracking-widest flex items-center justify-center gap-2 transition-all shadow-glow hover:scale-105"
                             >
                                <Play size={10} fill="black" /> Play
                             </button>
                        </div>
                    </div>
                </div>
             ))}
          </div>
       </div>

       {/* Waitlist Modal */}
       {isWaitlistOpen && (
           <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
               <div className="absolute inset-0 bg-black/90 backdrop-blur-md" onClick={() => setIsWaitlistOpen(false)}></div>
               <div className="relative glass-panel rounded-2xl p-8 max-w-md w-full shadow-2xl animate-in fade-in zoom-in duration-300 border border-white/10">
                   <button onClick={() => setIsWaitlistOpen(false)} className="absolute top-4 right-4 text-slate-500 hover:text-white transition-colors"><X size={20} /></button>
                   
                   {!isSubmitted ? (
                       <>
                           <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center mb-6 mx-auto border border-white/10">
                               <ClipboardList className="text-brand-cyan" size={24} />
                           </div>
                           <h2 className="text-2xl font-bold text-center text-white font-rajdhani uppercase mb-2 tracking-wide">Join the Waitlist</h2>
                           <p className="text-center text-slate-400 mb-8 text-sm leading-relaxed">We are rolling out access gradually. Secure your spot to start earning from AI games.</p>
                           
                           <form onSubmit={handleWaitlistSubmit} className="space-y-4">
                               <div>
                                   <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-2">Email Address</label>
                                   <input 
                                       required
                                       type="email" 
                                       value={waitlistData.email}
                                       onChange={(e) => setWaitlistData({...waitlistData, email: e.target.value})}
                                       className="w-full bg-black/50 border border-white/10 rounded px-4 py-3 text-white focus:border-brand-cyan/50 focus:outline-none transition-colors text-sm"
                                       placeholder="you@example.com"
                                   />
                               </div>
                               <div>
                                   <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-2">What will you build?</label>
                                   <textarea 
                                       rows={2}
                                       value={waitlistData.reason}
                                       onChange={(e) => setWaitlistData({...waitlistData, reason: e.target.value})}
                                       className="w-full bg-black/50 border border-white/10 rounded px-4 py-3 text-white focus:border-brand-cyan/50 focus:outline-none transition-colors resize-none text-sm"
                                       placeholder="Briefly describe your game idea..."
                                   />
                               </div>
                               <button type="submit" className="w-full bg-brand-cyan hover:bg-white text-black font-bold font-rajdhani uppercase tracking-widest py-4 rounded-lg flex items-center justify-center gap-2 transition-all shadow-glow mt-4">
                                   Join Now <ArrowRight size={16} />
                               </button>
                           </form>
                       </>
                   ) : (
                       <div className="text-center py-8">
                           <div className="w-16 h-16 rounded-full bg-brand-accent/10 flex items-center justify-center mb-6 mx-auto animate-bounce border border-brand-accent/20">
                               <Check className="text-brand-accent" size={32} />
                           </div>
                           <h2 className="text-2xl font-bold text-white font-rajdhani uppercase mb-2 tracking-wide">You're on the list!</h2>
                           <p className="text-slate-400">We'll notify you as soon as a spot opens up.</p>
                       </div>
                   )}
               </div>
           </div>
       )}

    </div>
  );
};

export default Hero;