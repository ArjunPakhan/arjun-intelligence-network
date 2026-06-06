import { useState, useRef, useEffect, useCallback } from 'react';
import * as d3 from 'd3';
import { IDS_NODES, ATTACK_TYPES } from '../../utils/constants';

export default function NetworkVisualizer({ onAttack }) {
  const svgRef = useRef(null);
  const [dimensions, setDimensions] = useState({ width: 800, height: 380 });
  const [activeAttack, setActiveAttack] = useState(null);
  const [detectionConfidence, setDetectionConfidence] = useState(null);
  const [neutralized, setNeutralized] = useState(false);
  const [propagationStep, setPropagationStep] = useState(-1);
  const packetsRef = useRef([]);
  const animFrameRef = useRef(null);

  useEffect(() => {
    const container = svgRef.current?.parentElement;
    if (!container) return;
    const observer = new ResizeObserver(entries => {
      setDimensions({ width: entries[0].contentRect.width, height: 380 });
    });
    observer.observe(container);
    return () => observer.disconnect();
  }, []);

  const triggerAttack = useCallback((attackId) => {
    setActiveAttack(attackId);
    setNeutralized(false);
    setDetectionConfidence(0);
    setPropagationStep(0);
    onAttack?.(attackId);

    const attack = ATTACK_TYPES.find(a => a.id === attackId);
    if (!attack) return;

    // Propagation: nodes light up one by one with 200ms delay
    const nodeCount = IDS_NODES.length;
    let step = 0;
    const propInterval = setInterval(() => {
      step++;
      setPropagationStep(step);
      if (step >= nodeCount) {
        clearInterval(propInterval);
        // Start detection climb
        let conf = 0;
        const detInterval = setInterval(() => {
          conf += Math.random() * 8 + 3;
          if (conf >= attack.confidence) {
            conf = attack.confidence;
            clearInterval(detInterval);
            setDetectionConfidence(conf);
            // Neutralize
            setTimeout(() => {
              setNeutralized(true);
              setTimeout(() => {
                setActiveAttack(null);
                setNeutralized(false);
                setDetectionConfidence(null);
                setPropagationStep(-1);
              }, 2500);
            }, 600);
          }
          setDetectionConfidence(Math.min(conf, attack.confidence));
        }, 150);
      }
    }, 200);
  }, [onAttack]);

  useEffect(() => {
    if (!svgRef.current) return;
    const { width, height } = dimensions;
    const svg = d3.select(svgRef.current);
    svg.selectAll('*').remove();

    const defs = svg.append('defs');
    const filter = defs.append('filter').attr('id', 'node-glow');
    filter.append('feGaussianBlur').attr('stdDeviation', '4').attr('result', 'blur');
    const feMerge = filter.append('feMerge');
    feMerge.append('feMergeNode').attr('in', 'blur');
    feMerge.append('feMergeNode').attr('in', 'SourceGraphic');

    const g = svg.append('g');
    const nodeColors = { primary: '#FF6B00', secondary: '#FF2020', gateway: '#00D4FF', iot: '#00FF88', edge: '#9B59B6', analysis: '#FFD700', research: '#7FFF00' };
    const nodePositions = IDS_NODES.map(n => ({ ...n, px: n.x * width, py: n.y * height }));

    // Connections
    const connections = [[0,1],[1,2],[2,3],[3,4],[4,5],[5,6],[0,6],[2,5]];
    const connLines = [];
    connections.forEach(([a, b]) => {
      const line = g.append('line').attr('x1', nodePositions[a].px).attr('y1', nodePositions[a].py).attr('x2', nodePositions[b].px).attr('y2', nodePositions[b].py).attr('stroke', '#1C2030').attr('stroke-width', 0.8);
      connLines.push({ line, a, b });
    });

    // Nodes
    const nodeEls = [];
    nodePositions.forEach((node, i) => {
      const color = nodeColors[node.type] || '#666';
      const glow = g.append('circle').attr('cx', node.px).attr('cy', node.py).attr('r', 24).attr('fill', 'transparent').attr('stroke', 'transparent').attr('stroke-width', 2);
      const outer = g.append('circle').attr('cx', node.px).attr('cy', node.py).attr('r', 18).attr('fill', `${color}08`).attr('stroke', color).attr('stroke-width', 0.8).attr('stroke-opacity', 0.3);
      const core = g.append('circle').attr('cx', node.px).attr('cy', node.py).attr('r', 5).attr('fill', color).attr('opacity', 0.7);
      const label = g.append('text').attr('x', node.px).attr('y', node.py + 28).attr('text-anchor', 'middle').attr('fill', '#555').attr('font-family', 'monospace').attr('font-size', '8px').text(node.label);
      nodeEls.push({ glow, outer, core, label, color, node });
    });

    // Normal packets
    let normalPackets = Array.from({ length: 35 }, () => {
      const s = nodePositions[Math.floor(Math.random() * nodePositions.length)];
      const e = nodePositions[Math.floor(Math.random() * nodePositions.length)];
      return { x: s.px, y: s.py, tx: e.px, ty: e.py, speed: Math.random() * 0.002 + 0.001, size: Math.random() * 1.2 + 0.4 };
    });
    const normalEls = g.selectAll('.np').data(normalPackets).enter().append('circle').attr('r', d => d.size).attr('fill', '#00D4FF').attr('opacity', 0.3);

    // Stats
    const statsG = g.append('g').attr('transform', `translate(${width - 140}, 12)`);
    statsG.append('rect').attr('width', 130).attr('height', 48).attr('rx', 4).attr('fill', '#0A0E14').attr('stroke', '#1C2030');
    const statusText = statsG.append('text').attr('x', 8).attr('y', 16).attr('fill', '#00FF88').attr('font-family', 'monospace').attr('font-size', '9px').text('Status: Monitoring');
    const flowText = statsG.append('text').attr('x', 8).attr('y', 30).attr('fill', '#00D4FF').attr('font-family', 'monospace').attr('font-size', '9px').text('Flows: 3.5M');
    const atkText = statsG.append('text').attr('x', 8).attr('y', 44).attr('fill', '#555').attr('font-family', 'monospace').attr('font-size', '9px').text('Attacks: 0');

    let frame = 0;
    let atkCount = 0;

    const animate = () => {
      frame++;
      normalPackets.forEach(p => {
        p.x += (p.tx - p.x) * p.speed * 2;
        p.y += (p.ty - p.y) * p.speed * 2;
        if (Math.abs(p.x - p.tx) < 3 && Math.abs(p.y - p.ty) < 3) {
          const s = nodePositions[Math.floor(Math.random() * nodePositions.length)];
          const e = nodePositions[Math.floor(Math.random() * nodePositions.length)];
          p.x = s.px; p.y = s.py; p.tx = e.px; p.ty = e.py;
        }
      });
      normalEls.attr('cx', d => d.x).attr('cy', d => d.y);

      if (frame % 30 === 0) {
        statusText.text(activeAttack ? `Attack: ${activeAttack.toUpperCase()}` : 'Status: Monitoring');
        statusText.attr('fill', activeAttack ? '#FF2020' : '#00FF88');
        if (activeAttack) atkCount++;
        atkText.text(`Attacks: ${atkCount}`);
      }

      animFrameRef.current = requestAnimationFrame(animate);
    };
    animFrameRef.current = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(animFrameRef.current);
  }, [dimensions, activeAttack]);

  // Update node glow on propagation
  useEffect(() => {
    if (!svgRef.current || propagationStep < 0) return;
    const svg = d3.select(svgRef.current);
    const nodeColors = { primary: '#FF6B00', secondary: '#FF2020', gateway: '#00D4FF', iot: '#00FF88', edge: '#9B59B6', analysis: '#FFD700', research: '#7FFF00' };
    const nodePositions = IDS_NODES.map(n => ({ ...n, px: n.x * dimensions.width, py: n.y * dimensions.height }));

    svg.selectAll('circle').each(function() {
      const el = d3.select(this);
      const cx = parseFloat(el.attr('cx'));
      const cy = parseFloat(el.attr('cy'));
      const nodeIdx = nodePositions.findIndex(n => Math.abs(n.px - cx) < 1 && Math.abs(n.py - cy) < 1);
      if (nodeIdx >= 0 && nodeIdx < propagationStep) {
        el.attr('filter', 'url(#node-glow)').transition().duration(200).attr('stroke', '#FF2020').attr('stroke-width', 2).attr('stroke-opacity', 0.8);
      }
    });
  }, [propagationStep, dimensions]);

  // Reset glow when attack ends
  useEffect(() => {
    if (activeAttack || !svgRef.current) return;
    const svg = d3.select(svgRef.current);
    svg.selectAll('circle').attr('filter', null);
  }, [activeAttack]);

  return (
    <div className="w-full">
      <div className="flex flex-wrap gap-2 mb-3">
        {ATTACK_TYPES.map(attack => (
          <button
            key={attack.id}
            onClick={() => triggerAttack(attack.id)}
            disabled={!!activeAttack}
            className="px-3 py-1.5 rounded border font-mono text-[10px] transition-all disabled:opacity-30"
            style={{
              background: activeAttack === attack.id ? `${attack.color}20` : '#0A0E14',
              borderColor: activeAttack === attack.id ? attack.color : '#1C2030',
              color: activeAttack === attack.id ? attack.color : '#555',
            }}
          >
            {attack.name}
          </button>
        ))}
      </div>

      <div className="relative">
        <svg ref={svgRef} width="100%" height={dimensions.height} viewBox={`0 0 ${dimensions.width} ${dimensions.height}`} className="rounded border" style={{ background: '#0A0E14', borderColor: '#1C2030' }} />

        {/* Detection Confidence Meter */}
        {detectionConfidence !== null && !neutralized && (
          <div className="absolute top-3 left-3 p-3 rounded" style={{ background: 'rgba(10, 14, 20, 0.95)', border: '1px solid #1C2030' }}>
            <div className="font-mono text-[9px] text-gray-500 mb-1">DETECTION CONFIDENCE</div>
            <div className="font-mono text-lg font-bold" style={{ color: detectionConfidence > 90 ? '#00FF88' : detectionConfidence > 50 ? '#FFD700' : '#FF2020' }}>
              {detectionConfidence.toFixed(1)}%
            </div>
            <div className="w-24 h-1 rounded-full mt-1 overflow-hidden" style={{ background: '#161B22' }}>
              <div className="h-full rounded-full transition-all duration-150" style={{ width: `${detectionConfidence}%`, background: detectionConfidence > 90 ? '#00FF88' : detectionConfidence > 50 ? '#FFD700' : '#FF2020' }} />
            </div>
          </div>
        )}

        {/* NEUTRALIZED flash */}
        {neutralized && (
          <div className="absolute inset-0 flex items-center justify-center rounded" style={{ background: 'rgba(0, 255, 136, 0.08)', animation: 'neutralized-flash 2s ease' }}>
            <div className="text-center">
              <div className="font-mono text-2xl font-bold text-code-green" style={{ textShadow: '0 0 20px rgba(0,255,136,0.5)' }}>NEUTRALIZED</div>
              <div className="font-mono text-[10px] text-gray-500 mt-1">Threat contained by IDS</div>
            </div>
          </div>
        )}
      </div>

      <div className="flex flex-wrap items-center gap-3 mt-2 font-mono text-[9px] text-gray-500">
        {Object.entries({ primary: '#FF6B00', gateway: '#00D4FF', iot: '#00FF88', edge: '#9B59B6', analysis: '#FFD700', research: '#7FFF00' }).map(([t, c]) => (
          <span key={t} className="flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full" style={{ background: c }} />{t}</span>
        ))}
      </div>
    </div>
  );
}
