# WIP: Generators in ES2015

A generator is a function that is a factory for [iterators](http://www.rseanking.com/news/2016/2/1/iterators-generators-and-async-programming-part-1).

### Basic Generator

A generator must be declared using _function*_ and contain at least one _yield_ statement. The following example creates a simple iterator that provides the sequence 1 and 2.

```javascript
function* newIterator() {
  yield 1;
  yield 2;
}

const iter = newIterator();

console.log(iter.next()); // prints { value: 1, done: false }
console.log(iter.next()); // prints { value: 2, done: false }
console.log(iter.next()); // prints { value: undefined, done: true }
```

### Internal State

Generators have the ability to maintain state. In the following example, the generator the state if _i_ and increments it before each request.

```javascript
function* newGenerator() {
  for (let i = 0; i < 2; i++) {
    yield i;
  }
}

const iter = newGenerator();

console.log(iter.next()); // prints { value: 1, done: false }
console.log(iter.next()); // prints { value: 2, done: false }
console.log(iter.next()); // prints { value: undefined, done: true }
```

### Modification of Internal State

The internal state of a generator can be modified. In the following example a boolean flag is passed in to the iterator's _next_ method to reset the count.

```javascript
function* newIterator() {
  for (let i = 0; i < 3; i++) {
    const reset = yield i; // sets reset to the value passed into next

    if (reset) {
      i = -1; // reset for loop
    }
  }
}

const iter = newIterator();

console.log(iter.next()); // prints { value: 0, done: false }
console.log(iter.next()); // prints { value: 1, done: false }
console.log(iter.next(true)); // prints { value: 0, done: false }
console.log(iter.next()); // prints { value: 1, done: false }
console.log(iter.next()); // prints { value: 2, done: false }
console.log(iter.next()); // prints { value: undefined, done: true }
```
