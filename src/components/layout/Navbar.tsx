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
  Briefcase,
  Award,
  Workflow,
  PlusCircle,
  Users,
} from 'lucide-react';

export function Navbar({ onOpenSearch }: { onOpenSearch?: () => void }) {
  const {
    role,
    setRole,
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
  const safePath = pathname || '';
  const router = useRouter();

  const demoRolesList: { role: UserRole; title: string; subtitle: string; icon: React.ReactNode; route: string }[] = [
    {
      role: 'student',
      title: 'Demo Student',
      subtitle: 'Candidate Skill Twin & Readiness',
      icon: <GraduationCap className="w-4 h-4 text-green-700" />,
      route: '/student/dashboard',
    },
    {
      role: 'industry',
      title: 'Demo Industry',
      subtitle: 'Talent Acquisition & Hiring',
      icon: <Building2 className="w-4 h-4 text-amber-600" />,
      route: '/industry/dashboard',
    },
    {
      role: 'faculty',
      title: 'Demo Faculty',
      subtitle: 'Academic Mentorship & Training',
      icon: <Layers className="w-4 h-4 text-emerald-600" />,
      route: '/faculty/dashboard',
    },
    {
      role: 'admin',
      title: 'Demo Institution',
      subtitle: 'Campus Skill & Placement Intelligence',
      icon: <ShieldCheck className="w-4 h-4 text-purple-600" />,
      route: '/institution/dashboard',
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

  // Determine user's primary dashboard URL
  const userDashboardUrl = currentUser
    ? currentUser.role === 'faculty'
      ? '/faculty/dashboard'
      : currentUser.role === 'industry'
      ? '/industry/dashboard'
      : currentUser.role === 'institution' || currentUser.role === 'admin'
      ? '/institution/dashboard'
      : '/student/dashboard'
    : '/student/dashboard';

  return (
    <header className="sticky top-0 z-40 w-full border-b border-[#dce9df] bg-white/95 backdrop-blur-md shadow-xs">
      <div className="flex h-16 items-center justify-between px-4 sm:px-6 max-w-7xl mx-auto w-full">
        {/* Brand Logo & Wordmark */}
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
              </div>
              <p className="text-[11px] text-[#526157] hidden sm:block font-medium">
                Connecting Skills, Academia and Industry
              </p>
            </div>
          </Link>
        </div>

        {/* Navigation Links */}
        <nav className="hidden lg:flex items-center gap-1 text-xs font-medium text-[#526157]">
          {isAuthenticated && currentUser ? (
            /* Authenticated Role-Specific Nav Items */
            <>
              <Link
                href={userDashboardUrl}
                className={`px-3 py-1.5 rounded-lg transition-colors ${
                  safePath.includes('dashboard')
                    ? 'text-green-700 font-semibold bg-green-50'
                    : 'hover:text-[#17251b] hover:bg-green-50/60'
                }`}
              >
                Dashboard
              </Link>

              {currentUser.role === 'student' && (
                <>
                  <Link
                    href="/student/skill-twin"
                    className={`px-3 py-1.5 rounded-lg transition-colors ${
                      safePath === '/student/skill-twin' ? 'text-green-700 font-semibold bg-green-50' : 'hover:text-[#17251b] hover:bg-green-50/60'
                    }`}
                  >
                    My Skill Profile
                  </Link>
                  <Link
                    href="/student/assessment"
                    className={`px-3 py-1.5 rounded-lg transition-colors ${
                      safePath === '/student/assessment' ? 'text-green-700 font-semibold bg-green-50' : 'hover:text-[#17251b] hover:bg-green-50/60'
                    }`}
                  >
                    Skill Assessments
                  </Link>
                  <Link
                    href="/student/opportunities"
                    className={`px-3 py-1.5 rounded-lg transition-colors ${
                      safePath === '/student/opportunities' ? 'text-green-700 font-semibold bg-green-50' : 'hover:text-[#17251b] hover:bg-green-50/60'
                    }`}
                  >
                    Opportunities
                  </Link>
                  <Link
                    href="/student/applications"
                    className={`px-3 py-1.5 rounded-lg transition-colors ${
                      safePath === '/student/applications' ? 'text-green-700 font-semibold bg-green-50' : 'hover:text-[#17251b] hover:bg-green-50/60'
                    }`}
                  >
                    My Applications
                  </Link>
                  <Link
                    href="/reports"
                    className={`px-3 py-1.5 rounded-lg transition-colors ${
                      safePath === '/reports' ? 'text-green-700 font-semibold bg-green-50' : 'hover:text-[#17251b] hover:bg-green-50/60'
                    }`}
                  >
                    My Reports
                  </Link>
                </>
              )}

              {currentUser.role === 'faculty' && (
                <>
                  <Link
                    href="/faculty/collaborations"
                    className={`px-3 py-1.5 rounded-lg transition-colors ${
                      safePath === '/faculty/collaborations' ? 'text-green-700 font-semibold bg-green-50' : 'hover:text-[#17251b] hover:bg-green-50/60'
                    }`}
                  >
                    Faculty Opportunities
                  </Link>
                  <Link
                    href="/student/skill-gap"
                    className={`px-3 py-1.5 rounded-lg transition-colors ${
                      safePath === '/student/skill-gap' ? 'text-green-700 font-semibold bg-green-50' : 'hover:text-[#17251b] hover:bg-green-50/60'
                    }`}
                  >
                    Student Insights
                  </Link>
                </>
              )}

              {currentUser.role === 'industry' && (
                <>
                  <Link
                    href="/industry/post-opportunity"
                    className={`px-3 py-1.5 rounded-lg transition-colors ${
                      safePath === '/industry/post-opportunity' ? 'text-green-700 font-semibold bg-green-50' : 'hover:text-[#17251b] hover:bg-green-50/60'
                    }`}
                  >
                    Post Opportunity
                  </Link>
                  <Link
                    href="/industry/candidates"
                    className={`px-3 py-1.5 rounded-lg transition-colors ${
                      safePath === '/industry/candidates' ? 'text-green-700 font-semibold bg-green-50' : 'hover:text-[#17251b] hover:bg-green-50/60'
                    }`}
                  >
                    Candidate Matcher
                  </Link>
                  <Link
                    href="/industry/demand"
                    className={`px-3 py-1.5 rounded-lg transition-colors ${
                      safePath === '/industry/demand' ? 'text-green-700 font-semibold bg-green-50' : 'hover:text-[#17251b] hover:bg-green-50/60'
                    }`}
                  >
                    Skill Demand
                  </Link>
                </>
              )}

              {(currentUser.role === 'institution' || currentUser.role === 'admin') && (
                <>
                  <Link
                    href="/institution/students"
                    className={`px-3 py-1.5 rounded-lg transition-colors ${
                      safePath === '/institution/students' ? 'text-green-700 font-semibold bg-green-50' : 'hover:text-[#17251b] hover:bg-green-50/60'
                    }`}
                  >
                    Students
                  </Link>
                  <Link
                    href="/admin/intelligence"
                    className={`px-3 py-1.5 rounded-lg transition-colors ${
                      safePath === '/admin/intelligence' ? 'text-green-700 font-semibold bg-green-50' : 'hover:text-[#17251b] hover:bg-green-50/60'
                    }`}
                  >
                    Skill Intelligence
                  </Link>
                  <Link
                    href="/admin/training"
                    className={`px-3 py-1.5 rounded-lg transition-colors ${
                      safePath === '/admin/training' ? 'text-green-700 font-semibold bg-green-50' : 'hover:text-[#17251b] hover:bg-green-50/60'
                    }`}
                  >
                    Training Programs
                  </Link>
                </>
              )}
            </>
          ) : (
            /* Public Guest Navigation */
            <>
              <Link
                href="/"
                className={`px-2.5 py-1.5 rounded-lg transition-colors ${
                  safePath === '/' ? 'text-green-700 font-semibold bg-green-50' : 'hover:text-[#17251b] hover:bg-green-50/60'
                }`}
              >
                Home
              </Link>
              <a
                href="/#platform"
                className="px-2.5 py-1.5 rounded-lg transition-colors hover:text-[#17251b] hover:bg-green-50/60"
              >
                Platform
              </a>
              <a
                href="/#skill-development"
                className="px-2.5 py-1.5 rounded-lg transition-colors hover:text-[#17251b] hover:bg-green-50/60"
              >
                Skill Development
              </a>
              <Link
                href="/student/opportunities?type=Internship"
                className="px-2.5 py-1.5 rounded-lg transition-colors hover:text-[#17251b] hover:bg-green-50/60"
              >
                Internships
              </Link>
              <Link
                href="/student/opportunities?type=Full-time"
                className="px-2.5 py-1.5 rounded-lg transition-colors hover:text-[#17251b] hover:bg-green-50/60"
              >
                Placements
              </Link>
              <Link
                href="/student/opportunities"
                className={`px-2.5 py-1.5 rounded-lg transition-colors ${
                  safePath === '/student/opportunities' ? 'text-green-700 font-semibold bg-green-50' : 'hover:text-[#17251b] hover:bg-green-50/60'
                }`}
              >
                Opportunities
              </Link>
              <a
                href="/#how-it-works"
                className="px-2.5 py-1.5 rounded-lg transition-colors hover:text-[#17251b] hover:bg-green-50/60"
              >
                How It Works
              </a>
              <a
                href="/#about"
                className="px-2.5 py-1.5 rounded-lg transition-colors hover:text-[#17251b] hover:bg-green-50/60"
              >
                About
              </a>
            </>
          )}
        </nav>

        {/* Global Search trigger */}
        <div className="hidden xl:flex items-center max-w-xs mx-2">
          <button
            onClick={() => onOpenSearch?.()}
            className="w-full flex items-center justify-between px-3 py-1.5 text-xs text-[#526157] bg-[#f7fcf8] border border-[#dce9df] rounded-lg hover:border-green-300 hover:text-[#17251b] transition-all shadow-xs"
          >
            <div className="flex items-center gap-2">
              <Search className="w-3.5 h-3.5 text-slate-400" />
              <span>Search skills, opportunities...</span>
            </div>
            <kbd className="px-1.5 py-0.5 text-[10px] font-mono bg-white text-slate-500 border border-slate-200 rounded shadow-xs">
              ⌘K
            </kbd>
          </button>
        </div>

        {/* Right Actions: Auth State & CTAs */}
        <div className="flex items-center gap-2 sm:gap-3">
          {isAuthenticated && currentUser ? (
            /* Logged In User State (NO DEMO UI SHOWN HERE!) */
            <div className="flex items-center gap-2">
              <span className="hidden sm:inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-mono font-bold uppercase bg-green-100 text-green-800 border border-green-200">
                {currentUser.role}
              </span>

              {/* User Dropdown Menu */}
              <div className="relative">
                <button
                  onClick={() => setShowUserMenu(!showUserMenu)}
                  className="flex items-center gap-2 px-2.5 py-1.5 text-xs font-medium text-[#17251b] bg-white border border-[#dce9df] rounded-lg hover:border-green-300 transition-all shadow-xs"
                >
                  <div className="w-5 h-5 rounded-full bg-green-100 text-green-800 flex items-center justify-center font-bold text-[10px]">
                    {(currentUser.fullName || 'User').charAt(0).toUpperCase()}
                  </div>
                  <span className="font-semibold max-w-[110px] truncate">{currentUser.fullName || 'User'}</span>
                  <ChevronDown className="w-3 h-3 text-slate-400" />
                </button>

                {showUserMenu && (
                  <div className="absolute right-0 mt-2 w-56 bg-white border border-[#dce9df] rounded-xl shadow-xl p-1.5 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                    <div className="px-3 py-2 border-b border-slate-100 mb-1">
                      <p className="text-xs font-bold text-[#17251b] truncate">{currentUser.fullName}</p>
                      <p className="text-[11px] text-[#526157] truncate">{currentUser.email}</p>
                      <span className="inline-block mt-1 px-2 py-0.5 rounded text-[9px] font-mono font-bold uppercase bg-green-50 text-green-800 border border-green-200">
                        {currentUser.role} Account
                      </span>
                    </div>

                    <Link
                      href={userDashboardUrl}
                      onClick={() => setShowUserMenu(false)}
                      className="flex items-center gap-2 px-3 py-2 text-xs text-[#17251b] hover:bg-green-50 rounded-lg transition-colors"
                    >
                      <LayoutDashboard className="w-3.5 h-3.5 text-green-600" />
                      <span>My Dashboard</span>
                    </Link>

                    {currentUser.role === 'student' && (
                      <>
                        <Link
                          href="/reports"
                          onClick={() => setShowUserMenu(false)}
                          className="flex items-center gap-2 px-3 py-2 text-xs text-[#17251b] hover:bg-green-50 rounded-lg transition-colors"
                        >
                          <FolderKanban className="w-3.5 h-3.5 text-green-600" />
                          <span>My Reports</span>
                        </Link>
                        <Link
                          href="/student/portfolio"
                          onClick={() => setShowUserMenu(false)}
                          className="flex items-center gap-2 px-3 py-2 text-xs text-[#17251b] hover:bg-green-50 rounded-lg transition-colors"
                        >
                          <User className="w-3.5 h-3.5 text-green-600" />
                          <span>Digital Portfolio</span>
                        </Link>
                      </>
                    )}

                    <Link
                      href="/profile"
                      onClick={() => setShowUserMenu(false)}
                      className="flex items-center gap-2 px-3 py-2 text-xs text-[#17251b] hover:bg-green-50 rounded-lg transition-colors"
                    >
                      <User className="w-3.5 h-3.5 text-green-600" />
                      <span>Account Settings</span>
                    </Link>

                    <div className="border-t border-slate-100 my-1" />
                    <button
                      onClick={handleLogout}
                      className="w-full flex items-center gap-2 px-3 py-2 text-xs text-red-600 hover:bg-red-50 rounded-lg transition-colors text-left font-medium cursor-pointer"
                    >
                      <LogOut className="w-3.5 h-3.5" />
                      <span>Log Out</span>
                    </button>
                  </div>
                )}
              </div>
            </div>
          ) : (
            /* Unauthenticated / Guest View: Login, Register, and clearly labeled Explore Demo */
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

              {/* Guest Demo Switcher - Clearly Labeled "Demo Environment" */}
              <div className="relative ml-1">
                <button
                  onClick={() => setShowRoleMenu(!showRoleMenu)}
                  className="flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-medium text-slate-700 bg-slate-50 border border-slate-200 rounded-lg hover:border-green-300 hover:bg-green-50/50 transition-all shadow-xs cursor-pointer"
                  title="Explore live demo environment across roles"
                >
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="font-semibold text-slate-800">Explore Demo</span>
                  <ChevronDown className="w-3 h-3 text-slate-400" />
                </button>

                {showRoleMenu && (
                  <div className="absolute right-0 mt-2 w-72 bg-white border border-[#dce9df] rounded-xl shadow-xl p-2 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                    <div className="px-2 py-1.5 border-b border-slate-100 mb-1 flex items-center justify-between">
                      <span className="text-[11px] font-bold text-[#526157] uppercase tracking-wider">
                        Demo Environment
                      </span>
                      <span className="text-[10px] text-green-800 bg-green-50 px-1.5 py-0.5 rounded border border-green-200 font-medium">
                        Public Preview
                      </span>
                    </div>

                    {demoRolesList.map((item) => (
                      <button
                        key={item.role}
                        onClick={() => handleSelectRole(item.role, item.route)}
                        className={`w-full text-left flex items-start gap-2.5 p-2 rounded-lg transition-colors cursor-pointer ${
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
                        <span>Upload Custom Resume</span>
                      </Link>
                      <button
                        onClick={() => {
                          resetDemoData();
                          setShowRoleMenu(false);
                        }}
                        className="text-[11px] text-slate-400 hover:text-red-600 transition-colors cursor-pointer"
                        title="Reset demo data"
                      >
                        Reset Demo
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
