'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useApp } from '@/context/AppContext';
import { Navbar } from '@/components/layout/Navbar';
import { Sparkles, Shield, ArrowRight, AlertCircle, Lock, Mail, User, Building, Briefcase } from 'lucide-react';

export default function RegisterPage() {
  const router = useRouter();
  const { register } = useApp();

  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [targetRole, setTargetRole] = useState('Backend Developer');
  const [institution, setInstitution] = useState('');
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
      await register({
        fullName,
        email,
        password,
        confirmPassword,
        targetRole,
        institution,
      });
      router.push('/dashboard');
    } catch (err: any) {
      setError(err.message || 'Registration failed. Please try again.');
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#f7fcf8] text-[#17251b] flex flex-col">
      <Navbar />

      <main className="flex-1 flex items-center justify-center p-4 sm:p-6 lg:p-8">
        <div className="w-full max-w-md bg-white border border-[#dce9df] rounded-2xl shadow-card p-6 sm:p-8 animate-in fade-in zoom-in-95 duration-200">
          {/* Header */}
          <div className="text-center mb-6">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-green-50 border border-green-200 text-green-700 mb-3 shadow-xs">
              <Sparkles className="w-6 h-6" />
            </div>
            <h1 className="text-2xl font-bold tracking-tight text-[#17251b]">
              Create your SkillBridge account
            </h1>
            <p className="text-xs text-[#526157] mt-1.5 font-medium">
              Build your personalized career intelligence profile.
            </p>
          </div>

          {/* Error Banner */}
          {error && (
            <div className="mb-5 p-3 rounded-xl bg-red-50 border border-red-200 flex items-start gap-2.5 text-xs text-red-700 animate-in fade-in">
              <AlertCircle className="w-4 h-4 shrink-0 mt-0.5 text-red-600" />
              <span>{error}</span>
            </div>
          )}

          {/* Registration Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-[#17251b] mb-1.5">
                Full Name <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <User className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                <input
                  type="text"
                  required
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="e.g. Priya Sharma"
                  className="w-full pl-9 pr-3 py-2 text-xs bg-[#f7fcf8] border border-[#dce9df] rounded-xl focus:border-green-600 focus:bg-white focus:outline-hidden transition-all text-[#17251b]"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#17251b] mb-1.5">
                Email Address <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="student@university.edu"
                  className="w-full pl-9 pr-3 py-2 text-xs bg-[#f7fcf8] border border-[#dce9df] rounded-xl focus:border-green-600 focus:bg-white focus:outline-hidden transition-all text-[#17251b]"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-[#17251b] mb-1.5">
                  Password <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                  <input
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Min 6 chars"
                    className="w-full pl-9 pr-3 py-2 text-xs bg-[#f7fcf8] border border-[#dce9df] rounded-xl focus:border-green-600 focus:bg-white focus:outline-hidden transition-all text-[#17251b]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#17251b] mb-1.5">
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
                    className="w-full pl-9 pr-3 py-2 text-xs bg-[#f7fcf8] border border-[#dce9df] rounded-xl focus:border-green-600 focus:bg-white focus:outline-hidden transition-all text-[#17251b]"
                  />
                </div>
              </div>
            </div>

            {/* Password Strength Indicator */}
            {password && (
              <div className="space-y-1">
                <div className="flex justify-between items-center text-[10px] text-[#526157]">
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

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
              <div>
                <label className="block text-xs font-semibold text-[#17251b] mb-1.5">
                  Target Role <span className="text-slate-400 font-normal">(Optional)</span>
                </label>
                <div className="relative">
                  <Briefcase className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                  <select
                    value={targetRole}
                    onChange={(e) => setTargetRole(e.target.value)}
                    className="w-full pl-9 pr-3 py-2 text-xs bg-[#f7fcf8] border border-[#dce9df] rounded-xl focus:border-green-600 focus:bg-white focus:outline-hidden transition-all text-[#17251b]"
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
                <label className="block text-xs font-semibold text-[#17251b] mb-1.5">
                  Institution / College <span className="text-slate-400 font-normal">(Optional)</span>
                </label>
                <div className="relative">
                  <Building className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                  <input
                    type="text"
                    value={institution}
                    onChange={(e) => setInstitution(e.target.value)}
                    placeholder="e.g. NIT Surathkal"
                    className="w-full pl-9 pr-3 py-2 text-xs bg-[#f7fcf8] border border-[#dce9df] rounded-xl focus:border-green-600 focus:bg-white focus:outline-hidden transition-all text-[#17251b]"
                  />
                </div>
              </div>
            </div>

            <p className="text-[11px] text-[#526157] pt-1">
              By registering, you agree to our career privacy commitment. Your uploaded resumes and intelligence reports remain strictly private to your account.
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
                  <span>Create Account</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          {/* Footer Link */}
          <div className="mt-6 pt-4 border-t border-[#dce9df]/60 text-center text-xs text-[#526157]">
            Already have an account?{' '}
            <Link href="/login" className="font-bold text-green-700 hover:underline">
              Log in
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
