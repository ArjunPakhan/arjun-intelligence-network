import { motion } from 'framer-motion';
import { RESEARCH_TIMELINE } from '../../utils/constants';

const STATUS_STYLES = {
  completed: { color: '#00FF88', bg: '#00FF88', label: 'Completed' },
  active: { color: '#FF6B00', bg: '#FF6B00', label: 'Active' },
  development: { color: '#00D4FF', bg: '#00D4FF', label: 'In Dev' },
  research: { color: '#FFD700', bg: '#FFD700', label: 'Research' },
  planned: { color: '#333', bg: '#333', label: 'Planned' },
};

// Gantt positions: 2024 starts at 0%, 2026 ends at 100%
const yearToPercent = (year) => {
  const y = parseFloat(year);
  return ((y - 2024) / 2) * 100; // 2024-2026 range
};

export default function ResearchTimeline({ onClose, onNavigate }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 80 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 80 }}
      className="fixed bottom-0 left-0 right-0 z-40"
      style={{ background: 'rgba(6, 8, 15, 0.98)', borderTop: '1px solid #1C2030', backdropFilter: 'blur(10px)' }}
    >
      <div className="max-w-6xl mx-auto px-4 md:px-8 py-5">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-mono text-[11px] text-cuda-orange tracking-wider uppercase">Mission Control</h3>
          <button onClick={onClose} className="font-mono text-[10px] text-gray-600 hover:text-sith-red transition-colors">[ESC]</button>
        </div>

        {/* Year headers */}
        <div className="relative h-4 mb-1">
          {[2024, 2025, 2026].map(year => (
            <span key={year} className="absolute font-mono text-[9px] text-gray-600" style={{ left: `${yearToPercent(year)}%` }}>{year}</span>
          ))}
        </div>

        {/* Gantt bars */}
        <div className="relative">
          {/* Timeline axis */}
          <div className="absolute top-0 bottom-0 left-0 right-0" style={{ background: 'linear-gradient(90deg, #1C2030 1px, transparent 1px)', backgroundSize: '50% 100%' }} />

          <div className="space-y-2">
            {RESEARCH_TIMELINE.map((item, i) => {
              const style = STATUS_STYLES[item.status] || STATUS_STYLES.planned;
              const startPos = yearToPercent(item.year);
              const isActive = item.status === 'active' || item.status === 'research';
              const isPlanned = item.status === 'planned';
              const barWidth = isActive ? 15 : 10;

              return (
                <motion.button
                  key={item.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.06 }}
                  onClick={() => { onNavigate(item.layer); onClose(); }}
                  className="relative w-full text-left group"
                >
                  <div className="flex items-center gap-3">
                    {/* Codename label */}
                    <span className="font-mono text-[9px] text-gray-500 w-20 shrink-0 text-right group-hover:text-ghost-white transition-colors">
                      {item.codename}
                    </span>

                    {/* Gantt bar */}
                    <div className="flex-1 relative h-5">
                      <div
                        className="absolute top-0 h-full rounded-sm transition-all group-hover:brightness-125"
                        style={{
                          left: `${startPos}%`,
                          width: `${barWidth}%`,
                          background: isPlanned ? 'transparent' : `${style.bg}25`,
                          border: isPlanned ? `1px dashed ${style.color}` : `1px solid ${style.color}40`,
                        }}
                      >
                        {isActive && (
                          <div className="absolute inset-0 rounded-sm overflow-hidden">
                            <div className="h-full w-full" style={{
                              background: `linear-gradient(90deg, ${style.bg}30, ${style.bg}60, ${style.bg}30)`,
                              animation: 'gantt-shimmer 3s ease-in-out infinite',
                            }} />
                          </div>
                        )}
                      </div>

                      {/* Label inside/near bar */}
                      <span
                        className="absolute top-0.5 font-mono text-[8px] text-gray-500 group-hover:text-ghost-white transition-colors whitespace-nowrap"
                        style={{ left: `${startPos + barWidth + 1}%` }}
                      >
                        {item.title}
                      </span>
                    </div>
                  </div>
                </motion.button>
              );
            })}
          </div>
        </div>

        {/* Legend */}
        <div className="flex flex-wrap items-center gap-4 mt-4 font-mono text-[9px] text-gray-600">
          {Object.entries(STATUS_STYLES).map(([key, s]) => (
            <span key={key} className="flex items-center gap-1">
              <span className="w-2 h-1.5 rounded-sm" style={{ background: s.bg, opacity: key === 'planned' ? 0.3 : 0.6 }} />
              {s.label}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
