"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useAppStore } from "@/store/useAppStore";
import type { PortfolioData, Skill, Project } from "@/lib/data";

type Tab = "about" | "skills" | "projects";

export default function AdminPage() {
  const { portfolioData, setPortfolioData } = useAppStore();
  const [activeTab, setActiveTab] = useState<Tab>("about");
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  // Local draft state — only committed to store on "Save"
  const [draft, setDraft] = useState<PortfolioData>(() =>
    JSON.parse(JSON.stringify(portfolioData))
  );
  const [newSkill, setNewSkill] = useState({ name: "", level: "Intermediate", category: "language" });
  const [newProject, setNewProject] = useState({ title: "", description: "", tech: "", link: "", hidden: false });

  const handleSave = async () => {
    setSaving(true);
    setSaved(false);
    await new Promise((r) => setTimeout(r, 1500)); // Simulate upload delay
    setPortfolioData(draft);
    setSaving(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  const addSkill = () => {
    if (!newSkill.name.trim()) return;
    const id = Date.now();
    setDraft((d) => ({ ...d, skills: [...d.skills, { id, ...newSkill }] }));
    setNewSkill({ name: "", level: "Intermediate", category: "language" });
  };

  const removeSkill = (id: number) => {
    setDraft((d) => ({ ...d, skills: d.skills.filter((s) => s.id !== id) }));
  };

  const addProject = () => {
    if (!newProject.title.trim()) return;
    setDraft((d) => ({
      ...d,
      projects: [
        ...d.projects,
        {
          id: Date.now(),
          title: newProject.title,
          description: newProject.description,
          tech: newProject.tech.split(",").map((t) => t.trim()),
          link: newProject.link || "#",
          hidden: newProject.hidden,
        },
      ],
    }));
    setNewProject({ title: "", description: "", tech: "", link: "", hidden: false });
  };

  const toggleHidden = (id: number) => {
    setDraft((d) => ({
      ...d,
      projects: d.projects.map((p) => (p.id === id ? { ...p, hidden: !p.hidden } : p)),
    }));
  };

  const removeProject = (id: number) => {
    setDraft((d) => ({ ...d, projects: d.projects.filter((p) => p.id !== id) }));
  };

  const tabs: { id: Tab; label: string }[] = [
    { id: "about", label: "// Identity" },
    { id: "skills", label: "// Capabilities" },
    { id: "projects", label: "// Projects" },
  ];

  return (
    <main
      style={{
        minHeight: "100vh",
        backgroundColor: "#060606",
        color: "rgba(255,255,255,0.85)",
        fontFamily: "var(--font-geist-mono)",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* Header */}
      <div
        style={{
          borderBottom: "1px solid rgba(255,255,255,0.06)",
          padding: "24px 40px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <div>
          <span style={{ fontSize: "11px", color: "#6366f1", letterSpacing: "0.3em" }}>SYSTEM ADMIN</span>
          <h1 style={{ fontSize: "20px", fontWeight: 800, margin: "4px 0 0", letterSpacing: "-0.02em", color: "white" }}>
            Portfolio.exe Control Panel
          </h1>
        </div>

        <button
          onClick={handleSave}
          disabled={saving}
          style={{
            padding: "10px 28px",
            borderRadius: "12px",
            border: "1px solid #6366f1",
            backgroundColor: saving ? "transparent" : "#6366f1",
            color: "white",
            fontSize: "12px",
            fontWeight: 700,
            letterSpacing: "0.1em",
            cursor: saving ? "not-allowed" : "pointer",
            transition: "all 0.2s",
            display: "flex",
            alignItems: "center",
            gap: "8px",
          }}
        >
          {saving ? (
            <>
              <motion.span animate={{ opacity: [1, 0.2, 1] }} transition={{ duration: 0.8, repeat: Infinity }}>
                ◈
              </motion.span>
              UPLOADING TO CORE...
            </>
          ) : saved ? (
            <><span style={{ color: "#4ade80" }}>✓</span> SYNCED</>
          ) : (
            "↑ SAVE DATA"
          )}
        </button>
      </div>

      <div style={{ display: "flex", flex: 1, overflow: "hidden" }}>
        {/* Sidebar */}
        <div
          style={{
            width: "200px",
            flexShrink: 0,
            borderRight: "1px solid rgba(255,255,255,0.06)",
            padding: "32px 0",
            display: "flex",
            flexDirection: "column",
            gap: "4px",
          }}
        >
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              style={{
                padding: "12px 24px",
                textAlign: "left",
                background: activeTab === tab.id ? "rgba(99,102,241,0.1)" : "transparent",
                border: "none",
                borderRight: activeTab === tab.id ? "2px solid #6366f1" : "2px solid transparent",
                color: activeTab === tab.id ? "#ffffff" : "rgba(255,255,255,0.3)",
                fontSize: "12px",
                cursor: "pointer",
                fontFamily: "inherit",
                fontWeight: activeTab === tab.id ? 700 : 400,
                transition: "all 0.2s",
              }}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Main content */}
        <div style={{ flex: 1, overflowY: "auto", padding: "40px 48px" }}>
          <AnimatePresence mode="wait">
            {activeTab === "about" && (
              <motion.div
                key="about"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                style={{ maxWidth: "640px", display: "flex", flexDirection: "column", gap: "24px" }}
              >
                <SectionHeader label="Identity Configuration" />
                <Field label="NAME" value={draft.about.name} onChange={(v) => setDraft((d) => ({ ...d, about: { ...d.about, name: v } }))} />
                <Field label="TITLE" value={draft.about.title} onChange={(v) => setDraft((d) => ({ ...d, about: { ...d.about, title: v } }))} />
                <Field label="EMAIL" value={draft.about.email} onChange={(v) => setDraft((d) => ({ ...d, about: { ...d.about, email: v } }))} />
                <Field label="LOCATION" value={draft.about.location} onChange={(v) => setDraft((d) => ({ ...d, about: { ...d.about, location: v } }))} />
                <Field label="GITHUB" value={draft.social.github} onChange={(v) => setDraft((d) => ({ ...d, social: { ...d.social, github: v } }))} />
                <Field label="LINKEDIN" value={draft.social.linkedin} onChange={(v) => setDraft((d) => ({ ...d, social: { ...d.social, linkedin: v } }))} />
                <TextAreaField label="BIO" value={draft.about.bio} onChange={(v) => setDraft((d) => ({ ...d, about: { ...d.about, bio: v } }))} />
              </motion.div>
            )}

            {activeTab === "skills" && (
              <motion.div key="skills" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}>
                <SectionHeader label="Skills Registry" />
                <div style={{ display: "flex", flexDirection: "column", gap: "8px", marginBottom: "32px" }}>
                  {draft.skills.map((skill) => (
                    <SkillRow key={skill.id} skill={skill} onRemove={() => removeSkill(skill.id)} />
                  ))}
                </div>
                <div style={{ borderTop: "1px solid rgba(255,255,255,0.06)", paddingTop: "24px" }}>
                  <p style={{ fontSize: "11px", color: "rgba(255,255,255,0.3)", marginBottom: "16px", letterSpacing: "0.2em" }}>ADD NEW SKILL</p>
                  <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
                    <input
                      placeholder="Skill name"
                      value={newSkill.name}
                      onChange={(e) => setNewSkill((s) => ({ ...s, name: e.target.value }))}
                      style={inputStyle}
                    />
                    <select value={newSkill.level} onChange={(e) => setNewSkill((s) => ({ ...s, level: e.target.value }))} style={inputStyle}>
                      <option value="Beginner">Beginner</option>
                      <option value="Intermediate">Intermediate</option>
                      <option value="Advanced">Advanced</option>
                    </select>
                    <button onClick={addSkill} style={addBtnStyle}>+ ADD</button>
                  </div>
                </div>
              </motion.div>
            )}

            {activeTab === "projects" && (
              <motion.div key="projects" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}>
                <SectionHeader label="Project Registry" />
                <div style={{ display: "flex", flexDirection: "column", gap: "12px", marginBottom: "32px" }}>
                  {draft.projects.map((project) => (
                    <ProjectRow key={project.id} project={project} onRemove={() => removeProject(project.id)} onToggleHidden={() => toggleHidden(project.id)} />
                  ))}
                </div>
                <div style={{ borderTop: "1px solid rgba(255,255,255,0.06)", paddingTop: "24px" }}>
                  <p style={{ fontSize: "11px", color: "rgba(255,255,255,0.3)", marginBottom: "16px", letterSpacing: "0.2em" }}>ADD NEW PROJECT</p>
                  <div style={{ display: "flex", flexDirection: "column", gap: "12px", maxWidth: "540px" }}>
                    <input placeholder="Title" value={newProject.title} onChange={(e) => setNewProject((p) => ({ ...p, title: e.target.value }))} style={inputStyle} />
                    <input placeholder="Description" value={newProject.description} onChange={(e) => setNewProject((p) => ({ ...p, description: e.target.value }))} style={inputStyle} />
                    <input placeholder="Tech stack (comma-separated)" value={newProject.tech} onChange={(e) => setNewProject((p) => ({ ...p, tech: e.target.value }))} style={inputStyle} />
                    <input placeholder="Link" value={newProject.link} onChange={(e) => setNewProject((p) => ({ ...p, link: e.target.value }))} style={inputStyle} />
                    <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                      <input type="checkbox" id="hidden" checked={newProject.hidden} onChange={(e) => setNewProject((p) => ({ ...p, hidden: e.target.checked }))} />
                      <label htmlFor="hidden" style={{ fontSize: "12px", color: "rgba(255,255,255,0.5)" }}>Mark as hidden (Easter Egg)</label>
                    </div>
                    <button onClick={addProject} style={{ ...addBtnStyle, alignSelf: "flex-start" }}>+ ADD PROJECT</button>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </main>
  );
}

// Sub-components

function SectionHeader({ label }: { label: string }) {
  return (
    <div style={{ marginBottom: "24px" }}>
      <h2 style={{ fontSize: "11px", color: "#6366f1", letterSpacing: "0.3em", fontWeight: 700, marginBottom: "4px" }}>
        {label.toUpperCase()}
      </h2>
      <div style={{ height: "1px", background: "linear-gradient(90deg, rgba(99,102,241,0.5), transparent)" }} />
    </div>
  );
}

function Field({ label, value, onChange }: { label: string; value: string; onChange: (v: string) => void }) {
  return (
    <div>
      <label style={{ fontSize: "10px", color: "rgba(255,255,255,0.3)", letterSpacing: "0.2em", display: "block", marginBottom: "8px" }}>{label}</label>
      <input value={value} onChange={(e) => onChange(e.target.value)} style={inputStyle} />
    </div>
  );
}

function TextAreaField({ label, value, onChange }: { label: string; value: string; onChange: (v: string) => void }) {
  return (
    <div>
      <label style={{ fontSize: "10px", color: "rgba(255,255,255,0.3)", letterSpacing: "0.2em", display: "block", marginBottom: "8px" }}>{label}</label>
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        rows={4}
        style={{ ...inputStyle, resize: "vertical", lineHeight: 1.7 }}
      />
    </div>
  );
}

function SkillRow({ skill, onRemove }: { skill: Skill; onRemove: () => void }) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "12px 16px",
        borderRadius: "10px",
        border: "1px solid rgba(255,255,255,0.06)",
        backgroundColor: "rgba(255,255,255,0.02)",
      }}
    >
      <span style={{ fontSize: "13px", color: "rgba(255,255,255,0.8)" }}>{skill.name}</span>
      <div style={{ display: "flex", gap: "16px", alignItems: "center" }}>
        <span style={{ fontSize: "10px", color: "rgba(255,255,255,0.3)", letterSpacing: "0.1em" }}>{skill.level}</span>
        <button onClick={onRemove} style={{ background: "transparent", border: "none", color: "rgba(255,60,60,0.5)", cursor: "pointer", fontSize: "14px" }}>✕</button>
      </div>
    </div>
  );
}

