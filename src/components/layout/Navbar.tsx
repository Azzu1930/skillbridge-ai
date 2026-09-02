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
  CheckCircle2,
  RefreshCw,
  Play,
  Bot,
  ExternalLink,
  ChevronDown,
  Layers,
  Building2,
  GraduationCap,
  ShieldCheck,
  UserCheck,
} from 'lucide-react';

export function Navbar({ onOpenSearch }: { onOpenSearch?: () => void }) {
  const {
    role,
    setRole,
    notifications,
    markNotificationRead,
    setIsDemoTourOpen,
    resetDemoData,
  } = useApp();
  const [showNotifications, setShowNotifications] = useState(false);
  const [showRoleMenu, setShowRoleMenu] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  const unreadCount = notifications.filter((n) => !n.read).length;

  const rolesList: { role: UserRole; title: string; subtitle: string; icon: React.ReactNode; route: string }[] = [
    {
      role: 'student',
      title: 'Student Demo',
      subtitle: 'Abdul Aziz (Backend Dev, 68%)',
      icon: <GraduationCap className="w-4 h-4 text-indigo-400" />,
      route: '/student/dashboard',
    },
    {
      role: 'industry',
      title: 'Industry Demo',
      subtitle: 'Razorpay / Tech Talent Lead',
      icon: <Building2 className="w-4 h-4 text-amber-400" />,
      route: '/industry/dashboard',
    },
    {
      role: 'faculty',
      title: 'Faculty Demo',
      subtitle: 'Dr. Ramesh (CSE Dept Head)',
      icon: <Layers className="w-4 h-4 text-emerald-400" />,
      route: '/faculty/dashboard',
    },
    {
      role: 'admin',
      title: 'Institution Admin',
      subtitle: 'Dean of Placement & Academics',
      icon: <ShieldCheck className="w-4 h-4 text-purple-400" />,
      route: '/admin/dashboard',
    },
  ];

  const handleSelectRole = (newRole: UserRole, targetRoute: string) => {
    setRole(newRole);
    setShowRoleMenu(false);
    router.push(targetRoute);
  };

  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-800/80 bg-slate-950/90 backdrop-blur-md">
      <div className="flex h-16 items-center justify-between px-4 sm:px-6">
        {/* Brand Logo & Wordmark */}
        <div className="flex items-center gap-3">
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-indigo-600 via-primary-500 to-emerald-400 p-[1px] shadow-lg shadow-indigo-500/20 group-hover:scale-105 transition-transform">
              <div className="w-full h-full bg-slate-900 rounded-[11px] flex items-center justify-center">
                <Sparkles className="w-4 h-4 text-emerald-400 animate-pulse" />
              </div>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-bold text-base text-white tracking-tight group-hover:text-indigo-300 transition-colors">
                  SkillBridge<span className="text-emerald-400">AI</span>
                </span>
                <span className="text-[10px] font-mono uppercase bg-indigo-950/80 text-indigo-300 border border-indigo-700/50 px-1.5 py-0.5 rounded font-semibold">
                  SIH26044
                </span>
              </div>
              <p className="text-[11px] text-slate-400 hidden sm:block">
                Academia × Industry Intelligence
              </p>
            </div>
          </Link>
        </div>

        {/* Global Search trigger */}
        <div className="hidden md:flex items-center flex-1 max-w-md mx-6">
          <button
            onClick={onOpenSearch}
            className="w-full flex items-center justify-between px-3.5 py-2 text-xs text-slate-400 bg-slate-900/90 border border-slate-800 rounded-lg hover:border-slate-700 hover:text-slate-200 transition-all shadow-inner"
          >
            <div className="flex items-center gap-2">
              <Search className="w-3.5 h-3.5 text-slate-500" />
              <span>Search skills, students, jobs, companies...</span>
            </div>
            <kbd className="px-1.5 py-0.5 text-[10px] font-mono bg-slate-800 text-slate-400 border border-slate-700 rounded shadow">
              ⌘K
            </kbd>
          </button>
        </div>

        {/* Right Actions: Demo Tour, Role Switcher, Notifications, Assistant */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* 5-Min Demo Tour Button */}
          <button
            onClick={() => setIsDemoTourOpen(true)}
            className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-emerald-300 bg-emerald-950/60 border border-emerald-700/60 rounded-lg hover:bg-emerald-900/40 hover:border-emerald-500 transition-all shadow-sm"
          >
            <Play className="w-3.5 h-3.5 fill-emerald-400 text-emerald-400" />
            <span>5-Minute Demo Tour</span>
          </button>

          {/* AI Career Assistant Shortcut */}
          <Link
            href="/assistant"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-indigo-300 bg-indigo-950/60 border border-indigo-700/60 rounded-lg hover:bg-indigo-900/40 hover:border-indigo-500 transition-all shadow-sm"
            title="AI Career Assistant"
          >
            <Bot className="w-3.5 h-3.5 text-indigo-400" />
            <span className="hidden sm:inline">AI Advisor</span>
          </Link>

          {/* Role Switcher Dropdown */}
          <div className="relative">
            <button
              onClick={() => setShowRoleMenu(!showRoleMenu)}
              className="flex items-center gap-2 px-2.5 py-1.5 text-xs font-medium text-slate-200 bg-slate-900 border border-slate-700 rounded-lg hover:border-indigo-500/80 transition-all"
            >
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
              <span className="capitalize font-semibold text-white">
                {role} Mode
              </span>
              <ChevronDown className="w-3 h-3 text-slate-400" />
            </button>

            {showRoleMenu && (
              <div className="absolute right-0 mt-2 w-72 bg-slate-900 border border-slate-800 rounded-xl shadow-2xl p-2 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                <div className="px-2 py-1.5 border-b border-slate-800 mb-1 flex items-center justify-between">
                  <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
                    Demo Mode Personas
                  </span>
                  <span className="text-[10px] text-emerald-400 bg-emerald-950 px-1.5 py-0.5 rounded border border-emerald-800/50">
                    Sample Data
                  </span>
                </div>
                {rolesList.map((item) => (
                  <button
                    key={item.role}
                    onClick={() => handleSelectRole(item.role, item.route)}
                    className={`w-full text-left flex items-start gap-2.5 p-2 rounded-lg transition-colors ${
                      role === item.role
                        ? 'bg-indigo-950/70 border border-indigo-700/60 text-white'
                        : 'hover:bg-slate-800/80 text-slate-300'
                    }`}
                  >
                    <div className="mt-0.5 p-1 rounded bg-slate-800/80 border border-slate-700/60">
                      {item.icon}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <span className="font-semibold text-xs text-white">
                          {item.title}
                        </span>
                        {role === item.role && (
                          <UserCheck className="w-3.5 h-3.5 text-emerald-400" />
                        )}
                      </div>
                      <p className="text-[11px] text-slate-400 truncate">
                        {item.subtitle}
                      </p>
                    </div>
                  </button>
                ))}
                <div className="pt-2 mt-1 border-t border-slate-800 flex items-center justify-between px-2">
                  <button
                    onClick={resetDemoData}
                    className="flex items-center gap-1 text-[11px] text-slate-400 hover:text-amber-300 transition-colors"
                  >
                    <RefreshCw className="w-3 h-3" />
                    <span>Reset Data</span>
                  </button>
                  <Link
                    href="/portfolio/demo-student"
                    target="_blank"
                    className="flex items-center gap-1 text-[11px] text-indigo-400 hover:text-indigo-300"
                  >
                    <span>Public Portfolio</span>
                    <ExternalLink className="w-2.5 h-2.5" />
                  </Link>
                </div>
              </div>
            )}
          </div>

          {/* Notifications Trigger & Dropdown */}
          <div className="relative">
            <button
              onClick={() => setShowNotifications(!showNotifications)}
              className="relative p-2 text-slate-400 hover:text-white bg-slate-900 border border-slate-800 rounded-lg hover:border-slate-700 transition-all"
              title="Notifications"
            >
              <Bell className="w-4 h-4" />
              {unreadCount > 0 && (
                <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-indigo-500 text-[10px] font-bold text-white shadow">
                  {unreadCount}
                </span>
              )}
            </button>

            {showNotifications && (
              <div className="absolute right-0 mt-2 w-80 sm:w-96 bg-slate-900 border border-slate-800 rounded-xl shadow-2xl p-3 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                <div className="flex items-center justify-between border-b border-slate-800 pb-2 mb-2">
                  <div className="flex items-center gap-2">
                    <Bell className="w-4 h-4 text-indigo-400" />
                    <span className="text-xs font-semibold text-white">
                      Notifications
                    </span>
                  </div>
                  <span className="text-[10px] bg-slate-800 text-slate-300 px-2 py-0.5 rounded-full font-mono">
                    {unreadCount} unread
                  </span>
                </div>
                <div className="max-h-72 overflow-y-auto space-y-2">
                  {notifications.map((notif) => (
                    <div
                      key={notif.id}
                      onClick={() => markNotificationRead(notif.id)}
                      className={`p-2.5 rounded-lg border text-left cursor-pointer transition-colors ${
                        notif.read
                          ? 'bg-slate-900/50 border-slate-800/60 text-slate-400'
                          : 'bg-indigo-950/30 border-indigo-800/40 text-slate-200'
                      }`}
                    >
                      <div className="flex items-start justify-between gap-1 mb-1">
                        <span className="text-xs font-semibold text-white">
                          {notif.title}
                        </span>
                        <span className="text-[10px] text-slate-400 shrink-0">
                          {notif.time}
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-300 line-clamp-2">
                        {notif.message}
                      </p>
                      {notif.link && (
                        <Link
                          href={notif.link}
                          className="inline-block mt-1.5 text-[10px] text-indigo-400 hover:underline"
                        >
                          View details →
                        </Link>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
