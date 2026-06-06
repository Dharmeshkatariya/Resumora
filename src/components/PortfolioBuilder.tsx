import React, { useState } from "react";
import { ResumeData } from "../types";
import { Globe, Copy, Check, Eye, Download, Code, Sparkles, ExternalLink } from "lucide-react";

interface PortfolioBuilderProps {
  resume: ResumeData;
}

const THEMES = [
  { id: "dark-editorial", name: "Twilight Glass (Dark)", style: "bg-black text-white" },
  { id: "swiss-classic", name: "Swiss Brutalist (Light)", style: "bg-[#F4F4F3] text-[#111111]" },
  { id: "emerald-mono", name: "Neon Matrix (Mono)", style: "bg-[#050B08] text-[#00FF88]" },
  { id: "cyber-cyberpunk", name: "Cyberpunk Terminal (Warm)", style: "bg-[#090514] text-[#FFAA00]" },
];

export default function PortfolioBuilder({ resume }: PortfolioBuilderProps) {
  const [selectedTheme, setSelectedTheme] = useState("dark-editorial");
  const [copied, setCopied] = useState(false);
  const [copiedUrl, setCopiedUrl] = useState(false);

  // Auto-generate beautiful custom code block
  const generatePortfolioHTML = () => {
    let fontHeader = "Satoshi";
    let fontBody = "Satoshi";
    let bodyBg = "#000000";
    let textColor = "#F0F0f5";
    let accentColor = "#00FFB2";
    let dividerColor = "rgba(255,255,255,0.06)";
    let surfaceColor = "#0F0F18";

    if (selectedTheme === "swiss-classic") {
      fontHeader = "Helvetica Neue";
      fontBody = "Times New Roman";
      bodyBg = "#F4F4F3";
      textColor = "#111111";
      accentColor = "#FF3322";
      dividerColor = "rgba(0,0,0,0.1)";
      surfaceColor = "#FFFFFF";
    } else if (selectedTheme === "emerald-mono") {
      fontHeader = "Courier New";
      fontBody = "Courier New";
      bodyBg = "#050B08";
      textColor = "#00FF88";
      accentColor = "#00FF88";
      dividerColor = "rgba(0,255,136,0.15)";
      surfaceColor = "#09120E";
    } else if (selectedTheme === "cyber-cyberpunk") {
      fontHeader = "Trebuchet MS";
      fontBody = "Monaco";
      bodyBg = "#0A010F";
      textColor = "#FFAA00";
      accentColor = "#FF00AA";
      dividerColor = "rgba(255,0,170,0.15)";
      surfaceColor = "#150221";
    }

    return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${resume.header.name} | Portfolio</title>
  <link rel="stylesheet" href="https://api.fontshare.com/v2/css?f[]=cabinet-grotesk@300,500,700&f[]=satoshi@300,400,500,700&display=swap">
  <style>
    :root {
      --bg: ${bodyBg};
      --text: ${textColor};
      --accent: ${accentColor};
      --surface: ${surfaceColor};
      --border: ${dividerColor};
    }
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body {
      background-color: var(--bg);
      color: var(--text);
      font-family: "${fontBody}", sans-serif;
      line-height: 1.6;
      padding: 40px 20px;
    }
    .container { max-width: 800px; margin: 0 auto; }
    header { border-bottom: 1px solid var(--border); padding-bottom: 30px; margin-bottom: 40px; }
    h1 { font-family: "${fontHeader}", sans-serif; font-size: 2.5rem; color: var(--text); font-weight: 700; margin-bottom: 5px; }
    .subtitle { color: var(--accent); font-size: 1.1rem; font-weight: 500; margin-bottom: 15px; }
    .contact-links { display: flex; flex-wrap: wrap; gap: 15px; font-size: 0.85rem; opacity: 0.8; }
    .contact-links a { color: var(--text); text-decoration: none; border-bottom: 1px solid var(--accent); }
    section { margin-bottom: 50px; }
    h2 { font-family: "${fontHeader}", sans-serif; font-size: 1.4rem; border-bottom: 1px solid var(--border); padding-bottom: 8px; margin-bottom: 20px; text-transform: uppercase; letter-spacing: 1px; color: var(--accent); }
    .card { background: var(--surface); border: 1px solid var(--border); border-radius: 8px; padding: 25px; margin-bottom: 20px; }
    .card-title { display: flex; justify-content: space-between; align-items: baseline; margin-bottom: 12px; }
    .card-title h3 { font-size: 1.15rem; color: var(--text); }
    .card-title .date { font-size: 0.8rem; opacity: 0.6; font-family: monospace; }
    .technologies { display: flex; flex-wrap: wrap; gap: 8px; margin-top: 15px; }
    .badge { font-size: 0.75rem; background: rgba(255,255,255,0.04); border: 1px solid var(--border); padding: 3px 10px; border-radius: 99px; }
    .skills-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(200px, 1fr)); gap: 20px; }
    .skill-cat h4 { font-size: 0.95rem; margin-bottom: 8px; color: var(--text); }
    .skill-list { opacity: 0.8; font-size: 0.85rem; }
  </style>
