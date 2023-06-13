import { describe, it } from 'node:test';
import { MakePillar } from './pillar';
import assert from 'node:assert/strict';

describe('pillar.ts', () => {
  it('should be instance of Array', () => {
    const p = MakePillar([], '');
    assert.equal(true, Array.isArray(p));
  });
});
