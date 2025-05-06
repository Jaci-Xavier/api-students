export function getFirstUniqueLetter(name: string): string {
  const lowerCaseName = name.toLowerCase();
  const letterCount = new Map<string, number>();
  for (const letter of lowerCaseName) {
    letterCount.set(letter, (letterCount.get(letter) || 0) + 1);
  }
  for (const letter of lowerCaseName) {
    if (letterCount.get(letter) === 1) {
      return letter.toUpperCase();
    }
  }
  return '_';
}
