import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const QUESTIONS = [
  {
    question: 'You find ₹500 in your jacket pocket. What do you do?',
    options: [
      { text: 'Save it — free money is future money', bias: 'loss-aversion', score: 0 },
      { text: 'Spend it immediately — it\'s unexpected', bias: 'present-bias', score: 1 },
      { text: 'Invest it in crypto — high risk, high reward', bias: 'anchoring', score: 2 },
    ],
  },
  {
    question: 'Your UPI shows a subscription you forgot about (₹299/month). You...',
    options: [
      { text: 'Cancel it — waste is waste', bias: 'loss-aversion', score: 0 },
      { text: 'Keep it — might use it someday', bias: 'present-bias', score: 1 },
      { text: 'Check if you got value from it first', bias: 'rational', score: 0.5 },
    ],
  },
  {
    question: 'It\'s 9 PM. You see a flash sale on something you want. Do you...',
    options: [
      { text: 'Buy now — sale ends at midnight', bias: 'anchoring', score: 2 },
      { text: 'Wait until morning — impulse buying is dangerous', bias: 'rational', score: 0 },
      { text: 'Buy it — you\'ve been wanting it for weeks', bias: 'present-bias', score: 1 },
    ],
  },
  {
    question: 'Your friend shows you their portfolio: ₹50K in 3 months. You...',
    options: [
      { text: 'Ask for their strategy and replicate it', bias: 'anchoring', score: 2 },
      { text: 'FOMO — invest the same amount immediately', bias: 'present-bias', score: 1.5 },
      { text: 'Analyze risk first — past returns ≠ future results', bias: 'rational', score: 0 },
    ],
  },
];

const BIAS_PROFILES = {
  'loss-aversion': {
    name: 'Loss Aversion',
    description: 'You hate losing more than you enjoy winning. This protects you from bad bets but can prevent calculated risks.',
    icon: '🛡️',
  },
  'present-bias': {
    name: 'Present Bias',
    description: 'You tend to value immediate rewards over future gains. Your 7-10 PM fraud window is real.',
    icon: '⚡',
  },
  'anchoring': {
    name: 'Anchoring Bias',
    description: 'First numbers you see become your reference point. Marketing uses this against you.',
    icon: '⚓',
  },
  'rational': {
    name: 'Rational Actor',
    description: 'You think before acting — but be careful. Over-analysis can be its own bias.',
    icon: '🧠',
  },
};

export default function BiasQuiz() {
  const [currentQ, setCurrentQ] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [showResult, setShowResult] = useState(false);

  const handleAnswer = (option) => {
    const newAnswers = [...answers, option];
    setAnswers(newAnswers);

    if (currentQ < QUESTIONS.length - 1) {
      setCurrentQ(currentQ + 1);
    } else {
      setShowResult(true);
    }
  };

  const getResult = () => {
    const biasCounts = {};
    answers.forEach(a => {
      biasCounts[a.bias] = (biasCounts[a.bias] || 0) + a.score;
    });
    const dominant = Object.entries(biasCounts).reduce((a, b) => a[1] > b[1] ? a : b, ['rational', 0]);
    return BIAS_PROFILES[dominant[0]] || BIAS_PROFILES['rational'];
  };

  const reset = () => {
    setCurrentQ(0);
    setAnswers([]);
    setShowResult(false);
  };

  return (
    <div className="space-y-4">
      {!showResult ? (
        <div>
          <div className="flex items-center justify-between mb-4">
            <span className="font-mono text-[10px] text-gray-500">
              Question {currentQ + 1} of {QUESTIONS.length}
            </span>
            <span className="font-mono text-[10px] text-gray-500">UPI Bias Quiz</span>
          </div>

          {/* Progress bar */}
          <div className="h-1 bg-navy-mid rounded-full mb-6 overflow-hidden">
            <motion.div
              className="h-full rounded-full"
              style={{ background: '#FFD700' }}
              animate={{ width: `${((currentQ + 1) / QUESTIONS.length) * 100}%` }}
            />
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={currentQ}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
            >
              <h4 className="font-mono text-sm text-ghost-white mb-4">
                {QUESTIONS[currentQ].question}
              </h4>

              <div className="space-y-2">
                {QUESTIONS[currentQ].options.map((option, i) => (
                  <motion.button
                    key={i}
                    onClick={() => handleAnswer(option)}
                    className="w-full text-left p-3 rounded border font-mono text-xs transition-all hover:border-imperial-gold"
                    style={{ background: '#0D1117', borderColor: '#2A3040' }}
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.99 }}
                  >
                    <span className="text-gray-500 mr-2">{String.fromCharCode(65 + i)}.</span>
                    <span className="text-ghost-white">{option.text}</span>
                  </motion.button>
                ))}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      ) : (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center space-y-4"
        >
          <div className="text-4xl mb-2">{getResult().icon}</div>
          <h4 className="font-mono text-lg text-imperial-gold">{getResult().name}</h4>
          <p className="text-sm text-gray-400 max-w-md mx-auto">{getResult().description}</p>

          <div className="p-4 rounded border text-left" style={{ background: '#0D1117', borderColor: '#2A3040' }}>
            <div className="font-mono text-[10px] text-gray-500 uppercase tracking-wider mb-2">From our UPI Research</div>
            <p className="text-xs text-gray-400">
              Our study found that 70% of Gen Z UPI transactions are under ₹500 — exactly the range where
              cognitive biases have the most impact. Peak fraud activity occurs between 7–10 PM when
              decision fatigue is highest.
            </p>
          </div>

          <button
            onClick={reset}
            className="px-4 py-2 rounded font-mono text-xs border border-imperial-gold/30 text-imperial-gold hover:bg-imperial-gold/10 transition-colors"
          >
            RETAKE QUIZ
          </button>
        </motion.div>
      )}
    </div>
  );
}
