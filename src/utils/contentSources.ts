export const contentSources = {
  video: {
    linkedinLearning: {
      baseUrl: 'https://www.linkedin.com/learning',
      topics: [
        'retail-sales',
        'customer-service',
        'sales-foundations',
        'exam-prep'
      ]
    },
    khanAcademy: {
      baseUrl: 'https://www.khanacademy.org/college-careers-more/career-content',
      topics: [
        'customer-service',
        'career-skills',
        'professional-development'
      ]
    }
  },
  article: {
    nrf: {
      baseUrl: 'https://nrf.com',
      sections: [
        'research',
        'resources',
        'blog',
        'topics'
      ]
    },
    retailCouncil: {
      baseUrl: 'https://www.retailcouncil.org/resources',
      categories: [
        'customer-service',
        'loss-prevention',
        'ethics-in-retail'
      ]
    },
    retailDoc: {
      baseUrl: 'https://www.retaildoc.com/blog',
      categories: [
        'retail-sales-training',
        'customer-service',
        'team-building'
      ]
    }
  },
  document: {
    nrfFoundation: {
      baseUrl: 'https://nrffoundation.org/riseup',
      sections: [
        'certification-guidelines',
        'training-materials',
        'exam-prep'
      ]
    },
    osha: {
      baseUrl: 'https://www.osha.gov/retail',
      sections: [
        'safety-health-management',
        'guidelines',
        'training'
      ]
    }
  }
};

export const getSourceUrl = (type: string, provider: string, topic: string): string => {
  const source = contentSources[type]?.[provider];
  if (!source) {
    throw new Error(`Invalid source type or provider: ${type}/${provider}`);
  }

  const topicList = source.topics || source.sections || source.categories;
  if (!topicList.includes(topic)) {
    throw new Error(`Invalid topic ${topic} for ${provider}`);
  }

  return `${source.baseUrl}/${topic}`;
};