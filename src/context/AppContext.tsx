'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  UserRole,
  StudentProfile,
  JobOpportunity,
  ApplicationItem,
  SimulatorAction,
  RoadmapMilestone,
  CompanyFeedbackRecord,
  TrainingRecommendationItem,
  NotificationItem,
  ResumeAnalysisResult,
  ResumeVersion,
  StudentSkill,
  UserAccount,
  AuthSession,
  CareerReport,
  ActiveInternshipRecord,
  InternshipMilestoneItem,
} from '@/types';
import {
  PRIMARY_STUDENT,
  INITIAL_OPPORTUNITIES,
  INITIAL_APPLICATIONS,
  SIMULATOR_ACTIONS,
  ROADMAP_MILESTONES,
  COMPANY_FEEDBACKS,
  TRAINING_RECOMMENDATIONS,
  INITIAL_NOTIFICATIONS,
  TARGET_ROLE_BENCHMARKS,
  INITIAL_INTERNSHIPS,
} from '@/data/seedData';
import { compareResumeVersions } from '@/lib/resume-parser';
import {
  getCurrentUser,
  getCurrentSession,
  loginUser,
  registerUser,
  logoutUser,
  getScopedStorageKey,
} from '@/lib/auth-service';
import {
  getUserReports,
  saveUserReport,
  deleteUserReport,
  createCareerReportFromAnalysis,
} from '@/lib/report-storage';

function createCleanStudentProfile(user: UserAccount): StudentProfile {
  return {
    id: `std_${user.id}`,
    name: user.fullName,
    tagline: `${user.targetRole || 'Target Role Pending'} • SkillBridge AI Candidate`,
    email: user.email,
    phone: '',
    rollNumber: '2026-USER-01',
    college: user.institution || 'Engineering Institute',
    degree: 'B.Tech / Equivalent',
    department: 'Computer Science & Engineering',
    year: 4,
    cgpa: 8.0,
    targetRole: user.targetRole || 'Backend Developer',
    readinessScore: 0,
    technicalScore: 0,
    softSkillScore: 0,
    projectScore: 0,
    interviewScore: 0,
    skills: [],
    bio: `Candidate profile for ${user.fullName}. Upload your resume to extract skills, compute readiness scores, and discover personalized career opportunities.`,
    github: 'https://github.com/',
    linkedin: 'https://linkedin.com/in/',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    readinessTrend: [{ month: 'Baseline', score: 0 }],
    projects: [],
    certifications: [],
    internships: [],
    achievements: [],
  };
}

interface AppContextType {
  role: UserRole;
  setRole: (role: UserRole) => void;
  student: StudentProfile;
  activeSessionMode: 'demo' | 'user';
  setSessionMode: (mode: 'demo' | 'user') => void;
  userResumeProfile: ResumeAnalysisResult | null;
  resumeVersions: ResumeVersion[];
  handleResumeUpload: (
    analysis: ResumeAnalysisResult,
    originalFile?: {
      fileName: string;
      fileSize: string;
      fileType: 'pdf' | 'docx' | 'txt';
      fileDataUrl?: string;
    }
  ) => CareerReport;
  setUserTargetRole: (role: string) => void;
  opportunities: JobOpportunity[];
  applications: ApplicationItem[];
  simulatorActions: SimulatorAction[];
  roadmap: RoadmapMilestone[];
  companyFeedbacks: CompanyFeedbackRecord[];
  trainingRecommendations: TrainingRecommendationItem[];
  notifications: NotificationItem[];
  isDemoTourOpen: boolean;
  setIsDemoTourOpen: (open: boolean) => void;
  demoTourStep: number;
  setDemoTourStep: (step: number) => void;
  applyToOpportunity: (opportunityId: string) => boolean;
  updateApplicationStatus: (applicationId: string, status: ApplicationItem['status']) => void;
  postOpportunity: (opp: Omit<JobOpportunity, 'id' | 'postedDate'>) => void;
  toggleSimulatorAction: (actionId: string) => void;
  toggleRoadmapMilestone: (week: number) => void;
  addExtractedSkillsToTwin: (skills: string[]) => void;
  updateAssessmentScore: (category: string, score: number) => void;
  submitIndustryFeedback: (feedback: Omit<CompanyFeedbackRecord, 'id' | 'date'>) => void;
  deployTrainingIntervention: (recommendationId: string) => void;
  generateNewTrainingPlan: (skill: string, cohort: string) => void;
  markNotificationRead: (id: string) => void;
  resetDemoData: () => void;

  // Phase 4 Authentication & User Reports
  currentUser: UserAccount | null;
  isAuthenticated: boolean;
  authSession: AuthSession | null;
  userReports: CareerReport[];
  lastGeneratedReport: CareerReport | null;
  setLastGeneratedReport: (report: CareerReport | null) => void;
  login: (email: string, password: string) => Promise<UserAccount>;
  register: (params: {
    fullName: string;
    email: string;
    password: string;
    confirmPassword?: string;
    role?: UserRole;
    phone?: string;
    institution?: string;
    degree?: string;
    branch?: string;
    graduationYear?: number;
    targetRole?: string;
    location?: string;
    department?: string;
    designation?: string;
    yearsOfExperience?: number;
    areasOfExpertise?: string[];
    companyName?: string;
    industrySector?: string;
    companySize?: string;
    website?: string;
    contactPerson?: string;
    institutionName?: string;
    institutionType?: string;
    universityAffiliation?: string;
    administratorName?: string;
  }) => Promise<UserAccount>;
  logout: () => void;
  refreshUserReports: () => void;
  saveCurrentAnalysisAsReport: (originalFile?: {
    fileName: string;
    fileSize: string;
    fileType: 'pdf' | 'docx' | 'txt';
    fileDataUrl?: string;
  }) => CareerReport | null;
  deleteReport: (reportId: string) => boolean;
  submitApplication: (params: {
    opportunityId: string;
    coverLetter?: string;
    availability?: string;
    expectedStartDate?: string;
    resumeFileName?: string;
  }) => boolean;
  completeAssessment: (params: {
    category: string;
    score: number;
    totalQuestions: number;
  }) => void;

