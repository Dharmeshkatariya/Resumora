import React, { useState } from "react";
import { JobCard } from "../types";
import { SAMPLE_JOBS } from "../mockData";
import { Plus, Search, Calendar, DollarSign, Filter, Grid, List, TrendingUp, BarChart, ArrowRight, X, Trash2, Edit } from "lucide-react";

interface JobTrackerProps {
  resumes: { id: string; name: string }[];
}

const COLUMNS: { id: JobCard["status"]; label: string; color: string }[] = [
  { id: "wishlist", label: "Wishlist", color: "border-slate-800 bg-slate-900/40 text-slate-400" },
  { id: "applied", label: "Applied", color: "border-[#4F6EF7]/20 bg-[#4F6EF7]/5 text-[#4F6EF7]" },
  { id: "phonescreen", label: "Phone Screen", color: "border-indigo-accent bg-[#4F6EF7]/10 text-indigo-accent" },
  { id: "interview", label: "Interview", color: "border-soft-amber bg-[#FFB347]/10 text-[#FFB347]" },
  { id: "offer", label: "Offer", color: "border-neon-mint bg-[#00FFB2]/10 text-neon-mint shadow-[0_0_15px_rgba(0,255,178,0.05)]" },
  { id: "rejected", label: "Archive", color: "border-luxury-danger/30 bg-red-950/20 text-[#FF6B6B]" }
];

