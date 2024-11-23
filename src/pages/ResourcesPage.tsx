import React, { useState } from 'react';
import { Search, ExternalLink } from 'lucide-react';

const ResourcesPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const resources = [
    {
      title: 'NRF RISE Up Official Guide',
      category: 'Documentation',
      url: 'https://nrffoundation.org/riseup',
      description: 'Official documentation and study materials from NRF.'
    },
    {
      title: 'Customer Service Best Practices',
      category: 'Article',
      url: 'https://www.nrf.com/topics/customer-experience',
      description: 'Learn the essential skills for exceptional customer service.'
    },
    {
      title: 'Retail Sales Techniques',
      category: 'Video',
      url: 'https://nrffoundation.org/training',
      description: 'Video tutorial on effective retail sales strategies.'
    }
  ];

  const filteredResources = resources.filter(resource =>
    resource.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    resource.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    resource.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen pt-20 px-4">
      <div className="max-w-7xl mx-auto py-12">
        <h1 className="text-4xl font-bold mb-12 text-center">
          Learning <span className="bg-gradient-to-r from-cyan-400 to-blue-500 text-transparent bg-clip-text">Resources</span>
        </h1>

        <div className="max-w-2xl mx-auto mb-12">
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
        </div>

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
                <span className="px-3 py-1 rounded-full text-xs font-medium bg-cyan-500/10 text-cyan-400">
                  {resource.category}
                </span>
                <ExternalLink className="text-gray-400 group-hover:text-cyan-400 transition-colors" size={18} />
              </div>

              <h3 className="text-lg font-semibold mb-2 group-hover:text-cyan-400 transition-colors">
                {resource.title}
              </h3>
              
              <p className="text-gray-400 text-sm">
                {resource.description}
              </p>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ResourcesPage;