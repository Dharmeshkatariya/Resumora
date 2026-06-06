import React from "react";
import { Sparkles, Layout, AlignLeft, AlignCenter, AlignRight, Image, Shield, Award, UserCheck, Star, Info } from "lucide-react";
import { ResumeHeader, ResumeStyles } from "../types";

interface HeaderBuilderProps {
  header: ResumeHeader;
  styles: any;
  onUpdateHeader: (field: string, value: string) => void;
  onUpdateStyles: (changes: any) => void;
}

export const HEADER_PRESETS = [
  { id: "modern", name: "Sleek Modern", description: "Clean grotesque titles with aligned icons." },
  { id: "executive", name: "Elite Executive", description: "Centered double-decker title with serif highlights." },
  { id: "luxury", name: "Prestige Luxury", description: "Playfair display typographic monogram overlay with golden stripes." },
  { id: "minimal", name: "ATS Minimalist", description: "Hairline inline values without decorative clutter." },
  { id: "startup", name: "Silicon Startup", description: "Compact text layout featuring a bold neon title badge." },
  { id: "designer", name: "Framer Designer", description: "Bold layout with asymmetrical side headings and designer monogram." },
  { id: "corporate", name: "Fortune Corporate", description: "Robust structured layout targeting large banks and multinationals." },
  { id: "creative", name: "Art Director", description: "Highly decorative left-aligned headers combined with custom labels." }
];

