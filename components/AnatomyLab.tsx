import React, { useState } from 'react';
import { ANATOMY_PARTS } from '../constants';
import { AnatomyPart } from '../types';
import { Search } from 'lucide-react';

interface AnatomyLabProps {
  onPartSelect: (part: AnatomyPart) => void;
}

const AnatomyLab: React.FC<AnatomyLabProps> = ({ onPartSelect }) => {
  const [hoveredPart, setHoveredPart] = useState<AnatomyPart | null>(null);

  return (
    <div className="relative w-full h-full flex flex-col items-center justify-center bg-black/40 rounded-xl border border-gray-800 p-6 overflow-hidden">
        {/* Background Grime/Atmosphere */}
        <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_center,_transparent_0%,_#000000_100%)]"></div>
        
        <h2 className="absolute top-4 left-6 text-2xl font-gothic text-toxic-green z-10 animate-pulse-slow">
            Specimen Table
        </h2>

        {/* Info Box */}
        <div className="absolute top-4 right-6 w-64 h-32 bg-coffin-black/80 border border-toxic-green/30 p-4 rounded z-10 backdrop-blur-sm transition-opacity duration-300">
             {hoveredPart ? (
                 <>
                    <h3 className="text-xl font-medical text-toxic-green mb-1">{hoveredPart.name}</h3>
                    <p className="text-sm text-gray-400 italic">{hoveredPart.description}</p>
                 </>
             ) : (
                 <div className="h-full flex items-center justify-center text-gray-600 italic text-sm">
                     <p>Hover over the cadaver to examine...</p>
                 </div>
             )}
        </div>

        {/* SVG Container */}
        <svg
            viewBox="0 0 200 400"
            className="h-[80%] max-h-[600px] drop-shadow-[0_0_15px_rgba(42,157,143,0.3)] z-0"
            style={{ filter: 'drop-shadow(0 0 5px rgba(255,255,255,0.1))' }}
        >
            {/* Outline of Body (Simple Ghostly Silhouette) */}
            <path
                d="M100,20 C130,20 150,40 160,80 C170,120 170,200 160,300 C150,380 130,390 100,390 C70,390 50,380 40,300 C30,200 30,120 40,80 C50,40 70,20 100,20 Z"
                fill="#1a1a1a"
                stroke="#333"
                strokeWidth="1"
                className="opacity-50"
            />
            
            {/* Interactive Parts */}
            {ANATOMY_PARTS.map((part) => (
                <g 
                    key={part.id}
                    onClick={() => onPartSelect(part)}
                    onMouseEnter={() => setHoveredPart(part)}
                    onMouseLeave={() => setHoveredPart(null)}
                    className="cursor-pointer transition-all duration-300 group"
                >
                    <path
                        d={part.path}
                        fill={hoveredPart?.id === part.id ? '#8b0000' : '#2a2a2a'}
                        stroke={hoveredPart?.id === part.id ? '#ff0000' : '#4a4a4a'}
                        strokeWidth={hoveredPart?.id === part.id ? '2' : '1'}
                        className="transition-colors duration-300 ease-out"
                    />
                    {/* Glowing effect on hover */}
                     {hoveredPart?.id === part.id && (
                        <circle cx={part.cx} cy={part.cy} r="5" fill="#ff0000" className="animate-ping opacity-75" />
                     )}
                </g>
            ))}
        </svg>

        <div className="absolute bottom-4 text-xs text-gray-600 font-medical">
            <span className="flex items-center gap-2"><Search className="w-3 h-3" /> Click a part to summon knowledge</span>
        </div>
    </div>
  );
};

export default AnatomyLab;