  // Phase 5 Internship Workspace & Recruitment Pipeline
  internships: ActiveInternshipRecord[];
  submitInternshipMilestone: (params: {
    internshipId: string;
    milestoneId: string;
    deliverableUrl: string;
    notes?: string;
  }) => boolean;
  approveInternshipMilestone: (params: {
    internshipId: string;
    milestoneId: string;
    feedback: string;
    rating: number;
    approverName?: string;
  }) => boolean;
  advanceCandidatePipeline: (
    applicationId: string,
    newStatus: ApplicationItem['status'],
    interviewDate?: string
  ) => void;
  hireCandidate: (params: {
    candidateId: string;
    candidateName: string;
    candidateEmail: string;
    roleTitle: string;
    company: string;
    stipend?: string;
  }) => ActiveInternshipRecord;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [role, setRoleState] = useState<UserRole>('student');
  const [student, setStudent] = useState<StudentProfile>(PRIMARY_STUDENT);
  const [activeSessionMode, setActiveSessionMode] = useState<'demo' | 'user'>('demo');
  const [userResumeProfile, setUserResumeProfile] = useState<ResumeAnalysisResult | null>(null);
  const [resumeVersions, setResumeVersions] = useState<ResumeVersion[]>([]);
  const [opportunities, setOpportunities] = useState<JobOpportunity[]>(INITIAL_OPPORTUNITIES);
  const [applications, setApplications] = useState<ApplicationItem[]>(INITIAL_APPLICATIONS);
  const [simulatorActions, setSimulatorActions] = useState<SimulatorAction[]>(SIMULATOR_ACTIONS);
  const [roadmap, setRoadmap] = useState<RoadmapMilestone[]>(ROADMAP_MILESTONES);
  const [companyFeedbacks, setCompanyFeedbacks] = useState<CompanyFeedbackRecord[]>(COMPANY_FEEDBACKS);
  const [trainingRecommendations, setTrainingRecommendations] = useState<TrainingRecommendationItem[]>(TRAINING_RECOMMENDATIONS);
  const [notifications, setNotifications] = useState<NotificationItem[]>(INITIAL_NOTIFICATIONS);
  const [isDemoTourOpen, setIsDemoTourOpen] = useState(false);
  const [demoTourStep, setDemoTourStep] = useState(0);

  // Phase 4: User Authentication & Persistent Reports State
  const [currentUser, setCurrentUser] = useState<UserAccount | null>(null);
  const [authSession, setAuthSession] = useState<AuthSession | null>(null);
  const [userReports, setUserReports] = useState<CareerReport[]>([]);
  const [lastGeneratedReport, setLastGeneratedReport] = useState<CareerReport | null>(null);

  // Phase 5: Internship Workspace & Active Placements State
  const [internships, setInternships] = useState<ActiveInternshipRecord[]>(INITIAL_INTERNSHIPS);

  // Load from localStorage on mount (client-side only)
  useEffect(() => {
    try {
      // Purge legacy global keys that cause cross-tenant contamination
      localStorage.removeItem('sb_user_resume');
      localStorage.removeItem('sb_resume_versions');
      localStorage.removeItem('sb_guest_last_report');
      localStorage.removeItem('sb_applications');

      // Check auth session
      const session = getCurrentSession();
      if (session) {
        setAuthSession(session);
        const user = getCurrentUser();
        if (user) {
          setCurrentUser(user);
          setActiveSessionMode('user');
          const reports = getUserReports(user.id);
          setUserReports(reports);
          if (reports.length > 0) {
            setLastGeneratedReport(reports[0]);
          }

          // Load user-scoped resume profile
          const userResumeKey = getScopedStorageKey(user.id, 'resume_profile');
          const savedResume = localStorage.getItem(userResumeKey);
          if (savedResume) {
            const parsed: ResumeAnalysisResult = JSON.parse(savedResume);
            setUserResumeProfile(parsed);
            syncUserResumeToProfile(parsed);
          } else {
            setStudent(createCleanStudentProfile(user));
          }

          // Load user-scoped resume versions
          const userVersionsKey = getScopedStorageKey(user.id, 'resume_versions');
          const savedVersions = localStorage.getItem(userVersionsKey);
          if (savedVersions) {
            setResumeVersions(JSON.parse(savedVersions));
          }

          // Load user-scoped applications
          const userAppsKey = getScopedStorageKey(user.id, 'applications');
          const savedApps = localStorage.getItem(userAppsKey);
          if (savedApps) {
            setApplications(JSON.parse(savedApps));
          } else {
            setApplications([]);
          }

          // Load user-scoped active internships (zero leakage)
          const userInternshipsKey = getScopedStorageKey(user.id, 'internships');
          const savedInternships = localStorage.getItem(userInternshipsKey);
          if (savedInternships) {
            setInternships(JSON.parse(savedInternships));
          } else {
            setInternships([]);
          }
          return;
        }
      }

      // Guest / Demo session defaults
      const savedRole = localStorage.getItem('sb_demo_role') as UserRole;
      if (savedRole && ['student', 'industry', 'faculty', 'admin'].includes(savedRole)) {
        setRoleState(savedRole);
      }
      const savedDemoInternships = localStorage.getItem('sb_demo_internships');
      if (savedDemoInternships) {
        setInternships(JSON.parse(savedDemoInternships));
      } else {
        setInternships(INITIAL_INTERNSHIPS);
      }
      setStudent(PRIMARY_STUDENT);
      setActiveSessionMode('demo');
    } catch {
      // ignore storage errors
    }
  }, []);

  const setRole = (newRole: UserRole) => {
    setRoleState(newRole);
    try {
      localStorage.setItem('sb_demo_role', newRole);
    } catch {
      // ignore
    }
  };

