import { useRef, useEffect, useState, useCallback, useMemo } from 'react';
import * as d3 from 'd3';
import graphData from '../../data/knowledge-graph.json';

const CATEGORY_COLORS = {
  security: '#FF2020',
  research: '#00FF88',
  systems: '#00D4FF',
  ml: '#9B59B6',
  ghost: '#555',
};

const CATEGORY_LABELS = {
  security: 'Security',
  research: 'Research',
  systems: 'Systems',
  ml: 'ML',
  ghost: 'Future',
};

export default function KnowledgeGraph({ onNodeSelect, searchQuery, timelineDate, clusterMode }) {
  const svgRef = useRef(null);
  const simulationRef = useRef(null);
  const [dimensions, setDimensions] = useState({ width: 900, height: 500 });
  const [hoveredNode, setHoveredNode] = useState(null);
  const [visibleNodes, setVisibleNodes] = useState(new Set());
  const nodesDataRef = useRef([]);
  const edgesDataRef = useRef([]);

  // Filter nodes by timeline date
  const getVisibleNodes = useCallback((date) => {
    if (!date) return new Set(graphData.nodes.map(n => n.id));
    return new Set(graphData.nodes.filter(n => n.introduced <= date).map(n => n.id));
  }, []);

  useEffect(() => {
    setVisibleNodes(getVisibleNodes(timelineDate));
  }, [timelineDate, getVisibleNodes]);

  // Resize
  useEffect(() => {
    const container = svgRef.current?.parentElement;
    if (!container) return;
    const obs = new ResizeObserver(entries => {
      const w = entries[0].contentRect.width;
      setDimensions({ width: w, height: Math.min(500, w * 0.55) });
    });
    obs.observe(container);
    return () => obs.disconnect();
  }, []);

  // Main D3 effect
  useEffect(() => {
    if (!svgRef.current) return;
    const { width, height } = dimensions;
    const svg = d3.select(svgRef.current);
    svg.selectAll('*').remove();

    // Background grid
    const defs = svg.append('defs');
    const gridPattern = defs.append('pattern').attr('id', 'grid').attr('width', 40).attr('height', 40);
    gridPattern.append('path').attr('d', 'M 40 0 L 0 0 0 40').attr('fill', 'none').attr('stroke', '#0D1117').attr('stroke-width', 0.5);

    svg.append('rect').attr('width', width).attr('height', height).attr('fill', '#04060C');
    svg.append('rect').attr('width', width).attr('height', height).attr('fill', 'url(#grid)').attr('opacity', 0.5);

    // Scanline overlay
    const scanG = svg.append('g').attr('opacity', 0.03);
    for (let y = 0; y < height; y += 3) {
      scanG.append('line').attr('x1', 0).attr('y1', y).attr('x2', width).attr('y2', y).attr('stroke', '#fff').attr('stroke-width', 0.5);
    }

    const g = svg.append('g');

    // Prepare data
    const nodes = graphData.nodes.map(n => ({
      ...n,
      x: width / 2 + (Math.random() - 0.5) * width * 0.6,
      y: height / 2 + (Math.random() - 0.5) * height * 0.6,
      color: CATEGORY_COLORS[n.category] || '#666',
      isGhost: n.category === 'ghost',
    }));

    const nodeMap = {};
    nodes.forEach(n => { nodeMap[n.id] = n; });

    const edges = graphData.edges
      .filter(e => nodeMap[e.source] && nodeMap[e.target])
      .map(e => ({
        ...e,
        source: nodeMap[e.source] || e.source,
        target: nodeMap[e.target] || e.target,
      }));

    nodesDataRef.current = nodes;
    edgesDataRef.current = edges;

    // Force simulation
    const simulation = d3.forceSimulation(nodes)
      .force('link', d3.forceLink(edges).id(d => d.id).distance(d => 110 + (1 - d.strength) * 60).strength(d => d.strength * 0.3))
      .force('charge', d3.forceManyBody().strength(d => -250 - d.connections.length * 30))
      .force('center', d3.forceCenter(width / 2, height / 2))
      .force('collision', d3.forceCollide().radius(d => getNodeRadius(d) + 15))
      .force('x', d3.forceX(width / 2).strength(0.03))
      .force('y', d3.forceY(height / 2).strength(0.03))
      .alphaDecay(0.02)
      .velocityDecay(0.4);

    simulationRef.current = simulation;

    function getNodeRadius(d) {
      const base = 8;
      const connectionBonus = d.connections.length * 1.5;
      return base + connectionBonus;
    }

    // Edge elements
    const edgeG = g.append('g');
    const edgeEls = edgeG.selectAll('line').data(edges).enter().append('line')
      .attr('stroke', '#1C2030')
      .attr('stroke-width', d => 0.2 + d.strength * 2.8)
      .attr('stroke-dasharray', d => {
        if (d.type === 'dashed') return '6,4';
        if (d.type === 'dotted') return '2,3';
        if (d.type === 'animated') return '4,4';
        return 'none';
      })
      .attr('stroke-opacity', 0.4);

    // Animated edge particles
    const particleG = g.append('g');
    let ambientInterval;

    function spawnParticle() {
      if (edges.length === 0) return;
      const edge = edges[Math.floor(Math.random() * edges.length)];
      const sourceNode = typeof edge.source === 'object' ? edge.source : nodeMap[edge.source];
      const targetNode = typeof edge.target === 'object' ? edge.target : nodeMap[edge.target];
      if (!sourceNode || !targetNode) return;

      const particle = particleG.append('circle')
        .attr('r', 1.5)
        .attr('fill', sourceNode.color)
        .attr('opacity', 0.6)
        .attr('cx', sourceNode.x)
        .attr('cy', sourceNode.y);

      particle.transition()
        .duration(1500 + Math.random() * 1000)
        .ease(d3.easeLinear)
        .attr('cx', targetNode.x)
        .attr('cy', targetNode.y)
        .attr('opacity', 0)
        .remove();
    }

    ambientInterval = setInterval(() => {
      spawnParticle();
    }, 8000 + Math.random() * 2000);

    // Node elements
    const nodeG = g.append('g');
    const nodeEls = nodeG.selectAll('g').data(nodes).enter().append('g')
      .attr('cursor', 'pointer')
      .call(d3.drag()
        .on('start', (event, d) => {
          if (!event.active) simulation.alphaTarget(0.1).restart();
          d.fx = d.x;
          d.fy = d.y;
        })
        .on('drag', (event, d) => {
          d.fx = event.x;
          d.fy = event.y;
        })
        .on('end', (event, d) => {
          if (!event.active) simulation.alphaTarget(0);
          d.fx = null;
          d.fy = null;
        }));

    // Node glow (for pulse)
    nodeEls.append('circle')
      .attr('class', 'node-glow')
      .attr('r', d => getNodeRadius(d) + 4)
      .attr('fill', 'none')
      .attr('stroke', d => d.color)
      .attr('stroke-width', 0)
      .attr('stroke-opacity', 0);

    // Node circle
    nodeEls.append('circle')
      .attr('class', 'node-core')
      .attr('r', d => getNodeRadius(d))
      .attr('fill', d => d.isGhost ? '#04060C' : `${d.color}20`)
      .attr('stroke', d => d.color)
      .attr('stroke-width', d => d.isGhost ? 1 : 1.5)
      .attr('stroke-dasharray', d => d.isGhost ? '3,3' : 'none')
      .attr('stroke-opacity', d => d.isGhost ? 0.3 : 0.7);

    // Node label
    nodeEls.append('text')
      .attr('dy', d => getNodeRadius(d) + 12)
      .attr('text-anchor', 'middle')
      .attr('fill', d => d.isGhost ? '#444' : '#888')
      .attr('font-family', 'JetBrains Mono, monospace')
      .attr('font-size', '8px')
      .text(d => d.label);

    // Hover: glow effect
    nodeEls.on('mouseenter', (event, d) => {
      setHoveredNode(d.id);

      // Connected node IDs
      const connectedIds = new Set();
      edges.forEach(e => {
        const sId = typeof e.source === 'object' ? e.source.id : e.source;
        const tId = typeof e.target === 'object' ? e.target.id : e.target;
        if (sId === d.id) connectedIds.add(tId);
        if (tId === d.id) connectedIds.add(sId);
      });
      connectedIds.add(d.id);

      // Dim non-connected nodes
      nodeEls.select('.node-core')
        .transition().duration(200)
        .attr('opacity', n => connectedIds.has(n.id) ? 1 : 0.15);

      nodeEls.select('text')
        .transition().duration(200)
        .attr('opacity', n => connectedIds.has(n.id) ? 1 : 0.15);

      // Dim non-connected edges
      edgeEls.transition().duration(200)
        .attr('stroke-opacity', e => {
          const sId = typeof e.source === 'object' ? e.source.id : e.source;
          const tId = typeof e.target === 'object' ? e.target.id : e.target;
          return (sId === d.id || tId === d.id) ? 0.8 : 0.05;
        })
        .attr('stroke', e => {
          const sId = typeof e.source === 'object' ? e.source.id : e.source;
          const tId = typeof e.target === 'object' ? e.target.id : e.target;
          return (sId === d.id || tId === d.id) ? d.color : '#1C2030';
        });

      // Glow on hovered node
      nodeEls.filter(n => n.id === d.id).select('.node-glow')
        .transition().duration(200)
        .attr('stroke-width', 3)
        .attr('stroke-opacity', 0.3)
        .attr('r', getNodeRadius(d) + 8);

      // Drift connected nodes toward hovered
      edges.forEach(e => {
        const sId = typeof e.source === 'object' ? e.source.id : e.source;
        const tId = typeof e.target === 'object' ? e.target.id : e.target;
        let other = null;
        if (sId === d.id) other = nodes.find(n => n.id === tId);
        if (tId === d.id) other = nodes.find(n => n.id === sId);
        if (other) {
          other.fx = other.x + (d.x - other.x) * 0.1;
          other.fy = other.y + (d.y - other.y) * 0.1;
        }
      });
    });

    nodeEls.on('mouseleave', () => {
      setHoveredNode(null);

      nodeEls.select('.node-core').transition().duration(300).attr('opacity', 1);
      nodeEls.select('text').transition().duration(300).attr('opacity', 1);
      edgeEls.transition().duration(300).attr('stroke-opacity', 0.4).attr('stroke', '#1C2030');

      nodeEls.select('.node-glow')
        .transition().duration(300)
        .attr('stroke-width', 0)
        .attr('stroke-opacity', 0)
        .attr('r', d => getNodeRadius(d) + 4);

      // Release drifted nodes
      nodes.forEach(n => { n.fx = null; n.fy = null; });
    });

    nodeEls.on('click', (event, d) => {
      event.stopPropagation();
      const connectedIds = [];
      edges.forEach(e => {
        const sId = typeof e.source === 'object' ? e.source.id : e.source;
        const tId = typeof e.target === 'object' ? e.target.id : e.target;
        if (sId === d.id) connectedIds.push(tId);
        if (tId === d.id) connectedIds.push(sId);
      });
      onNodeSelect?.({ ...d, connectedIds });
    });

    svg.on('click', () => onNodeSelect?.(null));

    // Ambient pulse — one node pulses every 12s
    let pulseInterval;
    pulseInterval = setInterval(() => {
      const randomNode = nodes[Math.floor(Math.random() * nodes.length)];
      if (randomNode.isGhost) return;
      nodeEls.filter(n => n.id === randomNode.id).select('.node-glow')
        .transition().duration(400)
        .attr('stroke-width', 2)
        .attr('stroke-opacity', 0.4)
        .attr('r', getNodeRadius(randomNode) + 10)
        .transition().duration(800)
        .attr('stroke-width', 0)
        .attr('stroke-opacity', 0)
        .attr('r', getNodeRadius(randomNode) + 4);
    }, 12000);

    // Tick
    simulation.on('tick', () => {
      edgeEls
        .attr('x1', d => d.source.x).attr('y1', d => d.source.y)
        .attr('x2', d => d.target.x).attr('y2', d => d.target.y);

      nodeEls.attr('transform', d => `translate(${d.x},${d.y})`);
    });

    return () => {
      simulation.stop();
      clearInterval(ambientInterval);
      clearInterval(pulseInterval);
    };
  }, [dimensions, onNodeSelect]);

  // Timeline visibility
  useEffect(() => {
    if (!svgRef.current) return;
    const svg = d3.select(svgRef.current);
    svg.selectAll('.node-core, text').transition().duration(400)
      .attr('opacity', function() {
        const d = d3.select(this.parentNode).datum();
        if (!d) return 1;
        return visibleNodes.has(d.id) ? 1 : 0.05;
      });
  }, [visibleNodes]);

  // Search highlight
  useEffect(() => {
    if (!svgRef.current) return;
    const svg = d3.select(svgRef.current);
    if (!searchQuery) {
      svg.selectAll('.node-core').transition().duration(300).attr('opacity', 1);
      svg.selectAll('text').transition().duration(300).attr('opacity', 1);
      return;
    }
    const q = searchQuery.toLowerCase();
    const matchIds = new Set(graphData.nodes.filter(n => n.label.toLowerCase().includes(q) || n.category.includes(q)).map(n => n.id));

    svg.selectAll('.node-core').transition().duration(300)
      .attr('opacity', function() {
        const d = d3.select(this.parentNode).datum();
        return d && matchIds.has(d.id) ? 1 : 0.1;
      })
      .attr('stroke-width', function() {
        const d = d3.select(this.parentNode).datum();
        return d && matchIds.has(d.id) ? 2.5 : 1;
      });

    svg.selectAll('text').transition().duration(300)
      .attr('opacity', function() {
        const d = d3.select(this.parentNode).datum();
        return d && matchIds.has(d.id) ? 1 : 0.1;
      });
  }, [searchQuery]);

  // Cluster toggle
  useEffect(() => {
    if (!svgRef.current || !clusterMode) return;
    const simulation = simulationRef.current;
    if (!simulation) return;

    const { width, height } = dimensions;
    const clusterCenters = {
      security: { x: width * 0.2, y: height * 0.3 },
      ml: { x: width * 0.5, y: height * 0.3 },
      systems: { x: width * 0.8, y: height * 0.3 },
      research: { x: width * 0.35, y: height * 0.7 },
      ghost: { x: width * 0.65, y: height * 0.7 },
    };

    simulation.force('x', d3.forceX(d => clusterCenters[d.category]?.x || width / 2).strength(0.5));
    simulation.force('y', d3.forceY(d => clusterCenters[d.category]?.y || height / 2).strength(0.5));
    simulation.alpha(0.5).restart();

    setTimeout(() => {
      simulation.force('x', d3.forceX(width / 2).strength(0.03));
      simulation.force('y', d3.forceY(height / 2).strength(0.03));
    }, 3000);
  }, [clusterMode, dimensions]);

  return (
    <div className="w-full relative">
      <svg
        ref={svgRef}
        width="100%"
        height={dimensions.height}
        viewBox={`0 0 ${dimensions.width} ${dimensions.height}`}
        className="rounded border cursor-crosshair"
        style={{ background: '#04060C', borderColor: '#1C2030' }}
      />
    </div>
  );
}

export { CATEGORY_COLORS, CATEGORY_LABELS };
