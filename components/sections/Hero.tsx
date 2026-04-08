"use client";

import React from "react";
import { motion } from "framer-motion";
import { useAppStore } from "@/store/useAppStore";

const Hero = () => {
  const portfolioData = useAppStore((s) => s.portfolioData);
  return (
    <section 
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "0 64px",
        position: "relative",
        overflow: "hidden",
        width: "100%",
      }}
    >
      {/* Background depth layers */}
      <div style={{ position: "absolute", inset: 0, zIndex: 0 }}>
        <div style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "800px",
          height: "800px",
          backgroundColor: "rgba(99, 102, 241, 0.04)",
          borderRadius: "50%",
          filter: "blur(150px)",
        }} />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] as any }}
        style={{ textAlign: "center", zIndex: 10 }}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.2 }}
          style={{
            marginBottom: "32px",
            display: "inline-block",
            padding: "6px 16px",
            borderRadius: "9999px",
            border: "1px solid rgba(255, 255, 255, 0.05)",
            backgroundColor: "rgba(255, 255, 255, 0.02)",
            backdropFilter: "blur(12px)",
          }}
        >
          <span style={{
            fontSize: "10px",
            textTransform: "uppercase",
            letterSpacing: "0.3em",
            color: "rgba(255, 255, 255, 0.4)",
            fontWeight: 800,
            fontStyle: "italic",
          }}>
            // Welcome to the AbirVerse
          </span>
        </motion.div>

        <motion.h1 
          className="magnetic"
          style={{
            fontSize: "clamp(64px, 12vw, 160px)",
            fontWeight: 900,
            marginBottom: "24px",
            letterSpacing: "-0.06em",
            lineHeight: 0.85,
            background: "linear-gradient(to bottom, #ffffff 30%, rgba(255, 255, 255, 0.2) 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            display: "block",
          }}
        >
          {portfolioData.about.name}
        </motion.h1>

        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 1 }}
          style={{
            fontSize: "clamp(18px, 2vw, 24px)",
            color: "rgba(255, 255, 255, 0.4)",
            fontWeight: 300,
            maxWidth: "700px",
            margin: "0 auto",
            letterSpacing: "-0.01em",
            lineHeight: 1.4,
          }}
        >
          An interactive digital environment blending <span style={{ color: "rgba(255, 255, 255, 0.8)" }}>AI intelligence</span> with 
          <span style={{ color: "rgba(255, 255, 255, 0.8)", fontStyle: "italic" }}> premium design</span>.
        </motion.p>
      </motion.div>
      
      {/* Subtle scroll indicator */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
        style={{
          position: "absolute",
          bottom: "48px",
          left: "50%",
          transform: "translateX(-50%)",
        }}
      >
        <div style={{
          width: "1px",
          height: "64px",
          background: "linear-gradient(to bottom, rgba(255, 255, 255, 0.2), transparent)",
        }} />
      </motion.div>
    </section>
  );
};

export default Hero;
