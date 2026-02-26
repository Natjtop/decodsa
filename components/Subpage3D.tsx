'use client';

import { useRef, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';

// --- Shared Hooks ---
function useScrollProgress() {
  const progress = useRef(0);
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      progress.current = maxScroll > 0 ? scrollY / maxScroll : 0;
    };
    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  return progress;
}

function useMouseParallax() {
  const mouse = useRef({ x: 0, y: 0 });
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouse.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouse.current.y = -(e.clientY / window.innerHeight) * 2 + 1;
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);
  return mouse;
}

function getOpacity(p: number, fadeInStart: number, fadeInEnd: number, fadeOutStart: number, fadeOutEnd: number, maxOpacity: number) {
  if (p < fadeInStart || p > fadeOutEnd) return 0;
  if (p < fadeInEnd) return maxOpacity * ((p - fadeInStart) / (fadeInEnd - fadeInStart));
  if (p > fadeOutStart) return maxOpacity * (1 - ((p - fadeOutStart) / (fadeOutEnd - fadeOutStart)));
  return maxOpacity;
}

function CameraRig() {
  const { camera } = useThree();
  const mouse = useMouseParallax();
  
  useFrame(() => {
    camera.position.x += (mouse.current.x * 2 - camera.position.x) * 0.05;
    camera.position.y += (mouse.current.y * 2 - camera.position.y) * 0.05;
    camera.lookAt(0, 0, -20);
  });
  
  return null;
}

// --- Models ---
function GlobeModel({ scrollRef, thresholds, position = [0, 0, -15] }: { scrollRef: React.MutableRefObject<number>, thresholds: [number, number, number, number], position?: [number, number, number] }) {
  const ref = useRef<THREE.Mesh>(null);
  const matRef = useRef<THREE.MeshBasicMaterial>(null);

  useFrame((state) => {
    if (!ref.current || !matRef.current) return;
    const p = scrollRef.current;
    const opacity = getOpacity(p, thresholds[0], thresholds[1], thresholds[2], thresholds[3], 0.3);
    matRef.current.opacity = opacity;
    ref.current.visible = opacity > 0;

    if (opacity > 0) {
      ref.current.rotation.y = state.clock.elapsedTime * 0.2;
      ref.current.rotation.x = state.clock.elapsedTime * 0.05;
    }
  });

  return (
    <mesh ref={ref} position={position}>
      <icosahedronGeometry args={[12, 2]} />
      <meshBasicMaterial ref={matRef} color="#ffffff" wireframe transparent opacity={0} />
    </mesh>
  );
}

function TorusModel({ scrollRef, thresholds, position = [0, 0, -15] }: { scrollRef: React.MutableRefObject<number>, thresholds: [number, number, number, number], position?: [number, number, number] }) {
  const ref = useRef<THREE.Mesh>(null);
  const matRef = useRef<THREE.MeshBasicMaterial>(null);

  useFrame((state) => {
    if (!ref.current || !matRef.current) return;
    const p = scrollRef.current;
    const opacity = getOpacity(p, thresholds[0], thresholds[1], thresholds[2], thresholds[3], 0.3);
    matRef.current.opacity = opacity;
    ref.current.visible = opacity > 0;

    if (opacity > 0) {
      ref.current.rotation.x = state.clock.elapsedTime * 0.1;
      ref.current.rotation.y = state.clock.elapsedTime * 0.15;
    }
  });

  return (
    <mesh ref={ref} position={position}>
      <torusKnotGeometry args={[8, 2, 128, 32]} />
      <meshBasicMaterial ref={matRef} color="#ffffff" wireframe transparent opacity={0} />
    </mesh>
  );
}

function GyroModel({ scrollRef, thresholds, position = [0, 0, -15] }: { scrollRef: React.MutableRefObject<number>, thresholds: [number, number, number, number], position?: [number, number, number] }) {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (!groupRef.current) return;
    const p = scrollRef.current;
    const opacity = getOpacity(p, thresholds[0], thresholds[1], thresholds[2], thresholds[3], 0.4);
    groupRef.current.visible = opacity > 0;

    if (opacity > 0) {
      groupRef.current.rotation.x = state.clock.elapsedTime * 0.2;
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.3;
      groupRef.current.children.forEach((child: any) => {
        if (child.material) child.material.opacity = opacity;
      });
    }
  });

  return (
    <group ref={groupRef} position={position}>
      <mesh>
        <torusGeometry args={[10, 0.1, 16, 100]} />
        <meshBasicMaterial color="#ffffff" wireframe transparent opacity={0} />
      </mesh>
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[8, 0.1, 16, 100]} />
        <meshBasicMaterial color="#ffffff" wireframe transparent opacity={0} />
      </mesh>
      <mesh rotation={[0, Math.PI / 2, 0]}>
        <torusGeometry args={[6, 0.1, 16, 100]} />
        <meshBasicMaterial color="#ffffff" wireframe transparent opacity={0} />
      </mesh>
    </group>
  );
}