</head>
<body>
  <div class="container">
    <header>
      <h1>${resume.header.name}</h1>
      <div class="subtitle">${resume.header.title}</div>
      <div class="contact-links">
        <span>📍 ${resume.header.location}</span>
        ${resume.header.email ? `<a href="mailto:${resume.header.email}">📧 Email</a>` : ""}
        ${resume.header.linkedin ? `<a href="${resume.header.linkedin}" target="_blank">🔗 LinkedIn</a>` : ""}
        ${resume.header.website ? `<a href="${resume.header.website}" target="_blank">🌐 Website</a>` : ""}
      </div>
    </header>

    <section id="experience">
      <h2>Work Accomplishments</h2>
      ${resume.experiences.map(e => `
      <div class="card">
        <div class="card-title">
          <h3>${e.role} — <strong>${e.company}</strong></h3>
          <span class="date">${e.startDate} - ${e.current ? "Present" : e.endDate}</span>
        </div>
        <p style="white-space: pre-line; font-size: 0.9rem; opacity: 0.85;">${e.description}</p>
      </div>
      `).join("")}
    </section>

    <section id="projects">
      <h2>Featured Ventures</h2>
      <div style="display: grid; grid-template-columns: 1fr; gap: 20px;">
        ${resume.projects.map(p => `
        <div class="card" style="margin: 0;">
          <div class="card-title">
            <h3>${p.title}</h3>
            ${p.url ? `<a href="${p.url}" target="_blank" style="font-size: 0.8rem; color: var(--accent); text-decoration: none;">View Site ↗</a>` : ""}
          </div>
          <p style="font-size: 0.9rem; opacity: 0.85;">${p.description}</p>
          <div class="technologies">
            ${p.technologies.map(t => `<span class="badge">${t}</span>`).join("")}
          </div>
        </div>
        `).join("")}
      </div>
    </section>

    <section id="skills">
      <h2>Core Stack</h2>
      <div class="skills-grid">
        ${resume.skills.map(s => `
        <div class="skill-cat">
          <h4>${s.category}</h4>
          <p class="skill-list">${s.list.join(", ")}</p>
        </div>
        `).join("")}
      </div>
    </section>
  </div>
