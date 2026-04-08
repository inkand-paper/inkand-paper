"use client";

import React, { useRef } from "react";
import { motion, useDragControls } from "framer-motion";

export const skillThemes: Record<string, string> = {
  JavaScript: "#f7df1e",
  TypeScript: "#3178c6",
  React: "#61dafb",
  "Next.js": "#ffffff",
  "Node.js": "#339933",
  Python: "#3776ab",
  GSAP: "#88ce02",
  "Framer Motion": "#ff0055",
  "Tailwind CSS": "#06b6d4",
  "AI Integration": "#8b5cf6",
};

interface DraggableNodeProps {
  id: number;
  name: string;
  type: "skill" | "project";
  level?: string;
  isUnlocked: boolean;
  onUnlock: (id: number, type: "skill" | "project") => void;
  containerRef: React.RefObject<HTMLDivElement | null>;
  coreRef: React.RefObject<HTMLDivElement | null>;
  initialPosition: { x: number; y: number };
}

export default function DraggableNode({
  id,
  name,
  type,
  level,
  isUnlocked,
  onUnlock,
  containerRef,
  coreRef,
  initialPosition,
}: DraggableNodeProps) {
  const themeColor = skillThemes[name] || (type === "project" ? "#a78bfa" : "#ffffff");
  const nodeRef = useRef<HTMLDivElement>(null);

  const handleDragEnd = (event: any, info: any) => {
    if (isUnlocked) return;

    if (nodeRef.current && coreRef.current) {
      const nodeRect = nodeRef.current.getBoundingClientRect();
      const coreRect = coreRef.current.getBoundingClientRect();

      // Simple collision detection (center of node inside core)
      const nodeCenterX = nodeRect.left + nodeRect.width / 2;
      const nodeCenterY = nodeRect.top + nodeRect.height / 2;

      const coreCenterX = coreRect.left + coreRect.width / 2;
      const coreCenterY = coreRect.top + coreRect.height / 2;

      // Distance between centers
      const dist = Math.sqrt(
        Math.pow(nodeCenterX - coreCenterX, 2) + Math.pow(nodeCenterY - coreCenterY, 2)
      );

      // If dropped within 120px radius of the core
      if (dist < 120) {
        onUnlock(id, type);
      }
    }
  };

  return (
    <motion.div
      ref={nodeRef}
      drag={!isUnlocked} // Only draggable if not yet unlocked/attached
      dragConstraints={containerRef}
      dragElastic={0.2}
      dragMomentum={false}
      onDragEnd={handleDragEnd}
      initial={{ x: initialPosition.x, y: initialPosition.y, opacity: 0, scale: 0 }}
      animate={{
        x: isUnlocked ? 0 : initialPosition.x, // Pulls to center (0,0 relative to its layout) if we manage positioning differently, but wait, drag changes x/y!
        y: isUnlocked ? 0 : initialPosition.y,
        opacity: 1,
        scale: isUnlocked ? 0.8 : 1, // Shrink slightly when attached
      }}
      transition={{ type: "spring", stiffness: 200, damping: 20 }}
      whileHover={!isUnlocked ? { scale: 1.1, zIndex: 50, boxShadow: `0 0 30px ${themeColor}60` } : {}}
      whileDrag={{ scale: 1.2, zIndex: 100, cursor: "grabbing" }}
      style={{
        position: "absolute",
        padding: "16px 24px",
        borderRadius: "20px",
        border: `1px solid ${isUnlocked ? themeColor : "rgba(255,255,255,0.1)"}`,
        backgroundColor: isUnlocked ? `${themeColor}20` : "rgba(20, 20, 20, 0.6)",
        backdropFilter: "blur(10px)",
        cursor: isUnlocked ? "default" : "grab",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        boxShadow: isUnlocked ? `0 0 20px ${themeColor}40` : "0 8px 32px rgba(0,0,0,0.5)",
        zIndex: isUnlocked ? 5 : 10,
        pointerEvents: "auto",
      }}
      data-cursor-color={themeColor}
    >
      <div style={{
        width: "6px",
        height: "6px",
        borderRadius: "50%",
        backgroundColor: isUnlocked ? themeColor : "rgba(255,255,255,0.2)",
        marginBottom: "8px",
        boxShadow: isUnlocked ? `0 0 10px ${themeColor}` : "none",
      }} />
      <span style={{
        color: isUnlocked ? "#ffffff" : "rgba(255,255,255,0.6)",
        fontWeight: isUnlocked ? 700 : 500,
        fontSize: "14px",
        letterSpacing: "0.02em",
      }}>
        {isUnlocked ? "DECRYPTED" : name}
      </span>
      {isUnlocked && level && (
        <span style={{
          fontSize: "9px",
          textTransform: "uppercase",
          letterSpacing: "0.2em",
          color: themeColor,
          marginTop: "4px"
        }}>
          {level}
        </span>
      )}
    </motion.div>
  );
}