function MonolithsModel({ scrollRef, thresholds, position = [0, 0, -25] }: { scrollRef: React.MutableRefObject<number>, thresholds: [number, number, number, number], position?: [number, number, number] }) {
  const groupRef = useRef<THREE.Group>(null);
  
  useFrame((state) => {
    if (!groupRef.current) return;
    const p = scrollRef.current;
    const opacity = getOpacity(p, thresholds[0], thresholds[1], thresholds[2], thresholds[3], 0.3);
    groupRef.current.visible = opacity > 0;

    if (opacity > 0) {
      groupRef.current.children.forEach((child: any, i) => {
        child.position.y = Math.sin(state.clock.elapsedTime * 0.5 + i) * 2;
        child.rotation.y = state.clock.elapsedTime * 0.1 + i;
        if (child.material) {
          child.material.opacity = opacity;
        }
      });
    }
  });

  return (
    <group ref={groupRef} position={position}>
      {[...Array(5)].map((_, i) => (
        <mesh key={i} position={[i * 8 - 16, 0, (i % 2) * 5]}>
          <boxGeometry args={[4, 20, 4]} />
          <meshBasicMaterial color="#ffffff" wireframe transparent opacity={0} />
        </mesh>
      ))}
    </group>
  );
}

// --- Scenes ---
function WebScene({ scrollRef }: { scrollRef: React.MutableRefObject<number> }) {
  return (
    <>
      <GlobeModel scrollRef={scrollRef} thresholds={[-0.1, 0.0, 0.25, 0.35]} position={[10, 0, -15]} />
      <TorusModel scrollRef={scrollRef} thresholds={[0.25, 0.35, 0.6, 0.7]} position={[-10, 0, -15]} />
      <MonolithsModel scrollRef={scrollRef} thresholds={[0.6, 0.7, 1.1, 1.2]} position={[10, 0, -25]} />
    </>
  );
}

function AppScene({ scrollRef }: { scrollRef: React.MutableRefObject<number> }) {
  return (
    <>
      <TorusModel scrollRef={scrollRef} thresholds={[-0.1, 0.0, 0.25, 0.35]} position={[10, 0, -15]} />
      <GyroModel scrollRef={scrollRef} thresholds={[0.25, 0.35, 0.6, 0.7]} position={[-10, 0, -15]} />
      <GlobeModel scrollRef={scrollRef} thresholds={[0.6, 0.7, 1.1, 1.2]} position={[10, 0, -15]} />
    </>
  );
}

function SoftwareScene({ scrollRef }: { scrollRef: React.MutableRefObject<number> }) {
  return (
    <>
      <MonolithsModel scrollRef={scrollRef} thresholds={[-0.1, 0.0, 0.25, 0.35]} position={[10, 0, -25]} />
      <GlobeModel scrollRef={scrollRef} thresholds={[0.25, 0.35, 0.6, 0.7]} position={[-10, 0, -15]} />
      <GyroModel scrollRef={scrollRef} thresholds={[0.6, 0.7, 1.1, 1.2]} position={[10, 0, -15]} />
    </>
  );
}

export function Subpage3D({ type }: { type: 'web' | 'app' | 'software' }) {
  const scrollRef = useScrollProgress();
  
  return (
    <div className="fixed inset-0 z-0 pointer-events-none">
      <Canvas camera={{ position: [0, 0, 20], fov: 60 }}>
        <fog attach="fog" args={['#000000', 10, 50]} />
        <CameraRig />
        {type === 'web' && <WebScene scrollRef={scrollRef} />}
        {type === 'app' && <AppScene scrollRef={scrollRef} />}
        {type === 'software' && <SoftwareScene scrollRef={scrollRef} />}
      </Canvas>
    </div>
  );
}
