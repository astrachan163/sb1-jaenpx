import React, { useState } from 'react';
import { useProgressStore } from '../store/progressStore';
import { CheckCircle, XCircle, ChevronRight, ChevronLeft } from 'lucide-react';

interface QuizProps {
  weekNumber: number;
  questions: {
    question: string;
    options: string[];
    correctAnswer: string;
    explanation?: string;
  }[];
  onClose: () => void;
}

interface QuizResults {
  answers: string[];
  correctAnswers: number;
  incorrectQuestions: {
    question: string;
    yourAnswer: string;
    correctAnswer: string;
    explanation?: string;
  }[];
}

const Quiz: React.FC<QuizProps> = ({ weekNumber, questions, onClose }) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<string[]>([]);
  const [showResults, setShowResults] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);
  
  const { updateQuizScore } = useProgressStore();

  const handleAnswer = (answer: string) => {
    setSelectedAnswer(answer);
    setShowExplanation(true);
  };

  const handleNext = () => {
    const newAnswers = [...answers, selectedAnswer!];
    setAnswers(newAnswers);
    setSelectedAnswer(null);
    setShowExplanation(false);

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      // Calculate results
      const correctAnswers = newAnswers.filter(
        (answer, index) => answer === questions[index].correctAnswer
      );
      const score = Math.round((correctAnswers.length / questions.length) * 100);
      
      const incorrectQuestions = questions.filter((q, index) => 
        newAnswers[index] !== q.correctAnswer
      ).map((q, index) => ({
        question: q.question,
        yourAnswer: newAnswers[index],
        correctAnswer: q.correctAnswer,
        explanation: q.explanation
      }));

      updateQuizScore(weekNumber, score);
      setShowResults(true);
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
      setAnswers(answers.slice(0, -1));
      setSelectedAnswer(null);
      setShowExplanation(false);
    }
  };

  if (showResults) {
    const score = Math.round(
      (answers.filter((answer, index) => answer === questions[index].correctAnswer).length /
        questions.length) *
        100
    );

    const incorrectQuestions = questions
      .map((q, index) => ({
        question: q.question,
        yourAnswer: answers[index],
        correctAnswer: q.correctAnswer,
        explanation: q.explanation
      }))
      .filter(q => q.yourAnswer !== q.correctAnswer);

    return (
      <div className="fixed inset-0 bg-gray-900/95 flex items-center justify-center p-4 z-50">
        <div className="bg-gray-800 rounded-lg p-8 max-w-3xl w-full max-h-[80vh] overflow-y-auto">
          <h2 className="text-2xl font-bold mb-6 text-center">Quiz Results</h2>
          
          <div className="text-center mb-8">
            <p className="text-4xl font-bold text-cyan-400 mb-2">{score}%</p>
            <p className="text-gray-400">
              You got {answers.filter((answer, index) => answer === questions[index].correctAnswer).length}{' '}
              out of {questions.length} questions correct
            </p>
          </div>

          {incorrectQuestions.length > 0 && (
            <div className="space-y-6 mb-8">
              <h3 className="text-xl font-semibold text-red-400">Questions to Review:</h3>
              {incorrectQuestions.map((q, index) => (
                <div key={index} className="bg-gray-700/50 rounded-lg p-4">
                  <p className="font-medium mb-2">{q.question}</p>
                  <p className="text-red-400 mb-1">
                    Your answer: {q.yourAnswer}
                  </p>
                  <p className="text-green-400 mb-2">
                    Correct answer: {q.correctAnswer}
                  </p>
                  {q.explanation && (
                    <p className="text-gray-400 text-sm">
                      {q.explanation}
                    </p>
                  )}
                </div>
              ))}
            </div>
          )}

          <button
            onClick={onClose}
            className="w-full px-6 py-3 rounded-lg bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-medium hover:from-cyan-600 hover:to-blue-600 transition-all"
          >
            Close
          </button>
        </div>
      </div>
    );
  }

  const currentQ = questions[currentQuestion];
  const isAnswered = selectedAnswer !== null;

  return (
    <div className="fixed inset-0 bg-gray-900/95 flex items-center justify-center p-4 z-50">
      <div className="bg-gray-800 rounded-lg p-8 max-w-2xl w-full">
        <div className="mb-8">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold">Week {weekNumber} Quiz</h2>
            <span className="text-gray-400">
              Question {currentQuestion + 1} of {questions.length}
            </span>
          </div>
          <div className="h-2 bg-gray-700 rounded-full">
            <div
              className="h-full bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full transition-all"
              style={{
                width: `${((currentQuestion + 1) / questions.length) * 100}%`,
              }}
            />
          </div>
        </div>

        <div className="mb-8">
          <h3 className="text-xl mb-4">{currentQ.question}</h3>
          <div className="space-y-3">
            {currentQ.options.map((option) => {
              const isSelected = selectedAnswer === option;
              const isCorrect = option === currentQ.correctAnswer;
              
              return (
                <button
                  key={option}
                  onClick={() => !showExplanation && handleAnswer(option)}
                  disabled={showExplanation}
                  className={`w-full text-left p-4 rounded-lg transition-all ${
                    showExplanation
                      ? isCorrect
                        ? 'bg-green-500/20 text-green-400'
                        : isSelected
                          ? 'bg-red-500/20 text-red-400'
                          : 'bg-gray-700 text-gray-400'
                      : isSelected
                        ? 'bg-cyan-500/20 text-cyan-400'
                        : 'bg-gray-700 hover:bg-gray-600'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span>{option}</span>
                    {showExplanation && (isCorrect || isSelected) && (
                      isCorrect ? (
                        <CheckCircle className="text-green-400" size={18} />
                      ) : (
                        <XCircle className="text-red-400" size={18} />
                      )
                    )}
                  </div>
                </button>
              );
            })}
          </div>

          {showExplanation && currentQ.explanation && (
            <div className="mt-4 p-4 bg-gray-700/50 rounded-lg text-gray-300">
              {currentQ.explanation}
            </div>
          )}
        </div>

        <div className="flex justify-between">
          <button
            onClick={handlePrevious}
            disabled={currentQuestion === 0}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${
              currentQuestion === 0
                ? 'bg-gray-700 text-gray-500 cursor-not-allowed'
                : 'bg-gray-700 hover:bg-gray-600 text-gray-300'
            }`}
          >
            <ChevronLeft size={18} />
            Previous
          </button>

          {showExplanation && (
            <button
              onClick={handleNext}
              className="flex items-center gap-2 px-6 py-2 rounded-lg bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-medium hover:from-cyan-600 hover:to-blue-600 transition-all"
            >
              {currentQuestion === questions.length - 1 ? 'Finish' : 'Next'}
              <ChevronRight size={18} />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Quiz;