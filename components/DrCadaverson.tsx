import React, { useEffect, useRef, useState } from 'react';
import { Send, Ghost, Loader2 } from 'lucide-react';
import { ChatMessage } from '../types';
import { sendMessageToDrCadaverson } from '../services/geminiService';
import { INITIAL_CHAT_MESSAGE } from '../constants';

interface DrCadaversonProps {
  initialMessage?: string;
}

const DrCadaverson: React.FC<DrCadaversonProps> = ({ initialMessage }) => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const initialized = useRef(false);

  useEffect(() => {
    if (!initialized.current) {
      setMessages([{
        id: 'init',
        role: 'model',
        text: INITIAL_CHAT_MESSAGE
      }]);
      initialized.current = true;
    }
  }, []);

  // Listen for external triggers (e.g., clicking body parts)
  useEffect(() => {
    if (initialMessage) {
       handleExternalMessage(initialMessage);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialMessage]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleExternalMessage = async (text: string) => {
      const userMsg: ChatMessage = { id: Date.now().toString(), role: 'user', text };
      setMessages(prev => [...prev, userMsg]);
      setIsLoading(true);

      try {
        const responseText = await sendMessageToDrCadaverson(text);
        const aiMsg: ChatMessage = { id: (Date.now() + 1).toString(), role: 'model', text: responseText };
        setMessages(prev => [...prev, aiMsg]);
      } catch {
        const errorMsg: ChatMessage = { id: (Date.now() + 1).toString(), role: 'model', text: "The connection to the other side is weak...", isError: true };
        setMessages(prev => [...prev, errorMsg]);
      } finally {
        setIsLoading(false);
      }
  };

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;
    const text = input.trim();
    setInput('');
    await handleExternalMessage(text);
  };

  return (
    <div className="flex flex-col h-full bg-crypt-gray border border-toxic-green/30 rounded-lg shadow-[0_0_15px_rgba(42,157,143,0.1)] overflow-hidden font-medical">
      {/* Header */}
      <div className="bg-coffin-black p-4 border-b border-toxic-green/30 flex items-center space-x-3">
        <div className="relative">
             <div className="absolute inset-0 bg-toxic-green rounded-full blur animate-pulse-slow opacity-50"></div>
             <Ghost className="relative text-toxic-green w-6 h-6 animate-float" />
        </div>
        <div>
            <h2 className="text-xl font-gothic text-ghost-white tracking-wider">Dr. Cadaverson</h2>
            <p className="text-xs text-toxic-green/70">Status: <span className="animate-pulse">Haunting</span></p>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-opacity-50 bg-[url('https://www.transparenttextures.com/patterns/dark-matter.png')]">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-[80%] p-3 rounded-lg border ${
                msg.role === 'user'
                  ? 'bg-blood-red-dark/80 border-blood-red text-ghost-white rounded-br-none'
                  : 'bg-toxic-green-dim/80 border-toxic-green/40 text-ghost-white rounded-bl-none shadow-lg'
              }`}
            >
              <p className="leading-relaxed">{msg.text}</p>
            </div>
          </div>
        ))}
        {isLoading && (
           <div className="flex justify-start animate-flicker">
             <div className="bg-toxic-green-dim/50 p-3 rounded-lg rounded-bl-none border border-toxic-green/20">
               <span className="text-toxic-green text-sm flex items-center gap-2">
                 <Loader2 className="w-4 h-4 animate-spin" /> Divining answer...
               </span>
             </div>
           </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="p-4 bg-coffin-black border-t border-toxic-green/30">
        <div className="flex space-x-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Ask the spirit..."
            className="flex-1 bg-crypt-gray border border-gray-700 text-ghost-white rounded px-4 py-2 focus:outline-none focus:border-toxic-green transition-colors font-medical placeholder-gray-600"
          />
          <button
            onClick={handleSend}
            disabled={isLoading}
            className="bg-blood-red hover:bg-blood-red/80 text-white p-2 rounded transition-colors disabled:opacity-50 border border-red-900"
          >
            <Send className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default DrCadaverson;