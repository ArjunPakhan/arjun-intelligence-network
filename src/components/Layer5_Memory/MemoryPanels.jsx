import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import graphData from '../../data/knowledge-graph.json';

const CATEGORY_COLORS = {
  security: '#FF2020',
  research: '#00FF88',
  systems: '#00D4FF',
  ml: '#9B59B6',
};

function PanelSection({ title, children, className = '' }) {
  const [expanded, setExpanded] = useState(true);
  return (
    <div className={`card-surface overflow-hidden ${className}`}>
      <button
        onClick={() => setExpanded(!expanded)}
        className="w-full flex items-center justify-between p-3 text-left"
      >
        <span className="font-mono text-[10px] text-gray-500 uppercase tracking-wider">{title}</span>
        <motion.span animate={{ rotate: expanded ? 180 : 0 }} className="text-gray-600 text-[10px]">▼</motion.span>
      </button>
      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ height: 0 }}
            animate={{ height: 'auto' }}
            exit={{ height: 0 }}
            className="overflow-hidden"
          >
            <div className="px-3 pb-3 space-y-2">
              {children}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function MemoryPanels() {
  const [activeTab, setActiveTab] = useState('notes');

  const tabs = [
    { id: 'notes', label: 'Research Notes' },
    { id: 'logs', label: 'Project Logs' },
    { id: 'lessons', label: 'Lessons Learned' },
    { id: 'future', label: 'Future Ideas' },
  ];

  return (
    <div className="space-y-4">
      {/* Tab bar */}
      <div className="flex flex-wrap gap-1.5">
        {tabs.map(t => (
          <button
            key={t.id}
            onClick={() => setActiveTab(t.id)}
            className="px-3 py-1.5 rounded font-mono text-[10px] transition-all"
            style={{
              background: activeTab === t.id ? '#00D4FF12' : '#0A0E14',
              color: activeTab === t.id ? '#00D4FF' : '#555',
              border: `1px solid ${activeTab === t.id ? '#00D4FF30' : '#1C2030'}`,
            }}
          >
            {t.label}
          </button>
        ))}
      </div>

      {/* Content */}
      <AnimatePresence mode="wait">
        {activeTab === 'notes' && (
          <motion.div key="notes" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {graphData.researchNotes.map(note => (
              <PanelSection key={note.id} title={note.title}>
                <div className="flex items-center gap-2 mb-1">
                  <span className="w-1.5 h-1.5 rounded-full" style={{ background: CATEGORY_COLORS[note.category] }} />
                  <span className="font-mono text-[8px] text-gray-600">{note.date}</span>
                </div>
                <p className="text-body text-[11px] text-gray-400 leading-relaxed">{note.content}</p>
              </PanelSection>
            ))}
          </motion.div>
        )}

        {activeTab === 'logs' && (
          <motion.div key="logs" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-2">
            {graphData.projectLogs.map(log => (
              <div key={log.id} className="card-surface p-3">
                <div className="flex items-center justify-between mb-1">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-[9px] text-cuda-orange tracking-wider">{log.operation}</span>
                    <span className="font-mono text-[10px] text-ghost-white">{log.title}</span>
                  </div>
                  <span className="font-mono text-[8px] text-gray-600">{log.date}</span>
                </div>
                <p className="text-body text-[11px] text-gray-500">{log.content}</p>
                <span className="inline-block mt-1 px-1.5 py-0.5 rounded font-mono text-[8px]" style={{
                  color: log.status === 'completed' ? '#00FF88' : '#FF6B00',
                  background: log.status === 'completed' ? '#00FF8810' : '#FF6B0010',
                }}>{log.status}</span>
              </div>
            ))}
          </motion.div>
        )}

        {activeTab === 'lessons' && (
          <motion.div key="lessons" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {graphData.lessonsLearned.map(lesson => (
              <div key={lesson.id} className="card-surface p-3">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-force-green text-xs">▸</span>
                  <span className="font-mono text-[11px] text-ghost-white font-medium">{lesson.lesson}</span>
                </div>
                <p className="text-body text-[11px] text-gray-500 leading-relaxed ml-4">{lesson.detail}</p>
                <span className="font-mono text-[8px] text-gray-600 ml-4 mt-1 inline-block">from {lesson.project}</span>
              </div>
            ))}
          </motion.div>
        )}

        {activeTab === 'future' && (
          <motion.div key="future" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {graphData.futureIdeas.map(idea => (
              <div key={idea.id} className="card-surface p-3" style={{ borderColor: '#1C203040' }}>
                <div className="flex items-center justify-between mb-1">
                  <span className="font-mono text-[11px] text-ghost-white font-medium">{idea.title}</span>
                  <span className="font-mono text-[8px] text-gray-600">{idea.status}</span>
                </div>
                <p className="text-body text-[11px] text-gray-500 leading-relaxed">{idea.content}</p>
              </div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
