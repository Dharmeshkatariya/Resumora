import React, { useState } from "react";
import { Sparkles, Eye, Check, Search, Shield, Filter, Globe, Crown, Info } from "lucide-react";
import { ResumeStyles, ResumeData } from "../types";

export interface TemplatePreset {
  id: string;
  name: string;
  category: "Executive" | "Corporate" | "Technology" | "Creative" | "Modern" | "Minimal" | "Luxury";
  description: string;
  styles: Partial<ResumeStyles> & {
    lineHeight?: "compact" | "normal" | "comfortable";
    letterSpacing?: "tight" | "normal" | "wide";
    pageMargins?: "compact" | "normal" | "spacious";
    sectionLayout?: "single" | "grid" | "two-column";
    skillStyle?: "badges" | "bars" | "categories" | "tag-cloud";
  };
}

export const TEMPLATES_MARKETPLACE: TemplatePreset[] = [
  // Executive
  {
    id: "exec-ceo",
    name: "Avenue CEO Elite",
    category: "Executive",
    description: "Ultra-premium center-head design with high-end editorial details. Pairs Playfair Display headers with Satoshi body.",
    styles: {
      fontDisplay: "Playfair Display",
      fontBody: "Satoshi",
      borderRadius: "sharp",
      fontSizeScale: "normal",
      spacingScale: "normal",
      accentColor: "#D4AF37", // Amber gold
      dividerStyle: "line",
      headerStyle: "bold",
      iconStyle: "outline",
      lineHeight: "comfortable",
      letterSpacing: "normal",
      pageMargins: "normal",
      sectionLayout: "single",
      skillStyle: "categories"
    }
  },
  {
    id: "exec-vp",
    name: "Classic VP Finance",
    category: "Executive",
    description: "Traditional grid lines and structured double underlines. Tailored for corporate executives and senior investment bankers.",
    styles: {
      fontDisplay: "IBM Plex Serif",
      fontBody: "Inter",
      borderRadius: "sharp",
      fontSizeScale: "normal",
      spacingScale: "compact",
      accentColor: "#1A365D", // Navy
      dividerStyle: "line",
      headerStyle: "classic",
      iconStyle: "none",
      lineHeight: "normal",
      letterSpacing: "tight",
      pageMargins: "spacious",
      sectionLayout: "single",
      skillStyle: "badges"
    }
  },
  {
    id: "exec-director",
    name: "Director Premium",
    category: "Executive",
    description: "Deep luxury charcoal dividers with subtle headers, great for operations directors and vice presidents.",
    styles: {
      fontDisplay: "Cabinet Grotesk",
      fontBody: "Inter",
      borderRadius: "soft",
      fontSizeScale: "normal",
      spacingScale: "normal",
      accentColor: "#319795", 
      dividerStyle: "gradient",
      headerStyle: "modern",
      iconStyle: "outline",
      lineHeight: "comfortable",
      letterSpacing: "normal",
      pageMargins: "normal",
      sectionLayout: "single",
      skillStyle: "categories"
    }
  },
  {
    id: "exec-advisor",
    name: "Board Senior Advisor",
    category: "Executive",
    description: "Symmetric elegant layout with classic serif styling for corporate advisors and board consultants.",
    styles: {
      fontDisplay: "Spectral",
      fontBody: "Spectral",
      borderRadius: "sharp",
      fontSizeScale: "normal",
      spacingScale: "spacious",
      accentColor: "#2D3748",
      dividerStyle: "dots",
      headerStyle: "bold",
      iconStyle: "none",
      lineHeight: "comfortable",
      letterSpacing: "normal",
      pageMargins: "spacious",
      sectionLayout: "single",
      skillStyle: "tag-cloud"
    }
  },
  {
    id: "exec-strategy",
    name: "Stripe Strategy Elite",
    category: "Executive",
    description: "High impact corporate strategy layout with left key milestones column and electric blue accents.",
    styles: {
      fontDisplay: "General Sans",
      fontBody: "Satoshi",
      borderRadius: "soft",
      fontSizeScale: "normal",
      spacingScale: "normal",
      accentColor: "#0066FF",
      dividerStyle: "line",
      headerStyle: "classic",
      iconStyle: "filled",
      lineHeight: "normal",
      letterSpacing: "normal",
      pageMargins: "normal",
      sectionLayout: "single",
      skillStyle: "badges"
    }
  },

  // Corporate
  {
    id: "corp-analyst",
    name: "Synergy Financial Analyst",
    category: "Corporate",
    description: "Compact data dense grid layout prioritizing core statistical markers and regulatory timelines.",
    styles: {
      fontDisplay: "Inter",
      fontBody: "Inter",
      borderRadius: "sharp",
      fontSizeScale: "compact",
      spacingScale: "compact",
      accentColor: "#0F766E",
      dividerStyle: "line",
      headerStyle: "minimal",
      iconStyle: "none",
      lineHeight: "compact",
      letterSpacing: "tight",
      pageMargins: "compact",
      sectionLayout: "single",
      skillStyle: "badges"
    }
  },
  {
    id: "corp-hr",
    name: "Global Talent Director",
    category: "Corporate",
    description: "Welcoming warm tones, spacious structural layouts, focused on interpersonal metrics and team leadership.",
    styles: {
      fontDisplay: "Cabinet Grotesk",
      fontBody: "Manrope",
      borderRadius: "round",
      fontSizeScale: "normal",
      spacingScale: "normal",
      accentColor: "#E28743",
      dividerStyle: "gradient",
      headerStyle: "modern",
      iconStyle: "outline",
      lineHeight: "comfortable",
      letterSpacing: "normal",
      pageMargins: "normal",
      sectionLayout: "single",
      skillStyle: "tag-cloud"
    }
  },
  {
    id: "corp-ops",
    name: "Operations Logistics",
    category: "Corporate",
    description: "Structured block format emphasizing clear task chains and organizational impact factors.",
    styles: {
      fontDisplay: "General Sans",
      fontBody: "Inter",
      borderRadius: "soft",
      fontSizeScale: "normal",
      spacingScale: "compact",
      accentColor: "#4A5568",
      dividerStyle: "line",
      headerStyle: "classic",
      iconStyle: "filled",
      lineHeight: "normal",
      letterSpacing: "tight",
      pageMargins: "normal",
      sectionLayout: "single",
      skillStyle: "categories"
    }
  },
  {
    id: "corp-supply",
    name: "Global Supply Architect",
    category: "Corporate",
    description: "Clean hierarchical division with high contrast headers, great for complex corporate directories.",
    styles: {
      fontDisplay: "Inter",
      fontBody: "Manrope",
      borderRadius: "sharp",
      fontSizeScale: "normal",
      spacingScale: "normal",
      accentColor: "#2B6CB0",
      dividerStyle: "line",
      headerStyle: "corporate",
      iconStyle: "outline",
      lineHeight: "normal",
      letterSpacing: "normal",
      pageMargins: "normal",
      sectionLayout: "single",
      skillStyle: "bars"
    }
  },
  {
    id: "corp-legal",
    name: "Supreme Legal Counselor",
    category: "Corporate",
    description: "Elite conservative serif layout, strictly matching legal clerkship frameworks.",
    styles: {
      fontDisplay: "IBM Plex Serif",
      fontBody: "Spectral",
      borderRadius: "sharp",
      fontSizeScale: "normal",
      spacingScale: "normal",
      accentColor: "#000000",
      dividerStyle: "line",
      headerStyle: "classic",
      iconStyle: "none",
      lineHeight: "comfortable",
      letterSpacing: "normal",
      pageMargins: "spacious",
      sectionLayout: "single",
      skillStyle: "badges"
    }
  },

  // Tech
  {
    id: "tech-principal",
    name: "Raycast Principal Core",
    category: "Technology",
    description: "Futuristic dark ambient details, custom mono highlights, and crisp single-column outline bars.",
    styles: {
      fontDisplay: "Clash Display",
      fontBody: "Geist",
      borderRadius: "soft",
      fontSizeScale: "compact",
      spacingScale: "compact",
      accentColor: "#FF4F00", // Raycast Orange
      dividerStyle: "line",
      headerStyle: "modern",
      iconStyle: "outline",
      lineHeight: "normal",
      letterSpacing: "tight",
      pageMargins: "normal",
      sectionLayout: "single",
      skillStyle: "badges"
    }
  },
  {
    id: "tech-pm",
    name: "Linear Product Lead",
    category: "Technology",
    description: "Absolute design mastery, precise mathematical margins, custom timeline indicators, and premium mint badges.",
    styles: {
      fontDisplay: "Cabinet Grotesk",
      fontBody: "Satoshi",
      borderRadius: "soft",
      fontSizeScale: "normal",
      spacingScale: "compact",
      accentColor: "#00FFB2", // Linear Mint
      dividerStyle: "gradient",
      headerStyle: "startup",
      iconStyle: "outline",
      lineHeight: "comfortable",
      letterSpacing: "normal",
      pageMargins: "normal",
      sectionLayout: "single",
      skillStyle: "bars"
    }
  },
  {
    id: "tech-data",
    name: "Deep Science WebGL",
    category: "Technology",
    description: "Tech forward font spacing, explicit software tags, and direct code-repository linkages formatted beautifully.",
    styles: {
      fontDisplay: "Space Grotesk",
      fontBody: "JetBrains Mono",
      borderRadius: "sharp",
      fontSizeScale: "compact",
      spacingScale: "compact",
      accentColor: "#805AD5", 
      dividerStyle: "dots",
      headerStyle: "minimal",
      iconStyle: "filled",
      lineHeight: "compact",
      letterSpacing: "tight",
      pageMargins: "compact",
      sectionLayout: "single",
      skillStyle: "tag-cloud"
    }
  },
  {
    id: "tech-sre",
    name: "Infrastructure Devops",
    category: "Technology",
    description: "Horizontal grids representing massive systems architectural mastery and uptime milestones.",
    styles: {
      fontDisplay: "Space Grotesk",
      fontBody: "Geist Mono",
      borderRadius: "sharp",
      fontSizeScale: "compact",
      spacingScale: "compact",
      accentColor: "#319795",
      dividerStyle: "line",
      headerStyle: "modern",
      iconStyle: "outline",
      lineHeight: "compact",
      letterSpacing: "tight",
      pageMargins: "normal",
      sectionLayout: "single",
      skillStyle: "categories"
    }
  },
  {
    id: "tech-ai",
    name: "OpenAI Lab Fellowship",
    category: "Technology",
    description: "Sleek sans-serif layout optimized for machine learning achievements, math indices, and paper publications.",
    styles: {
      fontDisplay: "General Sans",
      fontBody: "Geist",
      borderRadius: "round",
      fontSizeScale: "normal",
      spacingScale: "normal",
      accentColor: "#10a37f", // ChatGPT Green
      dividerStyle: "line",
      headerStyle: "minimal",
      iconStyle: "none",
      lineHeight: "normal",
      letterSpacing: "normal",
      pageMargins: "normal",
      sectionLayout: "single",
      skillStyle: "badges"
    }
  },

  // Creative
  {
    id: "creative-ui",
    name: "Framer Canvas Master",
    category: "Creative",
    description: "Two-column design styled with bold mint bullet markers, custom social badging, and elegant headings.",
    styles: {
      fontDisplay: "Clash Display",
      fontBody: "Satoshi",
      borderRadius: "round",
      fontSizeScale: "normal",
      spacingScale: "normal",
      accentColor: "#D53F8C", // Magenta
      dividerStyle: "gradient",
      headerStyle: "designer",
      iconStyle: "outline",
      lineHeight: "comfortable",
      letterSpacing: "normal",
      pageMargins: "normal",
      sectionLayout: "two-column",
      skillStyle: "tag-cloud"
    }
  },
  {
    id: "creative-art",
    name: "Art Director Editorial",
    category: "Creative",
    description: "Asymmetric layout with rich decorative backgrounds, high contrast section headers and display fonts.",
    styles: {
      fontDisplay: "Cabinet Grotesk",
      fontBody: "Manrope",
      borderRadius: "soft",
      fontSizeScale: "normal",
      spacingScale: "normal",
      accentColor: "#E53E3E",
      dividerStyle: "line",
      headerStyle: "creative",
      iconStyle: "filled",
      lineHeight: "comfortable",
      letterSpacing: "wide",
      pageMargins: "normal",
      sectionLayout: "two-column",
      skillStyle: "badges"
    }
  },
  {
    id: "creative-copy",
    name: "Editorial Columnist",
    category: "Creative",
    description: "Sober minimalist layout for writers, copy directors, and content strategists. Rich editorial font pairings.",
    styles: {
      fontDisplay: "Playfair Display",
      fontBody: "Spectral",
      borderRadius: "sharp",
      fontSizeScale: "normal",
      spacingScale: "spacious",
      accentColor: "#4A5568",
      dividerStyle: "none",
      headerStyle: "bold",
      iconStyle: "none",
      lineHeight: "comfortable",
      letterSpacing: "wide",
      pageMargins: "spacious",
      sectionLayout: "single",
      skillStyle: "tag-cloud"
    }
  },
  {
    id: "creative-illustrator",
    name: "Neo-Classic Branding",
    category: "Creative",
    description: "Playful layout with color-washed headings, designed to highlight visual portfolios and client accolades.",
    styles: {
      fontDisplay: "Clash Display",
      fontBody: "Manrope",
      borderRadius: "round",
      fontSizeScale: "normal",
      spacingScale: "normal",
      accentColor: "#DD6B20",
      dividerStyle: "dots",
      headerStyle: "creative",
      iconStyle: "outline",
      lineHeight: "normal",
      letterSpacing: "normal",
      pageMargins: "normal",
      sectionLayout: "two-column",
      skillStyle: "badges"
    }
  },

  // Modern
  {
    id: "mod-founder",
    name: "Arc Startup Builder",
    category: "Modern",
    description: "Clean borders mimicking the Arc Browser tabs. Rounded corners and high contrast neon tabs.",
    styles: {
      fontDisplay: "Cabinet Grotesk",
      fontBody: "Satoshi",
      borderRadius: "round",
      fontSizeScale: "normal",
      spacingScale: "normal",
      accentColor: "#4F6EF7",
      dividerStyle: "gradient",
      headerStyle: "startup",
      iconStyle: "filled",
      lineHeight: "normal",
      letterSpacing: "normal",
      pageMargins: "normal",
      sectionLayout: "single",
      skillStyle: "bars"
    }
  },
  {
    id: "mod-crypto",
    name: "Sovereign Web3 Core",
    category: "Modern",
    description: "Cyberpunk aesthetic with electric purple details and dark monospace layouts.",
    styles: {
      fontDisplay: "Space Grotesk",
      fontBody: "Geist Mono",
      borderRadius: "sharp",
      fontSizeScale: "compact",
      spacingScale: "compact",
      accentColor: "#9F7AEA",
      dividerStyle: "line",
      headerStyle: "modern",
      iconStyle: "outline",
      lineHeight: "compact",
      letterSpacing: "tight",
      pageMargins: "compact",
      sectionLayout: "single",
      skillStyle: "badges"
    }
  },
  {
    id: "mod-biotech",
    name: "Genomic Labs Biotech",
    category: "Modern",
    description: "Green accents, scientific structure, showing research credentials alongside patent lists.",
    styles: {
      fontDisplay: "General Sans",
      fontBody: "Inter",
      borderRadius: "soft",
      fontSizeScale: "normal",
      spacingScale: "normal",
      accentColor: "#38A169",
      dividerStyle: "line",
      headerStyle: "corporate",
      iconStyle: "outline",
      lineHeight: "normal",
      letterSpacing: "normal",
      pageMargins: "normal",
      sectionLayout: "single",
      skillStyle: "categories"
    }
  },

  // Minimal
  {
    id: "min-ats-safe",
    name: "Gold Standard ATS",
    category: "Minimal",
    description: "Strict minimalist format 100% compliant with standard corporate ATS parsers (Taleo, Greenhouse).",
    styles: {
      fontDisplay: "Inter",
      fontBody: "Inter",
      borderRadius: "sharp",
      fontSizeScale: "normal",
      spacingScale: "compact",
      accentColor: "#000000",
      dividerStyle: "line",
      headerStyle: "minimal",
      iconStyle: "none",
      lineHeight: "normal",
      letterSpacing: "tight",
      pageMargins: "normal",
      sectionLayout: "single",
      skillStyle: "badges"
    }
  },
  {
    id: "min-one-page",
    name: "Prestige One-Page Slim",
    category: "Minimal",
    description: "Super dense layout engineered to condense extensive histories onto a single elegant page.",
    styles: {
      fontDisplay: "General Sans",
      fontBody: "Satoshi",
      borderRadius: "sharp",
      fontSizeScale: "compact",
      spacingScale: "compact",
      accentColor: "#2D3748",
      dividerStyle: "none",
      headerStyle: "minimal",
      iconStyle: "none",
      lineHeight: "compact",
      letterSpacing: "tight",
      pageMargins: "compact",
      sectionLayout: "single",
      skillStyle: "badges"
    }
  },
  {
    id: "min-classic",
    name: "Aesthetic Grotesque",
    category: "Minimal",
    description: "Subtle neutral coloring, clean typography, dynamic spacing with a spacious, content-first layout.",
    styles: {
      fontDisplay: "Inter",
      fontBody: "Inter",
      borderRadius: "soft",
      fontSizeScale: "normal",
      spacingScale: "normal",
      accentColor: "#718096",
      dividerStyle: "line",
      headerStyle: "classic",
      iconStyle: "outline",
      lineHeight: "comfortable",
      letterSpacing: "normal",
      pageMargins: "normal",
      sectionLayout: "single",
      skillStyle: "tag-cloud"
    }
  },

  // Luxury
  {
    id: "lux-fashion",
    name: "Haute Couture Editorial",
    category: "Luxury",
    description: "Stunning bold typographic hierarchy, golden separators, and luxurious margins optimized for senior roles.",
    styles: {
      fontDisplay: "Playfair Display",
      fontBody: "Spectral",
      borderRadius: "sharp",
      fontSizeScale: "normal",
      spacingScale: "spacious",
      accentColor: "#B7791F",
      dividerStyle: "gradient",
      headerStyle: "luxury",
      iconStyle: "outline",
      lineHeight: "comfortable",
      letterSpacing: "wide",
      pageMargins: "spacious",
      sectionLayout: "single",
      skillStyle: "tag-cloud"
    }
  },
  {
    id: "lux-mag",
    name: "Harpers Premium Quarterly",
    category: "Luxury",
    description: "Elegant serif columns combined with hairline borders. Emulates luxury magazine layout layouts.",
    styles: {
      fontDisplay: "Playfair Display",
      fontBody: "IBM Plex Serif",
      borderRadius: "sharp",
      fontSizeScale: "normal",
      spacingScale: "normal",
      accentColor: "#1A202C",
      dividerStyle: "line",
      headerStyle: "luxury",
      iconStyle: "none",
      lineHeight: "comfortable",
      letterSpacing: "wide",
      pageMargins: "normal",
      sectionLayout: "two-column",
      skillStyle: "categories"
    }
  },
  {
    id: "lux-arch",
    name: "Architectural Monolith",
    category: "Luxury",
    description: "Industrial grid design with absolute structural alignments, thick vertical highlights and spacious titles.",
    styles: {
      fontDisplay: "Cabinet Grotesk",
      fontBody: "Satoshi",
      borderRadius: "sharp",
      fontSizeScale: "normal",
      spacingScale: "generous",
      accentColor: "#111111",
      dividerStyle: "line",
      headerStyle: "bold",
      iconStyle: "filled",
      lineHeight: "comfortable",
      letterSpacing: "wide",
      pageMargins: "spacious",
      sectionLayout: "single",
      skillStyle: "bars"
    }
  }
];

