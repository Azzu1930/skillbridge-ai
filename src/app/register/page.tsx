'use client';

import React, { useState, Suspense } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { useApp } from '@/context/AppContext';
import { Navbar } from '@/components/layout/Navbar';
import { UserRole } from '@/types';
import {
  Sparkles,
  ArrowRight,
  AlertCircle,
  Lock,
  Mail,
  User,
  Building2,
  Briefcase,
  GraduationCap,
  BookOpen,
  Landmark,
  CheckCircle2,
  ArrowLeft,
  Globe,
  Award,
  Calendar,
} from 'lucide-react';

function RegisterForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const initialRole = (searchParams.get('role') as UserRole) || 'student';

  const { register } = useApp();

  const [selectedRole, setSelectedRole] = useState<UserRole>(
    ['student', 'faculty', 'industry', 'institution'].includes(initialRole) ? initialRole : 'student'
  );
  const [step, setStep] = useState<'select-role' | 'fill-form'>('fill-form');

  // Shared Form State
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  // Student Fields
  const [institution, setInstitution] = useState('');
  const [degree, setDegree] = useState('B.Tech');
  const [branch, setBranch] = useState('Computer Science & Engineering');
  const [graduationYear, setGraduationYear] = useState('2026');
  const [targetRole, setTargetRole] = useState('Backend Developer');

  // Faculty Fields
  const [department, setDepartment] = useState('Computer Science & Engineering');
  const [designation, setDesignation] = useState('Assistant Professor');
  const [yearsOfExperience, setYearsOfExperience] = useState('6');
  const [areasOfExpertise, setAreasOfExpertise] = useState('Cloud Computing, Distributed Systems, Data Structures');

  // Industry Fields
  const [companyName, setCompanyName] = useState('');
  const [industrySector, setIndustrySector] = useState('Software & Cloud Services');
  const [companySize, setCompanySize] = useState('51-200');
  const [website, setWebsite] = useState('');
  const [location, setLocation] = useState('Bangalore / Hybrid');

  // Institution Fields
  const [institutionName, setInstitutionName] = useState('');
  const [institutionType, setInstitutionType] = useState('Autonomous Technical College');
  const [universityAffiliation, setUniversityAffiliation] = useState('AICTE / Autonomous');
  const [adminDesignation, setAdminDesignation] = useState('Dean of Academics & Placement');

  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const calculatePasswordStrength = (pass: string) => {
    if (!pass) return 0;
    let score = 0;
    if (pass.length >= 6) score += 25;
    if (pass.length >= 10) score += 25;
    if (/[0-9]/.test(pass)) score += 25;
    if (/[^A-Za-z0-9]/.test(pass)) score += 25;
    return score;
  };

  const strength = calculatePasswordStrength(password);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (password !== confirmPassword) {
      setError('Passwords do not match. Please verify and try again.');
      return;
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters long.');
      return;
    }

    setLoading(true);
    try {
      const user = await register({
        fullName,
        email,
        password,
        confirmPassword,
        role: selectedRole,
        // Student
        institution: selectedRole === 'student' ? institution : undefined,
        degree: selectedRole === 'student' ? degree : undefined,
        branch: selectedRole === 'student' ? branch : undefined,
        graduationYear: selectedRole === 'student' ? parseInt(graduationYear) || 2026 : undefined,
        targetRole: selectedRole === 'student' ? targetRole : undefined,
        // Faculty
        department: selectedRole === 'faculty' ? department : undefined,
        designation: selectedRole === 'faculty' ? designation : selectedRole === 'institution' ? adminDesignation : undefined,
        yearsOfExperience: selectedRole === 'faculty' ? parseInt(yearsOfExperience) || 5 : undefined,
        areasOfExpertise: selectedRole === 'faculty' ? areasOfExpertise.split(',').map((s) => s.trim()) : undefined,
        // Industry
        companyName: selectedRole === 'industry' ? companyName : undefined,
        industrySector: selectedRole === 'industry' ? industrySector : undefined,
        companySize: selectedRole === 'industry' ? companySize : undefined,
        website: selectedRole === 'industry' ? website : undefined,
        contactPerson: selectedRole === 'industry' ? fullName : undefined,
        location: selectedRole === 'industry' ? location : undefined,
        // Institution
        institutionName: selectedRole === 'institution' ? institutionName : undefined,
        institutionType: selectedRole === 'institution' ? institutionType : undefined,
        universityAffiliation: selectedRole === 'institution' ? universityAffiliation : undefined,
        administratorName: selectedRole === 'institution' ? fullName : undefined,
      });

      // Role-specific redirect
      if (user.role === 'faculty') {
        router.push('/faculty/dashboard');
      } else if (user.role === 'industry') {
        router.push('/industry/dashboard');
      } else if (user.role === 'institution') {
        router.push('/institution/dashboard');
      } else {
        router.push('/student/dashboard');
      }
    } catch (err: any) {
      setError(err.message || 'Registration failed. Please check your inputs and try again.');
      setLoading(false);
    }
  };

  const roleConfigs = [
    {
      id: 'student' as UserRole,
      title: 'Student / Job Seeker',
      icon: GraduationCap,
      description: 'Build your verified Skill Twin, detect gaps, follow learning roadmaps, and apply for matched internships.',
      color: 'green',
    },
    {
      id: 'faculty' as UserRole,
      title: 'Faculty / Educator',
      icon: BookOpen,
      description: 'Monitor department cohorts, view real-time skill gaps, guide student projects, and collaborate with industry.',
      color: 'emerald',
    },
    {
      id: 'industry' as UserRole,
      title: 'Industry / Recruiter',
      icon: Building2,
      description: 'Post jobs & internships, discover talent with transparent AI matching, and provide direct curriculum feedback.',
      color: 'teal',
    },
    {
      id: 'institution' as UserRole,
      title: 'Institution / Admin',
      icon: Landmark,
      description: 'Track university placement readiness, department benchmarks, and close the academia–industry intelligence loop.',
      color: 'cyan',
    },
  ];

  return (
    <main className="flex-1 flex items-center justify-center p-4 sm:p-6 lg:p-8">
      <div className="w-full max-w-2xl bg-white border border-borderGreen rounded-2xl shadow-card p-6 sm:p-8 animate-in fade-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="text-center mb-6">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-green-50 border border-green-200 text-green-700 mb-3 shadow-xs">
            <Sparkles className="w-6 h-6" />
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-textPrimary">
            Join SkillBridge AI
          </h1>
          <p className="text-xs sm:text-sm text-muted mt-1 font-medium">
            Unified Academia × Industry Career & Placement Intelligence Platform
          </p>
        </div>

        {/* Step 1: Role Selection */}
        <div className="mb-6">
          <label className="block text-xs font-bold uppercase tracking-wider text-green-700 mb-2.5">
            Select Your Role
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {roleConfigs.map((cfg) => {
              const Icon = cfg.icon;
              const isSelected = selectedRole === cfg.id;
              return (
                <button
                  key={cfg.id}
                  type="button"
                  onClick={() => setSelectedRole(cfg.id)}
                  className={`p-4 rounded-xl border text-left transition-all flex items-start gap-3 ${
                    isSelected
                      ? 'border-green-600 bg-green-50/50 shadow-xs ring-1 ring-green-600'
                      : 'border-borderGreen bg-[#f7fcf8] hover:border-green-300'
                  }`}
                >
                  <div
                    className={`w-9 h-9 rounded-lg flex items-center justify-center shrink-0 ${
                      isSelected
                        ? 'bg-green-600 text-white'
                        : 'bg-white text-green-800 border border-borderGreen'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="flex items-center gap-1.5">
                      <h4 className="text-xs font-bold text-textPrimary">{cfg.title}</h4>
                      {isSelected && <CheckCircle2 className="w-3.5 h-3.5 text-green-600 shrink-0" />}
                    </div>
                    <p className="text-[11px] text-muted mt-0.5 leading-snug">
                      {cfg.description}
                    </p>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Error Banner */}
        {error && (
          <div className="mb-5 p-3.5 rounded-xl bg-red-50 border border-red-200 flex items-start gap-2.5 text-xs text-red-700 animate-in fade-in">
            <AlertCircle className="w-4 h-4 shrink-0 mt-0.5 text-red-600" />
            <span>{error}</span>
          </div>
        )}

        {/* Step 2: Role-Specific Registration Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="border-t border-borderGreen pt-4">
            <h3 className="text-xs font-bold uppercase tracking-wider text-muted mb-3">
              Account Credentials & Details ({roleConfigs.find((r) => r.id === selectedRole)?.title})
            </h3>
          </div>

          {/* Full Name / Contact Person */}
          <div>
            <label className="block text-xs font-semibold text-textPrimary mb-1.5">
              {selectedRole === 'industry'
                ? 'Contact Person / Recruiter Name'
                : selectedRole === 'institution'
                ? 'Administrator / Dean Name'
                : 'Full Name'}{' '}
              <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <User className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
              <input
                type="text"
                required
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder={
                  selectedRole === 'student'
                    ? 'e.g. Priya Sharma'
                    : selectedRole === 'faculty'
                    ? 'e.g. Dr. Ramesh Kumar'
                    : selectedRole === 'industry'
                    ? 'e.g. Sneha Reddy'
                    : 'e.g. Prof. Anand Varma'
                }
                className="w-full pl-9 pr-3 py-2 text-xs bg-[#f7fcf8] border border-borderGreen rounded-xl focus:border-green-600 focus:bg-white focus:outline-hidden transition-all text-textPrimary"
              />
            </div>
          </div>

          {/* Email Address */}
          <div>
            <label className="block text-xs font-semibold text-textPrimary mb-1.5">
              {selectedRole === 'student'
                ? 'Student Email Address'
                : selectedRole === 'faculty'
                ? 'Academic Email Address'
                : selectedRole === 'industry'
                ? 'Corporate Work Email'
                : 'Official University Email'}{' '}
              <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={
                  selectedRole === 'student'
                    ? 'priya@university.edu'
                    : selectedRole === 'faculty'
                    ? 'ramesh.kumar@nit.ac.in'
                    : selectedRole === 'industry'
                    ? 'sneha@nexatech.cloud'
                    : 'dean.academics@nit.ac.in'
                }
                className="w-full pl-9 pr-3 py-2 text-xs bg-[#f7fcf8] border border-borderGreen rounded-xl focus:border-green-600 focus:bg-white focus:outline-hidden transition-all text-textPrimary"
              />
            </div>
          </div>

          {/* Passwords */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-textPrimary mb-1.5">
                Password <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Min 6 characters"
                  className="w-full pl-9 pr-3 py-2 text-xs bg-[#f7fcf8] border border-borderGreen rounded-xl focus:border-green-600 focus:bg-white focus:outline-hidden transition-all text-textPrimary"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-textPrimary mb-1.5">
                Confirm Password <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                <input
                  type="password"
                  required
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Re-type password"
                  className="w-full pl-9 pr-3 py-2 text-xs bg-[#f7fcf8] border border-borderGreen rounded-xl focus:border-green-600 focus:bg-white focus:outline-hidden transition-all text-textPrimary"
                />
              </div>
            </div>
          </div>

          {/* Password Strength Indicator */}
          {password && (
            <div className="space-y-1">
              <div className="flex justify-between items-center text-[10px] text-muted">
                <span>Password Strength</span>
                <span className="font-semibold text-green-700">
                  {strength <= 25 ? 'Weak' : strength <= 50 ? 'Fair' : strength <= 75 ? 'Good' : 'Strong'}
                </span>
              </div>
              <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                <div
                  className={`h-full transition-all duration-300 ${
                    strength <= 25
                      ? 'w-1/4 bg-red-500'
                      : strength <= 50
                      ? 'w-2/4 bg-amber-500'
                      : strength <= 75
                      ? 'w-3/4 bg-green-500'
                      : 'w-full bg-green-600'
                  }`}
                />
              </div>
            </div>
          )}

          {/* ROLE SPECIFIC FIELDS */}

          {/* 1. STUDENT FIELDS */}
          {selectedRole === 'student' && (
            <div className="space-y-3 pt-2">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-textPrimary mb-1.5">
                    Institution / University
                  </label>
                  <div className="relative">
                    <Building2 className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                    <input
                      type="text"
                      value={institution}
                      onChange={(e) => setInstitution(e.target.value)}
                      placeholder="e.g. NIT Surathkal"
                      className="w-full pl-9 pr-3 py-2 text-xs bg-[#f7fcf8] border border-borderGreen rounded-xl focus:border-green-600 focus:bg-white focus:outline-hidden transition-all text-textPrimary"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-textPrimary mb-1.5">
                    Degree & Branch
                  </label>
                  <input
                    type="text"
                    value={branch}
                    onChange={(e) => setBranch(e.target.value)}
                    placeholder="e.g. Computer Science & Engineering"
                    className="w-full px-3 py-2 text-xs bg-[#f7fcf8] border border-borderGreen rounded-xl focus:border-green-600 focus:bg-white focus:outline-hidden transition-all text-textPrimary"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-textPrimary mb-1.5">
                    Target Career Role
                  </label>
                  <div className="relative">
                    <Briefcase className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                    <select
                      value={targetRole}
                      onChange={(e) => setTargetRole(e.target.value)}
                      className="w-full pl-9 pr-3 py-2 text-xs bg-[#f7fcf8] border border-borderGreen rounded-xl focus:border-green-600 focus:bg-white focus:outline-hidden transition-all text-textPrimary"
                    >
                      <option value="Backend Developer">Backend Developer</option>
                      <option value="Full Stack Developer">Full Stack Developer</option>
                      <option value="AI / Machine Learning Engineer">AI/ML Engineer</option>
                      <option value="Data Scientist">Data Scientist</option>
                      <option value="Cloud & DevOps Engineer">Cloud & DevOps</option>
                      <option value="Frontend Developer">Frontend Developer</option>
                      <option value="Mobile App Developer">Mobile Developer</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-textPrimary mb-1.5">
                    Graduation Year
                  </label>
                  <div className="relative">
                    <Calendar className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                    <input
                      type="number"
                      value={graduationYear}
                      onChange={(e) => setGraduationYear(e.target.value)}
                      placeholder="2026"
                      min="2020"
                      max="2030"
                      className="w-full pl-9 pr-3 py-2 text-xs bg-[#f7fcf8] border border-borderGreen rounded-xl focus:border-green-600 focus:bg-white focus:outline-hidden transition-all text-textPrimary"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* 2. FACULTY FIELDS */}
          {selectedRole === 'faculty' && (
            <div className="space-y-3 pt-2">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-textPrimary mb-1.5">
                    Institution / University
                  </label>
                  <div className="relative">
                    <Building2 className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                    <input
                      type="text"
                      value={institution}
                      onChange={(e) => setInstitution(e.target.value)}
                      placeholder="e.g. IIT Delhi / NIT"
                      className="w-full pl-9 pr-3 py-2 text-xs bg-[#f7fcf8] border border-borderGreen rounded-xl focus:border-green-600 focus:bg-white focus:outline-hidden transition-all text-textPrimary"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-textPrimary mb-1.5">
                    Department
                  </label>
                  <input
                    type="text"
                    value={department}
                    onChange={(e) => setDepartment(e.target.value)}
                    placeholder="e.g. Computer Science & Engineering"
                    className="w-full px-3 py-2 text-xs bg-[#f7fcf8] border border-borderGreen rounded-xl focus:border-green-600 focus:bg-white focus:outline-hidden transition-all text-textPrimary"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-textPrimary mb-1.5">
                    Designation
                  </label>
                  <select
                    value={designation}
                    onChange={(e) => setDesignation(e.target.value)}
                    className="w-full px-3 py-2 text-xs bg-[#f7fcf8] border border-borderGreen rounded-xl focus:border-green-600 focus:bg-white focus:outline-hidden transition-all text-textPrimary"
                  >
                    <option value="Professor">Professor</option>
                    <option value="Associate Professor">Associate Professor</option>
                    <option value="Assistant Professor">Assistant Professor</option>
                    <option value="Head of Department">Head of Department (HOD)</option>
                    <option value="Lecturer / Research Scholar">Lecturer / Research Scholar</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-textPrimary mb-1.5">
                    Teaching / Research Experience (Years)
                  </label>
                  <input
                    type="number"
                    value={yearsOfExperience}
                    onChange={(e) => setYearsOfExperience(e.target.value)}
                    placeholder="e.g. 6"
                    className="w-full px-3 py-2 text-xs bg-[#f7fcf8] border border-borderGreen rounded-xl focus:border-green-600 focus:bg-white focus:outline-hidden transition-all text-textPrimary"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-textPrimary mb-1.5">
                  Areas of Expertise / Research (Comma separated)
                </label>
                <input
                  type="text"
                  value={areasOfExpertise}
                  onChange={(e) => setAreasOfExpertise(e.target.value)}
                  placeholder="e.g. Cloud Computing, Distributed Systems, Algorithms"
                  className="w-full px-3 py-2 text-xs bg-[#f7fcf8] border border-borderGreen rounded-xl focus:border-green-600 focus:bg-white focus:outline-hidden transition-all text-textPrimary"
                />
              </div>
            </div>
          )}

          {/* 3. INDUSTRY FIELDS */}
          {selectedRole === 'industry' && (
            <div className="space-y-3 pt-2">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-textPrimary mb-1.5">
                    Company / Organization Name <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <Building2 className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                    <input
                      type="text"
                      required
                      value={companyName}
                      onChange={(e) => setCompanyName(e.target.value)}
                      placeholder="e.g. NexaTech Cloud Labs"
                      className="w-full pl-9 pr-3 py-2 text-xs bg-[#f7fcf8] border border-borderGreen rounded-xl focus:border-green-600 focus:bg-white focus:outline-hidden transition-all text-textPrimary"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-textPrimary mb-1.5">
                    Industry Sector
                  </label>
                  <select
                    value={industrySector}
                    onChange={(e) => setIndustrySector(e.target.value)}
                    className="w-full px-3 py-2 text-xs bg-[#f7fcf8] border border-borderGreen rounded-xl focus:border-green-600 focus:bg-white focus:outline-hidden transition-all text-textPrimary"
                  >
                    <option value="Software & Cloud Services">Software & Cloud Services</option>
                    <option value="FinTech & Banking">FinTech & Banking</option>
                    <option value="Healthcare & BioTech">Healthcare & BioTech</option>
                    <option value="AI & Data Analytics">AI & Data Analytics</option>
                    <option value="Manufacturing & IoT">Manufacturing & IoT</option>
                    <option value="Consulting & Enterprise">Consulting & Enterprise</option>
                    <option value="E-commerce & Retail">E-commerce & Retail</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-textPrimary mb-1.5">
                    Company Size
                  </label>
                  <select
                    value={companySize}
                    onChange={(e) => setCompanySize(e.target.value)}
                    className="w-full px-3 py-2 text-xs bg-[#f7fcf8] border border-borderGreen rounded-xl focus:border-green-600 focus:bg-white focus:outline-hidden transition-all text-textPrimary"
                  >
                    <option value="1-10">1-10 Employees (Seed Startup)</option>
                    <option value="11-50">11-50 Employees (Early Stage)</option>
                    <option value="51-200">51-200 Employees (Growth Scaleup)</option>
                    <option value="201-1000">201-1,000 Employees (Mid-Enterprise)</option>
                    <option value="1000+">1,000+ Employees (Global Enterprise)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-textPrimary mb-1.5">
                    Company Website / Domain
                  </label>
                  <div className="relative">
                    <Globe className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                    <input
                      type="text"
                      value={website}
                      onChange={(e) => setWebsite(e.target.value)}
                      placeholder="https://nexatech.cloud"
                      className="w-full pl-9 pr-3 py-2 text-xs bg-[#f7fcf8] border border-borderGreen rounded-xl focus:border-green-600 focus:bg-white focus:outline-hidden transition-all text-textPrimary"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* 4. INSTITUTION FIELDS */}
          {selectedRole === 'institution' && (
            <div className="space-y-3 pt-2">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-textPrimary mb-1.5">
                    Institution / College Name <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <Building2 className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                    <input
                      type="text"
                      required
                      value={institutionName}
                      onChange={(e) => setInstitutionName(e.target.value)}
                      placeholder="e.g. National Institute of Technology"
                      className="w-full pl-9 pr-3 py-2 text-xs bg-[#f7fcf8] border border-borderGreen rounded-xl focus:border-green-600 focus:bg-white focus:outline-hidden transition-all text-textPrimary"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-textPrimary mb-1.5">
                    Institution Classification
                  </label>
                  <select
                    value={institutionType}
                    onChange={(e) => setInstitutionType(e.target.value)}
                    className="w-full px-3 py-2 text-xs bg-[#f7fcf8] border border-borderGreen rounded-xl focus:border-green-600 focus:bg-white focus:outline-hidden transition-all text-textPrimary"
                  >
                    <option value="Autonomous Technical College">Autonomous Technical College</option>
                    <option value="Institute of National Importance">Institute of National Importance (IIT/NIT)</option>
                    <option value="Central University">Central University</option>
                    <option value="State Technical University">State Technical University</option>
                    <option value="Deemed-to-be-University">Deemed-to-be-University</option>
                    <option value="Private University">Private University</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-textPrimary mb-1.5">
                    Accreditation & Affiliation
                  </label>
                  <input
                    type="text"
                    value={universityAffiliation}
                    onChange={(e) => setUniversityAffiliation(e.target.value)}
                    placeholder="e.g. NAAC A++ / NBA Accredited / AICTE"
                    className="w-full px-3 py-2 text-xs bg-[#f7fcf8] border border-borderGreen rounded-xl focus:border-green-600 focus:bg-white focus:outline-hidden transition-all text-textPrimary"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-textPrimary mb-1.5">
                    Administrator Designation
                  </label>
                  <input
                    type="text"
                    value={adminDesignation}
                    onChange={(e) => setAdminDesignation(e.target.value)}
                    placeholder="e.g. Dean of Academics / TPO Head"
                    className="w-full px-3 py-2 text-xs bg-[#f7fcf8] border border-borderGreen rounded-xl focus:border-green-600 focus:bg-white focus:outline-hidden transition-all text-textPrimary"
                  />
                </div>
              </div>
            </div>
          )}

          <p className="text-[11px] text-muted pt-1">
            By registering, you agree to SkillBridge AI data privacy terms. All role data, resumes, assessments, and corporate communications are isolated securely per account.
          </p>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-2.5 px-4 bg-green-600 hover:bg-green-700 text-white font-bold text-xs rounded-xl shadow-xs hover:shadow-md transition-all flex items-center justify-center gap-2 disabled:opacity-50"
          >
            {loading ? (
              <span>Creating Account...</span>
            ) : (
              <>
                <span>Complete Registration ({roleConfigs.find((r) => r.id === selectedRole)?.title.split(' ')[0]})</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </form>

        {/* Footer Link */}
        <div className="mt-6 pt-4 border-t border-borderGreen text-center text-xs text-muted">
          Already have an account?{' '}
          <Link href="/login" className="font-bold text-green-700 hover:underline">
            Log in
          </Link>
        </div>
      </div>
    </main>
  );
}

export default function RegisterPage() {
  return (
    <div className="min-h-screen bg-[#f7fcf8] text-textPrimary flex flex-col">
      <Navbar />
      <Suspense fallback={<div className="flex-1 flex items-center justify-center p-8 text-xs text-muted">Loading registration portal...</div>}>
        <RegisterForm />
      </Suspense>
    </div>
  );
}
