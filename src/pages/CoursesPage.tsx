import React from 'react';
import { useNavigate } from 'react-router-dom';
import { BookOpen } from 'lucide-react';
import { weekContent } from '../data/weekContent';

const CoursesPage: React.FC = () => {
  const navigate = useNavigate();

  const courses = [
    {
      id: '1',
      title: 'Customer Service & Sales',
      description: 'Master essential retail skills and customer service techniques.',
      weeks: 6,
      active: true
    }
  ];

  return (
    <div className="min-h-screen pt-20 px-4">
      <div className="max-w-7xl mx-auto py-12">
        <h1 className="text-4xl font-bold mb-8 text-center">
          Available <span className="bg-gradient-to-r from-cyan-400 to-blue-500 text-transparent bg-clip-text">Courses</span>
        </h1>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {courses.map((course) => (
            <div
              key={course.id}
              className="relative group rounded-lg p-6 bg-gray-800 border border-cyan-500/20"
            >
              <BookOpen className="text-cyan-400 mb-4" />
              <h3 className="text-xl font-semibold mb-2">{course.title}</h3>
              <p className="text-gray-400 mb-4">{course.description}</p>
              <p className="text-sm text-gray-500 mb-4">{course.weeks} weeks</p>

              <div className="space-y-4">
                <div className="grid grid-cols-3 gap-2">
                  {Array.from({ length: course.weeks }).map((_, i) => {
                    const weekNum = (i + 1).toString();
                    const weekData = weekContent[weekNum];
                    return (
                      <button
                        key={i}
                        onClick={() => navigate(`/week/${weekNum}`)}
                        className={`px-3 py-2 text-sm rounded transition-all ${
                          weekData
                            ? 'bg-gray-700 hover:bg-cyan-500/20 hover:text-cyan-400'
                            : 'bg-gray-700/50 text-gray-500 cursor-not-allowed'
                        }`}
                        disabled={!weekData}
                      >
                        Week {i + 1}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CoursesPage;