import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import NetworkVisualizer from './NetworkVisualizer';
import AESVisualizer from './AESVisualizer';
import { SECURITY_PROJECTS, THREAT_LOG, ATTACK_TYPES } from '../../utils/constants';
import { useInView } from '../../hooks/useTypewriter';

function ThreatMonitor() {
  const [log, setLog] = useState(THREAT_LOG.slice(0, 3));
  const logRef = useRef(null);

  const addThreat = (attackId) => {
    const attack = ATTACK_TYPES.find(a => a.id === attackId);
    if (!attack) return;
    const nodes = ['Mumbai', 'Nagpur', 'Cloud Gateway', 'IoT Cluster', 'Edge Unit', 'Analysis Engine'];
    const newEntry = {
      type: attack.name,
      severity: attack.severity,
      confidence: attack.confidence,
      time: `${Math.floor(Math.random() * 8 + 1)}ms`,
      node: nodes[Math.floor(Math.random() * nodes.length)],
      timestamp: new Date().toLocaleTimeString('en-US', { hour12: false }),
    };
    setLog(prev => [newEntry, ...prev].slice(0, 8));
  };

  useEffect(() => {
    if (logRef.current) {
      logRef.current.scrollTop = 0;
    }
  }, [log]);

  return (
    <div className="terminal-window">
      <div className="terminal-header">
        <div className="terminal-dot" style={{ background: '#FF5F56' }} />
        <div className="terminal-dot" style={{ background: '#FFBD2E' }} />
        <div className="terminal-dot" style={{ background: '#27C93F' }} />
        <span className="ml-3 text-xs font-mono tracking-wider text-sith-red">syslog — threat_monitor</span>
      </div>
      <div ref={logRef} className="p-3 overflow-y-auto font-mono text-[10px] max-h-48" style={{ background: '#06080F' }}>
        {log.map((entry, i) => (
          <motion.div
            key={`${entry.timestamp}-${i}`}
            initial={{ opacity: 0, x: -8, height: 0 }}
            animate={{ opacity: 1, x: 0, height: 'auto' }}
            className="flex items-center gap-3 py-1 border-b border-terminal-border/20"
          >
            <span className="text-gray-600 shrink-0">{entry.timestamp}</span>
            <span className="shrink-0" style={{
              color: entry.severity === 'Critical' ? '#FF2020' : entry.severity === 'High' ? '#FF6B00' : '#FFD700',
            }}>
              [{entry.severity.toUpperCase()}]
            </span>
            <span className="text-ghost-white shrink-0">{entry.type}</span>
            <span className="text-gray-600 shrink-0">from {entry.node}</span>
            <span className="text-code-green ml-auto shrink-0">{entry.confidence}%</span>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

function ProjectCard({ project, index }) {
  return (
    <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.1 }} className="card-surface p-5">
      <div className="flex items-start justify-between mb-3">
        <div>
          <div className="font-mono text-[9px] text-sith-red/50 tracking-widest mb-0.5">{project.codename}</div>
          <h3 className="text-display text-base text-ghost-white">{project.title}</h3>
        </div>
        <span className="px-2 py-0.5 rounded font-mono text-[9px] text-sith-red border border-sith-red/20" style={{ background: '#FF202008' }}>{project.status}</span>
      </div>
      {project.plainEnglish && (
        <p className="text-[12px] text-gray-400 leading-relaxed mb-2" style={{ fontFamily: 'Inter, system-ui, sans-serif' }}>{project.plainEnglish}</p>
      )}
      {project.plainSummary && (
        <div className="mb-2">
          <p className="text-body text-xs text-gray-300 leading-relaxed">{project.plainSummary}</p>
          {project.impact && (
            <p className="text-body text-[10px] text-sith-red/70 mt-1 font-medium">{project.impact}</p>
          )}
        </div>
      )}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mb-3">
        {project.stats.map(s => (
          <div key={s.label} className="p-2 rounded" style={{ background: '#06080F' }}>
            <div className="font-mono text-sm font-bold text-sith-red">{s.value}</div>
            <div className="font-mono text-[9px] text-gray-500">{s.label}</div>
          </div>
        ))}
      </div>
      <div className="flex flex-wrap gap-1">
        {project.stack.map(t => <span key={t} className="px-1.5 py-0.5 rounded font-mono text-[9px] text-gray-500" style={{ background: '#0D1117' }}>{t}</span>)}
      </div>
    </motion.div>
  );
}

export default function Cybersecurity({ onThreatChange }) {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef);

  const handleAttack = (attackId) => {
    onThreatChange?.('CRITICAL');
  };

  return (
    <section ref={sectionRef} className="layer-section pt-20 pb-24 px-4 md:px-8" style={{ background: '#06080F' }}>
      <div className="max-w-6xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 15 }} animate={isInView ? { opacity: 1, y: 0 } : {}} className="mb-16">
          <div className="flex items-center gap-3 mb-4">
            <div className="h-px w-12" style={{ background: 'linear-gradient(90deg, #FF2020, transparent)' }} />
            <span className="font-mono text-[10px] tracking-widest text-sith-red uppercase">Layer 02</span>
          </div>
          <h2 className="text-display text-3xl md:text-4xl text-ghost-white">Security Operations Center</h2>
          <p className="text-body text-sm text-gray-500 mt-2 max-w-xl">Threat intelligence, intrusion detection, and vulnerability research. Real data, real attack classes.</p>
        </motion.div>

        <div className="space-y-4 mb-16">
          {SECURITY_PROJECTS.map((p, i) => <ProjectCard key={p.title} project={p} index={i} />)}
        </div>

        <motion.div initial={{ opacity: 0, y: 15 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.2 }} className="mb-12">
          <h3 className="font-mono text-[11px] text-sith-red mb-2 tracking-wider uppercase">Distributed IDS — Threat Map</h3>
          <p className="font-mono text-[9px] text-gray-600 mb-3">Click attack buttons. Watch propagation, detection, and neutralization.</p>
          <NetworkVisualizer onAttack={handleAttack} />
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 15 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.3 }} className="mb-12">
          <h3 className="font-mono text-[11px] text-sith-red mb-2 tracking-wider uppercase">Threat Monitor</h3>
          <ThreatMonitor />
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 15 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.4 }}>
          <h3 className="font-mono text-[11px] text-sith-red mb-2 tracking-wider uppercase">AES-256 Encryption</h3>
          <div className="terminal-window">
            <div className="terminal-header">
              <div className="terminal-dot" style={{ background: '#FF5F56' }} />
              <div className="terminal-dot" style={{ background: '#FFBD2E' }} />
              <div className="terminal-dot" style={{ background: '#27C93F' }} />
              <span className="ml-3 text-xs font-mono tracking-wider text-sith-red">aes_demo.py</span>
            </div>
            <div className="p-4"><AESVisualizer /></div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