  const setSessionMode = (mode: 'demo' | 'user') => {
    setActiveSessionMode(mode);
    if (mode === 'demo') {
      setStudent(PRIMARY_STUDENT);
    } else if (userResumeProfile) {
      syncUserResumeToProfile(userResumeProfile);
    }
    try {
      localStorage.setItem('sb_session_mode', mode);
    } catch {
      // ignore
    }
  };

  /**
   * Convert User's Extracted Resume into active Student Profile
   */
  const syncUserResumeToProfile = (analysis: ResumeAnalysisResult) => {
    const studentSkills: StudentSkill[] = analysis.technicalSkills.map((ts, idx) => ({
      id: `user_sk_${idx}_${Date.now()}`,
      name: ts.name,
      category: ts.category === 'framework' ? 'technical' : ts.category === 'tool' ? 'tool' : 'technical',
      score: ts.score,
      verified: true,
      verificationStatus: 'Estimated from resume evidence',
      lastUpdated: 'Today',
      evidenceCount: 1,
      evidence: [
        {
          type: 'resume',
          title: `Detected in ${analysis.fileName}`,
          score: ts.score,
          date: analysis.uploadedAt,
          verified: true,
          statusText: 'Estimated from resume evidence',
        },
      ],
      targetScore: 85,
    }));

    const dynamicProfile: StudentProfile = {
      id: `std_user_${Date.now()}`,
      name: analysis.name || 'Candidate Profile',
      tagline: `${analysis.targetRole} • Extracted from ${analysis.fileName}`,
      email: analysis.email || 'candidate@university.edu',
      phone: analysis.phone || '+91 98765 43210',
      rollNumber: '2026-USER-01',
      college: analysis.college || 'Engineering Institute',
      degree: analysis.degree || 'B.Tech / Equivalent',
      department: 'Computer Science & Engineering',
      year: 4,
      cgpa: 8.5,
      targetRole: analysis.targetRole || 'Backend Developer',
      readinessScore: analysis.readinessScore,
      technicalScore: analysis.scoreBreakdown.technicalSkills * 2,
      softSkillScore: 78,
      projectScore: analysis.scoreBreakdown.projects * 6.6,
      interviewScore: 75,
      skills: studentSkills,
      bio: `Automated career intelligence profile constructed from verified resume evidence in ${analysis.fileName}.`,
      github: 'https://github.com/',
      linkedin: 'https://linkedin.com/in/',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
      readinessTrend: [
        { month: 'Baseline', score: analysis.readinessScore - 8 },
        { month: 'Today', score: analysis.readinessScore },
      ],
      projects: analysis.projects.map((p) => ({
        title: p.title,
        description: p.description,
        skills: p.skills,
      })),
      certifications: analysis.certifications.map((c) => ({
        title: c,
        issuer: 'Verified Credential Issuer',
        date: '2025',
        verified: true,
        verificationStatus: 'Estimated from resume evidence',
      })),
      internships: analysis.internships.map((i) => ({
        role: i.role,
        company: i.company,
        duration: i.duration || '4 Months',
        description: 'Hands-on technical contributor',
      })),
      achievements: analysis.achievements,
    };

    setStudent(dynamicProfile);
  };

  /**
   * Handle Genuine Resume Upload with Automatic Complete Report Generation
   */
  const handleResumeUpload = (
    analysis: ResumeAnalysisResult,
    originalFile?: {
      fileName: string;
      fileSize: string;
      fileType: 'pdf' | 'docx' | 'txt';
      fileDataUrl?: string;
    }
  ): CareerReport => {
    setUserResumeProfile(analysis);
    setActiveSessionMode('user');

    // Add to version history
    const newVersionNumber = resumeVersions.length + 1;
    const newVersion: ResumeVersion = {
      version: newVersionNumber,
      analyzedDate: analysis.uploadedAt,
      fileName: analysis.fileName,
      targetRole: analysis.targetRole,
      readinessScore: analysis.readinessScore,
      skillsCount: analysis.technicalSkills.length,
      gapsCount: 4,
      analysis,
    };

    const updatedVersions = [newVersion, ...resumeVersions];
    setResumeVersions(updatedVersions);

    // Sync to active profile
    syncUserResumeToProfile(analysis);

    // AUTOMATIC COMPLETE REPORT GENERATION (Features 1, 2, 3, 4, 13)
    const activeUserId = currentUser ? currentUser.id : 'guest_session';
    const report = createCareerReportFromAnalysis(analysis, activeUserId, originalFile);
    setLastGeneratedReport(report);

    if (currentUser) {
      saveUserReport(currentUser.id, report);
      const updatedReports = getUserReports(currentUser.id);
      setUserReports(updatedReports);
      try {
        localStorage.setItem(getScopedStorageKey(currentUser.id, 'resume_profile'), JSON.stringify(analysis));
        localStorage.setItem(getScopedStorageKey(currentUser.id, 'resume_versions'), JSON.stringify(updatedVersions));
      } catch {
        // ignore
      }
    } else {
      try {
        localStorage.setItem('sb_guest_resume_profile', JSON.stringify(analysis));
        localStorage.setItem('sb_guest_resume_versions', JSON.stringify(updatedVersions));
        localStorage.setItem('sb_guest_last_report', JSON.stringify(report));
      } catch {
        // ignore
      }
    }

    // Add confirmation notification
    const newNotif: NotificationItem = {
      id: `notif_upload_${Date.now()}`,
      title: 'Career Intelligence Report Ready',
      message: `Welcome, ${analysis.name}! Extracted ${analysis.technicalSkills.length} competencies. Career Readiness calculated at ${analysis.readinessScore}%. Your DOCX and JSON reports have been generated automatically.`,
      time: 'Just now',
      type: 'success',
      read: false,
      link: '/reports',
    };
    setNotifications((prev) => [newNotif, ...prev]);

    return report;
  };

