import { useState } from 'react';
import { motion } from 'framer-motion';

const ATTACK_CLASSES = ['Benign', 'DoS', 'DDoS', 'PortScan', 'BruteForce', 'WebAttack', 'Infiltration', 'Botnet'];

// Lightweight simulated Random Forest classifier
function classifyFlow(flowData) {
  const lines = flowData.trim().split('\n').filter(Boolean);
  return lines.map(line => {
    const features = line.split(',').map(Number);
    if (features.length < 5) return { class: 'Invalid', confidence: 0, scores: {} };

    // Simple heuristic classifier based on features
    const flowDuration = features[0] || 0;
    const totalPackets = features[1] || 0;
    const fwdPackets = features[2] || 0;
    const flowBytes = features[3] || 0;
    const flowIAT = features[4] || 0;

    const scores = {};
    let totalScore = 0;

    // Feature-based scoring
    if (flowDuration < 100 && totalPackets > 100) {
      scores['DoS'] = 0.85;
      scores['DDoS'] = 0.72;
    } else if (fwdPackets < 5 && totalPackets > 50) {
      scores['PortScan'] = 0.91;
    } else if (flowIAT < 10 && flowBytes > 10000) {
      scores['BruteForce'] = 0.78;
    } else if (flowDuration > 10000 && totalPackets > 200) {
      scores['Infiltration'] = 0.65;
      scores['Botnet'] = 0.58;
    } else if (flowBytes > 50000) {
      scores['WebAttack'] = 0.60;
    } else {
      scores['Benign'] = 0.92;
    }

    // Add some noise
    for (const cls of ATTACK_CLASSES) {
      if (!scores[cls]) scores[cls] = Math.random() * 0.1;
      totalScore += scores[cls];
    }

    // Normalize
    for (const cls of ATTACK_CLASSES) {
      scores[cls] = (scores[cls] / totalScore).toFixed(3);
    }

    const predictedClass = Object.entries(scores).reduce((a, b) => a[1] > b[1] ? a : b);
    return {
      class: predictedClass[0],
      confidence: (predictedClass[1] * 100).toFixed(1),
      scores,
    };
  });
}

const SAMPLE_DATA = `1200,150,80,45000,15
50,200,10,2000,3
8000,300,150,80000,200
500,20,5,3000,50
15000,500,250,120000,500`;

export default function AnomalyDetector() {
  const [input, setInput] = useState(SAMPLE_DATA);
  const [results, setResults] = useState(null);

  const runDetection = () => {
    const res = classifyFlow(input);
    setResults(res);
  };

  return (
    <div className="space-y-4">
      <div>
        <label className="font-mono text-[10px] text-gray-500 uppercase tracking-wider block mb-2">
          Network Flow Data (CSV: duration, totalPkts, fwdPkts, bytes, iat)
        </label>
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          rows={5}
          className="w-full bg-navy-mid border border-terminal-border rounded px-3 py-2 font-mono text-xs text-ghost-white outline-none focus:border-code-green transition-colors resize-none"
          placeholder="Paste network flow features..."
        />
      </div>

      <button
        onClick={runDetection}
        className="px-4 py-2 rounded font-mono text-xs transition-all"
        style={{ background: '#00FF88', color: '#06080F' }}
      >
        RUN CLASSIFICATION
      </button>

      {results && (
        <div className="space-y-3">
          {results.map((result, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.1 }}
              className="p-3 rounded border"
              style={{
                background: result.class === 'Benign' ? '#0D1117' : '#FF202010',
                borderColor: result.class === 'Benign' ? '#2A3040' : '#FF202040',
              }}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="font-mono text-xs text-gray-500">Flow {i + 1}</span>
                <span className="font-mono text-xs font-bold" style={{
                  color: result.class === 'Benign' ? '#00FF88' : '#FF2020'
                }}>
                  {result.class} ({result.confidence}%)
                </span>
              </div>
              <div className="flex flex-wrap gap-1">
                {Object.entries(result.scores)
                  .sort((a, b) => b[1] - a[1])
                  .slice(0, 3)
                  .map(([cls, score]) => (
                    <span key={cls} className="px-2 py-0.5 rounded font-mono text-[9px]" style={{
                      background: cls === result.class ? '#00FF8820' : '#161B22',
                      color: cls === result.class ? '#00FF88' : '#666',
                    }}>
                      {cls}: {score}
                    </span>
                  ))
                }
              </div>
            </motion.div>
          ))}
        </div>
      )}

      <div className="p-3 rounded border font-mono text-[11px] text-gray-400" style={{ background: '#0A0E17', borderColor: '#2A3040' }}>
        Lightweight Random Forest classifier (simulated ONNX export). In production, this runs as a
        client-side ONNX model with zero server calls. Each flow is classified with confidence scores
        across 8 attack categories.
      </div>
    </div>
  );
}
