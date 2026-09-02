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
} from '@/data/seedData';

interface AppContextType {
  role: UserRole;
  setRole: (role: UserRole) => void;
  student: StudentProfile;
  opportunities: JobOpportunity[];
  applications: ApplicationItem[];
  simulatorActions: SimulatorAction[];
  roadmap: RoadmapMilestone[];
  companyFeedbacks: CompanyFeedbackRecord[];
  trainingRecommendations: TrainingRecommendationItem[];
  notifications: NotificationItem[];
  isDemoTourOpen: boolean;
  setIsDemoTourOpen: (open: boolean) => void;
  applyToOpportunity: (opportunityId: string) => boolean;
  postOpportunity: (opp: Omit<JobOpportunity, 'id' | 'postedDate'>) => void;
  toggleSimulatorAction: (actionId: string) => void;
  toggleRoadmapMilestone: (week: number) => void;
  addExtractedSkillsToTwin: (skills: string[]) => void;
  updateAssessmentScore: (category: string, score: number) => void;
  addCompanyFeedback: (feedback: Omit<CompanyFeedbackRecord, 'id' | 'date'>) => void;
  generateNewTrainingPlan: (skill: string, cohort: string) => void;
  markNotificationRead: (id: string) => void;
  resetDemoData: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [role, setRoleState] = useState<UserRole>('student');
  const [student, setStudent] = useState<StudentProfile>(PRIMARY_STUDENT);
  const [opportunities, setOpportunities] = useState<JobOpportunity[]>(INITIAL_OPPORTUNITIES);
  const [applications, setApplications] = useState<ApplicationItem[]>(INITIAL_APPLICATIONS);
  const [simulatorActions, setSimulatorActions] = useState<SimulatorAction[]>(SIMULATOR_ACTIONS);
  const [roadmap, setRoadmap] = useState<RoadmapMilestone[]>(ROADMAP_MILESTONES);
  const [companyFeedbacks, setCompanyFeedbacks] = useState<CompanyFeedbackRecord[]>(COMPANY_FEEDBACKS);
  const [trainingRecommendations, setTrainingRecommendations] = useState<TrainingRecommendationItem[]>(TRAINING_RECOMMENDATIONS);
  const [notifications, setNotifications] = useState<NotificationItem[]>(INITIAL_NOTIFICATIONS);
  const [isDemoTourOpen, setIsDemoTourOpen] = useState(false);

