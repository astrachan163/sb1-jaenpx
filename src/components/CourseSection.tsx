import React from 'react';
import { BookOpen, CheckCircle } from 'lucide-react';

const CourseSection: React.FC = () => {
  const courses = [
    {
      title: 'Customer Service & Sales',
      description: 'Master essential retail skills and customer service techniques.',
      progress: 75,
      active: true
    },
    {
      title: 'Business Software Applications',
      description: 'Learn key business software tools and applications.',
      progress: 0,
      active: false
    },
    {
      title: 'Accounting Fundamentals',
      description: 'Understand basic accounting principles and practices.',
      progress: 0,
      active: false
    }
  ];

  return (
    <section className="py-20 px-4 bg-gray-800/50">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">
          Available <span className="bg-gradient-to-r from-cyan-400 to-blue-500 text-transparent bg-clip-text">Courses</span>
        </h2>

        <div className="grid md:grid-cols-3 gap-8">
          {courses.map((course, index) => (
            <div 
              key={index}
              className={`relative group rounded-lg p-6 transition-all
                ${course.active 
                  ? 'bg-gray-800 border border-cyan-500/20' 
                  : 'bg-gray-800/50 border border-gray-700'
                }`}
            >
              {course.active && (
                <div className="absolute inset-px bg-gradient-to-r from-cyan-500/10 to-blue-500/10 rounded-lg -z-10"></div>
              )}

              <div className="flex items-start justify-between mb-4">
                <BookOpen className={course.active ? 'text-cyan-400' : 'text-gray-500'} />
                {course.progress > 0 && (
                  <span className="text-sm text-cyan-400">{course.progress}%</span>
                )}
              </div>

              <h3 className="text-xl font-semibold mb-2">{course.title}</h3>
              <p className="text-gray-400 mb-4">{course.description}</p>

              {course.progress > 0 ? (
                <div className="h-1 bg-gray-700 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full transition-all"
                    style={{ width: `${course.progress}%` }}
                  ></div>
                </div>
              ) : (
                <button 
                  className={`w-full px-4 py-2 rounded-md transition-all
                    ${course.active
                      ? 'bg-gradient-to-r from-cyan-500 to-blue-500 text-white hover:from-cyan-600 hover:to-blue-600'
                      : 'bg-gray-700 text-gray-400 cursor-not-allowed'
                    }`}
                  disabled={!course.active}
                >
                  {course.active ? 'Start Course' : 'Coming Soon'}
                </button>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CourseSection;