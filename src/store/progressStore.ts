import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import type { CourseProgress, QuizAttempt } from '../types/course';

interface ProgressState {
  progress: Record<number, CourseProgress>;
  quizAttempts: QuizAttempt[];
  updateDayCompletion: (weekNumber: number, day: string, completed: boolean) => void;
  updateBellringerAnswer: (weekNumber: number, day: string, answer: string) => void;
  updateQuizScore: (weekNumber: number, score: number) => void;
  updateTimeSpent: (weekNumber: number, day: string, seconds: number) => void;
  getProgress: (weekNumber: number) => CourseProgress;
}

const defaultProgress = (weekNumber: number): CourseProgress => ({
  weekNumber,
  dayCompleted: {},
  bellringerAnswers: {},
  timeSpent: {},
  quizScore: undefined,
});

export const useProgressStore = create<ProgressState>()(
  persist(
    (set, get) => ({
      progress: {},
      quizAttempts: [],
      
      updateDayCompletion: (weekNumber, day, completed) =>
        set((state) => {
          const currentProgress = state.progress[weekNumber] || defaultProgress(weekNumber);
          return {
            progress: {
              ...state.progress,
              [weekNumber]: {
                ...currentProgress,
                dayCompleted: {
                  ...currentProgress.dayCompleted,
                  [day]: completed,
                },
              },
            },
          };
        }),

      updateBellringerAnswer: (weekNumber, day, answer) =>
        set((state) => {
          const currentProgress = state.progress[weekNumber] || defaultProgress(weekNumber);
          const currentAnswers = currentProgress.bellringerAnswers[day] || [];
          return {
            progress: {
              ...state.progress,
              [weekNumber]: {
                ...currentProgress,
                bellringerAnswers: {
                  ...currentProgress.bellringerAnswers,
                  [day]: [...currentAnswers, answer],
                },
              },
            },
          };
        }),

      updateTimeSpent: (weekNumber, day, seconds) =>
        set((state) => {
          const currentProgress = state.progress[weekNumber] || defaultProgress(weekNumber);
          const currentTime = currentProgress.timeSpent[day] || 0;
          return {
            progress: {
              ...state.progress,
              [weekNumber]: {
                ...currentProgress,
                timeSpent: {
                  ...currentProgress.timeSpent,
                  [day]: currentTime + seconds,
                },
              },
            },
          };
        }),

      updateQuizScore: (weekNumber, score) =>
        set((state) => {
          const currentProgress = state.progress[weekNumber] || defaultProgress(weekNumber);
          const attempt: QuizAttempt = {
            weekNumber,
            score,
            date: new Date().toISOString(),
          };
          return {
            progress: {
              ...state.progress,
              [weekNumber]: {
                ...currentProgress,
                quizScore: score,
              },
            },
            quizAttempts: [...state.quizAttempts, attempt],
          };
        }),

      getProgress: (weekNumber) => {
        const state = get();
        return state.progress[weekNumber] || defaultProgress(weekNumber);
      },
    }),
    {
      name: 'course-progress',
      version: 1,
      storage: createJSONStorage(() => localStorage),
      migrate: (persistedState: any, version: number) => {
        if (version === 0) {
          // Migration from version 0 to 1
          return {
            progress: {},
            quizAttempts: [],
            ...persistedState,
          };
        }
        return persistedState;
      },
    }
  )
);