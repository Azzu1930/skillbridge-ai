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
  User,
  LogOut,
  FolderKanban,
  LayoutDashboard,
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
    currentUser,
    isAuthenticated,
    logout,
  } = useApp();

  const [showRoleMenu, setShowRoleMenu] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  const rolesList: { role: UserRole; title: string; subtitle: string; icon: React.ReactNode; route: string }[] = [
    {
      role: 'student',
      title: 'Student Demo',
      subtitle: 'Abdul Aziz (Backend Dev, 68%)',
      icon: <GraduationCap className="w-4 h-4 text-green-700" />,
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

  const handleLogout = () => {
    logout();
    setShowUserMenu(false);
    router.push('/');
  };

  return (
    <header className="sticky top-0 z-40 w-full border-b border-[#dce9df] bg-white/95 backdrop-blur-md shadow-xs">
      <div className="flex h-16 items-center justify-between px-4 sm:px-6 max-w-7xl mx-auto w-full">
        {/* Brand Logo & Wordmark (Left) */}
        <div className="flex items-center gap-3">
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="w-9 h-9 rounded-xl bg-green-600 flex items-center justify-center shadow-xs group-hover:bg-green-700 transition-colors">
              <Sparkles className="w-4 h-4 text-white" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-base text-[#17251b] tracking-tight group-hover:text-green-700 transition-colors">
                  SkillBridge<span className="text-green-600">AI</span>
                </span>
                <span className="text-[10px] font-mono uppercase bg-green-50 text-green-800 border border-green-200 px-1.5 py-0.5 rounded font-semibold">
                  SIH26044
                </span>
              </div>
              <p className="text-[11px] text-[#526157] hidden sm:block font-medium">
                Academia × Industry Intelligence
              </p>
            </div>
          </Link>
        </div>

        {/* Global Navigation Links (Part 5: Platform, How It Works, Opportunities, Analyze Resume, Demo) */}
        <nav className="hidden lg:flex items-center gap-1 text-xs font-medium text-[#526157]">
          <Link
            href="/"
            className={`px-3 py-1.5 rounded-lg transition-colors ${
              pathname === '/'
                ? 'text-green-700 font-semibold bg-green-50'
                : 'hover:text-[#17251b] hover:bg-green-50/60'
            }`}
          >
            Platform
          </Link>
          <Link
            href="/#how-it-works"
            className="px-3 py-1.5 rounded-lg transition-colors hover:text-[#17251b] hover:bg-green-50/60"
          >
            How It Works
          </Link>
          <Link
            href="/student/opportunities"
            className={`px-3 py-1.5 rounded-lg transition-colors ${
              pathname === '/student/opportunities'
                ? 'text-green-700 font-semibold bg-green-50'
                : 'hover:text-[#17251b] hover:bg-green-50/60'
            }`}
          >
            Opportunities
          </Link>
          <Link
            href="/resume-analyzer"
            className={`px-3 py-1.5 rounded-lg transition-colors ${
              pathname === '/resume-analyzer'
                ? 'text-green-700 font-semibold bg-green-50'
                : 'hover:text-[#17251b] hover:bg-green-50/60'
            }`}
          >
            Analyze Resume
          </Link>
          <button
            onClick={() => setIsDemoTourOpen(true)}
            className="px-3 py-1.5 rounded-lg transition-colors text-green-700 hover:text-green-800 hover:bg-green-50 flex items-center gap-1 font-semibold"
          >
            <Play className="w-3 h-3 fill-green-600 text-green-600" />
            <span>Demo</span>
          </button>
        </nav>

        {/* Global Search trigger */}
        <div className="hidden xl:flex items-center max-w-xs mx-2">
          <button
            onClick={onOpenSearch}
            className="w-full flex items-center justify-between px-3 py-1.5 text-xs text-[#526157] bg-[#f7fcf8] border border-[#dce9df] rounded-lg hover:border-green-300 hover:text-[#17251b] transition-all shadow-xs"
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

        {/* Right Actions: Auth State & CTAs */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* If Logged In: Profile, My Reports, Dashboard, Logout */}
          {isAuthenticated && currentUser ? (
            <div className="flex items-center gap-2">
              <Link
                href="/dashboard"
                className={`hidden md:inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors ${
                  pathname === '/dashboard'
                    ? 'text-green-800 bg-green-50 border border-green-200'
                    : 'text-[#526157] hover:text-[#17251b] hover:bg-green-50/60'
                }`}
              >
                <LayoutDashboard className="w-3.5 h-3.5 text-green-600" />
                <span>Dashboard</span>
              </Link>
              <Link
                href="/reports"
                className={`hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors ${
                  pathname === '/reports'
                    ? 'text-green-800 bg-green-50 border border-green-200'
                    : 'text-[#526157] hover:text-[#17251b] hover:bg-green-50/60'
                }`}
              >
                <FolderKanban className="w-3.5 h-3.5 text-green-600" />
                <span>My Reports</span>
              </Link>

              {/* User Dropdown */}
              <div className="relative">
                <button
                  onClick={() => setShowUserMenu(!showUserMenu)}
                  className="flex items-center gap-2 px-2.5 py-1.5 text-xs font-medium text-[#17251b] bg-white border border-[#dce9df] rounded-lg hover:border-green-300 transition-all shadow-xs"
                >
                  <div className="w-5 h-5 rounded-full bg-green-100 text-green-800 flex items-center justify-center font-bold text-[10px]">
                    {currentUser.fullName.charAt(0).toUpperCase()}
                  </div>
                  <span className="font-semibold max-w-[100px] truncate">{currentUser.fullName}</span>
                  <ChevronDown className="w-3 h-3 text-slate-400" />
                </button>

                {showUserMenu && (
                  <div className="absolute right-0 mt-2 w-52 bg-white border border-[#dce9df] rounded-xl shadow-xl p-1.5 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                    <div className="px-3 py-2 border-b border-slate-100 mb-1">
                      <p className="text-xs font-bold text-[#17251b] truncate">{currentUser.fullName}</p>
                      <p className="text-[11px] text-[#526157] truncate">{currentUser.email}</p>
                    </div>
                    <Link
                      href="/dashboard"
                      onClick={() => setShowUserMenu(false)}
                      className="flex items-center gap-2 px-3 py-2 text-xs text-[#17251b] hover:bg-green-50 rounded-lg transition-colors"
                    >
                      <LayoutDashboard className="w-3.5 h-3.5 text-green-600" />
                      <span>Dashboard</span>
                    </Link>
                    <Link
                      href="/reports"
                      onClick={() => setShowUserMenu(false)}
                      className="flex items-center gap-2 px-3 py-2 text-xs text-[#17251b] hover:bg-green-50 rounded-lg transition-colors"
                    >
                      <FolderKanban className="w-3.5 h-3.5 text-green-600" />
                      <span>My Reports</span>
                    </Link>
                    <Link
                      href="/profile"
                      onClick={() => setShowUserMenu(false)}
                      className="flex items-center gap-2 px-3 py-2 text-xs text-[#17251b] hover:bg-green-50 rounded-lg transition-colors"
                    >
                      <User className="w-3.5 h-3.5 text-green-600" />
                      <span>Account Profile</span>
                    </Link>
                    <div className="border-t border-slate-100 my-1" />
                    <button
                      onClick={handleLogout}
                      className="w-full flex items-center gap-2 px-3 py-2 text-xs text-red-600 hover:bg-red-50 rounded-lg transition-colors text-left font-medium"
                    >
                      <LogOut className="w-3.5 h-3.5" />
                      <span>Log Out</span>
                    </button>
                  </div>
                )}
              </div>
            </div>
          ) : (
            /* If Logged Out: Login and Register buttons */
            <div className="flex items-center gap-2">
              <Link
                href="/login"
                className="px-3 py-1.5 text-xs font-semibold text-[#17251b] hover:text-green-700 hover:bg-green-50 rounded-lg transition-colors"
              >
                Login
              </Link>
              <Link
                href="/register"
                className="px-3.5 py-1.5 text-xs font-bold text-white bg-green-600 hover:bg-green-700 rounded-lg shadow-xs hover:shadow-sm transition-all"
              >
                Register
              </Link>
            </div>
          )}

          {/* Demo Persona Switcher (Allows Judges to switch roles without signing in) */}
          <div className="relative">
            <button
              onClick={() => setShowRoleMenu(!showRoleMenu)}
              className="flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-medium text-[#526157] bg-white border border-[#dce9df] rounded-lg hover:border-green-300 hover:bg-green-50/50 transition-all shadow-xs"
              title="Switch demo persona for judges"
            >
              <span className={`w-2 h-2 rounded-full ${activeSessionMode === 'user' ? 'bg-green-600' : 'bg-emerald-500'}`} />
              <span className="capitalize font-semibold text-[#17251b] hidden sm:inline">
                {activeSessionMode === 'user' ? 'User Mode' : `${role} Demo`}
              </span>
              <ChevronDown className="w-3 h-3 text-slate-400" />
            </button>

            {showRoleMenu && (
              <div className="absolute right-0 mt-2 w-72 bg-white border border-[#dce9df] rounded-xl shadow-xl p-2 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                <div className="px-2 py-1.5 border-b border-slate-100 mb-1 flex items-center justify-between">
                  <span className="text-[11px] font-bold text-[#526157] uppercase tracking-wider">
                    Demo Mode Personas
                  </span>
                  <span className="text-[10px] text-green-800 bg-green-50 px-1.5 py-0.5 rounded border border-green-200 font-medium">
                    SIH 2026
                  </span>
                </div>
                {rolesList.map((item) => (
                  <button
                    key={item.role}
                    onClick={() => handleSelectRole(item.role, item.route)}
                    className={`w-full text-left flex items-start gap-2.5 p-2 rounded-lg transition-colors ${
                      role === item.role && activeSessionMode === 'demo'
                        ? 'bg-green-50 border border-green-200 text-green-900'
                        : 'hover:bg-green-50/60 text-[#17251b]'
                    }`}
                  >
                    <div className="mt-0.5 p-1 rounded bg-[#f7fcf8] border border-[#dce9df]">
                      {item.icon}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <span className="font-semibold text-xs text-[#17251b]">
                          {item.title}
                        </span>
                        {role === item.role && activeSessionMode === 'demo' && (
                          <UserCheck className="w-3.5 h-3.5 text-green-600" />
                        )}
                      </div>
                      <p className="text-[11px] text-[#526157] truncate">
                        {item.subtitle}
                      </p>
                    </div>
                  </button>
                ))}

                <div className="pt-2 mt-1 border-t border-slate-100 flex items-center justify-between px-2">
                  <Link
                    href="/resume-analyzer"
                    onClick={() => setShowRoleMenu(false)}
                    className="text-[11px] text-green-700 font-semibold hover:underline flex items-center gap-1"
                  >
                    <FileText className="w-3 h-3" />
                    <span>Upload Personal Resume</span>
                  </Link>
                  <button
                    onClick={() => {
                      resetDemoData();
                      setShowRoleMenu(false);
                    }}
                    className="text-[11px] text-slate-400 hover:text-red-600 transition-colors"
                    title="Reset to default seed state"
                  >
                    Reset
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
