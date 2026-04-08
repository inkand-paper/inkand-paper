"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useAppStore } from "@/store/useAppStore";
import { askAbirAI } from "@/lib/ai";
import { Bot, X, Send, Command, Cpu, Sparkles } from "lucide-react";

// Instant local command responses (no API call needed)
const LOCAL_COMMANDS: Record<string, (ctx: { mode: string; unlockHidden: () => void }) => string> = {
  "unlock": ({ mode, unlockHidden }) => {
    unlockHidden();
    return mode === "play"
      ? "Access granted. Something has shifted in the canvas..."
      : "A hidden layer has been initialized. Play mode knows more.";
  },
  "show projects": () => "Scroll down to Projects — or switch to Play Mode to decrypt them one by one.",
  "show skills": () => "The Capabilities module is active. Hover over any skill in Structured Mode.",
  "contact": () => "Use the Contact section at the bottom, or just ask me to relay a message.",
  "who are you": () => "I'm Abir AI. I exist inside this system. I know things you haven't discovered yet.",
  "help": () => "Try: 'show projects', 'show skills', 'unlock', 'who are you', or ask anything about Abir.",
};

const QUICK_ACTIONS = ["show projects", "show skills", "unlock", "who are you"];

const AbirAI = () => {
  const {
    isAiOpen, toggleAi,
    aiMessages, addAiMessage,
    isAiTyping, setAiTyping,
    mode, currentSection,
    portfolioData,
    unlockedSkills, unlockedProjects,
    unlockHidden,
  } = useAppStore();

  const [input, setInput] = useState("");
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [aiMessages, isAiTyping]);

  const handleSend = async (overrideInput?: string) => {
    const msg = (overrideInput ?? input).trim();
    if (!msg || isAiTyping) return;

    setInput("");
    addAiMessage({ role: "user", text: msg });
    setAiTyping(true);

    const cmd = msg.toLowerCase();
    const localHandler = LOCAL_COMMANDS[cmd];
    if (localHandler) {
      await new Promise((r) => setTimeout(r, 400));
      const response = localHandler({ mode, unlockHidden });
      addAiMessage({ role: "ai", text: response });
      setAiTyping(false);
      return;
    }

    const unlocksContext = mode === "play"
      ? `${unlockedSkills.length} skills attached, ${unlockedProjects.length} projects decrypted.`
      : undefined;

    try {
      const response = await askAbirAI({
        input: msg,
        mode,
        section: currentSection,
        portfolioData,
        unlocksContext,
      });
      addAiMessage({ role: "ai", text: response.text });
    } catch {
      addAiMessage({ role: "ai", text: "My neural links are flickering. Try again." });
    } finally {
      setAiTyping(false);
    }
  };

  const accentColor = mode === "play" ? "#f472b6" : "#818cf8";

  return (
    <div style={{ position: "fixed", bottom: "24px", right: "24px", zIndex: 9999 }}>
      <AnimatePresence>
        {isAiOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            style={{
              position: "absolute",
              bottom: "80px",
              right: 0,
              width: "380px",
              height: "540px",
              borderRadius: "20px",
              overflow: "hidden",
              border: "1px solid rgba(255,255,255,0.1)",
              backgroundColor: "rgba(8,8,8,0.92)",
              backdropFilter: "blur(24px)",
              display: "flex",
              flexDirection: "column",
              boxShadow: `0 0 50px -10px ${accentColor}30`,
            }}
          >
            {/* Header */}
            <div style={{ padding: "16px", borderBottom: "1px solid rgba(255,255,255,0.05)", display: "flex", alignItems: "center", justifyContent: "space-between", backgroundColor: "rgba(255,255,255,0.01)" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                <div style={{ padding: "8px", borderRadius: "10px", backgroundColor: `${accentColor}15` }}>
                  <Bot style={{ width: "18px", height: "18px", color: accentColor }} />
                </div>
                <div>
                  <p style={{ fontSize: "13px", fontWeight: 700, color: "rgba(255,255,255,0.9)", margin: 0 }}>Abir AI</p>
                  <div style={{ display: "flex", alignItems: "center", gap: "6px", marginTop: "2px" }}>
                    <span style={{ width: "6px", height: "6px", borderRadius: "50%", backgroundColor: "#4ade80", display: "inline-block" }} />
                    <span style={{ fontSize: "9px", color: "rgba(255,255,255,0.3)", letterSpacing: "0.15em", textTransform: "uppercase" }}>
                      {mode === "play" ? "System Controller" : "Neural Link Active"}
                    </span>
                  </div>
                </div>
              </div>
              <button onClick={toggleAi} style={{ padding: "6px", borderRadius: "8px", background: "transparent", border: "none", color: "rgba(255,255,255,0.4)", cursor: "pointer" }}>
                <X style={{ width: "16px", height: "16px" }} />
              </button>
            </div>

            {/* Messages */}
            <div ref={scrollRef} style={{ flex: 1, overflowY: "auto", padding: "16px", display: "flex", flexDirection: "column", gap: "12px" }}>
              {aiMessages.map((msg, i) => (
                <motion.div key={i} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} style={{ display: "flex", justifyContent: msg.role === "user" ? "flex-end" : "flex-start" }}>
                  <div style={{
                    maxWidth: "82%",
                    padding: "10px 14px",
                    borderRadius: msg.role === "user" ? "16px 16px 4px 16px" : "16px 16px 16px 4px",
                    fontSize: "13px",
                    lineHeight: 1.6,
                    backgroundColor: msg.role === "user" ? "rgba(255,255,255,0.08)" : "rgba(255,255,255,0.02)",
                    color: msg.role === "user" ? "rgba(255,255,255,0.9)" : "rgba(255,255,255,0.65)",
                    border: msg.role === "ai" ? "1px solid rgba(255,255,255,0.05)" : "none",
                  }}>
                    {msg.text}
                  </div>
                </motion.div>
              ))}
              {isAiTyping && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={{ display: "flex", justifyContent: "flex-start" }}>
                  <div style={{ padding: "12px 16px", borderRadius: "16px 16px 16px 4px", border: "1px solid rgba(255,255,255,0.05)", display: "flex", gap: "4px" }}>
                    {[0, 150, 300].map((delay) => (
                      <motion.span
                        key={delay}
                        animate={{ y: [0, -4, 0] }}
                        transition={{ duration: 0.8, repeat: Infinity, delay: delay / 1000 }}
                        style={{ width: "6px", height: "6px", borderRadius: "50%", backgroundColor: "rgba(255,255,255,0.2)", display: "inline-block" }}
                      />
                    ))}
                  </div>
                </motion.div>
              )}
            </div>

            {/* Quick Actions */}
            <div style={{ padding: "8px 16px", display: "flex", gap: "6px", flexWrap: "wrap", borderTop: "1px solid rgba(255,255,255,0.04)" }}>
              {QUICK_ACTIONS.map((action) => (
                <button
                  key={action}
                  onClick={() => handleSend(action)}
                  style={{
                    padding: "4px 10px",
                    borderRadius: "20px",
                    border: `1px solid ${accentColor}30`,
                    backgroundColor: `${accentColor}08`,
                    color: accentColor,
                    fontSize: "10px",
                    cursor: "pointer",
                    fontFamily: "inherit",
                    letterSpacing: "0.05em",
                    transition: "all 0.2s",
                  }}
                >
                  {action}
                </button>
              ))}
            </div>

            {/* Input */}
            <div style={{ padding: "12px 16px 16px", backgroundColor: "rgba(255,255,255,0.01)", borderTop: "1px solid rgba(255,255,255,0.04)" }}>
              <div style={{ position: "relative", display: "flex", alignItems: "center" }}>
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleSend()}
                  placeholder={mode === "play" ? "Enter command..." : "Ask me anything..."}
                  style={{
                    width: "100%",
                    backgroundColor: "rgba(255,255,255,0.04)",
                    border: "1px solid rgba(255,255,255,0.08)",
                    borderRadius: "12px",
                    padding: "10px 44px 10px 14px",
                    fontSize: "13px",
                    color: "rgba(255,255,255,0.85)",
                    outline: "none",
                    fontFamily: "inherit",
                    boxSizing: "border-box",
                  }}
                />
                <button
                  onClick={() => handleSend()}
                  disabled={isAiTyping || !input.trim()}
                  style={{
                    position: "absolute",
                    right: "8px",
                    padding: "6px",
                    borderRadius: "8px",
                    backgroundColor: "rgba(255,255,255,0.08)",
                    border: "none",
                    color: "white",
                    cursor: "pointer",
                    opacity: !input.trim() || isAiTyping ? 0.3 : 1,
                  }}
                >
                  <Send style={{ width: "14px", height: "14px" }} />
                </button>
              </div>
              <div style={{ marginTop: "8px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "4px", opacity: 0.2 }}>
                  <Command style={{ width: "10px", height: "10px" }} />
                  <span style={{ fontSize: "9px", textTransform: "uppercase", fontWeight: 700, letterSpacing: "0.05em" }}>Enter to send</span>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: "4px", opacity: 0.15 }}>
                  <Cpu style={{ width: "10px", height: "10px" }} />
                  <span style={{ fontSize: "9px", textTransform: "uppercase", fontWeight: 900 }}>Llama3-8B</span>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Toggle Button */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={toggleAi}
        style={{
          width: "56px",
          height: "56px",
          borderRadius: "50%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: mode === "play" ? "#db2777" : "#4f46e5",
          border: "none",
          cursor: "pointer",
          boxShadow: `0 8px 32px -8px ${accentColor}60`,
          position: "relative",
          overflow: "hidden",
        }}
      >
        <motion.div
          animate={{ scale: [1, 1.8, 1], opacity: [0.2, 0, 0.2] }}
          transition={{ duration: 3, repeat: Infinity }}
          style={{ position: "absolute", inset: 0, borderRadius: "50%", border: `1px solid ${accentColor}` }}
        />
        <AnimatePresence mode="wait">
          {isAiOpen ? (
            <motion.div key="x" initial={{ opacity: 0, rotate: -90 }} animate={{ opacity: 1, rotate: 0 }} exit={{ opacity: 0, rotate: 90 }}>
              <X style={{ width: "22px", height: "22px", color: "white" }} />
            </motion.div>
          ) : (
            <motion.div key="bot" initial={{ opacity: 0, rotate: 90 }} animate={{ opacity: 1, rotate: 0 }} exit={{ opacity: 0, rotate: -90 }} style={{ position: "relative" }}>
              <Bot style={{ width: "26px", height: "26px", color: "white" }} />
              <motion.div
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ repeat: Infinity, duration: 2 }}
                style={{ position: "absolute", top: "-4px", right: "-4px" }}
              >
                <Sparkles style={{ width: "10px", height: "10px", color: "#fde68a" }} />
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>
    </div>
  );
};

export default AbirAI;
