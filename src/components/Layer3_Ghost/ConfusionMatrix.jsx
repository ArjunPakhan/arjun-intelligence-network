import { useState } from 'react';
import { motion } from 'framer-motion';

const MALWARE_CLASSES = [
  'Benign', 'Mirai', 'Gafgyt', 'Tsunami',
  'Honda', 'Torii', 'AJ', 'IRCBot',
];

// Simulated confusion matrix from IoT paper results
const CONFUSION_MATRIX = [
  [1200, 5, 3, 1, 0, 2, 0, 1],    // Benign
  [3, 450, 8, 5, 2, 1, 0, 3],     // Mirai
  [5, 12, 380, 10, 3, 2, 1, 4],   // Gafgyt
  [2, 6, 15, 310, 5, 3, 0, 2],    // Tsunami
  [0, 3, 4, 8, 280, 5, 2, 1],     // Honda
  [1, 2, 3, 5, 8, 250, 3, 2],     // Torii
  [0, 1, 2, 1, 3, 2, 190, 1],     // AJ
  [1, 4, 5, 3, 1, 2, 1, 220],     // IRCBot
];

export default function ConfusionMatrix() {
  const [hoveredCell, setHoveredCell] = useState(null);
  const maxValue = Math.max(...CONFUSION_MATRIX.flat());

  const getColor = (value, isDiagonal) => {
    if (value === 0) return '#0D1117';
    const intensity = value / maxValue;
    if (isDiagonal) {
      return `rgba(0, 255, 136, ${0.1 + intensity * 0.7})`;
    }
    return `rgba(255, 32, 32, ${0.1 + intensity * 0.6})`;
  };

  return (
    <div className="space-y-4">
      <div className="overflow-x-auto">
        <div className="inline-block min-w-[500px]">
          {/* Header */}
          <div className="flex items-end mb-1 ml-[100px]">
            {MALWARE_CLASSES.map((cls, i) => (
              <div
                key={cls}
                className="flex-1 text-center font-mono text-[9px] text-gray-500 px-1"
                style={{ writingMode: 'vertical-rl', transform: 'rotate(180deg)', height: '70px' }}
              >
                {cls}
              </div>
            ))}
          </div>

          {/* Matrix rows */}
          {CONFUSION_MATRIX.map((row, i) => (
            <div key={i} className="flex items-center">
              <div className="w-[100px] font-mono text-[10px] text-gray-500 text-right pr-2">
                {MALWARE_CLASSES[i]}
              </div>
              {row.map((value, j) => {
                const isDiagonal = i === j;
                const isHovered = hoveredCell?.row === i && hoveredCell?.col === j;
                return (
                  <motion.div
                    key={`${i}-${j}`}
                    className="flex-1 aspect-square flex items-center justify-center cursor-pointer rounded-sm m-px font-mono text-[10px] relative"
                    style={{
                      background: getColor(value, isDiagonal),
                      border: isHovered ? '1px solid #FF6B00' : '1px solid transparent',
                      minWidth: '40px',
                      minHeight: '40px',
                    }}
                    onMouseEnter={() => setHoveredCell({ row: i, col: j, value })}
                    onMouseLeave={() => setHoveredCell(null)}
                    whileHover={{ scale: 1.1, zIndex: 10 }}
                  >
                    <span className={isDiagonal ? 'text-code-green' : value > 0 ? 'text-sith-red' : 'text-gray-700'}>
                      {value}
                    </span>
                  </motion.div>
                );
              })}
            </div>
          ))}
        </div>
      </div>

      {/* Hover tooltip */}
      {hoveredCell && (
        <motion.div
          initial={{ opacity: 0, y: 5 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-3 rounded border font-mono text-xs"
          style={{ background: '#0D1117', borderColor: '#2A3040' }}
        >
          <span className="text-gray-500">True: </span>
          <span className="text-code-green">{MALWARE_CLASSES[hoveredCell.row]}</span>
          <span className="text-gray-500"> → Predicted: </span>
          <span className="text-sith-red">{MALWARE_CLASSES[hoveredCell.col]}</span>
          <span className="text-gray-500"> | Samples: </span>
          <span className="text-ghost-white">{hoveredCell.value}</span>
          {hoveredCell.row === hoveredCell.col ? (
            <span className="ml-2 text-code-green">✓ Correct</span>
          ) : (
            <span className="ml-2 text-sith-red">✗ Misclassified</span>
          )}
        </motion.div>
      )}

      {/* Legend */}
      <div className="flex items-center gap-4 font-mono text-[10px] text-gray-500">
        <span className="flex items-center gap-1">
          <span className="w-3 h-3 rounded-sm inline-block" style={{ background: 'rgba(0, 255, 136, 0.5)' }} /> Correct
        </span>
        <span className="flex items-center gap-1">
          <span className="w-3 h-3 rounded-sm inline-block" style={{ background: 'rgba(255, 32, 32, 0.5)' }} /> Misclassified
        </span>
        <span>Total Accuracy: ~88%</span>
      </div>
    </div>
  );
}
