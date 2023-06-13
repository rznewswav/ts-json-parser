import { describe, it } from 'node:test';
import { strict as assert } from 'node:assert';
import { add } from './add';

describe('add.ts', function () {
  it('should add number', function () {
    const expected = 5;
    const actual = add(2, 3);
    assert.equal(actual, expected);
  });
});
