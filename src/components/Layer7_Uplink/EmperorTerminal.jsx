import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';

const API_URL = 'https://snowy-math-4180.arjunpakhan.workers.dev';

const QUICK_PROMPTS = [
  'Who is Arjun?',
  'Tell me about Sentinel',
  'What is Cerberus?',
  'Current projects?',
  'Research papers?',
  'What makes him different?',
];

export default function EmperorTerminal() {
  const [history, setHistory] = useState([
    { type: 'system', text: 'AIN Uplink Terminal v4.0' },
    { type: 'system', text: 'AI-powered. Ask anything about Arjun\'s work.' },
  ]);
  const [input, setInput] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [conversationHistory, setConversationHistory] = useState([]);
  const endRef = useRef(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history]);

  const sendToAgent = async (text) => {
    setHistory(prev => [...prev, { type: 'input', text }]);
    setIsProcessing(true);

    const userMsg = { role: 'user', content: text };
    const recentHistory = [...conversationHistory, userMsg].slice(-6);

    try {
      const res = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: text, history: recentHistory }),
      });

      if (!res.ok) throw new Error(`HTTP ${res.status}`);

      const data = await res.json();
      setHistory(prev => [...prev, { type: 'output', text: data.reply, color: '#00D4FF' }]);
      setConversationHistory(prev => [...prev, userMsg, { role: 'assistant', content: data.reply }]);
    } catch {
      setHistory(prev => [...prev, { type: 'error', text: 'Intelligence briefing temporarily unavailable. Try again.' }]);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleCommand = (e) => {
    e.preventDefault();
    if (!input.trim() || isProcessing) return;
    const raw = input.trim();
    setInput('');

    if (raw.toLowerCase() === '/clear') {
      setHistory([{ type: 'system', text: 'Terminal cleared.' }]);
      setConversationHistory([]);
      return;
    }

    sendToAgent(raw);
  };

  const handleQuickPrompt = (prompt) => {
    if (isProcessing) return;
    setInput('');
    sendToAgent(prompt);
  };

  return (
    <section className="layer-section pt-20 pb-24 px-4 md:px-8 flex items-center justify-center" style={{ background: 'linear-gradient(180deg, #06080F 0%, #0F0C06 50%, #06080F 100%)' }}>
      <div className="w-full max-w-3xl">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="h-px flex-1 max-w-[60px]" style={{ background: 'linear-gradient(90deg, #FFD700, transparent)' }} />
            <span className="font-mono text-xs tracking-widest text-imperial-gold uppercase">Layer 07</span>
            <div className="h-px flex-1 max-w-[60px]" style={{ background: 'linear-gradient(90deg, transparent, #FFD700)' }} />
          </div>
          <h2 className="font-mono text-3xl md:text-4xl font-bold text-imperial-gold">Uplink Terminal</h2>
          <p className="mt-3 text-gray-400">AI-powered command interface. Ask about any domain.</p>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="terminal-window">
          <div className="terminal-header">
            <div className="terminal-dot" style={{ background: '#FF5F56' }} />
            <div className="terminal-dot" style={{ background: '#FFBD2E' }} />
            <div className="terminal-dot" style={{ background: '#27C93F' }} />
            <span className="ml-3 text-xs font-mono tracking-wider text-imperial-gold">ain@intelligence ~ %</span>
            <span className="ml-auto font-mono text-[9px] text-cuda-orange">nemotron · NVIDIA NIM</span>
          </div>
          <div className="p-4 h-96 overflow-y-auto font-mono text-sm" style={{ background: '#0A0E17' }}>
            {history.map((entry, i) => (
              <motion.div key={i} initial={{ opacity: 0, x: -5 }} animate={{ opacity: 1, x: 0 }} className="mb-1">
                {entry.type === 'input' && <div className="text-ghost-white"><span className="text-imperial-gold">$ </span>{entry.text}</div>}
                {entry.type === 'output' && <div style={{ color: entry.color || '#E0E0E0', whiteSpace: 'pre-line' }}>{entry.text}</div>}
                {entry.type === 'error' && <div className="text-sith-red">{entry.text}</div>}
                {entry.type === 'system' && <div className="text-gray-500">{entry.text}</div>}
              </motion.div>
            ))}
            {isProcessing && <div className="text-electric-cyan animate-pulse">Processing...</div>}
            <div ref={endRef} />
          </div>
          <form onSubmit={handleCommand} className="border-t border-terminal-border p-3 flex gap-2" style={{ background: '#0D1117' }}>
            <span className="text-imperial-gold font-mono text-sm select-none">$</span>
            <input type="text" value={input} onChange={(e) => setInput(e.target.value)} placeholder="Ask about Arjun's work..." className="flex-1 bg-transparent outline-none font-mono text-sm text-ghost-white placeholder-gray-600" disabled={isProcessing} />
          </form>
        </motion.div>

        <div className="mt-4 flex flex-wrap gap-2">
          {QUICK_PROMPTS.map((prompt) => (
            <button key={prompt} onClick={() => handleQuickPrompt(prompt)} className="px-3 py-1 rounded border font-mono text-[10px] text-gray-500 hover:text-imperial-gold hover:border-imperial-gold/30 transition-colors" style={{ background: '#0D1117', borderColor: '#2A3040' }}>
              {prompt}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
