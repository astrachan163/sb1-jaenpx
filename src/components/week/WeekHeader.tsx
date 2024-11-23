import React from 'react';

interface WeekHeaderProps {
  weekNumber: number;
  title: string;
  description: string;
}

const WeekHeader: React.FC<WeekHeaderProps> = ({ weekNumber, title, description }) => {
  return (
    <div className="mb-12 text-center">
      <h1 className="text-4xl md:text-5xl font-bold mb-4">
        <span className="bg-gradient-to-r from-cyan-400 to-blue-500 text-transparent bg-clip-text">
          Week {weekNumber}: {title}
        </span>
      </h1>
      <p className="text-gray-300 text-lg max-w-3xl mx-auto">
        {description}
      </p>
    </div>
  );
};

export default WeekHeader;