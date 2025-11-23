export function getWordCount(text: string): number {
  if (!text) return 0;
  return text.trim().split(/\s+/).length;
}

export function getReadingMinutes(text: string, wordsPerMinute: number = 5): number {
  const wordCount = getWordCount(text);
  return Math.ceil(wordCount / wordsPerMinute);
}