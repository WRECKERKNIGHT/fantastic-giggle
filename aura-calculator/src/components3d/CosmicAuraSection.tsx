"use client";

import { useRef, type ElementRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, MeshDistortMaterial } from "@react-three/drei";
import {
  motion,
  useScroll,
  useTransform,
  type MotionValue,
} from "framer-motion";
import * as THREE from "three";

const ORBIT_DOTS = Array.from({ length: 12 }, (_, i) => {
  const angle = (i / 12) * Math.PI * 2;
  return { angle, x: Math.cos(angle) * 2.35, z: Math.sin(angle) * 2.35 };
});

function AuraCore({
  rotY,
  rotX,
  scale,
}: {
  rotY: MotionValue<number>;
  rotX: MotionValue<number>;
  scale: MotionValue<number>;
}) {
  const group = useRef<THREE.Group>(null);
  const orbit = useRef<THREE.Group>(null);
  const material = useRef<ElementRef<typeof MeshDistortMaterial> | null>(null);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    const s = scale.get();

    if (group.current) {
      group.current.rotation.y = rotY.get() + t * 0.08;
      group.current.rotation.x = rotX.get() + Math.sin(t * 0.4) * 0.12;
      group.current.scale.setScalar(s);
    }
    if (orbit.current) {
      orbit.current.rotation.y = -t * 0.25;
    }
    if (material.current) {
      material.current.distort = 0.22 + Math.sin(t * 1.3) * 0.1;
    }
  });

  return (
    <group ref={group}>
      {/* Molten ink core */}
      <mesh>
        <sphereGeometry args={[1.05, 64, 64]} />
        <Float speed={1.4} rotationIntensity={0.2} floatIntensity={0.6}>
          <MeshDistortMaterial
            ref={material}
            color="#2a251d"
            roughness={0.12}
            metalness={0.55}
          />
        </Float>
      </mesh>

      {/* Wireframe aura cage */}
      <mesh scale={1.65}>
        <icosahedronGeometry args={[1, 1]} />
        <meshBasicMaterial color="#14110c" wireframe transparent opacity={0.35} />
      </mesh>

      {/* Outer scribble ring */}
      <mesh rotation={[Math.PI / 2.4, 0, 0]}>
        <torusGeometry args={[2.35, 0.014, 8, 128]} />
        <meshBasicMaterial color="#14110c" transparent opacity={0.5} />
      </mesh>
      <mesh rotation={[-Math.PI / 2.4, 0, 0]}>
        <torusGeometry args={[2.75, 0.01, 8, 128]} />
        <meshBasicMaterial color="#14110c" transparent opacity={0.25} />
      </mesh>

      {/* Orbiting aura motes */}
      <group ref={orbit} rotation={[Math.PI / 2.4, 0, 0]}>
        {ORBIT_DOTS.map((dot, i) => (
          <mesh key={i} position={[dot.x, 0, dot.z]}>
            <sphereGeometry args={[0.045, 8, 8]} />
            <meshBasicMaterial color="#14110c" />
          </mesh>
        ))}
      </group>
    </group>
  );
}

export default function CosmicAuraSection() {
  const ref = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const rotY = useTransform(scrollYProgress, [0, 1], [0, Math.PI * 2.5]);
  const rotX = useTransform(scrollYProgress, [0, 1], [0.5, -0.5]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.85, 1.05, 0.85]);
  const copyOpacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

  return (
    <section
      ref={ref}
      className="relative h-[180vh] overflow-hidden"
      aria-label="Your aura in three dimensions"
    >
      <div className="sticky top-0 h-screen overflow-hidden">
        {/* Paper backdrop */}
        <div className="absolute inset-0 bg-[var(--paper)]" />
        <div className="halftone absolute inset-0 opacity-30" />
        <div className="crosshatch-soft absolute inset-0" />

        {/* 3D canvas */}
        <div className="absolute inset-0">
          <Canvas dpr={[1, 1.5]} camera={{ position: [0, 0, 6], fov: 50 }}>
            <ambientLight intensity={1.4} />
            <pointLight position={[5, 5, 5]} intensity={1.2} />
            <directionalLight position={[-4, -2, 3]} intensity={0.8} />
            <AuraCore rotY={rotY} rotX={rotX} scale={scale} />
          </Canvas>
        </div>

        {/* Scroll-driven copy */}
        <motion.div
          style={{ opacity: copyOpacity }}
          className="pointer-events-none absolute inset-0 z-10 flex flex-col items-center justify-center"
        >
          <p className="mb-4 text-center font-[var(--font-mono)] text-xs font-bold tracking-[0.4em] text-[var(--ink-muted)] uppercase">
            Reconstructed from your responses
          </p>
          <h2 className="text-center font-[var(--font-display)] text-6xl font-black uppercase leading-[0.9] tracking-tight text-[var(--ink)] sm:text-8xl">
            Your aura,
            <br />
            <span className="sketch-underline block">rendered.</span>
          </h2>
        </motion.div>

        {/* Scroll hint */}
        <div className="absolute inset-x-0 bottom-8 z-10 flex justify-center">
          <span className="stamp">KEEP SCROLLING</span>
        </div>
      </div>
    </section>
  );
}
