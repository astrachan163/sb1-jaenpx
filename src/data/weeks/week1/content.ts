import type { WeeklyContent } from '../../../types/course';

export const week1Content: WeeklyContent = {
  weekNumber: 1,
  title: "Retail Fundamentals",
  description: "Introduction to retail concepts, customer service, and sales fundamentals",
  days: {
    Monday: {
      bellringer: {
        question: "What are the key differences between brick-and-mortar, online, and omnichannel retailing? How do these channels impact customer experience and business operations?",
        type: "quiz",
        options: [
          "They all offer the same experience",
          "Online is always better than brick-and-mortar",
          "Each channel has unique advantages and challenges",
          "Omnichannel is just a buzzword"
        ],
        correctAnswer: "Each channel has unique advantages and challenges",
        explanation: "Different retail channels serve different customer needs and preferences. Understanding their unique characteristics helps provide better customer service."
      },
      activity: {
        title: "Retail Channel Analysis",
        description: "Compare and contrast different retail channels through group discussion and presentation",
        instructions: [
          "Form groups of 3-4 students",
          "Analyze assigned retail channel (brick-and-mortar, online, or omnichannel)",
          "Research real-world examples",
          "Present findings to class"
        ]
      },
      resources: [
        {
          title: "Understanding Retail Channels",
          type: "video",
          url: "https://www.nrf.com/topics/customer-experience",
          description: "Overview of different retail channels and their characteristics",
          duration: "15:45",
          keyTakeaways: [
            "Different types of retail channels",
            "Advantages and disadvantages of each channel",
            "Impact on customer experience",
            "Future trends in retail"
          ]
        }
      ]
    },
    Tuesday: {
      bellringer: {
        question: "Describe the five stages of the consumer decision-making process. How can a salesperson influence customer behavior at each stage?",
        type: "quiz",
        options: [
          "Need recognition, information search, evaluation, purchase, post-purchase",
          "Awareness, interest, desire, action, loyalty",
          "Search, compare, decide, buy, return",
          "Browse, shop, purchase, use, review"
        ],
        correctAnswer: "Need recognition, information search, evaluation, purchase, post-purchase",
        explanation: "Understanding the customer decision journey helps salespeople provide better service at each stage."
      },
      activity: {
        title: "Customer Journey Mapping",
        description: "Create visual maps of customer journeys through different retail experiences",
        instructions: [
          "Map out customer touchpoints",
          "Identify opportunities for engagement",
          "Consider social media influence",
          "Present journey maps to class"
        ]
      },
      resources: [
        {
          title: "Customer Journey Mapping 101",
          type: "video",
          url: "https://www.ispringsolutions.com/blog/role-playing-scenarios-for-customer-service-training",
          description: "Learn how to create effective customer journey maps",
          duration: "12:30",
          keyTakeaways: [
            "Understanding customer touchpoints",
            "Mapping the customer journey",
            "Identifying pain points",
            "Improving customer experience"
          ]
        }
      ]
    },
    Wednesday: {
      bellringer: {
        question: "How does the retail industry contribute to the local and national economy?",
        type: "quiz",
        options: [
          "Only through sales tax revenue",
          "Through jobs, tax revenue, and economic growth",
          "By selling imported products",
          "Through online sales only"
        ],
        correctAnswer: "Through jobs, tax revenue, and economic growth",
        explanation: "Retail contributes to the economy through multiple channels including employment, tax revenue, and stimulating economic activity."
      },
      activity: {
        title: "Economic Impact Analysis",
        description: "Research and analyze the economic impact of retail in your local community",
        instructions: [
          "Research local retail statistics",
          "Interview local retail business owners",
          "Create an impact report",
          "Present findings to class"
        ]
      },
      resources: [
        {
          title: "Retail's Impact on the Economy",
          type: "article",
          url: "https://nrf.com/insights/economy/state-retail",
          description: "Understanding retail's role in economic growth",
          keyTakeaways: [
            "Job creation in retail",
            "Economic multiplier effects",
            "Tax revenue generation",
            "Community development"
          ]
        }
      ]
    },
    Thursday: {
      bellringer: {
        question: "Why is product knowledge crucial for providing excellent customer service?",
        type: "quiz",
        options: [
          "To memorize product specifications",
          "To help customers make informed decisions",
          "To sell the most expensive items",
          "To compete with other salespeople"
        ],
        correctAnswer: "To help customers make informed decisions",
        explanation: "Product knowledge enables sales associates to match products with customer needs and provide valuable guidance."
      },
      activity: {
        title: "Product Knowledge Challenge",
        description: "Interactive game testing product knowledge and presentation skills",
        instructions: [
          "Research assigned products",
          "Create product presentations",
          "Practice FAB technique",
          "Role-play sales scenarios"
        ]
      },
      resources: [
        {
          title: "Mastering Product Knowledge",
          type: "video",
          url: "https://www.retaildoc.com/blog/retail-sales-training-5-things-product-knowledge",
          description: "Learn effective techniques for building and maintaining product knowledge",
          duration: "18:20",
          keyTakeaways: [
            "Research techniques",
            "Organization methods",
            "Presentation skills",
            "Continuous learning"
          ]
        }
      ]
    },
    Friday: {
      bellringer: {
        question: "What are the key elements of an effective sales presentation?",
        type: "quiz",
        options: [
          "Speaking quickly and using technical terms",
          "Building rapport and understanding needs",
          "Focusing only on product features",
          "Offering the lowest price"
        ],
        correctAnswer: "Building rapport and understanding needs",
        explanation: "Effective sales presentations start with building rapport and understanding customer needs before discussing solutions."
      },
      activity: {
        title: "Sales Pitch Competition",
        description: "Practice delivering effective sales presentations",
        instructions: [
          "Prepare product presentations",
          "Incorporate FAB approach",
          "Practice handling objections",
          "Receive peer feedback"
        ]
      },
      resources: [
        {
          title: "Sales Presentation Mastery",
          type: "video",
          url: "https://www.salesforce.com/resources/guides/sales-pitch-examples/",
          description: "Learn techniques for delivering compelling sales presentations",
          duration: "22:15",
          keyTakeaways: [
            "Building rapport",
            "Needs assessment",
            "Feature-advantage-benefit",
            "Closing techniques"
          ]
        }
      ]
    }
  },
  quiz: {
    questions: [
      {
        question: "What is the most effective way to build rapport with customers?",
        options: [
          "Talk about yourself",
          "Listen actively and show genuine interest",
          "Offer immediate discounts",
          "Use technical jargon"
        ],
        correctAnswer: "Listen actively and show genuine interest",
        explanation: "Active listening and genuine interest help build trust and understanding with customers."
      },
      {
        question: "Which retail channel offers the best customer experience?",
        options: [
          "Brick-and-mortar only",
          "Online only",
          "It depends on customer needs and preferences",
          "Social media only"
        ],
        correctAnswer: "It depends on customer needs and preferences",
        explanation: "The best channel varies based on individual customer needs, preferences, and shopping context."
      }
    ]
  }
};

export default week1Content;