  /**
   * Phase 4 & 5: Authentication Actions with Strict Multi-Tenant Isolation
   */
  const login = async (email: string, password: string): Promise<UserAccount> => {
    const result = await loginUser(email, password);
    setCurrentUser(result.user);
    setAuthSession(result.session);
    setActiveSessionMode('user');
    setRoleState(result.user.role || 'student');

    // Load user's private reports
    const userReps = getUserReports(result.user.id);
    setUserReports(userReps);
    setLastGeneratedReport(userReps.length > 0 ? userReps[0] : null);

    // Load user-scoped profile
    try {
      const profKey = getScopedStorageKey(result.user.id, 'resume_profile');
      const savedProf = localStorage.getItem(profKey);
      if (savedProf) {
        const parsed: ResumeAnalysisResult = JSON.parse(savedProf);
        setUserResumeProfile(parsed);
        syncUserResumeToProfile(parsed);
      } else {
        setUserResumeProfile(null);
        setStudent(createCleanStudentProfile(result.user));
      }

      const versKey = getScopedStorageKey(result.user.id, 'resume_versions');
      const savedVers = localStorage.getItem(versKey);
      setResumeVersions(savedVers ? JSON.parse(savedVers) : []);

      const appsKey = getScopedStorageKey(result.user.id, 'applications');
      const savedApps = localStorage.getItem(appsKey);
      setApplications(savedApps ? JSON.parse(savedApps) : []);

      const intKey = getScopedStorageKey(result.user.id, 'internships');
      const savedInts = localStorage.getItem(intKey);
      setInternships(savedInts ? JSON.parse(savedInts) : []);
    } catch {
      // ignore
    }

    return result.user;
  };

  const register = async (params: {
    fullName: string;
    email: string;
    password: string;
    confirmPassword?: string;
    role?: UserRole;
    phone?: string;
    institution?: string;
    degree?: string;
    branch?: string;
    graduationYear?: number;
    targetRole?: string;
    location?: string;
    department?: string;
    designation?: string;
    yearsOfExperience?: number;
    areasOfExpertise?: string[];
    companyName?: string;
    industrySector?: string;
    companySize?: string;
    website?: string;
    contactPerson?: string;
    institutionName?: string;
    institutionType?: string;
    universityAffiliation?: string;
    administratorName?: string;
  }): Promise<UserAccount> => {
    const result = await registerUser(params);
    setCurrentUser(result.user);
    setAuthSession(result.session);
    setActiveSessionMode('user');
    setRoleState(result.user.role || 'student');
    setUserReports([]);
    setLastGeneratedReport(null);
    setUserResumeProfile(null);
    setResumeVersions([]);
    setApplications([]);
    setInternships([]);
    setStudent(createCleanStudentProfile(result.user));
    return result.user;
  };

  const logout = () => {
    logoutUser();
    setCurrentUser(null);
    setAuthSession(null);
    setUserReports([]);
    setLastGeneratedReport(null);
    setUserResumeProfile(null);
    setResumeVersions([]);
    setApplications(INITIAL_APPLICATIONS);
    const savedDemoInternships = localStorage.getItem('sb_demo_internships');
    setInternships(savedDemoInternships ? JSON.parse(savedDemoInternships) : INITIAL_INTERNSHIPS);
    setActiveSessionMode('demo');
    setRoleState('student');
    setStudent(PRIMARY_STUDENT);
  };

  const submitApplication = (params: {
    opportunityId: string;
    coverLetter?: string;
    availability?: string;
    expectedStartDate?: string;
    resumeFileName?: string;
  }): boolean => {
    const targetOpp = opportunities.find((o) => o.id === params.opportunityId);
    if (!targetOpp) return false;

    const newApp: ApplicationItem = {
      id: `app_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`,
      opportunityId: targetOpp.id,
      company: targetOpp.company,
      opportunityTitle: targetOpp.title,
      appliedDate: new Date().toISOString().split('T')[0],
      status: 'Applied',
      matchScore: targetOpp.minReadiness || 85,
      notes: params.coverLetter || 'Submitted via SkillBridge AI verified application portal.',
    };

    const updated = [newApp, ...applications.filter((a) => a.opportunityId !== params.opportunityId)];
    setApplications(updated);

    if (currentUser) {
      const userAppsKey = getScopedStorageKey(currentUser.id, 'applications');
      try {
        localStorage.setItem(userAppsKey, JSON.stringify(updated));
      } catch {
        // ignore
      }
    }

    const newNotif: NotificationItem = {
      id: `notif_${Date.now()}`,
      title: 'Application Submitted',
      message: `Your application for ${targetOpp.title} at ${targetOpp.company} has been submitted.`,
      time: 'Just now',
      read: false,
      type: 'success',
      link: '/student/applications',
    };
    setNotifications((prev) => [newNotif, ...prev]);

    return true;
  };

  const completeAssessment = (params: {
    category: string;
    score: number;
    totalQuestions: number;
  }) => {
    const percentage = Math.round((params.score / params.totalQuestions) * 100);
    setStudent((prev) => {
      const existingSkillIndex = prev.skills.findIndex(
        (s) => s.name.toLowerCase() === params.category.toLowerCase()
      );
      let updatedSkills = [...prev.skills];
      if (existingSkillIndex >= 0) {
        updatedSkills[existingSkillIndex] = {
          ...updatedSkills[existingSkillIndex],
          score: Math.max(updatedSkills[existingSkillIndex].score, percentage),
          verified: percentage >= 70,
          verificationStatus: percentage >= 70 ? 'Assessment Verified' : 'Pending Verification',
          lastUpdated: 'Today',
        };
      } else {
        updatedSkills.push({
          id: `sk_ass_${Date.now()}`,
          name: params.category,
          category: 'technical',
          score: percentage,
          verified: percentage >= 70,
          verificationStatus: percentage >= 70 ? 'Assessment Verified' : 'Pending Verification',
          lastUpdated: 'Today',
          evidenceCount: 1,
          evidence: [
            {
              type: 'assessment',
              title: `${params.category} Skill Verification Quiz`,
              score: percentage,
              date: 'Today',
              verified: percentage >= 70,
              statusText: percentage >= 70 ? 'Assessment Verified' : 'Pending Verification',
            },
          ],
        });
      }
      return {
        ...prev,
        skills: updatedSkills,
        readinessScore: Math.min(100, Math.round(prev.readinessScore + (percentage >= 70 ? 4 : 1))),
      };
    });

    const notif: NotificationItem = {
      id: `notif_ass_${Date.now()}`,
      title: 'Assessment Completed',
      message: `Completed ${params.category} assessment with ${percentage}% score. Skill Twin verified!`,
      time: 'Just now',
      type: 'success',
      read: false,
      link: '/student/skill-twin',
    };
    setNotifications((prev) => [notif, ...prev]);
  };

