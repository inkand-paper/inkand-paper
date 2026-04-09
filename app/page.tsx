"use client";

import { useRouter } from "next/navigation";
import { useAppStore } from "@/store/useAppStore";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { LayoutTemplate, Gamepad2, ArrowUpRight } from "lucide-react";

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.8, delay, ease: [0.25, 0.1, 0.25, 1] as any },
});

const fadeIn = (delay = 0) => ({
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  transition: { duration: 0.8, delay, ease: "easeOut" as any },
});

export default function Home() {
  const router = useRouter();
  const setMode = useAppStore((s) => s.setMode);
  const [mounted, setMounted] = useState(false);
  const [hovered, setHovered] = useState<null | "structured" | "play">(null);

  useEffect(() => setMounted(true), []);

  const handleMode = (mode: "structured" | "play") => {
    setMode(mode);
    router.push(`/${mode}`);
  };

  if (!mounted) return null;

  return (
    <main style={{
      minHeight: "100vh",
      backgroundColor: "#080808",
      display: "flex",
      flexDirection: "column",
      position: "relative",
      overflow: "hidden",
    }}>

      {/* Ambient glow */}
      <div style={{
        position: "absolute",
        top: "-200px",
        right: "-100px",
        width: "600px",
        height: "600px",
        borderRadius: "50%",
        background: "radial-gradient(circle, rgba(99,102,241,0.04) 0%, transparent 70%)",
        pointerEvents: "none",
      }} />

      {/* Nav */}
      <motion.nav
        {...fadeIn(0)}
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "32px 64px",
        }}
      >
        <span style={{
          fontSize: "11px",
          fontFamily: "var(--font-geist-mono)",
          color: "#3f3f46",
          letterSpacing: "0.2em",
          textTransform: "uppercase",
        }}>
          AbirVerse
        </span>
        <button
          onClick={() => router.push("/admin")}
          style={{
            fontSize: "11px",
            fontFamily: "var(--font-geist-mono)",
            color: "#3f3f46",
            letterSpacing: "0.2em",
            textTransform: "uppercase",
            background: "none",
            border: "none",
            padding: "8px 0",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.color = "#71717a")}
          onMouseLeave={(e) => (e.currentTarget.style.color = "#3f3f46")}
        >
          /admin
        </button>
      </motion.nav>

      {/* Hero content */}
      <div style={{
        flex: 1,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        padding: "0 64px",
        maxWidth: "900px",
        marginLeft: "auto",
        marginRight: "auto",
        width: "100%",
      }}>

        {/* Status */}
        <motion.div {...fadeIn(0.1)} style={{
          display: "flex",
          alignItems: "center",
          gap: "10px",
          marginBottom: "80px",
        }}>
          <span style={{
            width: "6px",
            height: "6px",
            borderRadius: "50%",
            backgroundColor: "#34d399",
            display: "inline-block",
            boxShadow: "0 0 8px rgba(52,211,153,0.5)",
          }} />
          <span style={{
            fontSize: "11px",
            fontFamily: "var(--font-geist-mono)",
            color: "#52525b",
            letterSpacing: "0.2em",
            textTransform: "uppercase",
          }}>
            Available for work · Bangladesh
          </span>
        </motion.div>

        {/* Headline */}
        <div style={{ marginBottom: "40px" }}>
          <motion.h1 {...fadeUp(0.15)} style={{
            fontSize: "clamp(52px, 8vw, 110px)",
            fontWeight: 600,
            letterSpacing: "-0.04em",
            lineHeight: 0.92,
            color: "#ffffff",
            margin: 0,
            display: "block",
          }}>
            Tahsin Abir
          </motion.h1>

          <div style={{
            display: "flex",
            alignItems: "baseline",
            flexWrap: "wrap",
            gap: "clamp(12px, 2vw, 24px)",
            marginTop: "8px",
          }}>
            {/* Each word is isolated — scramble on one never shifts others */}
            <motion.h1
              {...fadeUp(0.22)}
              style={{
                fontSize: "clamp(52px, 8vw, 110px)",
                fontWeight: 600,
                letterSpacing: "-0.04em",
                lineHeight: 0.92,
                color: "#27272a",
                margin: 0,
                flexShrink: 0,
                minWidth: "max-content",
              }}
            >
              Developer
            </motion.h1>

            <motion.span
              {...fadeUp(0.28)}
              style={{
                fontSize: "clamp(52px, 8vw, 110px)",
                fontWeight: 600,
                letterSpacing: "-0.04em",
                lineHeight: 0.92,
                color: "#1c1c1e",
                flexShrink: 0,
                minWidth: "max-content",
              }}
            >
              &
            </motion.span>

            <motion.h1
              {...fadeUp(0.34)}
              style={{
                fontSize: "clamp(52px, 8vw, 110px)",
                fontWeight: 600,
                letterSpacing: "-0.04em",
                lineHeight: 0.92,
                color: "#27272a",
                margin: 0,
                flexShrink: 0,
                minWidth: "max-content",
              }}
            >
              AI Engineer.
            </motion.h1>
          </div>
        </div>

        {/* Description */}
        <motion.p {...fadeUp(0.3)} style={{
          color: "#52525b",
          fontSize: "15px",
          lineHeight: 1.8,
          maxWidth: "380px",
          marginBottom: "80px",
          fontWeight: 400,
        }}>
          I build interactive systems at the intersection
          of AI and frontend engineering — things that
          feel alive, react, and think.
        </motion.p>
        {/* Mode cards */}
        <motion.div {...fadeUp(0.38)} style={{
          display: "flex",
          gap: "12px",
          maxWidth: "560px",
        }}>

          {/* Structured */}
          <button
            onClick={() => handleMode("structured")}
            onMouseEnter={() => setHovered("structured")}
            onMouseLeave={() => setHovered(null)}
            style={{
              flex: 1,
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              padding: "20px 24px",
              borderRadius: "16px",
              border: `1px solid ${hovered === "structured" ? "#27272a" : "#18181b"}`,
              backgroundColor: hovered === "structured" ? "#111111" : "#0c0c0c",
              transition: "all 0.25s ease",
              textAlign: "left",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
              <div style={{
                width: "36px",
                height: "36px",
                borderRadius: "10px",
                border: `1px solid ${hovered === "structured" ? "#27272a" : "#1c1c1e"}`,
                backgroundColor: "#0f0f0f",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                transition: "all 0.25s ease",
              }}>
                <LayoutTemplate size={14} color="#52525b" />
              </div>
              <div>
                <div style={{
                  color: "#ffffff",
                  fontSize: "13px",
                  fontWeight: 500,
                  marginBottom: "4px",
                  letterSpacing: "-0.01em",
                }}>
                  Structured
                </div>
                <div style={{
                  color: "#3f3f46",
                  fontSize: "11px",
                  letterSpacing: "0.01em",
                }}>
                  Clean portfolio view
                </div>
              </div>
            </div>
            <ArrowUpRight
              size={13}
              color={hovered === "structured" ? "#52525b" : "#27272a"}
              style={{ transition: "all 0.25s ease" }}
            />
          </button>

          {/* Play */}
          <button
            onClick={() => handleMode("play")}
            onMouseEnter={() => setHovered("play")}
            onMouseLeave={() => setHovered(null)}
            style={{
              flex: 1,
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              padding: "20px 24px",
              borderRadius: "16px",
              border: `1px solid ${hovered === "play" ? "rgba(99,102,241,0.2)" : "#18181b"}`,
              backgroundColor: hovered === "play" ? "rgba(99,102,241,0.04)" : "#0c0c0c",
              transition: "all 0.25s ease",
              textAlign: "left",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
              <div style={{
                width: "36px",
                height: "36px",
                borderRadius: "10px",
                border: `1px solid ${hovered === "play" ? "rgba(99,102,241,0.25)" : "#1c1c1e"}`,
                backgroundColor: hovered === "play" ? "rgba(99,102,241,0.08)" : "#0f0f0f",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                transition: "all 0.25s ease",
              }}>
                <Gamepad2 size={14} color={hovered === "play" ? "#818cf8" : "#52525b"} style={{ transition: "color 0.25s ease" }} />
              </div>
              <div>
                <div style={{
                  color: "#ffffff",
                  fontSize: "13px",
                  fontWeight: 500,
                  marginBottom: "4px",
                  letterSpacing: "-0.01em",
                }}>
                  Play Mode
                </div>
                <div style={{
                  color: "#3f3f46",
                  fontSize: "11px",
                  letterSpacing: "0.01em",
                }}>
                  Gamified experience
                </div>
              </div>
            </div>
            <ArrowUpRight
              size={13}
              color={hovered === "play" ? "#818cf8" : "#27272a"}
              style={{ transition: "all 0.25s ease" }}
            />
          </button>

        </motion.div>
      </div>

      {/* Footer */}
      <motion.footer
        {...fadeIn(0.55)}
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "24px 64px",
          borderTop: "1px solid #111111",
        }}
      >
        <span style={{ fontSize: "11px", fontFamily: "var(--font-geist-mono)", color: "#27272a" }}>
          v1.0.0
        </span>
        <div style={{ display: "flex", gap: "32px" }}>
          <span style={{ fontSize: "11px", fontFamily: "var(--font-geist-mono)", color: "#27272a" }}>
            Bangladesh
          </span>
          <span style={{ fontSize: "11px", fontFamily: "var(--font-geist-mono)", color: "#27272a" }}>
            Full Stack · AI
          </span>
        </div>
      </motion.footer>

    </main>
  );
} 