export type IsCharacterMatching = (char: string) => boolean;

export class State {
  readonly isMatching: IsCharacterMatching;

  constructor(matches: string[] | IsCharacterMatching, readonly name: string) {
    if (Array.isArray(matches)) {
      const matchingSet = new Set(matches);
      this.isMatching = (char: string): boolean => {
        return matchingSet.has(char);
      };
    } else {
      this.isMatching = matches;
    }
  }
}