  const refreshUserReports = () => {
    if (currentUser) {
      const reports = getUserReports(currentUser.id);
      setUserReports(reports);
    }
  };

  const saveCurrentAnalysisAsReport = (originalFile?: {
    fileName: string;
    fileSize: string;
    fileType: 'pdf' | 'docx' | 'txt';
    fileDataUrl?: string;
  }): CareerReport | null => {
    if (!userResumeProfile) return null;
    const activeUserId = currentUser ? currentUser.id : 'guest_session';
    const report = createCareerReportFromAnalysis(userResumeProfile, activeUserId, originalFile);
    setLastGeneratedReport(report);

    if (currentUser) {
      saveUserReport(currentUser.id, report);
      setUserReports(getUserReports(currentUser.id));
    }
    return report;
  };

  const deleteReport = (reportId: string): boolean => {
    if (!currentUser) return false;
    const success = deleteUserReport(currentUser.id, reportId);
    if (success) {
      refreshUserReports();
      if (lastGeneratedReport?.id === reportId) {
        setLastGeneratedReport(null);
      }
    }
    return success;
  };

  /**
   * Set User Target Role
   */
  const setUserTargetRole = (newRole: string) => {
    if (userResumeProfile) {
      const updated = { ...userResumeProfile, targetRole: newRole };
      setUserResumeProfile(updated);
      setStudent((prev) => ({ ...prev, targetRole: newRole }));
      if (currentUser) {
        try {
          localStorage.setItem(getScopedStorageKey(currentUser.id, 'resume_profile'), JSON.stringify(updated));
        } catch {
          // ignore
        }
      }
    } else {
      setStudent((prev) => ({ ...prev, targetRole: newRole }));
    }
  };

  const applyToOpportunity = (opportunityId: string): boolean => {
    const opp = opportunities.find((o) => o.id === opportunityId);
    if (!opp) return false;

    if (applications.some((a) => a.opportunityId === opportunityId)) {
      return false; // already applied
    }

    const newApp: ApplicationItem = {
      id: `app_${Date.now()}`,
      opportunityId: opp.id,
      opportunityTitle: opp.title,
      company: opp.company,
      appliedDate: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      status: 'Applied',
      matchScore: opp.id === 'opp_1' ? 91 : opp.id === 'opp_2' ? 84 : 78,
      notes: 'Application submitted with live AI Skill Twin credentials.',
    };

    const updated = [newApp, ...applications];
    setApplications(updated);

    const newNotif: NotificationItem = {
      id: `notif_${Date.now()}`,
      title: 'Application Submitted',
      message: `Successfully applied for ${opp.title} at ${opp.company}.`,
      time: 'Just now',
      type: 'success',
      read: false,
      link: '/student/applications',
    };
    setNotifications((prev) => [newNotif, ...prev]);

    if (currentUser) {
      try {
        localStorage.setItem(getScopedStorageKey(currentUser.id, 'applications'), JSON.stringify(updated));
      } catch {
        // ignore
      }
    }

    return true;
  };

  const updateApplicationStatus = (applicationId: string, status: ApplicationItem['status']) => {
    setApplications((prev) => {
      const updated = prev.map((app) => (app.id === applicationId ? { ...app, status } : app));
      if (currentUser) {
        try {
          localStorage.setItem(getScopedStorageKey(currentUser.id, 'applications'), JSON.stringify(updated));
        } catch {
          // ignore
        }
      }
      return updated;
    });

    const targetApp = applications.find((a) => a.id === applicationId);
    if (targetApp) {
      const statusNotif: NotificationItem = {
        id: `notif_status_${Date.now()}`,
        title: `Application Status: ${status}`,
        message: `${targetApp.company} updated your application for ${targetApp.opportunityTitle} to "${status}".`,
        time: 'Just now',
        type: status === 'Rejected' ? 'warning' : 'success',
        read: false,
        link: '/student/applications',
      };
      setNotifications((prev) => [statusNotif, ...prev]);
    }
  };

  const postOpportunity = (oppData: Omit<JobOpportunity, 'id' | 'postedDate'>) => {
    const newOpp: JobOpportunity = {
      ...oppData,
      id: `opp_${Date.now()}`,
      postedDate: new Date().toISOString().split('T')[0],
    };

    setOpportunities((prev) => [newOpp, ...prev]);

    const notif: NotificationItem = {
      id: `notif_${Date.now()}`,
      title: 'New Opportunity Published',
      message: `${oppData.company} posted a new position: ${oppData.title}.`,
      time: 'Just now',
      type: 'info',
      read: false,
      link: '/student/opportunities',
    };
    setNotifications((prev) => [notif, ...prev]);
  };

  const toggleSimulatorAction = (actionId: string) => {
    setSimulatorActions((prev) =>
      prev.map((action) =>
        action.id === actionId ? { ...action, completed: !action.completed } : action
      )
    );
  };

