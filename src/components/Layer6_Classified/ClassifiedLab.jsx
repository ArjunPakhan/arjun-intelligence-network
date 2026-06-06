import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function ClassifiedLab() {
  const [unlocked, setUnlocked] = useState(false);
  const [accessCode, setAccessCode] = useState('');
  const [error, setError] = useState(false);

  const handleUnlock = (e) => {
    e.preventDefault();
    if (accessCode.toLowerCase() === 'sentinel' || accessCode.toLowerCase() === 'vanguard') {
      setUnlocked(true);
      setError(false);
    } else {
      setError(true);
      setTimeout(() => setError(false), 2000);
    }
  };

  if (!unlocked) {
    return (
      <section
        className="layer-section pt-20 pb-24 px-4 md:px-8 flex items-center justify-center"
        style={{ background: 'linear-gradient(180deg, #06080F 0%, #0A0A0F 50%, #06080F 100%)' }}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center max-w-md"
        >
          <div className="mb-8">
            <div className="w-20 h-20 mx-auto rounded-full border-2 border-gray-700 flex items-center justify-center mb-6">
              <span className="text-3xl">🔒</span>
            </div>
            <h2 className="font-mono text-2xl font-bold text-gray-400 mb-2">CLASSIFIED</h2>
            <p className="font-mono text-xs text-gray-600">Security Clearance Required</p>
          </div>

          <form onSubmit={handleUnlock} className="space-y-4">
            <div className="terminal-window">
              <div className="terminal-header">
                <div className="terminal-dot" style={{ background: '#FF5F56' }} />
                <div className="terminal-dot" style={{ background: '#FFBD2E' }} />
                <div className="terminal-dot" style={{ background: '#27C93F' }} />
                <span className="ml-3 text-xs font-mono tracking-wider text-gray-500">access_control.py</span>
              </div>
              <div className="p-4 space-y-3">
                <div className="font-mono text-xs text-gray-500">
                  <span className="text-sith-red">ACCESS DENIED</span> — Clearance level insufficient.
                </div>
                <div className="font-mono text-xs text-gray-600">
                  Hint: Know the operations. Know the future.
                </div>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={accessCode}
                    onChange={(e) => setAccessCode(e.target.value)}
                    placeholder="Enter access code..."
                    className={`flex-1 bg-navy-mid border rounded px-3 py-2 font-mono text-xs text-ghost-white placeholder-gray-600 outline-none transition-colors ${
                      error ? 'border-sith-red' : 'border-terminal-border focus:border-electric-cyan'
                    }`}
                  />
                  <button type="submit" className="px-4 py-2 font-mono text-xs rounded border border-gray-600 text-gray-400 hover:text-ghost-white hover:border-ghost-white transition-colors">
                    UNLOCK
                  </button>
                </div>
                {error && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="font-mono text-xs text-sith-red"
                  >
                    Invalid code. Try an operation codename.
                  </motion.div>
                )}
              </div>
            </div>
          </form>
        </motion.div>
      </section>
    );
  }

  return (
    <section
      className="layer-section pt-20 pb-24 px-4 md:px-8"
      style={{ background: 'linear-gradient(180deg, #06080F 0%, #0A0A14 50%, #06080F 100%)' }}
    >
      <div className="max-w-6xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-16">
          <div className="flex items-center gap-3 mb-4">
            <div className="h-px flex-1 max-w-[60px]" style={{ background: 'linear-gradient(90deg, #E0E0E0, transparent)' }} />
            <span className="font-mono text-xs tracking-widest text-gray-400 uppercase">Layer 06 — Unlocked</span>
            <div className="h-px flex-1 max-w-[60px]" style={{ background: 'linear-gradient(90deg, transparent, #E0E0E0)' }} />
          </div>
          <h2 className="font-mono text-3xl md:text-4xl font-bold text-gray-300">Research Lab</h2>
          <p className="mt-3 text-gray-400 max-w-2xl leading-relaxed">
            Experimental projects, research concepts, and future systems. Access granted.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            { title: 'Transformer Inference Engine', status: 'Architecture', desc: 'Custom CUDA kernels for attention mechanisms. Mixed-precision compute pipeline.' },
            { title: 'Federated Learning Framework', status: 'Concept', desc: 'Privacy-preserving ML across distributed IoT nodes without centralizing data.' },
            { title: 'GPU Cluster Orchestrator', status: 'Planned', desc: 'Multi-node GPU task scheduling for large-scale model training.' },
            { title: 'Agent Blueprint: SAGE', status: 'Prototype', desc: 'Self-Aware Guidance Engine. Next-gen advisor module with persistent reasoning.' },
          ].map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="p-5 rounded-lg border"
              style={{ background: '#0D1117', borderColor: '#2A3040' }}
            >
              <div className="flex items-start justify-between mb-2">
                <h3 className="font-mono text-sm font-bold text-gray-300">{item.title}</h3>
                <span className="px-2 py-0.5 rounded font-mono text-[9px] text-gray-500 border border-gray-700">{item.status}</span>
              </div>
              <p className="text-xs text-gray-500 leading-relaxed">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
