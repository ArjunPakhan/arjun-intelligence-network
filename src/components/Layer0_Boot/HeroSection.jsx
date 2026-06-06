import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import HeroParticles from './HeroParticles';
import { LIVE_METRICS, CURRENT_MISSION } from '../../utils/constants';

function DataPulseMetric({ metric, index }) {
  const [displayValue, setDisplayValue] = useState(metric.value);
  const [isTicking, setIsTicking] = useState(false);
  const target = parseFloat(metric.value);
  const isDecimal = metric.value.includes('.');

  useEffect(() => {
    const interval = setInterval(() => {
      setIsTicking(true);
      setTimeout(() => {
        if (isDecimal) {
          const delta = (Math.random() - 0.3) * 0.01;
          setDisplayValue((target + delta).toFixed(1));
        } else {
          const delta = Math.floor(Math.random() * 3);
          setDisplayValue(String(parseInt(displayValue) + delta));
        }
        setIsTicking(false);
      }, 300);
    }, 8000 + index * 2000);
    return () => clearInterval(interval);
  }, [target, isDecimal, displayValue, index]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1.5 + index * 0.08 }}
      className="text-center"
    >
      <div
        className="font-mono text-2xl md:text-3xl font-bold data-pulse"
        style={{ color: metric.color, textShadow: `0 0 12px ${metric.color}30` }}
      >
        <span className={isTicking ? 'tick' : ''}>{displayValue}</span>
        <span className="text-base md:text-lg">{metric.suffix}</span>
      </div>
      <div className="font-mono text-[10px] text-gray-500 mt-1.5 tracking-wide">{metric.label}</div>
    </motion.div>
  );
}

export default function HeroSection({ onNavigate }) {
  const [showContent, setShowContent] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setShowContent(true), 300);
    return () => clearTimeout(t);
  }, []);

  return (
    <section className="layer-section relative flex items-center justify-center overflow-hidden" style={{ background: '#06080F' }}>
      <HeroParticles />
      <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse at center, transparent 20%, #06080F 75%)' }} />

      {showContent && (
        <div className="relative z-10 text-center px-4 max-w-5xl mx-auto">
          {/* Name — Display tier */}
          <motion.div initial={{ opacity: 0, y: 25 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.2 }}>
            <h1
              className="text-display text-5xl md:text-7xl lg:text-8xl"
              style={{ background: 'linear-gradient(135deg, #FF6B00, #FF8C40, #FFD700)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}
            >
              ARJUN
            </h1>
            <h2 className="font-mono text-sm md:text-base tracking-[0.4em] mt-2" style={{ color: '#444' }}>
              INTELLIGENCE NETWORK
            </h2>
          </motion.div>

          {/* Subtitle — Body tier */}
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.7 }} className="text-body text-sm text-cuda-orange mt-5 tracking-wider uppercase">
            Intelligence Systems Engineer
          </motion.p>
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.9 }} className="text-body text-xs text-gray-500 mt-1.5">
            Building systems that detect, reason, learn, and defend.
          </motion.p>

          {/* Live Metrics — Data tier with pulse */}
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.3 }} className="mt-14 grid grid-cols-3 md:grid-cols-5 gap-6 md:gap-8">
            {LIVE_METRICS.map((m, i) => <DataPulseMetric key={m.label} metric={m} index={i} />)}
          </motion.div>

          {/* Mission — Data tier */}
          <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 2.2 }} className="mt-10 mx-auto max-w-lg">
            <div className="card-surface p-5">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-1.5 h-1.5 rounded-full bg-code-green animate-pulse" />
                <span className="font-mono text-[9px] text-gray-500 uppercase tracking-widest">Current Mission — {CURRENT_MISSION.name}</span>
              </div>
              <div className="text-left space-y-2">
                <div className="font-mono text-xs"><span className="text-gray-500">Objective: </span><span className="text-ghost-white">{CURRENT_MISSION.objective}</span></div>
                <div className="font-mono text-xs"><span className="text-gray-500">Status: </span><span className="text-cuda-orange">{CURRENT_MISSION.status}</span></div>
                <div className="font-mono text-xs"><span className="text-gray-500">Target: </span><span className="text-imperial-gold">{CURRENT_MISSION.target}</span></div>
                <div className="pt-2">
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-mono text-[9px] text-gray-600">Progress</span>
                    <span className="font-mono text-[9px] text-code-green">{CURRENT_MISSION.progress}%</span>
                  </div>
                  <div className="h-1 rounded-full overflow-hidden" style={{ background: '#161B22' }}>
                    <motion.div
                      className="h-full rounded-full"
                      style={{ background: 'linear-gradient(90deg, #FF6B00, #00FF88)' }}
                      initial={{ width: 0 }}
                      animate={{ width: `${CURRENT_MISSION.progress}%` }}
                      transition={{ delay: 2.8, duration: 1.2 }}
                    />
                  </div>
                </div>
                <div className="pt-2 space-y-1">
                  {CURRENT_MISSION.log.map((entry, i) => (
                    <div key={i} className="flex items-center gap-2 font-mono text-[9px]">
                      <span className={`w-1 h-1 rounded-full flex-shrink-0 ${entry.status === 'done' ? 'bg-code-green' : entry.status === 'active' ? 'bg-cuda-orange animate-pulse' : 'bg-gray-700'}`} />
                      <span className="text-gray-600">{entry.date}</span>
                      <span className={entry.status === 'done' ? 'text-gray-500' : entry.status === 'active' ? 'text-cuda-orange' : 'text-gray-600'}>{entry.event}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>

          {/* Terminal */}
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 3 }} className="mt-8">
            <div className="terminal-window inline-block">
              <div className="px-4 py-2 font-mono text-xs flex items-center gap-2">
                <span className="text-cuda-orange">$</span>
                <span className="text-ghost-white">Intelligence Network online.</span>
                <span className="cursor-blink" />
              </div>
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 4 }} className="mt-14 flex flex-col items-center gap-2">
            <span className="font-mono text-[9px] text-gray-600 tracking-widest">SCROLL OR PRESS 0-7</span>
            <motion.div animate={{ y: [0, 6, 0] }} transition={{ repeat: Infinity, duration: 2 }} className="w-3.5 h-5 border border-gray-700 rounded-full flex items-start justify-center p-0.5">
              <div className="w-0.5 h-1.5 bg-cuda-orange rounded-full" />
            </motion.div>
          </motion.div>
        </div>
      )}

      <div className="absolute bottom-0 left-0 right-0 h-24 pointer-events-none" style={{ background: 'linear-gradient(to top, #06080F, transparent)' }} />
    </section>
  );
}
