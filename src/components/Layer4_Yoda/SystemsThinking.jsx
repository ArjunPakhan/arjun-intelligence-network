import { useRef, useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SYSTEMS_THINKING, REASONING_TREE } from '../../utils/constants';
import { useInView } from '../../hooks/useTypewriter';
import { usePortfolioData } from '../../hooks/usePortfolioData';

function ReasoningTree() {
  const [isBuilding, setIsBuilding] = useState(false);
  const [visibleNodes, setVisibleNodes] = useState([]);
  const [expandedNode, setExpandedNode] = useState(null);

  const buildTree = () => {
    setIsBuilding(true);
    setVisibleNodes([]);
    setExpandedNode(null);

    // Reveal root question first
    setTimeout(() => {
      setVisibleNodes(['root']);
    }, 200);

    // Then reveal each branch sequentially
    REASONING_TREE.nodes.forEach((node, i) => {
      setTimeout(() => {
        setVisibleNodes(prev => [...prev, node.id]);
      }, 600 + i * 500);
    });

    setTimeout(() => setIsBuilding(false), 600 + REASONING_TREE.nodes.length * 500);
  };

  useEffect(() => {
    buildTree();
  }, []);

  return (
    <div className="space-y-4">
      <div className="p-4 rounded border" style={{ background: '#0A0E14', borderColor: '#7FFF0020' }}>
        <div className="font-mono text-[9px] text-gray-600 uppercase tracking-wider mb-1">Question</div>
        <div className="text-display text-sm text-force-green">{REASONING_TREE.question}</div>
      </div>

      {/* Tree visualization */}
      <div className="relative pl-4">
        {REASONING_TREE.nodes.map((node, i) => {
          const isVisible = visibleNodes.includes(node.id);
          if (!isVisible) return null;

          return (
            <motion.div
              key={node.id}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3 }}
              className="mb-2"
            >
              {/* Connector line */}
              <div className="flex items-center gap-2 mb-1">
                <div className="w-3 h-px bg-force-green/30" />
                <div className="w-1.5 h-1.5 rounded-full border border-force-green" style={{ background: expandedNode === node.id ? '#7FFF00' : '#0A0E14' }} />
                <button
                  onClick={() => setExpandedNode(expandedNode === node.id ? null : node.id)}
                  className="font-mono text-[11px] text-force-green hover:text-white transition-colors text-left"
                >
                  {node.label}
                </button>
                <motion.span animate={{ rotate: expandedNode === node.id ? 90 : 0 }} className="text-gray-600 text-[9px]">▶</motion.span>
              </div>

              {/* Children */}
              <AnimatePresence>
                {expandedNode === node.id && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="overflow-hidden ml-5"
                  >
                    <div className="space-y-1 py-1">
                      {node.children.map((child, j) => (
                        <motion.div
                          key={child.id}
                          initial={{ opacity: 0, x: -8 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: j * 0.08 }}
                          className="flex items-start gap-2 py-0.5"
                        >
                          <span className="w-1 h-1 rounded-full mt-1.5 flex-shrink-0" style={{
                            background: child.impact === 'high' ? '#FF2020' : child.impact === 'medium' ? '#FFD700' : '#00FF88',
                          }} />
                          <span className="text-body text-[11px] text-gray-400">{child.label}</span>
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          );
        })}
      </div>

      {/* Rebuild button */}
      {!isBuilding && (
        <button
          onClick={buildTree}
          className="font-mono text-[9px] text-gray-600 hover:text-force-green transition-colors"
        >
          ↻ Rebuild reasoning tree
        </button>
      )}
    </div>
  );
}

export default function SystemsThinking() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef);
  const { linkedinPosts, buildLog } = usePortfolioData();

  const categoryColors = {
    'cross-domain': '#00D4FF',
    'technical-insight': '#00FF88',
    'human-behavior': '#FFD700',
    'behind-the-build': '#FF6B00',
  };

  const formatDate = (dateStr) => {
    const d = new Date(dateStr);
    return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };

  return (
    <section ref={sectionRef} className="layer-section pt-20 pb-24 px-4 md:px-8" style={{ background: 'linear-gradient(180deg, #06080F 0%, #0A0F06 50%, #06080F 100%)' }}>
      <div className="max-w-6xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6 }} className="mb-16">
          <div className="flex items-center gap-3 mb-4">
            <div className="h-px flex-1 max-w-[60px]" style={{ background: 'linear-gradient(90deg, #7FFF00, transparent)' }} />
            <span className="font-mono text-xs tracking-widest text-force-green uppercase">Layer 04</span>
            <div className="h-px flex-1 max-w-[60px]" style={{ background: 'linear-gradient(90deg, transparent, #7FFF00)' }} />
          </div>
          <h2 className="font-mono text-3xl md:text-4xl font-bold text-force-green">Systems Thinking</h2>
          <p className="mt-3 text-gray-400 max-w-2xl leading-relaxed">Visualize reasoning. See how decisions are made — assumptions, tradeoffs, alternatives, and final choices.</p>
        </motion.div>

        {/* Reasoning Tree */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.1 }} className="mb-16">
          <h3 className="font-mono text-sm text-force-green mb-4 tracking-wider">REASONING TREE</h3>
          <ReasoningTree />
        </motion.div>

        {/* Mental Models */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.2 }} className="mb-16">
          <h3 className="font-mono text-sm text-force-green mb-4 tracking-wider">MENTAL MODELS</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {SYSTEMS_THINKING.map((model, i) => (
              <motion.div key={model.title} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 + i * 0.08 }} className="p-4 rounded-lg border" style={{ background: '#0D1117', borderColor: '#2A3040' }}>
                <span className="px-2 py-0.5 rounded font-mono text-[8px] text-force-green border border-force-green/30" style={{ background: '#7FFF0010' }}>{model.category}</span>
                <h4 className="font-mono text-xs font-bold text-force-green mt-2 mb-1">{model.title}</h4>
                <p className="text-[11px] text-gray-400 leading-relaxed">{model.content}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Intelligence Briefs */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.4 }} className="mb-16">
          <h3 className="font-mono text-sm text-force-green mb-4 tracking-wider">INTELLIGENCE BRIEFS</h3>
          <div className="space-y-3">
            {linkedinPosts.map((post) => (
              <button
                key={post.id}
                onClick={() => window.open(post.url, '_blank', 'noopener,noreferrer')}
                className="block w-full text-left p-4 rounded-lg border transition-all hover:border-force-green group"
                style={{ background: '#0D1117', borderColor: '#2A3040' }}
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span
                        className="px-1.5 py-0.5 rounded font-mono text-[8px] border"
                        style={{
                          color: categoryColors[post.category] || '#7FFF00',
                          borderColor: `${categoryColors[post.category] || '#7FFF00'}30`,
                          background: `${categoryColors[post.category] || '#7FFF00'}10`,
                        }}
                      >
                        {post.category}
                      </span>
                      <span className="font-mono text-[9px] text-gray-600">{formatDate(post.date)}</span>
                    </div>
                    <h4 className="font-mono text-xs text-force-green group-hover:text-white transition-colors">{post.title}</h4>
                    <p className="mt-1 text-[10px] text-gray-500">{post.preview}</p>
                    <div className="flex flex-wrap gap-1 mt-2">
                      {post.tags.map(tag => (
                        <span key={tag} className="font-mono text-[7px] text-gray-600 px-1 py-0.5 rounded" style={{ background: '#161B22' }}>{tag}</span>
                      ))}
                    </div>
                  </div>
                  <span className="font-mono text-[9px] text-force-green shrink-0 ml-4 group-hover:text-white transition-colors">READ ON LINKEDIN →</span>
                </div>
              </button>
            ))}
          </div>
        </motion.div>

        {/* Build Log */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.5 }}>
          <h3 className="font-mono text-sm text-force-green mb-4 tracking-wider">BUILD LOG — ACTIVE</h3>
          <div className="space-y-3">
            {buildLog
              .slice()
              .sort((a, b) => new Date(b.date) - new Date(a.date))
              .map((log, i) => (
                <div
                  key={i}
                  className="flex items-start gap-3 p-3 rounded border-l-2"
                  style={{ background: '#0D1117', borderLeftColor: '#7FFF00' }}
                >
                  <span className="font-mono text-[9px] text-force-green px-1.5 py-0.5 rounded shrink-0" style={{ background: '#7FFF0010' }}>
                    {formatDate(log.date)}
                  </span>
                  <div className="flex-1">
                    <p className="font-mono text-[11px] text-gray-300">{log.entry}</p>
                    <div className="flex flex-wrap gap-1 mt-1.5">
                      {log.tags.map(tag => (
                        <span key={tag} className="font-mono text-[7px] text-gray-600 px-1 py-0.5 rounded" style={{ background: '#161B22' }}>{tag}</span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
