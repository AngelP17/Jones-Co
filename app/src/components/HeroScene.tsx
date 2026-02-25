import { Canvas, useFrame } from '@react-three/fiber';
import { Float } from '@react-three/drei';
import { useRef } from 'react';
import type { Mesh } from 'three';
import { useIsMobile } from '@/hooks/use-mobile';

const PulseCore = () => {
  const coreRef = useRef<Mesh>(null);

  useFrame(({ clock }) => {
    if (!coreRef.current) {
      return;
    }

    const t = clock.getElapsedTime();
    // Slower, more elegant rotation
    coreRef.current.rotation.x = t * 0.08;
    coreRef.current.rotation.y = t * 0.12;
  });

  return (
    <mesh ref={coreRef}>
      {/* Smooth sphere instead of wobbly icosahedron */}
      <sphereGeometry args={[1.4, 64, 64]} />
      <meshStandardMaterial
        color="#f2ab62"
        emissive="#f2ab62"
        emissiveIntensity={0.25}
        roughness={0.2}
        metalness={0.6}
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
      // Slower, more elegant rotation
      ringARef.current.rotation.z = t * 0.1;
      ringARef.current.rotation.x = Math.PI / 2.5;
    }

    if (ringBRef.current) {
      ringBRef.current.rotation.z = -t * 0.12;
      ringBRef.current.rotation.x = Math.PI / 2;
      ringBRef.current.rotation.y = Math.PI / 8;
    }
  });

  return (
    <>
      <mesh ref={ringARef}>
        <torusGeometry args={[2.6, 0.03, 16, 220]} />
        <meshStandardMaterial color="#89d0c5" emissive="#89d0c5" emissiveIntensity={0.15} opacity={0.85} transparent />
      </mesh>
      <mesh ref={ringBRef}>
        <torusGeometry args={[2.15, 0.02, 16, 220]} />
        <meshStandardMaterial color="#f7d0a2" emissive="#f7d0a2" emissiveIntensity={0.15} opacity={0.8} transparent />
      </mesh>
    </>
  );
};

const HeroScene = () => {
  const isMobile = useIsMobile();

  if (isMobile) {
    return (
      <div className="relative h-[260px] w-full overflow-hidden rounded-[1.5rem] border border-white/15 bg-gradient-to-br from-foreground via-foreground to-foreground/90 shadow-[0_20px_60px_rgba(13,16,30,0.45)] transition-all duration-300 ease-out sm:h-[320px]">
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-white/5 via-transparent to-transparent" />
        <div className="pointer-events-none absolute left-4 top-4 rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs font-medium text-white/80 backdrop-blur">
          Mobile-optimized preview
        </div>
      </div>
    );
  }

  return (
    <div className="relative h-[280px] w-full overflow-hidden rounded-[1.75rem] border border-white/15 bg-gradient-to-br from-foreground via-foreground to-foreground/90 shadow-[0_20px_80px_rgba(13,16,30,0.55)] transition-all duration-300 ease-out sm:h-[360px] lg:h-[420px]">
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-white/5 via-transparent to-transparent" />
      <Canvas
        camera={{ position: [0, 0, 6], fov: 45 }}
        dpr={[1, 1.5]}
        gl={{ antialias: true, powerPreference: 'high-performance' }}
      >
        <ambientLight intensity={0.4} />
        <directionalLight position={[3, 4, 4]} intensity={1.1} color="#ffe3bd" />
        <pointLight position={[-4, -2, 3]} intensity={0.8} color="#8ad6ca" />
        {/* Slower, more subtle floating */}
        <Float speed={0.8} rotationIntensity={0.1} floatIntensity={0.4}>
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
