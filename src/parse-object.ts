import { StringReader } from './string-reader';
import { ExtractedValue, parseValue } from './parse-value';
import { State } from './state';
import { parseString } from './parse-string';

export function parseObject(input: StringReader): {
  [key: string]: ExtractedValue;
} {
  type StateKey =
    | 'START'
    | 'OBJECT_START'
    | 'KEY'
    | 'SEPARATOR'
    | 'VALUE'
    | 'COMMA'
    | 'OBJECT_END'
    | 'END';
  const States: Record<StateKey, State> = {
    START: new State([], 'START'),
    OBJECT_START: new State(['{'], 'OBJECT_START'),
    KEY: new State(['"'], 'KEY'),
    SEPARATOR: new State([':'], 'SEPARATOR'),
    VALUE: new State(StringReader.isValidValueStart, 'VALUE'),
    COMMA: new State([','], 'COMMA'),
    OBJECT_END: new State(['}'], 'OBJECT_END'),
    END: new State([], 'END'),
  };

  const statesToNext: Record<StateKey, State[]> = {
    START: [States.OBJECT_START],
    OBJECT_START: [States.OBJECT_END, States.KEY],
    KEY: [States.SEPARATOR],
    SEPARATOR: [States.VALUE],
    VALUE: [States.OBJECT_END, States.COMMA],
    COMMA: [States.KEY],
    OBJECT_END: [States.END],
    END: [],
  };

  let currentState = States.START;
  let currentKey = '';
  const accumulated: { [key: string]: ExtractedValue } = {};

  do {
    const nextStates = statesToNext[currentState.name as StateKey];
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

    if (currentState === States.OBJECT_START) {
      input.skipWhitespaces();
    }

    if (currentState === States.KEY) {
      input.skipWhitespaces();
      currentKey = parseString(input);
      input.previous();
      input.skipWhitespaces();
    }

    if (currentState === States.VALUE) {
      const extractedValue = parseValue(input);
      accumulated[currentKey] = extractedValue;
      currentKey = '';
      // need to backspace from here
      input.previous();
    }

    input.next();
  } while (currentState !== States.END);

  return accumulated;
}
