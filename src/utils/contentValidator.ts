import type { WeeklyContent, Resource } from '../types/course';

export class ContentValidator {
  private static readonly REQUIRED_RESOURCE_FIELDS = [
    'title',
    'type',
    'url',
    'description',
    'keyTakeaways'
  ];

  private static readonly VALID_RESOURCE_TYPES = [
    'video',
    'article',
    'document',
    'link'
  ];

  private static readonly MIN_DESCRIPTION_LENGTH = 50;
  private static readonly MIN_TAKEAWAYS = 3;
  private static readonly MAX_URL_LENGTH = 200;

  static validateResource(resource: Resource): string[] {
    const errors: string[] = [];

    // Check required fields
    this.REQUIRED_RESOURCE_FIELDS.forEach(field => {
      if (!resource[field]) {
        errors.push(`Missing required field: ${field}`);
      }
    });

    // Validate resource type
    if (!this.VALID_RESOURCE_TYPES.includes(resource.type)) {
      errors.push(`Invalid resource type: ${resource.type}`);
    }

    // Validate URL
    try {
      new URL(resource.url);
      if (resource.url.length > this.MAX_URL_LENGTH) {
        errors.push('URL exceeds maximum length');
      }
    } catch {
      errors.push('Invalid URL format');
    }

    // Validate description length
    if (resource.description.length < this.MIN_DESCRIPTION_LENGTH) {
      errors.push('Description is too short');
    }

    // Validate key takeaways
    if (!resource.keyTakeaways || resource.keyTakeaways.length < this.MIN_TAKEAWAYS) {
      errors.push(`Must have at least ${this.MIN_TAKEAWAYS} key takeaways`);
    }

    return errors;
  }

  static validateWeeklyContent(content: WeeklyContent): string[] {
    const errors: string[] = [];

    // Validate basic structure
    if (!content.weekNumber || !content.title || !content.description || !content.days) {
      errors.push('Missing required weekly content fields');
    }

    // Validate each day
    Object.entries(content.days).forEach(([day, dayContent]) => {
      if (!dayContent.bellringer || !dayContent.activity || !dayContent.resources) {
        errors.push(`Incomplete content for ${day}`);
        return;
      }

      // Validate bellringer
      if (!dayContent.bellringer.question || !dayContent.bellringer.correctAnswer) {
        errors.push(`Invalid bellringer for ${day}`);
      }

      // Validate activity
      if (!dayContent.activity.title || !dayContent.activity.instructions) {
        errors.push(`Invalid activity for ${day}`);
      }

      // Validate resources
      dayContent.resources.forEach((resource, index) => {
        const resourceErrors = this.validateResource(resource);
        if (resourceErrors.length > 0) {
          errors.push(`Invalid resource ${index + 1} for ${day}: ${resourceErrors.join(', ')}`);
        }
      });
    });

    // Validate quiz if present
    if (content.quiz) {
      if (!content.quiz.questions || content.quiz.questions.length === 0) {
        errors.push('Quiz must contain questions');
      }

      content.quiz.questions.forEach((question, index) => {
        if (!question.question || !question.options || !question.correctAnswer) {
          errors.push(`Invalid quiz question ${index + 1}`);
        }
      });
    }

    return errors;
  }

  static validateAllContent(weeklyContents: WeeklyContent[]): Map<number, string[]> {
    const validationResults = new Map<number, string[]>();

    weeklyContents.forEach(content => {
      const errors = this.validateWeeklyContent(content);
      validationResults.set(content.weekNumber, errors);
    });

    return validationResults;
  }
}

export default ContentValidator;