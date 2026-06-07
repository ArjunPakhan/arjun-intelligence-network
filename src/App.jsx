import { useState, useCallback, useEffect, lazy, Suspense } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import BootSequence from './components/Layer0_Boot/BootSequence';
import HeroSection from './components/Layer0_Boot/HeroSection';
import Navigation from './components/Shared/Navigation';
import StatusBar from './components/Shared/StatusBar';
import ResearchTimeline from './components/Shared/ResearchTimeline';
import RecruiterMode from './components/Shared/RecruiterMode';
import AINAgent from './components/Shared/AINAgent';
import { LAYERS } from './utils/constants';

const CommandCenter = lazy(() => import('./components/Layer1_Emperor/EmperorAbout'));
const Cybersecurity = lazy(() => import('./components/Layer2_Vader/Cybersecurity'));
const MLResearch = lazy(() => import('./components/Layer3_Ghost/MLResearch'));
const SystemsThinking = lazy(() => import('./components/Layer4_Yoda/SystemsThinking'));
const MemoryCore = lazy(() => import('./components/Layer5_Memory/MemoryCore'));
const ClassifiedLab = lazy(() => import('./components/Layer6_Classified/ClassifiedLab'));
const UplinkTerminal = lazy(() => import('./components/Layer7_Uplink/EmperorTerminal'));

function LayerLoader() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="font-mono text-xs text-gray-600 flex items-center gap-2">
        <div className="w-2 h-2 rounded-full bg-cuda-orange animate-pulse" />
        Loading module...
      </div>
    </div>
  );
}

export default function App() {
  const [booted, setBooted] = useState(false);
  const [currentLayer, setCurrentLayer] = useState(0);
  const [showTimeline, setShowTimeline] = useState(false);
  const [recruiterMode, setRecruiterMode] = useState(false);
  const [threatLevel, setThreatLevel] = useState('LOW');

  const handleNavigate = useCallback((layerId) => {
    setCurrentLayer(layerId);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const handleThreatChange = useCallback((level) => {
    setThreatLevel(level);
    if (level === 'LOW') return;
    setTimeout(() => setThreatLevel('LOW'), 5000);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;
      const key = e.key;
      if (key >= '0' && key <= '7') handleNavigate(parseInt(key));
      if (key === 't' || key === 'T') setShowTimeline(prev => !prev);
      if (key === 'r' || key === 'R') setRecruiterMode(prev => !prev);
      if (key === 'Escape') { setShowTimeline(false); setRecruiterMode(false); }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleNavigate]);

  const renderLayer = () => {
    switch (currentLayer) {
      case 0: return <HeroSection onNavigate={handleNavigate} />;
      case 1: return <CommandCenter onNavigate={handleNavigate} />;
      case 2: return <Cybersecurity onThreatChange={handleThreatChange} />;
      case 3: return <MLResearch />;
      case 4: return <SystemsThinking />;
      case 5: return <MemoryCore />;
      case 6: return <ClassifiedLab />;
      case 7: return <UplinkTerminal />;
      default: return <HeroSection onNavigate={handleNavigate} />;
    }
  };

  if (recruiterMode) {
    return <RecruiterMode onClose={() => setRecruiterMode(false)} />;
  }

  return (
    <div className="min-h-screen" style={{ background: '#06080F' }}>
      <div className="noise-overlay" />
      {!booted && <BootSequence onComplete={() => setBooted(true)} />}
      {booted && (
        <>
          <StatusBar currentLayer={currentLayer} threatLevel={threatLevel} />
          <div className="nav-offset">
            <Navigation currentLayer={currentLayer} onNavigate={handleNavigate} />
          </div>
          <Suspense fallback={<LayerLoader />}>
            <AnimatePresence mode="wait">
              <motion.div
                key={currentLayer}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                {renderLayer()}
              </motion.div>
            </AnimatePresence>
          </Suspense>
          <AnimatePresence>
            {showTimeline && (
              <ResearchTimeline onClose={() => setShowTimeline(false)} onNavigate={handleNavigate} />
            )}
          </AnimatePresence>
          <AINAgent />
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            className="fixed bottom-4 left-4 z-50 hidden md:flex items-center gap-2 font-mono text-[10px]"
          >
            <span className="text-gray-600">Layer</span>
            <span style={{ color: LAYERS[currentLayer]?.color || '#FF6B00' }}>{currentLayer}</span>
            <span className="text-gray-700">—</span>
            <span className="text-gray-600">{LAYERS[currentLayer]?.label || 'Command Center'}</span>
          </motion.div>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 4 }}
            className="fixed bottom-4 left-1/2 -translate-x-1/2 z-50 flex items-center gap-2"
          >
            <button
              onClick={() => setShowTimeline(prev => !prev)}
              className="px-3 py-1.5 rounded border font-mono text-[10px] text-gray-500 hover:text-cuda-orange hover:border-cuda-orange/30 transition-colors"
              style={{ background: 'rgba(6, 8, 15, 0.9)', borderColor: '#1C2030' }}
            >
              [T] Timeline
            </button>
            <button
              onClick={() => setRecruiterMode(true)}
              className="px-3 py-1.5 rounded border font-mono text-[10px] text-gray-500 hover:text-imperial-gold hover:border-imperial-gold/30 transition-colors"
              style={{ background: 'rgba(6, 8, 15, 0.9)', borderColor: '#1C2030' }}
            >
              [R] Recruiter
            </button>
          </motion.div>
        </>
      )}
    </div>
  );
}
