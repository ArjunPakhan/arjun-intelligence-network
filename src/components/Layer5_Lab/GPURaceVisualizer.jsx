import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

const TASK_SIZE = 100;

export default function GPURaceVisualizer() {
  const [isRunning, setIsRunning] = useState(false);
  const [cpuProgress, setCpuProgress] = useState(0);
  const [gpuProgress, setGpuProgress] = useState(0);
  const [cpuThreads, setCpuThreads] = useState(Array(4).fill(0));
  const [gpuCores, setGpuCores] = useState(Array(24).fill(0));
  const [cpuTime, setCpuTime] = useState(0);
  const [gpuTime, setGpuTime] = useState(0);
  const [winner, setWinner] = useState(null);
  const intervalRef = useRef(null);

  const startRace = () => {
    setIsRunning(true);
    setCpuProgress(0);
    setGpuProgress(0);
    setCpuTime(0);
    setGpuTime(0);
    setCpuThreads(Array(4).fill(0));
    setGpuCores(Array(24).fill(0));
    setWinner(null);

    let cpu = 0;
    let gpu = 0;
    let time = 0;

    intervalRef.current = setInterval(() => {
      time++;

      // CPU: 4 threads, each processes ~2.5 units per tick
      cpu = Math.min(cpu + 4 * 2.5, TASK_SIZE);
      setCpuProgress(cpu);
      setCpuTime(time);
      setCpuThreads(prev => prev.map((t, i) => {
        const processed = Math.min(2.5, TASK_SIZE / 4 - t);
        return t + processed;
      }));

      // GPU: 24 cores, each processes ~0.5 units per tick (parallel but lightweight)
      gpu = Math.min(gpu + 24 * 0.8, TASK_SIZE);
      setGpuProgress(gpu);
      setGpuTime(time);
      setGpuCores(prev => prev.map((c) => {
        return Math.min(c + 0.8, TASK_SIZE / 24);
      }));

      if (gpu >= TASK_SIZE && !winner) {
        setWinner('GPU');
        clearInterval(intervalRef.current);
        setTimeout(() => setIsRunning(false), 1000);
      } else if (cpu >= TASK_SIZE && !winner) {
        setWinner('CPU');
        clearInterval(intervalRef.current);
        setTimeout(() => setIsRunning(false), 1000);
      }
    }, 100);

    return () => clearInterval(intervalRef.current);
  };

  useEffect(() => {
    return () => clearInterval(intervalRef.current);
  }, []);

  return (
    <div className="space-y-6">
      {/* Race visualization */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* CPU */}
        <div className="p-4 rounded-lg border" style={{ background: '#0D1117', borderColor: '#2A3040' }}>
          <div className="flex items-center justify-between mb-3">
            <span className="font-mono text-sm font-bold text-sith-red">CPU</span>
            <span className="font-mono text-xs text-gray-500">4 Threads • Sequential</span>
          </div>

          {/* Thread visualization */}
          <div className="space-y-1 mb-3">
            {cpuThreads.map((progress, i) => (
              <div key={i} className="flex items-center gap-2">
                <span className="font-mono text-[9px] text-gray-600 w-6">T{i}</span>
                <div className="flex-1 h-3 bg-navy-mid rounded overflow-hidden">
                  <motion.div
                    className="h-full rounded"
                    style={{ background: '#FF2020' }}
                    animate={{ width: `${(progress / (TASK_SIZE / 4)) * 100}%` }}
                  />
                </div>
              </div>
            ))}
          </div>

          <div className="flex items-center justify-between font-mono text-xs">
            <span className="text-gray-500">Progress</span>
            <span className="text-sith-red">{cpuProgress.toFixed(1)}%</span>
          </div>
        </div>

        {/* GPU */}
        <div className="p-4 rounded-lg border" style={{ background: '#0D1117', borderColor: winner === 'GPU' ? '#00FF88' : '#2A3040' }}>
          <div className="flex items-center justify-between mb-3">
            <span className="font-mono text-sm font-bold text-code-green">GPU</span>
            <span className="font-mono text-xs text-gray-500">24 Cores • Parallel</span>
          </div>

          {/* Core visualization */}
          <div className="grid grid-cols-8 gap-0.5 mb-3">
            {gpuCores.map((progress, i) => (
              <div
                key={i}
                className="aspect-square rounded-sm"
                style={{
                  background: `rgba(0, 255, 136, ${0.1 + (progress / (TASK_SIZE / 24)) * 0.8})`,
                }}
              />
            ))}
          </div>

          <div className="flex items-center justify-between font-mono text-xs">
            <span className="text-gray-500">Progress</span>
            <span className="text-code-green">{gpuProgress.toFixed(1)}%</span>
          </div>
        </div>
      </div>

      {/* Winner banner */}
      {winner && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="p-4 rounded-lg border text-center"
          style={{
            background: winner === 'GPU' ? '#00FF8810' : '#FF202010',
            borderColor: winner === 'GPU' ? '#00FF88' : '#FF2020',
          }}
        >
          <span className="font-mono text-lg font-bold" style={{
            color: winner === 'GPU' ? '#00FF88' : '#FF2020'
          }}>
            {winner} WINS
          </span>
          <p className="font-mono text-xs text-gray-500 mt-1">
            {winner === 'GPU'
              ? '24 parallel cores finished the task in fewer wall-clock cycles'
              : 'CPU won this round — try a larger dataset'}
          </p>
        </motion.div>
      )}

      {/* Controls */}
      <button
        onClick={startRace}
        disabled={isRunning}
        className="w-full py-3 rounded font-mono text-sm font-bold transition-all"
        style={{
          background: isRunning ? '#1A1F2B' : '#00FF88',
          color: isRunning ? '#666' : '#06080F',
        }}
      >
        {isRunning ? 'RACING...' : 'START RACE'}
      </button>

      <div className="p-3 rounded border font-mono text-[11px] text-gray-400" style={{ background: '#0A0E17', borderColor: '#2A3040' }}>
        Visual concept of CUDA parallel computing. A GPU has thousands of lightweight cores
        designed to process the same operation across many data points simultaneously —
        ideal for matrix operations in ML training and cryptographic computations.
      </div>
    </div>
  );
}
