import { describe, it } from 'node:test';
import { StringReader } from './string-reader';
import { parseObject } from './parse-object';
import assert from 'node:assert/strict';

describe('parseObject', () => {
  it('should be able to parse object: {"hello": 1 }', function () {
    const input = '{"hello": 1 }';
    const sr = new StringReader(input);
    const out = parseObject(sr);
    assert.equal('"hello"' in out, true);
  });
});
