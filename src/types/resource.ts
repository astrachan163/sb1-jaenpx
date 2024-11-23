export interface Resource {
  title: string;
  type: 'video' | 'article' | 'document' | 'link';
  url: string;
  description: string;
  duration?: string;
  keyTakeaways?: string[];
  discussionQuestions?: string[];
  practicalApplications?: string[];
}