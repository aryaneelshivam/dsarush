import { Difficulty, Snippet, Language } from "../types";
import { DEFAULT_SNIPPETS } from "../constants";

// This service now strictly fetches from the static file library
export const generateSnippet = async (topic: string, difficulty: Difficulty, language: Language, subTopic?: string): Promise<Snippet> => {
  // Simulate a brief "thinking" or network delay for UX (feeling of loading)
  await new Promise(resolve => setTimeout(resolve, 200));

  // 1. Filter by Topic and Language
  let filtered = DEFAULT_SNIPPETS.filter(s => s.topic === topic && s.language === language);

  // 2. Filter by SubTopic (Title) if selected
  if (subTopic) {
    const subMatch = filtered.filter(s => s.title === subTopic);
    // If we find exact matches for the subtopic, narrow it down. 
    // Otherwise keep the topic-level matches (fallback).
    if (subMatch.length > 0) {
        filtered = subMatch;
    }
  }

  // 3. Filter by Difficulty
  // We prioritize the selected difficulty, but if no snippet exists for that difficulty
  // within the filtered set, we relax this constraint to avoid empty results.
  const diffMatch = filtered.filter(s => s.difficulty === difficulty);
  
  const candidates = diffMatch.length > 0 ? diffMatch : filtered;

  // 4. Select Result
  if (candidates.length === 0) {
      // Emergency fallback if the topic has absolutely no snippets
      console.warn(`No snippets found for topic: ${topic} in ${language}. Returning default.`);
      // Try to find ANY snippet in that language, else fallback to first default
      const langFallback = DEFAULT_SNIPPETS.find(s => s.language === language);
      return {
        ...(langFallback || DEFAULT_SNIPPETS[0]),
        id: `fallback-${Date.now()}`
      };
  }

  // Pick a random one from the candidates to add variety if there are multiple
  const selectedSnippet = candidates[Math.floor(Math.random() * candidates.length)];

  return {
    ...selectedSnippet,
    // Ensure ID is unique for React keys if the user retries the same snippet
    id: `${selectedSnippet.id}-${Date.now()}`
  };
};