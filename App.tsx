import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Studio from './components/Studio';
import Pricing from './components/Pricing';
import { User, Game } from './types';
import { Loader2 } from 'lucide-react';

const MOCK_USER: User = {
  id: 'u1',
  name: 'CreatorOne',
  email: 'user@arcadeen.com',
  totalEarnings: 0,
  gamesCreated: 0,
  plan: 'free'
};

function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [user, setUser] = useState<User | null>(null);
  const [initialPrompt, setInitialPrompt] = useState('');
  const [myGames, setMyGames] = useState<Game[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isWaitlistOpen, setIsWaitlistOpen] = useState(false);

  const navigate = (page: string) => {
    setIsLoading(true);
    // Simulate navigation lag for effect
    setTimeout(() => {
        if (page === 'login') {
            setUser(MOCK_USER);
            setCurrentPage('dashboard');
        } else if (page === 'logout') {
            setUser(null);
            setCurrentPage('home');
        } else {
            setCurrentPage(page);
        }
        setIsLoading(false);
        window.scrollTo(0,0);
    }, 300);
  };

  const handleStartCreate = (prompt?: string) => {
      if (prompt) setInitialPrompt(prompt);
      navigate('create');
  };

  const handleSaveGame = (game: Game) => {
      setMyGames(prev => [game, ...prev]);
      if (user) {
          setUser({...user, gamesCreated: user.gamesCreated + 1});
      } else {
          // Auto login on save for demo
          setUser({...MOCK_USER, gamesCreated: 1});
      }
      navigate('dashboard');
  };

  const handlePlayGame = (game: Game) => {
      alert(`Launching ${game.title}...\n(In full version, this opens the dedicated game player page)`);
  };

  const handleJoinWaitlist = () => {
      if (currentPage !== 'home') {
          navigate('home');
      }
      // Small timeout to allow navigation to settle if changing pages
      setTimeout(() => setIsWaitlistOpen(true), currentPage !== 'home' ? 400 : 0);
  };

  // Full Screen Studio Mode Check
  if (currentPage === 'create') {
      return (
          <Studio 
            initialPrompt={initialPrompt} 
            onSaveGame={handleSaveGame} 
            onExit={() => navigate('dashboard')} 
          />
      );
  }

  return (
    <div className="min-h-screen bg-brand-dark text-white font-inter selection:bg-brand-cyan selection:text-black">
      <Navbar 
        user={user} 
        onNavigate={navigate} 
        currentPage={currentPage} 
        onJoinWaitlist={handleJoinWaitlist}
      />
      
      {isLoading && (
        <div className="fixed inset-0 z-[100] bg-black/90 backdrop-blur flex items-center justify-center">
            <Loader2 className="w-10 h-10 text-brand-cyan animate-spin" />
        </div>
      )}

      <main className="fade-in">
        {currentPage === 'home' && (
            <Hero 
                onStartCreate={handleStartCreate} 
                onPlay={handlePlayGame} 
                isWaitlistOpen={isWaitlistOpen}
                setIsWaitlistOpen={setIsWaitlistOpen}
            />
        )}

        {currentPage === 'pricing' && (
            <Pricing />
        )}

        {currentPage === 'gallery' && (
             <div className="min-h-screen pt-24 px-4 bg-brand-dark text-center">
                 <h2 className="text-4xl font-rajdhani font-bold mb-4 uppercase text-white tracking-widest">Public Gallery</h2>
                 <p className="text-slate-400 mb-8 font-light">Discover games created by the community.</p>
                 <div className="max-w-7xl mx-auto h-96 flex items-center justify-center border border-white/5 rounded-xl bg-white/5">
                     <p className="text-slate-600 font-mono text-sm">Infinite Scroll Component Loading...</p>
                 </div>
             </div>
        )}

        {currentPage === 'dashboard' && user && (
            <div className="min-h-screen pt-28 px-4 max-w-7xl mx-auto pb-20">
                <div className="flex flex-wrap justify-between items-end mb-12 gap-4">
                    <div>
                        <h1 className="text-4xl md:text-5xl font-rajdhani font-bold text-white uppercase tracking-tighter">My Arcade</h1>
                        <p className="text-slate-400 mt-2">Welcome back, <span className="text-brand-cyan">{user.name}</span></p>
                    </div>
                    <div className="bg-[#0A0A0A] border border-white/5 p-4 rounded-xl flex items-center gap-6 shadow-lg">
                        <div>
                            <p className="text-[10px] text-slate-500 uppercase font-bold tracking-widest">Total Earnings</p>
                            <p className="text-3xl font-mono text-brand-accent font-bold">$0.00</p>
                        </div>
                        <div className="h-8 w-px bg-white/10"></div>
                        <div>
                            <p className="text-[10px] text-slate-500 uppercase font-bold tracking-widest">Games</p>
                            <p className="text-3xl font-mono text-white font-bold">{myGames.length}</p>
                        </div>
                    </div>
                </div>

                <div className="mb-10">
                   <button 
                     onClick={() => navigate('create')}
                     className="bg-brand-cyan hover:bg-white text-black font-bold font-rajdhani px-8 py-4 rounded uppercase tracking-widest shadow-glow transition-all"
                   >
                     + Create New Game
                   </button>
                </div>

                <h3 className="text-xl font-bold font-rajdhani uppercase tracking-widest mb-6 text-white border-b border-white/10 pb-4">Recent Creations</h3>
                
                {myGames.length === 0 ? (
                    <div className="text-center py-32 bg-white/5 rounded-xl border border-dashed border-white/10">
                        <p className="text-slate-500 text-lg mb-4">You haven't built any games yet.</p>
                        <button onClick={() => navigate('create')} className="text-brand-cyan hover:text-white underline font-bold text-sm uppercase tracking-wider">Start your first project</button>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                         {myGames.map(game => (
                             <div key={game.id} className="group bg-[#0A0A0A] border border-white/5 rounded-xl overflow-hidden hover:border-brand-cyan/50 transition-all shadow-xl hover:shadow-glow cursor-pointer" 
                                  onClick={() => {
                                      setInitialPrompt(game.prompt); 
                                      navigate('create');
                                  }}>
                                 <div className="h-40 bg-black relative overflow-hidden">
                                     <iframe srcDoc={game.code} className="w-[200%] h-[200%] opacity-50 pointer-events-none scale-50 origin-top-left" title="thumb" />
                                     <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] to-transparent"></div>
                                 </div>
                                 <div className="p-4">
                                     <h4 className="font-bold text-white truncate font-rajdhani text-lg uppercase">{game.title}</h4>
                                     <div className="flex justify-between mt-3 text-xs">
                                         <span className="text-slate-400">{game.views} plays</span>
                                         <span className={`font-bold ${game.isMonetized ? "text-brand-accent" : "text-slate-600"}`}>
                                             {game.isMonetized ? "MONETIZED" : "DRAFT"}
                                         </span>
                                     </div>
                                 </div>
                             </div>
                         ))}
                    </div>
                )}
            </div>
        )}
      </main>

      {currentPage !== 'create' && (
        <footer className="bg-black border-t border-white/5 py-12 mt-auto">
            <div className="max-w-7xl mx-auto px-4 text-center">
                <p className="text-slate-600 text-xs font-rajdhani uppercase tracking-widest">© 2024 Arcadeen. AI Game Generator.</p>
            </div>
        </footer>
      )}
    </div>
  );
}

export default App;