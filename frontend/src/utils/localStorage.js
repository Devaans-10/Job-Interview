const getStorageKey = (userId) => {
  return userId ? `interview_history_${userId}` : 'interview_history';
};
const MAX_HISTORY = 50;

/**
 * Generate a basic UUID
 */
function generateId() {
  return Math.random().toString(36).substring(2, 15) + 
         Math.random().toString(36).substring(2, 15);
}

/**
 * Retrieve all interviews
 */
export function getInterviewHistory(userId = null) {
  try {
    const key = getStorageKey(userId);
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.error('Error reading from local storage', error);
    return [];
  }
}

/**
 * Save a new interview
 */
export function saveInterview(interviewData, userId = null) {
  try {
    const history = getInterviewHistory(userId);
    const key = getStorageKey(userId);
    const newInterview = {
      ...interviewData,
      id: generateId(),
      date: new Date().toISOString()
    };
    
    // Add to beginning of array
    history.unshift(newInterview);
    
    // Keep only the most recent MAX_HISTORY items
    const limitedHistory = history.slice(0, MAX_HISTORY);
    
    localStorage.setItem(key, JSON.stringify(limitedHistory));
    return newInterview;
  } catch (error) {
    console.error('Error saving to local storage', error);
    return null;
  }
}

/**
 * Delete a specific interview
 */
export function deleteInterview(id, userId = null) {
  try {
    const history = getInterviewHistory(userId);
    const updatedHistory = history.filter(item => item.id !== id);
    const key = getStorageKey(userId);
    localStorage.setItem(key, JSON.stringify(updatedHistory));
    return true;
  } catch (error) {
    console.error('Error deleting from local storage', error);
    return false;
  }
}

/**
 * Clear all interview history
 */
export function clearAllHistory(userId = null) {
  try {
    const key = getStorageKey(userId);
    localStorage.removeItem(key);
    return true;
  } catch (error) {
    console.error('Error clearing local storage', error);
    return false;
  }
}

/**
 * Get analytics statistics from history
 */
export function getInterviewStats(userId = null) {
  const history = getInterviewHistory(userId);
  
  if (!history || history.length === 0) {
    return {
      totalInterviews: 0,
      averageScore: 0,
      bestScore: 0,
      mostPracticedRole: 'None',
      scoreTrend: []
    };
  }

  const totalInterviews = history.length;
  
  let totalScore = 0;
  let bestScore = 0;
  const roleCounts = {};
  
  // For score trend, we want chronological order (oldest to newest)
  // History is saved newest first, so we reverse it for the trend
  const chronologicalHistory = [...history].reverse();
  const scoreTrend = chronologicalHistory.map(h => ({
    date: h.date,
    score: h.overallScore || 0
  }));

  history.forEach(item => {
    const score = item.overallScore || 0;
    totalScore += score;
    
    if (score > bestScore) {
      bestScore = score;
    }
    
    const role = item.jobTitle || 'Unknown';
    roleCounts[role] = (roleCounts[role] || 0) + 1;
  });
  
  const averageScore = Number((totalScore / totalInterviews).toFixed(1));
  
  // Find most practiced role
  let mostPracticedRole = 'None';
  let maxCount = 0;
  
  Object.entries(roleCounts).forEach(([role, count]) => {
    if (count > maxCount) {
      maxCount = count;
      mostPracticedRole = role;
    }
  });

  return {
    totalInterviews,
    averageScore,
    bestScore,
    mostPracticedRole,
    scoreTrend
  };
}
