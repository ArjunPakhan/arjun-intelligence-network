import { useRef, useMemo, useCallback } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';

function Particles() {
  const count = 1200;
  const mesh = useRef();
  const { viewport } = useThree();

  const [positions, velocities, originalPositions] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const vel = new Float32Array(count * 3);
    const orig = new Float32Array(count * 3);

    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      const spread = Math.min(viewport.width * 0.4, 8);
      const x = (Math.random() - 0.5) * spread;
      const y = (Math.random() - 0.5) * 3;
      const z = (Math.random() - 0.5) * 2 - 1;

      pos[i3] = x;
      pos[i3 + 1] = y;
      pos[i3 + 2] = z;
      orig[i3] = x;
      orig[i3 + 1] = y;
      orig[i3 + 2] = z;
      vel[i3] = 0;
      vel[i3 + 1] = 0;
      vel[i3 + 2] = 0;
    }

    return [pos, vel, orig];
  }, [viewport.width]);

  const mousePos = useRef(new THREE.Vector2(0, 0));
  const isHovering = useRef(false);

  const handlePointerMove = useCallback((e) => {
    mousePos.current.set(
      (e.point.x / viewport.width) * 2,
      (e.point.y / 3) * 2
    );
    isHovering.current = true;
  }, [viewport.width]);

  const handlePointerLeave = useCallback(() => {
    isHovering.current = false;
  }, []);

  useFrame((state, delta) => {
    if (!mesh.current) return;
    const posArray = mesh.current.geometry.attributes.position.array;
    const springStrength = 0.03;
    const damping = 0.92;
    const scatterForce = 0.8;

    for (let i = 0; i < count; i++) {
      const i3 = i * 3;

      if (isHovering.current) {
        const dx = posArray[i3] - mousePos.current.x * (viewport.width / 2);
        const dy = posArray[i3 + 1] - mousePos.current.y * 1.5;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < 2) {
          const force = (2 - dist) * scatterForce;
          velocities[i3] += (dx / dist) * force * delta * 60;
          velocities[i3 + 1] += (dy / dist) * force * delta * 60;
        }
      }

      // Spring back to original position
      velocities[i3] += (originalPositions[i3] - posArray[i3]) * springStrength;
      velocities[i3 + 1] += (originalPositions[i3 + 1] - posArray[i3 + 1]) * springStrength;
      velocities[i3 + 2] += (originalPositions[i3 + 2] - posArray[i3 + 2]) * springStrength;

      // Damping
      velocities[i3] *= damping;
      velocities[i3 + 1] *= damping;
      velocities[i3 + 2] *= damping;

      posArray[i3] += velocities[i3] * delta * 60;
      posArray[i3 + 1] += velocities[i3 + 1] * delta * 60;
      posArray[i3 + 2] += velocities[i3 + 2] * delta * 60;
    }

    mesh.current.geometry.attributes.position.needsUpdate = true;
  });

  const particleTexture = useMemo(() => {
    const canvas = document.createElement('canvas');
    canvas.width = 32;
    canvas.height = 32;
    const ctx = canvas.getContext('2d');
    const gradient = ctx.createRadialGradient(16, 16, 0, 16, 16, 16);
    gradient.addColorStop(0, 'rgba(255, 107, 0, 1)');
    gradient.addColorStop(0.3, 'rgba(255, 107, 0, 0.6)');
    gradient.addColorStop(1, 'rgba(255, 107, 0, 0)');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, 32, 32);
    return new THREE.CanvasTexture(canvas);
  }, []);

  return (
    <points
      ref={mesh}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
    >
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        map={particleTexture}
        size={0.06}
        transparent
        opacity={0.9}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
        sizeAttenuation
      />
    </points>
  );
}

function NeuralNetworkBackground() {
  const groupRef = useRef();
  const nodeCount = 40;
  const connectionCount = 60;

  const nodes = useMemo(() => {
    return Array.from({ length: nodeCount }, () => ({
      x: (Math.random() - 0.5) * 20,
      y: (Math.random() - 0.5) * 12,
      z: (Math.random() - 0.5) * 6 - 3,
      speed: Math.random() * 0.3 + 0.1,
      offset: Math.random() * Math.PI * 2,
    }));
  }, []);

  const connections = useMemo(() => {
    const conns = [];
    for (let i = 0; i < connectionCount; i++) {
      const a = Math.floor(Math.random() * nodeCount);
      let b = Math.floor(Math.random() * nodeCount);
      if (a === b) b = (a + 1) % nodeCount;
      conns.push({ a, b, progress: Math.random() });
    }
    return conns;
  }, []);

  useFrame((state) => {
    if (!groupRef.current) return;
    groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.05) * 0.1;
  });

  return (
    <group ref={groupRef}>
      {nodes.map((node, i) => (
        <mesh key={`node-${i}`} position={[node.x, node.y, node.z]}>
          <sphereGeometry args={[0.03, 8, 8]} />
          <meshBasicMaterial color="#FF6B00" transparent opacity={0.4} />
        </mesh>
      ))}
      {connections.map((conn, i) => {
        const start = nodes[conn.a];
        const end = nodes[conn.b];
        const points = [
          new THREE.Vector3(start.x, start.y, start.z),
          new THREE.Vector3(end.x, end.y, end.z),
        ];
        const geometry = new THREE.BufferGeometry().setFromPoints(points);
        return (
          <line key={`conn-${i}`} geometry={geometry}>
            <lineBasicMaterial color="#FF6B00" transparent opacity={0.08} />
          </line>
        );
      })}
    </group>
  );
}

export default function HeroParticles() {
  return (
    <div className="absolute inset-0">
      <Canvas
        camera={{ position: [0, 0, 5], fov: 60 }}
        dpr={[1, 1.5]}
        gl={{ antialias: false, alpha: true }}
        style={{ background: 'transparent' }}
      >
        <ambientLight intensity={0.1} />
        <NeuralNetworkBackground />
        <Particles />
      </Canvas>
    </div>
  );
}