  // Load from localStorage on mount (client-side only)
  useEffect(() => {
    try {
      const savedRole = localStorage.getItem('sb_demo_role') as UserRole;
      if (savedRole && ['student', 'industry', 'faculty', 'admin'].includes(savedRole)) {
        setRoleState(savedRole);
      }
      const savedStudent = localStorage.getItem('sb_student_profile');
      if (savedStudent) {
        setStudent(JSON.parse(savedStudent));
      }
      const savedApps = localStorage.getItem('sb_applications');
      if (savedApps) {
        setApplications(JSON.parse(savedApps));
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

  const applyToOpportunity = (opportunityId: string): boolean => {
    const opp = opportunities.find((o) => o.id === opportunityId);
    if (!opp) return false;

    // Check if already applied
    const alreadyApplied = applications.some((a) => a.opportunityId === opportunityId);
    if (alreadyApplied) return false;

    const newApp: ApplicationItem = {
      id: `app_${Date.now()}`,
      opportunityId: opp.id,
      opportunityTitle: opp.title,
      company: opp.company,
      appliedDate: new Date().toISOString().split('T')[0],
      status: 'Applied',
      matchScore: Math.floor(Math.random() * 15) + 82, // 82-96%
      notes: 'Application submitted via SkillBridge AI matching portal. Skill Twin verification attached.',
    };

    const updated = [newApp, ...applications];
    setApplications(updated);
    try {
      localStorage.setItem('sb_applications', JSON.stringify(updated));
    } catch {
      // ignore
    }

    // Add notification
    const newNotif: NotificationItem = {
      id: `notif_${Date.now()}`,
      title: 'Application Submitted',
      message: `You successfully applied for ${opp.title} at ${opp.company}.`,
      time: 'Just now',
      type: 'success',
      read: false,
      link: '/student/applications',
    };
    setNotifications((prev) => [newNotif, ...prev]);

    return true;
  };

  const postOpportunity = (newOppData: Omit<JobOpportunity, 'id' | 'postedDate'>) => {
    const createdOpp: JobOpportunity = {
      ...newOppData,
      id: `opp_${Date.now()}`,
      postedDate: 'Just now',
    };
    setOpportunities((prev) => [createdOpp, ...prev]);

    const newNotif: NotificationItem = {
      id: `notif_${Date.now()}`,
      title: 'New Opportunity Published',
      message: `${createdOpp.title} at ${createdOpp.company} is now live and matching student candidates.`,
      time: 'Just now',
      type: 'info',
      read: false,
      link: '/industry/dashboard',
    };
    setNotifications((prev) => [newNotif, ...prev]);
  };

  const toggleSimulatorAction = (actionId: string) => {
    setSimulatorActions((prev) => {
      const updated = prev.map((act) =>
        act.id === actionId ? { ...act, completed: !act.completed } : act
      );
      // recalculate readiness
      const completedBoost = updated
        .filter((a) => a.completed)
        .reduce((sum, a) => sum + a.impactScore, 0);

      const newScore = Math.min(96, 68 + completedBoost);
      setStudent((s) => {
        const newProfile = { ...s, readinessScore: newScore };
        try {
          localStorage.setItem('sb_student_profile', JSON.stringify(newProfile));
        } catch {
          // ignore
        }
        return newProfile;
      });

      return updated;
    });
  };

  const toggleRoadmapMilestone = (week: number) => {
    setRoadmap((prev) =>
      prev.map((m) => (m.week === week ? { ...m, completed: !m.completed } : m))
    );
  };

  const addExtractedSkillsToTwin = (newSkills: string[]) => {
    setStudent((prev) => {
      const existingNames = new Set(prev.skills.map((s) => s.name.toLowerCase()));
      const addedItems = newSkills
        .filter((s) => !existingNames.has(s.toLowerCase()))
        .map((s) => ({
          id: `sk_res_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`,
          name: s,
          category: 'technical' as const,
          score: 75,
          verified: false,
          lastUpdated: 'Extracted from Resume',
          evidenceCount: 1,
          evidence: [
            {
              type: 'experience' as const,
              title: `Demonstrated in verified Resume project parsing`,
              date: new Date().toISOString().split('T')[0],
              verified: true,
            },
          ],
        }));

      const updated = {
        ...prev,
        skills: [...prev.skills, ...addedItems],
        readinessScore: Math.min(85, prev.readinessScore + Math.min(8, addedItems.length * 2)),
      };
      try {
        localStorage.setItem('sb_student_profile', JSON.stringify(updated));
      } catch {
        // ignore
      }
      return updated;
    });

    const notif: NotificationItem = {
      id: `notif_${Date.now()}`,
      title: 'Skill Twin Synchronized',
      message: `Added ${newSkills.length} verified technologies from your resume to your dynamic Skill Twin.`,
      time: 'Just now',
      type: 'success',
      read: false,
      link: '/student/skill-twin',
    };
    setNotifications((prev) => [notif, ...prev]);
  };

  const updateAssessmentScore = (category: string, score: number) => {
    setStudent((prev) => {
      let tech = prev.technicalScore;
      let soft = prev.softSkillScore;
      let prob = prev.skills.find((s) => s.name === 'Problem Solving')?.score || 81;

      if (category === 'Technical') tech = Math.round((tech + score) / 2);
      if (category === 'Communication') soft = Math.round((soft + score) / 2);
      if (category === 'Problem Solving') prob = score;

      const updatedSkills = prev.skills.map((s) => {
        if (s.name === 'Problem Solving') {
          return {
            ...s,
            score: prob,
            lastUpdated: 'Just now (Assessment Verified)',
            evidence: [
              {
                type: 'assessment' as const,
                title: 'Live Skill Assessment Test',
                score,
                date: new Date().toISOString().split('T')[0],
                verified: true,
              },
              ...s.evidence,
            ],
          };
        }
        return s;
      });

      const updated = {
        ...prev,
        technicalScore: tech,
        softSkillScore: soft,
        skills: updatedSkills,
        readinessScore: Math.min(92, Math.round((tech + soft + prev.projectScore + prev.interviewScore) / 4)),
      };
      try {
        localStorage.setItem('sb_student_profile', JSON.stringify(updated));
      } catch {
        // ignore
      }
      return updated;
    });
  };

  const addCompanyFeedback = (feedbackData: Omit<CompanyFeedbackRecord, 'id' | 'date'>) => {
    const record: CompanyFeedbackRecord = {
      ...feedbackData,
      id: `cfb_${Date.now()}`,
      date: new Date().toISOString().split('T')[0],
    };
    setCompanyFeedbacks((prev) => [record, ...prev]);

    const notif: NotificationItem = {
      id: `notif_${Date.now()}`,
      title: 'Company Feedback Logged',
      message: `Evaluation for ${record.studentName} received from ${record.company}. Curriculum pipeline updated.`,
      time: 'Just now',
      type: 'info',
      read: false,
      link: '/admin/intelligence',
    };
    setNotifications((prev) => [notif, ...prev]);
  };

  const generateNewTrainingPlan = (skill: string, cohort: string) => {
    const newTr: TrainingRecommendationItem = {
      id: `tr_${Date.now()}`,
      priority: 'HIGH',
      skill,
      reason: `Automated closed-loop trigger: High industry deficit detected in student assessments for ${skill}.`,
      recommendedAction: `4-Week Accelerated ${skill} Industry Masterclass`,
      targetCohorts: [cohort],
      projectedReadinessBoost: 12,
      durationWeeks: 4,
      status: 'Proposed',
    };
    setTrainingRecommendations((prev) => [newTr, ...prev]);
  };

  const markNotificationRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    );
  };

  const resetDemoData = () => {
    setStudent(PRIMARY_STUDENT);
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
        opportunities,
        applications,
        simulatorActions,
        roadmap,
        companyFeedbacks,
        trainingRecommendations,
        notifications,
        isDemoTourOpen,
        setIsDemoTourOpen,
        applyToOpportunity,
        postOpportunity,
        toggleSimulatorAction,
        toggleRoadmapMilestone,
        addExtractedSkillsToTwin,
        updateAssessmentScore,
        addCompanyFeedback,
        generateNewTrainingPlan,
        markNotificationRead,
        resetDemoData,
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
