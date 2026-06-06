import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BOOT_SEQUENCE_LINES } from '../../utils/constants';
import TerminalWindow from '../Shared/TerminalWindow';

export default function BootSequence({ onComplete }) {
  const [lines, setLines] = useState([]);
  const [currentLine, setCurrentLine] = useState(0);
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    if (currentLine >= BOOT_SEQUENCE_LINES.length) {
      setTimeout(() => {
        setIsComplete(true);
        setTimeout(onComplete, 1200);
      }, 800);
      return;
    }

    const line = BOOT_SEQUENCE_LINES[currentLine];
    const timeout = setTimeout(() => {
      setLines(prev => [...prev, line.text]);
      setCurrentLine(prev => prev + 1);
    }, line.delay - (currentLine > 0 ? BOOT_SEQUENCE_LINES[currentLine - 1].delay : 0));

    return () => clearTimeout(timeout);
  }, [currentLine, onComplete]);

  return (
    <AnimatePresence>
      {!isComplete && (
        <motion.div
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.8 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          style={{ background: '#06080F' }}
        >
          <div className="w-full max-w-2xl">
            <TerminalWindow title="AIN BIOS v2.0" color="#FF6B00">
              <div className="space-y-1 min-h-[300px]">
                {lines.map((line, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.15 }}
                    className="flex"
                  >
                    <span className="text-cuda-orange mr-2 select-none">$</span>
                    <span
                      className={
                        line.includes('ONLINE')
                          ? 'text-code-green'
                          : line.includes('100%')
                          ? 'text-cuda-orange'
                          : line.includes('Intelligence Network online')
                          ? 'text-imperial-gold'
                          : 'text-ghost-white'
                      }
                    >
                      {line}
                    </span>
                  </motion.div>
                ))}
                {currentLine < BOOT_SEQUENCE_LINES.length && (
                  <div className="flex">
                    <span className="text-cuda-orange mr-2 select-none">$</span>
                    <span className="cursor-blink text-ghost-white" />
                  </div>
                )}
              </div>
            </TerminalWindow>

            <div className="mt-4 h-1 bg-navy-mid rounded-full overflow-hidden">
              <motion.div
                className="h-full rounded-full"
                style={{ background: 'linear-gradient(90deg, #FF6B00, #00D4FF)' }}
                initial={{ width: '0%' }}
                animate={{ width: `${Math.min((currentLine / BOOT_SEQUENCE_LINES.length) * 100, 100)}%` }}
                transition={{ duration: 0.3 }}
              />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
