import { useState, useEffect } from 'react';
import { LAYERS, CURRENT_MISSION } from '../../utils/constants';

export default function StatusBar({ currentLayer, threatLevel = 'LOW' }) {
  const [uptime, setUptime] = useState(99.97);
  const [time, setTime] = useState('');

  useEffect(() => {
    const interval = setInterval(() => {
      setUptime(prev => {
        const delta = (Math.random() - 0.5) * 0.002;
        return Math.max(99.90, Math.min(99.99, prev + delta));
      });
    }, 8000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const update = () => {
      const now = new Date();
      setTime(now.toLocaleTimeString('en-US', { hour12: false }));
    };
    update();
    const interval = setInterval(update, 1000);
    return () => clearInterval(interval);
  }, []);

  const layerName = LAYERS[currentLayer]?.name || 'HOME';
  const isCritical = threatLevel === 'CRITICAL';

  return (
    <div className="status-bar">
      <span className="text-cuda-orange font-semibold">AIN v3.0</span>
      <span className="status-separator">│</span>
      <span className="status-live">7 SYSTEMS ONLINE</span>
      <span className="status-separator">│</span>
      <span className={layerName === 'VANGUARD' ? 'status-warning' : ''}>
        {layerName}: {layerName === 'CLASSIFIED' ? 'LOCKED' : 'ACTIVE'}
      </span>
      <span className="status-separator">│</span>
      <span className={isCritical ? 'status-critical' : 'status-live'}>
        THREAT LEVEL: {threatLevel}
      </span>
      <span className="status-separator">│</span>
      <span>UPTIME: {uptime.toFixed(2)}%</span>
      <span className="status-separator">│</span>
      <span className="text-gray-600">{time}</span>
    </div>
  );
}