  const toggleRoadmapMilestone = (week: number) => {
    setRoadmap((prev) =>
      prev.map((m) => (m.week === week ? { ...m, completed: !m.completed } : m))
    );

    const targetMilestone = roadmap.find((m) => m.week === week);
    if (targetMilestone) {
      const willBeCompleted = !targetMilestone.completed;
      if (willBeCompleted) {
        setStudent((prev) => {
          const updatedSkills = prev.skills.map((s) => {
            if (targetMilestone.skillsImpacted.some((imp) => imp.toLowerCase() === s.name.toLowerCase())) {
              return {
                ...s,
                score: Math.min(100, s.score + 15),
                verified: true,
                verificationStatus: 'Evidence Submitted' as const,
                lastUpdated: 'Just now',
                evidenceCount: s.evidenceCount + 1,
              };
            }
            return s;
          });

          const newReadiness = Math.min(96, prev.readinessScore + 6);
          return {
            ...prev,
            skills: updatedSkills,
            readinessScore: newReadiness,
          };
        });

        const notif: NotificationItem = {
          id: `notif_mile_${Date.now()}`,
          title: 'Milestone Completed',
          message: `Completed "${targetMilestone.title}". Your AI Skill Twin proficiency updated!`,
          time: 'Just now',
          type: 'success',
          read: false,
          link: '/student/skill-twin',
        };
        setNotifications((prev) => [notif, ...prev]);
      }
    }
  };

  const addExtractedSkillsToTwin = (newSkills: string[]) => {
    setStudent((prev) => {
      const existingNames = new Set(prev.skills.map((s) => s.name.toLowerCase()));
      const skillsToAdd: StudentSkill[] = newSkills
        .filter((s) => !existingNames.has(s.toLowerCase()))
        .map((s, idx) => ({
          id: `skill_new_${idx}_${Date.now()}`,
          name: s,
          category: 'technical' as const,
          score: 75,
          verified: true,
          verificationStatus: 'Evidence Submitted' as const,
          lastUpdated: 'Just now',
          evidenceCount: 1,
          evidence: [
            {
              type: 'resume' as const,
              title: 'AI Resume Extraction',
              score: 75,
              date: new Date().toISOString().split('T')[0],
              verified: true,
              statusText: 'Evidence Submitted' as const,
            },
          ],
        }));

      const updated = [...prev.skills, ...skillsToAdd];
      const newReadiness = Math.min(94, prev.readinessScore + Math.min(6, skillsToAdd.length * 2));

      return {
        ...prev,
        skills: updated,
        readinessScore: newReadiness,
      };
    });

    const notif: NotificationItem = {
      id: `notif_${Date.now()}`,
      title: 'Skills Synchronized',
      message: `Added ${newSkills.length} verified competencies to your AI Skill Twin.`,
      time: 'Just now',
      type: 'success',
      read: false,
      link: '/student/skill-twin',
    };
    setNotifications((prev) => [notif, ...prev]);
  };

  const updateAssessmentScore = (category: string, score: number) => {
    setStudent((prev) => {
      const boost = Math.round((score / 100) * 8);
      const newReadiness = Math.min(96, Math.max(prev.readinessScore, prev.readinessScore + boost));
      const newTech = category === 'technical' ? Math.max(prev.technicalScore, score) : prev.technicalScore;

      return {
        ...prev,
        technicalScore: newTech,
        readinessScore: newReadiness,
      };
    });

    const notif: NotificationItem = {
      id: `notif_${Date.now()}`,
      title: 'Assessment Verified',
      message: `Scored ${score}% in ${category} assessment. Readiness elevated to ${student.readinessScore}%.`,
      time: 'Just now',
      type: 'success',
      read: false,
      link: '/student/skill-twin',
    };
    setNotifications((prev) => [notif, ...prev]);
  };

  const submitIndustryFeedback = (feedbackData: Omit<CompanyFeedbackRecord, 'id' | 'date'>) => {
    const newFeedback: CompanyFeedbackRecord = {
      ...feedbackData,
      id: `fb_${Date.now()}`,
      date: new Date().toISOString().split('T')[0],
    };

    setCompanyFeedbacks((prev) => [newFeedback, ...prev]);

    const notif: NotificationItem = {
      id: `notif_fb_${Date.now()}`,
      title: 'Corporate Feedback Ingested',
      message: `${feedbackData.company} submitted interview feedback. Institutional gap diagnostics updated!`,
      time: 'Just now',
      type: 'info',
      read: false,
      link: '/admin/intelligence',
    };
    setNotifications((prev) => [notif, ...prev]);
  };

  const deployTrainingIntervention = (recommendationId: string) => {
    setTrainingRecommendations((prev) =>
      prev.map((rec) =>
        rec.id === recommendationId ? { ...rec, status: 'Approved' as const } : rec
      )
    );

    const rec = trainingRecommendations.find((r) => r.id === recommendationId);
    if (rec) {
      const notif: NotificationItem = {
        id: `notif_train_${Date.now()}`,
        title: 'Training Intervention Scheduled',
        message: `Approved "${rec.skill}" bootcamp for ${rec.enrolledCount || 124} students. Projected cohort gain: +${rec.projectedReadinessBoost}%.`,
        time: 'Just now',
        type: 'success',
        read: false,
        link: '/admin/training',
      };
      setNotifications((prev) => [notif, ...prev]);
    }
  };

  const generateNewTrainingPlan = (skill: string, cohort: string) => {
    const newPlan: TrainingRecommendationItem = {
      id: `tr_${Date.now()}`,
      priority: 'HIGH',
      skill,
      reason: `Market deficit identified from corporate interview feedback across ${cohort}.`,
      recommendedAction: `Organize 2-week intensive hands-on lab series with corporate partner mentoring.`,
      targetCohorts: [cohort],
      enrolledCount: 140,
      durationWeeks: 2,
      projectedReadinessBoost: 14,
      suggestedFormat: 'Weekend Hands-on Lab',
      industryMentor: 'Corporate Partner Lead',
      status: 'Approved',
    };

    setTrainingRecommendations((prev) => [newPlan, ...prev]);

    const notif: NotificationItem = {
      id: `notif_plan_${Date.now()}`,
      title: 'Curriculum Training Generated',
      message: `Created training program for ${skill}.`,
      time: 'Just now',
      type: 'info',
      read: false,
      link: '/admin/training',
    };
    setNotifications((prev) => [notif, ...prev]);
  };

