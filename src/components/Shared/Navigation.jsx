import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { LAYERS } from '../../utils/constants';

export default function Navigation({ currentLayer, onNavigate }) {
  const [isOpen, setIsOpen] = useState(false);
  const visibleLayers = LAYERS.filter(l => !l.hidden);

  return (
    <>
      <motion.nav
        initial={{ y: -60 }}
        animate={{ y: 0 }}
        transition={{ delay: 3, duration: 0.4 }}
        className="fixed top-6 left-0 right-0 z-50 flex items-center justify-between px-4 md:px-8 py-2.5"
        style={{ background: 'rgba(6, 8, 15, 0.88)', backdropFilter: 'blur(10px)', borderBottom: '1px solid #1C2030' }}
      >
        <div className="flex items-center gap-2">
          <div className="w-1.5 h-1.5 rounded-full bg-cuda-orange animate-pulse" />
          <span className="font-mono text-[11px] tracking-widest text-cuda-orange font-medium">AIN</span>
        </div>

        <div className="hidden md:flex items-center gap-0.5">
          {visibleLayers.map((layer) => (
            <button
              key={layer.id}
              onClick={() => onNavigate(layer.id)}
              className="px-2.5 py-1 font-mono text-[10px] tracking-wider transition-all duration-150 rounded"
              style={{
                color: currentLayer === layer.id ? layer.color : '#444',
                background: currentLayer === layer.id ? `${layer.color}10` : 'transparent',
              }}
            >
              {layer.name}
            </button>
          ))}
        </div>

        <button onClick={() => setIsOpen(!isOpen)} className="md:hidden flex flex-col gap-1 p-2">
          <motion.span animate={{ rotate: isOpen ? 45 : 0, y: isOpen ? 5 : 0 }} className="w-4 h-px bg-cuda-orange block" />
          <motion.span animate={{ opacity: isOpen ? 0 : 1 }} className="w-4 h-px bg-cuda-orange block" />
          <motion.span animate={{ rotate: isOpen ? -45 : 0, y: isOpen ? -5 : 0 }} className="w-4 h-px bg-cuda-orange block" />
        </button>
      </motion.nav>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed top-[52px] left-0 right-0 z-40 p-4 md:hidden max-h-[80vh] overflow-y-auto"
            style={{ background: 'rgba(6, 8, 15, 0.98)', borderBottom: '1px solid #1C2030' }}
          >
            {LAYERS.map((layer) => (
              <button
                key={layer.id}
                onClick={() => { onNavigate(layer.id); setIsOpen(false); }}
                className="block w-full text-left px-4 py-2.5 font-mono text-xs tracking-wider transition-colors"
                style={{ color: currentLayer === layer.id ? layer.color : '#444' }}
              >
                <span className="opacity-30 mr-2">[{layer.key}]</span>
                {layer.label}
                {layer.hidden && <span className="ml-2 text-[9px] opacity-30">(classified)</span>}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
