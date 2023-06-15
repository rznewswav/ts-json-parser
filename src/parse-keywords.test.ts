import { describe, it } from 'node:test';
import { createKeywordParser } from './create-keyword-parser';
import { StringReader } from './string-reader';
import assert from 'node:assert/strict';

describe('Parse keywords', () => {
  const keywords = ['true', 'false', 'null'];

  for (const keyword of keywords) {
    const parser = createKeywordParser(keyword);
    describe(`keyword: ${keyword}`, () => {
      it('should parse keyword: ', function () {
        const sr = new StringReader(keyword);
        const out = parser(sr);
        assert.equal(out, sr.input);
      });

      it('should not parse invalid keyword', function () {
        const sr = new StringReader('randomkeywords');
        assert.throws(() => {
          const out = parser(sr);
          assert.equal(out, sr.input);
        });
      });
    });
  }
});
