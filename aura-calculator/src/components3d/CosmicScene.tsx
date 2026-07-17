"use client";

import { useRef, useMemo, Suspense } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Stars, Float, Sparkles } from "@react-three/drei";
import * as THREE from "three";

// ===== STAR FIELD =====
function StarField() {
  const ref = useRef<THREE.Points>(null);

  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.y = state.clock.elapsedTime * 0.02;
      ref.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.01) * 0.1;
    }
  });

  return (
    <group>
      <Stars
        ref={ref}
        radius={100}
        depth={80}
        count={5000}
        factor={4}
        saturation={0.5}
        fade
        speed={0.5}
      />
      <Sparkles
        count={200}
        scale={150}
        size={2}
        speed={0.3}
        opacity={0.6}
        color="#a855f7"
      />
    </group>
  );
}

// ===== NEBULA CLOUD =====
function NebulaCloud({
  position,
  color,
  scale = 1,
  speed = 0.2,
}: {
  position: [number, number, number];
  color: string;
  scale?: number;
  speed?: number;
}) {
  const ref = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.x = Math.sin(state.clock.elapsedTime * speed) * 0.1;
      ref.current.rotation.y = state.clock.elapsedTime * speed * 0.5;
      ref.current.scale.setScalar(
        scale + Math.sin(state.clock.elapsedTime * speed * 0.5) * 0.05
      );
    }
  });

  return (
    <Float speed={speed * 2} rotationIntensity={0.3} floatIntensity={0.5}>
      <mesh ref={ref} position={position}>
        <sphereGeometry args={[20, 32, 32]} />
        <meshStandardMaterial
          color={color}
          transparent
          opacity={0.08}
          side={THREE.DoubleSide}
          emissive={color}
          emissiveIntensity={0.3}
        />
      </mesh>
    </Float>
  );
}

// ===== AURORA ORB =====
function AuroraOrb({
  position,
  color,
  size = 1,
  pulseSpeed = 1,
}: {
  position: [number, number, number];
  color: string;
  size?: number;
  pulseSpeed?: number;
}) {
  const ref = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (ref.current) {
      const scale = size + Math.sin(state.clock.elapsedTime * pulseSpeed) * 0.1;
      ref.current.scale.setScalar(scale);
      ref.current.position.y =
        position[1] + Math.sin(state.clock.elapsedTime * pulseSpeed * 0.5) * 0.5;
    }
  });

  return (
    <mesh ref={ref} position={position}>
      <sphereGeometry args={[1, 32, 32]} />
      <meshStandardMaterial
        color={color}
        transparent
        opacity={0.4}
        emissive={color}
        emissiveIntensity={1}
        roughness={0.1}
        metalness={0.8}
      />
    </mesh>
  );
}

// ===== COSMIC DUST PARTICLES =====
function CosmicDust() {
  const count = 500;
  
  const { positions, colors } = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const col = new Float32Array(count * 3);

    const colorPalette = [
      new THREE.Color("#a855f7"),
      new THREE.Color("#06b6d4"),
      new THREE.Color("#ec4899"),
      new THREE.Color("#3b82f6"),
      new THREE.Color("#fbbf24"),
    ];

    // Seeded pseudo-random for deterministic particles
    let seed = 42;
    const rand = () => {
      seed = (seed * 16807 + 0) % 2147483647;
      return (seed - 1) / 2147483646;
    };

    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      pos[i3] = (rand() - 0.5) * 200;
      pos[i3 + 1] = (rand() - 0.5) * 200;
      pos[i3 + 2] = (rand() - 0.5) * 200;

      const color = colorPalette[Math.floor(rand() * colorPalette.length)];
      col[i3] = color.r;
      col[i3 + 1] = color.g;
      col[i3 + 2] = color.b;
    }

    return { positions: pos, colors: col };
  }, []);

  const ref = useRef<THREE.Points>(null);

  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.y = state.clock.elapsedTime * 0.03;
      ref.current.rotation.z = state.clock.elapsedTime * 0.01;
    }
  });

  const geometry = useMemo(() => {
    const geo = new THREE.BufferGeometry();
    geo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    geo.setAttribute("color", new THREE.BufferAttribute(colors, 3));
    return geo;
  }, [positions, colors]);

  return (
    <points ref={ref} geometry={geometry}>
      <pointsMaterial
        size={0.5}
        vertexColors
        transparent
        opacity={0.6}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

// ===== ORBITING RINGS =====
function OrbitingRings() {
  const ref = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.1) * 0.3;
      ref.current.rotation.z = Math.cos(state.clock.elapsedTime * 0.08) * 0.2;
    }
  });

  return (
    <group ref={ref}>
      {[1, 2, 3].map((i) => (
        <mesh key={i} rotation={[Math.PI / 2 + i * 0.3, 0, i * 0.5]}>
          <torusGeometry args={[30 + i * 10, 0.1, 16, 100]} />
          <meshStandardMaterial
            color={i === 1 ? "#a855f7" : i === 2 ? "#06b6d4" : "#ec4899"}
            transparent
            opacity={0.15}
            emissive={i === 1 ? "#a855f7" : i === 2 ? "#06b6d4" : "#ec4899"}
            emissiveIntensity={0.5}
          />
        </mesh>
      ))}
    </group>
  );
}

// ===== MAIN SCENE =====
function Scene() {
  return (
    <>
      {/* Lighting */}
      <ambientLight intensity={0.2} />
      <pointLight position={[10, 10, 10]} intensity={0.5} color="#a855f7" />
      <pointLight position={[-10, -5, -10]} intensity={0.3} color="#06b6d4" />
      <pointLight position={[0, 10, -10]} intensity={0.3} color="#ec4899" />

      {/* Background elements */}
      <StarField />
      <CosmicDust />
      <OrbitingRings />

      {/* Nebula clouds */}
      <NebulaCloud position={[-30, 10, -40]} color="#a855f7" scale={1.5} speed={0.15} />
      <NebulaCloud position={[30, -10, -30]} color="#06b6d4" scale={1.2} speed={0.2} />
      <NebulaCloud position={[0, 20, -50]} color="#ec4899" scale={1.8} speed={0.12} />

      {/* Aurora orbs */}
      <AuroraOrb position={[-15, 5, -20]} color="#a855f7" size={0.8} pulseSpeed={0.8} />
      <AuroraOrb position={[15, -3, -25]} color="#06b6d4" size={0.6} pulseSpeed={1.2} />
      <AuroraOrb position={[0, -8, -15]} color="#ec4899" size={0.7} pulseSpeed={1} />
    </>
  );
}

// ===== EXPORTED COMPONENT =====
export function CosmicScene() {
  return (
    <div className="fixed inset-0 -z-10">
      {/* CSS Gradient Fallback */}
      <div className="absolute inset-0 cosmic-bg" />

      {/* 3D Canvas */}
      <Canvas
        camera={{ position: [0, 0, 30], fov: 60 }}
        dpr={[1, 1.5]}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: "high-performance",
        }}
        style={{ background: "transparent" }}
      >
        <Suspense fallback={null}>
          <Scene />
        </Suspense>
      </Canvas>

      {/* Gradient Overlay */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at center, transparent 0%, rgba(3,0,20,0.4) 70%, rgba(3,0,20,0.8) 100%)",
        }}
      />
    </div>
  );
}
