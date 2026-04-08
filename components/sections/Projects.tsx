"use client";

import React from "react";
import { motion } from "framer-motion";
import { useAppStore } from "@/store/useAppStore";
import { ExternalLink } from "lucide-react";
import { Github } from "@/components/icons/BrandIcons";

const Projects = () => {
  const portfolioData = useAppStore((s) => s.portfolioData);
  return (
    <section 
      style={{
        padding: "160px 64px",
        maxWidth: "1400px",
        margin: "0 auto",
        width: "100%",
      }}
    >
      <h2 style={{
        fontSize: "11px",
        textTransform: "uppercase",
        letterSpacing: "0.4em",
        color: "rgba(255, 255, 255, 0.2)",
        fontWeight: 900,
        marginBottom: "80px",
        fontStyle: "italic",
      }}>
        // Works.prd
      </h2>
      
      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(450px, 1fr))",
        gap: "48px",
      }}>
        {portfolioData.projects.filter(p => !p.hidden).map((project, index) => (
          <motion.div
            key={project.id}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] as any }}
            style={{
              position: "relative",
              height: "500px",
              borderRadius: "40px",
              overflow: "hidden",
              border: "1px solid rgba(255, 255, 255, 0.05)",
              backgroundColor: "#0a0a0a",
              boxShadow: "0 40px 80px -40px rgba(0,0,0,0.5)",
            }}
          >
            {/* Background design */}
            <div style={{ position: "absolute", inset: 0, zIndex: 0, overflow: "hidden" }}>
               <div style={{
                 position: "absolute",
                 inset: 0,
                 backgroundImage: 'radial-gradient(circle at 2px 2px, rgba(255,255,255,0.03) 1px, transparent 0)',
                 backgroundSize: '32px 32px',
                 opacity: 0.4,
               }} />
               <div style={{
                 position: "absolute",
                 top: "-50%",
                 right: "-50%",
                 width: "100%",
                 height: "100%",
                 backgroundColor: "rgba(99, 102, 241, 0.05)",
                 borderRadius: "50%",
                 filter: "blur(120px)",
               }} />
            </div>

            <div style={{
              position: "absolute",
              inset: 0,
              padding: "48px",
              display: "flex",
              flexDirection: "column",
              justifyContent: "end",
              background: "linear-gradient(to top, #080808 0%, rgba(8, 8, 8, 0.6) 50%, transparent 100%)",
              zIndex: 10,
            }}>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "8px", marginBottom: "24px" }}>
                {project.tech.map(t => (
                  <span key={t} style={{
                    fontSize: "9px",
                    padding: "4px 12px",
                    borderRadius: "99px",
                    border: "1px solid rgba(255, 255, 255, 0.05)",
                    backgroundColor: "rgba(255, 255, 255, 0.03)",
                    color: "rgba(255, 255, 255, 0.4)",
                    letterSpacing: "0.1em",
                    fontWeight: 900,
                    textTransform: "uppercase",
                  }}>
                    {t}
                  </span>
                ))}
              </div>
              <h3 style={{
                fontSize: "40px",
                fontWeight: 900,
                color: "#ffffff",
                marginBottom: "16px",
                letterSpacing: "-0.04em",
                lineHeight: 1,
              }}>{project.title}</h3>
              <p style={{
                fontSize: "18px",
                color: "rgba(255, 255, 255, 0.3)",
                marginBottom: "32px",
                fontWeight: 300,
                letterSpacing: "-0.01em",
                lineHeight: 1.4,
                maxWidth: "500px",
              }}>{project.description}</p>
              
              <div style={{ display: "flex", gap: "16px" }}>
                <motion.a 
                  href={project.link}
                  target="_blank"
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "12px",
                    padding: "12px 24px",
                    backgroundColor: "#ffffff",
                    color: "#000000",
                    borderRadius: "99px",
                    fontSize: "12px",
                    fontWeight: 900,
                    textTransform: "uppercase",
                    letterSpacing: "0.1em",
                    textDecoration: "none",
                  }}
                >
                  <ExternalLink className="w-4 h-4" /> Live Site
                </motion.a>
                <motion.a 
                  href="#"
                  target="_blank"
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "12px",
                    padding: "12px 24px",
                    border: "1px solid rgba(255, 255, 255, 0.1)",
                    backgroundColor: "transparent",
                    color: "#ffffff",
                    borderRadius: "99px",
                    fontSize: "12px",
                    fontWeight: 900,
                    textTransform: "uppercase",
                    letterSpacing: "0.1em",
                    textDecoration: "none",
                  }}
                >
                  <Github className="w-4 h-4" /> Source
                </motion.a>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default Projects;
