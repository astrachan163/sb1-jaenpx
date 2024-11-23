import type { WeeklyContent } from '../../../types/course';

export const week3Content: WeeklyContent = {
  weekNumber: 3,
  title: "Professional Development & Communication",
  description: "Develop essential professional skills and master effective communication techniques in retail",
  days: {
    Monday: {
      bellringer: {
        question: "What are some effective service recovery strategies for addressing customer complaints?",
        type: "quiz",
        options: [
          "Ignore the complaint and hope it goes away",
          "Listen, apologize, solve, and thank (L.A.S.T.)",
          "Immediately offer a refund",
          "Transfer to a manager right away"
        ],
        correctAnswer: "Listen, apologize, solve, and thank (L.A.S.T.)",
        explanation: "The L.A.S.T. approach provides a systematic way to handle complaints professionally and effectively."
      },
      activity: {
        title: "Service Recovery Workshop",
        description: "Practice handling customer complaints using the L.A.S.T. technique",
        instructions: [
          "Review the L.A.S.T. technique",
          "Role-play complaint scenarios",
          "Practice active listening",
          "Document resolution strategies"
        ]
      },
      resources: [
        {
          title: "Service Recovery Excellence",
          type: "article",
          url: "https://www.retailcouncil.org/resources/customer-service/handling-complaints/",
          description: "Master the art of turning unhappy customers into loyal advocates",
          duration: "14:30",
          keyTakeaways: [
            "Service recovery principles",
            "L.A.S.T. technique application",
            "Building customer trust",
            "Following up after resolution"
          ]
        }
      ]
    },
    Tuesday: {
      bellringer: {
        question: "How can you use nonverbal communication to enhance customer interactions?",
        type: "quiz",
        options: [
          "Maintain eye contact and open posture",
          "Cross your arms to show authority",
          "Look at your phone while talking",
          "Speak loudly to show confidence"
        ],
        correctAnswer: "Maintain eye contact and open posture",
        explanation: "Positive nonverbal cues like eye contact and open posture help build trust and rapport."
      },
      activity: {
        title: "Nonverbal Communication Practice",
        description: "Learn and practice effective nonverbal communication techniques",
        instructions: [
          "Study positive body language",
          "Practice facial expressions",
          "Role-play customer scenarios",
          "Receive peer feedback"
        ]
      },
      resources: [
        {
          title: "Body Language in Retail",
          type: "article",
          url: "https://www.mindtools.com/pages/article/Body_Language.htm",
          description: "Understanding and using effective nonverbal communication",
          duration: "16:20",
          keyTakeaways: [
            "Reading body language",
            "Professional posture",
            "Facial expressions",
            "Personal space awareness"
          ]
        }
      ]
    },
    Wednesday: {
      bellringer: {
        question: "What makes teamwork effective in a retail environment?",
        type: "quiz",
        options: [
          "Working independently",
          "Clear communication and shared goals",
          "Competing with coworkers",
          "Avoiding responsibility"
        ],
        correctAnswer: "Clear communication and shared goals",
        explanation: "Effective teamwork requires clear communication and alignment on common objectives."
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
          url: "https://www.retaildoc.com/blog/retail-team-building",
          description: "Learn effective techniques for retail team collaboration",
          duration: "19:15",
          keyTakeaways: [
            "Team communication",
            "Conflict resolution",
            "Goal alignment",
            "Supporting colleagues"
          ]
        }
      ]
    },
    Thursday: {
      bellringer: {
        question: "Why is professional image important in retail?",
        type: "quiz",
        options: [
          "To impress management",
          "To build customer trust and confidence",
          "To compete with coworkers",
          "It's not important"
        ],
        correctAnswer: "To build customer trust and confidence",
        explanation: "A professional image helps establish credibility and trust with customers."
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
          url: "https://www.nrf.com/blog/importance-professional-image-retail",
          description: "Master the elements of professional presence",
          duration: "15:45",
          keyTakeaways: [
            "Professional appearance",
            "Business etiquette",
            "Customer perception",
            "Brand representation"
          ]
        }
      ]
    },
    Friday: {
      bellringer: {
        question: "How can you build a loyal customer base?",
        type: "quiz",
        options: [
          "Focus only on sales",
          "Provide consistent excellent service",
          "Offer the lowest prices",
          "Ignore customer feedback"
        ],
        correctAnswer: "Provide consistent excellent service",
        explanation: "Consistent excellent service builds trust and encourages repeat business."
      },
      activity: {
        title: "Customer Loyalty Strategies",
        description: "Develop plans for building customer loyalty",
        instructions: [
          "Analyze successful programs",
          "Create loyalty strategies",
          "Design follow-up systems",
          "Present recommendations"
        ]
      },
      resources: [
        {
          title: "Building Customer Loyalty",
          type: "article",
          url: "https://www.shopify.com/retail/customer-loyalty-program-examples",
          description: "Learn strategies for developing loyal customers",
          duration: "17:30",
          keyTakeaways: [
            "Customer retention",
            "Loyalty programs",
            "Follow-up techniques",
            "Measuring success"
          ]
        }
      ]
    }
  },
  quiz: {
    questions: [
      {
        question: "What's the most important factor in service recovery?",
        options: [
          "Offering refunds",
          "Active listening and empathy",
          "Following procedures",
          "Quick solutions"
        ],
        correctAnswer: "Active listening and empathy",
        explanation: "Active listening and empathy form the foundation of effective service recovery."
      },
      {
        question: "How does professional image impact customer service?",
        options: [
          "It doesn't matter",
          "It builds trust and credibility",
          "It's only about appearance",
          "It impresses management"
        ],
        correctAnswer: "It builds trust and credibility",
        explanation: "A professional image helps establish trust and credibility with customers."
      }
    ]
  }
};

export default week3Content;