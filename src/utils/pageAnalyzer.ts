import type { Resource } from '../types/course';

export interface PageContext {
  title: string;
  content: string;
  headings: string[];
  links: string[];
  codeBlocks: string[];
  images: string[];
}

export interface ContentSuggestion {
  type: 'video' | 'article' | 'document' | 'link';
  title: string;
  description: string;
  reason: string;
  priority: 'high' | 'medium' | 'low';
}

export class PageAnalyzer {
  private static readonly HEADING_SELECTORS = 'h1, h2, h3, h4, h5, h6';
  private static readonly CODE_SELECTORS = 'pre, code';
  private static readonly CONTENT_SELECTORS = 'p, li, td, th, div:not(:empty)';

  static analyzeCurrentPage(): PageContext {
    return {
      title: this.getPageTitle(),
      content: this.getPageContent(),
      headings: this.getHeadings(),
      links: this.getLinks(),
      codeBlocks: this.getCodeBlocks(),
      images: this.getImages()
    };
  }

  static suggestContent(context: PageContext): ContentSuggestion[] {
    const suggestions: ContentSuggestion[] = [];
    const topics = this.extractTopics(context);

    // Analyze missing content types
    if (!context.images.length) {
      suggestions.push({
        type: 'image',
        title: 'Visual Learning Resources',
        description: 'Add diagrams or infographics to illustrate key concepts',
        reason: 'No visual content found on page',
        priority: 'high'
      });
    }

    if (!context.codeBlocks.length && this.containsTechnicalContent(context)) {
      suggestions.push({
        type: 'document',
        title: 'Technical Documentation',
        description: 'Add code examples and technical specifications',
        reason: 'Technical content without implementation details',
        priority: 'high'
      });
    }

    // Analyze content depth
    topics.forEach(topic => {
      if (this.isTopicShallow(topic, context)) {
        suggestions.push({
          type: 'article',
          title: `Deep Dive: ${topic}`,
          description: `Comprehensive guide about ${topic}`,
          reason: 'Topic needs more detailed explanation',
          priority: 'medium'
        });
      }
    });

    return suggestions;
  }

  private static getPageTitle(): string {
    const titleElement = document.querySelector('h1');
    return titleElement?.textContent?.trim() || document.title;
  }

  private static getPageContent(): string {
    const contentElements = document.querySelectorAll(this.CONTENT_SELECTORS);
    return Array.from(contentElements)
      .map(el => el.textContent?.trim())
      .filter(Boolean)
      .join('\n');
  }

  private static getHeadings(): string[] {
    const headings = document.querySelectorAll(this.HEADING_SELECTORS);
    return Array.from(headings)
      .map(heading => heading.textContent?.trim())
      .filter(Boolean);
  }

  private static getLinks(): string[] {
    const links = document.querySelectorAll('a[href]');
    return Array.from(links)
      .map(link => link.getAttribute('href'))
      .filter(Boolean) as string[];
  }

  private static getCodeBlocks(): string[] {
    const codeBlocks = document.querySelectorAll(this.CODE_SELECTORS);
    return Array.from(codeBlocks)
      .map(block => block.textContent?.trim())
      .filter(Boolean);
  }

  private static getImages(): string[] {
    const images = document.querySelectorAll('img[src]');
    return Array.from(images)
      .map(img => img.getAttribute('src'))
      .filter(Boolean) as string[];
  }

  private static extractTopics(context: PageContext): string[] {
    const topics = new Set<string>();
    
    // Extract from headings
    context.headings.forEach(heading => {
      const words = heading.split(/\s+/);
      if (words.length <= 3) {
        topics.add(heading);
      }
    });

    // Extract from content using NLP-like approach
    const sentences = context.content.split(/[.!?]+/);
    sentences.forEach(sentence => {
      const words = sentence.split(/\s+/);
      if (words.length <= 5 && this.isLikelyTopic(sentence)) {
        topics.add(sentence.trim());
      }
    });

    return Array.from(topics);
  }

  private static isLikelyTopic(text: string): boolean {
    // Simple heuristic: starts with capital letter, contains relevant keywords
    const topicKeywords = ['how', 'what', 'why', 'understanding', 'guide', 'introduction'];
    const words = text.toLowerCase().split(/\s+/);
    return (
      /^[A-Z]/.test(text) &&
      words.some(word => topicKeywords.includes(word))
    );
  }

  private static isTopicShallow(topic: string, context: PageContext): boolean {
    const topicMentions = (context.content.match(new RegExp(topic, 'gi')) || []).length;
    return topicMentions < 3;
  }

  private static containsTechnicalContent(context: PageContext): boolean {
    const technicalKeywords = ['code', 'function', 'api', 'implementation', 'example'];
    return technicalKeywords.some(keyword => 
      context.content.toLowerCase().includes(keyword)
    );
  }
}