import { motion, AnimatePresence } from 'framer-motion';
import { CATEGORY_COLORS, CATEGORY_LABELS } from './KnowledgeGraph';
import graphData from '../../data/knowledge-graph.json';

export default function NodePanel({ node, onClose }) {
  if (!node) return null;

  const color = CATEGORY_COLORS[node.category] || '#666';
  const categoryLabel = CATEGORY_LABELS[node.category] || node.category;
  const connectedNodes = (node.connectedIds || []).map(id => graphData.nodes.find(n => n.id === id)).filter(Boolean);

  return (
    <AnimatePresence>
      {node && (
        <motion.div
          initial={{ x: 320, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: 320, opacity: 0 }}
          transition={{ type: 'spring', damping: 25, stiffness: 200 }}
          className="fixed top-6 right-0 bottom-0 w-80 z-40 overflow-y-auto"
          style={{ background: '#06080F', borderLeft: '1px solid #1C2030' }}
        >
          {/* Header */}
          <div className="sticky top-0 p-4 border-b" style={{ background: '#06080F', borderColor: '#1C2030' }}>
            <div className="flex items-start justify-between">
              <div>
                <span className="font-mono text-[9px] tracking-widest uppercase" style={{ color }}>{categoryLabel}</span>
                <h3 className="text-display text-lg text-ghost-white mt-0.5">{node.label}</h3>
              </div>
              <button onClick={onClose} className="text-gray-600 hover:text-ghost-white transition-colors font-mono text-xs mt-1">✕</button>
            </div>
          </div>

          <div className="p-4 space-y-5">
            {/* Status */}
            <div>
              <div className="font-mono text-[9px] text-gray-600 uppercase tracking-wider mb-1">Status</div>
              <span className="inline-block px-2 py-0.5 rounded font-mono text-[10px]" style={{
                color: node.status === 'completed' ? '#00FF88' : node.status === 'active' ? '#FF6B00' : node.status === 'planned' ? '#555' : '#00D4FF',
                background: node.status === 'completed' ? '#00FF8810' : node.status === 'active' ? '#FF6B0010' : node.status === 'planned' ? '#33333310' : '#00D4FF10',
              }}>
                {node.status}
              </span>
            </div>

            {/* Introduced */}
            <div>
              <div className="font-mono text-[9px] text-gray-600 uppercase tracking-wider mb-1">Introduced</div>
              <span className="font-mono text-xs text-gray-400">{node.introduced}</span>
            </div>

            {/* Key Insight */}
            <div>
              <div className="font-mono text-[9px] text-gray-600 uppercase tracking-wider mb-1">Key Insight</div>
              <p className="text-body text-xs text-gray-400 leading-relaxed">{node.insight}</p>
            </div>

            {/* Projects */}
            {node.projects && node.projects.length > 0 && (
              <div>
                <div className="font-mono text-[9px] text-gray-600 uppercase tracking-wider mb-1">Projects</div>
                <div className="flex flex-wrap gap-1">
                  {node.projects.map(p => (
                    <span key={p} className="px-2 py-0.5 rounded font-mono text-[10px] text-gray-400" style={{ background: '#0D1117' }}>{p}</span>
                  ))}
                </div>
              </div>
            )}

            {/* Connected Nodes */}
            <div>
              <div className="font-mono text-[9px] text-gray-600 uppercase tracking-wider mb-2">Connected ({connectedNodes.length})</div>
              <div className="space-y-1">
                {connectedNodes.map(cn => (
                  <div key={cn.id} className="flex items-center gap-2 py-1 px-2 rounded" style={{ background: '#0A0E14' }}>
                    <span className="w-1.5 h-1.5 rounded-full" style={{ background: CATEGORY_COLORS[cn.category] }} />
                    <span className="font-mono text-[10px] text-gray-400">{cn.label}</span>
                    <span className="font-mono text-[8px] text-gray-600 ml-auto">{cn.category}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
