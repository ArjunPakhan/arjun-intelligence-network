import { motion } from 'framer-motion';

export default function TerminalWindow({ children, title = 'terminal', color = '#FF6B00', className = '' }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`terminal-window ${className}`}
    >
      <div className="terminal-header">
        <div className="terminal-dot" style={{ background: '#FF5F56' }} />
        <div className="terminal-dot" style={{ background: '#FFBD2E' }} />
        <div className="terminal-dot" style={{ background: '#27C93F' }} />
        <span
          className="ml-3 text-xs font-mono tracking-wider"
          style={{ color }}
        >
          {title}
        </span>
      </div>
      <div className="p-4 font-mono text-sm leading-relaxed">
        {children}
      </div>
    </motion.div>
  );
}
