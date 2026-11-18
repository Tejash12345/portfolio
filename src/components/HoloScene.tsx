import { useMemo, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Sparkles } from '@react-three/drei';
import * as THREE from 'three';

// A neural interface: a brain-shaped network of neurons and synapses, signals
// firing along the connections, and a small implant chip whose threads feed
// data up into the network.

const NODE_COUNT = 900;
const PULSE_COUNT = 220;
const THREAD_COUNT = 28;

// Deterministic random so the brain looks the same on every load.
function rng(seed: number) {
  let s = seed;
  return () => {
    s = (s * 16807) % 2147483647;
    return (s - 1) / 2147483646;
  };
}

function buildNetwork() {
  const rand = rng(42);
  const nodes: THREE.Vector3[] = [];

  while (nodes.length < NODE_COUNT) {
    // Random direction, then shape it into two hemispheres with folds.
    const u = rand() * 2 - 1;
    const a = rand() * Math.PI * 2;
    const s = Math.sqrt(1 - u * u);
    const dir = new THREE.Vector3(s * Math.cos(a), u, s * Math.sin(a));
    const hemi = dir.x >= 0 ? 1 : -1;
    const folds = 1 + 0.07 * Math.sin(dir.y * 14 + dir.z * 9) * Math.cos(dir.z * 11 - dir.x * 6);
    const r = (0.78 + rand() * 0.22) * folds;
    const p = new THREE.Vector3(dir.x * 1.25 * r + hemi * 0.09, dir.y * 0.95 * r, dir.z * 1.55 * r);
    if (p.y < -0.55 && Math.abs(p.z) < 0.6) continue; // flatten the underside a little
    nodes.push(p);
  }

  // Connect each neuron to its nearest neighbours.
  const edges: [number, number][] = [];
  const seen = new Set<string>();
  for (let i = 0; i < nodes.length; i++) {
    const near = nodes
      .map((n, j) => ({ j, d: j === i ? Infinity : n.distanceToSquared(nodes[i]) }))
      .sort((x, y) => x.d - y.d)
      .slice(0, 3);
    for (const { j, d } of near) {
      if (d > 0.09) continue;
      const key = i < j ? `${i}-${j}` : `${j}-${i}`;
      if (seen.has(key)) continue;
      seen.add(key);
      edges.push([i, j]);
    }
  }

  // Implant threads: from the chip below the brain up into the lowest neurons.
  const chip = new THREE.Vector3(0, -1.75, 0.35);
  const lower = nodes
    .map((n, i) => ({ i, y: n.y }))
    .sort((x, y) => x.y - y.y)
    .slice(0, 160);
  const threads: THREE.Vector3[][] = [];
  for (let t = 0; t < THREAD_COUNT; t++) {
    const target = nodes[lower[Math.floor(rand() * lower.length)].i];
    const start = chip.clone().add(new THREE.Vector3((rand() - 0.5) * 0.25, 0.05, (rand() - 0.5) * 0.25));
    const mid = start.clone().lerp(target, 0.5).add(new THREE.Vector3((rand() - 0.5) * 0.6, 0, (rand() - 0.5) * 0.6));
    threads.push(new THREE.CatmullRomCurve3([start, mid, target]).getPoints(40));
  }

  return { nodes, edges, threads, chip };
}

const nodeVertex = /* glsl */ `
  uniform float uTime;
  attribute float aSeed;
  varying float vFire;
  varying float vMix;
  void main() {
    vec4 mv = modelViewMatrix * vec4(position, 1.0);
    // Each neuron fires briefly at its own rhythm.
    float wave = sin(uTime * (0.6 + aSeed * 1.4) + aSeed * 40.0);
    vFire = smoothstep(0.92, 1.0, wave);
    vMix = clamp(position.y * 0.5 + 0.5, 0.0, 1.0);
    gl_PointSize = (3.4 + vFire * 6.0) * (6.0 / -mv.z);
    gl_Position = projectionMatrix * mv;
  }
`;

