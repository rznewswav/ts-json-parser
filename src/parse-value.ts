import { StringReader } from './string-reader';
import { parseString } from './parse-string';
import { parseNumber } from './parse-number';
import {
  parseKeywordFalse,
  parseKeywordNull,
  parseKeywordTrue,
} from './parse-keywords';

export enum ValueType {
  STRING = 'STRING',
  NUMBER = 'NUMBER',
  OBJECT = 'OBJECT',
  ARRAY = 'ARRAY',
  TRUE = 'TRUE',
  FALSE = 'FALSE',
  NULL = 'NULL',
}

export type ExtractedValue = { type: ValueType; value: string };

export function parseValue(sr: StringReader): ExtractedValue {
  sr.skipWhitespaces();
  let detected: ExtractedValue;

  switch (sr.peek) {
    case '"':
      detected = {
        type: ValueType.STRING,
        value: parseString(sr),
      };
      break;
    case '-':
    case '0':
    case '1':
    case '2':
    case '3':
    case '4':
    case '5':
    case '6':
    case '7':
    case '8':
    case '9':
      detected = {
        type: ValueType.NUMBER,
        value: parseNumber(sr),
      };
      break;
    case '{':
      throw new Error('not yet supported: object');
    case '[':
      throw new Error('not yet supported: array');
    case 't':
      detected = {
        type: ValueType.TRUE,
        value: parseKeywordTrue(sr),
      };
      break;
    case 'f':
      detected = {
        type: ValueType.FALSE,
        value: parseKeywordFalse(sr),
      };
      break;
    case 'n':
      detected = {
        type: ValueType.NULL,
        value: parseKeywordNull(sr),
      };
      break;
    default:
      throw new Error(`expecting value start but got ${sr.peek} instead!`);
  }

  sr.skipWhitespaces();
  return detected;
}
