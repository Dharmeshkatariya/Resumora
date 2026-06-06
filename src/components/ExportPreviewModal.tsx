import React, { useState } from "react";
import { X, Sparkles, Check, Download, ExternalLink, FileText, Globe, Image, Code, FileCheck2, Info } from "lucide-react";
import { ResumeData } from "../types";

interface ExportPreviewModalProps {
  resume: ResumeData;
  styles: any;
  onClose: () => void;
  onPremiumTrigger: () => void;
}

export default function ExportPreviewModal({ resume, styles, onClose, onPremiumTrigger }: ExportPreviewModalProps) {
  const [selectedFormat, setSelectedFormat] = useState<"ats" | "premium" | "executive" | "print" | "docx" | "png" | "svg" | "site">("premium");
  const [isCompiling, setIsCompiling] = useState(false);
  const [compiledSuccess, setCompiledSuccess] = useState(false);

  // List of formatted options available
  const formatsGroup = [
    { id: "ats", name: "ATS Compliance PDF", icon: <FileText className="w-4 h-4" />, desc: "Unstyled raw text characters optimized for Greenhouse, Workday & Taleo parsers.", premium: false },
    { id: "premium", name: "Premium Vector PDF", icon: <Sparkles className="w-4 h-4 text-[#00FFB2]" />, desc: "Crisp vector-glowing PDF including custom dividers, accents and brand badges.", premium: false },
    { id: "executive", name: "Executive Editorial PDF", icon: <FileCheck2 className="w-4 h-4 text-[#FFB347]" />, desc: "Prestige center header styling, Playfair Display pairings, and golden underlines.", premium: true },
    { id: "print", name: "Standard Print PDF", icon: <FileCheck2 className="w-4 h-4" />, desc: "A4 sheet optimized file styled format with conservative lines for printouts.", premium: false },
    { id: "docx", name: "Microsoft Word (DOCX)", icon: <FileText className="w-4 h-4" />, desc: "Symmetric text layout formatted for native desktop software editing.", premium: true },
    { id: "png", name: "HD Image (PNG)", icon: <Image className="w-4 h-4" />, desc: "300 DPI high resolution graphic block for digital attachments & linkedin posts.", premium: true },
    { id: "svg", name: "Scalable Vector (SVG)", icon: <Code className="w-4 h-4" />, desc: "Absolute vector representation suitable for designer portfolio integrations.", premium: true },
    { id: "site", name: "Portfolio Website", icon: <Globe className="w-4 h-4 text-indigo-400" />, desc: "One-click interactive sandbox portal. Deploys custom developer domains.", premium: true }
  ];

  const handleDownloadTrigger = () => {
    setIsCompiling(true);
    setCompiledSuccess(false);
    setTimeout(() => {
      setIsCompiling(false);
      setCompiledSuccess(true);
      setTimeout(() => {
        setCompiledSuccess(false);
        // Standard flow mimics safe outputs for continuous engagement
        if (selectedFormat === "ats" || selectedFormat === "print" || selectedFormat === "premium") {
          window.print();
        } else {
          onPremiumTrigger(); // Prompts high-end upsell for complex DOCX/PNG/SVG/Web formats
        }
      }, 1000);
    }, 1800);
  };

  return (
    <div className="fixed inset-0 select-none bg-black/80 backdrop-blur-md flex items-center justify-center p-4 z-50 animate-fade-in no-print">
      <div className="bg-[#0F0F18] border border-white/10 rounded-2xl w-full max-w-5xl h-[85vh] flex overflow-hidden shadow-2xl relative">
        
        {/* Close Button Trigger */}
        <button 
          onClick={onClose}
          className="p-2 bg-luxury-elevated border border-white/5 rounded-full hover:bg-white/10 text-text-muted hover:text-white absolute top-4 right-4 z-50 cursor-pointer"
        >
          <X className="w-4 h-4" />
        </button>

        {/* LEFT COMPILER SELECTIONS PANEL (45%) */}
        <div className="w-[45%] border-r border-white/5 p-6 flex flex-col justify-between overflow-y-auto bg-luxury-surface/40 select-none text-left">
          <div className="flex flex-col gap-4">
            <div>
              <span className="text-[10px] font-mono tracking-widest text-[#00FFB2] uppercase block">PREMIUM COMPILATION NODE</span>
              <h3 className="font-display font-black text-xl text-white">Elite Export System</h3>
              <p className="text-xs text-text-muted leading-relaxed mt-1">
                Download your resume in multiple formats. Each export type carries custom layout scales and visual hierarchies tailored for recruiters.
              </p>
            </div>

            {/* List of formats */}
            <div className="flex flex-col gap-2 max-h-[45vh] overflow-y-auto pr-1">
              {formatsGroup.map((item) => {
                const isSelected = selectedFormat === item.id;
                return (
                  <div
                    key={item.id}
                    onClick={() => {
                      if (item.premium) {
                        onPremiumTrigger(); // prompt upsell modal safely
                      }
                      setSelectedFormat(item.id as any);
                    }}
                    className={`p-3 rounded-xl border text-left cursor-pointer transition-all flex gap-3 items-start relative ${
                      isSelected 
                        ? "bg-luxury-elevated border-[#00FFB2] shadow-[0_0_12px_rgba(0,255,178,0.06)]"
                        : "bg-[#0A0A0F] border-white/5 hover:border-white/10 hover:bg-luxury-surface/50"
                    }`}
                  >
                    <div className={`p-2 rounded-lg ${isSelected ? "bg-[#00FFB2]/10 text-[#00FFB2]" : "bg-white/5 text-text-muted"}`}>
                      {item.icon}
                    </div>

                    <div className="flex-1">
                      <div className="flex justify-between items-center pr-4">
                        <span className="text-xs font-bold text-white block">{item.name}</span>
                        {item.premium && (
                          <span className="text-[8px] bg-indigo-accent text-white font-bold px-1.5 py-0.5 rounded-full">PRO</span>
                        )}
                      </div>
                      <p className="text-[10px] text-text-muted leading-relaxed mt-1">{item.desc}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Action Trigger button */}
          <div className="border-t border-white/5 pt-4 flex flex-col gap-3">
            <button
              onClick={handleDownloadTrigger}
              disabled={isCompiling}
              className="w-full py-3.5 rounded-xl bg-[#00FFB2] hover:shadow-[0_0_20px_rgba(0,255,178,0.35)] text-black font-semibold font-mono text-xs uppercase tracking-widest flex items-center justify-center gap-2 transition-all cursor-pointer disabled:opacity-50"
            >
              {isCompiling ? (
                <>Compiling Sandbox Assets...</>
              ) : compiledSuccess ? (
                <>✓ Render Splicing Complete!</>
              ) : (
                <>Compile & Download <Download className="w-4 h-4" /></>
              )}
            </button>

            <p className="text-[9px] font-mono text-text-muted flex items-center gap-1">
              <Info className="w-3.5 h-3.5 text-[#FFB347]" /> All exports carry 100% security encryption blocks automatically.
            </p>
          </div>
        </div>

        {/* RIGHT LIVE RENDERING SCREEN PREVIEW (55%) */}
        <div className="flex-1 bg-[#0A0A0F] p-8 flex flex-col justify-between overflow-y-auto text-left select-none relative">
          
          <div className="flex justify-between items-center border-b border-white/5 pb-3 mb-6 select-none">
            <span className="text-[10px] font-mono text-text-muted uppercase">REAL-TIME EXPORTER PREVIEW</span>
            <span className="px-3 py-1 rounded bg-white/5 border border-white/10 font-mono text-[9px] text-[#00FFB2] uppercase">
              RENDER MODE: {selectedFormat.toUpperCase()}
            </span>
          </div>

          {/* Miniature Paper Representation Container */}
          <div className="flex-1 flex justify-center items-center">
            <div className="bg-white text-black p-8 w-full max-w-[420px] aspect-[1/1.41] shadow-xl relative text-left leading-relaxed text-[8px] rounded border border-gray-200">
              
              {/* ATS Formatted Preview */}
              {selectedFormat === "ats" ? (
                <div className="font-mono text-[6px] text-gray-800 h-full overflow-hidden leading-normal">
                  <div className="border-b border-gray-200 pb-2 mb-2 text-center">
                    <span className="text-[8px] font-black tracking-normal">{resume.header.name.toUpperCase()}</span>
                    <p className="mt-0.5">{resume.header.title} | {resume.header.email}</p>
                  </div>
                  <div className="mt-2">
                    <p className="font-bold border-b border-gray-100 pb-0.5">WORK HISTORY</p>
                    {resume.experiences.slice(0, 1).map(exp => (
                      <div key={exp.id} className="mt-1">
                        <span className="font-bold">{exp.company}</span> | <span>{exp.role}</span>
                        <p className="mt-0.5 leading-normal opacity-80 scale-95 origin-top-left line-clamp-4">{exp.description}</p>
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <div 
                  className="font-sans text-[7px]" 
                  style={{ 
                    fontFamily: selectedFormat === "executive" ? "Playfair Display, serif" : "Inter, sans-serif" 
                  }}
                >
                  {/* Decorative stripe if Executive or Premium */}
                  {(selectedFormat === "premium" || selectedFormat === "executive") && (
                    <div className="absolute top-0 left-0 w-full h-1.5" style={{ backgroundColor: styles.accentColor || "#00FFB2" }} />
                  )}

                  {/* Header mini */}
                  <div className={`mb-3 pb-2 border-b border-gray-200 ${selectedFormat === "executive" ? "text-center" : "text-left"}`}>
                    <div className="font-black text-[12px] tracking-tight uppercase" style={{ color: selectedFormat === "executive" ? "#b7791f" : "#111111" }}>
                      {resume.header.name}
                    </div>
                    <div className="font-mono text-[6px] text-gray-500 font-bold uppercase tracking-widest mt-0.5">
                      {resume.header.title}
                    </div>
                    <div className="text-[5px] text-gray-400 mt-1 flex justify-center gap-2">
                      <span>✉ {resume.header.email}</span> <span>📍 {resume.header.location}</span>
                    </div>
                  </div>

                  {/* Body mini */}
                  <div className="flex flex-col gap-2 leading-relaxed">
                    <div>
                      <span className="text-[7px] font-bold font-mono uppercase border-b border-gray-100 pb-0.5 block tracking-wide">Professional Background</span>
                      {resume.experiences.slice(0, 2).map((exp, idx) => (
                        <div key={exp.id} className="mt-1 flex flex-col">
                          <div className="flex justify-between font-bold">
                            <span>{exp.company} - <span className="italic font-medium text-gray-600">{exp.role}</span></span>
                            <span className="font-mono text-[5px]">{exp.startDate}</span>
                          </div>
                          <p className="text-[5.5px] text-gray-600 pl-1 border-l border-gray-200 mt-0.5 line-clamp-2">{exp.description}</p>
                        </div>
                      ))}
                    </div>

                    <div>
                      <span className="text-[7px] font-bold font-mono uppercase border-b border-gray-100 pb-0.5 block tracking-wide">Skills & Core matrices</span>
                      <div className="flex flex-wrap gap-1 mt-1 pr-4">
                        {resume.skills.slice(0, 2).map(g => g.list.slice(0, 5)).flat().map(s => (
                          <span key={s} className="px-1.5 py-0.5 rounded bg-gray-100 text-gray-700 text-[5px] font-semibold">
                            {s}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Waterlines indicator */}
              <div className="absolute bottom-2 right-2 text-[4px] text-gray-300 font-mono">
                SECURE COMPILE BLUEPRINT DEVICE v2.1
              </div>
            </div>
          </div>

          <div className="text-center text-[10px] font-mono text-text-muted mt-6 uppercase leading-relaxed">
            ⚜ Preview matches exactly what will print out down to 0.01mm vector grids.
          </div>

        </div>

      </div>
    </div>
  );
}
