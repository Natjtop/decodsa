'use client';

import { useRef, useEffect, useMemo } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import { usePathname } from 'next/navigation';

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

// --- Camera ---
function CameraRig({ pathname }: { pathname: string }) {
  const { camera } = useThree();
  const mouse = useMouseParallax();
  
  useFrame(() => {
    const isHome = pathname === '/';
    const targetY = isHome ? 5 : 0;
    const lookAtY = isHome ? 5 : 0;
    const lookAtZ = isHome ? -50 : -20;

    camera.position.x += (mouse.current.x * 2 - camera.position.x) * 0.05;
    camera.position.y += ((targetY + mouse.current.y * 2) - camera.position.y) * 0.05;
    camera.lookAt(0, lookAtY, lookAtZ);
  });
  
  return null;
}

// ==========================================
// --- HOME MODELS ---
// ==========================================
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
    // Fades out much faster (between 5% and 12% scroll)
    const opacity = getOpacity(p, -0.1, 0.0, 0.05, 0.12, 0.6);
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
    // Fades in much faster (between 5% and 12% scroll)
    const opacity = getOpacity(p, 0.05, 0.12, 0.35, 0.45, 0.3);
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
    const opacity = getOpacity(p, 0.35, 0.45, 0.55, 0.65, 0.3);
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
    const opacity = getOpacity(p, 0.55, 0.65, 0.8, 0.9, 0.3);
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
    const opacity = getOpacity(p, 0.8, 0.9, 1.1, 1.2, 0.4);
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

// ==========================================
// --- WEB MODELS (Network / Particles) ---
// ==========================================
function WebNetwork({ scrollRef, thresholds, position = [10, 0, -15] }: any) {
  const ref = useRef<THREE.Points>(null);
  const matRef = useRef<THREE.PointsMaterial>(null);
  useFrame((state) => {
    if (!ref.current || !matRef.current) return;
    const p = scrollRef.current;
    const opacity = getOpacity(p, thresholds[0], thresholds[1], thresholds[2], thresholds[3], 0.8);
    matRef.current.opacity = opacity;
    ref.current.visible = opacity > 0;
    if (opacity > 0) {
      ref.current.rotation.y = state.clock.elapsedTime * 0.1;
      ref.current.rotation.x = state.clock.elapsedTime * 0.05;
    }
  });
  return (
    <points ref={ref} position={position}>
      <icosahedronGeometry args={[12, 4]} />
      <pointsMaterial ref={matRef} color="#ffffff" size={0.05} transparent opacity={0} />
    </points>
  );
}

function WebRings({ scrollRef, thresholds, position = [-10, 0, -15] }: any) {
  const groupRef = useRef<THREE.Group>(null);
  useFrame((state) => {
    if (!groupRef.current) return;
    const p = scrollRef.current;
    const opacity = getOpacity(p, thresholds[0], thresholds[1], thresholds[2], thresholds[3], 0.4);
    groupRef.current.visible = opacity > 0;
    if (opacity > 0) {
      groupRef.current.children.forEach((child: any, i) => {
        child.rotation.x = state.clock.elapsedTime * (0.2 + i * 0.1);
        child.rotation.y = state.clock.elapsedTime * (0.1 + i * 0.05);
        if (child.material) child.material.opacity = opacity;
      });
    }
  });
  return (
    <group ref={groupRef} position={position}>
      {[8, 10, 12].map((radius, i) => (
        <mesh key={i}>
          <torusGeometry args={[radius, 0.05, 16, 100]} />
          <meshBasicMaterial color="#ffffff" wireframe transparent opacity={0} />
        </mesh>
      ))}
    </group>
  );
}

function WebDataStream({ scrollRef, thresholds, position = [10, 0, -25] }: any) {
  const groupRef = useRef<THREE.Group>(null);
  useFrame((state) => {
    if (!groupRef.current) return;
    const p = scrollRef.current;
    const opacity = getOpacity(p, thresholds[0], thresholds[1], thresholds[2], thresholds[3], 0.3);
    groupRef.current.visible = opacity > 0;
    if (opacity > 0) {
      groupRef.current.children.forEach((child: any, i) => {
        child.position.y = (Math.sin(state.clock.elapsedTime * 2 + i) * 5);
        if (child.material) child.material.opacity = opacity;
      });
    }
  });
  return (
    <group ref={groupRef} position={position}>
      {[...Array(20)].map((_, i) => (
        <mesh key={i} position={[(i % 5) * 4 - 8, 0, Math.floor(i / 5) * 4 - 8]}>
          <boxGeometry args={[0.5, 2, 0.5]} />
          <meshBasicMaterial color="#ffffff" wireframe transparent opacity={0} />
        </mesh>
      ))}
    </group>
  );
}

