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

export interface DailyContent {
  bellringer: {
    question: string;
    type: 'poll' | 'dragdrop' | 'quiz' | 'text' | 'image';
    options?: string[];
    correctAnswer?: string | string[];
    explanation?: string;
  };
  activity: {
    title: string;
    description: string;
    instructions: string[];
    materials?: string[];
  };
  resources: Resource[];
}

export interface WeeklyContent {
  weekNumber: number;
  title: string;
  description: string;
  days: Record<string, DailyContent>;
  quiz?: {
    questions: {
      question: string;
      options: string[];
      correctAnswer: string;
      explanation?: string;
    }[];
  };
}