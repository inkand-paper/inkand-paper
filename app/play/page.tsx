"use client";

import React, { useState, useEffect } from "react";
import BuilderCanvas from "@/components/play/BuilderCanvas";
import { motion } from "framer-motion";
import { useAppStore } from "@/store/useAppStore";

export default function PlayPage() {
  const setMode = useAppStore(state => state.setMode);
  const [bootSequenceComplete, setBootSequenceComplete] = useState(false);
  const [logs, setLogs] = useState<string[]>([]);
  
  const bootLogs = [
    "Initiating Abir.exe Protocol...",
    "Bypassing standard portfolio constraints...",
    "Finding raw floating data nodes...",
    "Decrypting core identity...",
    "Warning: Unstructured data detected.",
    "Loading Builder Canvas v1.0",
    "System ready. User interaction required."
  ];

  useEffect(() => {
    // Explicitly update global state so AI knows we are in play mode
    setMode("play");

    let currentLog = 0;
    const interval = setInterval(() => {
      if (currentLog < bootLogs.length) {
        setLogs(prev => [...prev, bootLogs[currentLog]]);
        currentLog++;
      } else {
        clearInterval(interval);
        setTimeout(() => setBootSequenceComplete(true), 800); // Small pause before fading out
      }
    }, 300);

    return () => clearInterval(interval);
  }, [setMode]);

  return (
    <main style={{
      width: "100%",
      height: "100vh",
      backgroundColor: "#050505",
      overflow: "hidden",
      position: "relative",
    }}>
      {!bootSequenceComplete ? (
        <div style={{
          position: "absolute",
          inset: 0,
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-end",
          padding: "40px",
          fontFamily: "var(--font-geist-mono)",
          color: "#4ade80",
          zIndex: 50,
          backgroundColor: "#050505",
        }}>
          {logs.map((log, i) => (
            <motion.p
              key={i}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              style={{
                fontSize: "14px",
                marginBottom: "8px",
                textShadow: "0 0 8px rgba(74, 222, 128, 0.4)",
              }}
            >
              <span style={{ opacity: 0.5, marginRight: "8px" }}>{'>'}</span> {log}
            </motion.p>
          ))}
          <div style={{ height: "40px" }} /> {/* Bottom padding */}
        </div>
      ) : (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
          style={{ width: "100%", height: "100%" }}
        >
          <BuilderCanvas />
        </motion.div>
      )}
    </main>
  );
}