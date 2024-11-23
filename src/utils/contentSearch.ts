import type { Resource } from '../types/course';
import { weekContent } from '../data/weekContent';
import { SEARCH_BATCH_SIZE, MAX_SEARCH_RESULTS } from '../config/api';

interface IndexedContent {
  type: 'resource' | 'activity' | 'bellringer';
  content: string;
  resource?: Resource;
  week: number;
  day: string;
}

let indexedContent: IndexedContent[] = [];

export const initializeSearch = () => {
  try {
    indexedContent = [];

    // Index all content
    Object.entries(weekContent).forEach(([weekNum, week]) => {
      Object.entries(week.days).forEach(([day, content]) => {
        // Index resources
        content.resources.forEach(resource => {
          const text = `${resource.title} ${resource.description} ${resource.keyTakeaways?.join(' ')}`.toLowerCase();
          indexedContent.push({
            type: 'resource',
            content: text,
            resource,
            week: parseInt(weekNum),
            day
          });
        });

        // Index activities
        const activityText = `${content.activity.title} ${content.activity.description} ${content.activity.instructions.join(' ')}`.toLowerCase();
        indexedContent.push({
          type: 'activity',
          content: activityText,
          week: parseInt(weekNum),
          day
        });

        // Index bellringers
        const bellringerText = `${content.bellringer.question} ${content.bellringer.explanation || ''}`.toLowerCase();
        indexedContent.push({
          type: 'bellringer',
          content: bellringerText,
          week: parseInt(weekNum),
          day
        });
      });
    });
  } catch (error) {
    console.error('Error initializing search:', error);
    throw new Error('Failed to initialize search index');
  }
};

const calculateRelevanceScore = (content: string, query: string): number => {
  try {
    const queryTerms = query.toLowerCase().split(/\s+/);
    let score = 0;

    queryTerms.forEach(term => {
      const count = (content.match(new RegExp(term, 'g')) || []).length;
      score += count;
    });

    return score;
  } catch (error) {
    console.error('Error calculating relevance score:', error);
    return 0;
  }
};

export const searchContent = async (query: string): Promise<Resource[]> => {
  try {
    if (indexedContent.length === 0) {
      initializeSearch();
    }

    const results = new Map<string, { score: number; resource: Resource }>();

    // Process content in batches to avoid blocking
    for (let i = 0; i < indexedContent.length; i += SEARCH_BATCH_SIZE) {
      const batch = indexedContent.slice(i, i + SEARCH_BATCH_SIZE);
      
      batch.forEach(item => {
        if (item.type === 'resource' && item.resource) {
          const score = calculateRelevanceScore(item.content, query);
          if (score > 0) {
            const current = results.get(item.resource.url) || { score: 0, resource: item.resource };
            results.set(item.resource.url, {
              score: current.score + score,
              resource: item.resource
            });
          }
        }
      });

      // Allow other operations to process
      await new Promise(resolve => setTimeout(resolve, 0));
    }

    return Array.from(results.values())
      .sort((a, b) => b.score - a.score)
      .filter(result => result.score > 0)
      .map(result => result.resource)
      .slice(0, MAX_SEARCH_RESULTS);
  } catch (error) {
    console.error('Error searching content:', error);
    throw new Error('Failed to search content');
  }
};