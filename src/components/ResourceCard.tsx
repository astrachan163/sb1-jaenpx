import React, { useState } from 'react';
import { Video, FileText, ExternalLink, ChevronDown, ChevronUp, BookOpen, FileCheck } from 'lucide-react';
import type { Resource } from '../types/course';
import { queryGemini } from '../utils/geminiClient';
import { enhanceContent } from '../utils/contentEnhancer';
import { searchContent } from '../utils/contentSearch';

interface ResourceCardProps {
  resource: Resource;
  onResourceClick: (url: string) => void;
  isCompleted: boolean;
}

interface LearningOption {
  type: 'worksheet' | 'study';
  title: string;
  description: string;
  icon: React.ReactNode;
}

const ResourceCard: React.FC<ResourceCardProps> = ({ resource, onResourceClick, isCompleted }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [showLearningModal, setShowLearningModal] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [generatedContent, setGeneratedContent] = useState<any>(null);

  const learningOptions: LearningOption[] = [
    {
      type: 'worksheet',
      title: 'Practice Worksheet',
      description: 'Generate practice questions, summaries, and related resources',
      icon: <FileCheck className="w-6 h-6 text-cyan-400" />
    },
    {
      type: 'study',
      title: 'Study Session',
      description: 'Create an interactive study guide with key concepts and examples',
      icon: <BookOpen className="w-6 h-6 text-cyan-400" />
    }
  ];

  const handleResourceSelect = async (e: React.MouseEvent) => {
    e.preventDefault();
    setShowLearningModal(true);
  };

  const handleLearningOptionSelect = async (option: LearningOption) => {
    setIsProcessing(true);
    try {
      // First, enhance the content with AI
      const enhancedResource = await enhanceContent(resource);
      
      // Generate learning content based on the selected option
      const prompt = option.type === 'worksheet' 
        ? `Create a comprehensive worksheet for ${resource.title}. Include:
           1. Practice questions with answers
           2. Summary tables of key concepts
           3. Related resources and next steps
           Focus on: ${resource.description}`
        : `Create an interactive study guide for ${resource.title}. Include:
           1. Key concepts and definitions
           2. Real-world examples
           3. Discussion questions
           4. Self-assessment prompts
           Based on: ${resource.description}`;

      const { content, resources: relatedResources } = await queryGemini(prompt);
      
      // Search for additional relevant content
      const supplementaryContent = await searchContent(resource.title);

      setGeneratedContent({
        type: option.type,
        mainContent: content,
        enhancedResource,
        relatedResources,
        supplementaryContent
      });
    } catch (error) {
      console.error('Error generating learning content:', error);
    } finally {
      setIsProcessing(false);
      setShowLearningModal(false);
    }
  };

  const getIcon = () => {
    switch (resource.type) {
      case 'video':
        return <Video className="text-cyan-400" size={20} />;
      case 'article':
        return <FileText className="text-cyan-400" size={20} />;
      default:
        return <ExternalLink className="text-cyan-400" size={20} />;
    }
  };

  return (
    <>
      <div className="bg-gray-800 rounded-lg border border-gray-700 overflow-hidden">
        <button
          onClick={handleResourceSelect}
          className="w-full p-4 text-left hover:bg-gray-700/50 transition-colors"
        >
          <div className="flex items-start gap-3">
            {getIcon()}
            <div>
              <h5 className="font-medium text-gray-100 group-hover:text-cyan-400 transition-colors">
                {resource.title}
              </h5>
              <p className="text-sm text-gray-400 mt-1">{resource.description}</p>
              {resource.duration && (
                <span className="text-xs text-cyan-400 mt-2 inline-block">
                  Duration: {resource.duration}
                </span>
              )}
            </div>
          </div>
        </button>

        {(resource.keyTakeaways || resource.discussionQuestions || resource.practicalApplications) && (
          <>
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="w-full px-4 py-2 flex items-center justify-between border-t border-gray-700 hover:bg-gray-700/50 transition-colors"
            >
              <span className="text-sm text-gray-400">
                {isExpanded ? 'Hide Details' : 'Show Details'}
              </span>
              {isExpanded ? (
                <ChevronUp className="text-gray-400" size={16} />
              ) : (
                <ChevronDown className="text-gray-400" size={16} />
              )}
            </button>

            {isExpanded && (
              <div className="p-4 border-t border-gray-700 space-y-4">
                {resource.keyTakeaways && (
                  <div>
                    <h6 className="text-sm font-medium text-cyan-400 mb-2">Key Takeaways:</h6>
                    <ul className="space-y-1">
                      {resource.keyTakeaways.map((point, index) => (
                        <li key={index} className="text-sm text-gray-300 flex items-start gap-2">
                          <span className="text-cyan-400">•</span>
                          <span>{point}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {resource.discussionQuestions && (
                  <div>
                    <h6 className="text-sm font-medium text-cyan-400 mb-2">Discussion Questions:</h6>
                    <ul className="space-y-1">
                      {resource.discussionQuestions.map((question, index) => (
                        <li key={index} className="text-sm text-gray-300 flex items-start gap-2">
                          <span className="text-cyan-400">•</span>
                          <span>{question}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {resource.practicalApplications && (
                  <div>
                    <h6 className="text-sm font-medium text-cyan-400 mb-2">Practical Applications:</h6>
                    <ul className="space-y-1">
                      {resource.practicalApplications.map((application, index) => (
                        <li key={index} className="text-sm text-gray-300 flex items-start gap-2">
                          <span className="text-cyan-400">•</span>
                          <span>{application}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            )}
          </>
        )}
      </div>

      {/* Learning Options Modal */}
      {showLearningModal && (
        <div className="fixed inset-0 bg-gray-900/95 flex items-center justify-center p-4 z-50">
          <div className="bg-gray-800 rounded-lg p-6 max-w-md w-full">
            <h3 className="text-xl font-semibold mb-4">Choose Learning Format</h3>
            <div className="space-y-4">
              {learningOptions.map((option) => (
                <button
                  key={option.type}
                  onClick={() => handleLearningOptionSelect(option)}
                  disabled={isProcessing}
                  className="w-full p-4 rounded-lg border border-gray-700 hover:border-cyan-500/20 hover:bg-gray-700/50 transition-all flex items-center gap-4"
                >
                  {option.icon}
                  <div className="text-left">
                    <h4 className="font-medium">{option.title}</h4>
                    <p className="text-sm text-gray-400">{option.description}</p>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Generated Content Display */}
      {generatedContent && (
        <div className="mt-4 p-4 bg-gray-800 rounded-lg border border-cyan-500/20">
          <h4 className="text-lg font-semibold mb-4">
            {generatedContent.type === 'worksheet' ? 'Practice Worksheet' : 'Study Guide'}
          </h4>
          <div className="prose prose-invert max-w-none">
            <div className="whitespace-pre-line">{generatedContent.mainContent}</div>
            {/* Additional content sections would be rendered here */}
          </div>
        </div>
      )}
    </>
  );
};

export default ResourceCard;