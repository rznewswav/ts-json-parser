import { describe, it } from 'node:test';
import { MakeDataStruct } from './data-struct';
import assert from 'node:assert/strict';

describe('data-struct.ts', () => {
  it('can import plain array object', () => {
    const obj = [
      {
        name: 'Adam',
        age: 21,
      },
      {
        name: 'Sylvia',
        age: 23,
      },
    ];

    const dataStruct = MakeDataStruct(obj);
    assert.equal(2, dataStruct.name.length);
    assert.equal(obj[0].name, dataStruct.name[0]);
  });
});
