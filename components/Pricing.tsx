import React from 'react';
import { Check, Zap, Infinity, Crown } from 'lucide-react';
import { Plan } from '../types';

const plans: Plan[] = [
  {
    id: 'free',
    name: 'Player',
    price: '$0',
    features: ['3 AI Games / Month', 'Standard Generation Speed', '70% Revenue Share', 'Community Access'],
    highlight: false
  },
  {
    id: 'pro',
    name: 'Creator Pro',
    price: '$19',
    features: ['Unlimited Games', 'Priority Fast Generation', '80% Revenue Share', 'Custom Branding', 'Analytics Dashboard'],
    highlight: true
  },
  {
    id: 'lifetime',
    name: 'Founder',
    price: '$149',
    features: ['Lifetime Access (One-time)', 'Everything in Pro', '90% Revenue Share (Year 1)', 'Early Access to New Models', 'Founder Badge'],
    highlight: false
  }
];

const Pricing: React.FC = () => {
  return (
    <div className="py-24 px-4 bg-slate-950">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-6xl font-rajdhani font-bold text-white mb-4 uppercase tracking-tighter">
            Unlock Endless <span className="text-cyan-400">Earnings</span>
          </h2>
          <p className="text-slate-400 text-lg">Monetize your creativity instantly. No hidden fees.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
          {plans.map((plan) => (
            <div 
              key={plan.id}
              className={`relative bg-slate-900 rounded-2xl p-8 border transition-all duration-300 ${plan.highlight ? 'border-cyan-500 shadow-[0_0_40px_rgba(34,211,238,0.15)] scale-110 z-10' : 'border-slate-800 hover:border-slate-700'}`}
            >
              {plan.highlight && (
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-cyan-500 text-black font-bold px-4 py-1 rounded-full text-xs uppercase tracking-widest shadow-lg flex items-center gap-1">
                  <Zap size={12} fill="black"/> Most Popular
                </div>
              )}

              {plan.id === 'lifetime' && (
                  <div className="absolute top-0 right-0 p-4 opacity-50 text-yellow-500">
                      <Crown size={32} />
                  </div>
              )}
              
              <h3 className="text-2xl font-bold font-rajdhani text-white mb-2 uppercase">{plan.name}</h3>
              <div className="flex items-baseline mb-6">
                <span className="text-5xl font-bold text-white tracking-tighter">{plan.price}</span>
                {plan.id !== 'lifetime' && <span className="text-slate-500 ml-1 font-mono text-sm">/mo</span>}
              </div>
              
              <ul className="space-y-4 mb-8">
                {plan.features.map((feat, idx) => (
                  <li key={idx} className="flex items-start text-slate-300 text-sm">
                    <div className={`mr-3 mt-0.5 p-1 rounded-full flex-shrink-0 ${plan.highlight ? 'bg-cyan-500/20 text-cyan-400' : 'bg-slate-800 text-slate-500'}`}>
                      <Check size={10} strokeWidth={3} />
                    </div>
                    {feat}
                  </li>
                ))}
              </ul>

              <button className={`w-full py-4 rounded font-bold font-rajdhani uppercase tracking-wider transition-all shadow-lg ${
                plan.highlight 
                  ? 'bg-cyan-500 hover:bg-cyan-400 text-black hover:shadow-cyan-500/40' 
                  : 'bg-slate-800 hover:bg-slate-700 text-white hover:text-cyan-400'
              }`}>
                Choose {plan.name}
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Pricing;