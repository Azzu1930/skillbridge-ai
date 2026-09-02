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
  const [demoTourStep, setDemoTourStep] = useState(0);

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
      matchScore: opp.id === 'opp_1' ? 91 : Math.floor(Math.random() * 10) + 82,
      notes: 'Application submitted via SkillBridge AI matching portal. Verified Skill Twin attached.',
    };

    const updated = [newApp, ...applications];
    setApplications(updated);
    try {
      localStorage.setItem('sb_applications', JSON.stringify(updated));
    } catch {
      // ignore
    }

    // Notification for student
    const newNotif: NotificationItem = {
      id: `notif_${Date.now()}`,
      title: 'Application Submitted',
      message: `You successfully applied for ${opp.title} at ${opp.company}. Candidate Matcher updated.`,
      time: 'Just now',
      type: 'success',
      read: false,
      link: '/student/applications',
    };
    setNotifications((prev) => [newNotif, ...prev]);

    return true;
  };

  const updateApplicationStatus = (applicationId: string, newStatus: ApplicationItem['status']) => {
    setApplications((prev) => {
      const updated = prev.map((app) =>
        app.id === applicationId ? { ...app, status: newStatus } : app
      );
      try {
        localStorage.setItem('sb_applications', JSON.stringify(updated));
      } catch {
        // ignore
      }
      return updated;
    });

    const targetApp = applications.find((a) => a.id === applicationId);
    const notif: NotificationItem = {
      id: `notif_${Date.now()}`,
      title: `Application Status Updated: ${newStatus}`,
      message: `${targetApp?.company || 'Recruiter'} updated ${targetApp?.opportunityTitle || 'your application'} status to ${newStatus}.`,
      time: 'Just now',
      type: 'success',
      read: false,
      link: '/student/applications',
    };
    setNotifications((prev) => [notif, ...prev]);
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

      // Deterministic calculation: base = 68%
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
    setRoadmap((prev) => {
      const updated = prev.map((m) =>
        m.week === week ? { ...m, completed: !m.completed } : m
      );

      // Completing milestones feeds back into Student Skill Twin
      const targetMilestone = updated.find((m) => m.week === week);
      if (targetMilestone?.completed) {
        setStudent((prevStudent) => {
          let updatedSkills = [...prevStudent.skills];

          if (week === 1) {
            // REST APIs completed
            updatedSkills = updatedSkills.map((s) =>
              s.name === 'REST APIs' ? { ...s, score: 70, verified: true, verificationStatus: 'Assessment Verified' } : s
            );
          } else if (week === 2) {
            // FastAPI completed
            updatedSkills = updatedSkills.map((s) =>
              s.name === 'FastAPI' ? { ...s, score: 72, verified: true, verificationStatus: 'Assessment Verified' } : s
            );
          } else if (week === 4) {
            // Docker completed
            updatedSkills = updatedSkills.map((s) =>
              s.name === 'Docker' ? { ...s, score: 68, verified: true, verificationStatus: 'Assessment Verified' } : s
            );
          }

          const completedCount = updated.filter((m) => m.completed).length;
          const newReadiness = Math.min(94, 68 + completedCount * 4);

          const newProfile = {
            ...prevStudent,
            skills: updatedSkills,
            readinessScore: newReadiness,
          };
          try {
            localStorage.setItem('sb_student_profile', JSON.stringify(newProfile));
          } catch {
            // ignore
          }
          return newProfile;
        });

        // Add success notification
        const notif: NotificationItem = {
          id: `notif_${Date.now()}`,
          title: `Milestone Week ${week} Completed`,
          message: `Great job! Your dynamic Skill Twin competency for ${targetMilestone.title} has been updated.`,
          time: 'Just now',
          type: 'success',
          read: false,
          link: '/student/skill-twin',
        };
        setNotifications((n) => [notif, ...n]);
      }

      return updated;
    });
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
          verificationStatus: 'Evidence Submitted' as const,
          lastUpdated: 'Extracted from Resume',
          evidenceCount: 1,
          evidence: [
            {
              type: 'experience' as const,
              title: `Demonstrated in verified Resume project parsing`,
              date: new Date().toISOString().split('T')[0],
              verified: true,
              statusText: 'Evidence Submitted' as const,
            },
          ],
        }));

      const updated = {
        ...prev,
        skills: [...prev.skills, ...addedItems],
        readinessScore: Math.min(88, prev.readinessScore + Math.min(8, addedItems.length * 2)),
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
      let prob = prev.skills.find((s) => s.name === 'Problem Solving')?.score || 84;

      if (category === 'Technical') tech = Math.round((tech + score) / 2);
      if (category === 'Communication') soft = Math.round((soft + score) / 2);
      if (category === 'Problem Solving') prob = score;

      const updatedSkills = prev.skills.map((s) => {
        if (s.name === 'Problem Solving') {
          return {
            ...s,
            score: prob,
            verificationStatus: 'Assessment Verified' as const,
            lastUpdated: 'Just now (Assessment Verified)',
            evidence: [
              {
                type: 'assessment' as const,
                title: 'Live Skill Assessment Test',
                score,
                date: new Date().toISOString().split('T')[0],
                verified: true,
                statusText: 'Assessment Verified' as const,
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
        readinessScore: Math.min(94, Math.round((tech + soft + prev.projectScore + prev.interviewScore) / 4)),
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
      title: 'Skill Assessment Completed',
      message: `Scored ${score}% in ${category}. Your dynamic Skill Twin readiness has increased!`,
      time: 'Just now',
      type: 'success',
      read: false,
      link: '/student/skill-twin',
    };
    setNotifications((prev) => [notif, ...prev]);
  };

  const submitIndustryFeedback = (feedbackData: Omit<CompanyFeedbackRecord, 'id' | 'date'>) => {
    const record: CompanyFeedbackRecord = {
      ...feedbackData,
      id: `cfb_${Date.now()}`,
      date: new Date().toISOString().split('T')[0],
    };
    setCompanyFeedbacks((prev) => [record, ...prev]);

    // Recalculate cohort gap dynamically in notifications
    const notif: NotificationItem = {
      id: `notif_${Date.now()}`,
      title: 'Feedback Added to Academia Intelligence',
      message: `Evaluation for ${record.studentName} logged by ${record.company}. Docker & Deployment deficits flagged for institutional training.`,
      time: 'Just now',
      type: 'info',
      read: false,
      link: '/admin/intelligence',
    };
    setNotifications((prev) => [notif, ...prev]);

    // Also notify student
    const studentNotif: NotificationItem = {
      id: `notif_std_${Date.now()}`,
      title: 'Post-Interview Evaluation Received',
      message: `${record.company} submitted technical interview notes. Focus areas: Docker and Cloud Deployment.`,
      time: 'Just now',
      type: 'warning',
      read: false,
      link: '/student/dashboard',
    };
    setNotifications((prev) => [studentNotif, ...prev]);
  };

  const deployTrainingIntervention = (recommendationId: string) => {
    setTrainingRecommendations((prev) =>
      prev.map((item) =>
        item.id === recommendationId
          ? { ...item, status: 'Approved' }
          : item
      )
    );

    const targetRec = trainingRecommendations.find((t) => t.id === recommendationId);
    const notif: NotificationItem = {
      id: `notif_${Date.now()}`,
      title: 'Institutional Intervention Approved',
      message: `${targetRec?.skill || 'Training Bootcamp'} has been approved! Expected cohort readiness gain: +${targetRec?.projectedReadinessBoost || 12}%.`,
      time: 'Just now',
      type: 'success',
      read: false,
      link: '/admin/training',
    };
    setNotifications((prev) => [notif, ...prev]);
  };

  const generateNewTrainingPlan = (skill: string, cohort: string) => {
    const newPlan: TrainingRecommendationItem = {
      id: `tr_${Date.now()}`,
      priority: 'HIGH',
      skill: `${skill} Acceleration Bootcamp`,
      reason: `Automated AI synthesis triggered by recent industry evaluation deficits in ${cohort}.`,
      recommendedAction: `5-Day intensive practical sprint on ${skill} with cloud sandbox environments and industry mentors.`,
      targetCohorts: [cohort],
      enrolledCount: 124,
      durationWeeks: 1,
      projectedReadinessBoost: 12,
      suggestedFormat: 'Hands-on 5-day lab',
      industryMentor: 'Razorpay Cloud Infrastructure Team',
      status: 'Approved',
    };
    setTrainingRecommendations((prev) => [newPlan, ...prev]);

    const notif: NotificationItem = {
      id: `notif_${Date.now()}`,
      title: 'Training Plan Generated & Approved',
      message: `AI synthesized ${newPlan.skill} for ${cohort}. Curriculum intervention deployed.`,
      time: 'Just now',
      type: 'success',
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
    setRoleState('student');
    setStudent(PRIMARY_STUDENT);
    setOpportunities(INITIAL_OPPORTUNITIES);
    setApplications(INITIAL_APPLICATIONS);
    setSimulatorActions(SIMULATOR_ACTIONS);
    setRoadmap(ROADMAP_MILESTONES);
    setCompanyFeedbacks(COMPANY_FEEDBACKS);
    setTrainingRecommendations(TRAINING_RECOMMENDATIONS);
    setNotifications(INITIAL_NOTIFICATIONS);
    try {
      localStorage.removeItem('sb_demo_role');
      localStorage.removeItem('sb_student_profile');
      localStorage.removeItem('sb_applications');
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
