import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { UPLINK_COMMANDS } from '../../utils/constants';

export default function EmperorTerminal() {
  const [history, setHistory] = useState([
    { type: 'system', text: 'AIN Uplink Terminal v3.0' },
    { type: 'system', text: 'Type /help for commands. Press 0-7 to navigate.' },
  ]);
  const [input, setInput] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const endRef = useRef(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history]);

  const handleCommand = (e) => {
    e.preventDefault();
    if (!input.trim() || isProcessing) return;
    const raw = input.trim();
    setInput('');
    const parts = raw.split(/\s+/);
    const cmd = parts[0].toLowerCase();

    if (cmd === '/clear') { setHistory([{ type: 'system', text: 'Terminal cleared.' }]); return; }
    if (cmd === '/contact') {
      const msg = parts.slice(2).join(' ').replace(/"/g, '');
      if (!msg) { setHistory(prev => [...prev, { type: 'input', text: raw }, { type: 'error', text: 'Usage: /contact --email "message"' }]); return; }
      setHistory(prev => [...prev, { type: 'input', text: raw }, { type: 'output', text: 'Encrypting channel...', color: '#FFD700' }]);
      setIsProcessing(true);
      setTimeout(() => { setHistory(prev => [...prev, { type: 'output', text: 'Channel secured. Message queued.', color: '#00FF88' }, { type: 'output', text: `Message: "${msg}"`, color: '#E0E0E0' }, { type: 'output', text: 'Acknowledged.', color: '#FFD700' }]); setIsProcessing(false); }, 1500);
      return;
    }

    // Handle /ask with topic
    if (cmd === '/ask' && parts.length > 1) {
      const topic = parts[1].toLowerCase();
      const response = UPLINK_COMMANDS['/ask'].responses[topic] || UPLINK_COMMANDS['/ask'].responses['default'];
      setHistory(prev => [...prev, { type: 'input', text: raw }, { type: 'output', text: response, color: '#9B59B6' }]);
      return;
    }

    const command = UPLINK_COMMANDS[cmd];
    if (command) {
      setHistory(prev => [...prev, { type: 'input', text: raw }]);
      setIsProcessing(true);
      command.output.forEach((line, i) => {
        setTimeout(() => {
          setHistory(prev => [...prev, { type: 'output', text: line, color: command.color }]);
          if (i === command.output.length - 1) {
            setIsProcessing(false);
            if (command.action === 'open' && command.url) window.open(command.url, '_blank');
            if (command.action === 'download') {
              const blob = new Blob([`Arjun Pakhan\nIntelligence Systems Engineer\nCybersecurity | ML | GPU Computing\n\nReplace with actual resume.`], { type: 'application/pdf' });
              const url = URL.createObjectURL(blob);
              const a = document.createElement('a'); a.href = url; a.download = 'Resume_Pakhan_Arjun.pdf'; a.click();
              URL.revokeObjectURL(url);
            }
          }
        }, (i + 1) * 300);
      });
    } else {
      setHistory(prev => [...prev, { type: 'input', text: raw }, { type: 'error', text: `Unknown command: ${cmd}. Type /help.` }]);
    }
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
          <p className="mt-3 text-gray-400">Command interface. Ask about any domain or navigate the system.</p>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="terminal-window">
          <div className="terminal-header">
            <div className="terminal-dot" style={{ background: '#FF5F56' }} />
            <div className="terminal-dot" style={{ background: '#FFBD2E' }} />
            <div className="terminal-dot" style={{ background: '#27C93F' }} />
            <span className="ml-3 text-xs font-mono tracking-wider text-imperial-gold">ain@intelligence ~ %</span>
          </div>
          <div className="p-4 h-96 overflow-y-auto font-mono text-sm" style={{ background: '#0A0E17' }}>
            {history.map((entry, i) => (
              <motion.div key={i} initial={{ opacity: 0, x: -5 }} animate={{ opacity: 1, x: 0 }} className="mb-1">
                {entry.type === 'input' && <div className="text-ghost-white"><span className="text-imperial-gold">$ </span>{entry.text}</div>}
                {entry.type === 'output' && <div style={{ color: entry.color || '#E0E0E0' }}>{entry.text}</div>}
                {entry.type === 'error' && <div className="text-sith-red">{entry.text}</div>}
                {entry.type === 'system' && <div className="text-gray-500">{entry.text}</div>}
              </motion.div>
            ))}
            {isProcessing && <div className="text-imperial-gold animate-pulse">Processing...</div>}
            <div ref={endRef} />
          </div>
          <form onSubmit={handleCommand} className="border-t border-terminal-border p-3 flex gap-2" style={{ background: '#0D1117' }}>
            <span className="text-imperial-gold font-mono text-sm select-none">$</span>
            <input type="text" value={input} onChange={(e) => setInput(e.target.value)} placeholder="Enter command..." className="flex-1 bg-transparent outline-none font-mono text-sm text-ghost-white placeholder-gray-600" disabled={isProcessing} />
          </form>
        </motion.div>

        <div className="mt-4 flex flex-wrap gap-2">
          {['/help', '/projects', '/ask ids', '/ask ml', '/ask cuda', '/resume', '/sudo'].map(cmd => (
            <button key={cmd} onClick={() => setInput(cmd)} className="px-3 py-1 rounded border font-mono text-[10px] text-gray-500 hover:text-imperial-gold hover:border-imperial-gold/30 transition-colors" style={{ background: '#0D1117', borderColor: '#2A3040' }}>
              {cmd}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
