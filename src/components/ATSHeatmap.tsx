import React, { useState } from "react";
import { Sparkles, AlertCircle, CheckCircle, Flame, Layers, Award, BarChart3, TrendingUp, HelpCircle } from "lucide-react";

interface ATSHeatmapProps {
  resumeText: string;
  onPremiumTrigger: () => void;
}

export default function ATSHeatmap({ resumeText, onPremiumTrigger }: ATSHeatmapProps) {
  const [activeSegment, setActiveSegment] = useState<"heatmap" | "density" | "benchmark">("heatmap");

  // Mocked analytics data matching Jane Doe / Senior tech roles
  const heatmapKeywords = [
    { word: "stripe-ui-core", strength: "95%", hits: 3, matched: true, type: "Core Toolkit" },
    { word: "React Server Components", strength: "92%", hits: 2, matched: true, type: "Core Architecture" },
    { word: "micro-frontends", strength: "88%", hits: 1, matched: true, type: "Systems Alignment" },
    { word: "telemetry", strength: "85%", hits: 4, matched: true, type: "Performance Audit" },
    { word: "LCP performance", strength: "80%", hits: 2, matched: true, type: "Metrics" },
    { word: "Rust compilation", strength: "30%", hits: 0, matched: false, type: "Deficit" },
    { word: "distributed caching", strength: "20%", hits: 0, matched: false, type: "Deficit" },
    { word: "AWS CloudFormation", strength: "50%", hits: 1, matched: true, type: "Infrastructure" }
  ];

  const densities = [
    { keyword: "React / Next.js", density: "4.8%", count: 12, status: "Ideal (3%-5%)" },
    { keyword: "TypeScript", density: "3.6%", count: 9, status: "Ideal (3%-5%)" },
    { keyword: "Telemetry & Performance", density: "2.8%", count: 7, status: "Optimal (2%-4%)" },
    { keyword: "WebAssembly (Wasm)", density: "1.2%", count: 3, status: "Light (1%-2%)" },
    { keyword: "Docker & AWS Containers", density: "0.8%", count: 2, status: "Introduce More" }
  ];

  const benchmarkReport = {
    overallGrade: "A-",
    scoreRank: "Top 8%",
    strengthReport: [
      "✓ STAR framework perfectly mapped across all professional timelines.",
      "✓ Extremely high semantic action verb count (spearheaded, engineered, migrated, optimized).",
      "⚠️ Missing secondary tooling (Enterprise caching vectors like Redis/Memcached).",
      "✓ Academic Stanford degree perfectly correlates with advanced HCI core definitions."
    ]
  };

  return (
    <div className="flex flex-col gap-5 text-left bg-luxury-surface/30 rounded-2xl border border-white/5 p-5 animate-fade-in select-none">
      
      {/* Title */}
      <div className="flex justify-between items-start gap-4">
        <div>
          <span className="text-[10px] font-mono tracking-widest text-[#FFB347] font-semibold uppercase block flex items-center gap-1">
            <Flame className="w-3.5 h-3.5 fill-current animate-pulse text-semibold" /> Advanced ATS Compliance Center
          </span>
          <h3 className="font-display font-medium text-base text-white mt-1">Sieve Parser Simulator</h3>
        </div>
        <div className="text-right">
          <span className="text-[10px] font-mono text-text-muted">BENCHMARK GRADE</span>
          <div className="font-display font-black text-xl text-[#00FFB2]">{benchmarkReport.overallGrade} <span className="text-xs text-text-muted">({benchmarkReport.scoreRank})</span></div>
        </div>
      </div>

      {/* Tabs */}
      <div className="grid grid-cols-3 p-1 bg-[#0A0A0F] border border-white/5 rounded-xl text-xs select-none">
        {[
          { id: "heatmap", label: "Keyword Heatmap" },
          { id: "density", label: "Density Analysis" },
          { id: "benchmark", label: "Strength Report" }
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveSegment(tab.id as any)}
            className={`py-1.5 rounded-lg text-[10px] font-mono font-medium uppercase tracking-wider transition-all cursor-pointer ${
              activeSegment === tab.id ? "bg-[#00FFB2] text-black font-bold" : "text-text-muted hover:text-white"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* SEGMENT: HEATMAP */}
      {activeSegment === "heatmap" && (
        <div className="flex flex-col gap-4">
          <p className="text-[11px] text-text-muted">
            The heatmap simulates Greenhouse / Workday parsers. Blue/Green indicates highly matched keywords. Red specifies deficit vectors.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 max-h-48 overflow-y-auto pr-1">
            {heatmapKeywords.map((tag) => (
              <div 
                key={tag.word}
                className={`p-2.5 rounded-lg border text-xs flex justify-between items-center transition-all ${
                  tag.matched 
                    ? "bg-[#00FFB2]/5 border-[#00FFB2]/10" 
                    : "bg-red-950/10 border-red-900/10"
                }`}
              >
                <div>
                  <span className={`font-mono text-xs block ${tag.matched ? "text-white" : "text-red-400 line-through"}`}>
                    {tag.word}
                  </span>
                  <span className="text-[8px] font-mono text-text-muted tracking-wider uppercase block mt-0.5">{tag.type}</span>
                </div>
                <div className="text-right font-mono">
                  <span className={`text-[10px] font-bold block ${tag.matched ? "text-[#00FFB2]" : "text-red-400"}`}>
                    {tag.strength}
                  </span>
                  <span className="text-[8px] text-text-muted block">Found: {tag.hits}x</span>
                </div>
              </div>
            ))}
          </div>

          <div className="p-3.5 rounded-xl bg-orange-950/10 border border-orange-900/15 text-[10px] text-text-muted flex items-start gap-2 leading-relaxed">
            <AlertCircle className="w-4 h-4 text-[#FFB347] shrink-0 mt-0.5" />
            <div>
              <span className="text-[#FFB347] font-bold block">Keywords Deficiency Identified</span>
              Your resume misses key operational phrases like "distributed caching". Click "PRO Tailor" on the settings panel to automatically weave action metrics into your drafts.
            </div>
          </div>
        </div>
      )}

      {/* SEGMENT: DENSITY */}
      {activeSegment === "density" && (
        <div className="flex flex-col gap-3">
          <p className="text-[11px] text-text-muted leading-relaxed">
            Calculates how repetitive your phrases appear. Keyword stuffing limits are strictly monitored to keep you below standard algorithmic penalty thresholds.
          </p>

          <div className="flex flex-col gap-2">
            {densities.map((item) => (
              <div key={item.keyword} className="p-2.5 bg-[#0A0A0F] border border-white/5 rounded-xl flex justify-between items-center text-xs">
                <div>
                  <span className="font-medium text-white block">{item.keyword}</span>
                  <span className="text-[9px] font-mono text-text-muted">{item.status}</span>
                </div>
                <div className="text-right font-mono">
                  <span className="font-bold text-[#00FFB2] text-xs block">{item.density}</span>
                  <span className="text-[8px] text-text-muted block">{item.count} items found</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* SEGMENT: BENCHMARK */}
      {activeSegment === "benchmark" && (
        <div className="flex flex-col gap-3.5">
          <div className="p-3.5 rounded-xl bg-indigo-950/10 border border-indigo-900/15 text-xs text-text-muted flex flex-col gap-2">
            <span className="font-bold text-white block uppercase text-[10px] tracking-wide text-indigo-400 flex items-center gap-1">
              <Award className="w-4 h-4" /> Recruiter Strength Assessment Report
            </span>
            <div className="flex flex-col gap-2 p-1 font-sans text-xs leading-relaxed text-text-muted block">
              {benchmarkReport.strengthReport.map((str, idx) => (
                <div key={idx} className="block">{str}</div>
              ))}
            </div>
          </div>

          <button
            onClick={onPremiumTrigger}
            className="w-full py-2 bg-[#00FFB2]/10 hover:bg-[#00FFB2]/20 border border-[#00FFB2]/30 text-[#00FFB2] font-mono font-bold text-xs rounded-xl transition-all uppercase tracking-wide cursor-pointer text-center"
          >
            Download Strategic Match Report (PDF) →
          </button>
        </div>
      )}

    </div>
  );
}
