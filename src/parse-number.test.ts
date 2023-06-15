import { describe, it } from 'node:test';
import { StringReader } from './string-reader';
import { parseNumber } from './parse-number';
import assert from 'node:assert/strict';

describe('parseNumber', () => {
  it('should be able to parse "0"', function () {
    const sr = new StringReader('0');
    const out = parseNumber(sr);
    assert.equal(out, sr.input);
  });

  it('should be able to parse "0.541abc"', function () {
    const sr = new StringReader('0.541abc');
    const out = parseNumber(sr);
    assert.equal(out, '0.541');
    assert.equal(sr.hasNext, true);
  });

  it('should be able to parse "-112"', function () {
    const sr = new StringReader('-112');
    const out = parseNumber(sr);
    assert.equal(out, '-112');
    assert.equal(sr.hasNext, false);
  });
});