// ==========================================
// --- APP MODELS (Core / Interactive) ---
// ==========================================
function AppCore({ scrollRef, thresholds, position = [10, 0, -15] }: any) {
  const ref = useRef<THREE.Mesh>(null);
  const matRef = useRef<THREE.MeshBasicMaterial>(null);
  useFrame((state) => {
    if (!ref.current || !matRef.current) return;
    const p = scrollRef.current;
    const opacity = getOpacity(p, thresholds[0], thresholds[1], thresholds[2], thresholds[3], 0.4);
    matRef.current.opacity = opacity;
    ref.current.visible = opacity > 0;
    if (opacity > 0) {
      ref.current.rotation.y = state.clock.elapsedTime * 0.3;
      ref.current.rotation.z = Math.sin(state.clock.elapsedTime * 0.5) * 0.2;
    }
  });
  return (
    <mesh ref={ref} position={position}>
      <capsuleGeometry args={[5, 10, 16, 32]} />
      <meshBasicMaterial ref={matRef} color="#ffffff" wireframe transparent opacity={0} />
    </mesh>
  );
}

function AppWaves({ scrollRef, thresholds, position = [-10, 0, -15] }: any) {
  const ref = useRef<THREE.Mesh>(null);
  const matRef = useRef<THREE.MeshBasicMaterial>(null);
  const geoRef = useRef<THREE.PlaneGeometry>(null);
  useFrame((state) => {
    if (!ref.current || !matRef.current || !geoRef.current) return;
    const p = scrollRef.current;
    const opacity = getOpacity(p, thresholds[0], thresholds[1], thresholds[2], thresholds[3], 0.3);
    matRef.current.opacity = opacity;
    ref.current.visible = opacity > 0;
    if (opacity > 0) {
      ref.current.rotation.z = state.clock.elapsedTime * 0.1;
      const pos = geoRef.current.attributes.position;
      for (let i = 0; i < pos.count; i++) {
        const x = pos.getX(i);
        const y = pos.getY(i);
        const dist = Math.sqrt(x*x + y*y);
        pos.setZ(i, Math.sin(dist * 0.5 - state.clock.elapsedTime * 3) * 2);
      }
      pos.needsUpdate = true;
    }
  });
  return (
    <mesh ref={ref} position={position} rotation={[-Math.PI/3, 0, 0]}>
      <planeGeometry ref={geoRef} args={[30, 30, 32, 32]} />
      <meshBasicMaterial ref={matRef} color="#ffffff" wireframe transparent opacity={0} />
    </mesh>
  );
}

function AppParticles({ scrollRef, thresholds, position = [10, 0, -15] }: any) {
  const groupRef = useRef<THREE.Group>(null);
  const particles = useMemo(() => {
    return [...Array(30)].map(() => [
      (Math.random() - 0.5) * 20,
      (Math.random() - 0.5) * 20,
      (Math.random() - 0.5) * 20
    ]);
  }, []);

  useFrame((state) => {
    if (!groupRef.current) return;
    const p = scrollRef.current;
    const opacity = getOpacity(p, thresholds[0], thresholds[1], thresholds[2], thresholds[3], 0.5);
    groupRef.current.visible = opacity > 0;
    if (opacity > 0) {
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.1;
      groupRef.current.children.forEach((child: any, i) => {
        child.position.y += Math.sin(state.clock.elapsedTime + i) * 0.05;
        if (child.material) child.material.opacity = opacity;
      });
    }
  });
  return (
    <group ref={groupRef} position={position}>
      {particles.map((pos, i) => (
        <mesh key={i} position={pos as [number, number, number]}>
          <sphereGeometry args={[0.5, 8, 8]} />
          <meshBasicMaterial color="#ffffff" wireframe transparent opacity={0} />
        </mesh>
      ))}
    </group>
  );
}

// ==========================================
// --- SOFTWARE MODELS (Architecture) ---
// ==========================================
function SoftwareMatrix({ scrollRef, thresholds, position = [10, 0, -20] }: any) {
  const groupRef = useRef<THREE.Group>(null);
  useFrame((state) => {
    if (!groupRef.current) return;
    const p = scrollRef.current;
    const opacity = getOpacity(p, thresholds[0], thresholds[1], thresholds[2], thresholds[3], 0.3);
    groupRef.current.visible = opacity > 0;
    if (opacity > 0) {
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.1;
      groupRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.2) * 0.2;
      groupRef.current.children.forEach((child: any, i) => {
        const scale = 1 + Math.sin(state.clock.elapsedTime * 2 + i) * 0.5;
        child.scale.set(scale, scale, scale);
        if (child.material) child.material.opacity = opacity;
      });
    }
  });
  return (
    <group ref={groupRef} position={position}>
      {[...Array(27)].map((_, i) => {
        const x = (i % 3) * 6 - 6;
        const y = Math.floor((i % 9) / 3) * 6 - 6;
        const z = Math.floor(i / 9) * 6 - 6;
        return (
          <mesh key={i} position={[x, y, z]}>
            <boxGeometry args={[3, 3, 3]} />
            <meshBasicMaterial color="#ffffff" wireframe transparent opacity={0} />
          </mesh>
        );
      })}
    </group>
  );
}

