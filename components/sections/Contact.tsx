"use client";

import React from "react";
import { motion } from "framer-motion";
import { Mail, ArrowRight } from "lucide-react";
import { Github, Linkedin, Twitter } from "@/components/icons/BrandIcons";
import { useAppStore } from "@/store/useAppStore";

const Contact = () => {
  const portfolioData = useAppStore((s) => s.portfolioData);
  return (
    <section 
      style={{
        padding: "240px 64px 160px",
        maxWidth: "1200px",
        margin: "0 auto",
        textAlign: "center",
        position: "relative",
        overflow: "hidden",
        width: "100%",
      }}
    >
      {/* Background accent */}
      <div style={{
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        width: "600px",
        height: "600px",
        backgroundColor: "rgba(99, 102, 241, 0.05)",
        borderRadius: "50%",
        filter: "blur(120px)",
        pointerEvents: "none",
        zIndex: 0,
      }} />

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] as any }}
        style={{ position: "relative", zIndex: 10 }}
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
          // Connection.api
        </h2>
        <h3 style={{
          fontSize: "clamp(48px, 8vw, 110px)",
          fontWeight: 900,
          marginBottom: "80px",
          lineHeight: 0.9,
          color: "#ffffff",
          letterSpacing: "-0.04em",
        }}>
          Ready to build the <span style={{ color: "#818cf8" }}>future?</span>
        </h3>
        
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "64px" }}>
           <motion.a
            href={`mailto:${portfolioData.about.email}`}
            whileHover={{ scale: 1.05, y: -5 }}
            whileTap={{ scale: 0.95 }}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "24px",
              padding: "24px 64px",
              borderRadius: "9999px",
              backgroundColor: "#ffffff",
              color: "#000000",
              fontWeight: 900,
              fontSize: "24px",
              textDecoration: "none",
              boxShadow: "0 20px 40px -10px rgba(255,255,255,0.3)",
              transition: "all 0.5s cubic-bezier(0.16, 1, 0.3, 1)",
            }}
          >
            Say Hello <ArrowRight style={{ width: "24px", height: "24px" }} />
          </motion.a>

          <div style={{ display: "flex", gap: "48px", marginTop: "48px" }}>
            <SocialLink href={portfolioData.social.github} icon={<Github style={{ width: "32px", height: "32px" }} />} label="GitHub" />
            <SocialLink href={portfolioData.social.linkedin} icon={<Linkedin style={{ width: "32px", height: "32px" }} />} label="LinkedIn" />
            <SocialLink href={portfolioData.social.twitter} icon={<Twitter style={{ width: "32px", height: "32px" }} />} label="Twitter" />
          </div>
        </div>
      </motion.div>
    </section>
  );
};

const SocialLink = ({ href, icon, label }: { href: string; icon: React.ReactNode; label: string }) => (
  <motion.a
    href={href}
    target="_blank"
    rel="noreferrer"
    whileHover={{ y: -8, color: "#818cf8" }}
    style={{
      color: "rgba(255, 255, 255, 0.2)",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      gap: "12px",
      textDecoration: "none",
      transition: "all 0.5s cubic-bezier(0.16, 1, 0.3, 1)",
    }}
  >
    {icon}
    <span style={{
      fontSize: "10px",
      textTransform: "uppercase",
      fontWeight: 900,
      letterSpacing: "0.2em",
      opacity: 0,
      transition: "opacity 0.5s",
    }}>{label}</span>
  </motion.a>
);

export default Contact;
