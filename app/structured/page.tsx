"use client";

import { useEffect } from "react";
import { useAppStore } from "@/store/useAppStore";
import { motion } from "framer-motion";

import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import Skills from "@/components/sections/Skills";
import Projects from "@/components/sections/Projects";
import Contact from "@/components/sections/Contact";
import AbirAI from "@/components/AbirAI";
import BackgroundDynamics from "@/components/BackgroundDynamics";

const fadeIn = {
  initial: { opacity: 0, filter: "blur(10px)" },
  animate: { opacity: 1, filter: "blur(0px)" },
  transition: { duration: 1.2, ease: [0.16, 1, 0.3, 1] },
};

export default function StructuredPage() {
  const setMode = useAppStore((s) => s.setMode);

  useEffect(() => {
    setMode("structured");
  }, [setMode]);

  return (
    <main
      style={{
        minHeight: "100vh",
        backgroundColor: "#080808",
        position: "relative",
        overflowX: "hidden",
        width: "100%",
      }}
    >
      <BackgroundDynamics />
      {/* Ambient gradient wash */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "radial-gradient(1000px 700px at 80% -10%, rgba(99,102,241,0.08), transparent 50%), radial-gradient(800px 600px at 10% 20%, rgba(244,114,182,0.03), transparent 50%)",
          pointerEvents: "none",
          zIndex: 0,
        }}
      />

      <motion.div 
        {...(fadeIn as any)} 
        style={{ 
          position: "relative", 
          zIndex: 10,
          width: "100%",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Contact />
      </motion.div>

      <AbirAI />
    </main>
  );
}