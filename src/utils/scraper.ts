import { AgentQLClient } from './agentql';
import { retailQueries } from './queries';
import { AGENTQL_API_KEY } from '../config/api';

export interface ScrapedResource {
  title: string;
  type: 'video' | 'article' | 'document' | 'link';
  url: string;
  description: string;
  keyTakeaways?: string[];
  duration?: string;
  discussionQuestions?: string[];
  practicalApplications?: string[];
}

export class ContentScraper {
  private client: AgentQLClient;

  constructor() {
    this.client = new AgentQLClient(AGENTQL_API_KEY);
  }

  async scrapeContent(): Promise<ScrapedResource[]> {
    try {
      const sources = [
        {
          url: 'https://www.retailcouncil.org/resources',
          query: retailQueries.resources
        },
        {
          url: 'https://retail.fandom.com/wiki/Retail',
          query: retailQueries.articles
        }
      ];

      const results = await this.client.batchQuery(sources);
      let resources: ScrapedResource[] = [];

      results.forEach((result, index) => {
        const items = [
          ...(result.data.resources || []),
          ...(result.data.articles || [])
        ];

        const processedItems = items.map(item => ({
          title: this.sanitizeText(item.title || 'Retail Resource'),
          type: this.determineResourceType(item),
          url: item.link || sources[index].url,
          description: this.extractDescription(item),
          keyTakeaways: this.extractKeyPoints(item),
          duration: this.estimateReadingTime(item),
          discussionQuestions: this.generateDiscussionQuestions(item),
          practicalApplications: this.extractPracticalApplications(item)
        }));

        resources = [...resources, ...processedItems];
      });

      return resources;
    } catch (error) {
      console.error('Scraping error:', error);
      throw error;
    }
  }

  private sanitizeText(text: string): string {
    return text.trim().replace(/\s+/g, ' ');
  }

  private determineResourceType(item: any): ScrapedResource['type'] {
    if (item.type?.toLowerCase().includes('video')) return 'video';
    if (item.type?.toLowerCase().includes('pdf')) return 'document';
    if (item.link || item.url) return 'link';
    return 'article';
  }

  private extractDescription(item: any): string {
    return this.sanitizeText(
      item.description ||
      item.summary ||
      item.content?.slice(0, 200) ||
      'No description available'
    );
  }

  private extractKeyPoints(item: any): string[] {
    const content = item.content || item.description || '';
    return content
      .split(/[.!?]+/)
      .filter(s => s.trim().length > 20)
      .slice(0, 3)
      .map(s => this.sanitizeText(s));
  }

  private estimateReadingTime(item: any): string {
    const content = item.content || item.description || '';
    const wordsPerMinute = 200;
    const words = content.trim().split(/\s+/).length;
    return `${Math.ceil(words / wordsPerMinute)} min read`;
  }

  private generateDiscussionQuestions(item: any): string[] {
    const content = item.content || item.description || '';
    return content
      .split(/[.!?]+/)
      .filter(s => s.includes('how') || s.includes('why'))
      .slice(0, 2)
      .map(s => `${this.sanitizeText(s)}?`);
  }

  private extractPracticalApplications(item: any): string[] {
    const content = item.content || item.description || '';
    return content
      .split(/[.!?]+/)
      .filter(s => s.includes('can') || s.includes('should') || s.includes('will'))
      .slice(0, 2)
      .map(s => this.sanitizeText(s));
  }
}