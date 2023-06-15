import { describe, it } from 'node:test';
import { parseValue, ValueType } from './parse-value';
import { StringReader } from './string-reader';
import assert from 'node:assert/strict';

describe('parseValue', () => {
  it('should be able to parse string value', () => {
    const input = '"hello"';
    const sr = new StringReader(input);
    const out = parseValue(sr);
    assert.equal(out.type, ValueType.STRING);
    assert.equal(out.value, input);
  });

  it('should be able to parse string value with whitespace', () => {
    const input = '    "hello"';
    const sr = new StringReader(input);
    const out = parseValue(sr);
    assert.equal(out.type, ValueType.STRING);
    assert.equal(out.value, '"hello"');
  });
});