export default function JobTracker({ resumes }: JobTrackerProps) {
  const [jobs, setJobs] = useState<JobCard[]>(SAMPLE_JOBS);
  const [viewMode, setViewMode] = useState<"board" | "list" | "analytics">("board");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedJob, setSelectedJob] = useState<JobCard | null>(null);
  const [showAddModal, setShowAddModal] = useState(false);

  // New Job local state
  const [newCompany, setNewCompany] = useState("");
  const [newRole, setNewRole] = useState("");
  const [newSalary, setNewSalary] = useState("");
  const [newNotes, setNewNotes] = useState("");

  const handleMoveStatus = (jobId: string, nextStatus: JobCard["status"]) => {
    setJobs(jobs.map(j => j.id === jobId ? { ...j, status: nextStatus } : j));
    if (selectedJob && selectedJob.id === jobId) {
      setSelectedJob({ ...selectedJob, status: nextStatus });
    }
  };

  const handleDeleteJob = (jobId: string) => {
    setJobs(jobs.filter(j => j.id !== jobId));
    setSelectedJob(null);
  };

  const handleAddJob = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCompany || !newRole) return;

    const newJobObj: JobCard = {
      id: "job-" + Date.now(),
      company: newCompany,
      logo: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=80&fit=crop&auto=format",
      role: newRole,
      salary: newSalary || "Not specified",
      date: new Date().toISOString().split("T")[0],
      status: "wishlist",
      notes: newNotes
    };

    setJobs([newJobObj, ...jobs]);
    setNewCompany("");
    setNewRole("");
    setNewSalary("");
    setNewNotes("");
    setShowAddModal(false);
  };

  // Filter systems
  const filteredJobs = jobs.filter(
    (j) =>
      j.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
      j.role.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Stats Counters
  const totalApplied = jobs.filter(j => j.status !== "wishlist").length;
  const interviewsCount = jobs.filter(j => j.status === "interview").length;
  const offersCount = jobs.filter(j => j.status === "offer").length;
  const rejectedCount = jobs.filter(j => j.status === "rejected").length;

  const interviewRate = totalApplied > 0 ? Math.round((interviewsCount / totalApplied) * 100) : 0;
  const offerRate = totalApplied > 0 ? Math.round((offersCount / totalApplied) * 100) : 0;

  return (
    <div className="flex flex-col gap-6 h-full p-6 select-none overflow-y-auto">
      
      {/* Tracker Top Bar */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-white/5 pb-6">
        <div>
          <h2 className="font-display text-2xl font-black text-white">Job Application CRM</h2>
          <p className="text-xs text-text-muted">Monitor interviews, customize resumes, and calculate response metrics</p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          {/* View Toggles */}
          <div className="flex p-0.5 rounded-lg bg-luxury-surface border border-white/5">
            <button 
              onClick={() => setViewMode("board")}
              className={`p-1.5 rounded-md text-xs font-medium flex items-center gap-1.5 transition-all ${viewMode === "board" ? "bg-white/10 text-white" : "text-text-muted hover:text-white"}`}
            >
              <Grid className="w-3.5 h-3.5" /> Board
            </button>
            <button 
              onClick={() => setViewMode("list")}
              className={`p-1.5 rounded-md text-xs font-medium flex items-center gap-1.5 transition-all ${viewMode === "list" ? "bg-white/10 text-white" : "text-text-muted hover:text-white"}`}
            >
              <List className="w-3.5 h-3.5" /> List Table
            </button>
            <button 
              onClick={() => setViewMode("analytics")}
              className={`p-1.5 rounded-md text-xs font-medium flex items-center gap-1.5 transition-all ${viewMode === "analytics" ? "bg-white/10 text-white" : "text-text-muted hover:text-white"}`}
            >
              <TrendingUp className="w-3.5 h-3.5" /> Analytics
            </button>
          </div>

          <button 
            onClick={() => setShowAddModal(true)}
            className="px-4 py-2 bg-neon-mint text-black font-mono font-bold text-xs uppercase tracking-widest rounded-xl hover:shadow-[0_0_15px_rgba(0,255,178,0.3)] transition-all flex items-center gap-1.5"
          >
            <Plus className="w-4 h-4" /> Add Application
          </button>
        </div>
      </div>

      {viewMode !== "analytics" && (
        <div className="flex gap-4 w-full max-w-sm">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-text-muted" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search companies or roles..."
              className="w-full pl-9 pr-4 py-2.5 rounded-xl bg-luxury-surface border border-white/5 text-xs text-white focus:outline-none focus:border-neon-mint"
            />
          </div>
        </div>
      )}

      {/* RENDER VIEW: KANBAN BOARD */}
      {viewMode === "board" && (
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4 items-start h-full">
          {COLUMNS.map((column) => {
            const columnJobs = filteredJobs.filter(j => j.status === column.id);
            return (
              <div key={column.id} className="flex flex-col gap-3 p-3 bg-luxury-surface/30 rounded-xl border border-white/5 min-h-[440px]">
                <div className="flex justify-between items-center px-1">
                  <span className={`text-xs font-mono font-semibold tracking-wide px-2.5 py-1.5 rounded border ${column.color}`}>
                    {column.label}
                  </span>
                  <span className="text-[10px] font-mono text-text-muted bg-white/5 px-1.5 py-0.5 rounded">
                    {columnJobs.length}
                  </span>
                </div>

                <div className="flex flex-col gap-3 mt-2">
                  {columnJobs.map((job) => (
                    <div 
                      key={job.id} 
                      onClick={() => setSelectedJob(job)}
                      className="p-4 rounded-xl bg-luxury-elevated border border-white/5 hover:border-[#00FFB2]/20 shadow-md cursor-pointer transition-all duration-200 group relative overflow-hidden"
                    >
                      <div className="absolute top-0 right-0 w-1.5 h-full bg-indigo-accent opacity-0 group-hover:opacity-100 transition-opacity" />
                      <div className="flex justify-between items-start mb-2">
                        <span className="text-xs font-bold text-white group-hover:text-neon-mint transition-colors line-clamp-1">{job.company}</span>
                      </div>
                      <p className="text-[11px] font-medium text-text-muted line-clamp-1 mb-3">{job.role}</p>
                      
                      <div className="flex justify-between items-center text-[10px] text-text-muted font-mono mt-1 border-t border-white/5 pt-2">
                        <span className="flex items-center gap-0.5 text-[#FFB347] font-semibold">
                          <DollarSign className="w-3 h-3" /> {job.salary}
                        </span>
                        <span className="text-[9px]">{job.date}</span>
                      </div>
                    </div>
                  ))}

                  {columnJobs.length === 0 && (
                    <div className="text-center py-12 text-text-muted text-[11px] border border-dashed border-white/5 rounded-xl">
                      Empty Segment
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* RENDER VIEW: LIST TABLE */}
      {viewMode === "list" && (
        <div className="luxury-glass rounded-2xl overflow-hidden border border-white/5">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-white/5 bg-white/[0.02] text-[10px] font-mono text-text-muted uppercase tracking-wider">
                  <th className="py-4 px-6">Company</th>
                  <th className="py-4 px-6">Role</th>
                  <th className="py-4 px-6">Status</th>
                  <th className="py-4 px-6">Salary Guidance</th>
                  <th className="py-4 px-6">Date Added</th>
                  <th className="py-4 px-6 text-right">Interactive Adjust</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5 text-xs">
                {filteredJobs.map((job) => (
                  <tr key={job.id} className="hover:bg-white/[0.01] transition-all">
                    <td className="py-4 px-6 font-bold text-white">{job.company}</td>
                    <td className="py-4 px-6 text-text-muted font-medium">{job.role}</td>
                    <td className="py-4 px-6">
                      <span className={`px-2 py-1 rounded text-[10px] font-mono border ${COLUMNS.find(c => c.id === job.status)?.color}`}>
                        {job.status.toUpperCase()}
                      </span>
                    </td>
                    <td className="py-4 px-6 font-mono text-text-muted">{job.salary}</td>
                    <td className="py-4 px-6 font-mono text-text-muted">{job.date}</td>
                    <td className="py-4 px-6 text-right flex justify-end gap-2.5">
                      <select 
                        value={job.status} 
                        onChange={(e) => handleMoveStatus(job.id, e.target.value as any)}
                        className="bg-luxury-surface border border-white/5 text-[10px] font-mono text-text-muted p-1 px-2 rounded focus:outline-none focus:border-neon-mint"
                      >
                        <option value="wishlist">Wishlist</option>
                        <option value="applied">Applied</option>
                        <option value="phonescreen">Phone Screen</option>
                        <option value="interview">Interview</option>
                        <option value="offer">Offer</option>
                        <option value="rejected">Archive</option>
                      </select>
                      <button 
                        onClick={() => handleDeleteJob(job.id)}
                        className="p-1 rounded text-luxury-danger hover:bg-red-500/10 transition-colors"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </td>
                  </tr>
                ))}
                {filteredJobs.length === 0 && (
                  <tr>
                    <td colSpan={6} className="text-center py-12 text-text-muted text-xs">
                      No applications match search logs.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* RENDER VIEW: ANALYTICS & STATS DASHBOARD */}
      {viewMode === "analytics" && (
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 pb-12">
          
          {/* High level counters */}
          <div className="md:col-span-4 p-6 rounded-2xl bg-luxury-surface/60 border border-white/5 flex flex-col justify-between">
            <div>
              <span className="text-[10px] font-mono text-indigo-accent uppercase tracking-widest block mb-1">FUNNEL ANALYTICS</span>
              <h3 className="font-display text-lg font-bold text-white">Application Pipeline Speed</h3>
            </div>
            
            <div className="flex flex-col gap-4 mt-6">
              <div>
                <div className="flex justify-between items-center text-xs text-text-muted mb-1.5">
                  <span>Wishlist Ratio</span>
                  <span>{jobs.filter(j => j.status === "wishlist").length} Jobs</span>
                </div>
                <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                  <div className="h-full bg-slate-500" style={{ width: `${(jobs.filter(j => j.status === "wishlist").length / jobs.length) * 100}%` }} />
                </div>
              </div>

              <div>
                <div className="flex justify-between items-center text-xs text-text-muted mb-1.5">
                  <span>Response Rate (Phone + Interviews)</span>
                  <span className="text-[#00FFB2]">{interviewRate}% Success</span>
                </div>
                <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                  <div className="h-full bg-neon-mint" style={{ width: `${interviewRate}%` }} />
                </div>
              </div>

              <div>
                <div className="flex justify-between items-center text-xs text-text-muted mb-1.5">
                  <span>Final Job Offer Yield</span>
                  <span className="text-[#FFB347]">{offerRate}% Yield</span>
                </div>
                <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                  <div className="h-full bg-[#FFB347]" style={{ width: `${offerRate}%` }} />
                </div>
              </div>
            </div>
          </div>

          {/* Quick Metrics */}
          <div className="md:col-span-8 grid grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="p-5 rounded-2xl bg-luxury-elevated border border-white/5 flex flex-col justify-between">
              <span className="text-[10px] font-mono text-text-muted uppercase">ACTIVE APPLICATIONS</span>
              <div className="font-display font-black text-4xl text-white mt-4">{totalApplied}</div>
              <p className="text-[10px] text-text-muted mt-2">Exclude Wishlist folder</p>
            </div>

            <div className="p-5 rounded-2xl bg-luxury-elevated border border-white/5 flex flex-col justify-between">
              <span className="text-[10px] font-mono text-[#FFB347] uppercase">INTERVIEWS BOOKED</span>
              <div className="font-display font-black text-4xl text-white mt-4">{interviewsCount}</div>
              <p className="text-[10px] text-neon-mint mt-2">{interviewRate}% Conversion</p>
            </div>

            <div className="p-5 rounded-2xl bg-luxury-elevated border border-white/5 flex flex-col justify-between animate-glow-pulse">
              <span className="text-[10px] font-mono text-neon-mint uppercase">OFFERS ACQUIRED</span>
              <div className="font-display font-black text-4xl text-neon-mint mt-4">{offersCount}</div>
              <p className="text-[10px] text-text-muted mt-2">Ready for onboarding</p>
            </div>

            <div className="p-5 rounded-2xl bg-luxury-elevated border border-white/5 flex flex-col justify-between">
              <span className="text-[10px] font-mono text-text-muted uppercase">REJECTION COUNT</span>
              <div className="font-display font-black text-4xl text-neutral-500 mt-4">{rejectedCount}</div>
              <p className="text-[10px] text-neutral-600 mt-2">Archive folders</p>
            </div>
          </div>

        </div>
      )}

      {/* DETAIL SIDE PANEL DRAWER */}
      {selectedJob && (
        <div className="fixed inset-y-0 right-0 w-full sm:w-[460px] bg-luxury-surface border-l border-white/10 z-50 shadow-2xl p-6 flex flex-col justify-between animate-slide-in">
          <div>
            <div className="flex justify-between items-center border-b border-white/5 pb-4 mb-6">
              <span className="text-xs font-mono font-bold uppercase text-neon-mint tracking-wider">APPLICANT RECORD SHEET</span>
              <button 
                onClick={() => setSelectedJob(null)}
                className="p-1 px-2.5 rounded bg-white/5 text-text-muted text-xs hover:text-white hover:bg-white/10"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="flex flex-col gap-5">
              <div>
                <h3 className="font-display text-xl font-bold text-white">{selectedJob.company}</h3>
                <p className="text-sm text-indigo-accent font-medium mt-0.5">{selectedJob.role}</p>
              </div>

              <hr className="border-white/5" />

              <div className="grid grid-cols-2 gap-4 text-xs font-mono">
                <div>
                  <span className="text-[10px] text-text-muted uppercase tracking-wider block">CREATION DATE</span>
                  <span className="text-white mt-1 block">{selectedJob.date}</span>
                </div>
                <div>
                  <span className="text-[10px] text-text-muted uppercase tracking-wider block">SALARY COMP</span>
                  <span className="text-[#FFB347] font-semibold mt-1 block">{selectedJob.salary}</span>
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <span className="text-[10px] font-mono text-text-muted uppercase tracking-wider">PIPELINE STATUS</span>
                <div className="flex flex-wrap gap-2">
                  {COLUMNS.map((col) => (
                    <button
                      key={col.id}
                      onClick={() => handleMoveStatus(selectedJob.id, col.id)}
                      className={`px-2.5 py-1.5 rounded text-[10px] font-mono border transition-all ${selectedJob.status === col.id ? col.color : "border-white/5 bg-transparent hover:border-white/10 text-text-muted"}`}
                    >
                      {col.label.toUpperCase()}
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex flex-col gap-2 mt-2">
                <span className="text-[10px] font-mono text-text-muted uppercase tracking-wider">INTERACTION DIARY NOTES</span>
                <textarea
                  value={selectedJob.notes}
                  onChange={(e) => {
                    const val = e.target.value;
                    setSelectedJob({ ...selectedJob, notes: val });
                    setJobs(jobs.map(j => j.id === selectedJob.id ? { ...j, notes: val } : j));
                  }}
                  rows={4}
                  className="w-full bg-luxury-elevated border border-white/5 rounded-xl p-3 text-xs text-white focus:outline-none focus:border-indigo-accent leading-relaxed"
                  placeholder="Record call updates, follow-up dates, interviewer names, or salary feedback..."
                />
              </div>
            </div>
          </div>

          <div className="border-t border-white/5 pt-4 flex gap-4">
            <button
              onClick={() => handleDeleteJob(selectedJob.id)}
              className="px-4 py-2.5 rounded-xl bg-red-950/20 text-[#FF6B6B] border border-red-900/30 font-mono text-xs uppercase hover:bg-neutral-900 transition-colors flex-1 flex items-center justify-center gap-1.5"
            >
              <Trash2 className="w-3.5 h-3.5" /> Expunge Record
            </button>
          </div>
        </div>
      )}

      {/* ADD APPLICATION MODAL */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-md z-50 flex items-center justify-center p-4">
          <div className="w-full max-w-md bg-luxury-surface border border-white/10 rounded-2xl p-6 shadow-2xl relative">
            <button 
              onClick={() => setShowAddModal(false)}
              className="absolute top-4 right-4 p-1.5 rounded-full bg-white/5 text-text-muted hover:text-white"
            >
              <X className="w-4 h-4" />
            </button>
            
            <h3 className="font-display text-lg font-black text-white mb-1">New Tracker Node</h3>
            <p className="text-xs text-text-muted mb-6">Log target vacancy to align tailor revisions</p>

            <form onSubmit={handleAddJob} className="flex flex-col gap-4">
              <div className="flex flex-col gap-1.5">
                <label className="text-[10px] font-mono text-text-muted uppercase">Target Corporation Name</label>
                <input
                  type="text"
                  required
                  value={newCompany}
                  onChange={(e) => setNewCompany(e.target.value)}
                  className="w-full p-2.5 rounded-xl bg-luxury-elevated border border-white/5 text-xs text-white focus:outline-none focus:border-neon-mint"
                  placeholder="Stripe, Vercel, Apple"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-[10px] font-mono text-text-muted uppercase">Target Role Title</label>
                <input
                  type="text"
                  required
                  value={newRole}
                  onChange={(e) => setNewRole(e.target.value)}
                  className="w-full p-2.5 rounded-xl bg-luxury-elevated border border-white/5 text-xs text-white focus:outline-none focus:border-neon-mint"
                  placeholder="Staff Frontend Engineer"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-[10px] font-mono text-text-muted uppercase">Annual Compensation Target</label>
                <input
                  type="text"
                  value={newSalary}
                  onChange={(e) => setNewSalary(e.target.value)}
                  className="w-full p-2.5 rounded-xl bg-luxury-elevated border border-white/5 text-xs text-white focus:outline-none focus:border-neon-mint"
                  placeholder="e.g. $180,000"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-[10px] font-mono text-text-muted uppercase">Initial Diary Notes</label>
                <textarea
                  value={newNotes}
                  onChange={(e) => setNewNotes(e.target.value)}
                  rows={3}
                  className="w-full p-2.5 rounded-xl bg-luxury-elevated border border-white/5 text-xs text-white focus:outline-none focus:border-neon-mint"
                  placeholder="Mention recruting pipelines or match key outlines..."
                />
              </div>

              <button
                type="submit"
                className="w-full mt-2 py-3 bg-neon-mint text-black font-mono font-bold text-xs uppercase tracking-widest rounded-xl hover:shadow-[0_0_15px_rgba(0,255,178,0.4)] transition-all flex items-center justify-center gap-1"
              >
                Complete Node Deployment <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
