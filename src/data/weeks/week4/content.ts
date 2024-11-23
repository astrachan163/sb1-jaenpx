import type { WeeklyContent } from '../../../types/course';

export const week4Content: WeeklyContent = {
  weekNumber: 4,
  title: "Advanced Customer Service Skills",
  description: "Master advanced customer service techniques and develop professional skills for retail success",
  days: {
    Monday: {
      bellringer: {
        question: "What makes an effective team in retail? How can individual team members contribute to overall success?",
        type: "quiz",
        options: [
          "Working independently without coordination",
          "Effective communication and shared goals",
          "Competing with team members",
          "Following orders without questions"
        ],
        correctAnswer: "Effective communication and shared goals",
        explanation: "Successful retail teams rely on clear communication, shared objectives, and collaborative effort."
      },
      activity: {
        title: "Team Building Exercise",
        description: "Practice collaborative problem-solving and communication",
        instructions: [
          "Form diverse teams",
          "Complete team challenges",
          "Practice active listening",
          "Share feedback constructively"
        ]
      },
      resources: [
        {
          title: "Building Strong Retail Teams",
          type: "article",
          url: "https://www.retaildoc.com/blog/retail-team-building-activities",
          description: "Learn effective techniques for retail team collaboration",
          duration: "19:15",
          keyTakeaways: [
            "Team communication strategies",
            "Conflict resolution techniques",
            "Goal alignment methods",
            "Supporting team members"
          ]
        }
      ]
    },
    Tuesday: {
      bellringer: {
        question: "Why is maintaining a professional image important in retail? How does it impact customer trust?",
        type: "quiz",
        options: [
          "It only matters to management",
          "It builds customer trust and credibility",
          "It's not important in retail",
          "It only affects employee morale"
        ],
        correctAnswer: "It builds customer trust and credibility",
        explanation: "A professional image helps establish credibility and trust with customers, leading to better business relationships."
      },
      activity: {
        title: "Professional Image Workshop",
        description: "Learn and practice professional presentation skills",
        instructions: [
          "Review dress code guidelines",
          "Practice professional greetings",
          "Role-play customer interactions",
          "Discuss workplace etiquette"
        ]
      },
      resources: [
        {
          title: "Professional Image in Retail",
          type: "article",
          url: "https://www.nrf.com/blog/retail-professionalism",
          description: "Master the elements of professional presence",
          duration: "15:45",
          keyTakeaways: [
            "Professional appearance standards",
            "Business etiquette essentials",
            "Customer perception management",
            "Brand representation"
          ]
        }
      ]
    },
    Wednesday: {
      bellringer: {
        question: "How can you build and maintain customer loyalty? What role does follow-up play?",
        type: "quiz",
        options: [
          "Focus only on sales numbers",
          "Build genuine relationships and follow up",
          "Offer the lowest prices",
          "Ignore customer feedback"
        ],
        correctAnswer: "Build genuine relationships and follow up",
        explanation: "Customer loyalty is built through genuine relationships, consistent follow-up, and excellent service."
      },
      activity: {
        title: "Customer Loyalty Program Design",
        description: "Create a customer loyalty program",
        instructions: [
          "Research successful loyalty programs",
          "Design program structure",
          "Create engagement strategies",
          "Plan implementation steps"
        ]
      },
      resources: [
        {
          title: "Building Customer Loyalty",
          type: "article",
          url: "https://www.shopify.com/retail/customer-loyalty-strategies",
          description: "Learn strategies for developing loyal customers",
          duration: "17:30",
          keyTakeaways: [
            "Loyalty program design",
            "Customer engagement strategies",
            "Follow-up techniques",
            "Measuring success"
          ]
        }
      ]
    },
    Thursday: {
      bellringer: {
        question: "How does body language impact customer interactions? Give examples of positive and negative nonverbal cues.",
        type: "quiz",
        options: [
          "Body language doesn't matter",
          "Only facial expressions matter",
          "Nonverbal cues significantly impact communication",
          "Verbal communication is all that matters"
        ],
        correctAnswer: "Nonverbal cues significantly impact communication",
        explanation: "Nonverbal communication plays a crucial role in how customers perceive and interact with retail staff."
      },
      activity: {
        title: "Nonverbal Communication Workshop",
        description: "Practice effective nonverbal communication",
        instructions: [
          "Learn positive body language",
          "Practice facial expressions",
          "Role-play scenarios",
          "Receive peer feedback"
        ]
      },
      resources: [
        {
          title: "Power of Nonverbal Communication",
          type: "article",
          url: "https://www.mindtools.com/pages/article/body-language-retail.htm",
          description: "Master nonverbal communication in retail",
          duration: "16:20",
          keyTakeaways: [
            "Body language basics",
            "Facial expression impact",
            "Personal space awareness",
            "Cultural considerations"
          ]
        }
      ]
    },
    Friday: {
      bellringer: {
        question: "What are effective strategies for service recovery? How can you turn a negative experience positive?",
        type: "quiz",
        options: [
          "Ignore the complaint",
          "Blame others",
          "Listen, apologize, solve, and thank (L.A.S.T.)",
          "Offer refunds immediately"
        ],
        correctAnswer: "Listen, apologize, solve, and thank (L.A.S.T.)",
        explanation: "The L.A.S.T. approach provides a systematic way to handle service recovery effectively."
      },
      activity: {
        title: "Service Recovery Role-Play",
        description: "Practice handling service recovery situations",
        instructions: [
          "Review L.A.S.T. technique",
          "Practice active listening",
          "Role-play scenarios",
          "Provide constructive feedback"
        ]
      },
      resources: [
        {
          title: "Service Recovery Excellence",
          type: "article",
          url: "https://www.retailcouncil.org/resources/customer-service/service-recovery/",
          description: "Learn effective service recovery techniques",
          duration: "18:45",
          keyTakeaways: [
            "Service recovery principles",
            "Customer complaint handling",
            "Problem resolution strategies",
            "Follow-up procedures"
          ]
        }
      ]
    }
  },
  quiz: {
    questions: [
      {
        question: "What is the most important factor in service recovery?",
        options: [
          "Offering immediate refunds",
          "Active listening and empathy",
          "Following procedures strictly",
          "Escalating to management"
        ],
        correctAnswer: "Active listening and empathy",
        explanation: "Active listening and empathy form the foundation of effective service recovery."
      },
      {
        question: "How does professional image impact customer service?",
        options: [
          "It doesn't matter",
          "It builds trust and credibility",
          "It only affects employee morale",
          "It's only about appearance"
        ],
        correctAnswer: "It builds trust and credibility",
        explanation: "A professional image helps establish trust and credibility with customers."
      }
    ]
  }
};

export default week4Content;