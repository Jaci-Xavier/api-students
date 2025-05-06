export function getFirstUniqueLetter(name: string): string {
    const letterCount = new Map<string, number>();
    for (const letter of name) {
      letterCount.set(letter, (letterCount.get(letter) || 0) + 1);
    }
    for (const letter of name) {
      if (letterCount.get(letter) === 1) {
        return letter.toUpperCase();
      }
    }
    return '_';
  }
  