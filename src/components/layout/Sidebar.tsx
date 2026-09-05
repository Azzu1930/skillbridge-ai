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
  ShieldCheck,
  CheckCircle2,
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
  const safePath = pathname || '';

  // 1. Authenticated Student Links (Section 57)
  const studentAuthLinks: SidebarLink[] = [
    { href: '/student/dashboard', label: 'Dashboard', icon: LayoutDashboard, highlight: true },
    { href: '/student/skill-twin', label: 'My Skill Profile', icon: Cpu, badge: 'Twin' },
    { href: '/student/assessment', label: 'Skill Assessments', icon: Award, badge: 'Verified' },
    { href: '/student/skill-gap', label: 'Skill Gap Analysis', icon: Target },
    { href: '/student/roadmap', label: 'Learning Roadmap', icon: MapPin },
    { href: '/student/opportunities?type=Internship', label: 'Internships', icon: Briefcase },
    { href: '/student/opportunities?type=Full-time', label: 'Placements & Jobs', icon: Briefcase },
    { href: '/student/applications', label: 'My Applications', icon: Workflow },
    { href: '/student/internship-progress', label: 'Internship Workspace', icon: CheckCircle2, badge: 'Milestones' },
    { href: '/student/portfolio', label: 'Digital Portfolio', icon: Share2 },
    { href: '/assistant', label: 'AI Career Advisor', icon: Bot },
    { href: '/resume-analyzer', label: 'Analyze Resume', icon: FileText, badge: 'Upload' },
    { href: '/reports', label: 'My Reports', icon: Layers, badge: 'DOCX' },
  ];

  // 2. Authenticated Faculty Links (Section 57)
  const facultyAuthLinks: SidebarLink[] = [
    { href: '/faculty/dashboard', label: 'Faculty Dashboard', icon: LayoutDashboard, highlight: true },
    { href: '/faculty/collaborations', label: 'Faculty Opportunities', icon: Workflow, badge: 'FDP/Labs' },
    { href: '/faculty/collaborations?tab=fdp', label: 'FDP & Training', icon: Award },
    { href: '/student/skill-gap', label: 'Student Skill Insights', icon: Target },
    { href: '/industry/demand', label: 'Industry Skill Trends', icon: TrendingUp },
    { href: '/profile', label: 'Faculty Profile', icon: GraduationCap },
  ];

  // 3. Authenticated Industry Links (Section 57)
  const industryAuthLinks: SidebarLink[] = [
    { href: '/industry/dashboard', label: 'Recruiter Dashboard', icon: LayoutDashboard, highlight: true },
    { href: '/industry/post-opportunity', label: 'Post Opportunity', icon: PlusCircle },
    { href: '/industry/candidates', label: 'Candidate Matcher', icon: Users, badge: '5-Factor' },
    { href: '/industry/candidates', label: 'Recruitment Pipeline', icon: Layers, badge: 'Pipeline' },
    { href: '/industry/demand', label: 'Industry Skill Demand', icon: TrendingUp },
    { href: '/industry/feedback', label: 'Interview Evaluation', icon: MessageSquarePlus },
    { href: '/industry/skill-graph', label: 'Skill Graph', icon: Network },
    { href: '/profile', label: 'Company Profile', icon: Building2 },
  ];

  // 4. Authenticated Institution Links (Section 57)
  const institutionAuthLinks: SidebarLink[] = [
    { href: '/institution/dashboard', label: 'Executive Dashboard', icon: LayoutDashboard, highlight: true },
    { href: '/institution/students', label: 'Student Directory', icon: Users },
    { href: '/admin/intelligence', label: 'Skill Intelligence Loop', icon: Workflow, badge: 'Closed Loop' },
    { href: '/admin/training', label: 'Training Programs', icon: Sparkles },
    { href: '/industry/demand', label: 'Industry Skill Trends', icon: TrendingUp },
    { href: '/student/opportunities', label: 'Campus Placements', icon: Briefcase },
    { href: '/industry/feedback', label: 'Feedback Analytics', icon: MessageSquarePlus },
    { href: '/profile', label: 'Institution Settings', icon: ShieldCheck },
  ];

  // Demo guest fallback links
  const studentDemoLinks: SidebarLink[] = [
    { href: '/student/dashboard', label: 'Student Overview', icon: LayoutDashboard, highlight: true },
    { href: '/resume-analyzer', label: 'Resume Intelligence', icon: FileText, badge: 'Upload' },
    { href: '/reports', label: 'Resume Reports', icon: Layers, badge: 'DOCX/JSON' },
    { href: '/student/skill-twin', label: 'AI Skill Twin', icon: Cpu },
    { href: '/student/skill-gap', label: 'Skill Gap Analysis', icon: Target },
    { href: '/student/simulator', label: 'Readiness Simulator', icon: Sliders },
    { href: '/student/roadmap', label: 'Learning Roadmap', icon: MapPin },
    { href: '/student/opportunities', label: 'Job Opportunities', icon: Briefcase },
    { href: '/student/applications', label: 'My Applications', icon: Workflow },
    { href: '/student/internship-progress', label: 'Internship Workspace', icon: CheckCircle2, badge: 'Milestones' },
    { href: '/student/assessment', label: 'Skill Assessment', icon: Award },
    { href: '/student/portfolio', label: 'Digital Portfolio', icon: Share2 },
    { href: '/assistant', label: 'AI Career Advisor', icon: Bot },
  ];

  const industryDemoLinks: SidebarLink[] = [
    { href: '/industry/dashboard', label: 'Recruiter Dashboard', icon: LayoutDashboard, highlight: true },
    { href: '/industry/candidates', label: 'AI Candidate Match', icon: Users, badge: '5-Factor' },
    { href: '/industry/skill-graph', label: 'Industry Skill Graph', icon: Network },
    { href: '/industry/post-opportunity', label: 'Post Opportunity', icon: PlusCircle },
    { href: '/industry/demand', label: 'Market Skill Trends', icon: TrendingUp },
    { href: '/industry/feedback', label: 'Interview Evaluation', icon: MessageSquarePlus },
  ];

  const facultyDemoLinks: SidebarLink[] = [
    { href: '/faculty/dashboard', label: 'Department Dashboard', icon: LayoutDashboard, highlight: true },
    { href: '/student/skill-gap', label: 'Cohort Skill Gaps', icon: Target },
    { href: '/industry/demand', label: 'Market Skill Trends', icon: TrendingUp },
    { href: '/admin/training', label: 'Curriculum Training', icon: Award },
    { href: '/faculty/collaborations', label: 'Industry Collaborations', icon: Workflow, badge: 'FDP/Labs' },
  ];

  const adminDemoLinks: SidebarLink[] = [
    { href: '/institution/dashboard', label: 'Institution Dashboard', icon: LayoutDashboard, highlight: true },
    { href: '/admin/intelligence', label: 'Closed-Loop Intelligence', icon: Workflow, badge: 'Core Loop' },
    { href: '/admin/training', label: 'Training Planner', icon: Sparkles },
    { href: '/industry/demand', label: 'Industry Skill Trends', icon: TrendingUp },
    { href: '/student/opportunities', label: 'Active Opportunities', icon: Briefcase },
    { href: '/industry/feedback', label: 'Feedback Analytics', icon: MessageSquarePlus },
  ];

  // Resolve links according to authenticated role vs demo role
  let links: SidebarLink[];
  if (isAuthenticated && currentUser) {
    if (currentUser.role === 'faculty') {
      links = facultyAuthLinks;
    } else if (currentUser.role === 'industry') {
      links = industryAuthLinks;
    } else if (currentUser.role === 'institution' || currentUser.role === 'admin') {
      links = institutionAuthLinks;
    } else {
      links = studentAuthLinks;
    }
  } else {
    // Guest demo mode
    if (role === 'industry') {
      links = industryDemoLinks;
    } else if (role === 'faculty') {
      links = facultyDemoLinks;
    } else if (role === 'admin' || (role as any) === 'institution') {
      links = adminDemoLinks;
    } else {
      links = studentDemoLinks;
    }
  }

  const activeRoleDisplay = isAuthenticated && currentUser
    ? currentUser.role.toUpperCase()
    : `${role.toUpperCase()} (DEMO)`;

  return (
    <aside className="w-64 border-r border-[#dce9df] bg-white flex flex-col shrink-0 min-h-[calc(100vh-4rem)] shadow-xs">
      {/* Role Banner */}
      <div className="p-4 border-b border-[#dce9df]/60">
        <div className="flex items-center gap-2.5 px-3 py-2 rounded-xl bg-[#f7fcf8] border border-[#dce9df]">
          {isAuthenticated ? (
            currentUser?.role === 'faculty' ? (
              <Layers className="w-5 h-5 text-emerald-600 shrink-0" />
            ) : currentUser?.role === 'industry' ? (
              <Building2 className="w-5 h-5 text-amber-600 shrink-0" />
            ) : currentUser?.role === 'institution' || currentUser?.role === 'admin' ? (
              <ShieldCheck className="w-5 h-5 text-purple-600 shrink-0" />
            ) : (
              <GraduationCap className="w-5 h-5 text-green-600 shrink-0" />
            )
          ) : role === 'industry' ? (
            <Building2 className="w-5 h-5 text-amber-600 shrink-0" />
          ) : role === 'faculty' ? (
            <Layers className="w-5 h-5 text-emerald-600 shrink-0" />
          ) : role === 'admin' ? (
            <ShieldCheck className="w-5 h-5 text-purple-600 shrink-0" />
          ) : (
            <GraduationCap className="w-5 h-5 text-green-700 shrink-0" />
          )}

          <div className="min-w-0 flex-1">
            <div className="flex items-center justify-between">
              <p className="text-[10px] font-mono uppercase font-bold text-green-800 tracking-wider">
                {activeRoleDisplay}
              </p>
              {!isAuthenticated && (
                <span className="text-[9px] font-mono px-1 py-0.2 rounded bg-amber-50 text-amber-700 border border-amber-200 font-bold">
                  DEMO
                </span>
              )}
            </div>
            <p className="text-xs font-bold text-[#17251b] truncate mt-0.5">
              {isAuthenticated && currentUser ? currentUser.fullName : student.name}
            </p>
          </div>
        </div>
      </div>

      {/* Navigation List */}
      <nav className="flex-1 p-3 space-y-1 overflow-y-auto">
        {links.map((link) => {
          const isActive = safePath === link.href || (link.href !== '/dashboard' && safePath.startsWith(link.href.split('?')[0]) && link.href.length > 5);
          const Icon = link.icon;

          return (
            <Link
              key={link.href}
              href={link.href}
              className={`flex items-center justify-between px-3 py-2 text-xs font-medium rounded-xl transition-all ${
                isActive
                  ? 'bg-green-50 text-green-900 font-bold border border-green-200/80 shadow-xs'
                  : 'text-[#526157] hover:text-[#17251b] hover:bg-green-50/50'
              }`}
            >
              <div className="flex items-center gap-2.5 min-w-0">
                <Icon
                  className={`w-4 h-4 shrink-0 transition-colors ${
                    isActive ? 'text-green-700' : 'text-slate-400 group-hover:text-slate-600'
                  }`}
                />
                <span className="truncate">{link.label}</span>
              </div>
              {link.badge && (
                <span
                  className={`text-[10px] font-mono font-semibold px-1.5 py-0.5 rounded ${
                    isActive
                      ? 'bg-green-200 text-green-900 font-bold'
                      : 'bg-[#f7fcf8] text-[#526157] border border-[#dce9df]'
                  }`}
                >
                  {link.badge}
                </span>
              )}
            </Link>
          );
        })}
      </nav>

      {/* Footer Info */}
      <div className="p-3 border-t border-[#dce9df]/60">
        <div className="p-2.5 rounded-xl bg-[#f7fcf8] border border-[#dce9df] text-[11px] text-[#526157] space-y-1">
          <p className="font-bold text-[#17251b]">SkillBridge AI Platform</p>
          <p className="text-[10px] text-slate-500 leading-tight">
            Connecting Skills, Academia and Industry
          </p>
        </div>
      </div>
    </aside>
  );
}