function ProjectRow({ project, onRemove, onToggleHidden }: { project: Project; onRemove: () => void; onToggleHidden: () => void }) {
  return (
    <div
      style={{
        padding: "16px",
        borderRadius: "12px",
        border: `1px solid ${project.hidden ? "rgba(163,230,53,0.2)" : "rgba(255,255,255,0.06)"}`,
        backgroundColor: project.hidden ? "rgba(163,230,53,0.03)" : "rgba(255,255,255,0.02)",
      }}
    >
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
        <div>
          <span style={{ fontSize: "14px", color: project.hidden ? "#a3e635" : "rgba(255,255,255,0.85)", fontWeight: 700 }}>
            {project.title} {project.hidden && "🔒"}
          </span>
          <p style={{ fontSize: "12px", color: "rgba(255,255,255,0.4)", marginTop: "4px" }}>{project.description}</p>
        </div>
        <div style={{ display: "flex", gap: "8px" }}>
          <button onClick={onToggleHidden} title={project.hidden ? "Make visible" : "Hide project"} style={{ background: "transparent", border: "1px solid rgba(255,255,255,0.1)", color: "rgba(255,255,255,0.4)", cursor: "pointer", fontSize: "11px", padding: "4px 10px", borderRadius: "6px" }}>
            {project.hidden ? "UNHIDE" : "HIDE"}
          </button>
          <button onClick={onRemove} style={{ background: "transparent", border: "none", color: "rgba(255,60,60,0.5)", cursor: "pointer", fontSize: "14px" }}>✕</button>
        </div>
      </div>
    </div>
  );
}

const inputStyle: React.CSSProperties = {
  width: "100%",
  backgroundColor: "rgba(255,255,255,0.04)",
  border: "1px solid rgba(255,255,255,0.08)",
  borderRadius: "10px",
  padding: "12px 16px",
  color: "rgba(255,255,255,0.85)",
  fontSize: "13px",
  fontFamily: "var(--font-geist-mono)",
  outline: "none",
  boxSizing: "border-box",
  transition: "border-color 0.2s",
};

const addBtnStyle: React.CSSProperties = {
  padding: "12px 24px",
  borderRadius: "10px",
  border: "1px solid rgba(99,102,241,0.5)",
  backgroundColor: "rgba(99,102,241,0.1)",
  color: "#818cf8",
  fontSize: "12px",
  fontWeight: 700,
  cursor: "pointer",
  fontFamily: "var(--font-geist-mono)",
  letterSpacing: "0.1em",
  transition: "all 0.2s",
};