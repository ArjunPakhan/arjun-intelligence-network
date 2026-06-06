import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ConfusionMatrix from './ConfusionMatrix';
import FeatureImportance from './FeatureImportance';
import { ML_RESEARCH, DATASETS, MODEL_LEADERBOARD } from '../../utils/constants';
import { useInView } from '../../hooks/useTypewriter';

function DatasetExplorer() {
  return (
    <div className="space-y-3">
      {DATASETS.map((ds) => (
        <div key={ds.name} className="p-4 rounded border" style={{ background: '#0D1117', borderColor: '#2A3040' }}>
          <div className="flex items-start justify-between mb-2">
            <h4 className="font-mono text-sm font-bold text-code-green">{ds.name}</h4>
            <span className="font-mono text-[9px] text-gray-500">{ds.source}</span>
          </div>
          <p className="text-xs text-gray-400 mb-3">{ds.description}</p>
          <div className="grid grid-cols-3 gap-3">
            <div className="p-2 rounded" style={{ background: '#161B22' }}>
              <div className="font-mono text-sm font-bold text-code-green">{ds.rows}</div>
              <div className="font-mono text-[9px] text-gray-500">Rows</div>
            </div>
            <div className="p-2 rounded" style={{ background: '#161B22' }}>
              <div className="font-mono text-sm font-bold text-electric-cyan">{ds.features}</div>
              <div className="font-mono text-[9px] text-gray-500">Features</div>
            </div>
            <div className="p-2 rounded" style={{ background: '#161B22' }}>
              <div className="font-mono text-sm font-bold text-sith-red">{ds.attackClasses}</div>
              <div className="font-mono text-[9px] text-gray-500">Attack Classes</div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

function ModelLeaderboard() {
  const [selected, setSelected] = useState(null);
  const maxAcc = 99.7;

  return (
    <div className="space-y-3">
      {MODEL_LEADERBOARD.map((model) => (
        <div
          key={model.name}
          onClick={() => setSelected(selected === model.name ? null : model.name)}
          className="p-3 rounded border cursor-pointer transition-all"
          style={{
            background: '#0D1117',
            borderColor: selected === model.name ? '#00FF88' : '#2A3040',
          }}
        >
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <span className="font-mono text-sm font-bold text-ghost-white">{model.name}</span>
              {model.status === 'future' && <span className="px-1.5 py-0.5 rounded text-[8px] font-mono text-gray-500 border border-gray-700">PLANNED</span>}
            </div>
            {model.accuracy !== null && (
              <span className="font-mono text-sm font-bold text-code-green">{model.accuracy}%</span>
            )}
          </div>

          {model.accuracy !== null && (
            <div className="h-1.5 rounded-full overflow-hidden mb-2" style={{ background: '#161B22' }}>
              <div className="h-full rounded-full" style={{ width: `${(model.accuracy / maxAcc) * 100}%`, background: 'linear-gradient(90deg, #00FF88, #00D4FF)' }} />
            </div>
          )}

          <p className="text-[10px] text-gray-500">{model.notes}</p>

          <AnimatePresence>
            {selected === model.name && model.accuracy !== null && (
              <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden">
                <div className="grid grid-cols-4 gap-2 mt-3 pt-3 border-t border-terminal-border/30">
                  <div><div className="font-mono text-[9px] text-gray-500">Precision</div><div className="font-mono text-xs text-code-green">{model.precision}%</div></div>
                  <div><div className="font-mono text-[9px] text-gray-500">Recall</div><div className="font-mono text-xs text-code-green">{model.recall}%</div></div>
                  <div><div className="font-mono text-[9px] text-gray-500">F1 Score</div><div className="font-mono text-xs text-code-green">{model.f1}%</div></div>
                  <div><div className="font-mono text-[9px] text-gray-500">Accuracy</div><div className="font-mono text-xs text-code-green">{model.accuracy}%</div></div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      ))}
    </div>
  );
}

function ArchitectureExplorer() {
  const [selectedOp, setSelectedOp] = useState('sentinel');
  const [hoveredStep, setHoveredStep] = useState(null);

  const architectures = {
    sentinel: [
      { block: 'Client Nodes', tech: 'Java', purpose: 'Flow collection at network edges', data: 'Raw packets → flow records', color: '#00D4FF', latency: '2ms' },
      { block: 'AES-256', tech: 'AES-256-CBC', purpose: 'Secure inter-node transport', data: 'Encrypted flow data', color: '#9B59B6', latency: '0.5ms' },
      { block: 'Flask API', tech: 'Flask', purpose: 'Aggregation and preprocessing', data: '79 features per flow', color: '#FF6B00', latency: '5ms' },
      { block: 'ML Pipeline', tech: 'RF + XGBoost + IF', purpose: 'Ensemble classification', data: '10 attack class predictions', color: '#00FF88', latency: '12ms' },
      { block: 'Dashboard', tech: 'React + D3', purpose: 'Real-time threat visualization', data: 'Alerts + metrics', color: '#FFD700', latency: '<1ms' },
    ],
    cerberus: [
      { block: 'IoT Devices', tech: 'CIC-IoTMal', purpose: 'Telemetry collection', data: '455K+ samples', color: '#00D4FF', latency: '—' },
      { block: 'Feature Engine', tech: 'Hybrid Selection', purpose: '57% dimensionality reduction', data: '20 → 9 features', color: '#FF6B00', latency: '3ms' },
      { block: 'SMOTE', tech: 'SMOTE', purpose: 'Class imbalance handling', data: 'Balanced training set', color: '#9B59B6', latency: '8ms' },
      { block: 'XGBoost', tech: 'XGBoost', purpose: 'Multi-class classification', data: '8 malware family predictions', color: '#00FF88', latency: '15ms' },
      { block: 'Evaluation', tech: 'Sklearn', purpose: 'Confusion matrix + metrics', data: '~88% accuracy', color: '#FFD700', latency: '2ms' },
    ],
  };

  const arch = architectures[selectedOp] || architectures.sentinel;

  return (
    <div className="space-y-4">
      <div className="flex gap-2">
        {Object.keys(architectures).map(op => (
          <button key={op} onClick={() => setSelectedOp(op)} className="px-3 py-1.5 rounded border font-mono text-[10px] transition-all" style={{
            background: selectedOp === op ? '#00FF8812' : '#0A0E14',
            borderColor: selectedOp === op ? '#00FF88' : '#1C2030',
            color: selectedOp === op ? '#00FF88' : '#555',
          }}>
            {op.toUpperCase()}
          </button>
        ))}
      </div>

      {/* Signal Flow */}
      <div className="relative">
        {arch.map((step, i) => {
          const isLast = i === arch.length - 1;
          const isHovered = hoveredStep === `${selectedOp}-${i}`;
          const colors = {
            input: '#00D4FF',
            processing: '#FF6B00',
            output: '#00FF88',
          };
          const nodeColor = isLast ? colors.output : i === 0 ? colors.input : colors.processing;

          return (
            <div
              key={i}
              className="flex items-stretch relative"
              onMouseEnter={() => setHoveredStep(`${selectedOp}-${i}`)}
              onMouseLeave={() => setHoveredStep(null)}
            >
              {/* Vertical line with animated packet */}
              <div className="flex flex-col items-center w-10 relative">
                <div className="w-3 h-3 rounded-full border-2 transition-all duration-200" style={{
                  borderColor: nodeColor,
                  background: isHovered ? nodeColor : '#0A0E14',
                  boxShadow: isHovered ? `0 0 8px ${nodeColor}40` : 'none',
                }} />
                {!isLast && (
                  <div className="w-px flex-1 relative" style={{ background: `${nodeColor}20` }}>
                    {/* Animated packet */}
                    <div
                      className="absolute left-0 w-1 h-1 rounded-full"
                      style={{
                        background: nodeColor,
                        animation: `packet-move-${selectedOp}-${i} 2s linear infinite`,
                        animationDelay: `${i * 0.4}s`,
                      }}
                    />
                    <style>{`
                      @keyframes packet-move-${selectedOp}-${i} {
                        0% { top: 0; opacity: 0; }
                        10% { opacity: 1; }
                        90% { opacity: 1; }
                        100% { top: 100%; opacity: 0; }
                      }
                    `}</style>
                  </div>
                )}
              </div>

              {/* Content card */}
              <div className="flex-1 pb-4 ml-2">
                <div className="p-3 rounded border transition-all duration-200" style={{
                  background: isHovered ? 'rgba(255,255,255,0.03)' : '#0A0E14',
                  borderColor: isHovered ? `${nodeColor}30` : '#1C2030',
                }}>
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-mono text-[11px] font-medium" style={{ color: nodeColor }}>{step.block}</span>
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-[9px] text-gray-600">{step.latency}</span>
                      <span className="font-mono text-[9px] px-1.5 py-0.5 rounded" style={{ background: '#0D1117', color: '#555' }}>{step.tech}</span>
                    </div>
                  </div>
                  <p className="text-[10px] text-gray-500">{step.purpose}</p>
                  {isHovered && (
                    <div className="mt-2 pt-2 border-t border-terminal-border/20">
                      <span className="font-mono text-[9px] text-gray-600">Data: </span>
                      <span className="font-mono text-[9px]" style={{ color: nodeColor }}>{step.data}</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default function MLResearch() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef);
  const [expandedIndex, setExpandedIndex] = useState(null);
  const [activeTab, setActiveTab] = useState('confusion');

  const tabs = [
    { id: 'confusion', label: 'Confusion Matrix' },
    { id: 'features', label: 'Feature Lab' },
    { id: 'datasets', label: 'Datasets' },
    { id: 'models', label: 'Model Leaderboard' },
    { id: 'architecture', label: 'Architecture' },
  ];

  return (
    <section ref={sectionRef} className="layer-section pt-20 pb-24 px-4 md:px-8" style={{ background: 'linear-gradient(180deg, #06080F 0%, #060F0A 50%, #06080F 100%)' }}>
      <div className="max-w-6xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6 }} className="mb-16">
          <div className="flex items-center gap-3 mb-4">
            <div className="h-px flex-1 max-w-[60px]" style={{ background: 'linear-gradient(90deg, #00FF88, transparent)' }} />
            <span className="font-mono text-xs tracking-widest text-code-green uppercase">Layer 03</span>
            <div className="h-px flex-1 max-w-[60px]" style={{ background: 'linear-gradient(90deg, transparent, #00FF88)' }} />
          </div>
          <h2 className="font-mono text-3xl md:text-4xl font-bold text-code-green">Research Lab</h2>
          <p className="mt-3 text-gray-400 max-w-2xl leading-relaxed">Interactive ML analysis with real datasets, model comparisons, and architecture exploration.</p>
        </motion.div>

        {/* Research cards */}
        <div className="space-y-4 mb-16">
          {ML_RESEARCH.map((r, i) => (
            <motion.div key={r.title} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }} className="rounded-lg border cursor-pointer" style={{ background: '#0D1117', borderColor: expandedIndex === i ? '#00FF88' : '#2A3040' }} onClick={() => setExpandedIndex(expandedIndex === i ? null : i)}>
              <div className="p-5">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <div className="font-mono text-[10px] text-code-green/60 tracking-widest mb-1">{r.codename}</div>
                    <h3 className="font-mono text-sm font-bold text-code-green">{r.title}</h3>
                  </div>
                  <span className="px-2 py-0.5 rounded font-mono text-[9px] text-code-green border border-code-green/30" style={{ background: '#00FF8810' }}>{r.status}</span>
                </div>
                {r.plainSummary && (
                  <div className="mb-2">
                    <p className="text-xs text-gray-300 leading-relaxed">{r.plainSummary}</p>
                    {r.impact && (
                      <p className="text-[10px] text-code-green/60 mt-1 font-medium">{r.impact}</p>
                    )}
                  </div>
                )}
                <div className="flex items-center gap-3 mb-2 font-mono text-[10px] text-gray-500">
                  <span>{r.coAuthor}</span><span>{r.advisor}</span><span>{r.year}</span>
                </div>
                <AnimatePresence>
                  {expandedIndex === i && (
                    <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden">
                      <div className="mt-3 p-3 rounded border" style={{ background: '#0A0E17', borderColor: '#00FF8830' }}>
                        <div className="font-mono text-[9px] text-gray-500 uppercase tracking-wider mb-2">Key Findings</div>
                        {r.keyFindings.map((f, j) => <div key={j} className="flex items-start gap-2 font-mono text-[11px] text-ghost-white mb-1"><span className="text-code-green">▸</span>{f}</div>)}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Interactive tools */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.3 }}>
          <h3 className="font-mono text-sm text-code-green mb-4 tracking-wider">ML ANALYSIS TOOLS</h3>
          <div className="flex flex-wrap gap-1.5 mb-4">
            {tabs.map(t => (
              <button key={t.id} onClick={() => setActiveTab(t.id)} className="px-3 py-1.5 rounded border font-mono text-[10px] transition-all" style={{
                background: activeTab === t.id ? '#00FF8815' : '#0D1117',
                borderColor: activeTab === t.id ? '#00FF88' : '#2A3040',
                color: activeTab === t.id ? '#00FF88' : '#666',
              }}>
                {t.label}
              </button>
            ))}
          </div>

          <div className="terminal-window">
            <div className="terminal-header">
              <div className="terminal-dot" style={{ background: '#FF5F56' }} />
              <div className="terminal-dot" style={{ background: '#FFBD2E' }} />
              <div className="terminal-dot" style={{ background: '#27C93F' }} />
              <span className="ml-3 text-xs font-mono tracking-wider text-code-green">ml_analysis/{activeTab}.py</span>
            </div>
            <div className="p-4">
              <AnimatePresence mode="wait">
                {activeTab === 'confusion' && <motion.div key="c" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}><ConfusionMatrix /></motion.div>}
                {activeTab === 'features' && <motion.div key="f" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}><FeatureImportance /></motion.div>}
                {activeTab === 'datasets' && <motion.div key="d" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}><DatasetExplorer /></motion.div>}
                {activeTab === 'models' && <motion.div key="m" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}><ModelLeaderboard /></motion.div>}
                {activeTab === 'architecture' && <motion.div key="a" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}><ArchitectureExplorer /></motion.div>}
              </AnimatePresence>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
