"use client";

import { useEffect, useRef } from "react";

export default function Cursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    let mouseX = 0, mouseY = 0;
    let ringX = 0, ringY = 0;
    let animId: number;

    // --- Trails ---
    const TRAIL_COUNT = 8;
    const trails: HTMLDivElement[] = [];
    const trailPositions: { x: number; y: number }[] = Array(TRAIL_COUNT)
      .fill(null)
      .map(() => ({ x: 0, y: 0 }));

    for (let i = 0; i < TRAIL_COUNT; i++) {
      const t = document.createElement("div");
      t.style.cssText = `
        position: fixed;
        top: 0; left: 0;
        width: ${6 - i * 0.5}px;
        height: ${6 - i * 0.5}px;
        margin-left: ${-(3 - i * 0.25)}px;
        margin-top: ${-(3 - i * 0.25)}px;
        border-radius: 50%;
        pointer-events: none;
        z-index: 9990;
        will-change: transform;
        opacity: ${0.15 - i * 0.015};
        background-color: rgba(255,255,255,0.6);
      `;
      document.body.appendChild(t);
      trails.push(t);
    }

    // --- Mouse move ---
    const onMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      dot.style.transform = `translate(${mouseX}px, ${mouseY}px)`;
    };

    // --- Animation loop ---
    const animate = () => {
      ringX += (mouseX - ringX) * 0.1;
      ringY += (mouseY - ringY) * 0.1;
      ring.style.transform = `translate(${ringX}px, ${ringY}px)`;

      trailPositions[0].x += (mouseX - trailPositions[0].x) * 0.35;
      trailPositions[0].y += (mouseY - trailPositions[0].y) * 0.35;
      trails[0].style.transform = `translate(${trailPositions[0].x}px, ${trailPositions[0].y}px)`;

      for (let i = 1; i < TRAIL_COUNT; i++) {
        trailPositions[i].x += (trailPositions[i - 1].x - trailPositions[i].x) * 0.45;
        trailPositions[i].y += (trailPositions[i - 1].y - trailPositions[i].y) * 0.45;
        trails[i].style.transform = `translate(${trailPositions[i].x}px, ${trailPositions[i].y}px)`;
      }

      animId = requestAnimationFrame(animate);
    };

    // --- Scramble ---
    const scrambleChars = "!@#$%^&*<>?/|\\{}[]~`";
    let scrambleInterval: ReturnType<typeof setInterval> | null = null;
    let scrambleState: { [key: string]: string } = {};

    // Store references to the active text nodes and their original strings
    let activeTextNodes: { node: Node; original: string }[] = [];

    const startScramble = (el: Element) => {
      const htmlEl = el as HTMLElement;
      
      // Find all valid text nodes to scramble independently
      const textNodes: Node[] = [];
      const walk = document.createTreeWalker(el, NodeFilter.SHOW_TEXT, null);
      let n;
      while ((n = walk.nextNode())) {
        if (n.nodeValue && n.nodeValue.trim() !== "") {
          textNodes.push(n);
        }
      }

      if (textNodes.length === 0) return;
      
      activeTextNodes = textNodes.map((node) => ({
        node,
        original: node.nodeValue || "",
      }));

      const computed = window.getComputedStyle(htmlEl);
      
      // Save original styles to restore later
      scrambleState = {
        width: htmlEl.style.width,
        height: htmlEl.style.height,
        whiteSpace: htmlEl.style.whiteSpace,
        overflow: htmlEl.style.overflow,
        display: htmlEl.style.display,
      };

      if (computed.display === "inline") {
        htmlEl.style.display = "inline-block";
      }
      htmlEl.style.width = computed.width;
      htmlEl.style.height = computed.height;
      htmlEl.style.whiteSpace = "nowrap";
      htmlEl.style.overflow = "hidden";

      let frame = 0;
      if (scrambleInterval) clearInterval(scrambleInterval);
      scrambleInterval = setInterval(() => {
        activeTextNodes.forEach(({ node, original }) => {
          const scrambled = original
            .split("")
            .map((char, i) => {
              if (/\s/.test(char)) return char;
              if (i < frame / 2) return original[i];
              return scrambleChars[Math.floor(Math.random() * scrambleChars.length)];
            })
            .join("");
          node.nodeValue = scrambled;
        });
        frame++;
        
        const allDone = activeTextNodes.every(t => frame > t.original.length * 2);
        if (allDone) {
          stopScramble(el);
        }
      }, 40);
    };

    const stopScramble = (el: Element) => {
      if (scrambleInterval) {
        clearInterval(scrambleInterval);
        scrambleInterval = null;
      }
      const htmlEl = el as HTMLElement;
      
      // Safely restore text directly to the DOM nodes without destroying React elements
      activeTextNodes.forEach(({ node, original }) => {
        node.nodeValue = original;
      });
      activeTextNodes = []; // Clear memory
      
      htmlEl.style.width = scrambleState.width || "";
      htmlEl.style.height = scrambleState.height || "";
      htmlEl.style.whiteSpace = scrambleState.whiteSpace || "";
      htmlEl.style.overflow = scrambleState.overflow || "";
      htmlEl.style.display = scrambleState.display || "";
    };

    // --- Colors ---
    const colors = ["#818cf8", "#a78bfa", "#f472b6", "#34d399", "#60a5fa", "#fbbf24"];
    let colorIndex = 0;

    const setTrailColor = (color: string) => {
      trails.forEach((t) => { t.style.backgroundColor = color; });
      dot.style.backgroundColor = color;
    };

    const resetTrailColor = () => {
      trails.forEach((t) => { t.style.backgroundColor = "rgba(255,255,255,0.6)"; });
      dot.style.backgroundColor = "white";
    };

    const resetRing = () => {
      ring.style.width = "32px";
      ring.style.height = "32px";
      ring.style.borderColor = "rgba(255,255,255,0.15)";
      ring.style.backgroundColor = "transparent";
      dot.style.opacity = "1";
    };

    // --- Hover handler ---
    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as Element;

      // Headings — scramble + color shift
      if (target.matches("h1, h2, h3, h4") && target.textContent?.trim()) {
        const original = target.textContent || "";
        
        // Priority to custom data-color
        const customColor = target.getAttribute("data-cursor-color");
        let c = "";
        
        if (customColor) {
           c = customColor;
        } else {
           colorIndex = (colorIndex + 1) % colors.length;
           c = colors[colorIndex];
        }

        setTrailColor(c);
        ring.style.borderColor = c;
        ring.style.width = "60px";
        ring.style.height = "60px";
        ring.style.backgroundColor = `${c}18`;
        dot.style.opacity = "0";

        startScramble(target);
        // Only switch text color if it's picking from the default solid palette, not an alpha string
        if (!customColor) {
          (target as HTMLElement).style.transition = "color 0.3s ease";
          (target as HTMLElement).style.color = c;
        }

        target.addEventListener("mouseleave", () => {
          stopScramble(target);
          if (!customColor) {
            (target as HTMLElement).style.color = "";
          }
          resetRing();
          resetTrailColor();
        }, { once: true });

      // Buttons / links
      } else if (target.matches("button, a, [data-cursor]")) {
        ring.style.width = "52px";
        ring.style.height = "52px";
        ring.style.borderColor = "rgba(99,102,241,0.7)";
        ring.style.backgroundColor = "rgba(99,102,241,0.05)";
        dot.style.opacity = "0";

        target.addEventListener("mouseleave", () => {
          resetRing();
        }, { once: true });

      // Paragraphs
      } else if (target.matches("p, span, li")) {
        ring.style.width = "40px";
        ring.style.height = "40px";
        ring.style.borderColor = "rgba(255,255,255,0.06)";

        target.addEventListener("mouseleave", () => {
          resetRing();
        }, { once: true });
      }
    };

    // --- Click burst ---
    const onMouseDown = (e: MouseEvent) => {
      const burst = document.createElement("div");
      burst.style.cssText = `
        position: fixed;
        left: ${e.clientX}px;
        top: ${e.clientY}px;
        width: 4px;
        height: 4px;
        margin-left: -2px;
        margin-top: -2px;
        border-radius: 50%;
        background: transparent;
        border: 1px solid rgba(99,102,241,0.8);
        pointer-events: none;
        z-index: 9989;
        animation: burst 0.5s ease-out forwards;
      `;
      document.body.appendChild(burst);
      setTimeout(() => burst.remove(), 500);
    };

    // --- Inject keyframe ---
    const style = document.createElement("style");
    style.textContent = `
      @keyframes burst {
        0%   { opacity: 1; width: 4px; height: 4px; margin-left: -2px; margin-top: -2px; }
        100% { opacity: 0; width: 48px; height: 48px; margin-left: -24px; margin-top: -24px; }
      }
    `;
    document.head.appendChild(style);

    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseover", handleMouseOver);
    window.addEventListener("mousedown", onMouseDown);
    animate();

    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseover", handleMouseOver);
      window.removeEventListener("mousedown", onMouseDown);
      cancelAnimationFrame(animId);
      trails.forEach((t) => t.remove());
      style.remove();
    };
  }, []);

  return (
    <>
      <div
        ref={dotRef}
        style={{
          position: "fixed",
          top: 0, left: 0,
          width: "4px", height: "4px",
          marginLeft: "-2px", marginTop: "-2px",
          backgroundColor: "white",
          borderRadius: "50%",
          pointerEvents: "none",
          zIndex: 9999,
          willChange: "transform",
          transition: "opacity 0.15s ease, background-color 0.3s ease",
        }}
      />
      <div
        ref={ringRef}
        style={{
          position: "fixed",
          top: 0, left: 0,
          width: "32px", height: "32px",
          marginLeft: "-16px", marginTop: "-16px",
          border: "1px solid rgba(255,255,255,0.15)",
          borderRadius: "50%",
          pointerEvents: "none",
          zIndex: 9998,
          willChange: "transform",
          transition: "width 0.35s cubic-bezier(0.25,0.1,0.25,1), height 0.35s cubic-bezier(0.25,0.1,0.25,1), border-color 0.35s ease, background-color 0.35s ease",
        }}
      />
    </>
  );
}