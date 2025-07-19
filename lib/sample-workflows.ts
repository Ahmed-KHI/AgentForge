// Sample luxury workflows for AgentForge Demo

export const luxuryWorkflows = {
  financialAdvisor: {
    name: "Elite Investment Advisor",
    description: "AI-powered investment advisory system for high-net-worth clients",
    nodes: 8,
    expectedROI: "$47.2K",
    accuracy: "94.7%",
    executionTime: "2.3s",
    cost: "$0.12",
    features: [
      "Real-time market analysis",
      "Risk assessment algorithms", 
      "Portfolio optimization",
      "Regulatory compliance checks"
    ]
  },
  
  customerService: {
    name: "Premium Customer Experience",
    description: "Luxury brand customer service automation with human-like empathy",
    nodes: 12,
    expectedROI: "$89.5K",
    accuracy: "97.2%", 
    executionTime: "1.8s",
    cost: "$0.08",
    features: [
      "Sentiment analysis",
      "Personalized responses",
      "Escalation management",
      "Multi-language support"
    ]
  },
  
  contentCreation: {
    name: "Executive Content Suite",
    description: "AI content creation for C-suite communications and marketing",
    nodes: 15,
    expectedROI: "$124.8K",
    accuracy: "91.4%",
    executionTime: "3.1s", 
    cost: "$0.18",
    features: [
      "Brand voice consistency",
      "SEO optimization", 
      "Multi-platform adaptation",
      "Performance analytics"
    ]
  },

  businessIntelligence: {
    name: "Strategic Intelligence Engine",
    description: "Advanced analytics for executive decision making",
    nodes: 20,
    expectedROI: "$234.7K", 
    accuracy: "96.8%",
    executionTime: "4.2s",
    cost: "$0.25",
    features: [
      "Predictive modeling",
      "Competitive analysis",
      "Market trend forecasting", 
      "Executive dashboards"
    ]
  }
};

export const nodeTemplates = {
  prompt: {
    icon: "🧠",
    color: "purple",
    description: "AI reasoning and natural language processing"
  },
  api: {
    icon: "🔌",
    color: "blue", 
    description: "External service integrations and data fetching"
  },
  decision: {
    icon: "⚡",
    color: "amber",
    description: "Conditional logic and workflow branching"
  },
  output: {
    icon: "📊",
    color: "emerald",
    description: "Results generation and data export"
  },
  data: {
    icon: "💾",
    color: "cyan",
    description: "Data processing and transformation"
  },
  webhook: {
    icon: "🔗",
    color: "pink",
    description: "Real-time notifications and triggers"
  }
};
