'use client';

import React from 'react';
import Link from 'next/link';
import { AppShell } from '@/components/layout/AppShell';
import { INDUSTRY_SKILL_DEMANDS } from '@/data/seedData';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from 'recharts';
import {
  TrendingUp,
  AlertCircle,
  Sparkles,
  ArrowRight,
  Target,
  BarChart3,
  Layers,
  ArrowUpRight,
} from 'lucide-react';

export default function IndustrySkillDemandPage() {
  const chartData = INDUSTRY_SKILL_DEMANDS.map((d) => ({
    name: d.skill,
    growth: d.growth,
    demand: d.demandCount,
  }));

  const emergingSkills = [
    { skill: 'FastAPI Microservices', surge: '+42%', role: 'Backend Developer' },
    { skill: 'Vector Databases (Pinecone/Milvus)', surge: '+39%', role: 'AI/ML Engineer' },
    { skill: 'Cloud Native Kubernetes', surge: '+36%', role: 'DevOps Specialist' },
    { skill: 'Next.js Server Actions', surge: '+33%', role: 'Full Stack Developer' },
  ];

  const decliningSkills = [
    { skill: 'Monolithic PHP/jQuery', drop: '-22%', reason: 'Replaced by modern decoupled REST/React' },
    { skill: 'Manual Shell Script Deployment', drop: '-18%', reason: 'Automated by GitHub Actions & Docker' },
    { skill: 'On-premise FTP Servers', drop: '-29%', reason: 'Migrated to AWS S3 & Cloudflare R2' },
  ];

  return (
    <AppShell>
      <div className="space-y-6">
        {/* Header */}
        <div className="p-6 rounded-2xl bg-gradient-to-r from-slate-900 via-emerald-950/40 to-slate-900 border border-slate-800 shadow-xl">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 mb-1.5">
                <span className="p-1 rounded-md bg-emerald-950 text-emerald-400 border border-emerald-800/60">
                  <TrendingUp className="w-4 h-4" />
                </span>
                <span className="text-xs font-mono uppercase tracking-wider text-emerald-400 font-bold">
                  Market Skill Intelligence
                </span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                Industry Skill Demand Observatory
              </h1>
              <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-2xl leading-relaxed">
                Real-time algorithmic indexing of skill requirements across 42 corporate hiring partners and 684 active job listings in the Indian engineering tech ecosystem.
              </p>
            </div>

            <div className="flex items-center gap-2">
              <Link
                href="/admin/training"
                className="px-4 py-2 text-xs font-bold text-slate-950 bg-emerald-400 hover:bg-emerald-300 rounded-xl transition-all shadow-md shadow-emerald-500/20 flex items-center gap-1.5"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>Auto-Generate Faculty Training</span>
              </Link>
            </div>
          </div>

          {/* Prototype Label required by prompt */}
          <div className="mt-4 pt-3 border-t border-slate-800 flex items-center gap-2 text-xs text-slate-400">
            <AlertCircle className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
            <span>
              <strong>Notice:</strong> Prototype industry-demand simulation based on aggregated hiring datasets. Refreshed bi-weekly.
            </span>
          </div>
        </div>

        {/* Growth Bar Chart */}
        <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 shadow-md">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
                <BarChart3 className="w-4 h-4 text-emerald-400" />
                Annual Skill Growth Rate (%)
              </h2>
              <p className="text-xs text-slate-400">Year-over-year increase in employer demand</p>
            </div>
            <span className="text-xs font-mono text-emerald-400 bg-emerald-950/80 border border-emerald-800/60 px-2 py-0.5 rounded">
              High Growth Tier: &gt; 25%
            </span>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData} margin={{ top: 10, right: 20, left: -20, bottom: 20 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                <XAxis dataKey="name" stroke="#64748b" fontSize={10} angle={-15} textAnchor="end" />
                <YAxis stroke="#64748b" fontSize={11} />
                <Tooltip
                  contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '8px', fontSize: '12px' }}
                  labelStyle={{ color: '#94a3b8' }}
                />
                <Bar dataKey="growth" fill="#10b981" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Emerging vs Declining Skills Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Emerging Skills */}
          <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 shadow-md space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-sm font-bold text-emerald-400 uppercase tracking-wider flex items-center gap-2">
                <ArrowUpRight className="w-4 h-4" />
                Rapidly Emerging Technologies
              </h2>
              <span className="text-[10px] font-mono text-slate-400">Past 120 Days</span>
            </div>

            <div className="space-y-2.5">
              {emergingSkills.map((item) => (
                <div
                  key={item.skill}
                  className="p-3.5 rounded-xl bg-slate-950/80 border border-slate-800/80 flex items-center justify-between"
                >
                  <div>
                    <p className="text-xs font-bold text-white">{item.skill}</p>
                    <p className="text-[11px] text-slate-400 mt-0.5">Primary Target: {item.role}</p>
                  </div>
                  <span className="text-xs font-mono font-black text-emerald-400 bg-emerald-950/80 border border-emerald-800/60 px-2 py-0.5 rounded">
                    {item.surge}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Declining Skills */}
          <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 shadow-md space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-sm font-bold text-amber-400 uppercase tracking-wider flex items-center gap-2">
                <AlertCircle className="w-4 h-4" />
                Declining Academic Legacy Stacks
              </h2>
              <span className="text-[10px] font-mono text-slate-400">Deprecation Trend</span>
            </div>

            <div className="space-y-2.5">
              {decliningSkills.map((item) => (
                <div
                  key={item.skill}
                  className="p-3.5 rounded-xl bg-slate-950/80 border border-slate-800/80 flex items-center justify-between"
                >
                  <div>
                    <p className="text-xs font-bold text-white">{item.skill}</p>
                    <p className="text-[11px] text-slate-400 mt-0.5">{item.reason}</p>
                  </div>
                  <span className="text-xs font-mono font-bold text-red-400 bg-red-950/80 border border-red-800/60 px-2 py-0.5 rounded">
                    {item.drop}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </AppShell>
  );
}
