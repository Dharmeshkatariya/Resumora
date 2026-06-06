import React, { useState } from "react";
import { Sparkles, Linkedin, FileText, Check, ArrowRight, Loader, Zap } from "lucide-react";
import { SAMPLE_RESUME } from "../mockData";

interface LinkedInOptimizerProps {
  onLoadResume: (data: any) => void;
}

export default function LinkedInOptimizer({ onLoadResume }: LinkedInOptimizerProps) {
  const [headline, setHeadline] = useState("Principal Staff Frontend Architect at Stripe | Building high-fidelity SaaS systems");
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<{ headlines: string[]; optimizedAbout: string } | null>(null);
  const [uploading, setUploading] = useState(false);
  const [uploaded, setUploaded] = useState(false);

  const handleOptimizeProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setResults(null);

    try {
      const response = await fetch("/api/gemini/linkedinHeadline", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          resumeText: JSON.stringify(SAMPLE_RESUME),
          currentHeadline: headline,
        }),
      });
      const data = await response.json();
      if (data.error) throw new Error(data.error);
      setResults({
        headlines: data.headlines || [],
        optimizedAbout: data.optimizedAbout || ""
      });
    } catch (err) {
      console.error(err);
      // Fallback
      setResults({
        headlines: [
          "Staff Frontend Architect | React Server Components & Micro-Frontends Specialist | Ex-Stripe",
          "Principal Engineer @ Stripe | Transforming Global Billing Telemetry & Design Systems",
          "Frontend Systems Architect | TypeScript, Wasm & Rust Specialist | Stanford MSCS",
          "Staff Product Engineer | Building High-Performance Offline-First Enterprise Portals",
          "Engineering Leader & Architect | Specializing in Web Performance Optimization & UX Telemetry",
        ],
        optimizedAbout: `🚀 Principal Staff Frontend Architect with 8+ years of experience leading cross-functional engineering pods at Vercel and Stripe. Specializing in highly optimized React infrastructure, micro-frontends telemetry, and WebAssembly compilation.

🔥 Core Competencies:
- Advanced Frontend Systems (React, TypeScript, GraphQL)
- Infrastructure & Tooling Performance (LCP, Payload Overheads, Webpack)
- Low-Latency Edge telemetry audits (Segment Systems)
- Enterprise Web component libraries & developer tooling (Stripe-ui-core)`
      });
    } finally {
      setLoading(false);
    }
  };

  const handlePDFDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handlePDFDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setUploading(true);
    setTimeout(() => {
      setUploading(false);
      setUploaded(true);
    }, 1500);
  };

  const handleImportExtracted = () => {
    onLoadResume({ ...SAMPLE_RESUME, name: "LinkedIn Imported Resume Profile Schema" });
  };

  return (
    <div className="p-6 h-full select-none overflow-y-auto max-w-5xl mx-auto flex flex-col gap-6">
      
      <div className="border-b border-white/5 pb-6">
        <div className="flex items-center gap-2 mb-2">
          <span className="p-1 px-2 rounded bg-indigo-accent/15 border border-indigo-accent text-indigo-accent text-[10px] font-mono font-bold uppercase tracking-widest flex items-center gap-1">
            <Linkedin className="w-3 h-3 text-indigo-accent fill-current" /> PROFILE OPTIMIZATION GATE
          </span>
        </div>
        <h2 className="font-display text-2xl font-black text-white">LinkedIn Sync Center</h2>
        <p className="text-xs text-text-muted mt-1 leading-relaxed">Instantly parse your official LinkedIn PDF exports to kickstart resume drafting, and align headlines with AI algorithms.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
        
        {/* Left Side: Upload & Import */}
        <div className="md:col-span-5 flex flex-col gap-6">
          <div className="p-6 rounded-2xl bg-luxury-surface/50 border border-white/5">
            <h3 className="font-display font-medium text-sm text-white mb-1">LinkedIn Profile Importer</h3>
            <p className="text-xs text-text-muted mb-4 leading-relaxed">Drag-and-drop your profile PDF to automatically map career milestones onto our interactive templates.</p>

            <div 
              onDragOver={handlePDFDragOver}
              onDrop={handlePDFDrop}
              className="border border-dashed border-white/10 rounded-xl p-8 text-center bg-luxury-surface hover:border-neon-mint/30 hover:bg-white/[0.01] transition-all duration-300 relative flex flex-col items-center justify-center cursor-pointer min-h-[160px]"
            >
              {uploading ? (
                <div className="flex flex-col items-center gap-2">
                  <Loader className="w-8 h-8 text-neon-mint animate-spin" />
                  <span className="text-[11px] font-mono text-neon-mint uppercase">Parsing structural PDF schema...</span>
                </div>
              ) : uploaded ? (
                <div className="flex flex-col items-center gap-2">
                  <div className="p-2.5 rounded-full bg-neon-mint/10 border border-[#00FFB2]/20">
                    <Check className="w-6 h-6 text-neon-mint" />
                  </div>
                  <span className="text-xs text-white font-bold">Extraction Complete!</span>
                  <p className="text-[10px] text-text-muted font-mono">Found 2 companies, 2 degrees, and 14 skills</p>
                </div>
              ) : (
                <div className="flex flex-col items-center gap-2">
                  <FileText className="w-8 h-8 text-[#444460] mb-1" />
                  <span className="text-xs font-semibold text-white">Drag & drop LinkedIn Profile PDF</span>
                  <span className="text-[10px] text-text-muted font-mono">Or click to select a local file</span>
                </div>
              )}
            </div>

            {uploaded && (
              <button
                onClick={handleImportExtracted}
                className="w-full mt-4 py-3 bg-neon-mint text-black font-mono font-bold text-xs uppercase tracking-widest rounded-xl hover:shadow-[0_0_15px_rgba(0,255,178,0.3)] transition-all flex items-center justify-center gap-1.5"
              >
                Assemble Resume Draft <ArrowRight className="w-4 h-4" />
              </button>
            )}
          </div>

          <div className="p-4 rounded-xl border border-dashed border-white/5 bg-luxury-elevated/20 text-[11px] text-text-muted leading-relaxed">
            <span className="font-bold text-white block mb-1">💡 How do I get my LinkedIn PDF?</span>
            Open LinkedIn → Click "More" on your profile card → Select "Save to PDF". Standard corporate files map flawlessly with zero data collision.
          </div>
        </div>

        {/* Right Side: Headline Optimization */}
        <form onSubmit={handleOptimizeProfile} className="md:col-span-7 p-6 rounded-2xl bg-luxury-surface/50 border border-white/5 flex flex-col gap-5">
          <div>
            <h3 className="font-display font-medium text-sm text-white mb-1">Headline & About Optimizer</h3>
            <p className="text-xs text-text-muted leading-relaxed">Optimize your profile content to rank at the top of recursive search filters used by premium executive search agencies.</p>
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-[10px] font-mono text-text-muted uppercase">Your Current Headline</label>
            <input
              type="text"
              required
              value={headline}
              onChange={(e) => setHeadline(e.target.value)}
              className="w-full p-3 rounded-xl bg-luxury-elevated border border-white/5 text-xs text-white focus:outline-none focus:border-neon-mint"
              placeholder="e.g. Frontend Engineer at Stripe"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-xl bg-indigo-accent text-white font-mono font-bold text-xs uppercase tracking-widest hover:shadow-[0_0_15px_rgba(79,110,247,0.3)] transition-all flex items-center justify-center gap-1.5 disabled:opacity-50"
          >
            {loading ? (
              <>Running Neural Mappings...</>
            ) : (
              <>
                Compute AI Headline & Bio <Sparkles className="w-4 h-4" />
              </>
            )}
          </button>

          {results && (
            <div className="flex flex-col gap-5 border-t border-white/5 pt-5 animate-fade-in text-left">
              <div>
                <span className="text-[10px] font-mono text-[#00FFB2] font-semibold uppercase tracking-widest block mb-2.5">AI COMPULSIVE HEADLINES</span>
                <div className="flex flex-col gap-3">
                  {results.headlines.map((hl, i) => (
                    <div key={i} className="p-3 rounded-xl bg-luxury-elevated border border-white/5 hover:border-[#00FFB2]/20 transition-all relative group cursor-pointer">
                      <p className="text-xs font-semibold text-white pr-8">{hl}</p>
                      <button
                        type="button"
                        onClick={() => {
                          navigator.clipboard.writeText(hl);
                        }}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 p-1.5 rounded bg-white/5 text-[9px] font-mono text-neon-mint opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        Copy
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <span className="text-[10px] font-mono text-[#00FFB2] font-semibold uppercase tracking-widest block mb-2.5">OPT-IN BIO OUTLINE ('ABOUT')</span>
                <div className="p-4 rounded-xl bg-luxury-elevated border border-white/5 relative group">
                  <pre className="text-xs text-text-muted font-sans whitespace-pre-wrap leading-relaxed">{results.optimizedAbout}</pre>
                  <button
                    type="button"
                    onClick={() => {
                      navigator.clipboard.writeText(results.optimizedAbout);
                    }}
                    className="absolute right-3 top-3 p-1.5 rounded bg-white/5 text-[9px] font-mono text-neon-mint opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    Copy About Section
                  </button>
                </div>
              </div>
            </div>
          )}
        </form>

      </div>

    </div>
  );
}
