import React, { useState } from 'react';
import { Play, Repeat, TrendingUp, Eye } from 'lucide-react';
import { Game } from '../types';

interface GameCardProps {
  game: Game;
  onPlay: (game: Game) => void;
  onRemix?: (game: Game) => void;
}

const GameCard: React.FC<GameCardProps> = ({ game, onPlay, onRemix }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div 
      className="group relative h-[420px] w-full rounded-2xl overflow-hidden bg-[#0A0A0A] border border-white/5 transition-all duration-500 hover:border-brand-cyan/30 hover:-translate-y-1 hover:shadow-2xl"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Media Layer */}
      <div className="absolute inset-0 bg-black">
        {/* Static Thumbnail */}
        <img 
          src={game.thumbnailUrl} 
          alt={game.title} 
          className={`w-full h-full object-cover transition-all duration-700 grayscale group-hover:grayscale-0 ${isHovered ? 'opacity-0' : 'opacity-60 group-hover:opacity-100'}`}
        />
        
        {/* Animated GIF Preview - Only loads/shows on hover for performance */}
        {isHovered && (
          <div className="absolute inset-0 bg-black animate-fade-in">
             <img 
              src={game.previewGif || game.thumbnailUrl} 
              alt={`${game.title} preview`}
              className="w-full h-full object-cover opacity-90"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent"></div>
          </div>
        )}
      </div>

      {/* Stats Badge (Top Right) */}
      <div className="absolute top-4 right-4 z-20 flex flex-col items-end gap-2">
         <div className="bg-black/80 backdrop-blur-md border border-brand-accent/20 px-3 py-1.5 rounded-lg flex items-center gap-2 shadow-lg">
            <TrendingUp size={14} className="text-brand-accent" />
            <span className="text-sm font-mono font-bold text-brand-accent">${game.earnings.toFixed(0)}</span>
         </div>
      </div>

      {/* Info Layer (Always Visible, moves up on hover) */}
      <div className="absolute bottom-0 left-0 w-full p-6 bg-gradient-to-t from-black via-black/95 to-transparent pt-24 transition-transform duration-500 z-10 translate-y-0">
        <div className="transition-all duration-300 group-hover:-translate-y-2">
            <h3 className="text-3xl font-bold font-rajdhani text-white mb-2 uppercase tracking-tight leading-none drop-shadow-lg group-hover:text-brand-cyan transition-colors">{game.title}</h3>
            <p className="text-slate-400 text-xs font-inter line-clamp-1 mb-4 opacity-80">{game.description}</p>
            
            <div className="flex items-center gap-3 text-[10px] uppercase font-bold tracking-widest text-slate-500 mb-4">
                <span className="flex items-center gap-1"><Eye size={10} /> {game.views.toLocaleString()} Plays</span>
                <span>•</span>
                <span>{game.author}</span>
            </div>
        </div>

        {/* Action Buttons (Reveal on Hover) */}
        <div className={`grid grid-cols-2 gap-3 transition-all duration-500 ${isHovered ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'}`}>
             <button 
                onClick={(e) => { e.stopPropagation(); onRemix && onRemix(game); }}
                className="bg-white/10 hover:bg-white text-white hover:text-black font-bold font-rajdhani uppercase tracking-widest py-3 rounded-lg flex items-center justify-center gap-2 transition-all border border-white/10"
             >
                <Repeat size={14} /> Remix
             </button>
             <button 
                onClick={(e) => { e.stopPropagation(); onPlay(game); }}
                className="bg-brand-cyan hover:bg-white text-black font-bold font-rajdhani uppercase tracking-widest py-3 rounded-lg flex items-center justify-center gap-2 transition-colors shadow-glow"
             >
                <Play size={14} fill="black" /> Play
             </button>
        </div>
      </div>
    </div>
  );
};

export default GameCard;