const nodeFragment = /* glsl */ `
  varying float vFire;
  varying float vMix;
  void main() {
    float d = length(gl_PointCoord - 0.5);
    float glow = smoothstep(0.5, 0.0, d);
    vec3 base = mix(vec3(0.35, 0.45, 1.0), vec3(0.49, 0.98, 1.0), vMix);
    vec3 col = mix(base, vec3(1.0, 0.45, 0.85), vFire);
    gl_FragColor = vec4(col * (1.2 + vFire * 1.6), glow * (0.85 + vFire * 0.15));
  }
`;

const pulseFragment = /* glsl */ `
  varying vec3 vColor;
  void main() {
    float d = length(gl_PointCoord - 0.5);
    gl_FragColor = vec4(vColor * 1.6, smoothstep(0.5, 0.0, d));
  }
`;

const pulseVertex = /* glsl */ `
  attribute vec3 color;
  varying vec3 vColor;
  void main() {
    vColor = color;
    vec4 mv = modelViewMatrix * vec4(position, 1.0);
    gl_PointSize = 7.0 * (6.0 / -mv.z);
    gl_Position = projectionMatrix * mv;
  }
`;

function NeuralNetwork() {
  const group = useRef<THREE.Group>(null);
  const pulsesRef = useRef<THREE.Points>(null);
  const chipRing = useRef<THREE.Mesh>(null);
  const { nodes, edges, threads, chip } = useMemo(buildNetwork, []);
  const uniforms = useMemo(() => ({ uTime: { value: 0 } }), []);

  const nodeGeo = useMemo(() => {
    const g = new THREE.BufferGeometry().setFromPoints(nodes);
    const rand = rng(7);
    g.setAttribute('aSeed', new THREE.Float32BufferAttribute(nodes.map(() => rand()), 1));
    return g;
  }, [nodes]);

  const edgeGeo = useMemo(() => {
    const pts: THREE.Vector3[] = [];
    edges.forEach(([a, b]) => pts.push(nodes[a], nodes[b]));
    return new THREE.BufferGeometry().setFromPoints(pts);
  }, [nodes, edges]);

  const threadGeo = useMemo(() => {
    const pts: THREE.Vector3[] = [];
    threads.forEach((path) => path.forEach((p, i) => i && pts.push(path[i - 1], p)));
    return new THREE.BufferGeometry().setFromPoints(pts);
  }, [threads]);

  // Signals: most travel between neurons, some climb the implant threads.
  const paths = useMemo(() => [...edges.map(([a, b]) => [nodes[a], nodes[b]]), ...threads], [nodes, edges, threads]);
  const pulses = useMemo(() => {
    const rand = rng(99);
    return Array.from({ length: PULSE_COUNT }, (_, i) => {
      const onThread = i % 5 === 0;
      return {
        path: onThread ? edges.length + Math.floor(rand() * threads.length) : Math.floor(rand() * edges.length),
        t: rand(),
        speed: onThread ? 0.25 + rand() * 0.2 : 0.6 + rand() * 0.9,
        onThread,
      };
    });
  }, [edges.length, threads.length]);

  const pulseGeo = useMemo(() => {
    const g = new THREE.BufferGeometry();
    g.setAttribute('position', new THREE.Float32BufferAttribute(new Float32Array(PULSE_COUNT * 3), 3));
    const colors = new Float32Array(PULSE_COUNT * 3);
    pulses.forEach((p, i) => colors.set(p.onThread ? [1, 0.42, 0.84] : [0.6, 1, 1], i * 3));
    g.setAttribute('color', new THREE.Float32BufferAttribute(colors, 3));
    return g;
  }, [pulses]);

  const tmp = useMemo(() => new THREE.Vector3(), []);

  useFrame(({ clock, pointer }, delta) => {
    const t = clock.elapsedTime;
    uniforms.uTime.value = t;
    if (group.current) {
      group.current.rotation.y += (t * 0.18 + pointer.x * 0.5 - group.current.rotation.y) * 0.05;
      group.current.rotation.x += (-0.15 + pointer.y * 0.25 - group.current.rotation.x) * 0.05;
    }
    if (chipRing.current) chipRing.current.rotation.z = t * 0.8;

    const pos = pulseGeo.getAttribute('position') as THREE.BufferAttribute;
    const step = Math.min(delta, 0.05);
    pulses.forEach((p, i) => {
      p.t += step * p.speed;
      if (p.t >= 1) {
        p.t = 0;
        p.path = p.onThread ? edges.length + Math.floor(Math.random() * threads.length) : Math.floor(Math.random() * edges.length);
      }
      const path = paths[p.path];
      const f = p.t * (path.length - 1);
      const k = Math.min(Math.floor(f), path.length - 2);
      tmp.copy(path[k]).lerp(path[k + 1], f - k);
      pos.setXYZ(i, tmp.x, tmp.y, tmp.z);
    });
    pos.needsUpdate = true;
  });

  return (
    <group ref={group} position={[0, 0.25, 0]}>
      <Float speed={1.2} rotationIntensity={0.15} floatIntensity={0.5}>
        <lineSegments geometry={edgeGeo}>
          <lineBasicMaterial color="#7df9ff" transparent opacity={0.2} blending={THREE.AdditiveBlending} depthWrite={false} />
        </lineSegments>
        <points geometry={nodeGeo}>
          <shaderMaterial
            vertexShader={nodeVertex}
            fragmentShader={nodeFragment}
            uniforms={uniforms}
            transparent
            depthWrite={false}
            blending={THREE.AdditiveBlending}
          />
        </points>
        <points ref={pulsesRef} geometry={pulseGeo} frustumCulled={false}>
          <shaderMaterial
            vertexShader={pulseVertex}
            fragmentShader={pulseFragment}
            transparent
            depthWrite={false}
            blending={THREE.AdditiveBlending}
          />
        </points>

        {/* Implant: threads, chip and a spinning data ring. */}
        <lineSegments geometry={threadGeo}>
          <lineBasicMaterial color="#ff6ad5" transparent opacity={0.35} blending={THREE.AdditiveBlending} depthWrite={false} />
        </lineSegments>
        <group position={chip}>
          <mesh rotation={[Math.PI / 2, 0, 0]}>
            <cylinderGeometry args={[0.32, 0.32, 0.06, 48]} />
            <meshBasicMaterial color="#16305a" />
          </mesh>
          <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.035, 0]}>
            <ringGeometry args={[0.18, 0.3, 48]} />
            <meshBasicMaterial color="#7df9ff" transparent opacity={0.55} blending={THREE.AdditiveBlending} />
          </mesh>
          <mesh ref={chipRing} rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.04, 0]}>
            <ringGeometry args={[0.42, 0.46, 64, 1, 0, Math.PI * 1.4]} />
            <meshBasicMaterial color="#ff6ad5" transparent opacity={0.7} side={THREE.DoubleSide} />
          </mesh>
          <pointLight color="#7df9ff" intensity={2} distance={2} />
        </group>
      </Float>

      {/* Scanning halo around the brain. */}
      {[2.2, 2.55].map((r, i) => (
        <mesh key={r} rotation={[Math.PI / 2.3 + i * 0.35, i * 0.5, 0.2]}>
          <torusGeometry args={[r, 0.004, 8, 200]} />
          <meshBasicMaterial color={i ? '#ff6ad5' : '#7df9ff'} transparent opacity={0.3} />
        </mesh>
      ))}
    </group>
  );
}

export default function HoloScene() {
  return (
    <Canvas
      camera={{ position: [0.6, 0, 7.2], fov: 45 }}
      dpr={[1, 1.75]}
      gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
    >
      <NeuralNetwork />
      <Sparkles count={90} scale={[9, 6, 4]} size={1.6} speed={0.25} color="#b8f7ff" opacity={0.45} />
    </Canvas>
  );
}
