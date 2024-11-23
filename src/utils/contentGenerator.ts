import { AgentQLClient } from './agentql';
import { PageAnalyzer, type PageContext } from './pageAnalyzer';
import { queryGemini } from './geminiClient';
import { AGENTQL_API_KEY } from '../config/api';
import type { Resource } from '../types/course';

export interface GeneratedContent {
  title: string;
  description: string;
  content: string;
  type: 'infographic' | 'article' | 'video' | 'exercise';
  metadata: {
    topics: string[];
    difficulty: 'beginner' | 'intermediate' | 'advanced';
    estimatedTime: string;
    prerequisites?: string[];
  };
}

export class ContentGenerator {
  private client: AgentQLClient;
  private pageAnalyzer: typeof PageAnalyzer;

  constructor() {
    this.client = new AgentQLClient(AGENTQL_API_KEY);
    this.pageAnalyzer = PageAnalyzer;
  }

  async generateInfographic(weekNumber: number, topic: string): Promise<GeneratedContent> {
    try {
      // Analyze current page context
      const pageContext = this.pageAnalyzer.analyzeCurrentPage();
      
      // Generate infographic content
      const prompt = `
        Create an infographic for Week ${weekNumber} about "${topic}".
        
        Page Context:
        ${JSON.stringify(pageContext, null, 2)}
        
        Please provide:
        1. A clear title
        2. Key statistics and facts
        3. Visual hierarchy suggestions
        4. Color scheme recommendations
        5. Icon and imagery suggestions
        6. Layout structure
        
        Format the response as a structured infographic design specification.
      `;

      const { content } = await queryGemini(prompt);

      // Extract topics from content
      const topics = this.extractTopics(content);

      return {
        title: `${topic} Infographic - Week ${weekNumber}`,
        description: `Visual guide to ${topic} concepts and best practices`,
        content,
        type: 'infographic',
        metadata: {
          topics,
          difficulty: this.assessDifficulty(content),
          estimatedTime: '5-10 minutes',
          prerequisites: this.extractPrerequisites(content)
        }
      };
    } catch (error) {
      console.error('Error generating infographic:', error);
      throw error;
    }
  }

  async generateWeeklyContent(weekNumber: number): Promise<GeneratedContent[]> {
    try {
      const pageContext = this.pageAnalyzer.analyzeCurrentPage();
      const suggestions = this.pageAnalyzer.suggestContent(pageContext);
      
      const content: GeneratedContent[] = [];

      // Generate content for each suggestion
      for (const suggestion of suggestions) {
        const prompt = `
          Create educational content for Week ${weekNumber} based on this suggestion:
          ${JSON.stringify(suggestion, null, 2)}
          
          Page Context:
          ${JSON.stringify(pageContext, null, 2)}
          
          Please provide:
          1. Detailed content outline
          2. Key learning objectives
          3. Practice exercises
          4. Assessment questions
          
          Format the response as structured educational content.
        `;

        const { content: generatedContent } = await queryGemini(prompt);
        
        content.push({
          title: suggestion.title,
          description: suggestion.description,
          content: generatedContent,
          type: this.mapSuggestionType(suggestion.type),
          metadata: {
            topics: this.extractTopics(generatedContent),
            difficulty: this.assessDifficulty(generatedContent),
            estimatedTime: this.estimateTime(generatedContent),
            prerequisites: this.extractPrerequisites(generatedContent)
          }
        });

        // Respect rate limits
        await new Promise(resolve => setTimeout(resolve, 2000));
      }

      return content;
    } catch (error) {
      console.error('Error generating weekly content:', error);
      throw error;
    }
  }

  private extractTopics(content: string): string[] {
    const topics = new Set<string>();
    
    // Extract topics using simple keyword analysis
    const sentences = content.split(/[.!?]+/);
    sentences.forEach(sentence => {
      const words = sentence.split(/\s+/);
      if (words.length <= 5 && this.isLikelyTopic(sentence)) {
        topics.add(sentence.trim());
      }
    });

    return Array.from(topics);
  }

  private isLikelyTopic(text: string): boolean {
    const topicKeywords = ['how', 'what', 'why', 'understanding', 'guide', 'introduction'];
    const words = text.toLowerCase().split(/\s+/);
    return (
      /^[A-Z]/.test(text) &&
      words.some(word => topicKeywords.includes(word))
    );
  }

  private assessDifficulty(content: string): 'beginner' | 'intermediate' | 'advanced' {
    const complexityIndicators = {
      beginner: ['basic', 'introduction', 'fundamental', 'start'],
      advanced: ['advanced', 'complex', 'expert', 'detailed']
    };

    const contentLower = content.toLowerCase();
    
    if (complexityIndicators.advanced.some(word => contentLower.includes(word))) {
      return 'advanced';
    }
    if (complexityIndicators.beginner.some(word => contentLower.includes(word))) {
      return 'beginner';
    }
    return 'intermediate';
  }

  private estimateTime(content: string): string {
    const words = content.split(/\s+/).length;
    const wordsPerMinute = 200;
    const minutes = Math.ceil(words / wordsPerMinute);
    return `${minutes} minutes`;
  }

  private extractPrerequisites(content: string): string[] {
    const prerequisites = new Set<string>();
    
    const sentences = content.split(/[.!?]+/);
    sentences.forEach(sentence => {
      if (
        sentence.toLowerCase().includes('require') ||
        sentence.toLowerCase().includes('prerequisite') ||
        sentence.toLowerCase().includes('before')
      ) {
        prerequisites.add(sentence.trim());
      }
    });

    return Array.from(prerequisites);
  }

  private mapSuggestionType(type: string): 'infographic' | 'article' | 'video' | 'exercise' {
    switch (type) {
      case 'image':
        return 'infographic';
      case 'document':
        return 'article';
      case 'video':
        return 'video';
      default:
        return 'exercise';
    }
  }
}