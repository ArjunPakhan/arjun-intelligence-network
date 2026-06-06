import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';

const EMPEROR_RESPONSES = {
  'who are you': "I am the Emperor — the orchestrator of a multi-agent AI system. I route commands to 5 specialized agents. But you're really asking about Arjun Pakhan.",
  'what do you build': "Cybersecurity systems, machine learning pipelines, GPU-accelerated computing, and distributed architectures. Current project: this very system.",
  'show me your research': "Routing to Vader — security research incoming. Use key [2] for cybersecurity, [3] for ML research.",
  'security': "Routing to Darth Vader. Use key [2] — he handles all security intelligence.",
  'ml': "Routing to Ghost. Use key [3] — machine learning research and analysis.",
  'research': "Active projects: Secure Distributed IDS, IoT Malware Detection, UPI Gen Z Behaviour Study, and HeatSense. Navigate with keys [2] or [3].",
  'help': "Commands: 'who are you', 'what do you build', 'show me your research', 'security', 'ml'. Or use keys 1-6.",
  'default': "Acknowledged. I can route you to: [1] Emperor — About, [2] Vader — Security, [3] Ghost — ML Research, [4] Yoda — Systems, [6] Terminal — Contact. Ask me anything.",
};

function getResponse(input) {
  const lower = input.toLowerCase().trim();
  for (const [key, response] of Object.entries(EMPEROR_RESPONSES)) {
    if (key !== 'default' && lower.includes(key)) return response;
  }
  return EMPEROR_RESPONSES.default;
}

export default function EmperorChat({ onNavigate }) {
  const [messages, setMessages] = useState([
    { role: 'system', text: 'The Emperor is online. Type a command.' },
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMsg = input.trim();
    setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setInput('');
    setIsTyping(true);

    setTimeout(() => {
      const response = getResponse(userMsg);
      setMessages(prev => [...prev, { role: 'emperor', text: response }]);
      setIsTyping(false);

      // Navigate based on response
      if (userMsg.toLowerCase().includes('security') || userMsg.toLowerCase().includes('vader')) {
        setTimeout(() => onNavigate?.(2), 1500);
      } else if (userMsg.toLowerCase().includes('ml') || userMsg.toLowerCase().includes('research')) {
        setTimeout(() => onNavigate?.(3), 1500);
      }
    }, 800 + Math.random() * 600);
  };

  return (
    <div className="terminal-window w-full max-w-2xl mx-auto">
      <div className="terminal-header">
        <div className="terminal-dot" style={{ background: '#FF5F56' }} />
        <div className="terminal-dot" style={{ background: '#FFBD2E' }} />
        <div className="terminal-dot" style={{ background: '#27C93F' }} />
        <span className="ml-3 text-xs font-mono tracking-wider text-imperial-purple">
          emperor@jarvis-empire ~ % chat
        </span>
      </div>

      <div className="p-4 h-80 overflow-y-auto font-mono text-sm space-y-3" style={{ background: '#0A0E17' }}>
        {messages.map((msg, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            className={`${msg.role === 'user' ? 'text-electric-cyan' : msg.role === 'emperor' ? 'text-imperial-purple' : 'text-gray-500'}`}
          >
            <span className="opacity-60">
              {msg.role === 'user' ? '> ' : msg.role === 'emperor' ? '👑 ' : '● '}
            </span>
            {msg.text}
          </motion.div>
        ))}
        {isTyping && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-imperial-purple"
          >
            <span className="opacity-60">👑 </span>
            <span className="cursor-blink" />
          </motion.div>
        )}
        <div ref={messagesEndRef} />
      </div>

      <form onSubmit={handleSubmit} className="border-t border-terminal-border p-3 flex gap-2" style={{ background: '#0D1117' }}>
        <span className="text-cuda-orange font-mono text-sm select-none">{'>'}</span>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Enter command..."
          className="flex-1 bg-transparent outline-none font-mono text-sm text-ghost-white placeholder-gray-600"
        />
        <button type="submit" className="text-cuda-orange font-mono text-xs hover:text-white transition-colors">
          EXEC
        </button>
      </form>
    </div>
  );
}
