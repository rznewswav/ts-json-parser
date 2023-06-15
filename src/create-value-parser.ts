import { StringReader } from './string-reader';
import { State } from './state';

export function createValueParser(
  States: Record<string, State>,
  statesToNext: Record<string, State[]>,
) {
  return function (input: StringReader): string {
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
  };
}
