import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { UPLINK_COMMANDS } from '../../utils/constants';

export default function EmperorTerminal({ onNavigate }) {
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
    let raw = input.trim();
    setInput('');

    if (raw.toLowerCase() === '/clear') { setHistory([{ type: 'system', text: 'Terminal cleared.' }]); return; }
    if (raw.toLowerCase().startsWith('/contact')) {
      const parts = raw.split(/\s+/);
      const msg = parts.slice(2).join(' ').replace(/"/g, '');
      if (!msg) { setHistory(prev => [...prev, { type: 'input', text: raw }, { type: 'error', text: 'Usage: /contact --email "message"' }]); return; }
      setHistory(prev => [...prev, { type: 'input', text: raw }, { type: 'output', text: 'Encrypting channel...', color: '#FFD700' }]);
      setIsProcessing(true);
      setTimeout(() => { setHistory(prev => [...prev, { type: 'output', text: 'Channel secured. Message queued.', color: '#00FF88' }, { type: 'output', text: `Message: "${msg}"`, color: '#E0E0E0' }, { type: 'output', text: 'Acknowledged.', color: '#FFD700' }]); setIsProcessing(false); }, 1500);
      return;
    }

    // Natural language recognition
    const naturalLanguageMap = {
      'sentinel': '/ask sentinel',
      'tell me about sentinel': '/ask sentinel',
      'cerberus': '/ask cerberus',
      'tell me about cerberus': '/ask cerberus',
      'who are you': '/ask identity',
      'what do you build': '/ask projects',
      'show research': '/research',
      'what makes arjun different': '/ask unique',
      'explain the ml pipeline': '/ask ml',
      'projects': '/projects',
      'research': '/research',
      'security': '/security',
    };
    const nlMatch = naturalLanguageMap[raw.toLowerCase().trim()];
    if (nlMatch) raw = nlMatch;

    const parts = raw.split(/\s+/);
    const cmd = parts[0].toLowerCase();

    // Handle /ask with topic
    if (cmd === '/ask' && parts.length > 1) {
      const topic = parts[1].toLowerCase();
      const customResponses = {
        sentinel: "SENTINEL -- Secure Distributed IDS\n3.5M network flow records analyzed\n10 attack classes -- 99.7% detection accuracy\nStack: Java + Flask + XGBoost + AES-256\nStatus: IEEE paper submitted\n-> Press 2 to open Security Operations",
        cerberus: "CERBERUS -- IoT Malware Detection\n455K+ PCAP samples -- 8 malware classes\n57% feature reduction via hybrid selection\n~88% XGBoost accuracy on imbalanced data\nStatus: IEEE/Scopus submission in progress\n-> Press 3 to open Research Lab",
        identity: "AIN -- Arjun Intelligence Network\nOperator: Arjun Pakhan\nDomain: Cybersecurity x ML x GPU Computing\nActive projects: 3 -- Papers: 2 -- Agents: 6\nCurrently: TIP internship @ Maincrafts Technology\n-> Type /projects for full operation list",
        unique: "Differentiators:\n-> Built GPU-accelerated IDS with CUDA + NVIDIA NIM\n-> Published neurofinance research on Gen Z UPI behavior\n-> Multi-agent AI system running 405B parameters locally\n-> Systems thinker -- not just model builder\n-> Type /resume to download role-specific CV",
        ml: "ML Pipeline -- CERBERUS:\nInput: 455K PCAP flows -- 40 features\nFeature selection: Intersection/Union/Consensus hybrid\nReduction: 57% -- Final features: 17-22\nModel: XGBoost with SMOTE for class imbalance\nOutput: 8-class malware classification -- 88% accuracy\n-> Press 3 to explore interactive confusion matrix",
      };
      const response = customResponses[topic]
        || UPLINK_COMMANDS['/ask'].responses[topic]
        || UPLINK_COMMANDS['/ask'].responses['default'];
      setHistory(prev => [...prev, { type: 'input', text: raw }, { type: 'output', text: response, color: '#9B59B6' }]);
      return;
    }

    // Handle /research — navigate to ML Research (layer 3)
    if (cmd === '/research') {
      setHistory(prev => [...prev, { type: 'input', text: raw }, { type: 'output', text: 'Routing to Research Lab...', color: '#00FF88' }]);
      setTimeout(() => onNavigate?.(3), 800);
      return;
    }

    // Handle /security — navigate to Security Operations (layer 2)
    if (cmd === '/security') {
      setHistory(prev => [...prev, { type: 'input', text: raw }, { type: 'output', text: 'Routing to Security Operations...', color: '#FF2020' }]);
      setTimeout(() => onNavigate?.(2), 800);
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
          {['/help', '/projects', 'sentinel', 'who are you', '/ask ml', '/resume', '/sudo'].map(cmd => (
            <button key={cmd} onClick={() => setInput(cmd)} className="px-3 py-1 rounded border font-mono text-[10px] text-gray-500 hover:text-imperial-gold hover:border-imperial-gold/30 transition-colors" style={{ background: '#0D1117', borderColor: '#2A3040' }}>
              {cmd}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
