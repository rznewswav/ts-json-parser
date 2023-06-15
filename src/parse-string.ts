import { StringReader } from './string-reader';
import { State } from './state';
import { createValueParser } from './create-value-parser';

const States: Record<string, State> = {
  START: new State([], 'START'),
  QUOTE_START: new State(['"'], 'QUOTE_START'),
  ESCAPE_START: new State(['\\'], 'ESCAPE_START'),
  ESCAPE_END: new State(
    ['"', '\\', '/', 'b', 'f', 'n', 'r', 't'],
    'ESCAPE_END',
  ),
  ESCAPE_UNICODE: new State(['u'], 'ESCAPE_UNICODE'),
  ESCAPE_UNICODE_1: new State(
    '1234567890abcdefABCDEF'.split(''),
    'ESCAPE_UNICODE_1',
  ),
  ESCAPE_UNICODE_2: new State(
    '1234567890abcdefABCDEF'.split(''),
    'ESCAPE_UNICODE_2',
  ),
  ESCAPE_UNICODE_3: new State(
    '1234567890abcdefABCDEF'.split(''),
    'ESCAPE_UNICODE_3',
  ),
  ESCAPE_UNICODE_4: new State(
    '1234567890abcdefABCDEF'.split(''),
    'ESCAPE_UNICODE_4',
  ),
  STRING: new State((char) => char !== '"' && char !== '\\', 'STRING'),
  QUOTE_END: new State(['"'], 'QUOTE_END'),
  END: new State([], 'END'),
};

const nextStates: Record<string, State[]> = {
  START: [States.ESCAPE_START, States.QUOTE_START],
  QUOTE_START: [States.ESCAPE_START, States.STRING],
  ESCAPE_START: [States.ESCAPE_END, States.ESCAPE_UNICODE],
  ESCAPE_END: [States.QUOTE_END, States.ESCAPE_START, States.STRING],
  ESCAPE_UNICODE: [States.ESCAPE_UNICODE_1],
  ESCAPE_UNICODE_1: [States.ESCAPE_UNICODE_2],
  ESCAPE_UNICODE_2: [States.ESCAPE_UNICODE_3],
  ESCAPE_UNICODE_3: [States.ESCAPE_UNICODE_4],
  ESCAPE_UNICODE_4: [States.QUOTE_END, States.ESCAPE_START, States.STRING],
  STRING: [States.QUOTE_END, States.ESCAPE_START, States.STRING],
  QUOTE_END: [States.END],
  END: [],
};

export const parseString = createValueParser(States, nextStates);
