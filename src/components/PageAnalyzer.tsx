import React, { useMemo } from "react";
import { Sparkles, AlertCircle, CheckCircle, BarChart, Sliders, Layout, Info } from "lucide-react";
import { ResumeData } from "../types";

interface PageAnalyzerProps {
  resume: ResumeData;
  styles: any;
}

export default function PageAnalyzer({ resume, styles }: PageAnalyzerProps) {
  
  // Calculate analytics in real-time based on resume data & selected styles
  const analysis = useMemo(() => {
    // Estimations of content weight
    let charCount = 0;
    charCount += resume.header.name.length;
    charCount += resume.header.title.length;
    
    resume.experiences.forEach(e => {
      charCount += e.company.length + e.role.length + e.description.length;
    });
    resume.educations.forEach(edu => {
      charCount += edu.school.length + edu.degree.length + edu.fieldOfStudy.length;
    });
    resume.skills.forEach(s => {
      charCount += s.category.length + s.list.join("").length;
    });
    resume.projects.forEach(p => {
      charCount += p.title.length + p.description.length;
    });

    const isTwoColumn = styles.sectionLayout === "two-column";
    const isCompactMargins = styles.pageMargins === "compact";
    const isSpaciousMargins = styles.pageMargins === "spacious";
    const isComfortableLineHeight = styles.lineHeight === "comfortable";
    const isCompactLineHeight = styles.lineHeight === "compact";

    // 1. Page Overflow Risk Model
    // A standard A4 page comfortable capacity is approx 2200-2600 characters depending on layout.
    let capacityThreshold = 2400;
    if (isTwoColumn) capacityThreshold += 300; // dual col squeezes structure
    if (isCompactMargins) capacityThreshold += 400; // compact margins gain room
    if (isSpaciousMargins) capacityThreshold -= 400; // spacious margins lose room
    if (isComfortableLineHeight) capacityThreshold -= 300; // looser spacing reduces text ceiling
    if (isCompactLineHeight) capacityThreshold += 350;

    const fillRatio = charCount / capacityThreshold;
    const overflowRisk = fillRatio > 1.15 ? "Critical (Multiple Pages likely)" : fillRatio > 0.98 ? "Moderate (Single-Page Edge)" : "Low (Optimal Single-Page)";
    const riskColor = fillRatio > 1.15 ? "text-[#FF6B6B]" : fillRatio > 0.98 ? "text-[#FFB347]" : "text-[#00FFB2]";

    // 2. White Space Score
    let whiteSpaceScore = 80;
    if (fillRatio > 1.0) whiteSpaceScore -= (fillRatio - 1.0) * 80;
    if (isSpaciousMargins) whiteSpaceScore += 8;
    if (isCompactMargins) whiteSpaceScore -= 10;
    if (styles.spacingScale === "generous") whiteSpaceScore += 6;
    if (styles.spacingScale === "compact") whiteSpaceScore -= 8;
    whiteSpaceScore = Math.max(15, Math.min(100, Math.round(whiteSpaceScore)));

    // 3. Readability Score
    let readabilityScore = 88;
    if (styles.fontBody === "JetBrains Mono" || styles.fontBody === "Geist Mono") readabilityScore -= 10; // mono harder for resumes
    if (isComfortableLineHeight) readabilityScore += 5;
    if (isCompactLineHeight) readabilityScore -= 12; // too dense is hard to scan
    if (resume.experiences.some(e => e.description.length > 400)) readabilityScore -= 8; // long blocks hurt readability
    readabilityScore = Math.max(30, Math.min(100, Math.round(readabilityScore)));

    // 4. Visual Balance Score
    let balanceScore = 90;
    if (styles.headerAlignment === "center" && isTwoColumn) balanceScore -= 10; // misaligned aesthetic
    if (resume.experiences.length < 2) balanceScore -= 15; // sparse corporate history
    if (resume.skills.length === 0) balanceScore -= 20;
    balanceScore = Math.max(40, Math.min(100, Math.round(balanceScore)));

    // 5. Overall Density Score
    const densityVal = Math.round(fillRatio * 100);

    return {
      charCount,
      overflowRisk,
      riskColor,
      fillRatio,
      densityVal,
      whiteSpaceScore,
      readabilityScore,
      balanceScore
    };
  }, [resume, styles]);

  return (
    <div className="flex flex-col gap-4 text-left bg-luxury-surface/30 rounded-2xl border border-white/5 p-5 animate-fade-in select-none">
      <div>
        <span className="text-[10px] font-mono tracking-widest text-[#00FFB2] font-semibold uppercase block font-sans">LIVE PAGE ANALYZER v1.2</span>
        <h4 className="font-display font-medium text-sm text-white">Interactive Document Diagnostics</h4>
      </div>

      <div className="flex flex-col gap-3.5 mt-1">
        
        {/* 1. Page Overflow Alarm Gauge */}
        <div className="p-3.5 rounded-xl bg-[#0A0A0F] border border-white/5">
          <div className="flex justify-between items-center mb-1">
            <span className="text-[10px] font-mono text-text-muted uppercase">A4 Sheet Overflow Risk</span>
            <span className={`text-[10px] font-mono font-bold uppercase ${analysis.riskColor}`}>
              {analysis.overflowRisk}
            </span>
          </div>
          <div className="w-full bg-white/5 h-2 rounded-full overflow-hidden mt-1.5">
            <div 
              className="h-full rounded-full transition-all duration-700 ease-out"
              style={{ 
                width: `${Math.min(100, analysis.densityVal)}%`,
                backgroundColor: analysis.fillRatio > 1.15 ? "#FF6B6B" : analysis.fillRatio > 0.98 ? "#FFB347" : "#00FFB2"
              }}
            />
          </div>
          <div className="flex justify-between mt-1 text-[8px] font-mono text-text-muted/60">
            <span>Empty Draft</span>
            <span>Optimal (85% - 95%)</span>
            <span>Over Capacity 2+ Pages</span>
          </div>
        </div>

        {/* 2. Visual Scores Grid */}
        <div className="grid grid-cols-3 gap-2.5">
          
          {/* Readability */}
          <div className="p-3 bg-[#0A0A0F] border border-white/5 rounded-xl text-center">
            <span className="text-[9px] font-mono text-text-muted block uppercase">Readability</span>
            <span className="text-xl font-black text-white font-display block mt-1">{analysis.readabilityScore}%</span>
            <span className="text-[8px] font-mono text-[#00FFB2] block mt-0.5">Scanned Score</span>
          </div>

          {/* White Space */}
          <div className="p-3 bg-[#0A0A0F] border border-white/5 rounded-xl text-center">
            <span className="text-[9px] font-mono text-text-muted block uppercase">White Space</span>
            <span className="text-xl font-black text-white font-display block mt-1">{analysis.whiteSpaceScore}%</span>
            <span className="text-[8px] font-mono text-[#4F6EF7] block mt-0.5">Spatial Score</span>
          </div>

          {/* Visual balance */}
          <div className="p-3 bg-[#0A0A0F] border border-white/5 rounded-xl text-center">
            <span className="text-[9px] font-mono text-text-muted block uppercase">Balance</span>
            <span className="text-xl font-black text-white font-display block mt-1">{analysis.balanceScore}%</span>
            <span className="text-[8px] font-mono text-[#FFB347] block mt-0.5">Symmetry Score</span>
          </div>

        </div>

        {/* Suggestions Alerts */}
        <div className="p-3 rounded-lg border border-white/5 bg-luxury-elevated/40 text-[10px] text-text-muted leading-relaxed flex items-start gap-2">
          <Info className="w-4 h-4 text-[#00FFB2] shrink-0 mt-0.5" />
          <div>
            {analysis.fillRatio > 1.15 ? (
              <span className="text-[#FF6B6B] font-bold block mb-0.5">🚨 Action Required: Reduce Text</span>
            ) : analysis.fillRatio > 0.98 ? (
              <span className="text-[#FFB347] font-bold block mb-0.5">⚠️ Spacing Alert: Consider Compact Mode</span>
            ) : (
              <span className="text-[#00FFB2] font-bold block mb-0.5">✓ Layout Metrics Harmonized</span>
            )}
            {analysis.fillRatio > 1.15 
              ? "Your content exceeds standard sheet lengths. Set margins to 'compact' or line height to 'compact' to avoid trailing paragraph drops."
              : "Your typography alignment maps beautifully onto single pages. Try toggle theme styles to find alternative display pairs."}
          </div>
        </div>

      </div>

    </div>
  );
}
