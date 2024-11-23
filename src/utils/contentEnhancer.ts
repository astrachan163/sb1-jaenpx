import { queryGemini } from './geminiClient';
import type { Resource } from '../types/course';
import { contentSources } from './contentSources';

export async function enhanceContent(resource: Resource): Promise<Resource> {
  try {
    const prompt = `
    Analyze and enhance this retail training resource:
    Title: ${resource.title}
    Description: ${resource.description}
    Type: ${resource.type}
    
    Please provide:
    1. Additional key takeaways
    2. Practical applications
    3. Discussion questions
    4. Related topics and resources
    `;

    const { content, resources } = await queryGemini(prompt);

    // Parse the enhanced content
    const enhancedResource: Resource = {
      ...resource,
      keyTakeaways: extractKeyTakeaways(content),
      practicalApplications: extractPracticalApplications(content),
      discussionQuestions: extractDiscussionQuestions(content)
    };

    return enhancedResource;
  } catch (error) {
    console.error('Failed to enhance content:', error);
    return resource;
  }
}

function extractKeyTakeaways(content: string): string[] {
  const takeawaysRegex = /Key takeaways?:?\s*((?:[-•*]\s*[^\n]+\n*)+)/i;
  const match = content.match(takeawaysRegex);
  if (!match) return [];
  return match[1]
    .split(/[-•*]\s*/)
    .filter(item => item.trim())
    .map(item => item.trim());
}

function extractPracticalApplications(content: string): string[] {
  const applicationsRegex = /Practical applications?:?\s*((?:[-•*]\s*[^\n]+\n*)+)/i;
  const match = content.match(applicationsRegex);
  if (!match) return [];
  return match[1]
    .split(/[-•*]\s*/)
    .filter(item => item.trim())
    .map(item => item.trim());
}

function extractDiscussionQuestions(content: string): string[] {
  const questionsRegex = /Discussion questions?:?\s*((?:[-•*]\s*[^\n]+\n*)+)/i;
  const match = content.match(questionsRegex);
  if (!match) return [];
  return match[1]
    .split(/[-•*]\s*/)
    .filter(item => item.trim())
    .map(item => item.trim());
}