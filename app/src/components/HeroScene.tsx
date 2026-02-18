import { Canvas, useFrame } from '@react-three/fiber';
import { Float, MeshDistortMaterial } from '@react-three/drei';
import { useRef } from 'react';
import type { Mesh } from 'three';

const PulseCore = () => {
  const coreRef = useRef<Mesh>(null);

  useFrame(({ clock }) => {
    if (!coreRef.current) {
      return;
    }

    const t = clock.getElapsedTime();
    coreRef.current.rotation.x = t * 0.25;
    coreRef.current.rotation.y = t * 0.4;
  });

  return (
    <mesh ref={coreRef}>
      <icosahedronGeometry args={[1.4, 10]} />
      <MeshDistortMaterial
        color="#f2ab62"
        emissive="#f2ab62"
        emissiveIntensity={0.35}
        roughness={0.12}
        metalness={0.5}
        distort={0.3}
        speed={1.8}
      />
    </mesh>
  );
};

const OrbitRings = () => {
  const ringARef = useRef<Mesh>(null);
  const ringBRef = useRef<Mesh>(null);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();

    if (ringARef.current) {
      ringARef.current.rotation.z = t * 0.25;
      ringARef.current.rotation.x = Math.PI / 2.5;
    }

    if (ringBRef.current) {
      ringBRef.current.rotation.z = -t * 0.35;
      ringBRef.current.rotation.x = Math.PI / 2;
      ringBRef.current.rotation.y = Math.PI / 8;
    }
  });

  return (
    <>
      <mesh ref={ringARef}>
        <torusGeometry args={[2.6, 0.04, 16, 220]} />
        <meshStandardMaterial color="#89d0c5" emissive="#89d0c5" emissiveIntensity={0.2} />
      </mesh>
      <mesh ref={ringBRef}>
        <torusGeometry args={[2.15, 0.025, 16, 220]} />
        <meshStandardMaterial color="#f7d0a2" emissive="#f7d0a2" emissiveIntensity={0.2} />
      </mesh>
    </>
  );
};

const HeroScene = () => {
  return (
    <div className="relative h-[380px] w-full overflow-hidden rounded-[2rem] border border-white/15 bg-gradient-to-br from-[#0f1118] via-[#171a26] to-[#1f2433] shadow-[0_20px_80px_rgba(13,16,30,0.55)] lg:h-[460px]">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(242,171,98,0.22),transparent_45%),radial-gradient(circle_at_75%_80%,rgba(137,208,197,0.18),transparent_40%)]" />
      <Canvas camera={{ position: [0, 0, 6], fov: 45 }}>
        <ambientLight intensity={0.45} />
        <directionalLight position={[3, 4, 4]} intensity={1.3} color="#ffe3bd" />
        <pointLight position={[-4, -2, 3]} intensity={1} color="#8ad6ca" />
        <Float speed={1.4} rotationIntensity={0.3} floatIntensity={0.8}>
          <PulseCore />
        </Float>
        <OrbitRings />
      </Canvas>
      <div className="pointer-events-none absolute left-5 top-5 rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs font-medium text-white/80 backdrop-blur">
        Interactive 3D Preview
      </div>
    </div>
  );
};

export default HeroScene;
