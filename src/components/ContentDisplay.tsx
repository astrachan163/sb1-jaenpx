import React from 'react';
import { Book, Video, FileText, Activity } from 'lucide-react';
import type { GeneratedContent } from '../utils/contentGenerator';
import ReactMarkdown from 'react-markdown';

interface ContentDisplayProps {
  content: GeneratedContent;
}

const ContentDisplay: React.FC<ContentDisplayProps> = ({ content }) => {
  const getIcon = () => {
    switch (content.type) {
      case 'infographic':
        return <FileText className="text-cyan-400" />;
      case 'video':
        return <Video className="text-cyan-400" />;
      case 'article':
        return <Book className="text-cyan-400" />;
      case 'exercise':
        return <Activity className="text-cyan-400" />;
    }
  };

  return (
    <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
      <div className="flex items-center gap-3 mb-4">
        {getIcon()}
        <div>
          <h3 className="text-xl font-semibold">{content.title}</h3>
          <p className="text-gray-400 text-sm">{content.description}</p>
        </div>
      </div>

      <div className="prose prose-invert max-w-none">
        <ReactMarkdown>{content.content}</ReactMarkdown>
      </div>

      <div className="mt-6 pt-6 border-t border-gray-700">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <h4 className="text-sm font-medium text-gray-400 mb-2">Topics</h4>
            <div className="flex flex-wrap gap-2">
              {content.metadata.topics.map((topic, index) => (
                <span
                  key={index}
                  className="px-2 py-1 text-xs bg-gray-700 text-gray-300 rounded-full"
                >
                  {topic}
                </span>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-sm font-medium text-gray-400 mb-2">Details</h4>
            <div className="space-y-1 text-sm text-gray-300">
              <p>Difficulty: {content.metadata.difficulty}</p>
              <p>Estimated time: {content.metadata.estimatedTime}</p>
            </div>
          </div>
        </div>

        {content.metadata.prerequisites && content.metadata.prerequisites.length > 0 && (
          <div className="mt-4">
            <h4 className="text-sm font-medium text-gray-400 mb-2">Prerequisites</h4>
            <ul className="list-disc list-inside text-sm text-gray-300">
              {content.metadata.prerequisites.map((prereq, index) => (
                <li key={index}>{prereq}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default ContentDisplay;