export default function HeaderBuilder({ header, styles, onUpdateHeader, onUpdateStyles }: HeaderBuilderProps) {
  const currentPresetId = styles.headerStyle || "modern";
  const alignment = styles.headerAlignment || "center";
  const showMonogram = styles.showMonogram ?? true;
  const showAvatar = styles.showAvatar ?? false;
  const avatarUrl = styles.avatarUrl || "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=120&fit=crop&auto=format";
  const customBadgeText = styles.customBadgeText || "STRATEGIC LEADERSHIP";
  const showCustomBadge = styles.showCustomBadge ?? false;

  return (
    <div className="flex flex-col gap-5 text-left bg-luxury-surface/30 rounded-2xl border border-white/5 p-5 animate-fade-in select-none">
      <div>
        <span className="text-[10px] font-mono tracking-widest text-[#00FFB2] font-semibold uppercase block">DESIGN STUDIO HUB</span>
        <h3 className="font-display font-medium text-lg text-white">Header Architect</h3>
        <p className="text-xs text-text-muted mt-1 leading-relaxed">Customize your name alignment, avatar images, premium branding badges and personal gold monograms.</p>
      </div>

      {/* 1. LAYOUT PRESETS */}
      <div className="flex flex-col gap-2">
        <label className="text-[9px] font-mono text-text-muted uppercase tracking-widest">Structural Header theme</label>
        <div className="grid grid-cols-2 gap-2 h-44 overflow-y-auto pr-1">
          {HEADER_PRESETS.map((preset) => (
            <button
              key={preset.id}
              onClick={() => onUpdateStyles({ headerStyle: preset.id })}
              className={`p-2.5 rounded-xl border text-left transition-all ${
                currentPresetId === preset.id 
                  ? "bg-luxury-elevated border-[#00FFB2]" 
                  : "bg-[#0A0A0F] border-white/5 hover:border-white/10"
              }`}
            >
              <div className="font-sans font-bold text-xs text-white block">{preset.name}</div>
              <p className="text-[10px] text-text-muted mt-1 leading-normal line-clamp-1">{preset.description}</p>
            </button>
          ))}
        </div>
      </div>

      {/* 2. ALIGNMENT CHOICES */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 border-t border-white/5 pt-3.5 mt-1.5">
        
        {/* Name alignment */}
        <div className="flex flex-col gap-2">
          <span className="text-[9px] font-mono text-text-muted uppercase tracking-widest">Title Alignment</span>
          <div className="flex p-0.5 bg-[#0A0A0F] border border-white/5 rounded-lg text-xs gap-1">
            {[
              { id: "left", icon: <AlignLeft className="w-3.5 h-3.5" /> },
              { id: "center", icon: <AlignCenter className="w-3.5 h-3.5" /> },
              { id: "right", icon: <AlignRight className="w-3.5 h-3.5" /> }
            ].map((align) => (
              <button
                key={align.id}
                onClick={() => onUpdateStyles({ headerAlignment: align.id })}
                className={`flex-1 py-1 rounded flex justify-center items-center transition-all cursor-pointer ${
                  alignment === align.id ? "bg-white/5 text-[#00FFB2]" : "text-text-muted hover:text-white"
                }`}
              >
                {align.icon}
              </button>
            ))}
          </div>
        </div>

        {/* Brand highlights */}
        <div className="flex flex-col gap-2">
          <span className="text-[9px] font-mono text-text-muted uppercase tracking-widest">Prestige Monogram</span>
          <div className="flex p-0.5 bg-[#0A0A0F] border border-white/5 rounded-lg text-xs gap-1">
            <button
              onClick={() => onUpdateStyles({ showMonogram: true })}
              className={`flex-1 py-1.5 rounded text-[10px] font-mono uppercase tracking-wider transition-all cursor-pointer ${
                showMonogram ? "bg-white/5 text-[#00FFB2] font-bold" : "text-text-muted hover:text-white"
              }`}
            >
              Active
            </button>
            <button
              onClick={() => onUpdateStyles({ showMonogram: false })}
              className={`flex-1 py-1.5 rounded text-[10px] font-mono uppercase tracking-wider transition-all cursor-pointer ${
                !showMonogram ? "bg-white/5 text-[#00FFB2] font-bold" : "text-text-muted hover:text-white"
              }`}
            >
              Hide
            </button>
          </div>
        </div>

      </div>

      {/* 3. AVATAR CONFIGURATOR */}
      <div className="flex flex-col gap-3.5 border-t border-white/5 pt-3.5 mt-1">
        <div className="flex justify-between items-center">
          <span className="text-[9px] font-mono text-text-muted uppercase tracking-widest">Avatar Image Photo</span>
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="show-avatar-toggle"
              checked={showAvatar}
              onChange={(e) => onUpdateStyles({ showAvatar: e.target.checked })}
              className="accent-[#00FFB2] cursor-pointer"
            />
            <label htmlFor="show-avatar-toggle" className="text-[10px] text-text-muted cursor-pointer">Include Photo</label>
          </div>
        </div>

        {showAvatar && (
          <div className="flex gap-3 items-center p-3 rounded-lg bg-[#00FFB2]/5 border border-[#00FFB2]/20 text-xs text-white">
            <img 
              src={avatarUrl} 
              alt="Resume user avatar sample" 
              className="w-12 h-12 rounded-full object-cover border-2 border-[#00FFB2]" 
              referrerPolicy="no-referrer"
            />
            <div className="flex flex-col gap-1.5 flex-1">
              <span className="text-[9px] font-mono text-text-muted uppercase">HTTP Custom Image URL</span>
              <input
                type="text"
                value={avatarUrl}
                onChange={(e) => onUpdateStyles({ avatarUrl: e.target.value })}
                className="w-full bg-[#0A0A0F] border border-white/5 rounded p-1.5 text-[10px] text-text-muted focus:outline-none focus:border-[#00FFB2]"
                placeholder="https://images.unsplash.com/photo-..."
              />
            </div>
          </div>
        )}
      </div>

      {/* 4. BRANDING BADGE */}
      <div className="flex flex-col gap-3.5 border-t border-white/5 pt-3.5 mt-1">
        <div className="flex justify-between items-center">
          <span className="text-[9px] font-mono text-text-muted uppercase tracking-widest">Personal Branding Badge</span>
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="show-badge-toggle"
              checked={showCustomBadge}
              onChange={(e) => onUpdateStyles({ showCustomBadge: e.target.checked })}
              className="accent-[#00FFB2] cursor-pointer"
            />
            <label htmlFor="show-badge-toggle" className="text-[10px] text-text-muted cursor-pointer">Include Custom Badge</label>
          </div>
        </div>

        {showCustomBadge && (
          <div className="flex flex-col gap-2 p-3 rounded-lg bg-luxury-elevated border border-white/10 mt-1">
            <label className="text-[9px] font-mono text-text-muted uppercase">Badge Text</label>
            <input
              type="text"
              value={customBadgeText}
              onChange={(e) => onUpdateStyles({ customBadgeText: e.target.value })}
              className="w-full bg-[#0A0A0F] border border-white/5 rounded p-2 text-xs text-white focus:outline-none focus:border-[#00FFB2]"
              placeholder="e.g. EXECUTIVE LEADERSHIP OR SENIOR ARCHITECT"
            />
          </div>
        )}
      </div>

    </div>
  );
}
