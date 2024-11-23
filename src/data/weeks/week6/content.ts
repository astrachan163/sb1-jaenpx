import type { WeeklyContent } from '../../../types/course';

export const week6Content: WeeklyContent = {
  weekNumber: 6,
  title: "Final Exam Preparation",
  description: "Comprehensive review and preparation for the NRF RISE Up certification exam",
  days: {
    Monday: {
      bellringer: {
        question: "What are your strengths and areas for improvement in the NRF RISE Up content?",
        type: "quiz",
        options: [
          "Skip self-assessment",
          "Focus only on strengths",
          "Identify both strengths and weaknesses",
          "Study random topics"
        ],
        correctAnswer: "Identify both strengths and weaknesses",
        explanation: "Effective exam preparation requires honest assessment of both strengths and areas needing improvement."
      },
      activity: {
        title: "Study Plan Development",
        description: "Create personalized study strategies",
        instructions: [
          "Assess current knowledge",
          "Identify key topics",
          "Create study schedule",
          "Set specific goals"
        ]
      },
      resources: [
        {
          title: "Effective Study Strategies",
          type: "video",
          url: "https://www.linkedin.com/learning/learning-study-strategies/welcome",
          description: "Learn proven study techniques from LinkedIn Learning experts",
          duration: "15:30",
          keyTakeaways: [
            "Study planning",
            "Time management",
            "Review techniques",
            "Self-assessment"
          ],
          discussionQuestions: [
            "How can you adapt these study techniques to your learning style?",
            "Which strategy do you think will be most effective for you?"
          ]
        }
      ]
    },
    Tuesday: {
      bellringer: {
        question: "Which exam topics require additional review?",
        type: "quiz",
        options: [
          "Skip difficult topics",
          "Review all topics equally",
          "Focus on challenging areas",
          "Study only easy topics"
        ],
        correctAnswer: "Focus on challenging areas",
        explanation: "Prioritizing challenging topics while maintaining overall review is most effective."
      },
      activity: {
        title: "Topic Review Sessions",
        description: "Comprehensive review of key exam topics",
        instructions: [
          "Review core concepts",
          "Practice sample questions",
          "Discuss challenging topics",
          "Clarify misconceptions"
        ]
      },
      resources: [
        {
          title: "Customer Service Excellence",
          type: "video",
          url: "https://www.khanacademy.org/college-careers-more/career-content/career-skills-and-exploration/customer-service",
          description: "Khan Academy's comprehensive guide to customer service excellence",
          duration: "25:45",
          keyTakeaways: [
            "Core concepts",
            "Key terminology",
            "Important principles",
            "Application scenarios"
          ],
          practicalApplications: [
            "Role-play customer interactions",
            "Practice problem-solving scenarios"
          ]
        }
      ]
    },
    Wednesday: {
      bellringer: {
        question: "What test-taking strategies are most effective?",
        type: "quiz",
        options: [
          "Rush through questions",
          "Skip difficult questions",
          "Use systematic approach",
          "Guess randomly"
        ],
        correctAnswer: "Use systematic approach",
        explanation: "A systematic approach to test-taking improves accuracy and time management."
      },
      activity: {
        title: "Test-Taking Strategies",
        description: "Practice effective exam techniques",
        instructions: [
          "Learn time management",
          "Practice question analysis",
          "Apply elimination strategies",
          "Review answer techniques"
        ]
      },
      resources: [
        {
          title: "Mastering Multiple Choice Questions",
          type: "video",
          url: "https://www.linkedin.com/learning/exam-prep-strategies/mastering-multiple-choice",
          description: "Expert strategies for multiple choice exams",
          duration: "18:15",
          keyTakeaways: [
            "Time management",
            "Question analysis",
            "Answer strategies",
            "Stress management"
          ],
          discussionQuestions: [
            "How can you apply these strategies to the NRF exam?",
            "What stress management techniques work best for you?"
          ]
        }
      ]
    },
    Thursday: {
      bellringer: {
        question: "How can you best prepare for exam day?",
        type: "quiz",
        options: [
          "Cram all night",
          "Skip breakfast",
          "Follow a preparation routine",
          "Arrive late"
        ],
        correctAnswer: "Follow a preparation routine",
        explanation: "A well-planned preparation routine helps ensure optimal performance on exam day."
      },
      activity: {
        title: "Final Review Session",
        description: "Comprehensive exam preparation",
        instructions: [
          "Review key concepts",
          "Practice sample questions",
          "Discuss strategies",
          "Plan exam day routine"
        ]
      },
      resources: [
        {
          title: "Retail Sales Techniques - Final Review",
          type: "video",
          url: "https://www.linkedin.com/learning/retail-sales-foundations/welcome",
          description: "Comprehensive review of retail sales techniques",
          duration: "16:45",
          keyTakeaways: [
            "Pre-exam routine",
            "Mental preparation",
            "Physical readiness",
            "Success strategies"
          ],
          practicalApplications: [
            "Create a personal exam day checklist",
            "Practice time management strategies"
          ]
        }
      ]
    },
    Friday: {
      bellringer: {
        question: "What is your exam day strategy?",
        type: "quiz",
        options: [
          "Wing it",
          "Follow prepared plan",
          "Skip breakfast",
          "Arrive unprepared"
        ],
        correctAnswer: "Follow prepared plan",
        explanation: "Following a well-prepared plan helps ensure optimal exam performance."
      },
      activity: {
        title: "NRF RISE Up Final Exam",
        description: "Complete certification examination",
        instructions: [
          "Review instructions carefully",
          "Manage time effectively",
          "Apply learned strategies",
          "Complete all sections"
        ]
      },
      resources: [
        {
          title: "Final Exam Guidelines",
          type: "document",
          url: "https://nrffoundation.org/riseup/certification-guidelines",
          description: "Official exam instructions and guidelines",
          keyTakeaways: [
            "Exam format",
            "Time limits",
            "Scoring system",
            "Certification process"
          ],
          practicalApplications: [
            "Review exam format and requirements",
            "Practice time management strategies"
          ]
        }
      ]
    }
  },
  quiz: {
    questions: [
      {
        question: "What is the most effective exam preparation strategy?",
        options: [
          "Last-minute cramming",
          "Systematic review and practice",
          "Studying only easy topics",
          "Skipping difficult questions"
        ],
        correctAnswer: "Systematic review and practice",
        explanation: "Systematic review and practice leads to better understanding and retention."
      },
      {
        question: "How should you approach exam day?",
        options: [
          "Skip preparation routine",
          "Arrive just in time",
          "Follow planned strategy",
          "Study new material"
        ],
        correctAnswer: "Follow planned strategy",
        explanation: "Following a planned strategy helps maintain focus and reduce stress during the exam."
      }
    ]
  }
};

export default week6Content;