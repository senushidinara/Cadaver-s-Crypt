import React, { useState } from 'react';
import HauntedLayout from './components/HauntedLayout';
import DrCadaverson from './components/DrCadaverson';
import AnatomyLab from './components/AnatomyLab';
import TombstoneTrials from './components/TombstoneTrials';
import { ViewState, AnatomyPart } from './types';

const App: React.FC = () => {
  const [view, setView] = useState<ViewState>(ViewState.LAB);
  const [labTriggerMessage, setLabTriggerMessage] = useState<string>('');

  const handlePartSelect = (part: AnatomyPart) => {
    // When a part is selected in the lab, trigger the chat to explain it
    const prompts = [
        `Dr. Cadaverson, tell me the horrific truth about the ${part.name}.`,
        `What secrets does the ${part.name} hold, spirit?`,
        `Describe the ${part.name} as if you were dissecting it right now.`
    ];
    const randomPrompt = prompts[Math.floor(Math.random() * prompts.length)];
    setLabTriggerMessage(randomPrompt);
  };

  return (
    <HauntedLayout currentView={view} setView={setView}>
      <div className="flex flex-col md:flex-row h-full w-full">
        
        {/* Left/Main Panel Content */}
        <div className={`transition-all duration-500 ease-in-out h-full ${view === ViewState.LAB ? 'w-full md:w-2/3 p-4' : 'w-full p-0'}`}>
           {view === ViewState.LAB && (
              <AnatomyLab onPartSelect={handlePartSelect} />
           )}
           {view === ViewState.TRIALS && (
              <TombstoneTrials />
           )}
        </div>

        {/* Right Panel - Dr. Cadaverson (Chat) */}
        {/* Only show side-by-side in Lab view on desktop. In Trials view, chat is hidden to focus on quiz, or handled differently. */}
        {/* For this specific design, let's keep Dr. Cadaverson always visible in Lab view, and hidden in Trials view for immersion, or maybe a toggle. */}
        {view === ViewState.LAB && (
            <div className="h-[40vh] md:h-full md:w-1/3 p-4 border-t md:border-t-0 md:border-l border-gray-800 bg-black/20 backdrop-blur-sm">
                <DrCadaverson initialMessage={labTriggerMessage} />
            </div>
        )}
      </div>
    </HauntedLayout>
  );
};

export default App;