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
  const { role, student, activeSessionMode, isAuthenticated, currentUser } = useApp();
  const pathname = usePathname();

  const userAccountLinks: SidebarLink[] = [
    { href: '/dashboard', label: 'My Dashboard', icon: LayoutDashboard, highlight: true },
    { href: '/resume-analyzer', label: 'Analyze Resume', icon: FileText, badge: 'AI Parse' },
    { href: '/reports', label: 'My Reports', icon: Layers, badge: 'DOCX/JSON' },
    { href: '/student/skill-twin', label: 'AI Skill Twin', icon: Cpu },
    { href: '/student/skill-gap', label: 'Skill Gap Analysis', icon: Target },
    { href: '/student/roadmap', label: 'Learning Roadmap', icon: MapPin },
    { href: '/student/opportunities', label: 'Job Opportunities', icon: Briefcase },
    { href: '/student/applications', label: 'My Applications', icon: Workflow },
    { href: '/profile', label: 'Account Profile', icon: GraduationCap },
    { href: '/assistant', label: 'AI Career Advisor', icon: Bot },
  ];

  const studentDemoLinks: SidebarLink[] = [
    { href: '/resume-analyzer', label: 'Resume Intelligence', icon: FileText, badge: 'Upload', highlight: true },
    { href: '/reports', label: 'Resume Reports', icon: Layers, badge: 'DOCX/JSON' },
    { href: '/student/dashboard', label: 'Student Overview', icon: LayoutDashboard },
    { href: '/student/skill-twin', label: 'AI Skill Twin', icon: Cpu, badge: 'Dynamic' },
    { href: '/student/skill-gap', label: 'AI Skill Gap', icon: Target },
    { href: '/student/simulator', label: 'Readiness Simulator', icon: Sliders, badge: 'Simulator' },
    { href: '/student/roadmap', label: 'Learning Roadmap', icon: MapPin },
    { href: '/student/opportunities', label: 'Job Opportunities', icon: Briefcase },
    { href: '/student/applications', label: 'My Applications', icon: Layers },
    { href: '/student/assessment', label: 'Skill Assessment', icon: Award },
    { href: '/student/portfolio', label: 'Digital Portfolio', icon: Share2 },
    { href: '/assistant', label: 'AI Career Advisor', icon: Bot },
  ];

  const industryLinks: SidebarLink[] = [
    { href: '/industry/dashboard', label: 'Recruiter Dashboard', icon: LayoutDashboard },
    { href: '/industry/candidates', label: 'AI Candidate Match', icon: Users, badge: '5-Factor' },
    { href: '/industry/skill-graph', label: 'Industry Skill Graph', icon: Network, badge: 'Interactive' },
    { href: '/industry/post-opportunity', label: 'Post Opportunity', icon: PlusCircle },
    { href: '/industry/demand', label: 'Market Skill Trends', icon: TrendingUp },
    { href: '/industry/feedback', label: 'Interview Evaluation', icon: MessageSquarePlus },
    { href: '/faculty/collaborations', label: 'Academia Tie-ups', icon: Workflow },
  ];

  const facultyLinks: SidebarLink[] = [
    { href: '/faculty/dashboard', label: 'Department Dashboard', icon: LayoutDashboard },
    { href: '/student/skill-gap', label: 'Cohort Skill Gaps', icon: Target },
    { href: '/industry/demand', label: 'Market Skill Trends', icon: TrendingUp },
    { href: '/admin/training', label: 'Curriculum Training', icon: Award },
    { href: '/faculty/collaborations', label: 'Industry Collaborations', icon: Workflow, badge: 'FDP/Labs' },
  ];

  const adminLinks: SidebarLink[] = [
    { href: '/admin/dashboard', label: 'Executive Dashboard', icon: LayoutDashboard },
    { href: '/admin/intelligence', label: 'Closed-Loop Intelligence', icon: Workflow, badge: 'Core Loop', highlight: true },
    { href: '/admin/training', label: 'AI Training Planner', icon: Sparkles },
    { href: '/industry/demand', label: 'Industry Skill Trends', icon: TrendingUp },
    { href: '/student/opportunities', label: 'Active Opportunities', icon: Briefcase },
    { href: '/industry/feedback', label: 'Feedback Analytics', icon: MessageSquarePlus },
  ];

  const links =
    isAuthenticated
      ? userAccountLinks
      : role === 'student'
      ? studentDemoLinks
      : role === 'industry'
      ? industryLinks
      : role === 'faculty'
      ? facultyLinks
      : adminLinks;

  return (
    <aside className="w-64 border-r border-[#dce9df] bg-white flex flex-col shrink-0 min-h-[calc(100vh-4rem)] shadow-xs">
      {/* Role Banner */}
      <div className="p-4 border-b border-[#dce9df]/60">
        <div className="flex items-center gap-2.5 px-3 py-2 rounded-xl bg-[#f7fcf8] border border-[#dce9df]">
          {isAuthenticated ? (
            <GraduationCap className="w-5 h-5 text-green-600 shrink-0" />
          ) : role === 'student' ? (
            <GraduationCap className="w-5 h-5 text-green-700 shrink-0" />
          ) : role === 'industry' ? (
            <Building2 className="w-5 h-5 text-amber-600 shrink-0" />
          ) : role === 'faculty' ? (
            <Layers className="w-5 h-5 text-emerald-600 shrink-0" />
          ) : (
            <Sparkles className="w-5 h-5 text-purple-600 shrink-0" />
          )}
          <div className="min-w-0">
            <p className="text-[10px] font-bold tracking-wider text-[#526157] uppercase">
              Current Perspective
            </p>
            <p className="text-xs font-bold text-[#17251b] capitalize truncate">
              {isAuthenticated
                ? `${currentUser?.fullName || 'User'} (Account)`
                : role === 'student'
                ? activeSessionMode === 'user'
                  ? 'Personal Resume Mode'
                  : 'Student Demo (Abdul Aziz)'
                : role === 'industry'
                ? 'Industry Talent Portal'
                : role === 'faculty'
                ? 'Faculty & Dept Portal'
                : 'Institutional Admin'}
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
                  ? 'bg-green-50 text-green-800 font-semibold border border-green-200 shadow-xs'
                  : item.highlight
                  ? 'bg-[#f0fdf4] text-green-800 hover:bg-green-100/60 border border-green-200'
                  : 'text-[#526157] hover:text-[#17251b] hover:bg-[#f7fcf8]'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <Icon
                  className={`w-4 h-4 transition-colors ${
                    isActive
                      ? 'text-green-600'
                      : item.highlight
                      ? 'text-green-600'
                      : 'text-slate-400 group-hover:text-green-700'
                  }`}
                />
                <span>{item.label}</span>
              </div>
              {item.badge && (
                <span
                  className={`text-[9px] px-1.5 py-0.5 rounded font-bold uppercase tracking-wider ${
                    isActive
                      ? 'bg-green-600 text-white'
                      : item.highlight
                      ? 'bg-green-700 text-white'
                      : 'bg-[#f0fdf4] text-green-800 border border-green-200'
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
      <div className="p-4 border-t border-[#dce9df]/60 bg-[#f7fcf8]">
        <div className="flex items-center gap-3">
          <img
            src={student.avatar}
            alt={student.name}
            className="w-8 h-8 rounded-full border border-[#dce9df] object-cover shadow-xs"
          />
          <div className="min-w-0 flex-1">
            <p className="text-xs font-bold text-[#17251b] truncate">
              {isAuthenticated
                ? currentUser?.fullName
                : role === 'student'
                ? student.name
                : role === 'industry'
                ? 'Hiring Lead @ Razorpay'
                : role === 'faculty'
                ? 'Dr. Ramesh Sharma'
                : 'Dean of Academics'}
            </p>
            <p className="text-[10px] text-[#526157] truncate font-medium">
              {isAuthenticated
                ? `${currentUser?.targetRole || 'Candidate'} (Authenticated)`
                : role === 'student'
                ? `${student.targetRole} (${student.readinessScore}%)`
                : role === 'industry'
                ? 'Tech Talent Operations'
                : role === 'faculty'
                ? 'Computer Science & Eng'
                : 'NIT Central Placement'}
            </p>
          </div>
        </div>
      </div>
    </aside>
  );
}