interface TemplateMarketplaceProps {
  currentTemplateId: string;
  onSelectTemplate: (styles: Partial<ResumeStyles> & { id: string }) => void;
}

export default function TemplateMarketplace({ currentTemplateId, onSelectTemplate }: TemplateMarketplaceProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState<string>("");

  const categories = ["All", "Executive", "Corporate", "Technology", "Creative", "Modern", "Minimal", "Luxury"];

  const filtered = TEMPLATES_MARKETPLACE.filter(item => {
    const matchesCategory = selectedCategory === "All" || item.category === selectedCategory;
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          item.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="flex flex-col gap-6 select-none bg-luxury-surface/40 rounded-2xl border border-white/5 p-6 h-full overflow-hidden">
      
      {/* Header and Search */}
      <div className="flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <div>
            <span className="text-[10px] font-mono tracking-widest text-[#00FFB2] font-semibold uppercase block">PREMIUM DESIGN LABS</span>
            <h3 className="font-display font-bold text-lg text-white">Template Marketplace</h3>
          </div>
          <div className="flex items-center gap-1.5 px-3 py-1 bg-[#10a37f]/10 border border-[#10a37f]/30 rounded-full font-mono text-[10px] text-[#00FFB2]">
            <Crown className="w-3.5 h-3.5" /> <span>30+ Active Layouts</span>
          </div>
        </div>

        <p className="text-xs text-text-muted">
          Redesign your entire resume layout instantly. All inputs are completely preserved. Ideal for targeting multiple corporate or creative job families.
        </p>

        {/* Search input with premium glassmorphism */}
        <div className="relative">
          <Search className="w-4 h-4 text-text-muted absolute left-3.5 top-1/2 transform -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search premium styles (e.g. CEO, Linear, Raycast)..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-luxury-elevated border border-white/5 rounded-xl pl-10 pr-4 py-2.5 text-xs text-white placeholder-text-muted/60 focus:outline-none focus:border-[#00FFB2] transition-colors"
          />
        </div>

        {/* Categories Slices Scrollable */}
        <div className="flex flex-wrap gap-1.5 overflow-x-auto pb-1 scrollbar-none">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-lg text-xs font-mono font-medium transition-all cursor-pointer ${
                selectedCategory === cat
                  ? "bg-[#00FFB2] text-black font-bold shadow-[0_0_12px_rgba(0,255,178,0.25)]"
                  : "bg-white/5 text-text-muted hover:text-white border border-white/5 hover:border-white/10"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Grid of presets */}
      <div className="flex-1 overflow-y-auto pr-1 flex flex-col gap-3 min-h-[300px]">
        {filtered.length === 0 ? (
          <div className="flex flex-col items-center justify-center p-8 text-center border border-dashed border-white/5 rounded-xl text-text-muted">
            <Info className="w-6 h-6 mb-2 text-[#FFB347]" />
            <span className="text-xs font-mono">No elite presets match your filtering criteria.</span>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {filtered.map((item) => {
              const isSelected = currentTemplateId === item.id;
              return (
                <div
                  key={item.id}
                  onClick={() => onSelectTemplate({ id: item.id, ...item.styles })}
                  className={`p-4 rounded-xl border text-left cursor-pointer transition-all duration-300 relative overflow-hidden group flex flex-col justify-between h-36 ${
                    isSelected 
                      ? "bg-luxury-elevated border-[#00FFB2] shadow-[0_0_15px_rgba(0,255,178,0.06)]" 
                      : "bg-[#0A0A0F] border-white/5 hover:border-white/15 hover:bg-luxury-surface/60"
                  }`}
                >
                  {/* Status Indicator */}
                  {isSelected && (
                    <div className="absolute top-0 right-0 p-1 bg-[#00FFB2] text-black rounded-bl-lg">
                      <Check className="w-3 h-3 font-black" />
                    </div>
                  )}

                  <div>
                    <div className="flex items-center gap-1.5">
                      <span className="text-xs font-bold text-white group-hover:text-[#00FFB2] transition-colors">{item.name}</span>
                      <span className="text-[8px] px-1.5 py-0.5 rounded-md bg-white/5 border border-white/10 font-mono text-text-muted">{item.category}</span>
                    </div>

                    <p className="text-[11px] text-text-muted line-clamp-2 mt-2 leading-relaxed">
                      {item.description}
                    </p>
                  </div>

                  <div className="text-[9px] font-mono text-text-muted/70 flex items-center gap-1 border-t border-white/5 pt-2.5 mt-2 justify-between">
                    <span>{item.styles.fontDisplay} / {item.styles.fontBody}</span>
                    <span className="opacity-0 group-hover:opacity-100 transition-opacity text-[#00FFB2] font-bold">Apply Style →</span>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

    </div>
  );
}
