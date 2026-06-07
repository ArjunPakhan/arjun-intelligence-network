import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles } from 'lucide-react';

const API_URL = 'https://snowy-math-4180.arjunpakhan.workers.dev';

const STARTER_PROMPTS = [
  "Who is Arjun?",
  "Tell me about Sentinel",
  "What is Cerberus?",
  "What makes him different?",
  "Current projects?",
  "His research papers?",
];

export default function AINAgent() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  useEffect(() => {
    if (isOpen) inputRef.current?.focus();
  }, [isOpen]);

  const sendMessage = async (text) => {
    if (!text.trim() || isLoading) return;

    const userMsg = { role: 'user', content: text.trim() };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);

    const recentHistory = [...messages, userMsg].slice(-6).map(m => ({
      role: m.role,
      content: m.content,
    }));

    try {
      const res = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: text.trim(), history: recentHistory }),
      });

      if (!res.ok) throw new Error(`HTTP ${res.status}`);

      const data = await res.json();
      setMessages(prev => [...prev, { role: 'assistant', content: data.reply }]);
    } catch {
      setMessages(prev => [...prev, {
        role: 'assistant',
        content: 'Intelligence briefing temporarily unavailable. Try again.',
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    sendMessage(input);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage(input);
    }
  };

  return (
    <div className="fixed bottom-20 right-5 z-[9999]">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, transformOrigin: 'bottom right' }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.2 }}
            className="mb-3 rounded-xl overflow-hidden flex flex-col"
            style={{
              width: 380,
              height: 520,
              background: '#06080F',
              border: '1px solid rgba(0,212,255,0.2)',
              boxShadow: '0 0 40px rgba(0,212,255,0.1)',
            }}
          >
            {/* Header */}
            <div className="flex items-center justify-between px-4 shrink-0" style={{ height: 40, borderBottom: '1px solid rgba(0,212,255,0.1)' }}>
              <span className="font-mono text-[11px] tracking-[3px] text-electric-cyan font-medium">AIN AGENT</span>
              <div className="flex items-center gap-3">
                <span className="font-mono text-[9px] text-cuda-orange">nemotron · NVIDIA NIM</span>
                <button onClick={() => setIsOpen(false)} className="text-gray-500 hover:text-ghost-white transition-colors font-mono text-xs leading-none">&times;</button>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3" style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 11, lineHeight: 1.7 }}>
              {messages.length === 0 && (
                <div className="grid grid-cols-2 gap-2 mt-2">
                  {STARTER_PROMPTS.map((prompt) => (
                    <button
                      key={prompt}
                      onClick={() => sendMessage(prompt)}
                      className="text-left p-2.5 rounded-lg border transition-all hover:border-electric-cyan/40 font-mono text-[10px] text-gray-400 hover:text-ghost-white"
                      style={{ background: '#0D1117', borderColor: '#1C2030' }}
                    >
                      {prompt}
                    </button>
                  ))}
                </div>
              )}

              {messages.map((msg, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className="max-w-[85%] px-3 py-2 rounded-lg"
                    style={{
                      whiteSpace: 'pre-line',
                      background: msg.role === 'user' ? 'rgba(255,107,0,0.1)' : 'rgba(0,212,255,0.06)',
                      border: msg.role === 'user' ? '1px solid rgba(255,107,0,0.2)' : '1px solid rgba(0,212,255,0.15)',
                      color: msg.role === 'user' ? '#FF6B00' : '#00D4FF',
                    }}
                  >
                    {msg.content}
                  </div>
                </motion.div>
              ))}

              {isLoading && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex justify-start">
                  <div className="px-3 py-2 rounded-lg" style={{ background: 'rgba(0,212,255,0.06)', border: '1px solid rgba(0,212,255,0.15)' }}>
                    <span className="text-electric-cyan font-mono text-xs">
                      <span className="inline-block animate-pulse">...</span>
                    </span>
                  </div>
                </motion.div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <form onSubmit={handleSubmit} className="flex items-center gap-2 px-3 py-2 shrink-0" style={{ borderTop: '1px solid rgba(0,212,255,0.1)', background: '#0D1117' }}>
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Ask about Arjun's work..."
                disabled={isLoading}
                className="flex-1 bg-transparent outline-none font-mono text-xs text-ghost-white placeholder-gray-600"
              />
              <button
                type="submit"
                disabled={isLoading || !input.trim()}
                className="font-mono text-xs px-2 py-1 rounded transition-all disabled:opacity-30"
                style={{ color: '#00D4FF' }}
              >
                SEND
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Collapsed button */}
      <motion.button
        onClick={() => setIsOpen(prev => !prev)}
        className="relative flex items-center justify-center rounded-full transition-all"
        style={{
          width: 56,
          height: 56,
          background: 'rgba(0,212,255,0.1)',
          border: '1px solid #00D4FF',
        }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        {/* Pulse ring */}
        <motion.div
          className="absolute inset-0 rounded-full"
          style={{ border: '1px solid #00D4FF' }}
          animate={{ scale: [1, 1.3, 1], opacity: [0.6, 0, 0.6] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        />
        <Sparkles size={22} color="#00D4FF" />
        {/* NIM badge */}
        <span
          className="absolute -top-1 -right-1 px-1.5 py-0.5 rounded font-mono text-[7px] font-bold"
          style={{ background: '#FF6B00', color: '#06080F' }}
        >
          NIM
        </span>
      </motion.button>
    </div>
  );
}
