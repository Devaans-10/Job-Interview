export const mockQuestions = {
  'Software Engineer': [
    {
      id: 1,
      question: 'Tell me about your experience with React',
      followUp: 'What challenges have you faced with state management?',
      category: 'technical'
    },
    {
      id: 2,
      question: 'How do you approach system design for scalable applications?',
      followUp: 'Can you walk me through a recent example?',
      category: 'technical'
    },
    {
      id: 3,
      question: 'Describe your experience with APIs and backend integration',
      followUp: 'How do you handle error scenarios?',
      category: 'technical'
    },
    {
      id: 4,
      question: 'Tell me about a challenging bug you debugged',
      followUp: 'What was your debugging process?',
      category: 'problem-solving'
    },
    {
      id: 5,
      question: 'How do you stay updated with new technologies?',
      followUp: 'Can you give an example of something new you learned?',
      category: 'growth'
    },
    {
      id: 6,
      question: 'Describe your approach to writing clean code',
      followUp: 'What principles do you follow?',
      category: 'technical'
    },
    {
      id: 7,
      question: 'Tell me about a time you worked in a team on a complex project',
      followUp: 'How did you collaborate?',
      category: 'teamwork'
    }
  ],
  'Product Manager': [
    {
      id: 1,
      question: 'How do you define product success?',
      followUp: 'What metrics do you track?',
      category: 'strategy'
    },
    {
      id: 2,
      question: 'Tell me about a product you launched',
      followUp: 'What was the outcome?',
      category: 'experience'
    },
    {
      id: 3,
      question: 'How do you prioritize features for development?',
      followUp: 'Walk me through your process',
      category: 'prioritization'
    },
    {
      id: 4,
      question: 'Describe your approach to user research',
      followUp: 'How do you incorporate findings into decisions?',
      category: 'research'
    },
    {
      id: 5,
      question: 'How do you handle conflicting stakeholder opinions?',
      followUp: 'Can you share an example?',
      category: 'leadership'
    },
    {
      id: 6,
      question: 'Tell me about a failed product or feature',
      followUp: 'What did you learn?',
      category: 'learning'
    },
    {
      id: 7,
      question: 'How do you communicate with engineering teams?',
      followUp: 'How do you handle disagreements?',
      category: 'communication'
    }
  ],
  'Data Scientist': [
    {
      id: 1,
      question: 'Walk me through your approach to a data problem',
      followUp: 'How did you validate your solution?',
      category: 'technical'
    },
    {
      id: 2,
      question: 'Tell me about a machine learning project you built',
      followUp: 'What challenges did you face?',
      category: 'ml'
    },
    {
      id: 3,
      question: 'How do you handle imbalanced datasets?',
      followUp: 'What techniques have you used?',
      category: 'technical'
    },
    {
      id: 4,
      question: 'Describe your experience with statistical analysis',
      followUp: 'Can you give a specific example?',
      category: 'statistics'
    },
    {
      id: 5,
      question: 'How do you communicate insights to non-technical stakeholders?',
      followUp: 'Tell me about a time you did this',
      category: 'communication'
    },
    {
      id: 6,
      question: 'What tools and languages do you use for data work?',
      followUp: 'Why do you prefer these?',
      category: 'tools'
    },
    {
      id: 7,
      question: 'Tell me about a time data contradicted your hypothesis',
      followUp: 'How did you handle it?',
      category: 'problem-solving'
    }
  ]
};

export const generateMockScore = (answer) => {
  // Score based on answer length and quality indicators
  const length = answer.trim().length;
  const hasNumbers = /\d+/.test(answer);
  const hasExamples = /example|project|built|created|implemented|solved/i.test(answer);
  const hasMetrics = /metric|performance|result|outcome|achieved/i.test(answer);
  
  let baseScore = 4;
  if (length > 30) baseScore += 1;
  if (length > 60) baseScore += 1;
  if (length > 100) baseScore += 1;
  if (hasExamples) baseScore += 1;
  if (hasMetrics) baseScore += 0.5;
  if (hasNumbers) baseScore += 0.5;
  
  // Cap at 10, min at 1
  const score = Math.min(10, Math.max(1, baseScore));
  return Math.round(score * 10) / 10;
};