</body>
</html>`;
  };

  const handleCopyCode = () => {
    navigator.clipboard.writeText(generatePortfolioHTML());
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleCopyUrl = () => {
    navigator.clipboard.writeText("https://portfolio.resume.ai/jane-doe-principal");
    setCopiedUrl(true);
    setTimeout(() => setCopiedUrl(false), 2000);
  };

  const handleDownload = () => {
    const blob = new Blob([generatePortfolioHTML()], { type: "text/html;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `${resume.header.name.toLowerCase().replace(/\s+/g, "-")}-portfolio.html`;
    link.click();
  };

  return (
    <div className="flex flex-col lg:flex-row h-full w-full select-none overflow-hidden bg-luxury-bg">
      
      {/* Theme Studio Left controls */}
      <div className="w-full lg:w-[400px] border-r border-white/5 p-6 flex flex-col justify-between overflow-y-auto no-print bg-luxury-surface/25">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="p-1.5 rounded-lg bg-[#00FFB2]/10 text-neon-mint">
              <Sparkles className="w-4 h-4" />
            </span>
            <span className="text-xs font-mono text-neon-mint font-bold uppercase tracking-wider">PORTFOLIO DEPLOYER</span>
          </div>
          <h2 className="font-display text-2xl font-black text-white">Theme Sandbox</h2>
          <p className="text-xs text-text-muted mt-1 leading-relaxed">Instantly compile resume content trees into a single-file deployment template for server hosting.</p>

          <hr className="border-white/5 my-6" />

          {/* Theme Selector */}
          <div className="flex flex-col gap-3">
            <span className="text-[10px] font-mono text-text-muted uppercase tracking-widest">Select Portfolio Palette</span>
            <div className="flex flex-col gap-2.5">
              {THEMES.map((t) => (
                <button
                  key={t.id}
                  onClick={() => setSelectedTheme(t.id)}
                  className={`p-4 rounded-xl text-left border flex items-center justify-between transition-all ${selectedTheme === t.id ? "border-[#00FFB2] bg-white/5" : "border-white/5 bg-luxury-elevated hover:border-white/10"}`}
                >
                  <span className="text-xs font-bold text-white">{t.name}</span>
                  <div className="flex gap-1">
                    <span className="w-3.5 h-3.5 rounded bg-[#09090E]" />
                    <span className="w-3.5 h-3.5 rounded bg-[#00FFB2]" />
                    <span className="w-3.5 h-3.5 rounded bg-[#4F6EF7]" />
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Extra configs */}
          <div className="flex flex-col gap-4 mt-8">
            <span className="text-[10px] font-mono text-text-muted uppercase tracking-widest">Platform Integration Services</span>
            <div className="p-4 rounded-xl bg-luxury-elevated/40 border border-white/5 text-xs text-text-muted leading-relaxed">
              <span className="font-bold text-white block mb-1">🌍 Premium Domains Supported</span>
              Customize paths using custom CNAME hooks recursively with GitHub pages deployment templates.
            </div>
          </div>
        </div>

        {/* Action Triggers */}
        <div className="flex flex-col gap-3 mt-8 border-t border-white/5 pt-6">
          <button
            onClick={handleCopyCode}
            className="w-full py-3.5 rounded-xl border border-white/5 bg-luxury-elevated hover:bg-white/5 text-xs font-mono font-bold uppercase tracking-wider flex items-center justify-center gap-2 text-white active:scale-[97%] transition-all"
          >
            {copied ? (
              <>
                <Check className="w-4 h-4 text-neon-mint" /> Compiled! Copied Code
              </>
            ) : (
              <>
                <Code className="w-4 h-4 text-neon-mint" /> Copy HTML Script Code
              </>
            )}
          </button>
          
          <button
            onClick={handleDownload}
            className="w-full py-3.5 rounded-xl bg-neon-mint text-black font-mono font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 active:scale-[97%] transition-all hover:shadow-[0_0_20px_rgba(0,255,178,0.3)]"
          >
            <Download className="w-4 h-4" /> Download HTML Package
          </button>
        </div>
      </div>

      {/* Web Simulation Iframe Right Panel */}
      <div className="flex-1 flex flex-col h-full bg-luxury-bg p-6 relative overflow-hidden">
        {/* Browser Mockup Top Bar */}
        <div className="flex items-center justify-between bg-luxury-surface/80 rounded-t-2xl border-t border-x border-white/5 px-4 h-11 no-print">
          <div className="flex items-center gap-1.5 select-none">
            <span className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
            <span className="w-2.5 h-2.5 rounded-full bg-[#FFB347]/80" />
            <span className="w-2.5 h-2.5 rounded-full bg-neon-mint" />
          </div>
          
          {/* Simulated address bar */}
          <div className="bg-luxury-elevated/60 text-[10px] text-text-muted font-mono rounded-lg px-6 py-1 w-full max-w-sm text-center border border-white/5 flex items-center justify-center gap-1.5 select-all">
            <Globe className="w-3 h-3 text-neon-mint" /> https://portfolio.resume.ai/{resume.header.name.toLowerCase().replace(/\s+/g, "-")}
          </div>

          <button 
            onClick={handleCopyUrl}
            className="text-[10px] font-mono text-text-muted hover:text-white border border-white/5 bg-luxury-elevated px-2.5 py-1 rounded transition-colors flex items-center gap-1"
          >
            {copiedUrl ? <Check className="w-3 h-3 text-neon-mint" /> : <Copy className="w-3 h-3" />} Copy Link
          </button>
        </div>

        {/* Live Code Rendering Container */}
        <div className="flex-1 bg-neutral-900 border-x border-b border-white/5 rounded-b-2xl overflow-hidden relative">
          <iframe
            srcDoc={generatePortfolioHTML()}
            title="Portfolio Render Live Sandbox preview"
            className="w-full h-full border-none"
            sandbox="allow-scripts"
          />
        </div>
      </div>

    </div>
  );
}
