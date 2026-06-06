import React, { useState } from "react";
import { motion } from "motion/react";
import { Shield, Sparkles, Mail, Lock, User, Check, ArrowRight, Chrome } from "lucide-react";

interface AuthProps {
  onBack: () => void;
  onAuthSuccess: (email: string) => void;
}

export default function AuthSim({ onBack, onAuthSuccess }: AuthProps) {
  const [activeTab, setActiveTab] = useState<"signin" | "signup">("signin");
  const [email, setEmail] = useState("katariyadharmesh658@gmail.com"); // Prepopulate with metadata email for elite experience!
  const [password, setPassword] = useState("antigravity-elite-2026");
  const [name, setName] = useState("Dharmesh Katariya");
  const [rememberMe, setRememberMe] = useState(true);
  const [loading, setLoading] = useState(false);

  // Password strength calculation
  const getPasswordStrength = () => {
    if (!password) return 0;
    let strength = 0;
    if (password.length > 6) strength += 25;
    if (/[A-Z]/.test(password)) strength += 25;
    if (/[0-9]/.test(password)) strength += 25;
    if (/[^A-Za-z0-9]/.test(password)) strength += 25;
    return strength;
  };

  const strength = getPasswordStrength();
  const strengthColor = 
    strength <= 25 ? "bg-luxury-danger shadow-[0_0_10px_rgba(255,107,107,0.5)]" : 
    strength <= 50 ? "bg-[#FFB347] shadow-[0_0_10px_rgba(255,179,71,0.5)]" : 
    strength <= 75 ? "bg-[#4F6EF7] shadow-[0_0_10px_rgba(79,110,247,0.5)]" : 
    "bg-neon-mint shadow-[0_0_10px_rgba(0,255,178,0.5)]";

  const handleAuthSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      onAuthSuccess(email);
    }, 1200);
  };

  return (
    <div id="auth-portal" className="min-h-screen bg-luxury-bg w-full grid grid-cols-1 lg:grid-cols-12 overflow-hidden py-4 px-4 sm:px-6 lg:px-8">
      
      {/* LEFT PANEL: Splendid Rotating Accents & Stats */}
      <div className="hidden lg:flex lg:col-span-5 relative bg-luxury-surface/50 border border-white/5 rounded-2xl p-12 overflow-hidden flex-col justify-between items-start">
        {/* Glow Spheres */}
        <div className="absolute top-1/4 -left-12 w-64 h-64 rounded-full bg-indigo-accent/10 blur-[100px] animate-pulse-subtle" />
        <div className="absolute bottom-1/4 -right-12 w-64 h-64 rounded-full bg-[#00FFB2]/5 blur-[100px] animate-pulse-subtle" />

        <div className="flex items-center gap-3 relative z-10">
          <div className="p-2.5 rounded-xl bg-luxury-elevated border border-[rgba(0,255,178,0.25)]">
            <Sparkles className="w-5 h-5 text-neon-mint" />
          </div>
          <span className="font-display font-medium text-lg tracking-tight text-white">RESUME.AI</span>
        </div>

        {/* Carousel Visual */}
        <div className="w-full flex flex-col gap-6 relative z-10 py-12 select-none">
          <div className="p-6 rounded-2xl bg-luxury-elevated border border-white/5 relative shadow-2xl animate-float">
            <div className="absolute -top-3 left-4 px-2.5 py-1 rounded bg-[#00FFB2]/10 border border-[#00FFB2]/20 text-[10px] font-mono text-neon-mint uppercase tracking-wider font-bold">
              SYSTEM REPORT
            </div>
            <h4 className="font-display font-bold text-base text-white mt-1">Ready for Stripe API Engineer JD</h4>
            <div className="flex gap-2 mt-4">
              <span className="w-2.5 h-2.5 rounded-full bg-neon-mint animate-ping" />
              <p className="text-xs text-text-muted">Extracted 8 key skills matching target description schema.</p>
            </div>
          </div>

          <div className="p-6 rounded-2xl bg-luxury-elevated border border-white/5 shadow-2xl opacity-75 translate-x-4">
            <h4 className="font-display font-medium text-sm text-text-muted">ATS Compatibility Grade</h4>
            <div className="flex items-baseline gap-2 mt-2">
              <span className="text-3xl font-display font-black text-white">96%</span>
              <span className="text-xs font-mono text-neon-mint">Excellent</span>
            </div>
          </div>
        </div>

        <div className="relative z-10 flex flex-col gap-2">
          <div className="flex items-center gap-2">
            <Shield className="w-4 h-4 text-neon-mint" />
            <span className="text-xs font-mono text-text-muted uppercase tracking-widest">SECURE CLIENT TERMINAL</span>
          </div>
          <p className="text-[11px] text-text-muted/60 leading-relaxed max-w-xs">Data is sandbox encrypted. 256-bit AES standard. Zero data harvesting or broker selling.</p>
        </div>
      </div>

      {/* RIGHT PANEL: Authentic Form Section */}
      <div className="lg:col-span-7 flex flex-col justify-center items-center py-10 relative">
        <button 
          onClick={onBack}
          className="absolute top-4 left-4 lg:left-8 px-4 py-2 text-xs font-mono text-text-muted hover:text-white transition-colors"
        >
          ← Return to Marketing
        </button>

        <div className="w-full max-w-md p-8 rounded-2xl bg-luxury-surface/40 border border-white/5 backdrop-filter backdrop-blur-3xl shadow-2xl">
          <div className="text-center mb-8">
            <h2 className="font-display text-2xl sm:text-3xl font-extrabold text-white tracking-tight">Access the Workspace</h2>
            <p className="text-xs text-text-muted mt-2">Simulating enterprise credentials portal for preview environments</p>
          </div>

          {/* Toggle Tabs */}
          <div className="grid grid-cols-2 p-1 bg-luxury-surface border border-white/5 rounded-xl mb-6 select-none">
            <button
              onClick={() => setActiveTab("signin")}
              className={`py-2.5 rounded-lg text-xs font-mono font-semibold uppercase tracking-wider transition-all duration-300 ${activeTab === "signin" ? "bg-indigo-accent text-white" : "text-text-muted hover:text-white"}`}
            >
              Sign In
            </button>
            <button
              onClick={() => setActiveTab("signup")}
              className={`py-2.5 rounded-lg text-xs font-mono font-semibold uppercase tracking-wider transition-all duration-300 ${activeTab === "signup" ? "bg-indigo-accent text-white" : "text-text-muted hover:text-white"}`}
            >
              Registration
            </button>
          </div>

          {/* Form */}
          <form onSubmit={handleAuthSubmit} className="flex flex-col gap-5">
            {activeTab === "signup" && (
              <div className="flex flex-col gap-2">
                <label className="text-xs font-mono text-text-muted uppercase tracking-widest">Your Full Name</label>
                <div className="relative">
                  <User className="absolute left-3.5 top-1/2 transform -translate-y-1/2 w-4 h-4 text-[#444460]" />
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full pl-11 pr-4 py-3 rounded-xl bg-luxury-elevated border border-white/5 text-sm font-medium text-white focus:outline-none focus:border-neon-mint focus:shadow-[0_0_15px_rgba(0,255,178,0.15)] transition-all"
                    placeholder="Dharmesh Katariya"
                  />
                </div>
              </div>
            )}

            <div className="flex flex-col gap-2">
              <label className="text-xs font-mono text-text-muted uppercase tracking-widest">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-3.5 top-1/2 transform -translate-y-1/2 w-4 h-4 text-[#444460]" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-11 pr-4 py-3 rounded-xl bg-luxury-elevated border border-white/5 text-sm font-medium text-white focus:outline-none focus:border-neon-mint focus:shadow-[0_0_15px_rgba(0,255,178,0.15)] transition-all"
                  placeholder="name@company.com"
                />
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-xs font-mono text-text-muted uppercase tracking-widest">Credentials Password</label>
              <div className="relative">
                <Lock className="absolute left-3.5 top-1/2 transform -translate-y-1/2 w-4 h-4 text-[#444460]" />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-11 pr-4 py-3 rounded-xl bg-luxury-elevated border border-white/5 text-sm font-medium text-white focus:outline-none focus:border-neon-mint focus:shadow-[0_0_15px_rgba(0,255,178,0.15)] transition-all"
                  placeholder="••••••••••••••"
                />
              </div>

              {/* Password strength meter and tracker */}
              {activeTab === "signup" && password && (
                <div className="flex flex-col gap-1.5 mt-1 select-none">
                  <div className="flex justify-between items-center text-[10px] font-mono text-text-muted uppercase">
                    <span>Password Robustness</span>
                    <span className="text-[#00FFB2]">{strength}%</span>
                  </div>
                  <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden">
                    <div className={`h-full transition-all duration-300 ${strengthColor}`} style={{ width: `${strength}%` }} />
                  </div>
                </div>
              )}
            </div>

            {/* Remember me & Checkbox */}
            <div className="flex items-center justify-between mt-2 select-none">
              <label className="flex items-center gap-2 cursor-pointer group">
                <div className="relative w-4.5 h-4.5 rounded border border-white/10 bg-luxury-elevated text-black flex items-center justify-center transition-colors group-hover:border-neon-mint">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="absolute inset-0 opacity-0 cursor-pointer"
                  />
                  {rememberMe && <Check className="w-3.5 h-3.5 text-neon-mint font-bold" />}
                </div>
                <span className="text-xs text-text-muted group-hover:text-white transition-colors">Keep my session active</span>
              </label>

              <button type="button" className="text-xs text-indigo-accent hover:underline">
                Forgot password?
              </button>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full mt-4 py-3.5 rounded-xl font-mono font-bold uppercase tracking-widest text-xs bg-neon-mint text-black hover:shadow-[0_0_30px_rgba(0,255,178,0.4)] transition-all flex items-center justify-center gap-2 disabled:opacity-50 active:scale-[98%]"
            >
              {loading ? (
                <>Establishing Handshake...</>
              ) : (
                <>
                  {activeTab === "signin" ? "Establish Connection" : "Confirm Enrollment"}
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>

            {/* Google OAuth visual divider */}
            <div className="relative my-4 flex items-center justify-center select-none">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-white/5" />
              </div>
              <span className="relative px-3 bg-luxury-surface text-[10px] font-mono tracking-widest text-[#444460] uppercase">
                OR ALTERNATE INTEGRATION
              </span>
            </div>

            <button
              type="button"
              onClick={() => {
                setLoading(true);
                setTimeout(() => {
                  setLoading(false);
                  onAuthSuccess(email);
                }, 1000);
              }}
              className="w-full py-3 rounded-xl border border-white/5 bg-luxury-elevated text-xs font-mono font-medium text-white hover:bg-white/5 flex items-center justify-center gap-2.5 transition-all"
            >
              <Chrome className="w-4 h-4 text-neon-mint" /> Connect via Google Workspace
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
