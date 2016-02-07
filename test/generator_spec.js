'use strict';

const assert = require('chai').assert;

describe('ES2015 Generators ', () => {
  it('should iterator of results', () => {
    // Given
    function* newIterator() {
      yield 1;
      yield 2;
      yield 3;
    }

    // When
    const iter = newIterator();

    // Then
    assert.deepEqual(iter.next(), { value: 1, done: false });
    assert.deepEqual(iter.next(), { value: 2, done: false });
    assert.deepEqual(iter.next(), { value: 3, done: false });
    assert.deepEqual(iter.next(), { value: undefined, done: true });
  });
});
