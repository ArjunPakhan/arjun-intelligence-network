import { useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import AnomalyDetector from './AnomalyDetector';
import BiasQuiz from './BIASQuiz';
import GPURaceVisualizer from './GPURaceVisualizer';
import AESDemo from './AESDemo';
import { useInView } from '../../hooks/useTypewriter';

const DEMOS = [
  { id: 'anomaly', name: 'Network Anomaly Detector', color: '#FF2020' },
  { id: 'quiz', name: 'UPI Behavioral Bias Quiz', color: '#FFD700' },
  { id: 'gpu', name: 'GPU vs CPU Race', color: '#00FF88' },
  { id: 'aes', name: 'AES Encryption Visualizer', color: '#00D4FF' },
];

export default function ResearchLab() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef);
  const [activeDemo, setActiveDemo] = useState('anomaly');

  return (
    <section
      ref={sectionRef}
      className="layer-section py-24 px-4 md:px-8"
      style={{ background: 'linear-gradient(180deg, #06080F 0%, #060C14 50%, #06080F 100%)' }}
    >
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="h-px flex-1 max-w-[60px]" style={{ background: 'linear-gradient(90deg, #00D4FF, transparent)' }} />
            <span className="font-mono text-xs tracking-widest text-electric-cyan uppercase">Layer 05 — Hidden</span>
            <div className="h-px flex-1 max-w-[60px]" style={{ background: 'linear-gradient(90deg, transparent, #00D4FF)' }} />
          </div>
          <h2 className="font-mono text-3xl md:text-4xl font-bold text-electric-cyan">
            The Research Lab
          </h2>
          <p className="mt-3 text-gray-400 max-w-2xl leading-relaxed">
            You found it. Four live, client-side ML demos. No server calls.
            Every algorithm shown step by step — math visible, not hidden.
          </p>
        </motion.div>

        {/* Demo selector */}
        <div className="flex flex-wrap gap-2 mb-8">
          {DEMOS.map((demo) => (
            <button
              key={demo.id}
              onClick={() => setActiveDemo(demo.id)}
              className="px-4 py-2 rounded border font-mono text-xs transition-all"
              style={{
                background: activeDemo === demo.id ? `${demo.color}15` : '#0D1117',
                borderColor: activeDemo === demo.id ? demo.color : '#2A3040',
                color: activeDemo === demo.id ? demo.color : '#666',
              }}
            >
              {demo.name}
            </button>
          ))}
        </div>

        {/* Demo content */}
        <div className="terminal-window">
          <div className="terminal-header">
            <div className="terminal-dot" style={{ background: '#FF5F56' }} />
            <div className="terminal-dot" style={{ background: '#FFBD2E' }} />
            <div className="terminal-dot" style={{ background: '#27C93F' }} />
            <span className="ml-3 text-xs font-mono tracking-wider text-electric-cyan">
              research_lab/{activeDemo}.py
            </span>
          </div>
          <div className="p-4">
            <AnimatePresence mode="wait">
              {activeDemo === 'anomaly' && (
                <motion.div key="anomaly" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                  <AnomalyDetector />
                </motion.div>
              )}
              {activeDemo === 'quiz' && (
                <motion.div key="quiz" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                  <BiasQuiz />
                </motion.div>
              )}
              {activeDemo === 'gpu' && (
                <motion.div key="gpu" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                  <GPURaceVisualizer />
                </motion.div>
              )}
              {activeDemo === 'aes' && (
                <motion.div key="aes" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                  <AESDemo />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
