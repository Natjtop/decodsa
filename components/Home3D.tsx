'use client';

import { useRef, useMemo, useEffect } from 'react';
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

// --- Models ---

function HeroTerrain({ scrollRef }: { scrollRef: React.MutableRefObject<number> }) {
  const meshRef = useRef<THREE.Mesh>(null);
  const matRef = useRef<THREE.MeshBasicMaterial>(null);
  
  const geometry = useMemo(() => {
    const geo = new THREE.PlaneGeometry(1200, 1200, 180, 180);
    geo.rotateX(-Math.PI / 2);
    return geo;
  }, []);

  useFrame((state) => {
    if (!meshRef.current || !matRef.current) return;
    
    const p = scrollRef.current;
    // Fade out between 10% and 20% scroll
    const opacity = getOpacity(p, -0.1, 0.0, 0.1, 0.2, 0.6);
    matRef.current.opacity = opacity;
    meshRef.current.visible = opacity > 0;

    if (opacity > 0) {
      const posAttr = meshRef.current.geometry.attributes.position;
      const time = state.clock.elapsedTime * 15;
      for (let i = 0; i < posAttr.count; i++) {
        const x = posAttr.getX(i);
        const z = posAttr.getZ(i) - time;
        const distFromCenter = Math.abs(x);
        const valleyFactor = Math.max(0, Math.min(1, (distFromCenter - 10) / 60));
        const y = (Math.sin(x * 0.02) * Math.cos(z * 0.02) * 60) * valleyFactor;
        posAttr.setY(i, y - 20);
      }
      posAttr.needsUpdate = true;
    }
  });

  return (
    <mesh ref={meshRef} geometry={geometry} position={[0, -5, -40]}>
      <meshBasicMaterial ref={matRef} color="#ffffff" wireframe transparent opacity={0.6} />
    </mesh>
  );
}

function ServicesNode({ scrollRef }: { scrollRef: React.MutableRefObject<number> }) {
  const ref = useRef<THREE.Mesh>(null);
  const matRef = useRef<THREE.MeshBasicMaterial>(null);

  useFrame((state) => {
    if (!ref.current || !matRef.current) return;
    const p = scrollRef.current;
    // Fade in 10-20%, fade out 30-40%
    const opacity = getOpacity(p, 0.1, 0.2, 0.3, 0.4, 0.3);
    matRef.current.opacity = opacity;
    ref.current.visible = opacity > 0;

    if (opacity > 0) {
      ref.current.rotation.x = state.clock.elapsedTime * 0.1;
      ref.current.rotation.y = state.clock.elapsedTime * 0.15;
    }
  });

  return (
    <mesh ref={ref} position={[15, 0, -20]}>
      <torusKnotGeometry args={[10, 2.5, 128, 32]} />
      <meshBasicMaterial ref={matRef} color="#ffffff" wireframe transparent opacity={0} />
    </mesh>
  );
}

function TechGlobe({ scrollRef }: { scrollRef: React.MutableRefObject<number> }) {
  const ref = useRef<THREE.Mesh>(null);
  const matRef = useRef<THREE.MeshBasicMaterial>(null);

  useFrame((state) => {
    if (!ref.current || !matRef.current) return;
    const p = scrollRef.current;
    // Fade in 30-40%, fade out 45-55%
    const opacity = getOpacity(p, 0.3, 0.4, 0.45, 0.55, 0.3);
    matRef.current.opacity = opacity;
    ref.current.visible = opacity > 0;

    if (opacity > 0) {
      ref.current.rotation.y = state.clock.elapsedTime * 0.2;
      ref.current.rotation.x = state.clock.elapsedTime * 0.05;
    }
  });

  return (
    <mesh ref={ref} position={[-15, 0, -20]}>
      <icosahedronGeometry args={[12, 2]} />
      <meshBasicMaterial ref={matRef} color="#ffffff" wireframe transparent opacity={0} />
    </mesh>
  );
}

function ProjectsMonolithsFixed({ scrollRef }: { scrollRef: React.MutableRefObject<number> }) {
  const groupRef = useRef<THREE.Group>(null);
  
  useFrame((state) => {
    if (!groupRef.current) return;
    const p = scrollRef.current;
    // Fade in 45-55%, fade out 75-85%
    const opacity = getOpacity(p, 0.45, 0.55, 0.75, 0.85, 0.3);
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
    <group ref={groupRef} position={[15, 0, -30]}>
      {[...Array(5)].map((_, i) => (
        <mesh key={i} position={[i * 8 - 16, 0, (i % 2) * 5]}>
          <boxGeometry args={[4, 20, 4]} />
          <meshBasicMaterial color="#ffffff" wireframe transparent opacity={0} />
        </mesh>
      ))}
    </group>
  );
}

function ContactGyro({ scrollRef }: { scrollRef: React.MutableRefObject<number> }) {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (!groupRef.current) return;
    const p = scrollRef.current;
    // Fade in 75-85%, stay until end
    const opacity = getOpacity(p, 0.75, 0.85, 1.1, 1.2, 0.4);
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
    <group ref={groupRef} position={[-15, 0, -20]}>
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

function CameraRig() {
  const { camera } = useThree();
  const mouse = useMouseParallax();
  
  useFrame(() => {
    camera.position.x += (mouse.current.x * 2 - camera.position.x) * 0.05;
    camera.position.y += (5 + mouse.current.y * 1 - camera.position.y) * 0.05;
    camera.lookAt(0, 5, -50);
  });
  
  return null;
}

function Scene() {
  const scrollRef = useScrollProgress();
  
  return (
    <>
      <fog attach="fog" args={['#000000', 30, 400]} />
      <CameraRig />
      <HeroTerrain scrollRef={scrollRef} />
      <ServicesNode scrollRef={scrollRef} />
      <TechGlobe scrollRef={scrollRef} />
      <ProjectsMonolithsFixed scrollRef={scrollRef} />
      <ContactGyro scrollRef={scrollRef} />
    </>
  );
}

export default function Home3D() {
  return (
    <div className="fixed inset-0 z-0 pointer-events-none">
      <Canvas camera={{ position: [0, 5, 20], fov: 60 }}>
        <Scene />
      </Canvas>
    </div>
  );
}
