import React, { useState } from "react";
import { Sparkles, TrendingUp, Download, Eye, Award, CheckCircle, BarChart3, ChevronDown, Calendar, Info, Target, Users } from "lucide-react";

export default function ResumeInsights() {
  const [selectedTimeframe, setSelectedTimeframe] = useState("Last 30 Days");

  // Sample analytical dataset
  const insightsData = {
    viewsCount: 382,
    viewsTrend: "+24.3%",
    downloadCount: 147,
    downloadTrend: "+38.1%",
    avgAtsScore: 94,
    successRate: "28.4%",
    successTrend: "+8.2%",
    totalInterviews: 12,
    weeklyActivity: [40, 65, 80, 55, 95, 110, 85, 147], // Views trends
    recruiterInterests: [
      { company: "Vercel", trigger: "Next.js Web Assembly", date: "2 days ago", confidence: "High" },
      { company: "Stripe", trigger: "stripe-ui-core components", date: "4 days ago", confidence: "Excellent" },
      { company: "Linear", trigger: "offline-first IndexedDB", date: "1 week ago", confidence: "High" },
      { company: "OpenAI", trigger: "Rust model compilers", date: "2 weeks ago", confidence: "Medium" }
    ],
    keywordRankings: [
      { word: "React Server Components", density: "4.2%", benchmark: "Within prime target" },
      { word: "Wasm edge execution", density: "2.8%", benchmark: "Highly competitive" },
      { word: "Distributed state engines", density: "1.9%", benchmark: "Strong standout" },
      { word: "WCAG conformance audits", density: "1.5%", benchmark: "Rare niche asset" }
    ]
  };

  return (
    <div className="flex flex-col gap-6 text-left bg-luxury-surface/30 rounded-2xl border border-white/5 p-6 animate-fade-in select-none">
      
      {/* Title block */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-white/5 pb-4">
        <div>
          <span className="text-[10px] font-mono tracking-widest text-[#00FFB2] font-semibold uppercase block">REAL-TIME PORTFOLIO METRICS</span>
          <h3 className="font-display font-medium text-lg text-white">Resume Insights & Telemetry</h3>
          <p className="text-xs text-text-muted mt-1 leading-relaxed">Quantify candidate interest. Track downloads, recruiter click streams, and target keyword rankings.</p>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs text-text-muted font-mono">{selectedTimeframe}</span>
          <select
            value={selectedTimeframe}
            onChange={(e) => setSelectedTimeframe(e.target.value)}
            className="bg-luxury-elevated border border-white/5 rounded-lg p-2 text-xs text-text-muted font-mono"
          >
            <option value="Last 7 Days">Last 7 Days</option>
            <option value="Last 30 Days">Last 30 Days</option>
            <option value="Last Quarter">Last Quarter</option>
          </select>
        </div>
      </div>

      {/* Grid count cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        
        {/* Metric 1 */}
        <div className="p-4 rounded-xl bg-[#0A0A0F] border border-white/5 flex flex-col justify-between h-28 relative overflow-hidden group hover:border-[#00FFB2]/20 transition-all">
          <div className="flex justify-between items-center text-text-muted">
            <span className="text-[10px] font-mono uppercase tracking-wider">Recruiter Views</span>
            <Eye className="w-4 h-4 text-text-muted" />
          </div>
          <div className="mt-2.5">
            <div className="text-2xl font-black text-white font-display tracking-tight">{insightsData.viewsCount}</div>
            <div className="text-[10px] font-mono text-[#00FFB2] mt-1">{insightsData.viewsTrend} incremental growth</div>
          </div>
        </div>

        {/* Metric 2 */}
        <div className="p-4 rounded-xl bg-[#0A0A0F] border border-white/5 flex flex-col justify-between h-28 relative overflow-hidden group hover:border-[#00FFB2]/20 transition-all">
          <div className="flex justify-between items-center text-text-muted">
            <span className="text-[10px] font-mono uppercase tracking-wider">PDF Downloads</span>
            <Download className="w-4 h-4 text-text-muted" />
          </div>
          <div className="mt-2.5">
            <div className="text-2xl font-black text-white font-display tracking-tight">{insightsData.downloadCount}</div>
            <div className="text-[10px] font-mono text-[#00FFB2] mt-1">{insightsData.downloadTrend} incremental growth</div>
          </div>
        </div>

        {/* Metric 3 */}
        <div className="p-4 rounded-xl bg-[#0A0A0F] border border-white/5 flex flex-col justify-between h-28 relative overflow-hidden group hover:border-[#00FFB2]/20 transition-all">
          <div className="flex justify-between items-center text-text-muted">
            <span className="text-[10px] font-mono uppercase tracking-wider">Interview Conversion</span>
            <Target className="w-4 h-4 text-[#4F6EF7]" />
          </div>
          <div className="mt-2.5">
            <div className="text-2xl font-black text-white font-display tracking-tight">{insightsData.successRate}</div>
            <div className="text-[10px] font-mono text-[#4F6EF7] mt-1">{insightsData.successTrend} versus benchmarks</div>
          </div>
        </div>

        {/* Metric 4 */}
        <div className="p-4 rounded-xl bg-[#0A0A0F] border border-white/5 flex flex-col justify-between h-28 relative overflow-hidden group hover:border-[#00FFB2]/20 transition-all">
          <div className="flex justify-between items-center text-text-muted">
            <span className="text-[10px] font-mono uppercase tracking-wider">Active Loops</span>
            <Users className="w-4 h-4 text-[#FFB347]" />
          </div>
          <div className="mt-2.5">
            <div className="text-2xl font-black text-white font-display tracking-tight">{insightsData.totalInterviews} loops</div>
            <div className="text-[10px] font-mono text-text-muted mt-1">Ready for panel interviews</div>
          </div>
        </div>

      </div>

      {/* SVG Glowing Telemetry Chart Row */}
      <div className="p-5 rounded-2xl bg-[#0A0A0F] border border-white/5">
        <div className="flex justify-between items-center mb-4">
          <div>
            <span className="text-[10px] font-mono text-[#00FFB2] uppercase">RECRUITER VISUAL ANALYSIS</span>
            <h4 className="text-xs font-bold text-white mt-0.5">Weekly Recruiter Traction Timeline</h4>
          </div>
          <div className="flex items-center gap-2 text-[10px] font-mono text-text-muted">
            <span className="w-2.5 h-2.5 rounded-full bg-[#00FFB2]" /> <span>Direct Link Clicks</span>
          </div>
        </div>

        {/* Glowing Area Chart */}
        <div className="relative h-44 w-full flex items-end">
          <svg className="w-full h-full absolute inset-0 overflow-visible" viewBox="0 0 800 150" preserveAspectRatio="none">
            <defs>
              <linearGradient id="glowing-mesh" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#00FFB2" stopOpacity="0.25" />
                <stop offset="100%" stopColor="#00FFB2" stopOpacity="0.0" />
              </linearGradient>
            </defs>
            {/* Background Grid Lines */}
            <line x1="0" y1="37" x2="800" y2="37" stroke="rgba(255,255,255,0.03)" strokeWidth="1" />
            <line x1="0" y1="75" x2="800" y2="75" stroke="rgba(255,255,255,0.03)" strokeWidth="1" />
            <line x1="0" y1="112" x2="800" y2="112" stroke="rgba(255,255,255,0.03)" strokeWidth="1" />
            <line x1="0" y1="150" x2="800" y2="150" stroke="rgba(255,255,255,0.05)" strokeWidth="1" />

            {/* Glowing Line Area Path */}
            <path 
              d="M 0 110 M 0 110 L 100 85 L 200 70 L 300 95 L 400 55 L 500 40 L 600 65 L 700 3 L 800 150 L 0 150 Z" 
              fill="url(#glowing-mesh)" 
            />
            {/* Stroke Line */}
            <path 
              d="M 0 110 L 100 85 L 200 70 L 300 95 L 400 55 L 500 40 L 600 65 L 700 3" 
              fill="none" 
              stroke="#00FFB2" 
              strokeWidth="2.5" 
              strokeLinecap="round"
              className="drop-shadow-[0_0_8px_rgba(0,255,178,0.5)]"
            />

            {/* Glowing Data Dots */}
            <circle cx="100" cy="85" r="4" fill="#00FFB2" stroke="#0A0A0F" strokeWidth="1.5" />
            <circle cx="200" cy="70" r="4" fill="#00FFB2" stroke="#0A0A0F" strokeWidth="1.5" />
            <circle cx="300" cy="95" r="4" fill="#00FFB2" stroke="#0A0A0F" strokeWidth="1.5" />
            <circle cx="400" cy="55" r="4" fill="#00FFB2" stroke="#0A0A0F" strokeWidth="1.5" />
            <circle cx="500" cy="40" r="4" fill="#00FFB2" stroke="#0A0A0F" strokeWidth="1.5" />
            <circle cx="600" cy="65" r="4" fill="#00FFB2" stroke="#0A0A0F" strokeWidth="1.5" />
            <circle cx="700" cy="3" r="5" fill="#00FFB2" stroke="#0A0A0F" strokeWidth="1.5" className="animate-ping" />
            <circle cx="700" cy="3" r="5" fill="#FFB347" stroke="#0A0A0F" strokeWidth="1.5" />
          </svg>

          {/* X Axis Labels */}
          <div className="absolute w-full bottom-0 flex justify-between px-1 text-[8px] font-mono text-text-muted mt-2">
            <span>WK 19</span>
            <span>WK 20</span>
            <span>WK 21</span>
            <span>WK 22</span>
            <span>WK 23</span>
            <span>WK 24</span>
            <span>WK 25</span>
            <span>WK 26 (CURRENT)</span>
          </div>
        </div>
      </div>

      {/* Split details layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        
        {/* Keyword Density and Rankings */}
        <div className="p-5 rounded-2xl bg-[#0A0A0F] border border-white/5">
          <span className="text-[9px] font-mono text-text-muted uppercase tracking-widest block mb-3 font-bold">Search Engine Target Keywords</span>
          <div className="flex flex-col gap-2.5">
            {insightsData.keywordRankings.map((kw, i) => (
              <div key={i} className="flex justify-between items-center text-xs border-b border-white/5 pb-2 last:border-b-0 last:pb-0">
                <div>
                  <span className="text-white font-medium block">{kw.word}</span>
                  <span className="text-[10px] text-text-muted">{kw.benchmark}</span>
                </div>
                <div className="px-2 py-1 rounded bg-white/5 text-[10px] font-mono text-[#00FFB2] font-semibold">
                  {kw.density}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Click Streams */}
        <div className="p-5 rounded-2xl bg-[#0A0A0F] border border-white/5">
          <span className="text-[9px] font-mono text-text-muted uppercase tracking-widest block mb-3 font-bold">Recent Recruiter Ingress Clicks</span>
          <div className="flex flex-col gap-2.5">
            {insightsData.recruiterInterests.map((rec, i) => (
              <div key={i} className="flex justify-between items-center text-xs border-b border-white/5 pb-2 last:border-b-0 last:pb-0">
                <div>
                  <span className="text-white font-bold block">{rec.company}</span>
                  <span className="text-[10px] text-text-muted leading-relaxed">Viewed: {rec.trigger}</span>
                </div>
                <div className="text-right">
                  <span className="text-[10px] text-[#FFB347] font-mono block font-semibold">{"● " + rec.confidence}</span>
                  <span className="text-[8px] text-text-muted font-mono">{rec.date}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

    </div>
  );
}
