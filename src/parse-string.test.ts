import { describe, it } from 'node:test';
import { StringReader } from './string-reader';
import { parseString } from './parse-string';
import assert from 'node:assert/strict';

describe('parseString', () => {
  it('should be able to parse `"hello"`', function () {
    const sr = new StringReader('"hello"');
    const out = parseString(sr);
    assert.equal(out, sr.input);
  });

  it('should be able to parse `"hello": `', function () {
    const sr = new StringReader('"hello": ');
    const out = parseString(sr);
    assert.equal(out, '"hello"');
    assert.equal(sr.hasNext, true);
  });

  it('should be able to parse `"hello\\u0020"`', function () {
    const sr = new StringReader('"hello\\u0020"');
    const out = parseString(sr);
    assert.equal(out, '"hello\\u0020"');
    assert.equal(sr.hasNext, false);
  });
});
