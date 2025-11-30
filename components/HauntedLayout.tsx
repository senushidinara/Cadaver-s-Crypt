import React from 'react';
import { ViewState } from '../types';
import { Ghost, Beaker, Skull } from 'lucide-react';

interface HauntedLayoutProps {
  children: React.ReactNode;
  currentView: ViewState;
  setView: (view: ViewState) => void;
}

const HauntedLayout: React.FC<HauntedLayoutProps> = ({ children, currentView, setView }) => {
  return (
    <div className="min-h-screen bg-coffin-black text-ghost-white overflow-hidden relative selection:bg-blood-red selection:text-white">
      {/* Ambient Effects */}
      <div className="fixed inset-0 pointer-events-none z-0">
         {/* Vignette */}
         <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,_transparent_0%,_#000000_120%)]"></div>
         {/* Flickering Light Overlay */}
         <div className="absolute inset-0 bg-black/10 animate-flicker mix-blend-overlay"></div>
         {/* Fog Animation (Simple CSS translation) */}
         <div className="absolute inset-0 bg-[url('https://raw.githubusercontent.com/transparenttextures/patterns/master/patterns/foggy-birds.png')] opacity-10 animate-float bg-repeat"></div>
      </div>

      {/* Navigation */}
      <nav className="relative z-50 h-16 border-b border-gray-800 bg-black/80 backdrop-blur-md flex items-center justify-between px-6">
         <div className="flex items-center gap-3">
             <Skull className="w-8 h-8 text-blood-red animate-pulse-slow" />
             <h1 className="text-2xl font-spooky text-ghost-white tracking-widest text-shadow-red">Cadaver's Crypt</h1>
         </div>
         
         <div className="flex items-center gap-1 md:gap-4">
             <button 
                onClick={() => setView(ViewState.LAB)}
                className={`px-4 py-2 rounded font-gothic tracking-wide transition-all ${currentView === ViewState.LAB ? 'bg-toxic-green/20 text-toxic-green shadow-[0_0_10px_rgba(42,157,143,0.3)]' : 'text-gray-500 hover:text-white'}`}
             >
                <div className="flex items-center gap-2"><Beaker className="w-4 h-4"/> The Lab</div>
             </button>
             <button 
                onClick={() => setView(ViewState.TRIALS)}
                className={`px-4 py-2 rounded font-gothic tracking-wide transition-all ${currentView === ViewState.TRIALS ? 'bg-blood-red/20 text-blood-red shadow-[0_0_10px_rgba(139,0,0,0.3)]' : 'text-gray-500 hover:text-white'}`}
             >
                <div className="flex items-center gap-2"><Ghost className="w-4 h-4"/> Tombstone Trials</div>
             </button>
         </div>
      </nav>

      {/* Main Content */}
      <main className="relative z-10 h-[calc(100vh-64px)] overflow-hidden">
        {children}
      </main>

      {/* Overlay Scanline Effect */}
      <div className="pointer-events-none fixed inset-0 z-50 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_2px,3px_100%] pointer-events-none opacity-20"></div>
    </div>
  );
};

export default HauntedLayout;