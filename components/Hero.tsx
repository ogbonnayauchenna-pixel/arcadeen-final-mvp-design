
import React, { useState, useEffect } from 'react';
import { Lightbulb, Gamepad2, Share2, Sparkles, ArrowRight, Play, Clock, Heart } from 'lucide-react';
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
    <div className="relative min-h-screen pt-28 flex flex-col items-center bg-hero-glow overflow-x-hidden">
      
      {/* 1. Visual Flow (Idea -> Game -> Share) */}
      <div className="relative z-10 flex flex-col md:flex-row items-center justify-center gap-6 md:gap-16 mb-12 animate-fade-in-up">
          {/* Step 1 */}
          <div className="flex flex-col items-center gap-3 group">
             <div className="w-14 h-14 rounded-full bg-brand-surface border border-brand-cyan/20 shadow-[0_0_20px_rgba(6,182,212,0.1)] flex items-center justify-center animate-float">
                <Lightbulb size={24} className="text-yellow-400" />
             </div>
             <span className="text-xs font-bold uppercase tracking-widest text-slate-500">Idea</span>
          </div>
          
          {/* Connector */}
          <div className="hidden md:block w-20 h-px bg-gradient-to-r from-transparent via-brand-cyan/40 to-transparent relative">
             <div className="absolute top-1/2 left-0 -translate-y-1/2 w-2 h-2 rounded-full bg-brand-cyan blur-sm animate-pulse"></div>
          </div>
          <div className="md:hidden h-8 w-px bg-gradient-to-b from-transparent via-brand-cyan/40 to-transparent"></div>

          {/* Step 2 */}
          <div className="flex flex-col items-center gap-3 group">
             <div className="w-14 h-14 rounded-full bg-brand-surface border border-brand-cyan/20 shadow-[0_0_20px_rgba(6,182,212,0.1)] flex items-center justify-center animate-float-delayed">
                <Gamepad2 size={24} className="text-brand-cyan" />
             </div>
             <span className="text-xs font-bold uppercase tracking-widest text-slate-500">Game</span>
          </div>

           {/* Connector */}
           <div className="hidden md:block w-20 h-px bg-gradient-to-r from-transparent via-brand-cyan/40 to-transparent relative"></div>
           <div className="md:hidden h-8 w-px bg-gradient-to-b from-transparent via-brand-cyan/40 to-transparent"></div>


          {/* Step 3 */}
          <div className="flex flex-col items-center gap-3 group">
             <div className="w-14 h-14 rounded-full bg-brand-surface border border-brand-cyan/20 shadow-[0_0_20px_rgba(6,182,212,0.1)] flex items-center justify-center animate-float">
                <Share2 size={24} className="text-green-400" />
             </div>
             <span className="text-xs font-bold uppercase tracking-widest text-slate-500">Share</span>
          </div>
      </div>

      {/* 2. Headlines */}
      <div className="relative z-10 text-center px-6 max-w-4xl mx-auto mb-10 animate-fade-in-up" style={{animationDelay: '0.1s'}}>
          <h1 className="text-5xl md:text-7xl font-bold font-rajdhani text-white mb-6 leading-[0.9] tracking-tight">
            Turn Ideas into Games<br/>
            <span className="text-brand-cyan">No Code Needed.</span>
          </h1>
          <p className="text-lg md:text-xl text-slate-300 font-light leading-relaxed max-w-2xl mx-auto">
             Chat your vibe, play in <span className="font-semibold text-white">60 seconds</span>. Share with friends and watch it grow 
             <span className="block mt-1 text-sm text-brand-cyan opacity-80">(plus keep 70% if it earns)</span>
          </p>
      </div>

      {/* 3. Looping Proof + Interaction Area */}
      <div className="relative z-10 w-full max-w-xl px-6 mb-24 animate-fade-in-up" style={{animationDelay: '0.2s'}}>
         
         {/* Animated Loop Visual (Above Prompt) */}
         <div className="flex justify-center mb-6">
            <div className="flex items-center gap-3 bg-white/5 px-4 py-2 rounded-full border border-white/5 backdrop-blur-sm">
                {/* Phase 0: Type */}
                <div className={`transition-all duration-500 ${loopPhase === 0 ? 'opacity-100 scale-110 text-brand-cyan' : 'opacity-30 scale-90 text-slate-500'}`}>
                    <span className="text-xs font-mono font-bold">"Ninja Cat..."</span>
                </div>
                {/* Arrow */}
                <ArrowRight size={12} className="text-slate-600" />
                {/* Phase 1: Build */}
                <div className={`transition-all duration-500 ${loopPhase === 1 ? 'opacity-100 scale-110 text-yellow-400' : 'opacity-30 scale-90 text-slate-500'}`}>
                    <Gamepad2 size={16} />
                </div>
                {/* Arrow */}
                <ArrowRight size={12} className="text-slate-600" />
                 {/* Phase 2: Win */}
                <div className={`transition-all duration-500 ${loopPhase === 2 ? 'opacity-100 scale-110 text-green-400' : 'opacity-30 scale-90 text-slate-500'}`}>
                    <Heart size={16} fill="currentColor" />
                </div>
            </div>
         </div>

         {/* Chat Bubble Input */}
         <div className="relative group">
             {/* Glow behind */}
             <div className="absolute -inset-0.5 bg-gradient-to-r from-brand-cyan to-blue-600 rounded-[2rem] opacity-20 blur group-hover:opacity-40 transition duration-1000"></div>
             
             <div className="relative bg-brand-surface rounded-[2rem] shadow-2xl p-3 flex flex-col md:flex-row items-center gap-2 border border-white/10">
                <div className="flex-1 w-full pl-4 py-2">
                    <p className="text-[10px] text-brand-cyan font-bold uppercase tracking-wider mb-1">What's your game spark?</p>
                    <input 
                      type="text" 
                      placeholder='Like "Zombies vs. pizza"?'
                      value={prompt}
                      onChange={(e) => setPrompt(e.target.value)}
                      className="w-full bg-transparent border-none text-white text-lg p-0 focus:ring-0 outline-none font-inter placeholder-slate-600"
                      onKeyDown={(e) => e.key === 'Enter' && onStartCreate(prompt)}
                    />
                </div>
                <button 
                  onClick={() => onStartCreate(prompt)}
                  className="w-full md:w-auto bg-brand-cyan hover:bg-cyan-400 text-black font-bold font-rajdhani text-lg px-8 py-4 rounded-full transition-all shadow-lg hover:shadow-cyan-500/30 flex items-center justify-center gap-2 group/btn"
                >
                    Build Your First Game <ArrowRight size={18} className="group-hover/btn:translate-x-1 transition-transform" />
                </button>
             </div>
         </div>

         {/* Quick Start Buttons + Timer */}
         <div className="flex flex-col md:flex-row items-center justify-between gap-4 mt-6 px-4">
             <div className="flex flex-wrap justify-center gap-2">
                {quickPrompts.map((qp, i) => (
                    <button 
                      key={i}
                      onClick={() => onStartCreate(qp.text)}
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/5 hover:bg-white/10 border border-white/5 transition-colors text-xs text-slate-300 hover:text-white"
                    >
                        <span>{qp.emoji}</span> {qp.label}
                    </button>
                ))}
             </div>
             
             <div className="flex items-center gap-2 text-slate-500 text-xs font-mono bg-black/20 px-3 py-1 rounded-full">
                 <Clock size={12} className="text-brand-cyan animate-pulse" />
                 &lt;60s setup
             </div>
         </div>
      </div>

      {/* 4. Gallery Tease (Clean Cards) */}
      <div className="relative z-10 w-full max-w-6xl px-4 pb-20 animate-fade-in-up" style={{animationDelay: '0.3s'}}>
         <div className="flex items-center justify-between mb-8 px-2 border-b border-white/5 pb-4">
             <h3 className="text-xl font-rajdhani font-bold text-white flex items-center gap-2">
               <Sparkles size={16} className="text-yellow-400" /> 
               Inspired by Creators
             </h3>
             <button className="text-sm text-slate-400 hover:text-brand-cyan transition-colors">View Gallery →</button>
         </div>

         <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
             {dummyGames.map((game) => (
                 <div key={game.id} className="group bg-brand-surface border border-white/5 rounded-xl overflow-hidden hover:border-brand-cyan/30 transition-all duration-300 hover:shadow-lg">
                     {/* Static Thumb */}
                     <div className="relative h-32 md:h-40 bg-black overflow-hidden cursor-pointer" onClick={() => onPlay(game)}>
                         <img src={game.thumbnailUrl} alt={game.title} className="w-full h-full object-cover opacity-70 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500"/>
                         
                         {/* Play Overlay */}
                         <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/40">
                             <div className="w-10 h-10 rounded-full bg-white/90 flex items-center justify-center shadow-lg transform scale-75 group-hover:scale-100 transition-transform">
                                 <Play size={16} className="text-black ml-1"/>
                             </div>
                         </div>
                         
                         {/* Earning Badge (Subtle) */}
                         {game.isMonetized && (
                            <div className="absolute top-2 right-2 bg-black/60 backdrop-blur px-1.5 py-0.5 rounded text-[10px] font-bold text-green-400 border border-green-500/20">
                                ${game.earnings.toFixed(0)}
                            </div>
                         )}
                     </div>

                     <div className="p-4">
                         <h4 className="font-bold font-rajdhani text-base text-white leading-tight mb-1 truncate">{game.title}</h4>
                         <p className="text-[10px] text-slate-400 mb-3 line-clamp-1">{game.description}</p>
                         
                         <div className="flex gap-2 mt-auto">
                             <button onClick={() => onStartCreate(`${game.title} Remix`)} className="flex-1 text-[10px] font-bold bg-white/5 hover:bg-white/10 text-slate-300 py-1.5 rounded transition-colors uppercase">Remix</button>
                             <button onClick={() => onPlay(game)} className="flex-1 text-[10px] font-bold bg-brand-cyan/10 hover:bg-brand-cyan text-brand-cyan hover:text-black py-1.5 rounded transition-colors uppercase">Play</button>
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