  const markNotificationRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    );
  };

  const resetDemoData = () => {
    setStudent(PRIMARY_STUDENT);
    setActiveSessionMode('demo');
    setOpportunities(INITIAL_OPPORTUNITIES);
    setApplications(INITIAL_APPLICATIONS);
    setSimulatorActions(SIMULATOR_ACTIONS);
    setRoadmap(ROADMAP_MILESTONES);
    setCompanyFeedbacks(COMPANY_FEEDBACKS);
    setTrainingRecommendations(TRAINING_RECOMMENDATIONS);
    setNotifications(INITIAL_NOTIFICATIONS);
    try {
      localStorage.clear();
    } catch {
      // ignore
    }
  };

  const submitInternshipMilestone = (params: {
    internshipId: string;
    milestoneId: string;
    deliverableUrl: string;
    notes?: string;
  }): boolean => {
    setInternships((prev) => {
      const updated = prev.map((internship) => {
        if (internship.id !== params.internshipId) return internship;
        const updatedMilestones = internship.milestones.map((m) => {
          if (m.id !== params.milestoneId) return m;
          return {
            ...m,
            status: 'Submitted' as const,
            submittedDeliverableUrl: params.deliverableUrl,
            submissionNotes: params.notes || 'Deliverable submitted for review.',
            submissionDate: new Date().toISOString().split('T')[0],
          };
        });
        return { ...internship, milestones: updatedMilestones };
      });

      if (currentUser) {
        try {
          localStorage.setItem(getScopedStorageKey(currentUser.id, 'internships'), JSON.stringify(updated));
        } catch {}
      } else {
        try {
          localStorage.setItem('sb_demo_internships', JSON.stringify(updated));
        } catch {}
      }
      return updated;
    });

    const notif: NotificationItem = {
      id: `notif_ms_sub_${Date.now()}`,
      title: 'Milestone Deliverable Submitted',
      message: `Your deliverable has been queued for faculty & supervisor review.`,
      time: 'Just now',
      type: 'success',
      read: false,
      link: '/student/internship-progress',
    };
    setNotifications((prev) => [notif, ...prev]);
    return true;
  };

  const approveInternshipMilestone = (params: {
    internshipId: string;
    milestoneId: string;
    feedback: string;
    rating: number;
    approverName?: string;
  }): boolean => {
    let approvedSkills: string[] = [];
    let milestoneTitle = '';

    setInternships((prev) => {
      const updated = prev.map((internship) => {
        if (internship.id !== params.internshipId) return internship;
        const updatedMilestones = internship.milestones.map((m) => {
          if (m.id !== params.milestoneId) return m;
          approvedSkills = m.skillsCovered;
          milestoneTitle = m.title;
          return {
            ...m,
            status: 'Approved' as const,
            approvedDate: new Date().toISOString().split('T')[0],
            mentorFeedback: params.feedback,
            mentorRating: params.rating,
            approvedBy:
              params.approverName ||
              (currentUser?.fullName
                ? `${currentUser.fullName} (${currentUser.role})`
                : 'Vikram Seth (Industry Supervisor)'),
          };
        });

        const allApproved = updatedMilestones.every((m) => m.status === 'Approved');
        return {
          ...internship,
          milestones: updatedMilestones,
          status: allApproved ? ('Completed' as const) : internship.status,
          finalGrade: allApproved ? ('A+' as const) : internship.finalGrade,
        };
      });

      if (currentUser) {
        try {
          localStorage.setItem(getScopedStorageKey(currentUser.id, 'internships'), JSON.stringify(updated));
        } catch {}
      } else {
        try {
          localStorage.setItem('sb_demo_internships', JSON.stringify(updated));
        } catch {}
      }
      return updated;
    });

    // Automatically credit Skill Twin with +15 verified score
    if (approvedSkills.length > 0) {
      setStudent((prev) => {
        const updatedSkills = prev.skills.map((s) => {
          if (approvedSkills.some((askill) => askill.toLowerCase() === s.name.toLowerCase())) {
            return {
              ...s,
              score: Math.min(100, s.score + 15),
              verified: true,
              verificationStatus: 'Assessment Verified' as const,
              lastUpdated: 'Today',
              evidenceCount: s.evidenceCount + 1,
            };
          }
          return s;
        });

        return {
          ...prev,
          skills: updatedSkills,
          readinessScore: Math.min(100, prev.readinessScore + 5),
        };
      });
    }

    const notif: NotificationItem = {
      id: `notif_ms_app_${Date.now()}`,
      title: 'Milestone Approved & Credited',
      message: `"${milestoneTitle}" approved with a ${params.rating}/5 rating! +15 verified points credited to your Skill Twin.`,
      time: 'Just now',
      type: 'success',
      read: false,
      link: '/student/internship-progress',
    };
    setNotifications((prev) => [notif, ...prev]);
    return true;
  };

  const hireCandidate = (params: {
    candidateId: string;
    candidateName: string;
    candidateEmail: string;
    roleTitle: string;
    company: string;
    stipend?: string;
  }): ActiveInternshipRecord => {
    const newInternship: ActiveInternshipRecord = {
      id: `int_${Date.now()}`,
      studentId: params.candidateId,
      studentName: params.candidateName,
      studentEmail: params.candidateEmail,
      opportunityId: `opp_hired_${Date.now()}`,
      roleTitle: params.roleTitle,
      company: params.company,
      companyLogo: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=100&auto=format&fit=crop&q=80',
      supervisorName: 'Technical Lead & Mentor',
      supervisorEmail: `mentors@${params.company.toLowerCase().replace(/[^a-z]/g, '')}.com`,
      facultyMentorName: 'Dr. Ramesh Sharma',
      facultyMentorEmail: 'faculty.mentor@university.edu',
      stipend: params.stipend || '₹45,000 / month',
      startDate: new Date().toISOString().split('T')[0],
      endDate: new Date(Date.now() + 12 * 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      durationWeeks: 12,
      status: 'Active',
      completionCertificateId: `CERT-SB-${Math.random().toString(36).substring(2, 7).toUpperCase()}-2026`,
      milestones: [
        {
          id: `ms_1_${Date.now()}`,
          internshipId: `int_${Date.now()}`,
          weekNumber: 1,
          title: 'Environment Setup & Codebase Onboarding',
          description: 'Configure development container, clone project repository, pass linter and run unit tests.',
          skillsCovered: ['Git', 'Docker', 'Python', 'FastAPI'],
          deliverableRequired: 'Dev environment setup confirmation & initial PR.',
          status: 'In Progress',
        },
        {
          id: `ms_2_${Date.now()}`,
          internshipId: `int_${Date.now()}`,
          weekNumber: 2,
          title: 'Database Schema & Core Entity Models',
          description: 'Design relational database schemas and implement ORM/migration models.',
          skillsCovered: ['SQL', 'PostgreSQL', 'Database Design'],
          deliverableRequired: 'Schema migration script and ER diagram.',
          status: 'Not Started',
        },
        {
          id: `ms_3_${Date.now()}`,
          internshipId: `int_${Date.now()}`,
          weekNumber: 3,
          title: 'REST API & Business Logic Integration',
          description: 'Implement core endpoints with request validation, error handling, and unit test suites.',
          skillsCovered: ['REST APIs', 'FastAPI', 'Problem Solving'],
          deliverableRequired: 'API endpoints PR with passing tests.',
          status: 'Not Started',
        },
        {
          id: `ms_4_${Date.now()}`,
          internshipId: `int_${Date.now()}`,
          weekNumber: 4,
          title: 'Security, Authentication & Rate Limiting',
          description: 'Enforce authentication, authorization roles, and rate limiters.',
          skillsCovered: ['Cybersecurity', 'JWT', 'Redis'],
          deliverableRequired: 'Auth middleware PR and security test checklist.',
          status: 'Not Started',
        },
        {
          id: `ms_5_${Date.now()}`,
          internshipId: `int_${Date.now()}`,
          weekNumber: 5,
          title: 'Integration Testing & Performance Tuning',
          description: 'Benchmarking, query optimization, and test coverage >80%.',
          skillsCovered: ['Pytest', 'Testing & CI/CD', 'Performance Tuning'],
          deliverableRequired: 'Load test report & benchmark results.',
          status: 'Not Started',
        },
        {
          id: `ms_6_${Date.now()}`,
          internshipId: `int_${Date.now()}`,
          weekNumber: 6,
          title: 'Production Staging & Capstone Demo',
          description: 'Deploy to cloud staging environment and deliver final project walkthrough.',
          skillsCovered: ['CI/CD', 'Cloud (AWS/GCP)', 'Communication'],
          deliverableRequired: 'Live staging URL and demo presentation slides.',
          status: 'Not Started',
        },
      ],
    };

    setInternships((prev) => {
      const updated = [newInternship, ...prev];
      if (currentUser) {
        try {
          localStorage.setItem(getScopedStorageKey(currentUser.id, 'internships'), JSON.stringify(updated));
        } catch {}
      } else {
        try {
          localStorage.setItem('sb_demo_internships', JSON.stringify(updated));
        } catch {}
      }
      return updated;
    });

    const notif: NotificationItem = {
      id: `notif_hire_${Date.now()}`,
      title: 'Offer Accepted — Internship Active',
      message: `Congratulations! Your active internship at ${params.company} has been initialized. Track milestones in your Internship Workspace!`,
      time: 'Just now',
      type: 'success',
      read: false,
      link: '/student/internship-progress',
    };
    setNotifications((prev) => [notif, ...prev]);

    return newInternship;
  };

  const advanceCandidatePipeline = (
    applicationId: string,
    newStatus: ApplicationItem['status'],
    interviewDate?: string
  ) => {
    updateApplicationStatus(applicationId, newStatus);
    if (interviewDate) {
      setApplications((prev) =>
        prev.map((a) => (a.id === applicationId ? { ...a, interviewDate } : a))
      );
    }

    if (newStatus === 'Selected') {
      const targetApp = applications.find((a) => a.id === applicationId);
      if (targetApp) {
        const existingInternship = internships.find(
          (i) => i.company.toLowerCase() === targetApp.company.toLowerCase()
        );
        if (!existingInternship) {
          hireCandidate({
            candidateId: currentUser ? currentUser.id : 'std_demo_abdul',
            candidateName: currentUser ? currentUser.fullName : student.name,
            candidateEmail: currentUser ? currentUser.email : student.email,
            roleTitle: targetApp.opportunityTitle,
            company: targetApp.company,
          });
        }
      }
    }
  };

  return (
    <AppContext.Provider
      value={{
        role,
        setRole,
        student,
        activeSessionMode,
        setSessionMode,
        userResumeProfile,
        resumeVersions,
        handleResumeUpload,
        setUserTargetRole,
        opportunities,
        applications,
        simulatorActions,
        roadmap,
        companyFeedbacks,
        trainingRecommendations,
        notifications,
        isDemoTourOpen,
        setIsDemoTourOpen,
        demoTourStep,
        setDemoTourStep,
        applyToOpportunity,
        updateApplicationStatus,
        postOpportunity,
        toggleSimulatorAction,
        toggleRoadmapMilestone,
        addExtractedSkillsToTwin,
        updateAssessmentScore,
        submitIndustryFeedback,
        deployTrainingIntervention,
        generateNewTrainingPlan,
        markNotificationRead,
        resetDemoData,

        // Phase 4 Authentication & Reports
        currentUser,
        isAuthenticated: !!currentUser,
        authSession,
        userReports,
        lastGeneratedReport,
        setLastGeneratedReport,
        login,
        register,
        logout,
        refreshUserReports,
        saveCurrentAnalysisAsReport,
        deleteReport,
        submitApplication,
        completeAssessment,

        // Phase 5 Internship Workspace & Recruitment Pipeline
        internships,
        submitInternshipMilestone,
        approveInternshipMilestone,
        advanceCandidatePipeline,
        hireCandidate,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}
