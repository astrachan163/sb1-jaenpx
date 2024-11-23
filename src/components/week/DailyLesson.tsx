import React, { useState, useEffect, useRef } from 'react';
import { ChevronDown, ChevronUp, BookOpen, ExternalLink, CheckCircle, XCircle, Link as LinkIcon, Clock } from 'lucide-react';
import type { DailyContent } from '../../types/course';
import { useProgressStore } from '../../store/progressStore';

interface DailyLessonProps {
  day: string;
  content: DailyContent;
  weekNumber: number;
}

const DailyLesson: React.FC<DailyLessonProps> = ({ day, content, weekNumber }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [resourcesClicked, setResourcesClicked] = useState<Record<string, boolean>>({});
  const startTimeRef = useRef<number | null>(null);
  
  const { updateBellringerAnswer, updateDayCompletion, updateTimeSpent, getProgress } = useProgressStore();
  const progress = getProgress(weekNumber);

  useEffect(() => {
    if (isExpanded && !startTimeRef.current) {
      startTimeRef.current = Date.now();
    } else if (!isExpanded && startTimeRef.current) {
      const timeSpent = Math.floor((Date.now() - startTimeRef.current) / 1000);
      updateTimeSpent(weekNumber, day, timeSpent);
      startTimeRef.current = null;
    }
  }, [isExpanded, weekNumber, day, updateTimeSpent]);

  useEffect(() => {
    if (!content?.resources) return;
    
    const allResourcesClicked = content.resources.every(
      (resource) => resourcesClicked[resource.url]
    );
    const bellringerAnswered = progress?.bellringerAnswers?.[day]?.length > 0;
    
    if (allResourcesClicked && bellringerAnswered) {
      updateDayCompletion(weekNumber, day, true);
    }
  }, [resourcesClicked, progress?.bellringerAnswers, day, weekNumber, content?.resources, updateDayCompletion]);

  const handleAnswerSubmit = (answer: string) => {
    setSelectedAnswer(answer);
    setShowResult(true);
    updateBellringerAnswer(weekNumber, day, answer);
  };

  const handleResourceClick = (url: string) => {
    setResourcesClicked((prev) => ({
      ...prev,
      [url]: true,
    }));
    window.open(url, '_blank');
  };

  const isCorrect = selectedAnswer === content?.bellringer?.correctAnswer;

  if (!content) return null;

  return (
    <div className="bg-gray-800 rounded-lg overflow-hidden border border-gray-700 hover:border-cyan-500/20 transition-all">
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full px-6 py-4 flex items-center justify-between text-left hover:bg-gray-700/50 transition-colors"
      >
        <div className="flex items-center gap-3">
          <BookOpen className="text-cyan-400" size={20} />
          <h3 className="text-xl font-semibold">{day}</h3>
          {progress?.dayCompleted?.[day] && (
            <div className="flex items-center gap-2">
              <CheckCircle className="text-green-400" size={16} />
              <span className="text-sm text-gray-400">
                <Clock className="inline-block mr-1" size={14} />
                {Math.floor((progress?.timeSpent?.[day] || 0) / 60)}m
              </span>
            </div>
          )}
        </div>
        {isExpanded ? (
          <ChevronUp className="text-gray-400" />
        ) : (
          <ChevronDown className="text-gray-400" />
        )}
      </button>

      {isExpanded && (
        <div className="px-6 py-4 space-y-6 border-t border-gray-700">
          {/* Bellringer */}
          {content.bellringer && (
            <div>
              <h4 className="text-lg font-semibold mb-3 text-cyan-400">Bellringer</h4>
              <div className="bg-gray-900/50 p-4 rounded-lg">
                <p className="mb-4">{content.bellringer.question}</p>
                
                <div className="space-y-2">
                  {content.bellringer.options?.map((option) => (
                    <button
                      key={option}
                      onClick={() => !showResult && handleAnswerSubmit(option)}
                      disabled={showResult}
                      className={`w-full text-left px-4 py-2 rounded-md transition-colors ${
                        selectedAnswer === option
                          ? showResult
                            ? isCorrect
                              ? 'bg-green-500/20 text-green-400'
                              : 'bg-red-500/20 text-red-400'
                            : 'bg-cyan-500/20 text-cyan-400'
                          : showResult && option === content.bellringer.correctAnswer
                            ? 'bg-green-500/20 text-green-400'
                            : 'bg-gray-800 hover:bg-gray-700'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span>{option}</span>
                        {showResult && (
                          option === content.bellringer.correctAnswer ? (
                            <CheckCircle className="text-green-400" size={18} />
                          ) : selectedAnswer === option ? (
                            <XCircle className="text-red-400" size={18} />
                          ) : null
                        )}
                      </div>
                    </button>
                  ))}
                </div>
                
                {showResult && content.bellringer.explanation && (
                  <div className={`mt-4 p-4 rounded-md ${
                    isCorrect ? 'bg-green-500/10' : 'bg-red-500/10'
                  }`}>
                    <p className={`font-medium mb-2 ${
                      isCorrect ? 'text-green-400' : 'text-red-400'
                    }`}>
                      {isCorrect ? 'Correct!' : 'Incorrect'}
                    </p>
                    <p className="text-gray-300">
                      {content.bellringer.explanation}
                    </p>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Activity */}
          {content.activity && (
            <div>
              <h4 className="text-lg font-semibold mb-3 text-cyan-400">Activity: {content.activity.title}</h4>
              <p className="text-gray-300 mb-4">{content.activity.description}</p>
              <ul className="space-y-2">
                {content.activity.instructions.map((instruction, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <span className="text-cyan-400">•</span>
                    <span>{instruction}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Resources */}
          {content.resources && content.resources.length > 0 && (
            <div>
              <h4 className="text-lg font-semibold mb-3 text-cyan-400">Resources</h4>
              <div className="grid gap-4">
                {content.resources.map((resource, index) => (
                  <button
                    key={index}
                    onClick={() => handleResourceClick(resource.url)}
                    className="w-full flex items-center justify-between p-4 rounded-lg bg-gray-900/50 hover:bg-gray-700/50 transition-colors group text-left"
                  >
                    <div className="flex items-start gap-3">
                      {resourcesClicked[resource.url] ? (
                        <CheckCircle className="text-green-400 mt-1" size={16} />
                      ) : (
                        <LinkIcon className="text-gray-400 mt-1" size={16} />
                      )}
                      <div>
                        <h5 className="font-medium group-hover:text-cyan-400 transition-colors">
                          {resource.title}
                        </h5>
                        <p className="text-sm text-gray-400">{resource.description}</p>
                        {resource.duration && (
                          <span className="text-xs text-cyan-400 mt-1 inline-block">
                            Duration: {resource.duration}
                          </span>
                        )}
                      </div>
                    </div>
                    <ExternalLink className="text-gray-400 group-hover:text-cyan-400 transition-colors" size={18} />
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default DailyLesson;