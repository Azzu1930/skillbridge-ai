'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useApp } from '@/context/AppContext';
import {
  LayoutDashboard,
  Cpu,
  FileText,
  Award,
  Target,
  Sliders,
  MapPin,
  Briefcase,
  Layers,
  Sparkles,
  Bot,
  UserCheck,
  TrendingUp,
  MessageSquarePlus,
  Network,
  PlusCircle,
  Users,
  Building2,
  Share2,
  Workflow,
  GraduationCap,
} from 'lucide-react';

interface SidebarLink {
  href: string;
  label: string;
  icon: any;
  badge?: string;
  highlight?: boolean;
}

export function Sidebar() {
  const { role, student } = useApp();
  const pathname = usePathname();

  const studentLinks: SidebarLink[] = [
    { href: '/student/dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { href: '/student/skill-twin', label: 'AI Skill Twin', icon: Cpu, badge: 'Dynamic' },
    { href: '/student/resume-analyzer', label: 'Resume Analyzer', icon: FileText },
    { href: '/student/assessment', label: 'Skill Assessment', icon: Award },
    { href: '/student/skill-gap', label: 'AI Skill Gap', icon: Target },
    { href: '/student/simulator', label: 'Readiness Simulator', icon: Sliders, badge: 'Simulator', highlight: true },
    { href: '/student/roadmap', label: 'Learning Roadmap', icon: MapPin },
    { href: '/student/opportunities', label: 'Opportunities', icon: Briefcase },
    { href: '/student/applications', label: 'Applications', icon: Layers },
    { href: '/student/portfolio', label: 'Digital Portfolio', icon: Share2 },
    { href: '/assistant', label: 'AI Career Assistant', icon: Bot },
  ];

  const industryLinks: SidebarLink[] = [
    { href: '/industry/dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { href: '/industry/skill-graph', label: 'Industry Skill Graph', icon: Network, badge: 'Visual Graph', highlight: true },
    { href: '/industry/post-opportunity', label: 'Post Opportunity', icon: PlusCircle },
    { href: '/industry/candidates', label: 'AI Candidate Match', icon: Users, badge: 'Ranked' },
    { href: '/industry/demand', label: 'Industry Skill Demand', icon: TrendingUp },
    { href: '/industry/feedback', label: 'Company Feedback', icon: MessageSquarePlus },
    { href: '/faculty/collaborations', label: 'Academia Tie-ups', icon: Workflow },
  ];

  const facultyLinks: SidebarLink[] = [
    { href: '/faculty/dashboard', label: 'Faculty Dashboard', icon: LayoutDashboard },
    { href: '/student/skill-gap', label: 'Cohort Skill Gaps', icon: Target },
    { href: '/industry/demand', label: 'Market Skill Trends', icon: TrendingUp },
    { href: '/admin/training', label: 'Curriculum Training', icon: Award },
    { href: '/faculty/collaborations', label: 'Industry Collaborations', icon: Workflow, badge: 'FDP/Projects' },
  ];

  const adminLinks: SidebarLink[] = [
    { href: '/admin/dashboard', label: 'Executive Dashboard', icon: LayoutDashboard },
    { href: '/admin/intelligence', label: 'Closed-Loop Intelligence', icon: Workflow, badge: 'Core Loop', highlight: true },
    { href: '/admin/training', label: 'Training Engine', icon: Sparkles },
    { href: '/industry/demand', label: 'Industry Skill Demand', icon: TrendingUp },
    { href: '/student/opportunities', label: 'Active Opportunities', icon: Briefcase },
    { href: '/industry/feedback', label: 'Feedback Analytics', icon: MessageSquarePlus },
  ];

  const links =
    role === 'student'
      ? studentLinks
      : role === 'industry'
      ? industryLinks
      : role === 'faculty'
      ? facultyLinks
      : adminLinks;

  return (
    <aside className="w-64 border-r border-slate-800/80 bg-slate-950/60 backdrop-blur flex flex-col shrink-0 min-h-[calc(100vh-4rem)]">
      {/* Role Banner */}
      <div className="p-4 border-b border-slate-800/70">
        <div className="flex items-center gap-2.5 px-3 py-2 rounded-lg bg-slate-900/90 border border-slate-800">
          {role === 'student' && <GraduationCap className="w-5 h-5 text-indigo-400 shrink-0" />}
          {role === 'industry' && <Building2 className="w-5 h-5 text-amber-400 shrink-0" />}
          {role === 'faculty' && <Layers className="w-5 h-5 text-emerald-400 shrink-0" />}
          {role === 'admin' && <Sparkles className="w-5 h-5 text-purple-400 shrink-0" />}
          <div className="min-w-0">
            <p className="text-[10px] font-semibold tracking-wider text-slate-400 uppercase">
              Current Perspective
            </p>
            <p className="text-xs font-bold text-white capitalize truncate">
              {role === 'student' ? 'Student Portal' : role === 'industry' ? 'Industry Talent Portal' : role === 'faculty' ? 'Faculty & Dept Portal' : 'Institutional Admin'}
            </p>
          </div>
        </div>
      </div>

      {/* Nav Menu */}
      <nav className="flex-1 p-3 space-y-1 overflow-y-auto">
        {links.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center justify-between px-3 py-2 rounded-lg text-xs font-medium transition-all group ${
                isActive
                  ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
                  : item.highlight
                  ? 'bg-slate-900/80 text-emerald-300 hover:bg-slate-800 border border-emerald-800/40 hover:border-emerald-600'
                  : 'text-slate-400 hover:text-slate-100 hover:bg-slate-900/60'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <Icon
                  className={`w-4 h-4 transition-colors ${
                    isActive
                      ? 'text-white'
                      : item.highlight
                      ? 'text-emerald-400'
                      : 'text-slate-400 group-hover:text-slate-200'
                  }`}
                />
                <span>{item.label}</span>
              </div>
              {item.badge && (
                <span
                  className={`text-[9px] px-1.5 py-0.5 rounded font-bold uppercase tracking-wider ${
                    isActive
                      ? 'bg-white/20 text-white'
                      : item.highlight
                      ? 'bg-emerald-950 text-emerald-300 border border-emerald-700/50'
                      : 'bg-slate-800 text-slate-400'
                  }`}
                >
                  {item.badge}
                </span>
              )}
            </Link>
          );
        })}
      </nav>

      {/* Active Persona Summary footer */}
      <div className="p-4 border-t border-slate-800/80 bg-slate-900/40">
        <div className="flex items-center gap-3">
          <img
            src={student.avatar}
            alt={student.name}
            className="w-8 h-8 rounded-full border border-indigo-500/40 object-cover"
          />
          <div className="min-w-0 flex-1">
            <p className="text-xs font-semibold text-white truncate">
              {role === 'student' ? student.name : role === 'industry' ? 'Hiring Lead @ Razorpay' : role === 'faculty' ? 'Dr. Ramesh Sharma' : 'Dean of Academics'}
            </p>
            <p className="text-[10px] text-slate-400 truncate">
              {role === 'student' ? `${student.targetRole} (${student.readinessScore}%)` : role === 'industry' ? 'Tech Talent Operations' : role === 'faculty' ? 'Computer Science & Eng' : 'NIT Central Placement'}
            </p>
          </div>
        </div>
      </div>
    </aside>
  );
}
