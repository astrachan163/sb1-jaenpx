import React from 'react';
import { CheckCircle } from 'lucide-react';
import type { CourseProgress } from '../../types/course';
import { useProgressStore } from '../../store/progressStore';
import { weekContent } from '../../data/weekContent';

interface WeekProgressProps {
  weekNumber: number;
}

const WeekProgress: React.FC<WeekProgressProps> = ({ weekNumber }) => {
  const progress = useProgressStore(state => state.getProgress(weekNumber));
  const week = weekContent[weekNumber.toString()];
  
  if (!week) {
    return null;
  }

  const days = Object.keys(week.days);
  const totalDays = days.length;
  const completedDays = Object.values(progress.dayCompleted).filter(Boolean).length;
  const progressPercentage = (completedDays / totalDays) * 100;

  return (
    <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold">Week {weekNumber} Progress</h3>
        <span className="text-cyan-400">{completedDays}/{totalDays} Days</span>
      </div>

      <div className="h-2 bg-gray-700 rounded-full overflow-hidden mb-4">
        <div
          className="h-full bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full transition-all"
          style={{ width: `${progressPercentage}%` }}
        ></div>
      </div>

      <div className="grid grid-cols-5 gap-2">
        {days.map((day) => {
          const completed = progress.dayCompleted[day] || false;
          return (
            <div
              key={day}
              className={`p-2 rounded-md text-center text-sm ${
                completed
                  ? 'bg-cyan-500/20 text-cyan-400'
                  : 'bg-gray-700 text-gray-400'
              }`}
            >
              {completed && <CheckCircle size={16} className="mx-auto mb-1" />}
              {day.slice(0, 3)}
            </div>
          );
        })}
      </div>

      {progress.quizScore !== undefined && (
        <div className="mt-4 pt-4 border-t border-gray-700">
          <div className="flex items-center justify-between">
            <span className="text-gray-400">Quiz Score</span>
            <span className="text-lg font-semibold text-cyan-400">
              {progress.quizScore}%
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

export default WeekProgress;