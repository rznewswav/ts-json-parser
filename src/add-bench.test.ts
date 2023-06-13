import { describe, it } from 'node:test';
import { strict as assert } from 'node:assert';
import { add } from './add';

describe('add.ts', function () {
  it('should add number within time', function () {
    const start = performance.now();
    add(2 ** 32, 3 ** 32);
    const end = performance.now();
    const timeTaken = end - start;
    assert.equal(true, timeTaken < 500);
  });
});
