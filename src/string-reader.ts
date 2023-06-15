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

  previous(): string {
    return this.input[--this.pointer];
  }

  static readonly whitespaces = new Set([
    '',
    ' ',
    '\u0020',
    '\u000A',
    '\u000D',
    '\u0009',
  ]);

  static readonly valueStart = new Set([
    '',
    ' ',
    '\u0020',
    '\u000A',
    '\u000D',
    '\u0009',
    '"',
    '-',
    '0',
    '1',
    '2',
    '3',
    '4',
    '5',
    '6',
    '7',
    '8',
    '9',
    '{',
    '[',
    't',
    'f',
    'n',
  ]);

  static isValidValueStart(char: string) {
    return StringReader.valueStart.has(char);
  }

  skipWhitespaces() {
    while (StringReader.whitespaces.has(this.peek)) {
      this.next();
    }
  }

  get peek(): string {
    return this.input[this.pointer];
  }

  slice() {
    return this.input.substring(this.pointer, this.input.length);
  }
}
