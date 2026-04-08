import { create } from "zustand";
import { persist } from "zustand/middleware";
import { portfolioData as defaultPortfolioData } from "@/lib/data";

export type Mode = "structured" | "play";
export type Section = "hero" | "about" | "skills" | "projects" | "contact";

interface AppState {
  // Mode
  mode: Mode;
  setMode: (mode: Mode) => void;

  // Current section (for AI context awareness)
  currentSection: Section;
  setCurrentSection: (section: Section) => void;

  // AI
  aiMessages: { role: "user" | "ai"; text: string }[];
  addAiMessage: (msg: { role: "user" | "ai"; text: string }) => void;
  isAiOpen: boolean;
  toggleAi: () => void;
  isAiTyping: boolean;
  setAiTyping: (val: boolean) => void;

  // Play mode — unlocked items
  unlockedSkills: number[];
  unlockSkill: (id: number) => void;
  unlockedProjects: number[];
  unlockProject: (id: number) => void;

  // Easter egg
  hiddenUnlocked: boolean;
  unlockHidden: () => void;

  // Admin Data
  portfolioData: typeof defaultPortfolioData;
  setPortfolioData: (data: typeof defaultPortfolioData) => void;
}

export const useAppStore = create<AppState>()(
  persist(
    (set) => ({
      // Mode
      mode: "structured",
      setMode: (mode) => set({ mode }),

      // Section
      currentSection: "hero",
      setCurrentSection: (section) => set({ currentSection: section }),

      // AI
      aiMessages: [
        { role: "ai", text: "Hey. I'm Abir AI. Ask me anything — or just explore." },
      ],
      addAiMessage: (msg) =>
        set((state) => ({ aiMessages: [...state.aiMessages, msg] })),
      isAiOpen: false,
      toggleAi: () => set((state) => ({ isAiOpen: !state.isAiOpen })),
      isAiTyping: false,
      setAiTyping: (val) => set({ isAiTyping: val }),

      // Play mode
      unlockedSkills: [],
      unlockSkill: (id) =>
        set((state) => ({
          unlockedSkills: state.unlockedSkills.includes(id)
            ? state.unlockedSkills
            : [...state.unlockedSkills, id],
        })),
      unlockedProjects: [],
      unlockProject: (id) =>
        set((state) => ({
          unlockedProjects: state.unlockedProjects.includes(id)
            ? state.unlockedProjects
            : [...state.unlockedProjects, id],
        })),

      // Easter egg
      hiddenUnlocked: false,
      unlockHidden: () => set({ hiddenUnlocked: true }),

      // Admin data (persisted to localStorage)
      portfolioData: defaultPortfolioData,
      setPortfolioData: (data) => set({ portfolioData: data }),
    }),
    {
      name: "abirverse-store", // localStorage key
      // Only persist data that needs to survive page reloads
      partialize: (state) => ({
        portfolioData: state.portfolioData,
        unlockedSkills: state.unlockedSkills,
        unlockedProjects: state.unlockedProjects,
        hiddenUnlocked: state.hiddenUnlocked,
      }),
    }
  )
);