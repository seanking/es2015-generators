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

  it('should maintain internal state', () => {
    // Given
    function* newIterator() {
      for (let i = 0; i < 3; i++) {
        yield i;
      }
    }

    // When
    const iter = newIterator();

    // Then
    assert.deepEqual(iter.next(), { value: 0, done: false });
    assert.deepEqual(iter.next(), { value: 1, done: false });
    assert.deepEqual(iter.next(), { value: 2, done: false });
    assert.deepEqual(iter.next(), { value: undefined, done: true });
  });


  it('should modify the internal state', () => {
    // Given
    function* newIterator() {
      for (let i = 0; i < 3; i++) {
        const reset = yield i; // sets reset to the value passed into next

        if (reset) {
          i = -1; // reset for loop
        }
      }
    }

    // When
    const iter = newIterator();

    // Then
    assert.deepEqual(iter.next(), { value: 0, done: false });
    assert.deepEqual(iter.next(), { value: 1, done: false });
    assert.deepEqual(iter.next(true), { value: 0, done: false });
    assert.deepEqual(iter.next(), { value: 1, done: false });
    assert.deepEqual(iter.next(), { value: 2, done: false });
    assert.deepEqual(iter.next(), { value: undefined, done: true });
  });
});
