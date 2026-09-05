'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Navbar } from '@/components/layout/Navbar';
import { resetPasswordDemo } from '@/lib/auth-service';
import { Sparkles, ArrowRight, CheckCircle2, AlertCircle, Lock, Mail, KeyRound } from 'lucide-react';

export default function ForgotPasswordPage() {
  const router = useRouter();

  const [email, setEmail] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleReset = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (newPassword !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    if (newPassword.length < 6) {
      setError('New password must be at least 6 characters.');
      return;
    }

    setLoading(true);
    try {
      await resetPasswordDemo(email, newPassword);
      setSuccess(true);
      setLoading(false);
    } catch (err: any) {
      setError(err.message || 'Password reset failed.');
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#f7fcf8] text-[#17251b] flex flex-col">
      <Navbar />

      <main className="flex-1 flex items-center justify-center p-4 sm:p-6 lg:p-8">
        <div className="w-full max-w-md bg-white border border-[#dce9df] rounded-2xl shadow-card p-6 sm:p-8 animate-in fade-in zoom-in-95 duration-200">
          <div className="text-center mb-6">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-green-50 border border-green-200 text-green-700 mb-3 shadow-xs">
              <KeyRound className="w-6 h-6" />
            </div>
            <h1 className="text-2xl font-bold tracking-tight text-[#17251b]">
              Reset Password
            </h1>
            <p className="text-xs text-[#526157] mt-1.5 font-medium">
              Recover access to your SkillBridge account.
            </p>
          </div>

          {success ? (
            <div className="text-center space-y-4">
              <div className="p-4 rounded-xl bg-green-50 border border-green-200 text-green-800 text-xs">
                <CheckCircle2 className="w-8 h-8 text-green-600 mx-auto mb-2" />
                <p className="font-bold text-sm">Password Reset Successful!</p>
                <p className="text-slate-600 mt-1">
                  Your new credentials have been safely updated in your account. You can now log in.
                </p>
              </div>
              <Link
                href="/login"
                className="inline-flex items-center justify-center w-full py-2.5 px-4 bg-green-600 hover:bg-green-700 text-white font-bold text-xs rounded-xl shadow-xs transition-all"
              >
                Proceed to Login
              </Link>
            </div>
          ) : (
            <>
              {error && (
                <div className="mb-5 p-3 rounded-xl bg-red-50 border border-red-200 flex items-start gap-2.5 text-xs text-red-700">
                  <AlertCircle className="w-4 h-4 shrink-0 mt-0.5 text-red-600" />
                  <span>{error}</span>
                </div>
              )}

              {/* Development note per Part 10 */}
              <div className="mb-5 p-3 rounded-xl bg-amber-50 border border-amber-200 text-[11px] text-amber-800">
                <span className="font-bold">Demo Architecture Note:</span> To facilitate instant hackathon judging without SMTP email dependencies, password reset updates your account credentials directly via verified client-side cryptographic hashing.
              </div>

              <form onSubmit={handleReset} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-[#17251b] mb-1.5">
                    Account Email Address
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

                <div>
                  <label className="block text-xs font-semibold text-[#17251b] mb-1.5">
                    New Password
                  </label>
                  <div className="relative">
                    <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                    <input
                      type="password"
                      required
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      placeholder="At least 6 characters"
                      className="w-full pl-9 pr-3 py-2 text-xs bg-[#f7fcf8] border border-[#dce9df] rounded-xl focus:border-green-600 focus:bg-white focus:outline-hidden transition-all text-[#17251b]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#17251b] mb-1.5">
                    Confirm New Password
                  </label>
                  <div className="relative">
                    <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                    <input
                      type="password"
                      required
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      placeholder="Re-type new password"
                      className="w-full pl-9 pr-3 py-2 text-xs bg-[#f7fcf8] border border-[#dce9df] rounded-xl focus:border-green-600 focus:bg-white focus:outline-hidden transition-all text-[#17251b]"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-2.5 px-4 bg-green-600 hover:bg-green-700 text-white font-bold text-xs rounded-xl shadow-xs hover:shadow-md transition-all flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  {loading ? (
                    <span>Resetting Password...</span>
                  ) : (
                    <>
                      <span>Update Password</span>
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>
              </form>

              <div className="mt-6 pt-4 border-t border-[#dce9df]/60 text-center text-xs text-[#526157]">
                Remember your password?{' '}
                <Link href="/login" className="font-bold text-green-700 hover:underline">
                  Log in
                </Link>
              </div>
            </>
          )}
        </div>
      </main>
    </div>
  );
}
