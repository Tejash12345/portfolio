import { useMemo, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Sparkles } from '@react-three/drei';
import * as THREE from 'three';

const vertex = /* glsl */ `
  varying vec3 vNormal;
  varying vec3 vView;
  varying vec3 vPos;
  void main() {
    vec4 world = modelMatrix * vec4(position, 1.0);
    vPos = world.xyz;
    vNormal = normalize(normalMatrix * normal);
    vView = normalize(-(viewMatrix * world).xyz);
    gl_Position = projectionMatrix * viewMatrix * world;
  }
`;

// Fresnel rim + rainbow sweep + scanlines gives the holographic look.
const fragment = /* glsl */ `
  uniform float uTime;
  varying vec3 vNormal;
  varying vec3 vView;
  varying vec3 vPos;
  vec3 spectrum(float t) {
    return 0.5 + 0.5 * cos(6.28318 * (t + vec3(0.0, 0.33, 0.67)));
  }
  void main() {
    float fres = pow(1.0 - abs(dot(vNormal, vView)), 2.2);
    float scan = 0.55 + 0.45 * sin(vPos.y * 40.0 - uTime * 3.0);
    vec3 col = spectrum(fres * 0.9 + vPos.y * 0.15 + uTime * 0.08);
    float alpha = (0.12 + fres * 0.9) * scan;
    gl_FragColor = vec4(col * (0.4 + fres * 1.4), alpha);
  }
`;

function Hologram() {
  const group = useRef<THREE.Group>(null);
  const uniforms = useMemo(() => ({ uTime: { value: 0 } }), []);

  useFrame(({ clock, pointer }) => {
    uniforms.uTime.value = clock.elapsedTime;
    if (group.current) {
      group.current.rotation.y = clock.elapsedTime * 0.25 + pointer.x * 0.4;
      group.current.rotation.x = pointer.y * 0.25;
    }
  });

  return (
    <group ref={group}>
      <Float speed={1.6} rotationIntensity={0.4} floatIntensity={0.8}>
        <mesh>
          <torusKnotGeometry args={[1, 0.32, 220, 32]} />
          <shaderMaterial
            vertexShader={vertex}
            fragmentShader={fragment}
            uniforms={uniforms}
            transparent
            depthWrite={false}
            blending={THREE.AdditiveBlending}
            side={THREE.DoubleSide}
          />
        </mesh>
        <mesh scale={1.003}>
          <torusKnotGeometry args={[1, 0.32, 110, 12]} />
          <meshBasicMaterial color="#7df9ff" wireframe transparent opacity={0.08} />
        </mesh>
      </Float>
      {[2.1, 2.5].map((r, i) => (
        <mesh key={r} rotation={[Math.PI / 2.6 + i * 0.5, i * 0.6, 0.3]}>
          <torusGeometry args={[r, 0.006, 8, 160]} />
          <meshBasicMaterial color={i ? '#ff6ad5' : '#7df9ff'} transparent opacity={0.45} />
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
      <Hologram />
      <Sparkles count={120} scale={[9, 6, 4]} size={2} speed={0.3} color="#b8f7ff" opacity={0.6} />
    </Canvas>
  );
}
