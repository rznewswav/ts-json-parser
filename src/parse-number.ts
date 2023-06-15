import { StringReader } from './string-reader';
import { State } from './state';

export function parseNumber(input: StringReader): string {
  const States = {
    START: new State([], 'START'),
    MINUS: new State(['-'], 'MINUS'),
    ZERO: new State(['0'], 'ZERO'),
    ONE_NINE: new State('123456789'.split(''), 'ONE_NINE'),
    DIGIT_TO_FRAC_EXP_END: new State(
      '1234567890'.split(''),
      'DIGIT_TO_FRAC_EXP_END',
    ),
    DOT: new State(['.'], 'DOT'),
    DIGIT_TO_EXP_END: new State('1234567890'.split(''), 'DIGIT_TO_EXP_END'),
    E_UPPER: new State(['E'], 'E_UPPER'),
    E_LOWER: new State(['e'], 'E_LOWER'),
    MINUS_AFTER_E: new State(['-'], 'MINUS_AFTER_E'),
    PLUS_AFTER_E: new State(['+'], 'PLUS_AFTER_E'),
    DIGIT_LAST_END: new State('1234567890'.split(''), 'DIGIT_LAST_END'),
    END: new State([], 'END'),
  };

  const statesToNext: Record<string, State[]> = {
    START: [States.MINUS, States.ZERO],
    MINUS: [States.ZERO, States.ONE_NINE],
    ZERO: [States.DOT, States.E_LOWER, States.E_UPPER, States.END],
    ONE_NINE: [
      States.DIGIT_TO_FRAC_EXP_END,
      States.DOT,
      States.E_LOWER,
      States.E_UPPER,
      States.END,
    ],
    DIGIT_TO_FRAC_EXP_END: [
      States.DIGIT_TO_FRAC_EXP_END,
      States.DOT,
      States.E_LOWER,
      States.E_UPPER,
      States.END,
    ],
    DOT: [States.DIGIT_TO_EXP_END, States.E_LOWER, States.E_UPPER, States.END],
    DIGIT_TO_EXP_END: [
      States.DIGIT_TO_EXP_END,
      States.E_LOWER,
      States.E_UPPER,
      States.END,
    ],
    E_UPPER: [States.MINUS_AFTER_E, States.PLUS_AFTER_E, States.DIGIT_LAST_END],
    E_LOWER: [States.MINUS_AFTER_E, States.PLUS_AFTER_E, States.DIGIT_LAST_END],
    MINUS_AFTER_E: [States.DIGIT_LAST_END],
    PLUS_AFTER_E: [States.DIGIT_LAST_END],
    DIGIT_LAST_END: [States.END],
  };

  let currentState = States.START;
  let accumulated = '';
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
          `while parsing ${accumulated} but got ${nextChar} instead!`,
      );
    if (nextState === States.END) {
      return accumulated;
    }
    accumulated += nextChar ?? '';
    currentState = nextState;
    input.next();
  } while (currentState !== States.END);

  return accumulated;
}
