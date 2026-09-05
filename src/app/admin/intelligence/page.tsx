'use client';

import React from 'react';
import Link from 'next/link';
import { AppShell } from '@/components/layout/AppShell';
import {
  Workflow,
  TrendingUp,
  Target,
  Sparkles,
  Award,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  AlertCircle,
  Building2,
  GraduationCap,
} from 'lucide-react';

export default function ClosedLoopIntelligencePage() {
  const loops = [
    {
      id: 'loop_cloud',
      skill: 'Cloud Computing & AWS Architecture',
      industryDemand: 'Surged +38% across hiring partners',
      demandSource: 'Razorpay, TCS Digital, AWS Solutions',
      studentProficiency: '39% (61% student cohort deficit)',
      studentsImpacted: 760,
      recommendedIntervention: '4-Week Intensive Cloud Architecture & Container Bootcamp',
      projectedImpact: '+14 readiness points across CSE/IT cohorts',
      outcome: 'Projected +18% increase in 8+ LPA cloud placement offers',
      status: 'Active Intervention',
    },
    {
      id: 'loop_fastapi',
      skill: 'FastAPI & Modern Microservice APIs',
      industryDemand: 'Demanded in 72% of backend internship listings',
      demandSource: 'Zomato Engineering, Swiggy, FinTech Startups',
      studentProficiency: '48% (45% student deficit)',
      studentsImpacted: 561,
      recommendedIntervention: 'Asynchronous API Engineering Sprint with Industry Code Reviews',
      projectedImpact: '+11 readiness points',
      outcome: 'Direct candidate pipeline to Razorpay & Zomato backend tracks',
      status: 'Curriculum Approved',
    },
    {
      id: 'loop_docker',
      skill: 'Docker Containerization & CI/CD',
      industryDemand: '100% required in modern software engineering teams',
      demandSource: 'Corporate Feedback Aggregations',
      studentProficiency: '46% (54% student deficit)',
      studentsImpacted: 674,
      recommendedIntervention: 'Weekend Hands-on Containerization & Multi-stage Build Labs',
      projectedImpact: '+8 readiness points',
      outcome: 'Eliminates 3-month corporate onboarding retraining delay',
      status: 'In Progress',
    },
  ];

  return (
    <AppShell>
      <div className="space-y-6">
        {/* Header */}
        <div className="p-6 rounded-2xl bg-white border border-slate-200/80 shadow-sm">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 mb-1.5">
                <span className="p-1 rounded-md bg-blue-50 text-blue-600 border border-blue-200">
                  <Workflow className="w-4 h-4" />
                </span>
                <span className="text-xs font-mono uppercase tracking-wider text-blue-600 font-bold">
                  Core SIH26044 Paradigm Shift
                </span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                Industry → Academia Closed-Loop Intelligence
              </h1>
              <p className="text-xs sm:text-sm text-slate-600 mt-1 max-w-2xl leading-relaxed">
                Transforming university education from static syllabi into an agile, data-driven feedback system. Corporate hiring demands directly shape academic bootcamps and measurable student outcomes.
              </p>
            </div>

            <div className="flex items-center gap-2">
              <Link
                href="/admin/training"
                className="px-4 py-2 text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 rounded-xl transition-all shadow-sm flex items-center gap-1.5"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>Generate New Training Plan</span>
              </Link>
            </div>
          </div>

          {/* Model Notice */}
          <div className="mt-4 pt-3 border-t border-slate-100 flex items-center gap-2 text-xs text-slate-500">
            <AlertCircle className="w-3.5 h-3.5 text-blue-600 shrink-0" />
            <span>
              <strong>Model Calibration:</strong> Projections represent model-based estimates calibrated across 1,248 student profiles and historical campus placement outcomes.
            </span>
          </div>
        </div>

        {/* Closed-Loop Pipeline Steps Visualization */}
        <div className="p-6 rounded-2xl bg-white border border-slate-200/80 shadow-sm">
          <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-4 flex items-center gap-2">
            <Workflow className="w-4 h-4 text-emerald-600" />
            Continuous 5-Stage Closed-Loop Architecture
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-3">
            {[
              {
                num: '1',
                title: 'Industry Demand',
                desc: 'Corporate job specs & recruiter trends indexed in real time.',
                icon: Building2,
                color: 'text-amber-600',
              },
              {
                num: '2',
                title: 'Student Skill Gap',
                desc: 'Cohort-level deficits calculated against market benchmarks.',
                icon: Target,
                color: 'text-red-600',
              },
              {
                num: '3',
                title: 'Training Intervention',
                desc: 'Academic Council auto-generates targeted bootcamps & FDPs.',
                icon: Sparkles,
                color: 'text-blue-600',
              },
              {
                num: '4',
                title: 'Student Upskilling',
                desc: 'Students complete projects, elevating Skill Twins & Readiness.',
                icon: GraduationCap,
                color: 'text-indigo-600',
              },
              {
                num: '5',
                title: 'Placement Outcome',
                desc: 'Higher match rates, zero retraining lag, and company feedback.',
                icon: CheckCircle2,
                color: 'text-emerald-600',
              },
            ].map((step) => {
              const Icon = step.icon;
              return (
                <div
                  key={step.num}
                  className="p-4 rounded-xl bg-slate-50/70 border border-slate-200/80 flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-mono font-bold text-slate-400">
                        Step {step.num}
                      </span>
                      <Icon className={`w-4 h-4 ${step.color}`} />
                    </div>
                    <h3 className="text-xs font-bold text-slate-900">{step.title}</h3>
                    <p className="text-[11px] text-slate-500 mt-1 leading-snug">{step.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Live Closed-Loop Pipelines */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-bold text-slate-900 tracking-tight">
              Active Closed-Loop Interventions ({loops.length})
            </h2>
            <span className="text-xs text-slate-500">All data synchronized with active hiring partners</span>
          </div>

          <div className="space-y-4">
            {loops.map((loop) => (
              <div
                key={loop.id}
                className="p-6 rounded-2xl bg-white border border-slate-200/80 shadow-sm space-y-4"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-3">
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="text-base font-bold text-slate-900">{loop.skill}</h3>
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-blue-50 text-blue-700 border border-blue-200 font-semibold uppercase">
                        {loop.status}
                      </span>
                    </div>
                    <p className="text-xs text-slate-500 mt-0.5">
                      Feedback source: {loop.demandSource}
                    </p>
                  </div>

                  <div className="text-right shrink-0">
                    <span className="text-xs font-mono font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2.5 py-1 rounded-lg">
                      {loop.projectedImpact}
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
                  <div className="p-3 rounded-xl bg-slate-50/70 border border-slate-200/80">
                    <span className="text-[10px] text-amber-700 uppercase font-semibold">1. Industry Demand Signal</span>
                    <p className="font-medium text-slate-900 mt-1">{loop.industryDemand}</p>
                  </div>

                  <div className="p-3 rounded-xl bg-slate-50/70 border border-slate-200/80">
                    <span className="text-[10px] text-red-700 uppercase font-semibold">2. Student Cohort Deficit</span>
                    <p className="font-medium text-slate-900 mt-1">{loop.studentProficiency}</p>
                    <p className="text-[10px] text-slate-500 mt-0.5">{loop.studentsImpacted} students affected</p>
                  </div>

                  <div className="p-3 rounded-xl bg-slate-50/70 border border-slate-200/80">
                    <span className="text-[10px] text-blue-700 uppercase font-semibold">3. Academic Intervention</span>
                    <p className="font-medium text-slate-900 mt-1">{loop.recommendedIntervention}</p>
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-xs flex items-center justify-between">
                  <div className="flex items-center gap-2 text-emerald-900">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>
                      <strong>Measurable Institutional Outcome:</strong> {loop.outcome}
                    </span>
                  </div>
                  <Link
                    href="/admin/training"
                    className="text-emerald-700 font-semibold hover:underline shrink-0 ml-4"
                  >
                    View Curriculum Plan →
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </AppShell>
  );
}
