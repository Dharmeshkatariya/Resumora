import React, { useState } from "react";
import { SAMPLE_RESUME, SAMPLE_JOBS, TEMPLATE_PRESETS } from "../mockData";
import { ResumeData } from "../types";
import ResumeBuilder from "./ResumeBuilder";
import JobTracker from "./JobTracker";
import PortfolioBuilder from "./PortfolioBuilder";
import LinkedInOptimizer from "./LinkedInOptimizer";
import { 
  Sparkles, Layers, ListTodo, Globe, Linkedin, Settings, LogOut, ChevronLeft, ChevronRight, 
  Files, LayoutGrid, Calendar, HelpCircle, Briefcase, Award, GraduationCap, TrendingUp, ShieldAlert,
  FolderOpen, Star, CreditCard, Bell, Key, ArrowUpRight, Check, CheckCircle, Flame
} from "lucide-react";

interface DashboardProps {
  userEmail: string;
  onLogout: () => void;
  onPremiumTrigger: () => void;
}

type MenuItemId = 
  | "home"
  | "builder"
  | "library"
  | "templates"
  | "job-analyzer"
  | "bullet-generator"
  | "job-tracker"
  | "portfolio"
  | "linkedin"
  | "settings";

export default function Dashboard({ userEmail, onLogout, onPremiumTrigger }: DashboardProps) {
  const [collapsed, setCollapsed] = useState(false);
  const [activeItem, setActiveItem] = useState<MenuItemId>("home");
  const [resumesList, setResumesList] = useState<ResumeData[]>([SAMPLE_RESUME]);
  const [selectedResume, setSelectedResume] = useState<ResumeData>(SAMPLE_RESUME);

  const handleUpdateResume = (updated: ResumeData) => {
    setSelectedResume(updated);
    setResumesList(resumesList.map(r => r.id === updated.id ? updated : r));
  };

  const handleCreateNewResume = () => {
    const newResume: ResumeData = {
      ...SAMPLE_RESUME,
      id: "resume-" + Date.now(),
      name: "Untitled New Resume Blueprint",
      lastModified: new Date().toISOString(),
      experiences: [
        {
          id: "exp-init",
          company: "Enterprise Corp",
          role: "Senior Software Engineer",
          location: "New York, NY",
          startDate: "2024-01",
          endDate: "Present",
          current: true,
          description: "- Engineered low latency features using standard TypeScript systems and databases."
        }
      ]
    };
    setResumesList([newResume, ...resumesList]);
    setSelectedResume(newResume);
    setActiveItem("builder");
  };

  return (
    <div className="flex h-screen w-full overflow-hidden bg-[#09090E] text-white select-none">
      
      {/* 1. COLLAPSIBLE LEFT SIDEBAR */}
      <aside 
        className={`border-r border-white/5 bg-[#0A0A0F] flex flex-col justify-between transition-all duration-300 no-print z-40 shrink-0 ${collapsed ? "w-20" : "w-[260px]"}`}
      >
        <div>
          {/* Brand Row / Header */}
          <div className="flex items-center justify-between h-20 px-6 border-b border-white/5 select-none">
            <div className={`flex items-center gap-3 transition-opacity duration-200 ${collapsed ? "opacity-0 invisible w-0" : "opacity-100 visible"}`}>
              <div className="p-2 rounded-lg bg-[#00FFB2]/10 border border-[#00FFB2]/20">
                <Sparkles className="w-4 h-4 text-neon-mint" />
              </div>
              <span className="font-display font-medium text-base tracking-tight text-white">RESUME<span className="text-neon-mint">.AI</span></span>
            </div>
            
            <button 
              onClick={() => setCollapsed(!collapsed)}
              className="p-1.5 rounded-lg bg-white/5 border border-white/5 hover:bg-white/10 text-text-muted hover:text-white"
            >
              {collapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
            </button>
          </div>

          {/* Navigation menus */}
          <div className="p-4 flex flex-col gap-5 overflow-y-auto max-h-[calc(100vh-140px)] select-none">
            
            {/* Primary folder */}
            <div className="flex flex-col gap-1.5">
              {!collapsed && <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-[#444460] pl-3 mb-1">core files</span>}
              
              <button 
                onClick={() => setActiveItem("home")}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-medium transition-all ${activeItem === "home" ? "bg-white/5 border-l-2 border-[#00FFB2] text-white" : "text-text-muted hover:text-white"}`}
              >
                <LayoutGrid className="w-4.5 h-4.5 text-text-muted shrink-0" />
                {!collapsed && <span>System Hub</span>}
              </button>

              <button 
                onClick={() => {
                  setSelectedResume(resumesList[0]);
                  setActiveItem("builder");
                }}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-medium transition-all ${activeItem === "builder" ? "bg-white/5 border-l-2 border-[#00FFB2] text-white" : "text-text-muted hover:text-white"}`}
              >
                <Files className="w-4.5 h-4.5 text-text-muted shrink-0" />
                {!collapsed && <span>Resume Builder</span>}
              </button>

              <button 
                onClick={onPremiumTrigger}
                className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-medium text-text-muted hover:text-white select-none"
              >
                <Layers className="w-4.5 h-4.5 text-text-muted shrink-0" />
                {!collapsed && <span className="flex items-center justify-between w-full">Templates <span className="text-[8px] bg-indigo-accent text-white px-1.5 py-0.5 rounded-full font-bold">PRO</span></span>}
              </button>
            </div>

            {/* AI Tools folder */}
            <div className="flex flex-col gap-1.5">
              {!collapsed && <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-[#444460] pl-3 mb-1">AI automation</span>}
              
              <button 
                onClick={() => {
                  setActiveItem("builder");
                  setTimeout(() => {
                    // Simulates opening ATS tab inside builder
                    const atsTrigger = document.querySelector('[id*="ats"]');
                    if (atsTrigger) (atsTrigger as HTMLButtonElement).click();
                  }, 100);
                }}
                className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-medium text-text-muted hover:text-white"
              >
                <Flame className="w-4.5 h-4.5 text-soft-amber shrink-0 animate-pulse" />
                {!collapsed && <span>ATS Match Score</span>}
              </button>

              <button 
                onClick={() => {
                  setActiveItem("builder");
                  setTimeout(() => {
                    const aiTrigger = document.querySelector('[id*="ai"]');
                    if (aiTrigger) (aiTrigger as HTMLButtonElement).click();
                  }, 100);
                }}
                className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-medium text-text-muted hover:text-white"
              >
                <Sparkles className="w-4.5 h-4.5 text-neon-mint shrink-0" />
                {!collapsed && <span>Creative Copilot</span>}
              </button>

              <button 
                onClick={onPremiumTrigger}
                className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-medium text-text-muted hover:text-white"
              >
                <ShieldAlert className="w-4.5 h-4.5 text-text-muted shrink-0" />
                {!collapsed && <span className="flex items-center justify-between w-full">Resume Critic <span className="text-[8px] border border-neon-mint text-neon-mint px-1 rounded-full font-bold">Pro</span></span>}
              </button>
            </div>

            {/* Operations folder */}
            <div className="flex flex-col gap-1.5">
              {!collapsed && <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-[#444460] pl-3 mb-1">CRM Channels</span>}
              
              <button 
                onClick={() => setActiveItem("job-tracker")}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-medium transition-all ${activeItem === "job-tracker" ? "bg-white/5 border-l-2 border-[#00FFB2] text-white" : "text-text-muted hover:text-white"}`}
              >
                <ListTodo className="w-4.5 h-4.5 text-text-muted shrink-0" />
                {!collapsed && <span>Application CRM</span>}
              </button>

              <button 
                onClick={() => setActiveItem("portfolio")}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-medium transition-all ${activeItem === "portfolio" ? "bg-white/5 border-l-2 border-[#00FFB2] text-white" : "text-text-muted hover:text-white"}`}
              >
                <Globe className="w-4.5 h-4.5 text-text-muted shrink-0" />
                {!collapsed && <span>Portfolio web compiler</span>}
              </button>

              <button 
                onClick={() => setActiveItem("linkedin")}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-medium transition-all ${activeItem === "linkedin" ? "bg-white/5 border-l-2 border-[#00FFB2] text-white" : "text-text-muted hover:text-white"}`}
              >
                <Linkedin className="w-4.5 h-4.5 text-text-muted shrink-0" />
                {!collapsed && <span>LinkedIn Sync</span>}
              </button>
            </div>

          </div>
        </div>

        {/* User Account Controls */}
        <div className="p-4 border-t border-white/5 select-none bg-luxury-surface/40">
          <div className="flex items-center justify-between">
            <div className={`flex items-center gap-3 overflow-hidden ${collapsed ? "w-0 opacity-0 invisible" : "w-auto opacity-100 visible"}`}>
              <div className="w-9 h-9 rounded-full bg-indigo-accent text-white font-mono flex items-center justify-center font-bold text-xs shrink-0 uppercase border border-[#00FFB2]/20">
                UK
              </div>
              <div className="flex flex-col truncate">
                <span className="text-xs text-white font-bold">User Terminal</span>
                <span className="text-[10px] text-text-muted truncate">{userEmail}</span>
              </div>
            </div>

            <button 
              onClick={onLogout}
              className="p-2 rounded-lg bg-red-950/20 text-[#FF6B6B] border border-red-900/10 hover:bg-red-900/20 transition-all cursor-pointer"
              title="Logout session"
            >
              <LogOut className="w-4.5 h-4.5" />
            </button>
          </div>
        </div>
      </aside>

      {/* 2. CORE CONTENT STAGE VIEWS */}
      <main className="flex-1 overflow-hidden flex flex-col bg-[#09090E] relative select-text">
        
        {/* VIEW: HOME HUB */}
        {activeItem === "home" && (
          <div className="p-8 flex flex-col gap-8 h-full overflow-y-auto select-none text-left">
            
            {/* Welcome banner */}
            <div className="p-8 rounded-2xl bg-luxury-surface border border-white/5 animate-gradient-mesh relative overflow-hidden flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
              <div>
                <span className="text-[10px] font-mono tracking-widest text-[#00FFB2] font-bold uppercase block mb-1">SYSTEM ONLINE</span>
                <h2 className="font-display text-2xl sm:text-3xl font-black text-white">Welcome back, Dharmesh Katariya</h2>
                <p className="text-xs text-text-muted mt-1 max-w-lg leading-relaxed">Your resume optimization pipeline is fully structured. Take a revision, tailoring bullet points, or check your applicant match rates instantly.</p>
              </div>

              <button 
                onClick={handleCreateNewResume}
                className="px-5 py-3.5 bg-neon-mint hover:shadow-[0_0_20px_rgba(0,255,178,0.4)] text-black font-mono font-bold text-xs uppercase tracking-widest rounded-xl transition-all"
              >
                Deploy New Resume
              </button>
            </div>

            {/* Quick stats row */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="p-5 rounded-2xl bg-luxury-surface border border-white/5 flex flex-col justify-between h-28">
                <span className="text-[10px] font-mono text-text-muted uppercase">DRAFTS COMPILED</span>
                <div className="font-display text-4xl font-extrabold text-white mt-1">{resumesList.length} Drafts</div>
                <p className="text-[10px] text-neon-mint mt-1">Ready for PDF download</p>
              </div>

              <div className="p-5 rounded-2xl bg-luxury-surface border border-white/5 flex flex-col justify-between h-28">
                <span className="text-[10px] font-mono text-[#00FFB2] uppercase">ATS AVERAGE SCORE</span>
                <div className="font-display text-4xl font-extrabold text-white mt-1">94% Rank</div>
                <p className="text-[10px] text-text-muted mt-1">High passing probability</p>
              </div>

              <div className="p-5 rounded-2xl bg-luxury-surface border border-white/5 flex flex-col justify-between h-28">
                <span className="text-[10px] font-mono text-text-muted uppercase">APPLICATIONS IN PIPELINE</span>
                <div className="font-display text-4xl font-extrabold text-white mt-1">3 Active</div>
                <p className="text-[10px] text-indigo-accent mt-1">Exclude wishlist folder</p>
              </div>

              <div className="p-5 rounded-2xl bg-luxury-surface border border-white/5 flex flex-col justify-between h-28">
                <span className="text-[10px] font-mono text-text-muted uppercase">SYSTEM CREDITS LOGS</span>
                <div className="font-display text-4xl font-extrabold text-white mt-1">Infinite</div>
                <p className="text-[10px] text-text-muted mt-1">Unlimited sandbox drafts</p>
              </div>
            </div>

            {/* Recent library / Active projects */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-12">
              
              {/* Resumes Library Panel */}
              <div className="lg:col-span-8 flex flex-col gap-4">
                <div className="flex justify-between items-center px-1">
                  <h3 className="font-display text-base font-bold text-white">Active Draft Repository</h3>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {resumesList.map((res) => (
                    <div 
                      key={res.id}
                      onClick={() => {
                        setSelectedResume(res);
                        setActiveItem("builder");
                      }}
                      className="p-5 rounded-2xl bg-luxury-surface border border-white/5 hover:border-[#00FFB2]/20 cursor-pointer transition-all duration-300 flex flex-col justify-between h-40 group relative overflow-hidden"
                    >
                      <div className="absolute top-0 right-0 w-2 h-full bg-[#00FFB2] opacity-0 group-hover:opacity-100 transition-opacity" />
                      <div>
                        <div className="flex justify-between items-center mb-1">
                          <span className="text-[10px] font-mono text-indigo-accent uppercase font-bold">LATEST REVISION</span>
                          <span className="px-2 py-0.5 rounded bg-neon-mint/10 border border-neon-mint/20 font-mono text-[9px] text-neon-mint font-bold">ATS: {res.atsScore}%</span>
                        </div>
                        <h4 className="font-display font-medium text-sm text-white group-hover:text-neon-mint transition-colors line-clamp-1 mt-1">{res.name}</h4>
                        <p className="text-xs text-text-muted mt-1">{res.header.title}</p>
                      </div>

                      <div className="text-[10px] text-text-muted font-mono border-t border-white/5 pt-3 mt-4 flex items-center justify-between">
                        <span>Modified 2s ago</span>
                        <span className="flex items-center gap-1 text-[#FFB347] font-semibold"><Star className="w-3.5 h-3.5 fill-current" /> favorite</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Tips / Activity logs ledger */}
              <div className="lg:col-span-4 p-6 rounded-2xl bg-luxury-surface border border-white/5 flex flex-col gap-5 text-left">
                <span className="text-[10px] font-mono text-[#00FFB2] font-bold uppercase tracking-widest">Co-pilot Recommendations</span>
                
                <div className="flex flex-col gap-4 text-xs leading-relaxed text-text-muted">
                  <div className="p-3 bg-luxury-elevated rounded-xl border border-white/5">
                    <span className="font-bold text-white block mb-1">✓ Core telemetry found</span>
                    Your resume has strong metric action triggers suitable for Staff levels.
                  </div>

                  <div className="p-3 bg-luxury-elevated rounded-xl border border-white/5">
                    <span className="font-bold text-white block mb-1">⚠️ Keyword density gaps</span>
                    Stripe Frontend Architect role requires keyword densities of "stripe-ui-core". Add to skills to optimize passing rates.
                  </div>

                  <div className="flex items-center gap-1.5 text-neon-mint font-mono font-bold text-[10px] tracking-widest uppercase cursor-pointer hover:underline" onClick={() => setActiveItem("linkedin")}>
                    Optimize Profile Online <ArrowUpRight className="w-3.5 h-3.5" />
                  </div>
                </div>
              </div>

            </div>

          </div>
        )}

        {/* VIEW: RESUME BUILDER INTEGRATED */}
        {activeItem === "builder" && (
          <ResumeBuilder 
            initialResume={selectedResume} 
            onSave={handleUpdateResume}
            onPremiumTrigger={onPremiumTrigger}
          />
        )}

        {/* VIEW: APPLICATION KANBAN INTEGRATED */}
        {activeItem === "job-tracker" && (
          <JobTracker resumes={resumesList.map(r => ({ id: r.id, name: r.name }))} />
        )}

        {/* VIEW: PORTFOLIO EXPORTER */}
        {activeItem === "portfolio" && (
          <PortfolioBuilder resume={selectedResume} />
        )}

        {/* VIEW: LINKEDIN SYNC */}
        {activeItem === "linkedin" && (
          <LinkedInOptimizer onLoadResume={(importedData) => {
            setResumesList([importedData, ...resumesList]);
            setSelectedResume(importedData);
            setActiveItem("builder");
          }} />
        )}

      </main>

    </div>
  );
}
