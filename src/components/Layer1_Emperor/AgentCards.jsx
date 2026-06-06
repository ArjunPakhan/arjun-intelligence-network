import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AGENTS } from '../../utils/constants';

function AgentCard({ agent, index, isExpanded, onToggle }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      onClick={onToggle}
      className="cursor-pointer rounded-lg border transition-all duration-300 overflow-hidden"
      style={{
        background: '#0D1117',
        borderColor: isExpanded ? agent.color : '#2A3040',
        boxShadow: isExpanded ? `0 0 20px ${agent.color}20` : 'none',
      }}
    >
      <div className="p-5">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <span className="text-2xl">{agent.icon}</span>
            <div>
              <h3 className="font-mono font-bold text-sm" style={{ color: agent.color }}>
                {agent.name}
              </h3>
              <p className="font-mono text-xs text-gray-500">{agent.role}</p>
            </div>
          </div>
          <motion.div
            animate={{ rotate: isExpanded ? 180 : 0 }}
            className="text-gray-600 text-xs font-mono"
          >
            ▼
          </motion.div>
        </div>

        <p className="mt-3 text-sm text-gray-400 leading-relaxed">
          {agent.description}
        </p>

        <div className="mt-3 px-3 py-2 rounded font-mono text-xs" style={{ background: '#161B22' }}>
          <span className="text-gray-500">Model: </span>
          <span className="text-gray-300">{agent.model}</span>
        </div>

        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="overflow-hidden"
            >
              <div className="mt-4 p-3 rounded border" style={{ background: '#0A0E17', borderColor: `${agent.color}30` }}>
                <div className="text-[10px] font-mono text-gray-500 uppercase tracking-wider mb-2">Real Output</div>
                <p className="font-mono text-xs leading-relaxed" style={{ color: agent.color }}>
                  "{agent.realOutput}"
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}

export default function AgentCards() {
  const [expandedIndex, setExpandedIndex] = useState(null);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {AGENTS.map((agent, i) => (
        <AgentCard
          key={agent.name}
          agent={agent}
          index={i}
          isExpanded={expandedIndex === i}
          onToggle={() => setExpandedIndex(expandedIndex === i ? null : i)}
        />
      ))}
    </div>
  );
}
