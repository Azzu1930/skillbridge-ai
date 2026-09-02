'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { AppShell } from '@/components/layout/AppShell';
import { useApp } from '@/context/AppContext';
import { JobOpportunity } from '@/types';
import {
  PlusCircle,
  Briefcase,
  CheckCircle2,
  Building2,
  DollarSign,
  MapPin,
  Clock,
  Sparkles,
  ArrowRight,
} from 'lucide-react';

export default function PostOpportunityPage() {
  const router = useRouter();
  const { postOpportunity } = useApp();

  const [formData, setFormData] = useState({
    title: 'Cloud-Native Backend Engineer (FastAPI & K8s)',
    company: 'Razorpay Software',
    type: 'Internship' as JobOpportunity['type'],
    location: 'Bengaluru, Karnataka (Hybrid)',
    isRemote: true,
    stipend: '₹55,000 / month',
    duration: '6 Months',
    deadline: '2026-05-15',
    description:
      'We are hiring high-velocity software engineers to build fault-tolerant payment APIs in Python, FastAPI, and Kubernetes. The candidate will collaborate closely with Staff Architects on distributed tracing and high-volume data streams.',
    requiredSkills: 'Python, FastAPI, Docker, PostgreSQL, REST APIs, Git',
    openings: 5,
    minReadiness: 75,
  });

  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const skillsArray = formData.requiredSkills
      .split(',')
      .map((s) => s.trim())
      .filter(Boolean);

    postOpportunity({
      title: formData.title,
      company: formData.company,
      type: formData.type,
      location: formData.location,
      isRemote: formData.isRemote,
      stipend: formData.stipend,
      duration: formData.duration,
      deadline: formData.deadline,
      description: formData.description,
      requiredSkills: skillsArray,
      openings: Number(formData.openings),
      department: ['Computer Science', 'Information Technology'],
      minReadiness: Number(formData.minReadiness),
    });

    setIsSubmitted(true);
    setTimeout(() => {
      router.push('/student/opportunities');
    }, 1500);
  };

  return (
    <AppShell>
      <div className="space-y-6 max-w-4xl mx-auto">
        {/* Header */}
        <div className="p-6 rounded-2xl bg-gradient-to-r from-amber-950/40 via-slate-900 to-slate-900 border border-slate-800 shadow-xl">
          <div className="flex items-center gap-2 mb-1.5">
            <span className="p-1 rounded-md bg-amber-950 text-amber-400 border border-amber-800/60">
              <PlusCircle className="w-4 h-4" />
            </span>
            <span className="text-xs font-mono uppercase tracking-wider text-amber-400 font-bold">
              Industry Hiring Channel
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Publish New Opportunity
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-2xl leading-relaxed">
            Create real-time listings for jobs, internships, live capstones, or mentorships. The platform automatically matches candidates based on verified AI Skill Twins.
          </p>
        </div>

        {isSubmitted && (
          <div className="p-4 rounded-xl bg-emerald-950/80 border border-emerald-700 text-xs font-semibold text-emerald-300 flex items-center gap-2 animate-in fade-in">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <span>Opportunity successfully published! Redirecting to opportunities marketplace...</span>
          </div>
        )}

        {/* Opportunity Form */}
        <form
          onSubmit={handleSubmit}
          className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 shadow-md space-y-4"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-slate-400 mb-1">
                Opportunity Title
              </label>
              <input
                type="text"
                required
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className="w-full p-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white focus:border-amber-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-400 mb-1">
                Company / Organization
              </label>
              <input
                type="text"
                required
                value={formData.company}
                onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                className="w-full p-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white focus:border-amber-500 focus:outline-none"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-medium text-slate-400 mb-1">
                Opportunity Type
              </label>
              <select
                value={formData.type}
                onChange={(e) =>
                  setFormData({ ...formData, type: e.target.value as JobOpportunity['type'] })
                }
                className="w-full p-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white focus:border-amber-500 focus:outline-none"
              >
                <option value="Internship">Internship</option>
                <option value="Full-time">Full-time</option>
                <option value="Live Project">Live Project</option>
                <option value="Training">Training Program</option>
                <option value="Mentorship">Mentorship</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-400 mb-1">
                Location & Mode
              </label>
              <input
                type="text"
                required
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                className="w-full p-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white focus:border-amber-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-400 mb-1">
                Stipend / CTC
              </label>
              <input
                type="text"
                required
                value={formData.stipend}
                onChange={(e) => setFormData({ ...formData, stipend: e.target.value })}
                className="w-full p-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white focus:border-amber-500 focus:outline-none"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-medium text-slate-400 mb-1">Duration</label>
              <input
                type="text"
                required
                value={formData.duration}
                onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                className="w-full p-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white focus:border-amber-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-400 mb-1">Open Positions</label>
              <input
                type="number"
                min="1"
                required
                value={formData.openings}
                onChange={(e) => setFormData({ ...formData, openings: Number(e.target.value) })}
                className="w-full p-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white focus:border-amber-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-400 mb-1">
                Min. Twin Readiness (%)
              </label>
              <input
                type="number"
                min="50"
                max="95"
                required
                value={formData.minReadiness}
                onChange={(e) => setFormData({ ...formData, minReadiness: Number(e.target.value) })}
                className="w-full p-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white focus:border-amber-500 focus:outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-400 mb-1">
              Required Skills (Comma separated)
            </label>
            <input
              type="text"
              required
              value={formData.requiredSkills}
              onChange={(e) => setFormData({ ...formData, requiredSkills: e.target.value })}
              placeholder="Python, FastAPI, Docker, SQL"
              className="w-full p-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white focus:border-amber-500 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-400 mb-1">
              Detailed Role Description
            </label>
            <textarea
              rows={4}
              required
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="w-full p-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white focus:border-amber-500 focus:outline-none"
            />
          </div>

          <div className="pt-4 border-t border-slate-800 flex items-center justify-between">
            <span className="text-[11px] text-slate-500">
              Will immediately match with 1,248 student Skill Twins
            </span>
            <button
              type="submit"
              className="px-6 py-2.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-xs transition-all shadow-md shadow-amber-500/20 flex items-center gap-2"
            >
              <span>Publish to Talent Pool</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </form>
      </div>
    </AppShell>
  );
}
