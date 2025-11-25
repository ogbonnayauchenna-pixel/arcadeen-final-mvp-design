
import React, { useState, useEffect } from 'react';
import { Lightbulb, Gamepad2, Share2, Sparkles, ArrowRight, Play, Clock, Heart, Zap } from 'lucide-react';
import { Game } from '../types';

interface HeroProps {
  onStartCreate: (initialPrompt?: string) => void;
  onPlay: (game: Game) => void;
}

const Hero: React.FC<HeroProps> = ({ onStartCreate, onPlay }) => {
  const [prompt, setPrompt] = useState('');
  const [loopPhase, setLoopPhase] = useState(0); // 0: Idea, 1: Build, 2: Love

  // Cycle the "Proof" animation
  useEffect(() => {
    const interval = setInterval(() => {
      setLoopPhase((prev) => (prev + 1) % 3);
    }, 2000); // 2 seconds per phase
    return () => clearInterval(interval);
  }, []);

  // Simplified Gallery Data
  const dummyGames: Game[] = [
    {
      id: '1', title: 'Zombie Pizza Dash', description: 'Fun run game – shared 500 times',
      prompt: '', code: '', thumbnailUrl: 'https://images.unsplash.com/photo-1579309401389-a240d4c3e083?q=80&w=600&auto=format&fit=crop',
      views: 5400, earnings: 20.50, author: 'Alex', tags: ['#Casual', '#AI'], isMonetized: true, createdAt: Date.now()
    },
    {
      id: '2', title: 'Space Cat Rescue', description: 'Jump & collect. Simple & addictive.',
      prompt: '', code: '', thumbnailUrl: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=600&auto=format&fit=crop',
      views: 1200, earnings: 5.00, author: 'Sarah', tags: ['#Jump', '#Cute'], isMonetized: true, createdAt: Date.now()
    },
    {
      id: '3', title: 'Neon Puzzle Block', description: 'Classic vibe with a twist.',
      prompt: '', code: '', thumbnailUrl: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=600&auto=format&fit=crop',
      views: 300, earnings: 0, author: 'Mike', tags: ['#Puzzle', '#Retro'], isMonetized: false, createdAt: Date.now()
    },
    {
      id: '4', title: 'Dino Skater 3000', description: 'Physics fun. Built in 45s.',
      prompt: '', code: '', thumbnailUrl: 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?q=80&w=600&auto=format&fit=crop',
      views: 8900, earnings: 42.00, author: 'Jen', tags: ['#Skate', '#Physics'], isMonetized: true, createdAt: Date.now()
    }
  ];

  const quickPrompts = [
      { emoji: '🧟', label: 'Casual Fun', text: 'Zombies vs. pizza runner' },
      { emoji: '🚀', label: 'Adventure', text: 'Space rocket dodging asteroids' },
      { emoji: '🎮', label: 'Puzzle', text: 'Neon block matching puzzle' }
  ];

  return (
    <div className="relative min-h-screen pt-32 flex flex-col items-center bg-hero-glow overflow-x-hidden">
      
      {/* 0. Live Badge */}
      <div className="relative z-10 mb-8 animate-fade-in-up">
        <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 shadow-[0_0_15px_rgba(0,0,0,0.3)]">
           <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-accent opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-brand-accent"></span>
           </span>
           <span className="text-[10px] font-bold tracking-widest uppercase text-slate-300">Live • Zero Code Required</span>
        </div>
      </div>

      {/* 2. Headlines */}
      <div className="relative z-10 text-center px-6 max-w-5xl mx-auto mb-12 animate-fade-in-up" style={{animationDelay: '0.1s'}}>
          <h1 className="text-6xl md:text-8xl font-bold font-rajdhani text-white mb-6 leading-[0.85] tracking-tight drop-shadow-2xl">
            Prompt. Play. Earn.<br/>
            {/* Moving Gradient Text */}
            <span className="bg-shimmer-gradient bg-[length:200%_auto] animate-text-shimmer bg-clip-text text-transparent">
               In Under 60 Seconds.
            </span>
          </h1>
          <p className="text-lg md:text-xl text-slate-400 font-light leading-relaxed max-w-2xl mx-auto">
             The only platform where wild ideas become monetized arcade hits instantly.
             <span className="block mt-2 text-white opacity-90">
               We handle the code. You keep <span className="font-bold text-brand-accent border-b border-brand-accent/30 pb-0.5">70% of the revenue.</span>
             </span>
          </p>
      </div>

      {/* 3. Looping Proof + Interaction Area */}
      <div className="relative z-10 w-full max-w-2xl px-6 mb-24 animate-fade-in-up" style={{animationDelay: '0.2s'}}>
         
         {/* Animated Loop Visual (Subtle HUD style) */}
         <div className="flex justify-center mb-8">
            <div className="flex items-center gap-6 px-6 py-3 rounded-2xl bg-black/40 border border-white/5 backdrop-blur-sm shadow-xl">
                {/* Phase 0: Type */}
                <div className={`flex flex-col items-center gap-1 transition-all duration-500 ${loopPhase === 0 ? 'opacity-100 scale-105' : 'opacity-40 scale-95 grayscale'}`}>
                    <div className="w-8 h-8 rounded-lg bg-brand-cyan/20 flex items-center justify-center border border-brand-cyan/50">
                        <Zap size={16} className="text-brand-cyan" />
                    </div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-brand-cyan">Idea</span>
                </div>
                
                <div className="h-px w-8 bg-white/10"></div>

                {/* Phase 1: Build */}
                <div className={`flex flex-col items-center gap-1 transition-all duration-500 ${loopPhase === 1 ? 'opacity-100 scale-105' : 'opacity-40 scale-95 grayscale'}`}>
                    <div className="w-8 h-8 rounded-lg bg-purple-500/20 flex items-center justify-center border border-purple-500/50">
                        <Gamepad2 size={16} className="text-purple-400" />
                    </div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-purple-400">Build</span>
                </div>

                <div className="h-px w-8 bg-white/10"></div>

                 {/* Phase 2: Win */}
                <div className={`flex flex-col items-center gap-1 transition-all duration-500 ${loopPhase === 2 ? 'opacity-100 scale-105' : 'opacity-40 scale-95 grayscale'}`}>
                    <div className="w-8 h-8 rounded-lg bg-brand-accent/20 flex items-center justify-center border border-brand-accent/50">
                        <Sparkles size={16} className="text-brand-accent" />
                    </div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-brand-accent">Earn</span>
                </div>
            </div>
         </div>

         {/* Chat Bubble Input - "Human Designed" Polish */}
         <div className="relative group">
             {/* Glow behind */}
             <div className="absolute -inset-1 bg-gradient-to-r from-brand-cyan via-purple-500 to-brand-cyan rounded-[2.5rem] opacity-20 blur-lg group-hover:opacity-40 transition duration-1000"></div>
             
             <div className="relative bg-[#0a0f1e] rounded-[2rem] shadow-2xl p-2 pl-6 flex flex-col md:flex-row items-center gap-4 border border-white/10 ring-1 ring-white/5">
                <div className="flex-1 w-full py-2">
                   <div className="flex items-center gap-2 mb-1">
                      <Sparkles size={12} className="text-brand-cyan animate-pulse" />
                      <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">AI Game Architect</p>
                   </div>
                    <input 
                      type="text" 
                      placeholder='e.g. "Flappy Dragon vs Zombies"'
                      value={prompt}
                      onChange={(e) => setPrompt(e.target.value)}
                      className="w-full bg-transparent border-none text-white text-xl p-0 focus:ring-0 outline-none font-medium placeholder-slate-600 font-rajdhani"
                      onKeyDown={(e) => e.key === 'Enter' && onStartCreate(prompt)}
                    />
                </div>
                <button 
                  onClick={() => onStartCreate(prompt)}
                  className="w-full md:w-auto bg-white hover:bg-slate-200 text-black font-bold font-rajdhani text-lg px-8 py-4 rounded-[1.5rem] transition-all shadow-[0_0_20px_rgba(255,255,255,0.1)] hover:shadow-[0_0_30px_rgba(255,255,255,0.3)] flex items-center justify-center gap-2 group/btn relative overflow-hidden"
                >
                    <span className="relative z-10 flex items-center gap-2">GENERATE <Clock size={18} className="text-slate-900"/></span>
                </button>
             </div>
         </div>

         {/* Quick Start Buttons */}
         <div className="flex flex-wrap justify-center gap-3 mt-8">
            {quickPrompts.map((qp, i) => (
                <button 
                  key={i}
                  onClick={() => onStartCreate(qp.text)}
                  className="group flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/5 hover:border-white/20 transition-all duration-300"
                >
                    <span className="text-base group-hover:scale-125 transition-transform duration-300">{qp.emoji}</span> 
                    <span className="text-xs font-medium text-slate-400 group-hover:text-white">{qp.label}</span>
                </button>
            ))}
         </div>
      </div>

      {/* 4. Gallery Tease (Clean Cards) */}
      <div className="relative z-10 w-full max-w-7xl px-4 pb-20 animate-fade-in-up" style={{animationDelay: '0.3s'}}>
         <div className="flex items-end justify-between mb-8 px-4 border-b border-white/5 pb-6">
             <div>
               <h3 className="text-2xl font-rajdhani font-bold text-white mb-1">
                 Fresh from the Arcade
               </h3>
               <p className="text-sm text-slate-500">Real games generated by users in the last hour.</p>
             </div>
             <button className="hidden md:flex items-center gap-2 text-xs font-bold text-white bg-white/5 hover:bg-white/10 px-4 py-2 rounded-lg border border-white/5 transition-all">
                VIEW FULL GALLERY <ArrowRight size={14} />
             </button>
         </div>

         <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
             {dummyGames.map((game) => (
                 <div key={game.id} className="group bg-[#0a0f1e] rounded-xl overflow-hidden ring-1 ring-white/5 hover:ring-brand-cyan/50 transition-all duration-500 hover:shadow-[0_0_30px_rgba(6,182,212,0.15)] hover:-translate-y-1">
                     {/* Static Thumb */}
                     <div className="relative h-48 bg-black overflow-hidden cursor-pointer" onClick={() => onPlay(game)}>
                         <img src={game.thumbnailUrl} alt={game.title} className="w-full h-full object-cover opacity-60 group-hover:opacity-100 transition-all duration-500 group-hover:scale-105 filter grayscale group-hover:grayscale-0"/>
                         
                         <div className="absolute inset-0 bg-gradient-to-t from-[#0a0f1e] via-transparent to-transparent opacity-90"></div>
                         
                         {/* Play Overlay */}
                         <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                             <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center shadow-[0_0_20px_rgba(255,255,255,0.4)] transform scale-50 group-hover:scale-100 transition-all duration-300">
                                 <Play size={20} className="text-black ml-1 fill-black"/>
                             </div>
                         </div>
                         
                         {/* Earning Badge */}
                         {game.isMonetized && (
                            <div className="absolute top-3 right-3 bg-black/80 backdrop-blur px-2 py-1 rounded-md text-[10px] font-bold text-brand-accent border border-brand-accent/20 flex items-center gap-1 shadow-lg">
                                <span className="w-1.5 h-1.5 rounded-full bg-brand-accent animate-pulse"></span>
                                ${game.earnings.toFixed(0)} earned
                            </div>
                         )}
                     </div>

                     <div className="p-5">
                         <h4 className="font-bold font-rajdhani text-lg text-white leading-none mb-2 truncate group-hover:text-brand-cyan transition-colors">{game.title}</h4>
                         <p className="text-[11px] text-slate-400 mb-4 line-clamp-1">{game.description}</p>
                         
                         <div className="flex gap-2 border-t border-white/5 pt-4">
                             <button onClick={() => onStartCreate(`${game.title} Remix`)} className="flex-1 text-[10px] font-bold text-slate-400 hover:text-white transition-colors uppercase tracking-wider text-left">REMIX IDEA</button>
                             <button onClick={() => onPlay(game)} className="text-[10px] font-bold text-brand-cyan hover:text-brand-glow transition-colors uppercase tracking-wider">PLAY NOW</button>
                         </div>
                     </div>
                 </div>
             ))}
         </div>
      </div>

    </div>
  );
};

export default Hero;
