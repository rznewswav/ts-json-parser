import { State } from './state';
import { createValueParser } from './create-value-parser';

export function createKeywordParser(keyword: string) {
  const States: Record<string, State> = {};
  const nextStates: Record<string, State[]> = {};
  States.START = new State([], 'START');
  let currentState = States.START;
  for (let i = 0; i < keyword.length; i++) {
    const char = keyword[i];
    const key = `KEYWORD_${char}_${i}`;
    const state = new State([char], key);
    nextStates[currentState.name] = [state];
    States[key] = state;
    currentState = state;
  }
  States.END = new State([], 'END');
  nextStates[currentState.name] = [States.END];

  return createValueParser(States, nextStates);
}