function SoftwareOctahedrons({ scrollRef, thresholds, position = [-10, 0, -15] }: any) {
  const groupRef = useRef<THREE.Group>(null);
  useFrame((state) => {
    if (!groupRef.current) return;
    const p = scrollRef.current;
    const opacity = getOpacity(p, thresholds[0], thresholds[1], thresholds[2], thresholds[3], 0.4);
    groupRef.current.visible = opacity > 0;
    if (opacity > 0) {
      groupRef.current.children.forEach((child: any, i) => {
        child.rotation.x = state.clock.elapsedTime * (0.2 + i * 0.1);
        child.rotation.y = state.clock.elapsedTime * (0.3 - i * 0.05);
        if (child.material) child.material.opacity = opacity;
      });
    }
  });
  return (
    <group ref={groupRef} position={position}>
      {[6, 9, 12].map((radius, i) => (
        <mesh key={i}>
          <octahedronGeometry args={[radius, 0]} />
          <meshBasicMaterial color="#ffffff" wireframe transparent opacity={0} />
        </mesh>
      ))}
    </group>
  );
}

function SoftwarePillars({ scrollRef, thresholds, position = [10, 0, -20] }: any) {
  const groupRef = useRef<THREE.Group>(null);
  useFrame((state) => {
    if (!groupRef.current) return;
    const p = scrollRef.current;
    const opacity = getOpacity(p, thresholds[0], thresholds[1], thresholds[2], thresholds[3], 0.3);
    groupRef.current.visible = opacity > 0;
    if (opacity > 0) {
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.05;
      groupRef.current.children.forEach((child: any, i) => {
        child.position.y = Math.sin(state.clock.elapsedTime + i) * 3;
        if (child.material) child.material.opacity = opacity;
      });
    }
  });
  return (
    <group ref={groupRef} position={position}>
      {[...Array(8)].map((_, i) => {
        const angle = (i / 8) * Math.PI * 2;
        const radius = 10;
        return (
          <mesh key={i} position={[Math.cos(angle) * radius, 0, Math.sin(angle) * radius]}>
            <cylinderGeometry args={[1.5, 1.5, 20, 6]} />
            <meshBasicMaterial color="#ffffff" wireframe transparent opacity={0} />
          </mesh>
        );
      })}
    </group>
  );
}

// ==========================================
// --- SCENES ---
// ==========================================
function HomeScene({ scrollRef }: { scrollRef: React.MutableRefObject<number> }) {
  return (
    <>
      <HeroTerrain scrollRef={scrollRef} />
      <ServicesNode scrollRef={scrollRef} />
      <TechGlobe scrollRef={scrollRef} />
      <ProjectsMonolithsFixed scrollRef={scrollRef} />
      <ContactGyro scrollRef={scrollRef} />
    </>
  );
}

function WebScene({ scrollRef }: { scrollRef: React.MutableRefObject<number> }) {
  return (
    <>
      <WebNetwork scrollRef={scrollRef} thresholds={[-0.1, 0.0, 0.25, 0.35]} position={[10, 0, -15]} />
      <WebRings scrollRef={scrollRef} thresholds={[0.25, 0.35, 0.6, 0.7]} position={[-10, 0, -15]} />
      <WebDataStream scrollRef={scrollRef} thresholds={[0.6, 0.7, 1.1, 1.2]} position={[10, 0, -25]} />
    </>
  );
}

function AppScene({ scrollRef }: { scrollRef: React.MutableRefObject<number> }) {
  return (
    <>
      <AppCore scrollRef={scrollRef} thresholds={[-0.1, 0.0, 0.25, 0.35]} position={[10, 0, -15]} />
      <AppWaves scrollRef={scrollRef} thresholds={[0.25, 0.35, 0.6, 0.7]} position={[-10, 0, -15]} />
      <AppParticles scrollRef={scrollRef} thresholds={[0.6, 0.7, 1.1, 1.2]} position={[10, 0, -15]} />
    </>
  );
}

function SoftwareScene({ scrollRef }: { scrollRef: React.MutableRefObject<number> }) {
  return (
    <>
      <SoftwareMatrix scrollRef={scrollRef} thresholds={[-0.1, 0.0, 0.25, 0.35]} position={[10, 0, -25]} />
      <SoftwareOctahedrons scrollRef={scrollRef} thresholds={[0.25, 0.35, 0.6, 0.7]} position={[-10, 0, -15]} />
      <SoftwarePillars scrollRef={scrollRef} thresholds={[0.6, 0.7, 1.1, 1.2]} position={[10, 0, -20]} />
    </>
  );
}

export default function Global3D() {
  const pathname = usePathname();
  const scrollRef = useScrollProgress();
  
  return (
    <div className="fixed inset-0 z-0 pointer-events-none">
      <Canvas camera={{ position: [0, 5, 20], fov: 60 }}>
        <fog attach="fog" args={['#000000', 10, 400]} />
        <CameraRig pathname={pathname} />
        {pathname === '/' && <HomeScene scrollRef={scrollRef} />}
        {pathname === '/web' && <WebScene scrollRef={scrollRef} />}
        {pathname === '/app' && <AppScene scrollRef={scrollRef} />}
        {pathname === '/software' && <SoftwareScene scrollRef={scrollRef} />}
      </Canvas>
    </div>
  );
}
