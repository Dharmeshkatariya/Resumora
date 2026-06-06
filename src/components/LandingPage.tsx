import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Sparkles, Play, Shield, Globe, Award, TrendingUp, ChevronRight, UserCheck, Star, Zap, HelpCircle } from "lucide-react";
import { TESTIMONIALS, PRICING_PLANS } from "../mockData";

interface LandingPageProps {
  onStartBuilding: () => void;
  onOpenAuth: () => void;
}

export default function LandingPage({ onStartBuilding, onOpenAuth }: LandingPageProps) {
  const [billingPeriod, setBillingPeriod] = useState<"monthly" | "annual">("annual");
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const words = ["ATS-Optimized", "AI-Tailored", "Interview-Ready", "Pixel-Perfect"];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentWordIndex((prev) => (prev + 1) % words.length);
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  // 3D tilt tracking for header mockup
  const [tilt, setTilt] = useState({ rotateX: 0, rotateY: 0 });
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    setTilt({
      rotateX: -y / 15,
      rotateY: x / 15,
    });
  };
  const handleMouseLeave = () => {
    setTilt({ rotateX: 0, rotateY: 0 });
  };

  return (
    <div id="landing-container" className="relative min-h-screen bg-luxury-bg text-f5 z-10 w-full overflow-y-auto overflow-x-hidden animate-gradient-mesh py-8 px-4 sm:px-6 lg:px-8">
      
      {/* Header Banner */}
      <nav id="landing-navbar" className="max-w-7xl mx-auto flex justify-between items-center h-20 mb-12">
        <div className="flex items-center gap-3">
          <div className="relative p-2.5 rounded-xl bg-luxury-surface border border-[rgba(0,255,178,0.25)] shadow-[0_0_15px_rgba(0,255,178,0.1)]">
            <Sparkles className="w-6 h-6 text-neon-mint" />
          </div>
          <span className="font-display font-medium text-xl tracking-tight text-white select-none">
            RESUME<span className="text-neon-mint">.AI</span>
          </span>
        </div>
        <div className="hidden md:flex items-center gap-8 text-sm font-medium text-text-muted">
          <a href="#features" className="hover:text-white transition-colors">Features</a>
          <a href="#benchmarks" className="hover:text-white transition-colors">Benchmarks</a>
          <a href="#testimonials" className="hover:text-white transition-colors">Success Stories</a>
          <a href="#pricing" className="hover:text-white transition-colors">Pricing</a>
        </div>
        <div className="flex items-center gap-4">
          <button 
            id="landing-signin-btn" 
            onClick={onOpenAuth}
            className="text-sm font-medium hover:text-white transition-colors text-text-muted"
          >
            Sign In
          </button>
          <button 
            id="landing-cta-nav" 
            onClick={onStartBuilding}
            className="relative px-5 py-2.5 rounded-xl text-sm font-medium bg-white text-black hover:bg-neon-mint hover:shadow-[0_0_20px_rgba(0,255,178,0.4)] transition-all duration-300"
          >
            Start Crafting Free
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 pt-6 pb-20 items-center">
        <div className="lg:col-span-7 flex flex-col items-start gap-6">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-luxury-surface border border-white/5 shadow-inner text-xs text-neon-mint font-mono uppercase tracking-wider">
            <span className="w-1.5 h-1.5 rounded-full bg-neon-mint animate-pulse" />
            Empowering Next-Gen Careers
          </div>

          <h1 className="font-display text-4xl sm:text-6xl font-extrabold text-white tracking-tight leading-[1.05] text-left">
            Land your dream job. <span className="block text-transparent bg-clip-text bg-gradient-to-r from-neon-mint via-indigo-accent to-soft-amber">Instantly.</span>
          </h1>

          <div className="h-10 flex items-center select-none">
            <span className="text-text-muted text-lg sm:text-2xl mr-2 font-display">Your Resume gets:</span>
            <AnimatePresence mode="wait">
              <motion.span
                key={currentWordIndex}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.4, ease: "easeInOut" }}
                className="font-mono text-lg sm:text-2xl text-neon-mint font-bold underline decoration-indigo-accent decoration-2"
              >
                {words[currentWordIndex]}
              </motion.span>
            </AnimatePresence>
          </div>

          <p className="text-text-muted max-w-xl text-sm sm:text-base leading-relaxed text-left">
            Skip the formatting headache and cold tailoring. RESUME.AI leverages direct Gemini-3.5-flash optimizations to align your work achievements directly with recruiters' ATS scanners. Built for precision-scale careers.
          </p>

          <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto mt-4">
            <button
              id="landing-hero-cta"
              onClick={onStartBuilding}
              className="w-full sm:w-auto px-8 py-4 rounded-xl font-medium bg-neon-mint text-black hover:shadow-[0_0_35px_rgba(0,255,178,0.5)] transition-all duration-300 flex items-center justify-center gap-2 active:scale-[98%]"
            >
              Build My Resume <ChevronRight className="w-5 h-5" />
            </button>
            <button
              className="w-full sm:w-auto px-6 py-4 rounded-xl font-medium text-text-muted hover:text-white border border-white/5 hover:bg-white/5 transition-all duration-300 flex items-center justify-center gap-2"
              onClick={onStartBuilding}
            >
              <Play className="w-4 h-4 fill-current text-indigo-accent" /> Try Demo Workspace
            </button>
          </div>

          {/* Mini Stat row */}
          <div className="grid grid-cols-3 gap-6 sm:gap-12 mt-8 py-6 border-y border-white/5 w-full">
            <div>
              <div className="font-display font-black text-2xl sm:text-3xl text-white">98%</div>
              <div className="text-xs text-text-muted uppercase tracking-wider font-mono mt-1">ATS Pass Rate</div>
            </div>
            <div>
              <div className="font-display font-black text-2xl sm:text-3xl text-white">3.2M</div>
              <div className="text-xs text-text-muted uppercase tracking-wider font-mono mt-1">bullets polished</div>
            </div>
            <div>
              <div className="font-display font-black text-2xl sm:text-3xl text-white">3x</div>
              <div className="text-xs text-text-muted uppercase tracking-wider font-mono mt-1">more interviews</div>
            </div>
          </div>
        </div>

        {/* 3D Rotating Mockup Canvas */}
        <div className="lg:col-span-5 flex justify-center items-center">
          <div 
            className="relative lg:w-[420px] aspect-[4/5] luxury-glass rounded-2xl p-6 shadow-[0_30px_100px_rgba(0,0,0,0.8)] border border-white/[0.08] flex flex-col cursor-pointer overflow-hidden transition-transform ease-out duration-300"
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            onClick={onStartBuilding}
            style={{
              transform: `perspective(1000px) rotateX(${tilt.rotateX}deg) rotateY(${tilt.rotateY}deg)`,
            }}
          >
            {/* Ambient Background Glow Grid Inside */}
            <div className="absolute inset-0 bg-radial-gradient from-neon-mint/10 to-transparent pointer-events-none" />
            
            {/* Mini Header Card */}
            <div className="flex justify-between items-center border-b border-white/5 pb-4 mb-4">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-neon-mint animate-ping" />
                <span className="text-xs font-mono tracking-widest text-[#00FFB2]/80 uppercase">AI REALTIME ANALYSIS</span>
              </div>
              <div className="px-2.5 py-1 rounded bg-[#00FFB2]/10 border border-[#00FFB2]/20 font-mono text-xs text-neon-mint font-bold">
                ATS: 94%
              </div>
            </div>

            {/* Resume visual outline */}
            <div className="flex-1 flex flex-col gap-3 select-none">
              <div className="h-6 w-1/2 bg-white/10 rounded" />
              <div className="h-3 w-1/3 bg-white/5 rounded mb-4" />
              
              <div className="h-2 w-full bg-white/5 rounded" />
              <div className="h-2 w-full bg-white/5 rounded" />
              <div className="h-2 w-2/3 bg-white/5 rounded mb-4" />

              <div className="p-3 rounded bg-luxury-elevated border border-indigo-accent/[0.15] border-dashed hover:border-neon-mint/40 transition-colors flex flex-col gap-2 relative">
                <div className="absolute -top-2 -right-2 p-1.5 rounded-full bg-indigo-accent border border-indigo-accent shadow-md">
                  <Sparkles className="w-2.5 h-2.5 text-neon-mint" />
                </div>
                <div className="h-3.5 w-1/4 bg-indigo-accent/20 rounded" />
                <div className="h-2.5 w-full bg-white/10 rounded" />
                <div className="h-2.5 w-5/6 bg-white/10 rounded" />
              </div>

              <div className="h-1 bg-white/5 w-full mt-4" />
              <div className="flex gap-2 mt-2">
                <div className="px-2 py-1 rounded bg-white/5 text-[10px] font-mono text-text-muted border border-white/5">TypeScript</div>
                <div className="px-2 py-1 rounded bg-white/5 text-[10px] font-mono text-text-muted border border-white/5">React 19</div>
                <div className="px-2 py-1 rounded bg-white/5 text-[10px] font-mono text-text-muted border border-white/5">Next.js</div>
                <div className="px-2 py-1 rounded bg-white/5 text-[10px] font-mono text-text-muted border border-white/5">Go</div>
              </div>
            </div>

            <div className="mt-4 border-t border-white/5 pt-4 flex items-center justify-between">
              <span className="text-[11px] text-text-muted font-mono">Template: Modern Tech</span>
              <span className="text-[11px] text-[#FFB347] font-mono flex items-center gap-1"><Star className="w-3 h-3 fill-current" /> Premium Editorial</span>
            </div>
          </div>
        </div>
      </section>

      {/* Bento Feature Showcase Grid */}
      <section id="features" className="max-w-7xl mx-auto py-24 border-t border-white/5">
        <div className="text-center max-w-2xl mx-auto mb-16 flex flex-col items-center gap-4">
          <span className="text-xs uppercase tracking-[0.25em] text-neon-mint font-mono">THE BENTO SUITE</span>
          <h2 className="font-display text-3xl sm:text-5xl font-extrabold text-white tracking-tight">Everything you need to bypass ATS.</h2>
          <p className="text-text-muted text-sm sm:text-base">We didn’t just build a compiler — we built an autonomous assistant to bridge formatting guidelines and recruiter desires.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          
          {/* Card 1: Inline content editable */}
          <div className="md:col-span-8 luxury-glass rounded-2xl p-8 bento-glow flex flex-col gap-6 group overflow-hidden relative">
            <div className="absolute right-0 bottom-0 opacity-10 pointer-events-none w-56 transform translate-y-6 translate-x-6">
              <Sparkles className="w-48 h-48 text-neon-mint" />
            </div>
            <div className="flex items-center justify-between">
              <div className="p-3 bg-white/5 border border-white/10 rounded-xl">
                <Sparkles className="w-6 h-6 text-neon-mint animate-pulse" />
              </div>
              <span className="text-xs font-mono text-text-muted tracking-widest uppercase">LIVE EDITABLE WYSIWYG</span>
            </div>
            <div>
              <h3 className="font-display text-xl sm:text-2xl font-bold text-white mb-2">Beautiful Inline Content editable Canvas</h3>
              <p className="text-text-muted text-sm leading-relaxed max-w-lg">Click any element on the template, modify text in real-time, and watch margins shift fluidly. It looks and feels exactly like high-end visual design products.</p>
            </div>
          </div>

          {/* Card 2: ATS Scanner */}
          <div className="md:col-span-4 luxury-glass rounded-2xl p-8 bento-glow-blue flex flex-col gap-6">
            <div className="p-3 bg-white/5 border border-white/10 rounded-xl self-start">
              <Shield className="w-6 h-6 text-indigo-accent" />
            </div>
            <div>
              <span className="text-xs font-mono text-indigo-accent uppercase tracking-widest block mb-2">ATS SIMULATORS</span>
              <h3 className="font-display text-xl sm:text-2xl font-bold text-white mb-2">Realtime Greenhouse and Lever Analyzer</h3>
              <p className="text-text-muted text-sm leading-relaxed">Runs background token mappings to verify whether your formatting rules pass enterprise Greenhouse and Taleo processors natively.</p>
            </div>
          </div>

          {/* Card 3: AI Bullet Points */}
          <div className="md:col-span-4 luxury-glass rounded-2xl p-8 bento-glow-blue flex flex-col gap-6">
            <div className="p-3 bg-white/5 border border-white/10 rounded-xl self-start">
              <TrendingUp className="w-6 h-6 text-indigo-accent" />
            </div>
            <div>
              <span className="text-xs font-mono text-indigo-accent uppercase tracking-widest block mb-2">BULLET REWRITING</span>
              <h3 className="font-display text-xl sm:text-xl font-bold text-white mb-2">Active Metric Bullet Optimizer</h3>
              <p className="text-text-muted text-sm leading-relaxed">Transforms passive descriptions like "helped migating databases" to "Engineered high-frequency database failovers, saving 22% system overhead."</p>
            </div>
          </div>

          {/* Card 4: Portfolio */}
          <div className="md:col-span-8 luxury-glass rounded-2xl p-8 bento-glow flex flex-col gap-6 relative overflow-hidden">
            <div className="flex items-center justify-between">
              <div className="p-3 bg-white/5 border border-white/10 rounded-xl">
                <Globe className="w-6 h-6 text-neon-mint" />
              </div>
              <span className="text-xs font-mono text-[#00FFB2]/60 uppercase tracking-widest">ONE-CLICK PORTFOLIOS</span>
            </div>
            <div>
              <h3 className="font-display text-xl sm:text-2xl font-bold text-white mb-2">Instant Custom Web Portfolios</h3>
              <p className="text-text-muted text-sm leading-relaxed max-w-xl">Compile your resume resume instantly into an elegant dark portfolio webpage. Hosted automatically or pack as structured HTML assets code to deploy wherever you like.</p>
            </div>
          </div>

        </div>
      </section>

      {/* Testimonials */}
      <section id="testimonials" className="max-w-7xl mx-auto py-24 border-t border-white/5">
        <div className="text-center max-w-2xl mx-auto mb-16 flex flex-col items-center gap-4">
          <span className="text-xs uppercase tracking-[0.25em] text-neon-mint font-mono">USER MARQUEE SUCCESS</span>
          <h2 className="font-display text-3xl sm:text-5xl font-extrabold text-white tracking-tight">Approved by elite architects.</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {TESTIMONIALS.map((t, index) => (
            <div key={index} className="luxury-glass p-8 rounded-2xl border border-white/5 flex flex-col gap-6 justify-between hover:border-white/10 transition-all duration-300">
              <p className="text-text-muted text-base italic leading-relaxed">"{t.quote}"</p>
              <div className="flex items-center gap-4">
                <img src={t.avatar} alt={t.name} className="w-12 h-12 rounded-full object-cover border border-indigo-accent" referrerPolicy="no-referrer" />
                <div>
                  <h4 className="text-white font-medium text-sm">{t.name}</h4>
                  <p className="text-xs text-text-muted">{t.role} @ <span className="text-[#00FFB2]">{t.company}</span></p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="max-w-7xl mx-auto py-24 border-t border-white/5">
        <div className="text-center max-w-2xl mx-auto mb-16 flex flex-col items-center gap-4">
          <span className="text-xs uppercase tracking-[0.25em] text-[#FFB347] font-mono font-bold">PRICING STRUCTURE</span>
          <h2 className="font-display text-3xl sm:text-5xl font-extrabold text-white tracking-tight">Predictable plans for active seekers.</h2>
          
          {/* Billing Toggle */}
          <div className="flex items-center gap-3 p-1 rounded-xl bg-luxury-surface border border-white/5 mt-4 select-none">
            <button 
              onClick={() => setBillingPeriod("monthly")}
              className={`px-4 py-2 rounded-lg text-xs font-mono font-semibold uppercase tracking-wider transition-all duration-300 ${billingPeriod === "monthly" ? "bg-indigo-accent text-white" : "text-text-muted hover:text-white"}`}
            >
              Monthly
            </button>
            <button 
              onClick={() => setBillingPeriod("annual")}
              className={`px-4 py-2 rounded-lg text-xs font-mono font-semibold uppercase tracking-wider transition-all duration-300 flex items-center gap-1 ${billingPeriod === "annual" ? "bg-[#00FFB2] text-black shadow-md" : "text-text-muted hover:text-white"}`}
            >
              Annual <span className="text-[9px] bg-indigo-accent text-white px-1.5 py-0.5 rounded-full ml-1 normal-case font-sans">Save 30%</span>
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {PRICING_PLANS.map((plan, index) => {
            const isPro = plan.name.includes("Pro");
            const price = plan.price === "$0" ? 0 : parseInt(plan.price.replace("$", ""));
            const finalPrice = billingPeriod === "annual" ? Math.round(price * 0.7) : price;

            return (
              <div 
                key={index} 
                className={`relative rounded-2xl p-8 flex flex-col justify-between border-2 transition-all duration-300 ${isPro ? "bg-luxury-elevated/40 border-neon-mint shadow-[0_10px_40px_rgba(0,255,178,0.05)]" : "luxury-glass border-white/5"}`}
              >
                {plan.badge && (
                  <span className="absolute -top-3 left-1/2 transform -translate-x-1/2 px-3 py-1 bg-neon-mint text-black font-mono font-bold text-[10px] tracking-widest uppercase rounded-full shadow-[0_0_15px_rgba(0,255,178,0.4)]">
                    {plan.badge}
                  </span>
                )}

                <div>
                  <h3 className="font-display text-xl font-bold text-white mb-2">{plan.name}</h3>
                  <p className="text-xs text-text-muted mb-6 leading-relaxed min-h-[32px]">{plan.description}</p>
                  
                  <div className="flex items-baseline gap-1 mb-8">
                    <span className="font-display text-4xl sm:text-5xl font-black text-white">
                      ${plan.price === "$0" ? "0" : finalPrice}
                    </span>
                    <span className="text-text-muted text-xs font-mono">/ {plan.period}</span>
                  </div>

                  <hr className="border-white/5 mb-6" />

                  <ul className="flex flex-col gap-4 text-xs font-medium text-text-muted mb-8">
                    {plan.features.map((f, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className={`text-sm select-none ${isPro ? "text-neon-mint" : "text-indigo-accent"}`}>✓</span>
                        <span>{f}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <button 
                  onClick={onStartBuilding}
                  className={`w-full py-4 rounded-xl font-medium text-xs font-mono uppercase tracking-widest transition-all duration-300 ${isPro ? "bg-neon-mint text-black hover:shadow-[0_0_30px_rgba(0,255,178,0.4)] active:scale-[98%]" : "bg-white/5 text-white hover:bg-white/10 border border-white/10"}`}
                >
                  {plan.buttonText}
                </button>
              </div>
            );
          })}
        </div>
      </section>

      {/* FAQ Banner */}
      <section className="max-w-4xl mx-auto py-12 px-8 rounded-2xl bg-luxury-surface border border-white/5 mt-4 text-center flex flex-col items-center gap-4">
        <HelpCircle className="w-8 h-8 text-indigo-accent animate-bounce" />
        <h4 className="font-display font-bold text-lg text-white">Are my credentials secure?</h4>
        <p className="text-xs text-text-muted leading-relaxed max-w-lg">Yes. All work, profiles, database backups, and drafts are fully encrypted locally on your browser container via sandboxed secure local stores. Exiting the app wipes caches cleanly.</p>
      </section>

      {/* Footer credit */}
      <footer className="text-center text-xs text-text-muted py-12 mt-12 border-t border-white/5">
        <p>© 2026 RESUME.AI Incorporation. Dark Luxury Editorial System.</p>
      </footer>
    </div>
  );
}
