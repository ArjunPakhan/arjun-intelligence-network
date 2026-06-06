import { useRef, useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import KnowledgeGraph, { CATEGORY_COLORS, CATEGORY_LABELS } from './KnowledgeGraph';
import NodePanel from './NodePanel';
import TimelineScrubber from './TimelineScrubber';
import MemoryPanels from './MemoryPanels';
import { useInView } from '../../hooks/useTypewriter';

export default function MemoryCore() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef);
  const [selectedNode, setSelectedNode] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [timelineDate, setTimelineDate] = useState(null);
  const [clusterMode, setClusterMode] = useState(false);

  const handleNodeSelect = useCallback((node) => {
    setSelectedNode(node);
  }, []);

  return (
    <section ref={sectionRef} className="layer-section pt-20 pb-24 px-4 md:px-8" style={{ background: '#04060C' }}>
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 15 }} animate={isInView ? { opacity: 1, y: 0 } : {}} className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="h-px w-12" style={{ background: 'linear-gradient(90deg, #00D4FF, transparent)' }} />
            <span className="font-mono text-[10px] tracking-widest text-electric-cyan uppercase">Layer 05</span>
          </div>
          <h2 className="text-display text-3xl md:text-4xl text-ghost-white">Memory Core</h2>
          <p className="text-body text-sm text-gray-500 mt-2 max-w-xl">
            Persistent knowledge graph. Every node is a concept, every edge is a relationship. Hover to explore connections. Click for details.
          </p>
        </motion.div>

        {/* Controls */}
        <motion.div initial={{ opacity: 0, y: 15 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.1 }} className="mb-4">
          <div className="flex flex-wrap items-center gap-3">
            {/* Search */}
            <div className="relative flex-1 min-w-[200px] max-w-xs">
              <span className="absolute left-2.5 top-1/2 -translate-y-1/2 text-gray-600 font-mono text-[10px]">⌕</span>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search nodes..."
                className="w-full pl-7 pr-3 py-1.5 rounded border font-mono text-[11px] text-ghost-white placeholder-gray-600 outline-none transition-colors"
                style={{ background: '#0A0E14', borderColor: '#1C2030' }}
              />
            </div>

            {/* Cluster toggle */}
            <button
              onClick={() => setClusterMode(prev => !prev)}
              className="px-3 py-1.5 rounded border font-mono text-[10px] transition-all"
              style={{
                background: clusterMode ? '#00D4FF12' : '#0A0E14',
                borderColor: clusterMode ? '#00D4FF' : '#1C2030',
                color: clusterMode ? '#00D4FF' : '#555',
              }}
            >
              {clusterMode ? 'Clustered' : 'Cluster'}
            </button>

            {/* Reset timeline */}
            {timelineDate && (
              <button
                onClick={() => setTimelineDate(null)}
                className="px-3 py-1.5 rounded border font-mono text-[10px] text-gray-500 hover:text-ghost-white transition-colors"
                style={{ background: '#0A0E14', borderColor: '#1C2030' }}
              >
                Reset Timeline
              </button>
            )}
          </div>
        </motion.div>

        {/* Timeline Scrubber */}
        <motion.div initial={{ opacity: 0, y: 15 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.15 }} className="mb-4">
          <div className="card-surface p-3">
            <TimelineScrubber currentDate={timelineDate} onChange={setTimelineDate} />
          </div>
        </motion.div>

        {/* Graph */}
        <motion.div initial={{ opacity: 0, y: 15 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.2 }} className="mb-4">
          <KnowledgeGraph
            onNodeSelect={handleNodeSelect}
            searchQuery={searchQuery}
            timelineDate={timelineDate}
            clusterMode={clusterMode}
          />
        </motion.div>

        {/* Legend */}
        <motion.div initial={{ opacity: 0 }} animate={isInView ? { opacity: 1 } : {}} transition={{ delay: 0.3 }} className="flex flex-wrap items-center gap-4 mb-8 font-mono text-[9px] text-gray-600">
          {Object.entries(CATEGORY_COLORS).filter(([k]) => k !== 'ghost').map(([cat, color]) => (
            <span key={cat} className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full" style={{ background: color }} />
              {CATEGORY_LABELS[cat]}
            </span>
          ))}
          <span className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full border border-dashed" style={{ borderColor: '#555' }} />
            Future
          </span>
          <span className="text-gray-700">|</span>
          <span>Hover: explore connections</span>
          <span>Click: node details</span>
          <span>Drag: reposition</span>
        </motion.div>

        {/* Panels */}
        <motion.div initial={{ opacity: 0, y: 15 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.4 }}>
          <MemoryPanels />
        </motion.div>
      </div>

      {/* Slide-in panel */}
      <NodePanel node={selectedNode} onClose={() => setSelectedNode(null)} />
    </section>
  );
}
