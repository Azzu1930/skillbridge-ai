'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useApp } from '@/context/AppContext';
import { UserRole } from '@/types';
import {
  Sparkles,
  Search,
  Bell,
  Play,
  Bot,
  ChevronDown,
  Layers,
  Building2,
  GraduationCap,
  ShieldCheck,
  UserCheck,
  FileText,
  ArrowRight,
  RefreshCw,
} from 'lucide-react';

export function Navbar({ onOpenSearch }: { onOpenSearch?: () => void }) {
  const {
    role,
    setRole,
    student,
    activeSessionMode,
    setSessionMode,
    notifications,
    setIsDemoTourOpen,
    resetDemoData,
  } = useApp();

  const [showRoleMenu, setShowRoleMenu] = useState(false);
  const [showNotifMenu, setShowNotifMenu] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  const unreadCount = notifications.filter((n) => !n.read).length;

  const rolesList: { role: UserRole; title: string; subtitle: string; icon: React.ReactNode; route: string }[] = [
    {
      role: 'student',
      title: 'Student Demo',
      subtitle: 'Abdul Aziz (Backend Dev, 68%)',
      icon: <GraduationCap className="w-4 h-4 text-blue-600" />,
      route: '/student/dashboard',
    },
    {
      role: 'industry',
      title: 'Industry Demo',
      subtitle: 'Razorpay / Talent Operations',
      icon: <Building2 className="w-4 h-4 text-amber-600" />,
      route: '/industry/dashboard',
    },
    {
      role: 'faculty',
      title: 'Faculty Demo',
      subtitle: 'Dr. Ramesh (CSE Dept Head)',
      icon: <Layers className="w-4 h-4 text-emerald-600" />,
      route: '/faculty/dashboard',
    },
    {
      role: 'admin',
      title: 'Institution Admin',
      subtitle: 'Dean of Placement & Academics',
      icon: <ShieldCheck className="w-4 h-4 text-purple-600" />,
      route: '/admin/dashboard',
    },
  ];

  const handleSelectRole = (newRole: UserRole, targetRoute: string) => {
    setRole(newRole);
    setSessionMode('demo');
    setShowRoleMenu(false);
    router.push(targetRoute);
  };

  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-200 bg-white/95 backdrop-blur-md shadow-xs">
      <div className="flex h-16 items-center justify-between px-4 sm:px-6 max-w-7xl mx-auto w-full">
        {/* Brand Logo & Wordmark */}
        <div className="flex items-center gap-3">
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="w-9 h-9 rounded-xl bg-blue-600 flex items-center justify-center shadow-sm group-hover:bg-blue-700 transition-colors">
              <Sparkles className="w-4 h-4 text-white" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-base text-slate-900 tracking-tight group-hover:text-blue-600 transition-colors">
                  SkillBridge<span className="text-blue-600">AI</span>
                </span>
                <span className="text-[10px] font-mono uppercase bg-slate-100 text-slate-600 border border-slate-200 px-1.5 py-0.5 rounded font-semibold">
                  SIH26044
                </span>
              </div>
              <p className="text-[11px] text-slate-500 hidden sm:block font-medium">
                Academia × Industry Intelligence
              </p>
            </div>
          </Link>
        </div>

        {/* Global Navigation Links (Desktop) */}
        <nav className="hidden lg:flex items-center gap-1 text-xs font-medium text-slate-600">
          <Link
            href="/resume-analyzer"
            className={`px-3 py-1.5 rounded-lg transition-colors ${
              pathname === '/resume-analyzer'
                ? 'text-blue-600 font-semibold bg-blue-50'
                : 'hover:text-slate-900 hover:bg-slate-50'
            }`}
          >
            Resume Analyzer
          </Link>
          <Link
            href="/student/opportunities"
            className={`px-3 py-1.5 rounded-lg transition-colors ${
              pathname === '/student/opportunities'
                ? 'text-blue-600 font-semibold bg-blue-50'
                : 'hover:text-slate-900 hover:bg-slate-50'
            }`}
          >
            Opportunities
          </Link>
          <Link
            href="/industry/candidates"
            className={`px-3 py-1.5 rounded-lg transition-colors ${
              pathname === '/industry/candidates'
                ? 'text-blue-600 font-semibold bg-blue-50'
                : 'hover:text-slate-900 hover:bg-slate-50'
            }`}
          >
            Recruiter Matcher
          </Link>
          <Link
            href="/admin/intelligence"
            className={`px-3 py-1.5 rounded-lg transition-colors ${
              pathname === '/admin/intelligence'
                ? 'text-blue-600 font-semibold bg-blue-50'
                : 'hover:text-slate-900 hover:bg-slate-50'
            }`}
          >
            Institutional Loop
          </Link>
        </nav>

        {/* Global Search trigger */}
        <div className="hidden md:flex items-center max-w-xs mx-4">
          <button
            onClick={onOpenSearch}
            className="w-full flex items-center justify-between px-3 py-1.5 text-xs text-slate-500 bg-slate-50 border border-slate-200 rounded-lg hover:border-slate-300 hover:text-slate-700 transition-all shadow-inner"
          >
            <div className="flex items-center gap-2">
              <Search className="w-3.5 h-3.5 text-slate-400" />
              <span>Search skills, jobs...</span>
            </div>
            <kbd className="px-1.5 py-0.5 text-[10px] font-mono bg-white text-slate-500 border border-slate-200 rounded shadow-xs">
              ⌘K
            </kbd>
          </button>
        </div>

        {/* Right Actions: CTAs & Persona Switcher */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* PRIMARY PUBLIC CTA: Analyze My Resume */}
          <Link
            href="/resume-analyzer"
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 rounded-lg shadow-sm hover:shadow transition-all"
          >
            <FileText className="w-3.5 h-3.5" />
            <span>Analyze Resume</span>
          </Link>

          {/* 5-Min Demo Tour Button */}
          <button
            onClick={() => setIsDemoTourOpen(true)}
            className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-emerald-800 bg-emerald-50 border border-emerald-200 rounded-lg hover:bg-emerald-100 transition-all"
          >
            <Play className="w-3.5 h-3.5 fill-emerald-600 text-emerald-600" />
            <span>5-Min Tour</span>
          </button>

          {/* AI Career Assistant Shortcut */}
          <Link
            href="/assistant"
            className="hidden sm:inline-flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-semibold text-slate-700 bg-slate-50 border border-slate-200 rounded-lg hover:bg-slate-100 transition-all"
            title="AI Career Assistant"
          >
            <Bot className="w-3.5 h-3.5 text-blue-600" />
            <span>Copilot</span>
          </Link>

          {/* Role Switcher Dropdown */}
          <div className="relative">
            <button
              onClick={() => setShowRoleMenu(!showRoleMenu)}
              className="flex items-center gap-2 px-2.5 py-1.5 text-xs font-medium text-slate-700 bg-white border border-slate-200 rounded-lg hover:border-slate-300 hover:bg-slate-50 transition-all shadow-xs"
            >
              <span className={`w-2 h-2 rounded-full ${activeSessionMode === 'user' ? 'bg-blue-600' : 'bg-emerald-500'}`} />
              <span className="capitalize font-semibold text-slate-800">
                {activeSessionMode === 'user' ? 'My Profile' : `${role} Mode`}
              </span>
              <ChevronDown className="w-3 h-3 text-slate-400" />
            </button>

            {showRoleMenu && (
              <div className="absolute right-0 mt-2 w-72 bg-white border border-slate-200 rounded-xl shadow-xl p-2 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                <div className="px-2 py-1.5 border-b border-slate-100 mb-1 flex items-center justify-between">
                  <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                    Demo Mode Personas
                  </span>
                  <span className="text-[10px] text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-200 font-medium">
                    SIH 2026
                  </span>
                </div>
                {rolesList.map((item) => (
                  <button
                    key={item.role}
                    onClick={() => handleSelectRole(item.role, item.route)}
                    className={`w-full text-left flex items-start gap-2.5 p-2 rounded-lg transition-colors ${
                      role === item.role && activeSessionMode === 'demo'
                        ? 'bg-blue-50 border border-blue-200 text-blue-900'
                        : 'hover:bg-slate-50 text-slate-700'
                    }`}
                  >
                    <div className="mt-0.5 p-1 rounded bg-slate-100 border border-slate-200">
                      {item.icon}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <span className="font-semibold text-xs text-slate-900">
                          {item.title}
                        </span>
                        {role === item.role && activeSessionMode === 'demo' && (
                          <UserCheck className="w-3.5 h-3.5 text-blue-600" />
                        )}
                      </div>
                      <p className="text-[11px] text-slate-500 truncate">
                        {item.subtitle}
                      </p>
                    </div>
                  </button>
                ))}

                <div className="pt-2 mt-1 border-t border-slate-100 flex items-center justify-between px-2">
                  <Link
                    href="/resume-analyzer"
                    onClick={() => setShowRoleMenu(false)}
                    className="text-[11px] text-blue-600 font-semibold hover:underline flex items-center gap-1"
                  >
                    <FileText className="w-3 h-3" />
                    <span>Upload Personal Resume</span>
                  </Link>
                  <button
                    onClick={() => {
                      resetDemoData();
                      setShowRoleMenu(false);
                    }}
                    className="flex items-center gap-1 text-[11px] text-slate-400 hover:text-red-600 transition-colors"
                    title="Reset to default seed state"
                  >
                    <RefreshCw className="w-3 h-3" />
                    <span>Reset</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
