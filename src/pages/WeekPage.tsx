import React, { useState } from 'react';
import { useParams, Navigate } from 'react-router-dom';
import WeekHeader from '../components/week/WeekHeader';
import DailyLesson from '../components/week/DailyLesson';
import WeekProgress from '../components/week/WeekProgress';
import Quiz from '../components/Quiz';
import ChatInterface from '../components/ChatInterface';
import { weekContent } from '../data/weekContent';

const WeekPage: React.FC = () => {
  const { weekId } = useParams<{ weekId: string }>();
  const [showQuiz, setShowQuiz] = useState(false);
  const [showAILearning, setShowAILearning] = useState(false);
  
  // Validate weekId and get content
  if (!weekId || !weekContent[weekId]) {
    return <Navigate to="/courses" replace />;
  }

  const content = weekContent[weekId];
  const weekNumber = parseInt(weekId);

  // Ensure content.days exists before rendering
  if (!content || !content.days) {
    return (
      <div className="min-h-screen bg-gray-900 text-gray-100 pt-20">
        <div className="max-w-7xl mx-auto px-4 py-12">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-red-400">Content Not Available</h2>
            <p className="mt-2 text-gray-400">The content for this week is currently being updated.</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 pt-20">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <WeekHeader
          weekNumber={content.weekNumber}
          title={content.title}
          description={content.description}
        />

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main content */}
          <div className="lg:col-span-2 space-y-6">
            {Object.entries(content.days).map(([day, dayContent]) => (
              <DailyLesson 
                key={day} 
                day={day} 
                content={dayContent}
                weekNumber={weekNumber}
              />
            ))}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <WeekProgress weekNumber={weekNumber} />
            
            <div className="space-y-4">
              {/* Quiz button */}
              {content.quiz && (
                <button
                  onClick={() => setShowQuiz(true)}
                  className="w-full px-6 py-4 rounded-lg bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-medium hover:from-cyan-600 hover:to-blue-600 transition-all"
                >
                  Take Week {content.weekNumber} Quiz
                </button>
              )}

              {/* AI Learning button */}
              <button
                onClick={() => setShowAILearning(!showAILearning)}
                className="w-full px-6 py-4 rounded-lg border border-cyan-500/20 text-cyan-400 hover:bg-cyan-500/10 transition-all"
              >
                {showAILearning ? 'Hide' : 'Show'} AI Learning Assistant
              </button>
            </div>
          </div>
        </div>

        {showQuiz && content.quiz && (
          <Quiz
            weekNumber={weekNumber}
            questions={content.quiz.questions}
            onClose={() => setShowQuiz(false)}
          />
        )}

        {showAILearning && <ChatInterface />}
      </div>
    </div>
  );
};

export default WeekPage;