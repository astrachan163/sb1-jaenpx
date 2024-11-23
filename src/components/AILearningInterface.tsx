import React, { useState, useEffect } from 'react';
import { Book, Video, FileText, MessageCircle, Loader, ChevronRight, RefreshCw } from 'lucide-react';
import { queryGemini } from '../utils/geminiClient';
import { searchContent, initializeSearch } from '../utils/contentSearch';
import type { Resource } from '../types/course';

interface LearningFormat {
  id: string;
  title: string;
  icon: React.ReactNode;
  description: string;
}

const learningFormats: LearningFormat[] = [
  {
    id: 'video',
    title: 'Video Learning',
    icon: <Video className="w-6 h-6" />,
    description: 'Watch curated video content with guided explanations'
  },
  {
    id: 'reading',
    title: 'Reading Materials',
    icon: <Book className="w-6 h-6" />,
    description: 'Study through comprehensive written materials and articles'
  },
  {
    id: 'interactive',
    title: 'Interactive Exercises',
    icon: <MessageCircle className="w-6 h-6" />,
    description: 'Practice with hands-on exercises and quizzes'
  },
  {
    id: 'summary',
    title: 'Quick Summary',
    icon: <FileText className="w-6 h-6" />,
    description: 'Get a concise overview of key concepts'
  }
];

const AILearningInterface: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [summary, setSummary] = useState<string>('');
  const [resources, setResources] = useState<Resource[]>([]);
  const [selectedFormat, setSelectedFormat] = useState<string>('');
  const [generatedContent, setGeneratedContent] = useState<string>('');
  const [error, setError] = useState<string>('');

  useEffect(() => {
    // Initialize search index when component mounts
    initializeSearch();
  }, []);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchTerm.trim()) {
      setError('Please enter a search term');
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      // Search for relevant resources
      const foundResources = await searchContent(searchTerm);
      
      if (foundResources.length === 0) {
        setError('No resources found for your search term. Please try different keywords.');
        setSummary('');
        setResources([]);
        return;
      }

      setResources(foundResources);

      // Generate summary using Gemini
      const prompt = `
        Analyze and summarize these retail training resources:
        ${foundResources.map(r => `
          Title: ${r.title}
          Description: ${r.description}
          Type: ${r.type}
        `).join('\n')}

        Provide a concise summary highlighting:
        1. Main concepts
        2. Key learning objectives
        3. Practical applications
      `;

      const { content } = await queryGemini(prompt);
      setSummary(content);
      setSelectedFormat('');
      setGeneratedContent('');
    } catch (error) {
      console.error('Error searching content:', error);
      setError('An error occurred while searching. Please try again.');
      setSummary('');
      setResources([]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleFormatSelect = async (formatId: string) => {
    if (!summary) {
      setError('Please search for content first');
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      const prompt = `
        Transform this content into ${formatId} format:
        ${summary}

        Resources:
        ${resources.map(r => r.title).join(', ')}

        Create engaging ${formatId}-based learning content that includes:
        ${formatId === 'video' ? '- Video script outline\n- Key timestamps\n- Visual descriptions' : ''}
        ${formatId === 'reading' ? '- Article sections\n- Examples\n- Case studies' : ''}
        ${formatId === 'interactive' ? '- Practice exercises\n- Discussion questions\n- Role-play scenarios' : ''}
        ${formatId === 'summary' ? '- Bullet points\n- Quick reference guide\n- Memory aids' : ''}
      `;

      const { content } = await queryGemini(prompt);
      setSelectedFormat(formatId);
      setGeneratedContent(content);
    } catch (error) {
      console.error('Error generating content:', error);
      setError('An error occurred while generating content. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen pt-20 px-4">
      <div className="max-w-4xl mx-auto py-12 space-y-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold mb-4">
            AI Learning <span className="bg-gradient-to-r from-cyan-400 to-blue-500 text-transparent bg-clip-text">Assistant</span>
          </h2>
          <p className="text-gray-400">Search for any retail training topic to get personalized learning content</p>
        </div>

        <form onSubmit={handleSearch} className="flex gap-4">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="What would you like to learn about?"
            className="flex-1 p-3 rounded-lg bg-gray-800 border border-gray-700 text-gray-100 placeholder-gray-400 focus:outline-none focus:border-cyan-500"
            disabled={isLoading}
          />
          <button
            type="submit"
            disabled={isLoading}
            className="px-6 py-3 rounded-lg bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-medium hover:from-cyan-600 hover:to-blue-600 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? <Loader className="w-5 h-5 animate-spin" /> : 'Search'}
          </button>
        </form>

        {error && (
          <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-lg">
            <p className="text-red-400">{error}</p>
          </div>
        )}

        {summary && (
          <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
            <h3 className="text-xl font-semibold mb-4">Content Summary</h3>
            <p className="text-gray-300 whitespace-pre-line">{summary}</p>
            
            <div className="mt-6">
              <h4 className="text-lg font-semibold mb-4">Choose Your Learning Format</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {learningFormats.map((format) => (
                  <button
                    key={format.id}
                    onClick={() => handleFormatSelect(format.id)}
                    className={`p-4 rounded-lg border transition-all ${
                      selectedFormat === format.id
                        ? 'border-cyan-500 bg-cyan-500/10'
                        : 'border-gray-700 hover:border-cyan-500/20 hover:bg-gray-700/50'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className="text-cyan-400">{format.icon}</div>
                      <div className="text-left">
                        <h5 className="font-semibold text-gray-100">{format.title}</h5>
                        <p className="text-sm text-gray-400">{format.description}</p>
                      </div>
                      <ChevronRight className="ml-auto text-gray-400" size={16} />
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {generatedContent && (
          <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-semibold">Generated Learning Content</h3>
              <button
                onClick={() => handleFormatSelect(selectedFormat)}
                className="p-2 text-gray-400 hover:text-cyan-400 rounded-full transition-colors"
                title="Regenerate content"
              >
                <RefreshCw size={18} />
              </button>
            </div>
            <div className="prose prose-invert max-w-none">
              <div className="whitespace-pre-line text-gray-300">{generatedContent}</div>
            </div>
          </div>
        )}

        {resources.length > 0 && (
          <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
            <h3 className="text-xl font-semibold mb-4">Additional Resources</h3>
            <div className="space-y-4">
              {resources.map((resource, index) => (
                <a
                  key={index}
                  href={resource.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block p-4 rounded-lg border border-gray-700 hover:border-cyan-500/20 hover:bg-gray-700/50 transition-colors group"
                >
                  <h4 className="font-semibold text-cyan-400 group-hover:text-cyan-300">{resource.title}</h4>
                  <p className="text-gray-400 text-sm mt-1">{resource.description}</p>
                </a>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AILearningInterface;