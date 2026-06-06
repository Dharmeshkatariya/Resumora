import React, { useState, useEffect } from "react";
import { Sliders, Check, Palette, FileText, Download, Upload, Trash2, Layout, Sparkles, AlertCircle } from "lucide-react";
import { ResumeStyles } from "../types";

interface ThemeStudioProps {
  styles: ResumeStyles & {
    lineHeight?: "compact" | "normal" | "comfortable";
    letterSpacing?: "tight" | "normal" | "wide";
    pageMargins?: "compact" | "normal" | "spacious";
    sectionLayout?: "single" | "grid" | "two-column";
    skillStyle?: "badges" | "bars" | "categories" | "tag-cloud";
  };
  onUpdateStyles: (styles: any) => void;
  onPremiumTrigger: () => void;
}

interface CustomSavedTheme {
  name: string;
  styles: any;
}

export default function ThemeStudio({ styles, onUpdateStyles, onPremiumTrigger }: ThemeStudioProps) {
  const [themeNameInput, setThemeNameInput] = useState("");
  const [savedThemes, setSavedThemes] = useState<CustomSavedTheme[]>([]);
  const [importString, setImportString] = useState("");
  const [showImportArea, setShowImportArea] = useState(false);
  const [exportNotification, setExportNotification] = useState(false);

  // Load saved themes on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem("resume_ai_custom_themes");
      if (stored) {
        setSavedThemes(JSON.parse(stored));
      } else {
        const defaults = [
          {
            name: "Golden Executive Elite",
            styles: {
              fontDisplay: "Playfair Display",
              fontBody: "Spectral",
              fontSizeScale: "normal",
              spacingScale: "normal",
              accentColor: "#D4AF37",
              borderRadius: "sharp",
              headerStyle: "luxury",
              dividerStyle: "gradient",
              showNumbering: false,
              iconStyle: "outline",
              lineHeight: "comfortable",
              letterSpacing: "wide",
              pageMargins: "normal",
              sectionLayout: "single",
              skillStyle: "tag-cloud"
            }
          },
          {
            name: "Silicon Amber Mono",
            styles: {
              fontDisplay: "Space Grotesk",
              fontBody: "JetBrains Mono",
              fontSizeScale: "compact",
              spacingScale: "compact",
              accentColor: "#FFB347",
              borderRadius: "sharp",
              headerStyle: "minimal",
              dividerStyle: "dots",
              showNumbering: true,
              iconStyle: "none",
              lineHeight: "compact",
              letterSpacing: "tight",
              pageMargins: "compact",
              sectionLayout: "single",
              skillStyle: "badges"
            }
          }
        ];
        setSavedThemes(defaults);
        localStorage.setItem("resume_ai_custom_themes", JSON.stringify(defaults));
      }
    } catch (e) {
      console.error("Local storage theme loading failed", e);
    }
  }, []);

  const handleSaveTheme = () => {
    if (!themeNameInput.trim()) return;
    const newTheme: CustomSavedTheme = {
      name: themeNameInput.trim(),
      styles: { ...styles }
    };
    const updated = [newTheme, ...savedThemes];
    setSavedThemes(updated);
    localStorage.setItem("resume_ai_custom_themes", JSON.stringify(updated));
    setThemeNameInput("");
  };

  const handleDeleteTheme = (index: number) => {
    const updated = [...savedThemes];
    updated.splice(index, 1);
    setSavedThemes(updated);
    localStorage.setItem("resume_ai_custom_themes", JSON.stringify(updated));
  };

  const handleApplyTheme = (theme: CustomSavedTheme) => {
    onUpdateStyles(theme.styles);
  };

  const handleExportTheme = () => {
    const configStr = btoa(JSON.stringify(styles));
    navigator.clipboard.writeText(configStr);
    setExportNotification(true);
    setTimeout(() => setExportNotification(false), 3000);
  };

  const handleImportTheme = () => {
    try {
      const decoded = JSON.parse(atob(importString.trim()));
      if (decoded && (decoded.fontDisplay || decoded.fontBody || decoded.accentColor)) {
        onUpdateStyles(decoded);
        setImportString("");
        setShowImportArea(false);
        // Save imported theme as a bookmark
        const newTheme: CustomSavedTheme = {
          name: "Imported Studio Preset " + (savedThemes.length + 1),
          styles: decoded
        };
        const updated = [newTheme, ...savedThemes];
        setSavedThemes(updated);
        localStorage.setItem("resume_ai_custom_themes", JSON.stringify(updated));
      } else {
        alert("Invalid theme key structure.");
      }
    } catch (err) {
      alert("Invalid base64 theme hash code string.");
    }
  };

  // Font choices catalog lists
  const headingsCatalog = ["Cabinet Grotesk", "Clash Display", "General Sans", "Space Grotesk", "Playfair Display", "IBM Plex Serif", "Inter"];
  const bodyCatalog = ["Satoshi", "Inter", "Geist", "Manrope", "Spectral", "IBM Plex Serif", "JetBrains Mono"];

  // Accent Colors list
  const accentsList = [
    { name: "Teal Green", value: "#0F766E" },
    { name: "Electric Blue", value: "#0066FF" },
    { name: "Linear Mint", value: "#00FFB2" },
    { name: "Sunset Gold", value: "#D4AF37" },
    { name: "Plum Magenta", value: "#D53F8C" },
    { name: "Crimson Red", value: "#E53E3E" },
    { name: "Charcoal Black", value: "#111111" },
    { name: "Royal Purple", value: "#805AD5" }
  ];

  return (
    <div className="flex flex-col gap-5 text-left bg-luxury-surface/30 rounded-2xl border border-white/5 p-5 animate-fade-in select-none max-h-full overflow-y-auto">
      <div>
        <span className="text-[10px] font-mono tracking-widest text-[#00FFB2] font-semibold uppercase block">THEME STUDIO v2.0</span>
        <h3 className="font-display font-medium text-lg text-white">Visual Design Engine</h3>
        <p className="text-xs text-text-muted mt-1 leading-relaxed">Direct absolute authority over typography pairing, border radii, line heights, and layout structures.</p>
      </div>

      {/* 1. COLOR AND SHADOW ACCENT */}
      <div className="flex flex-col gap-2.5">
        <span className="text-[9px] font-mono text-text-muted uppercase tracking-widest">Accent Palette</span>
        <div className="grid grid-cols-4 gap-1.5">
          {accentsList.map((acc) => {
            const isSelected = styles.accentColor === acc.value;
            return (
              <button
                key={acc.name}
                onClick={() => onUpdateStyles({ accentColor: acc.value })}
                className={`py-2 rounded-lg border text-[10px] font-medium font-mono text-center flex flex-col items-center justify-center gap-1 transition-all ${
                  isSelected ? "bg-white/5 border-[#00FFB2]" : "bg-[#0A0A0F] border-white/5 hover:border-white/10"
                }`}
              >
                <div 
                  className="w-4 h-4 rounded-full border border-white/10" 
                  style={{ backgroundColor: acc.value }} 
                />
                <span className="text-[9px] text-text-muted truncate max-w-full px-0.5">{acc.name}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* 2. TYPOGRAPHY CO-PILOT SYSTEM */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 mt-1 border-t border-white/5 pt-3.5">
        {/* Headings */}
        <div className="flex flex-col gap-1.5">
          <label className="text-[9px] font-mono text-text-muted uppercase tracking-widest">Display Headings</label>
          <select
            value={styles.fontDisplay}
            onChange={(e) => onUpdateStyles({ fontDisplay: e.target.value })}
            className="w-full bg-luxury-elevated border border-white/5 rounded-lg p-2.5 text-xs text-white uppercase tracking-wider font-mono font-semibold focus:outline-none focus:border-[#00FFB2]"
          >
            {headingsCatalog.map((f) => (
              <option key={f} value={f}>{f}</option>
            ))}
          </select>
        </div>

        {/* Body Text */}
        <div className="flex flex-col gap-1.5">
          <label className="text-[9px] font-mono text-text-muted uppercase tracking-widest">Body/Resume Font</label>
          <select
            value={styles.fontBody}
            onChange={(e) => onUpdateStyles({ fontBody: e.target.value })}
            className="w-full bg-luxury-elevated border border-white/5 rounded-lg p-2.5 text-xs text-text-muted font-mono focus:outline-none focus:border-[#00FFB2]"
          >
            {bodyCatalog.map((f) => (
              <option key={f} value={f}>{f}</option>
            ))}
          </select>
        </div>
      </div>

      {/* 3. LAYOUT GRID CONFIGURATIONS */}
      <div className="flex flex-col gap-3.5 mt-1 border-t border-white/5 pt-3.5">
        <span className="text-[9px] font-mono text-text-muted uppercase tracking-widest">Layout Architecture</span>
        <div className="grid grid-cols-3 p-1 bg-[#0A0A0F] border border-white/5 rounded-xl text-xs">
          {[
            { id: "single", label: "Single-Column" },
            { id: "two-column", label: "Two-Column" }
          ].map((lay) => (
            <button
              key={lay.id}
              onClick={() => onUpdateStyles({ sectionLayout: lay.id })}
              className={`py-1.5 rounded-lg text-[10px] font-mono font-medium uppercase tracking-wider transition-all cursor-pointer ${
                (styles.sectionLayout || "single") === lay.id ? "bg-indigo-accent text-white font-bold" : "text-text-muted hover:text-white"
              }`}
            >
              {lay.label}
            </button>
          ))}
          <button
            onClick={onPremiumTrigger}
            className="py-1.5 rounded-lg text-[10px] font-mono font-medium uppercase tracking-wider text-[#FFB347]/80 hover:text-white flex items-center justify-center gap-1 cursor-pointer"
          >
            <span>Hybrid</span> <span className="text-[8px] bg-amber-500/10 text-amber-300 font-bold px-1 rounded">PRO</span>
          </button>
        </div>
      </div>

      {/* 4. FINE-GRAINED SPACIAL MEASUREMENTS */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 border-t border-white/5 pt-3.5">
        
        {/* Line Height */}
        <div className="flex flex-col gap-1.5">
          <span className="text-[9px] font-mono text-text-muted uppercase tracking-widest">Line Spacing</span>
          <div className="grid grid-cols-3 p-0.5 bg-[#0A0A0F] border border-white/5 rounded-lg text-xs">
            {(["compact", "normal", "comfortable"] as const).map((lh) => (
              <button
                key={lh}
                onClick={() => onUpdateStyles({ lineHeight: lh })}
                className={`py-1 rounded text-[9px] font-mono font-medium uppercase tracking-wider transition-all cursor-pointer ${
                  (styles.lineHeight || "normal") === lh ? "bg-white/5 text-[#00FFB2]" : "text-text-muted hover:text-white"
                }`}
              >
                {lh.substring(0, 4)}
              </button>
            ))}
          </div>
        </div>

        {/* Letter Spacing */}
        <div className="flex flex-col gap-1.5">
          <span className="text-[9px] font-mono text-text-muted uppercase tracking-widest">Text Tracking</span>
          <div className="grid grid-cols-3 p-0.5 bg-[#0A0A0F] border border-white/5 rounded-lg text-xs">
            {(["tight", "normal", "wide"] as const).map((track) => (
              <button
                key={track}
                onClick={() => onUpdateStyles({ letterSpacing: track })}
                className={`py-1 rounded text-[9px] font-mono font-medium uppercase tracking-wider transition-all cursor-pointer ${
                  (styles.letterSpacing || "normal") === track ? "bg-white/5 text-[#00FFB2]" : "text-text-muted hover:text-white"
                }`}
              >
                {track.substring(0, 4)}
              </button>
            ))}
          </div>
        </div>

        {/* Page Margins */}
        <div className="flex flex-col gap-1.5">
          <span className="text-[9px] font-mono text-text-muted uppercase tracking-widest">Page Margins</span>
          <div className="grid grid-cols-3 p-0.5 bg-[#0A0A0F] border border-white/5 rounded-lg text-xs">
            {(["compact", "normal", "spacious"] as const).map((marg) => (
              <button
                key={marg}
                onClick={() => onUpdateStyles({ pageMargins: marg })}
                className={`py-1 rounded text-[9px] font-mono font-medium uppercase tracking-wider transition-all cursor-pointer ${
                  (styles.pageMargins || "normal") === marg ? "bg-white/5 text-[#00FFB2]" : "text-text-muted hover:text-white"
                }`}
              >
                {marg.substring(0, 4)}
              </button>
            ))}
          </div>
        </div>

      </div>

      {/* 5. VISUAL FLOURISH CONTROLS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 border-t border-white/5 pt-3.5">
        
        {/* Divider Style */}
        <div className="flex flex-col gap-1.5">
          <span className="text-[9px] font-mono text-text-muted uppercase tracking-widest">Divider Lines</span>
          <select
            value={styles.dividerStyle}
            onChange={(e) => onUpdateStyles({ dividerStyle: e.target.value })}
            className="w-full bg-[#0A0A0F] border border-white/5 rounded-lg p-2 text-xs text-text-muted focus:outline-none focus:border-[#00FFB2]"
          >
            <option value="line">Solid Line</option>
            <option value="dots">Dotted Row</option>
            <option value="gradient">Subtle Gradient</option>
            <option value="none">No Dividers</option>
          </select>
        </div>

        {/* Skill visual type */}
        <div className="flex flex-col gap-1.5">
          <span className="text-[9px] font-mono text-text-muted uppercase tracking-widest">Skill Elements</span>
          <select
            value={styles.skillStyle || "badges"}
            onChange={(e) => onUpdateStyles({ skillStyle: e.target.value })}
            className="w-full bg-[#0A0A0F] border border-white/5 rounded-lg p-2 text-xs text-text-muted focus:outline-none focus:border-[#00FFB2]"
          >
            <option value="badges">Filled Badges</option>
            <option value="bars">Metric Proficiency Bars</option>
            <option value="categories">Block Level Category Rows</option>
            <option value="tag-cloud">Unbordered Tag Cloud</option>
          </select>
        </div>

      </div>

      {/* 6. SAVING AND BOOKMARKING CUSTOM THEMES */}
      <div className="border-t border-white/5 pt-3.5 mt-1 flex flex-col gap-3">
        <span className="text-[9px] font-mono text-text-muted uppercase tracking-widest">Custom Presets Studio</span>
        
        <div className="flex gap-2">
          <input
            type="text"
            placeholder="Name your custom style configuration..."
            value={themeNameInput}
            onChange={(e) => setThemeNameInput(e.target.value)}
            className="flex-1 bg-[#0A0A0F] border border-white/5 rounded-xl px-3 py-1.5 text-xs text-white focus:outline-none focus:border-[#00FFB2]"
          />
          <button
            onClick={handleSaveTheme}
            disabled={!themeNameInput.trim()}
            className="px-3.5 py-1.5 rounded-xl bg-indigo-accent text-white font-mono text-xs hover:bg-opacity-90 disabled:opacity-30 transition-all cursor-pointer"
          >
            Save Style
          </button>
        </div>

        {/* Saved List */}
        {savedThemes.length > 0 && (
          <div className="flex flex-col gap-1.5 max-h-32 overflow-y-auto pr-1">
            {savedThemes.map((theme, i) => (
              <div 
                key={i} 
                className="p-2 rounded-lg bg-white/5 border border-white/10 flex items-center justify-between text-xs hover:border-indigo-accent/40"
              >
                <button
                  type="button"
                  onClick={() => handleApplyTheme(theme)}
                  className="font-mono text-white hover:text-[#00FFB2] text-left font-medium max-w-[200px] truncate"
                >
                  ⚜ {theme.name}
                </button>
                <div className="flex gap-2">
                  <button
                    onClick={() => {
                      onUpdateStyles(theme.styles);
                    }}
                    className="text-[10px] font-mono text-[#00FFB2] hover:underline"
                  >
                    Apply
                  </button>
                  <button 
                    onClick={() => handleDeleteTheme(i)}
                    className="text-red-400 hover:text-red-500"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* IMPORT / EXPORT THEME CODE */}
        <div className="flex items-center justify-between border-t border-white/5 pt-3 mt-1.5">
          <button
            onClick={() => setShowImportArea(!showImportArea)}
            className="text-[10px] font-mono text-text-muted hover:text-white flex items-center gap-1"
          >
            <Upload className="w-3.5 h-3.5" /> <span>Import Code Preset</span>
          </button>
          
          <button
            onClick={handleExportTheme}
            className="text-[10px] font-mono text-[#00FFB2] hover:underline flex items-center gap-1"
          >
            <Download className="w-3.5 h-3.5" /> <span>Export Current Config</span>
          </button>
        </div>

        {exportNotification && (
          <div className="p-2 rounded bg-indigo-accent/80 text-white font-mono text-[9px] tracking-wide uppercase text-center">
            ✓ Theme configuration data key copied to clipboard!
          </div>
        )}

        {showImportArea && (
          <div className="flex flex-col gap-1.5 p-3 rounded-lg bg-luxury-elevated border border-white/10 mt-1">
            <span className="text-[8px] font-mono text-text-muted uppercase">Paste Theme configuration Hash Node</span>
            <textarea
              rows={3}
              value={importString}
              onChange={(e) => setImportString(e.target.value)}
              className="w-full bg-[#0A0A0F] border border-white/5 rounded p-2 text-[10px] font-mono text-[#00FFB2] focus:outline-none"
              placeholder="Paste the hash code you previously exported..."
            />
            <div className="flex justify-end gap-1.5 mt-1">
              <button
                onClick={() => setShowImportArea(false)}
                className="px-2 py-1 rounded bg-[#0A0A0F] text-[9px] text-text-muted hover:text-white"
              >
                Cancel
              </button>
              <button
                onClick={handleImportTheme}
                disabled={!importString.trim()}
                className="px-2.5 py-1 rounded bg-[#00FFB2] text-black text-[9px] font-mono font-bold"
              >
                Apply Key
              </button>
            </div>
          </div>
        )}

      </div>

    </div>
  );
}
