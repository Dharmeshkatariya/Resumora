import React, { useState } from "react";
import { X, Check, Sparkles, CreditCard, Shield, Zap, BadgeAlert } from "lucide-react";

interface PremiumUpsellModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccessPay: () => void;
}

const TIER_BENEFITS = [
  "Endless server-side AI resume tailoring & bullet generations",
  "Unlimited high-resolution editorial portfolio domains & links",
  "One-click complete tailoring to individual JD matching scores",
  "100% automated parsing of custom LinkedIn Profile PDF files",
  "Complete interview prep questions tailored specifically to active JDs",
  "Enterprise resume critique and line-by-line grammar auditing"
];

export default function PremiumUpsellModal({ isOpen, onClose, onSuccessPay }: PremiumUpsellModalProps) {
  const [billingCycle, setBillingCycle] = useState<"monthly" | "annual">("annual");
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleCheckout = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      onSuccessPay();
      onClose();
    }, 1500);
  };

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-md z-50 flex items-center justify-center p-4 select-none">
      <div className="w-full max-w-lg bg-luxury-surface border border-[#FFB347]/20 rounded-3xl p-8 relative shadow-2xl overflow-hidden">
        
        {/* Glow Spheres */}
        <div className="absolute top-0 right-0 w-44 h-44 rounded-full bg-[#FFB347]/5 blur-[80px]" />
        <div className="absolute bottom-0 left-0 w-44 h-44 rounded-full bg-[#00FFB2]/5 blur-[80px]" />

        <button 
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full bg-white/5 text-text-muted hover:text-white transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="text-center flex flex-col items-center mb-6">
          <span className="px-3.5 py-1.5 rounded-full bg-[#FFB347]/10 border border-[#FFB347]/30 text-[10px] font-mono text-[#FFB347] font-bold uppercase tracking-widest flex items-center gap-1.5 animate-pulse">
            <Zap className="w-3.5 h-3.5 fill-current" /> UNLOCK PROFESSIONAL ACCESS
          </span>
          <h2 className="font-display text-2xl sm:text-3xl font-black text-white mt-3.5 tracking-tight">Access the Elite Workspace</h2>
          <p className="text-xs text-text-muted mt-2 max-w-sm">Acquire lifetime rights to recursive resume optimization tools, LinkedIn crawlers, and server hosting.</p>
        </div>

        {/* Toggle billing */}
        <div className="flex justify-center mb-6">
          <div className="grid grid-cols-2 p-1 bg-[#0A0A0F] border border-white/5 rounded-xl text-xs w-full max-w-[280px]">
            <button
              onClick={() => setBillingCycle("monthly")}
              className={`py-2 rounded-lg text-xs font-mono font-medium transition-all ${billingCycle === "monthly" ? "bg-[#FFB347] text-black font-bold" : "text-text-muted hover:text-white"}`}
            >
              Monthly ($24)
            </button>
            <button
              onClick={() => setBillingCycle("annual")}
              className={`py-2 rounded-lg text-xs font-mono font-medium transition-all relative ${billingCycle === "annual" ? "bg-[#FFB347] text-black font-bold" : "text-text-muted hover:text-white"}`}
            >
              Annual ($12/mo)
              <span className="absolute -top-3 -right-2 px-1.5 py-0.5 rounded bg-neon-mint text-black font-black text-[7px] tracking-wide uppercase">SAVE 50%</span>
            </button>
          </div>
        </div>

        {/* Price display */}
        <div className="text-center mb-8">
          <span className="text-6xl font-display font-black text-white">$144</span>
          <span className="text-xs text-text-muted font-mono uppercase tracking-wider block mt-1">Billed annually | Unlocked for lifetime preview modes</span>
        </div>

        {/* Benefits checklist */}
        <div className="flex flex-col gap-3 mb-8">
          {TIER_BENEFITS.map((benefit, i) => (
            <div key={i} className="flex items-start gap-2.5 text-xs text-text-muted">
              <Check className="w-4 h-4 text-neon-mint mt-0.5 shrink-0" />
              <span>{benefit}</span>
            </div>
          ))}
        </div>

        {/* Action Form */}
        <form onSubmit={handleCheckout} className="flex flex-col gap-4">
          <button
            type="submit"
            disabled={loading}
            className="w-full py-4 rounded-xl bg-neon-mint text-black font-mono font-black text-xs uppercase tracking-widest hover:shadow-[0_0_30px_rgba(0,255,178,0.45)] transition-all flex items-center justify-center gap-1.5 disabled:opacity-50"
          >
            {loading ? (
              <>Running transaction pipelines...</>
            ) : (
              <>
                Deploy Enterprise Handshake
              </>
            )}
          </button>
          
          <div className="flex items-center justify-center gap-2 text-[10px] text-text-muted font-mono uppercase tracking-wider">
            <Shield className="w-3.5 h-3.5 text-neon-mint" /> SECURE STRIPE CHECKOUT VERIFIED
          </div>
        </form>

      </div>
    </div>
  );
}
