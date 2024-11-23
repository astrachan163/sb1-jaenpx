import React, { useState, useMemo } from 'react';
import { Search, ExternalLink, BookOpen, Video, FileText, Link as LinkIcon } from 'lucide-react';

interface Resource {
  title: string;
  category: string;
  type: 'video' | 'article' | 'guide' | 'tool';
  url: string;
  description: string;
  tags: string[];
}

const Resources: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const resources: Resource[] = [
    {
      title: "The Future of Retail - NRF Vision 2024",
      category: "Industry Trends",
      type: "video",
      url: "https://nrf.com/events/nrf-2024-retail-big-show",
      description: "Comprehensive overview of emerging retail trends and technologies from NRF's annual conference.",
      tags: ["trends", "technology", "future", "innovation"]
    },
    {
      title: "Customer Experience in the Digital Age",
      category: "Customer Service",
      type: "video",
      url: "https://www.ted.com/talks/joseph_pine_what_consumers_want",
      description: "Joseph Pine's influential TED talk on authenticity in customer experiences.",
      tags: ["customer experience", "digital", "authenticity"]
    },
    {
      title: "Retail Mathematics Fundamentals",
      category: "Operations",
      type: "guide",
      url: "https://nrf.com/resources/retail-library/retail-math",
      description: "Complete guide to essential retail calculations and financial metrics.",
      tags: ["mathematics", "calculations", "operations"]
    },
    {
      title: "Loss Prevention Best Practices",
      category: "Operations",
      type: "article",
      url: "https://nrf.com/research/national-retail-security-survey-2023",
      description: "Latest research and strategies in retail loss prevention.",
      tags: ["security", "loss prevention", "operations"]
    },
    {
      title: "The Psychology of Selling",
      category: "Sales Techniques",
      type: "video",
      url: "https://www.youtube.com/watch?v=q1a8HF3GKwk",
      description: "Brian Tracy's comprehensive guide to understanding customer psychology.",
      tags: ["sales", "psychology", "customer behavior"]
    }
  ];

  const categories = [...new Set(resources.map(r => r.category))];

  const filteredResources = useMemo(() => {
    return resources.filter(resource => {
      const matchesSearch = 
        resource.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        resource.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        resource.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
      
      const matchesCategory = !selectedCategory || resource.category === selectedCategory;
      
      return matchesSearch && matchesCategory;
    });
  }, [searchTerm, selectedCategory]);

  const getIcon = (type: Resource['type']) => {
    switch (type) {
      case 'video':
        return <Video className="text-cyan-400" size={20} />;
      case 'article':
        return <FileText className="text-cyan-400" size={20} />;
      case 'guide':
        return <BookOpen className="text-cyan-400" size={20} />;
      case 'tool':
        return <LinkIcon className="text-cyan-400" size={20} />;
    }
  };

  return (
    <section className="py-20 px-4">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">
          Learning <span className="bg-gradient-to-r from-cyan-400 to-blue-500 text-transparent bg-clip-text">Resources</span>
        </h2>

        <div className="max-w-2xl mx-auto mb-12 space-y-4">
          {/* Search bar */}
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search resources..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3 rounded-lg bg-gray-800 border border-gray-700 focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-all text-gray-100 placeholder-gray-400"
            />
          </div>

          {/* Category filters */}
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setSelectedCategory(null)}
              className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                !selectedCategory
                  ? 'bg-cyan-500 text-white'
                  : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
              }`}
            >
              All
            </button>
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                  selectedCategory === category
                    ? 'bg-cyan-500 text-white'
                    : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Resources grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredResources.map((resource, index) => (
            <a
              key={index}
              href={resource.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative rounded-lg p-6 bg-gray-800 border border-gray-700 hover:border-cyan-500/20 transition-all"
            >
              <div className="absolute inset-px bg-gradient-to-r from-cyan-500/0 to-blue-500/0 rounded-lg -z-10 group-hover:from-cyan-500/10 group-hover:to-blue-500/10 transition-all"></div>
              
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-2">
                  {getIcon(resource.type)}
                  <span className="px-2 py-1 rounded-full text-xs font-medium bg-cyan-500/10 text-cyan-400">
                    {resource.category}
                  </span>
                </div>
                <ExternalLink className="text-gray-400 group-hover:text-cyan-400 transition-colors" size={18} />
              </div>

              <h3 className="text-lg font-semibold mb-2 group-hover:text-cyan-400 transition-colors">
                {resource.title}
              </h3>
              
              <p className="text-gray-400 text-sm mb-4">
                {resource.description}
              </p>

              <div className="flex flex-wrap gap-2">
                {resource.tags.map((tag, tagIndex) => (
                  <span
                    key={tagIndex}
                    className="px-2 py-1 rounded-full text-xs bg-gray-700/50 text-gray-400"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Resources;