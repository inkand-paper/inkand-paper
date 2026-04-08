"use client";

import React, { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";

const GLYPHS = "0123456789ABCDEF!@#$%^&*<>?/|\\{}[]~`";
const DEBRIS_COUNT = 40;

interface Debris {
  id: number;
  char: string;
  x: number;
  y: number;
  size: number;
  duration: number;
  delay: number;
}

export default function BackgroundDynamics() {
  const [debris, setDebris] = useState<Debris[]>([]);
  const [mousePos, setMousePos] = useState({ x: 50, y: 50 });
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({
        x: (e.clientX / window.innerWidth) * 100,
        y: (e.clientY / window.innerHeight) * 100,
      });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  useEffect(() => {
    const newDebris = Array.from({ length: DEBRIS_COUNT }).map((_, i) => ({
      id: i,
      char: GLYPHS[Math.floor(Math.random() * GLYPHS.length)],
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 14 + 10, // Slightly larger
      duration: Math.random() * 20 + 20,
      delay: Math.random() * -20,
    }));
    setDebris(newDebris);
  }, []);

  return (
    <div
      ref={containerRef}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 1,
        pointerEvents: "none",
        overflow: "hidden",
        opacity: 1, // Full opacity for container, internal elements control visibility
      }}
    >
      {/* Subtle Scanline - Brighter */}
      <motion.div
        animate={{
          y: ["-100%", "200%"],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "linear",
          repeatDelay: 1,
        }}
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          height: "2px",
          background: "linear-gradient(90deg, transparent, rgba(99, 102, 241, 0.4), transparent)",
          zIndex: 1,
        }}
      />

      {/* Grid Pattern */}
      <div 
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: `
            linear-gradient(rgba(255, 255, 255, 0.02) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255, 255, 255, 0.02) 1px, transparent 1px)
          `,
          backgroundSize: "60px 60px",
          zIndex: 0,
        }}
      />

      {/* Floating Digital Debris */}
      {debris.map((item) => {
        // Calculate distance from mouse for reactive effect
        const dx = mousePos.x - item.x;
        const dy = mousePos.y - item.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        // Debris moves slightly away from mouse if close
        const shiftX = dist < 20 ? -(dx / dist) * 5 : 0;
        const shiftY = dist < 20 ? -(dy / dist) * 5 : 0;

        return (
          <motion.div
            key={item.id}
            initial={{ opacity: 0 }}
            animate={{
              opacity: [0, 0.4, 0], // Higher opacity for visibility
              y: [`${item.y}%`, `${item.y - 10}%`],
              x: [`${item.x}%`, `${item.x + (Math.random() * 4 - 2)}%`],
              scale: dist < 15 ? 1.5 : 1, // Scale up slightly when mouse is near
            }}
            transition={{
              duration: item.duration,
              repeat: Infinity,
              delay: item.delay,
              ease: "linear",
            }}
            style={{
              position: "absolute",
              left: `calc(${item.x}% + ${shiftX}px)`,
              top: `calc(${item.y}% + ${shiftY}px)`,
              fontSize: `${item.size}px`,
              fontFamily: "var(--font-geist-mono)",
              color: "rgba(255, 255, 255, 0.6)", // Much clearer text
              userSelect: "none",
              zIndex: 0,
              transition: "transform 0.3s ease-out",
            }}
          >
            {item.char}
          </motion.div>
        );
      })}

      {/* Ambient Vignette */}
      <div 
        style={{
          position: "absolute",
          inset: 0,
          background: "radial-gradient(circle at 50% 50%, transparent 0%, rgba(8, 8, 8, 0.4) 100%)",
          zIndex: 2,
        }}
      />
    </div>
  );
}
