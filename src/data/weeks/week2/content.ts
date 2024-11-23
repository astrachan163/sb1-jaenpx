import type { WeeklyContent } from '../../../types/course';

export const week2Content: WeeklyContent = {
  weekNumber: 2,
  title: "Customer Service Excellence",
  description: "Master the art of exceptional customer service and learn how to handle various customer interactions professionally",
  days: {
    Monday: {
      bellringer: {
        question: "A customer wants to purchase a $50 item with a 20% discount and a $10 coupon. Calculate the final price, including 6% sales tax.",
        type: "quiz",
        options: [
          "$34.98",
          "$35.98",
          "$37.10",
          "$38.20"
        ],
        correctAnswer: "$37.10",
        explanation: "Original price ($50) - 20% discount ($10) - coupon ($10) = $30 + 6% tax ($1.80) = $37.10"
      },
      activity: {
        title: "Sales Calculation Challenge",
        description: "Practice calculating discounts, taxes, and final prices",
        instructions: [
          "Complete sample calculations",
          "Work in pairs to check answers",
          "Present solutions to class",
          "Discuss common mistakes"
        ]
      },
      resources: [
        {
          title: "Retail Math Basics",
          type: "video",
          url: "https://www.retaildoc.com/retail-sales-training",
          description: "Learn essential retail math calculations",
          duration: "10:15",
          keyTakeaways: [
            "Calculating discounts",
            "Adding sales tax",
            "Making change",
            "Unit pricing"
          ]
        }
      ]
    },
    Tuesday: {
      bellringer: {
        question: "What's the most effective way to handle an angry customer?",
        type: "quiz",
        options: [
          "Argue back to defend yourself",
          "Listen actively and show empathy",
          "Transfer them to a manager immediately",
          "Offer a refund right away"
        ],
        correctAnswer: "Listen actively and show empathy",
        explanation: "Active listening and empathy help de-escalate situations and show customers you care about their concerns."
      },
      activity: {
        title: "Conflict Resolution Scenarios",
        description: "Practice handling difficult customer situations through role-play",
        instructions: [
          "Review common conflict scenarios",
          "Practice de-escalation techniques",
          "Implement feedback from peers",
          "Document best practices"
        ]
      },
      resources: [
        {
          title: "Mastering Customer Service Recovery",
          type: "video",
          url: "https://www.retailcouncil.org/resources/customer-service/",
          description: "Learn effective techniques for turning angry customers into loyal advocates",
          duration: "15:45",
          keyTakeaways: [
            "De-escalation strategies",
            "Service recovery process",
            "Building customer loyalty through problem resolution"
          ]
        }
      ]
    },
    Wednesday: {
      bellringer: {
        question: "Which communication style is most effective in retail?",
        type: "quiz",
        options: [
          "Passive",
          "Aggressive",
          "Assertive",
          "Passive-aggressive"
        ],
        correctAnswer: "Assertive",
        explanation: "Assertive communication allows you to be direct and professional while respecting both yourself and others."
      },
      activity: {
        title: "Communication Styles Workshop",
        description: "Practice different communication styles and their impact",
        instructions: [
          "Identify communication styles",
          "Practice assertive techniques",
          "Role-play customer interactions",
          "Receive peer feedback"
        ]
      },
      resources: [
        {
          title: "Effective Retail Communication",
          type: "video",
          url: "https://www.mindtools.com/pages/article/retail-customer-service.htm",
          description: "Master the art of professional retail communication",
          duration: "17:20",
          keyTakeaways: [
            "Verbal and non-verbal communication",
            "Professional language choices",
            "Building rapport with customers"
          ]
        }
      ]
    },
    Thursday: {
      bellringer: {
        question: "What's the key to successful upselling?",
        type: "quiz",
        options: [
          "Push expensive items aggressively",
          "Understand customer needs",
          "Offer every available add-on",
          "Focus on quantity over quality"
        ],
        correctAnswer: "Understand customer needs",
        explanation: "Successful upselling comes from understanding customer needs and suggesting relevant solutions."
      },
      activity: {
        title: "Upselling Techniques",
        description: "Learn and practice effective upselling strategies",
        instructions: [
          "Study successful upselling examples",
          "Practice needs-based selling",
          "Create value propositions",
          "Role-play sales scenarios"
        ]
      },
      resources: [
        {
          title: "The Art of Consultative Selling",
          type: "video",
          url: "https://www.salesforce.com/resources/articles/consultative-selling/",
          description: "Learn how to sell through consultation and needs analysis",
          duration: "20:15",
          keyTakeaways: [
            "Needs assessment techniques",
            "Value-based selling",
            "Building long-term relationships"
          ]
        }
      ]
    },
    Friday: {
      bellringer: {
        question: "What's most important in building customer loyalty?",
        type: "quiz",
        options: [
          "Low prices",
          "Consistent experience",
          "Rewards programs",
          "Product selection"
        ],
        correctAnswer: "Consistent experience",
        explanation: "Consistent, positive experiences build trust and keep customers coming back."
      },
      activity: {
        title: "Loyalty Building Strategies",
        description: "Develop strategies for building long-term customer relationships",
        instructions: [
          "Analyze successful loyalty programs",
          "Create engagement strategies",
          "Design follow-up processes",
          "Plan retention campaigns"
        ]
      },
      resources: [
        {
          title: "Building Customer Loyalty",
          type: "video",
          url: "https://www.shopify.com/retail/customer-loyalty-program-examples",
          description: "Learn how to create lasting customer relationships",
          duration: "16:40",
          keyTakeaways: [
            "Loyalty program design",
            "Customer engagement strategies",
            "Measuring customer lifetime value"
          ]
        }
      ]
    }
  },
  quiz: {
    questions: [
      {
        question: "What's the first step in handling a customer complaint?",
        options: [
          "Offer a solution immediately",
          "Listen actively without interrupting",
          "Explain company policy",
          "Call a manager"
        ],
        correctAnswer: "Listen actively without interrupting",
        explanation: "Active listening shows respect and helps fully understand the customer's concern."
      },
      {
        question: "Which approach is best for building customer loyalty?",
        options: [
          "Focusing only on sales",
          "Building genuine relationships",
          "Offering the lowest prices",
          "Having the largest selection"
        ],
        correctAnswer: "Building genuine relationships",
        explanation: "Genuine relationships create emotional connections that drive long-term loyalty."
      }
    ]
  }
};

export default week2Content;