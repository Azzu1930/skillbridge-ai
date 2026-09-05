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
} from '@/data/seedData';
import { compareResumeVersions } from '@/lib/resume-parser';
import {
  getCurrentUser,
  getCurrentSession,
  loginUser,
  registerUser,
  logoutUser,
} from '@/lib/auth-service';
import {
  getUserReports,
  saveUserReport,
  deleteUserReport,
  createCareerReportFromAnalysis,
} from '@/lib/report-storage';

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
    targetRole?: string;
    institution?: string;
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

  // Load from localStorage on mount (client-side only)
  useEffect(() => {
    try {
      // Check auth session
      const session = getCurrentSession();
      if (session) {
        setAuthSession(session);
        const user = getCurrentUser();
        if (user) {
          setCurrentUser(user);
          const reports = getUserReports(user.id);
          setUserReports(reports);
          if (reports.length > 0) {
            setLastGeneratedReport(reports[0]);
          }
        }
      }

      const savedRole = localStorage.getItem('sb_demo_role') as UserRole;
      if (savedRole && ['student', 'industry', 'faculty', 'admin'].includes(savedRole)) {
        setRoleState(savedRole);
      }
      const savedResume = localStorage.getItem('sb_user_resume');
      if (savedResume) {
        const parsed: ResumeAnalysisResult = JSON.parse(savedResume);
        setUserResumeProfile(parsed);
      }
      const savedVersions = localStorage.getItem('sb_resume_versions');
      if (savedVersions) {
        setResumeVersions(JSON.parse(savedVersions));
      }
      const savedMode = localStorage.getItem('sb_session_mode') as 'demo' | 'user';
      if (savedMode) {
        setActiveSessionMode(savedMode);
      }

      const savedGuestReport = localStorage.getItem('sb_guest_last_report');
      if (savedGuestReport && !lastGeneratedReport) {
        setLastGeneratedReport(JSON.parse(savedGuestReport));
      }
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

    try {
      localStorage.setItem('sb_user_resume', JSON.stringify(analysis));
      localStorage.setItem('sb_resume_versions', JSON.stringify(updatedVersions));
      localStorage.setItem('sb_session_mode', 'user');
      if (!currentUser) {
        localStorage.setItem('sb_guest_last_report', JSON.stringify(report));
      }
    } catch {
      // ignore
    }

    return report;
  };

  /**
   * Phase 4: Authentication Actions
   */
  const login = async (email: string, password: string): Promise<UserAccount> => {
    const result = await loginUser(email, password);
    setCurrentUser(result.user);
    setAuthSession(result.session);
    setActiveSessionMode('user');

    // Load user's private reports
    const userReps = getUserReports(result.user.id);
    setUserReports(userReps);
    if (userReps.length > 0) {
      setLastGeneratedReport(userReps[0]);
    }

    return result.user;
  };

  const register = async (params: {
    fullName: string;
    email: string;
    password: string;
    confirmPassword?: string;
    targetRole?: string;
    institution?: string;
  }): Promise<UserAccount> => {
    const result = await registerUser(params);
    setCurrentUser(result.user);
    setAuthSession(result.session);
    setActiveSessionMode('user');
    setUserReports([]);
    return result.user;
  };

  const logout = () => {
    logoutUser();
    setCurrentUser(null);
    setAuthSession(null);
    setUserReports([]);
    setLastGeneratedReport(null);
    setActiveSessionMode('demo');
    setStudent(PRIMARY_STUDENT);
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
      try {
        localStorage.setItem('sb_user_resume', JSON.stringify(updated));
      } catch {
        // ignore
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

    try {
      localStorage.setItem('sb_applications', JSON.stringify(updated));
    } catch {
      // ignore
    }

    return true;
  };

  const updateApplicationStatus = (applicationId: string, status: ApplicationItem['status']) => {
    setApplications((prev) =>
      prev.map((app) => (app.id === applicationId ? { ...app, status } : app))
    );

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
