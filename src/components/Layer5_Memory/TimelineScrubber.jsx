import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import graphData from '../../data/knowledge-graph.json';

const TIMELINE_MONTHS = [];
for (let y = 2024; y <= 2026; y++) {
  const maxMonth = y === 2026 ? 6 : 12;
  for (let m = 1; m <= maxMonth; m++) {
    const key = `${y}-${String(m).padStart(2, '0')}`;
    TIMELINE_MONTHS.push(key);
  }
}

export default function TimelineScrubber({ currentDate, onChange }) {
  const [isDragging, setIsDragging] = useState(false);

  const currentIndex = currentDate
    ? TIMELINE_MONTHS.indexOf(currentDate)
    : TIMELINE_MONTHS.length - 1;

  const handleSliderChange = (e) => {
    const idx = parseInt(e.target.value);
    onChange(TIMELINE_MONTHS[idx]);
  };

  // Count nodes visible at each month
  const nodeCounts = useMemo(() => {
    const counts = {};
    TIMELINE_MONTHS.forEach(month => {
      counts[month] = graphData.nodes.filter(n => n.introduced <= month).length;
    });
    return counts;
  }, []);

  const maxNodes = Math.max(...Object.values(nodeCounts));

  return (
    <div className="w-full">
      <div className="flex items-center justify-between mb-2">
        <span className="font-mono text-[9px] text-gray-600 uppercase tracking-wider">Timeline</span>
        <span className="font-mono text-[10px] text-cuda-orange">{currentDate || 'Present'}</span>
      </div>

      {/* Mini bar chart */}
      <div className="flex items-end gap-px h-8 mb-1">
        {TIMELINE_MONTHS.map((month, i) => {
          const count = nodeCounts[month];
          const height = (count / maxNodes) * 100;
          const isActive = i <= currentIndex;
          const isCurrent = month === currentDate;
          return (
            <div
              key={month}
              className="flex-1 rounded-t-sm transition-all duration-200"
              style={{
                height: `${height}%`,
                background: isCurrent ? '#FF6B00' : isActive ? '#FF6B0040' : '#1C2030',
                minHeight: '2px',
              }}
            />
          );
        })}
      </div>

      {/* Slider */}
      <input
        type="range"
        min={0}
        max={TIMELINE_MONTHS.length - 1}
        value={currentIndex >= 0 ? currentIndex : TIMELINE_MONTHS.length - 1}
        onChange={handleSliderChange}
        onMouseDown={() => setIsDragging(true)}
        onMouseUp={() => setIsDragging(false)}
        className="w-full h-1 appearance-none rounded-full cursor-pointer"
        style={{
          background: `linear-gradient(90deg, #FF6B00 ${(currentIndex / (TIMELINE_MONTHS.length - 1)) * 100}%, #1C2030 ${(currentIndex / (TIMELINE_MONTHS.length - 1)) * 100}%)`,
          accentColor: '#FF6B00',
        }}
      />

      {/* Year labels */}
      <div className="flex justify-between mt-1">
        <span className="font-mono text-[8px] text-gray-600">Jan 2024</span>
        <span className="font-mono text-[8px] text-gray-600">Present</span>
      </div>
    </div>
  );
}
