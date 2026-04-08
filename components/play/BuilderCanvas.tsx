"use client";

import React, { useRef, useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useAppStore } from "@/store/useAppStore";
import DraggableNode from "./DraggableNode";

export default function BuilderCanvas() {
  const containerRef = useRef<HTMLDivElement>(null);
  const coreRef = useRef<HTMLDivElement>(null);
  const { portfolioData, unlockedSkills, unlockSkill, unlockedProjects, unlockProject, hiddenUnlocked, unlockHidden, addAiMessage, setMode } = useAppStore();
  const [mounted, setMounted] = useState(false);
  const [nodes, setNodes] = useState<any[]>([]);

  useEffect(() => {
    setMounted(true);
    // Spread all node types: visible projects + skills + experience around the core
    const allItems = [
      ...portfolioData.skills.map((s, i) => ({ ...s, nodeType: "skill" as const })),
      // Only show visible projects + phantom if hiddenUnlocked
      ...portfolioData.projects
        .filter((p) => !p.hidden || hiddenUnlocked)
        .map((p) => ({ id: p.id + 1000, name: p.title, level: "PROJECT", nodeType: "project" as const })),
      ...portfolioData.experience.map((e, i) => ({ id: e.id + 2000, name: e.role, level: e.company, nodeType: "experience" as const })),
    ];

    const generatedNodes = allItems.map((item, index) => {
      const angle = (index / allItems.length) * Math.PI * 2;
      const radius = Math.random() * 150 + 240;
      return {
        ...item,
        x: Math.cos(angle) * radius,
        y: Math.sin(angle) * radius,
      };
    });
    setNodes(generatedNodes);
  }, [portfolioData, hiddenUnlocked]);

  const handleUnlock = (id: number, nodeType: string) => {
    if (nodeType === "skill" && !unlockedSkills.includes(id)) {
      unlockSkill(id);
      const skillName = portfolioData.skills.find((s) => s.id === id)?.name;
      addAiMessage({ role: "ai", text: `Data block attached. ${skillName} integrated into core memory.` });
    } else if (nodeType === "project" && !unlockedProjects.includes(id - 1000)) {
      unlockProject(id - 1000);
      const proj = portfolioData.projects.find((p) => p.id === id - 1000);
      if (proj?.hidden) {
        unlockHidden();
        addAiMessage({ role: "ai", text: "You found it. Project Phantom is real. Interesting." });
      } else {
        addAiMessage({ role: "ai", text: `${proj?.title} decrypted and logged. Impressive execution.` });
      }
    } else if (nodeType === "experience") {
      addAiMessage({ role: "ai", text: `Experience node attached. History integrated.` });
    }
  };

  if (!mounted) return null;

  const totalUnlocks = unlockedSkills.length;
  const progress = totalUnlocks / portfolioData.skills.length;

  return (
    <div
      ref={containerRef}
      style={{
        position: "relative",
        width: "100%",
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
        backgroundColor: "#050505",
      }}
    >
      {/* Background grid */}
      <div 
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: `
            linear-gradient(rgba(255, 255, 255, 0.03) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255, 255, 255, 0.03) 1px, transparent 1px)
          `,
          backgroundSize: "40px 40px",
          maskImage: "radial-gradient(circle at center, black 20%, transparent 80%)",
          WebkitMaskImage: "radial-gradient(circle at center, black 20%, transparent 80%)",
          zIndex: 0,
        }}
      />

      {/* The Core (Abir.exe) */}
      <motion.div
        ref={coreRef}
        style={{
          position: "relative",
          width: "180px",
          height: "180px",
          borderRadius: "50%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          zIndex: 20,
        }}
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1, ease: "easeOut", delay: 2.5 }}
      >
        {/* Core glow changes based on progress */}
        <motion.div
          animate={{
            boxShadow: `0 0 ${40 + progress * 100}px ${20 + progress * 50}px rgba(99, 102, 241, ${0.1 + progress * 0.3})`,
            rotate: 360,
          }}
          transition={{ rotate: { duration: 20, repeat: Infinity, ease: "linear" }, boxShadow: { duration: 1 } }}
          style={{
            position: "absolute",
            inset: "-20px",
            borderRadius: "50%",
            border: "1px dashed rgba(255,255,255,0.2)",
            zIndex: 0,
          }}
        />
        
        <div style={{
          position: "relative",
          zIndex: 2,
          padding: "30px",
          borderRadius: "50%",
          background: "linear-gradient(135deg, #18181b 0%, #09090b 100%)",
          border: "1px solid rgba(255,255,255,0.1)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          boxShadow: "inset 0 0 20px rgba(0,0,0,0.8)",
        }}>
          <span style={{ fontSize: "10px", color: "#6366f1", letterSpacing: "0.2em", marginBottom: "4px" }}>CORE</span>
          <span style={{ color: "white", fontWeight: 800, fontSize: "20px" }}>Abir.exe</span>
          <span style={{ fontSize: "10px", color: "rgba(255,255,255,0.4)", marginTop: "8px" }}>
            {Math.floor((unlockedSkills.length / portfolioData.skills.length) * 100)}% INTEGRATED
          </span>
        </div>
      </motion.div>

      {/* Draggable Nodes in their own layer relative to center (0,0) */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 3, duration: 1 }}
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          width: 0,
          height: 0,
          zIndex: 30,
        }}
      >
        {nodes.map((node) => {
          const isSkillUnlocked = node.nodeType === "skill" && unlockedSkills.includes(node.id);
          const isProjectUnlocked = node.nodeType === "project" && unlockedProjects.includes(node.id - 1000);
          const isUnlocked = isSkillUnlocked || isProjectUnlocked;
          return (
            <DraggableNode
              key={`${node.nodeType}-${node.id}`}
              id={node.id}
              name={node.name}
              type={node.nodeType === "skill" ? "skill" : "project"}
              level={node.level}
              isUnlocked={isUnlocked}
              onUnlock={(id, _) => handleUnlock(id, node.nodeType)}
              containerRef={containerRef}
              coreRef={coreRef}
              initialPosition={{ x: node.x, y: node.y }}
            />
          );
        })}
      </motion.div>
      
      {/* HUD Instructions */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 4 }}
        style={{
          position: "absolute",
          bottom: "60px",
          left: "50%",
          transform: "translateX(-50%)",
          color: "rgba(255,255,255,0.4)",
          fontFamily: "var(--font-geist-mono)",
          fontSize: "12px",
          textAlign: "center",
          pointerEvents: "none",
        }}
      >
        [ DRAG UNKNOWN DATA BLOCKS TO CORE ]
      </motion.div>
      
      {/* Exit Button */}
      <button
        onClick={() => setMode("structured")}
        style={{
          position: "absolute",
          top: "40px",
          left: "40px",
          color: "rgba(255,255,255,0.6)",
          fontFamily: "var(--font-geist-mono)",
          fontSize: "12px",
          background: "transparent",
          border: "1px solid rgba(255,255,255,0.2)",
          padding: "8px 16px",
          borderRadius: "8px",
          cursor: "pointer",
          zIndex: 100,
          transition: "all 0.2s",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.color = "white";
          e.currentTarget.style.backgroundColor = "rgba(255,255,255,0.1)";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.color = "rgba(255,255,255,0.6)";
          e.currentTarget.style.backgroundColor = "transparent";
        }}
      >
        {"< RETURN TO STRUCTURE"}
      </button>
    </div>
  );
}