export const generateMockReasoning = (score, answer) => {
  if (score >= 8) return 'Excellent answer with clear examples and metrics';
  if (score >= 6) return 'Good response with relevant details';
  if (score >= 4) return 'Decent answer, could use more specific examples';
  return 'Consider providing more detailed examples';
};

export const generateMockStrengths = (score, answer) => {
  const strengths = [];
  
  if (answer.length > 80) strengths.push('Detailed explanation');
  if (/example|project|built/i.test(answer)) strengths.push('Good use of examples');
  if (/metric|result|achieved/i.test(answer)) strengths.push('Focus on outcomes');
  if (/team|collaborated/i.test(answer)) strengths.push('Team collaboration mindset');
  if (/learn|improved/i.test(answer)) strengths.push('Growth mindset');
  
  return strengths.length > 0 ? strengths : ['Clear communication'];
};

export const generateMockImprovements = (score, answer) => {
  const improvements = [];
  
  if (answer.length < 60) improvements.push('Provide more detailed examples');
  if (!/example|project|built/i.test(answer)) improvements.push('Add specific project examples');
  if (!/metric|result|achieved/i.test(answer)) improvements.push('Quantify your results and impact');
  if (!/learn|improve/i.test(answer)) improvements.push('Show your learning and growth');
  
  return improvements.length > 0 ? improvements : ['Keep practicing!'];
};

export const generateMockTips = (score) => {
  const tips = [];
  
  if (score < 7) {
    tips.push({
      title: 'Add Specific Examples',
      description: 'Use concrete projects or experiences from your work',
      category: 'depth',
      example: 'Instead of "I know React", say "I built 3 React projects including an e-commerce app"'
    });
  }
  
  tips.push({
    title: 'Quantify Your Impact',
    description: 'Use metrics and numbers to show results',
    category: 'depth',
    example: 'Reduced load time by 40% or increased user engagement by 25%'
  });
  
  tips.push({
    title: 'Show Your Process',
    description: 'Explain HOW you solved problems, not just WHAT you solved',
    category: 'clarity',
    example: 'Walk through your debugging approach or design thinking'
  });
  
  if (score < 6) {
    tips.push({
      title: 'Practice Confidence',
      description: 'Speak clearly and avoid filler words (um, uh, like)',
      category: 'confidence',
      example: 'Pause and think before answering rather than talking uncertainly'
    });
  }
  
  tips.push({
    title: 'Ask Clarifying Questions',
    description: 'Show thoughtful engagement by asking follow-up questions',
    category: 'technical',
    example: 'Ask about constraints, scale, or requirements before diving in'
  });
  
  return tips;
};

export const getRandomQuestion = (jobTitle, excludeIds = []) => {
  const questions = mockQuestions[jobTitle] || mockQuestions['Software Engineer'];
  const available = questions.filter(q => !excludeIds.includes(q.id));
  return available[Math.floor(Math.random() * available.length)];
};

export const generateMockSummary = (jobTitle, answers, scores) => {
  const avgScore = (scores.reduce((a, b) => a + b, 0) / scores.length).toFixed(1);
  
  const allStrengths = answers.flatMap((answer, idx) => 
    generateMockStrengths(scores[idx], answer)
  );
  const uniqueStrengths = [...new Set(allStrengths)].slice(0, 3);
  
  const allImprovements = answers.flatMap((answer, idx) => 
    generateMockImprovements(scores[idx], answer)
  );
  const uniqueImprovements = [...new Set(allImprovements)].slice(0, 3);
  
  return {
    overallScore: avgScore,
    strengths: uniqueStrengths.length > 0 ? uniqueStrengths : ['Clear communication', 'Relevant experience'],
    improvements: uniqueImprovements.length > 0 ? uniqueImprovements : ['Add more examples', 'Practice more'],
    feedback: `Great interview! You scored ${avgScore}/10. Focus on adding specific examples and quantifying your impact.`,
    tips: generateMockTips(avgScore)
  };
};
