import { StringReader } from './string-reader';
import { ExtractedValue, parseValue } from './parse-value';
import { State } from './state';

export function parseArray(input: StringReader): ExtractedValue[] {
  const States: Record<string, State> = {
    START: new State([], 'START'),
    ARRAY_START: new State(['['], 'ARRAY_START'),
    COMMA: new State([','], 'COMMA'),
    VALUE: new State(StringReader.isValidValueStart, 'VALUE'),
    ARRAY_END: new State([']'], 'ARRAY_END'),
    END: new State([], 'END'),
  };

  const statesToNext: Record<string, State[]> = {
    START: [States.ARRAY_START],
    ARRAY_START: [States.VALUE, States.ARRAY_END],
    COMMA: [States.VALUE],
    VALUE: [States.ARRAY_END, States.COMMA],
    ARRAY_END: [States.END],
  };

  let currentState = States.START;
  let accumulated: ExtractedValue[] = [];
  do {
    const nextStates = statesToNext[currentState.name];
    const nextChar = input.peek;
    const nextState = nextStates.find(
      (e) => e === States.END || e.isMatching(nextChar),
    );
    if (!nextState)
      throw new Error(
        `expecting ` +
          `${nextStates.map((e) => e.name).join(' or ')} ` +
          `but got ${nextChar} instead!`,
      );
    if (nextState === States.END) {
      return accumulated;
    }
    currentState = nextState;

    if (currentState === States.ARRAY_START) {
      input.skipWhitespaces();
    }
    if (currentState === States.VALUE) {
      accumulated.push(parseValue(input));
      // need to backspace from here
      input.previous();
    }

    input.next();
  } while (currentState !== States.END);

  return accumulated;
}
