import React from 'react';
import { BookOpen } from 'lucide-react';

interface LectureContentProps {
  content: {
    title: string;
    sections: {
      heading: string;
      paragraphs: string[];
      keyPoints?: string[];
    }[];
  };
}

const LectureContent: React.FC<LectureContentProps> = ({ content }) => {
  return (
    <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
      <div className="flex items-center gap-3 mb-6">
        <BookOpen className="text-cyan-400" size={24} />
        <h2 className="text-2xl font-bold">{content.title}</h2>
      </div>

      <div className="space-y-8">
        {content.sections.map((section, index) => (
          <div key={index} className="space-y-4">
            <h3 className="text-xl font-semibold text-cyan-400">
              {section.heading}
            </h3>
            
            {section.paragraphs.map((paragraph, pIndex) => (
              <p key={pIndex} className="text-gray-300 leading-relaxed">
                {paragraph}
              </p>
            ))}

            {section.keyPoints && (
              <div className="mt-4 bg-gray-700/50 rounded-lg p-4">
                <h4 className="text-sm font-medium text-cyan-400 mb-2">
                  Key Points:
                </h4>
                <ul className="space-y-2">
                  {section.keyPoints.map((point, pointIndex) => (
                    <li key={pointIndex} className="flex items-start gap-2 text-gray-300">
                      <span className="text-cyan-400 mt-1">•</span>
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default LectureContent;