import React from 'react';
import { Gamepad2, Menu, X, User as UserIcon } from 'lucide-react';
import { User } from '../types';

interface NavbarProps {
  user: User | null;
  onNavigate: (page: string) => void;
  currentPage: string;
  onJoinWaitlist: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ user, onNavigate, currentPage, onJoinWaitlist }) => {
  const [isOpen, setIsOpen] = React.useState(false);

  const navItems = [
    { label: 'Create', id: 'create' },
    { label: 'Gallery', id: 'gallery' },
    { label: 'Pricing', id: 'pricing' },
  ];

  const handleNav = (id: string) => {
    onNavigate(id);
    setIsOpen(false);
  };

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-brand-dark/80 backdrop-blur-md border-b border-white/5">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-between h-20 relative">
          
          {/* Logo (Left) */}
          <div 
            className="flex-shrink-0 flex items-center cursor-pointer group z-20 gap-2"
            onClick={() => handleNav('home')}
          >
            <div className="relative flex items-center justify-center">
               <div className="absolute inset-0 bg-brand-cyan blur-lg opacity-40 group-hover:opacity-60 transition-opacity"></div>
               <Gamepad2 className="h-8 w-8 text-brand-cyan relative z-10" />
            </div>
            <span className="text-2xl font-bold font-rajdhani text-white tracking-wide">
              Arcadeen
            </span>
          </div>

          {/* Desktop Nav (Centered) */}
          <div className="hidden md:flex absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 items-center gap-12">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNav(item.id)}
                className={`text-sm font-medium transition-colors duration-300 font-inter ${
                  currentPage === item.id 
                    ? 'text-brand-cyan' 
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>

          {/* Auth / User (Right) */}
          <div className="hidden md:flex items-center gap-4 z-20">
            {user ? (
              <button
                onClick={() => handleNav('dashboard')}
                className="flex items-center gap-3 pl-2 pr-4 py-1.5 rounded-full border border-white/10 bg-white/5 hover:bg-white/10 transition-all"
              >
                <div className="w-8 h-8 rounded-full bg-brand-cyan/20 flex items-center justify-center text-brand-cyan">
                    <UserIcon size={14} />
                </div>
                <span className="font-medium text-sm text-white">{user.name}</span>
              </button>
            ) : (
              <button
                onClick={onJoinWaitlist}
                className="px-6 py-2.5 rounded-full bg-white text-black font-semibold text-sm hover:bg-brand-cyan transition-colors duration-300"
              >
                Join Waitlist
              </button>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden z-20">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-white hover:text-brand-cyan focus:outline-none"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-brand-dark absolute w-full h-screen z-50 top-0 left-0 pt-24 px-6">
           <div className="absolute top-6 right-6">
             <button onClick={() => setIsOpen(false)}><X size={24} className="text-white"/></button>
           </div>
           
           <div className="space-y-6">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNav(item.id)}
                className="block w-full text-left text-2xl font-bold font-rajdhani text-white hover:text-brand-cyan transition-colors"
              >
                {item.label}
              </button>
            ))}
             <button
                onClick={() => {
                  onJoinWaitlist();
                  setIsOpen(false);
                }}
                className="block w-full mt-8 py-4 bg-brand-cyan text-black text-center font-bold font-rajdhani rounded-lg"
              >
                {user ? 'Dashboard' : 'Join Waitlist'}
              </button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;