import { describe, it } from 'node:test';
import { StringReader } from './string-reader';
import { parseArray } from './parse-array';
import assert from 'node:assert/strict';

describe('parseArray', () => {
  it('should be able to parse array: [1, 2, 3]', function () {
    const input = '[1, 2, 3]';
    const sr = new StringReader(input);
    const out = parseArray(sr);
    assert.equal(out.length, 3);
  });
});
