import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { SYSTEM_ROLES } from '../../utils/constants';

function RoleCard({ role, index, isExpanded, onToggle }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      onClick={onToggle}
      className="cursor-pointer rounded-lg border transition-all duration-300 overflow-hidden"
      style={{
        background: '#0D1117',
        borderColor: isExpanded ? role.color : '#2A3040',
        boxShadow: isExpanded ? `0 0 20px ${role.color}20` : 'none',
      }}
    >
      <div className="p-5">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <span className="text-2xl">{role.icon}</span>
            <div>
              <h3 className="font-mono font-bold text-sm" style={{ color: role.color }}>
                {role.name}
              </h3>
              <p className="font-mono text-xs text-gray-500">{role.role}</p>
            </div>
          </div>
          <motion.div animate={{ rotate: isExpanded ? 180 : 0 }} className="text-gray-600 text-xs font-mono">▼</motion.div>
        </div>

        <p className="mt-3 text-sm text-gray-400 leading-relaxed">{role.description}</p>

        <div className="mt-3 px-3 py-2 rounded font-mono text-xs" style={{ background: '#161B22' }}>
          <span className="text-gray-500">Model: </span>
          <span className="text-gray-300">{role.model}</span>
        </div>

        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            className="mt-4 p-3 rounded border"
            style={{ background: '#0A0E17', borderColor: `${role.color}30` }}
          >
            <div className="text-[10px] font-mono text-gray-500 uppercase tracking-wider mb-2">Last Output</div>
            <p className="font-mono text-xs leading-relaxed" style={{ color: role.color }}>
              "{role.realOutput}"
            </p>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
}

export default function CommandCenter({ onNavigate }) {
  const sectionRef = useRef(null);
  const [expandedIndex, setExpandedIndex] = useState(null);

  const stats = [
    { label: 'Active Modules', value: '6', color: '#9B59B6' },
    { label: 'Parameters', value: '405B+', color: '#FF6B00' },
    { label: 'Inference Latency', value: '<50ms', color: '#00D4FF' },
    { label: 'Context Store', value: 'ChromaDB', color: '#00FF88' },
  ];

  return (
    <section
      ref={sectionRef}
      className="layer-section pt-20 pb-24 px-4 md:px-8"
      style={{ background: 'linear-gradient(180deg, #06080F 0%, #0A0612 50%, #06080F 100%)' }}
    >
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="h-px flex-1 max-w-[60px]" style={{ background: 'linear-gradient(90deg, #9B59B6, transparent)' }} />
            <span className="font-mono text-xs tracking-widest text-imperial-purple uppercase">Layer 01</span>
            <div className="h-px flex-1 max-w-[60px]" style={{ background: 'linear-gradient(90deg, transparent, #9B59B6)' }} />
          </div>
          <h2 className="font-mono text-3xl md:text-4xl font-bold text-imperial-purple">
            Command Center
          </h2>
          <p className="mt-3 text-gray-400 max-w-2xl leading-relaxed">
            The architecture behind a distributed intelligence system. Six specialized modules
            working in parallel — each purpose-built for a domain.
          </p>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16"
        >
          {stats.map((stat) => (
            <div key={stat.label} className="p-4 rounded-lg border text-center" style={{ background: '#0D1117', borderColor: '#2A3040' }}>
              <div className="font-mono text-2xl md:text-3xl font-bold" style={{ color: stat.color }}>{stat.value}</div>
              <div className="font-mono text-xs text-gray-500 mt-1">{stat.label}</div>
            </div>
          ))}
        </motion.div>

        {/* System Architecture */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="mb-16"
        >
          <h3 className="font-mono text-sm text-imperial-purple mb-4 tracking-wider">SYSTEM ARCHITECTURE</h3>
          <div className="terminal-window">
            <div className="terminal-header">
              <div className="terminal-dot" style={{ background: '#FF5F56' }} />
              <div className="terminal-dot" style={{ background: '#FFBD2E' }} />
              <div className="terminal-dot" style={{ background: '#27C93F' }} />
              <span className="ml-3 text-xs font-mono tracking-wider text-imperial-purple">architecture.md</span>
            </div>
            <div className="p-4 font-mono text-xs leading-relaxed space-y-3">
              <p className="text-gray-400"><span className="text-imperial-purple"># Multi-Module Intelligence System</span></p>
              <p className="text-gray-300">
                A distributed AI orchestrator that routes tasks to specialized modules.
                Each module is purpose-built for a domain — security analysis, code review,
                strategic reasoning, task orchestration, and persistent memory.
              </p>
              <p className="text-gray-400"><span className="text-imperial-purple"># Design Principles</span></p>
              <p className="text-gray-300">
                • Modules are specialized, not generalist<br />
                • Local reasoning (Ollama) for privacy-sensitive tasks<br />
                • Cloud inference (NVIDIA NIM) for heavy computation<br />
                • Persistent memory via ChromaDB + SQLite<br />
                • Zero client-side API keys — all proxied server-side
              </p>
              <p className="text-gray-400"><span className="text-imperial-purple"># Deployment Stack</span></p>
              <p className="text-gray-300">
                Ollama (local) → NVIDIA NIM (cloud) → ChromaDB (vectors) → Custom routing layer
              </p>
            </div>
          </div>
        </motion.div>

        {/* Module Cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
        >
          <h3 className="font-mono text-sm text-imperial-purple mb-4 tracking-wider">ACTIVE MODULES</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {SYSTEM_ROLES.map((role, i) => (
              <RoleCard
                key={role.name}
                role={role}
                index={i}
                isExpanded={expandedIndex === i}
                onToggle={() => setExpandedIndex(expandedIndex === i ? null : i)}
              />
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
