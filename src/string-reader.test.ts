import { describe, it } from 'node:test';
import { StringReader } from './string-reader';
import assert from 'node:assert/strict';

describe('StringReader', () => {
  it('should be able to read all chars from string', function () {
    const sample = 'abcdef';
    const sr = new StringReader(sample);
    assert.equal(sr.next(), sample[0]);
    assert.equal(sr.next(), sample[1]);
    assert.equal(sr.next(), sample[2]);
    assert.equal(sr.next(), sample[3]);
    assert.equal(sr.next(), sample[4]);
    assert.equal(sr.next(), sample[5]);
    assert.equal(sr.next(), undefined);
  });

  it('should return hasNext correctly', function () {
    const sample = 'abcdef';
    const sr = new StringReader(sample);
    let limit = sample.length;
    let nextCount = 0;
    while (sr.hasNext) {
      sr.next();
      nextCount++;
      assert.equal(
        nextCount <= limit,
        true,
        new Error(`next() was called ${nextCount} times`),
      );
    }
  });
});
