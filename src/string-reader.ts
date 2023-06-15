export class StringReader {
  pointer = 0;
  constructor(readonly input: string) {
    this.pointer = 0;
  }

  get hasNext(): boolean {
    return this.pointer < this.input.length;
  }

  next(): string {
    return this.input[this.pointer++];
  }

  readonly whitespaces = new Set(['', '\u0020', '\u000A', '\u000D', '\u0009']);

  skipWhitespaces() {
    while (this.whitespaces.has(this.peek)) {
      this.next();
    }
  }

  get peek(): string {
    return this.input[this.pointer];
  }
}
