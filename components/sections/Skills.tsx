"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useAppStore } from "@/store/useAppStore";

const skillThemes: Record<string, string> = {
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

const Skills = () => {
  const portfolioData = useAppStore((s) => s.portfolioData);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <section 
      style={{
        padding: "160px 64px",
        maxWidth: "1400px",
        margin: "0 auto",
        width: "100%",
      }}
    >
      <h2 
        style={{
          fontSize: "11px",
          textTransform: "uppercase",
          letterSpacing: "0.4em",
          color: "rgba(255, 255, 255, 0.2)",
          fontWeight: 900,
          marginBottom: "80px",
          fontStyle: "italic",
        }}
      >
        // Capabilities.sys
      </h2>
      
      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))",
        gap: "24px",
      }}>
        {portfolioData.skills.map((skill, index) => {
          const themeColor = skillThemes[skill.name] || "#ffffff";
          return (
            <motion.div
              key={skill.id}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.03, ease: [0.16, 1, 0.3, 1] as any }}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
              whileHover={{ 
                y: -12, 
                backgroundColor: `${themeColor}10`,
                borderColor: `${themeColor}40`,
                boxShadow: `0 20px 40px -20px ${themeColor}30`,
              }}
              data-cursor-color={themeColor}
              style={{
                padding: "40px 24px",
                position: "relative",
                borderRadius: "24px",
                border: "1px solid rgba(255, 255, 255, 0.05)",
                backgroundColor: "rgba(255, 255, 255, 0.03)",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                gap: "16px",
                transition: "all 0.5s cubic-bezier(0.16, 1, 0.3, 1)",
                backdropFilter: "blur(20px)",
                cursor: "pointer",
              }}
            >
              <div style={{ 
                width: "8px", 
                height: "8px", 
                borderRadius: "50%", 
                backgroundColor: `${themeColor}30`,
                boxShadow: `0 0 10px ${themeColor}40`
              }} />
              <h4 style={{ 
                color: "rgba(255, 255, 255, 0.9)", 
                fontWeight: 700, 
                letterSpacing: "-0.02em", 
                fontSize: "16px",
                margin: 0,
              }}>{skill.name}</h4>
              <span style={{
                fontSize: "9px",
                textTransform: "uppercase",
                fontWeight: 900,
                letterSpacing: "0.2em",
                color: "rgba(255, 255, 255, 0.1)",
                fontStyle: "italic",
              }}>
                {skill.level}
              </span>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
};

export default Skills;
