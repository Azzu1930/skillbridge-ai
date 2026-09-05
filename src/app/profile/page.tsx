'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useApp } from '@/context/AppContext';
import { Navbar } from '@/components/layout/Navbar';
import { updateUserProfile, deleteUserAccount, hashPassword } from '@/lib/auth-service';
import {
  User,
  Mail,
  Building,
  Briefcase,
  Calendar,
  FileText,
  Shield,
  Trash2,
  LogOut,
  Save,
  CheckCircle2,
  AlertCircle,
  FolderKanban,
  Award,
} from 'lucide-react';

export default function ProfilePage() {
  const router = useRouter();
  const { currentUser, isAuthenticated, logout, userReports, userResumeProfile } = useApp();

  const [fullName, setFullName] = useState(currentUser?.fullName || '');
  const [targetRole, setTargetRole] = useState(currentUser?.targetRole || 'Backend Developer');
  const [institution, setInstitution] = useState(currentUser?.institution || '');
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  if (!isAuthenticated || !currentUser) {
    return (
      <div className="min-h-screen bg-[#f7fcf8] text-[#17251b] flex flex-col">
        <Navbar />
        <div className="flex-1 flex items-center justify-center p-6 text-center">
          <div className="max-w-md bg-white border border-[#dce9df] rounded-2xl p-8 shadow-card">
            <User className="w-12 h-12 text-slate-400 mx-auto mb-3" />
            <h2 className="text-lg font-bold text-[#17251b]">Sign In Required</h2>
            <p className="text-xs text-[#526157] mt-1 mb-5">
              Please log in to view and manage your private account profile.
            </p>
            <div className="flex justify-center gap-3">
              <Link
                href="/login"
                className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white font-semibold text-xs rounded-xl transition-all"
              >
                Log In
              </Link>
              <Link
                href="/register"
                className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-[#17251b] font-semibold text-xs rounded-xl transition-all"
              >
                Register
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const handleUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    try {
      updateUserProfile(currentUser.id, {
        fullName,
        targetRole,
        institution,
      });
      setMessage({ type: 'success', text: 'Profile updated successfully.' });
      setIsEditing(false);
      setTimeout(() => setMessage(null), 3000);
    } catch (err: any) {
      setMessage({ type: 'error', text: err.message || 'Update failed.' });
    }
  };

  const handleDeleteAccount = () => {
    deleteUserAccount(currentUser.id);
    logout();
    router.push('/');
  };

  return (
    <div className="min-h-screen bg-[#f7fcf8] text-[#17251b] flex flex-col">
      <Navbar />

      <main className="flex-1 max-w-4xl w-full mx-auto p-4 sm:p-6 lg:p-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6 pb-4 border-b border-[#dce9df]">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-green-600 text-white font-extrabold text-lg flex items-center justify-center shadow-xs">
              {currentUser.fullName.charAt(0).toUpperCase()}
            </div>
            <div>
              <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-[#17251b]">
                {currentUser.fullName}
              </h1>
              <p className="text-xs text-[#526157]">
                {currentUser.email} • Member since {new Date(currentUser.createdAt).toLocaleDateString()}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsEditing(!isEditing)}
              className="px-3.5 py-1.5 text-xs font-semibold text-green-700 bg-green-50 border border-green-200 rounded-xl hover:bg-green-100 transition-all"
            >
              {isEditing ? 'Cancel' : 'Edit Profile'}
            </button>
            <button
              onClick={logout}
              className="px-3.5 py-1.5 text-xs font-semibold text-slate-600 bg-white border border-[#dce9df] rounded-xl hover:bg-slate-50 transition-all flex items-center gap-1.5"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Log Out</span>
            </button>
          </div>
        </div>

        {message && (
          <div
            className={`mb-6 p-3 rounded-xl flex items-center gap-2 text-xs ${
              message.type === 'success'
                ? 'bg-green-50 text-green-800 border border-green-200'
                : 'bg-red-50 text-red-800 border border-red-200'
            }`}
          >
            {message.type === 'success' ? (
              <CheckCircle2 className="w-4 h-4 text-green-600" />
            ) : (
              <AlertCircle className="w-4 h-4 text-red-600" />
            )}
            <span>{message.text}</span>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Left Column: Account Details & Edit */}
          <div className="md:col-span-2 space-y-6">
            <div className="bg-white border border-[#dce9df] rounded-2xl p-6 shadow-card">
              <h2 className="text-sm font-bold text-[#17251b] mb-4 flex items-center gap-2">
                <User className="w-4 h-4 text-green-600" />
                <span>Personal & Academic Details</span>
              </h2>

              {isEditing ? (
                <form onSubmit={handleUpdate} className="space-y-4">
                  <div>
                    <label className="block text-xs font-semibold text-[#17251b] mb-1">
                      Full Name
                    </label>
                    <input
                      type="text"
                      required
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      className="w-full px-3 py-2 text-xs bg-[#f7fcf8] border border-[#dce9df] rounded-xl focus:border-green-600 focus:outline-hidden"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-[#17251b] mb-1">
                      Target Career Role
                    </label>
                    <select
                      value={targetRole}
                      onChange={(e) => setTargetRole(e.target.value)}
                      className="w-full px-3 py-2 text-xs bg-[#f7fcf8] border border-[#dce9df] rounded-xl focus:border-green-600 focus:outline-hidden"
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
                  <div>
                    <label className="block text-xs font-semibold text-[#17251b] mb-1">
                      Institution / University
                    </label>
                    <input
                      type="text"
                      value={institution}
                      onChange={(e) => setInstitution(e.target.value)}
                      className="w-full px-3 py-2 text-xs bg-[#f7fcf8] border border-[#dce9df] rounded-xl focus:border-green-600 focus:outline-hidden"
                    />
                  </div>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white font-bold text-xs rounded-xl shadow-xs transition-all flex items-center gap-1.5"
                  >
                    <Save className="w-3.5 h-3.5" />
                    <span>Save Changes</span>
                  </button>
                </form>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                  <div className="p-3 rounded-xl bg-[#f7fcf8] border border-[#dce9df]/60">
                    <p className="text-[11px] text-[#526157] font-medium">Email Address</p>
                    <p className="font-semibold text-[#17251b] mt-0.5">{currentUser.email}</p>
                  </div>
                  <div className="p-3 rounded-xl bg-[#f7fcf8] border border-[#dce9df]/60">
                    <p className="text-[11px] text-[#526157] font-medium">Target Role</p>
                    <p className="font-semibold text-[#17251b] mt-0.5">{currentUser.targetRole || 'Backend Developer'}</p>
                  </div>
                  <div className="p-3 rounded-xl bg-[#f7fcf8] border border-[#dce9df]/60">
                    <p className="text-[11px] text-[#526157] font-medium">Institution</p>
                    <p className="font-semibold text-[#17251b] mt-0.5">{currentUser.institution || 'Engineering Institute'}</p>
                  </div>
                  <div className="p-3 rounded-xl bg-[#f7fcf8] border border-[#dce9df]/60">
                    <p className="text-[11px] text-[#526157] font-medium">Account ID</p>
                    <p className="font-mono text-[10px] text-slate-500 mt-0.5">{currentUser.id}</p>
                  </div>
                </div>
              )}
            </div>

            {/* Privacy & Account Deletion per Part 62 & 63 */}
            <div className="bg-white border border-red-200/60 rounded-2xl p-6 shadow-card">
              <h2 className="text-sm font-bold text-red-700 mb-2 flex items-center gap-2">
                <Shield className="w-4 h-4 text-red-600" />
                <span>Data Isolation & Privacy Guarantee</span>
              </h2>
              <p className="text-xs text-[#526157] leading-relaxed mb-4">
                Your account is protected with client-side cryptographic hashing. Your uploaded resumes, career intelligence reports, and skill assessments are strictly isolated to your user ID and are never exposed to other accounts.
              </p>
              <button
                onClick={() => setShowDeleteModal(true)}
                className="px-3.5 py-1.5 text-xs font-semibold text-red-700 bg-red-50 hover:bg-red-100 border border-red-200 rounded-xl transition-all flex items-center gap-1.5"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>Delete Account & Data</span>
              </button>
            </div>
          </div>

          {/* Right Column: Statistics */}
          <div className="space-y-6">
            <div className="bg-white border border-[#dce9df] rounded-2xl p-6 shadow-card">
              <h2 className="text-sm font-bold text-[#17251b] mb-4">Career Intelligence Stats</h2>
              <div className="space-y-3 text-xs">
                <div className="flex items-center justify-between p-3 rounded-xl bg-green-50/60 border border-green-200/60">
                  <div className="flex items-center gap-2">
                    <FolderKanban className="w-4 h-4 text-green-700" />
                    <span>Total Saved Reports</span>
                  </div>
                  <span className="font-bold text-sm text-green-900">{userReports.length}</span>
                </div>
                <div className="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-200">
                  <div className="flex items-center gap-2">
                    <Award className="w-4 h-4 text-green-700" />
                    <span>Active Readiness</span>
                  </div>
                  <span className="font-bold text-sm text-[#17251b]">
                    {userReports[0]?.readinessScore || userResumeProfile?.readinessScore || '68'}%
                  </span>
                </div>
                <div className="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-200">
                  <div className="flex items-center gap-2">
                    <FileText className="w-4 h-4 text-slate-500" />
                    <span>Latest Resume</span>
                  </div>
                  <span className="text-[11px] font-medium text-slate-600 truncate max-w-[110px]">
                    {userReports[0]?.resumeMeta.fileName || userResumeProfile?.fileName || 'None'}
                  </span>
                </div>
              </div>

              <div className="mt-5 pt-4 border-t border-[#dce9df]/60 flex flex-col gap-2">
                <Link
                  href="/reports"
                  className="w-full py-2 px-3 bg-green-600 hover:bg-green-700 text-white font-bold text-xs rounded-xl text-center shadow-xs transition-all"
                >
                  View My Reports
                </Link>
                <Link
                  href="/resume-analyzer"
                  className="w-full py-2 px-3 bg-slate-50 hover:bg-slate-100 text-[#17251b] font-semibold text-xs rounded-xl text-center border border-slate-200 transition-all"
                >
                  Upload New Resume
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white border border-[#dce9df] rounded-2xl max-w-sm w-full p-6 shadow-2xl animate-in zoom-in-95 duration-150">
            <h3 className="text-base font-bold text-red-700 mb-2">Delete Account Permanently?</h3>
            <p className="text-xs text-[#526157] mb-5">
              This action will permanently purge your user profile, all saved resume records, intelligence reports, and skill evaluations. This action cannot be undone.
            </p>
            <div className="flex items-center justify-end gap-2">
              <button
                onClick={() => setShowDeleteModal(false)}
                className="px-3.5 py-1.5 text-xs font-semibold text-slate-600 bg-slate-100 hover:bg-slate-200 rounded-xl"
              >
                Cancel
              </button>
              <button
                onClick={handleDeleteAccount}
                className="px-3.5 py-1.5 text-xs font-bold text-white bg-red-600 hover:bg-red-700 rounded-xl shadow-xs"
              >
                Confirm Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
