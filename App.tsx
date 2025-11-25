import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Generator from './components/Generator';
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

  return (
    <div className="min-h-screen bg-slate-950 text-white font-inter selection:bg-cyan-500 selection:text-black">
      <Navbar 
        user={user} 
        onNavigate={navigate} 
        currentPage={currentPage} 
        onJoinWaitlist={handleJoinWaitlist}
      />
      
      {isLoading && (
        <div className="fixed inset-0 z-[100] bg-slate-950/80 backdrop-blur flex items-center justify-center">
            <Loader2 className="w-10 h-10 text-cyan-400 animate-spin" />
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
        
        {currentPage === 'create' && (
            <Generator initialPrompt={initialPrompt} onSaveGame={handleSaveGame} />
        )}

        {currentPage === 'pricing' && (
            <Pricing />
        )}

        {currentPage === 'gallery' && (
             <div className="min-h-screen pt-24 px-4 bg-slate-950 text-center">
                 <h2 className="text-4xl font-rajdhani font-bold mb-4 uppercase text-white">Public Gallery</h2>
                 <p className="text-slate-400 mb-8">Discover games created by the community.</p>
                 <div className="max-w-7xl mx-auto h-96 flex items-center justify-center border-2 border-dashed border-slate-800 rounded-xl bg-slate-900/50">
                     <p className="text-slate-600 font-mono">Infinite Scroll Component Loading...</p>
                 </div>
             </div>
        )}

        {currentPage === 'dashboard' && user && (
            <div className="min-h-screen pt-28 px-4 max-w-7xl mx-auto pb-20">
                <div className="flex flex-wrap justify-between items-end mb-12 gap-4">
                    <div>
                        <h1 className="text-4xl md:text-5xl font-rajdhani font-bold text-white uppercase tracking-tighter">My Arcade</h1>
                        <p className="text-slate-400 mt-2">Welcome back, <span className="text-cyan-400">{user.name}</span></p>
                    </div>
                    <div className="bg-slate-900 border border-slate-800 p-4 rounded-xl flex items-center gap-6 shadow-lg">
                        <div>
                            <p className="text-xs text-slate-500 uppercase font-bold tracking-widest">Total Earnings</p>
                            <p className="text-3xl font-mono text-green-400 font-bold">$0.00</p>
                        </div>
                        <div className="h-8 w-px bg-slate-800"></div>
                        <div>
                            <p className="text-xs text-slate-500 uppercase font-bold tracking-widest">Games</p>
                            <p className="text-3xl font-mono text-white font-bold">{myGames.length}</p>
                        </div>
                    </div>
                </div>

                <div className="mb-10">
                   <button 
                     onClick={() => navigate('create')}
                     className="bg-cyan-500 hover:bg-cyan-400 text-black font-bold font-rajdhani px-8 py-4 rounded uppercase tracking-widest shadow-[0_0_20px_rgba(34,211,238,0.4)] transition-all"
                   >
                     + Create New Game
                   </button>
                </div>

                <h3 className="text-2xl font-bold font-rajdhani uppercase tracking-wide mb-6 text-white border-b border-white/10 pb-4">Recent Creations</h3>
                
                {myGames.length === 0 ? (
                    <div className="text-center py-32 bg-slate-900/30 rounded-xl border border-dashed border-slate-800">
                        <p className="text-slate-500 text-lg mb-4">You haven't built any games yet.</p>
                        <button onClick={() => navigate('create')} className="text-cyan-400 hover:text-white underline font-bold">Start your first project</button>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                         {myGames.map(game => (
                             <div key={game.id} className="group bg-slate-900 border border-slate-800 rounded-xl overflow-hidden hover:border-cyan-500/50 transition-all shadow-xl hover:shadow-cyan-500/10 cursor-pointer" 
                                  onClick={() => {
                                      setInitialPrompt(game.prompt); 
                                      navigate('create');
                                  }}>
                                 <div className="h-40 bg-slate-950 relative overflow-hidden">
                                     <iframe srcDoc={game.code} className="w-[200%] h-[200%] opacity-50 pointer-events-none scale-50 origin-top-left" title="thumb" />
                                     <div className="absolute inset-0 bg-gradient-to-t from-slate-900 to-transparent"></div>
                                 </div>
                                 <div className="p-4">
                                     <h4 className="font-bold text-white truncate font-rajdhani text-lg uppercase">{game.title}</h4>
                                     <div className="flex justify-between mt-3 text-xs">
                                         <span className="text-slate-400">{game.views} plays</span>
                                         <span className={`font-bold ${game.isMonetized ? "text-green-400" : "text-slate-600"}`}>
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

      <footer className="bg-slate-950 border-t border-slate-900 py-12 mt-auto">
        <div className="max-w-7xl mx-auto px-4 text-center">
            <p className="text-slate-500 text-sm font-rajdhani uppercase tracking-widest">© 2024 Arcadeen. AI Game Generator.</p>
        </div>
      </footer>
    </div>
  );
}

export default App;