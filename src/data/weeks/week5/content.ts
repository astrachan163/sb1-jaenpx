import type { WeeklyContent } from '../../../types/course';

export const week5Content: WeeklyContent = {
  weekNumber: 5,
  title: "Loss Prevention and Workplace Safety",
  description: "Learn essential loss prevention techniques and workplace safety practices in retail",
  days: {
    Monday: {
      bellringer: {
        question: "What are the main types of retail theft and how can employees help prevent them?",
        type: "quiz",
        options: [
          "Only worry about external theft",
          "Focus on inventory counts alone",
          "Monitor both internal and external threats",
          "Leave prevention to security"
        ],
        correctAnswer: "Monitor both internal and external threats",
        explanation: "Effective loss prevention requires vigilance against both internal and external theft through comprehensive monitoring and prevention strategies."
      },
      activity: {
        title: "Loss Prevention Techniques",
        description: "Learn and practice essential loss prevention strategies",
        instructions: [
          "Identify common theft methods",
          "Practice surveillance techniques",
          "Learn inventory control methods",
          "Review security procedures"
        ]
      },
      resources: [
        {
          title: "Retail Loss Prevention Essentials",
          type: "article",
          url: "https://www.nrf.com/research/national-retail-security-survey-2023",
          description: "Master key loss prevention strategies",
          duration: "20:15",
          keyTakeaways: [
            "Types of retail theft",
            "Prevention strategies",
            "Security systems",
            "Employee vigilance"
          ]
        }
      ]
    },
    Tuesday: {
      bellringer: {
        question: "What are common workplace hazards in retail and how can they be prevented?",
        type: "quiz",
        options: [
          "Ignore minor safety issues",
          "Wait for accidents to happen",
          "Identify and address hazards proactively",
          "Only focus on customer safety"
        ],
        correctAnswer: "Identify and address hazards proactively",
        explanation: "Proactive hazard identification and prevention is key to maintaining a safe workplace."
      },
      activity: {
        title: "Workplace Safety Audit",
        description: "Conduct a safety inspection and develop prevention strategies",
        instructions: [
          "Identify potential hazards",
          "Document safety concerns",
          "Propose solutions",
          "Create action plans"
        ]
      },
      resources: [
        {
          title: "Retail Safety Fundamentals",
          type: "article",
          url: "https://www.osha.gov/retail/safety-health-management",
          description: "Learn essential workplace safety practices",
          duration: "16:30",
          keyTakeaways: [
            "Hazard identification",
            "Prevention strategies",
            "Emergency procedures",
            "Safety regulations"
          ]
        }
      ]
    },
    Wednesday: {
      bellringer: {
        question: "How do you handle ethical dilemmas in retail sales?",
        type: "quiz",
        options: [
          "Ignore ethical concerns",
          "Follow ethical guidelines and seek guidance",
          "Do whatever makes the sale",
          "Leave decisions to others"
        ],
        correctAnswer: "Follow ethical guidelines and seek guidance",
        explanation: "Ethical decision-making requires following established guidelines and seeking appropriate guidance when needed."
      },
      activity: {
        title: "Ethical Decision-Making",
        description: "Practice resolving ethical dilemmas in retail",
        instructions: [
          "Review ethical guidelines",
          "Analyze case studies",
          "Practice decision-making",
          "Discuss solutions"
        ]
      },
      resources: [
        {
          title: "Ethics in Retail Sales",
          type: "article",
          url: "https://www.retailcouncil.org/resources/ethics-in-retail/",
          description: "Understanding ethical sales practices",
          duration: "18:45",
          keyTakeaways: [
            "Ethical principles",
            "Decision-making framework",
            "Common dilemmas",
            "Resolution strategies"
          ]
        }
      ]
    },
    Thursday: {
      bellringer: {
        question: "What career paths are available in retail, and what skills are needed for advancement?",
        type: "quiz",
        options: [
          "Only entry-level positions exist",
          "Multiple paths with varying skill requirements",
          "Management is the only option",
          "No advancement opportunities"
        ],
        correctAnswer: "Multiple paths with varying skill requirements",
        explanation: "Retail offers diverse career paths with opportunities for advancement based on skills and experience."
      },
      activity: {
        title: "Career Path Planning",
        description: "Explore retail career opportunities and development paths",
        instructions: [
          "Research career options",
          "Identify required skills",
          "Create development plans",
          "Set career goals"
        ]
      },
      resources: [
        {
          title: "Retail Career Development",
          type: "article",
          url: "https://www.indeed.com/career-advice/finding-a-job/retail-career-path",
          description: "Explore retail career opportunities",
          duration: "19:30",
          keyTakeaways: [
            "Career paths",
            "Required skills",
            "Advancement opportunities",
            "Professional development"
          ]
        }
      ]
    },
    Friday: {
      bellringer: {
        question: "What strategies help improve performance on the NRF RISE Up exam?",
        type: "quiz",
        options: [
          "Memorize without understanding",
          "Skip practice questions",
          "Use comprehensive study strategies",
          "Rely on last-minute cramming"
        ],
        correctAnswer: "Use comprehensive study strategies",
        explanation: "Success on the exam requires thorough preparation and understanding of the material."
      },
      activity: {
        title: "Exam Preparation",
        description: "Practice exam questions and review key concepts",
        instructions: [
          "Complete practice questions",
          "Review difficult topics",
          "Discuss study strategies",
          "Create study plans"
        ]
      },
      resources: [
        {
          title: "NRF RISE Up Exam Prep",
          type: "article",
          url: "https://nrffoundation.org/riseup/training-partner/customer-service-sales",
          description: "Prepare for the certification exam",
          duration: "22:15",
          keyTakeaways: [
            "Exam format",
            "Key topics",
            "Study strategies",
            "Time management"
          ]
        }
      ]
    }
  },
  quiz: {
    questions: [
      {
        question: "What is the most effective approach to loss prevention?",
        options: [
          "React to incidents as they occur",
          "Implement comprehensive prevention strategies",
          "Rely solely on security systems",
          "Focus only on external theft"
        ],
        correctAnswer: "Implement comprehensive prevention strategies",
        explanation: "Effective loss prevention requires a comprehensive approach combining technology, procedures, and employee vigilance."
      },
      {
        question: "How should ethical dilemmas be handled in retail?",
        options: [
          "Ignore them",
          "Make decisions independently",
          "Follow guidelines and seek guidance",
          "Always choose profitability"
        ],
        correctAnswer: "Follow guidelines and seek guidance",
        explanation: "Ethical dilemmas should be handled by following established guidelines and seeking appropriate guidance."
      }
    ]
  }
};

export default week5Content;