'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { AppShell } from '@/components/layout/AppShell';
import {
  Workflow,
  Building2,
  Calendar,
  CheckCircle2,
  Users,
  Award,
  BookOpen,
  ArrowRight,
  Filter,
} from 'lucide-react';

interface CollaborationItem {
  id: string;
  title: string;
  partnerCompany: string;
  type:
    | 'Faculty Development'
    | 'Industry Training'
    | 'Research Collaboration'
    | 'Consultancy'
    | 'Guest Lecture'
    | 'Mentorship'
    | 'Live Project';
  duration: string;
  seatsOrStipend: string;
  department: string;
  deadline: string;
  description: string;
  applied: boolean;
}

const INITIAL_COLLABS: CollaborationItem[] = [
  {
    id: 'collab_1',
    title: 'National FDP: Distributed Microservices & Cloud Native Architectures',
    partnerCompany: 'Microsoft India Academic Initiative',
    type: 'Faculty Development',
    duration: '2 Weeks (Online + Hands-on Labs)',
    seatsOrStipend: '30 Faculty Seats (Funded)',
    department: 'CSE / IT',
    deadline: '2026-04-10',
    description: 'Immersive faculty upskilling on container orchestration, distributed observability, and cloud curricula design for engineering educators.',
    applied: false,
  },
  {
    id: 'collab_2',
    title: 'Joint R&D Lab: Low-Latency High-Frequency Algorithmic Systems',
    partnerCompany: 'Razorpay Software',
    type: 'Research Collaboration',
    duration: '1 Year Grant',
    seatsOrStipend: '₹12,00,000 Research Grant',
    department: 'Computer Science',
    deadline: '2026-05-01',
    description: 'Collaborative academic-industry research on real-time fraud mitigation algorithms utilizing distributed Redis memory meshes.',
    applied: true,
  },
  {
    id: 'collab_3',
    title: 'Executive Guest Lecture Series: Enterprise API Architecture',
    partnerCompany: 'Zomato Engineering',
    type: 'Guest Lecture',
    duration: '4 Sessions (Bi-weekly)',
    seatsOrStipend: 'Delivered by VP of Engineering',
    department: 'All Engineering',
    deadline: '2026-04-20',
    description: 'Senior industry leaders address campus cohorts on real-world incident response and production scaling challenges.',
    applied: false,
  },
  {
    id: 'collab_4',
    title: 'Corporate Consultancy: Legacy ERP Cloud Migration',
    partnerCompany: 'TCS Digital Solutions',
    type: 'Consultancy',
    duration: '6 Months',
    seatsOrStipend: 'Faculty Retainer + Student Interns',
    department: 'CSE / IT / Systems',
    deadline: '2026-04-30',
    description: 'Faculty advisory role guiding enterprise database schema normalization and zero-downtime PostgreSQL migration.',
    applied: false,
  },
  {
    id: 'collab_5',
    title: 'Industry Mentored Capstone: Autonomous Robotics & Edge AI',
    partnerCompany: 'Google Cloud Partner Consortium',
    type: 'Live Project',
    duration: '12 Weeks',
    seatsOrStipend: 'Hardware Kit + ₹50,000 Award',
    department: 'CSE / AI & Robotics',
    deadline: '2026-04-15',
    description: 'Co-supervised student capstones mentored directly by principal architects with access to high-performance cloud TPU credits.',
    applied: false,
  },
];

export default function FacultyCollaborationsPage() {
  const [collabs, setCollabs] = useState<CollaborationItem[]>(INITIAL_COLLABS);
  const [filterType, setFilterType] = useState<string>('All');
  const [feedbackMessage, setFeedbackMessage] = useState<string | null>(null);

  const handleApply = (id: string) => {
    setCollabs((prev) =>
      prev.map((c) => (c.id === id ? { ...c, applied: true } : c))
    );
    setFeedbackMessage('Collaboration proposal submitted! The corporate relations team will connect.');
    setTimeout(() => setFeedbackMessage(null), 3000);
  };

  const filtered = collabs.filter(
    (c) => filterType === 'All' || c.type === filterType
  );

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
                  Institutional Academia–Industry Synergy
                </span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                Industry Collaborations & Faculty Development
              </h1>
              <p className="text-xs sm:text-sm text-slate-600 mt-1 max-w-2xl leading-relaxed">
                Connect university faculty and departments with industry-sponsored research grants, Faculty Development Programs (FDPs), consultancy agreements, and executive guest lectures.
              </p>
            </div>
          </div>
        </div>

        {feedbackMessage && (
          <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-xs font-semibold text-emerald-800 flex items-center gap-2 animate-in fade-in">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <span>{feedbackMessage}</span>
          </div>
        )}

        {/* Filter Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2">
          {[
            'All',
            'Faculty Development',
            'Research Collaboration',
            'Guest Lecture',
            'Consultancy',
            'Live Project',
          ].map((type) => (
            <button
              key={type}
              onClick={() => setFilterType(type)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-medium whitespace-nowrap transition-all ${
                filterType === type
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'bg-white text-slate-600 hover:text-slate-900 border border-slate-200 shadow-sm'
              }`}
            >
              {type}
            </button>
          ))}
        </div>

        {/* Collaborations Grid */}
        <div className="space-y-4">
          {filtered.map((item) => (
            <div
              key={item.id}
              className="p-6 rounded-2xl bg-white border border-slate-200/80 hover:border-blue-300 transition-all shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-6"
            >
              <div className="space-y-2 flex-1">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-blue-50 text-blue-700 border border-blue-200 font-bold uppercase">
                    {item.type}
                  </span>
                  <span className="text-xs text-slate-500">
                    Partner: <strong className="text-slate-900">{item.partnerCompany}</strong>
                  </span>
                </div>

                <h3 className="text-base font-bold text-slate-900">{item.title}</h3>
                <p className="text-xs text-slate-600 leading-relaxed max-w-3xl">
                  {item.description}
                </p>

                <div className="flex flex-wrap items-center gap-4 text-xs text-slate-500 pt-2 border-t border-slate-100">
                  <span>Duration: {item.duration}</span>
                  <span>•</span>
                  <span className="text-blue-600 font-semibold">{item.seatsOrStipend}</span>
                  <span>•</span>
                  <span>Target: {item.department}</span>
                  <span>•</span>
                  <span>Deadline: {item.deadline}</span>
                </div>
              </div>

              <div className="shrink-0 flex items-center justify-end">
                {item.applied ? (
                  <span className="px-4 py-2 rounded-xl bg-emerald-50 text-emerald-700 border border-emerald-200 text-xs font-bold flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>Proposal Submitted</span>
                  </span>
                ) : (
                  <button
                    onClick={() => handleApply(item.id)}
                    className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs transition-all shadow-sm flex items-center gap-1.5"
                  >
                    <span>Express Interest / Apply</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </AppShell>
  );
}
