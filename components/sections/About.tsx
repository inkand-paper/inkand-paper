"use client";

import React from "react";
import { motion } from "framer-motion";
import { useAppStore } from "@/store/useAppStore";

const About = () => {
  const portfolioData = useAppStore((s) => s.portfolioData);
  return (
    <section 
      style={{
        padding: "160px 64px",
        maxWidth: "1200px",
        margin: "0 auto",
        width: "100%",
      }}
    >
      <motion.div
        initial={{ opacity: 0, x: -30 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] as any }}
      >
        <h2 style={{
          fontSize: "11px",
          textTransform: "uppercase",
          letterSpacing: "0.4em",
          color: "rgba(255, 255, 255, 0.2)",
          fontWeight: 900,
          marginBottom: "64px",
          fontStyle: "italic",
        }}>
          // Profile.exe
        </h2>
        
        <p style={{
          fontSize: "clamp(32px, 5vw, 64px)",
          fontWeight: 500,
          lineHeight: 1.1,
          color: "rgba(255, 255, 255, 0.9)",
          letterSpacing: "-0.04em",
          marginBottom: "80px",
        }}>
          {portfolioData.about.bio.split(". ").map((sentence, i) => (
            <span key={i} style={{ display: "block", marginBottom: "24px" }}>
               {sentence}{i === 0 ? "." : ""}
            </span>
          ))}
        </p>
        
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
          gap: "48px",
          borderTop: "1px solid rgba(255, 255, 255, 0.05)",
          paddingTop: "64px",
        }}>
            <div>
              <h4 style={{ color: "rgba(255, 255, 255, 0.1)", fontSize: "10px", textTransform: "uppercase", fontWeight: 900, marginBottom: "16px", letterSpacing: "0.2em" }}>Location</h4>
              <p style={{ fontSize: "20px", color: "rgba(255, 255, 255, 0.6)", fontWeight: 300, letterSpacing: "-0.01em" }}>{portfolioData.about.location}</p>
            </div>
            <div>
              <h4 style={{ color: "rgba(255, 255, 255, 0.1)", fontSize: "10px", textTransform: "uppercase", fontWeight: 900, marginBottom: "16px", letterSpacing: "0.2em" }}>Experience</h4>
              <p style={{ fontSize: "20px", color: "rgba(255, 255, 255, 0.6)", fontWeight: 300, letterSpacing: "-0.01em" }}>Crafting digital experiences since 2021.</p>
            </div>
            <div>
              <h4 style={{ color: "rgba(255, 255, 255, 0.1)", fontSize: "10px", textTransform: "uppercase", fontWeight: 900, marginBottom: "16px", letterSpacing: "0.2em" }}>Philosophy</h4>
              <p style={{ fontSize: "20px", color: "rgba(255, 255, 255, 0.6)", fontWeight: 300, letterSpacing: "-0.01em" }}>Elegance in logic, beauty in execution.</p>
            </div>
        </div>
      </motion.div>
    </section>
  );
};

export default About;
