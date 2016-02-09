# Generators in ES2015

Generators are a new feature provided by the [ES2015 Language Specification](http://www.ecma-international.org/ecma-262/6.0/#). A generator is a method that can be exited and re-entered multiple times without loosing state. The examples below will step through creating basic and complex generators.

### Basic Generator

A generator must be declared using _function*_ and contain at least one _yield_ statement.

```javascript
function* newIterator() {
  yield 1;
  yield 2;
}
```

Calling a generator method does not execute the body but instead returns a _Generator_ object.

```javascript
function* newIterator() {
  ...
}

const iter = newIterator();
```

The _Generator_ object supports the iterable and iterator protocols. Calling the object's _next_ method will execute the function up until the first _yield_ statement. The following iterations will continue from the continue from the pervious _yield_ statement and execute until the next _yield_ statement.

In the following example, iterating over the generator will produce 1 and then 2.

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

Generators have the ability to maintain state within the function. This allows for complex algorithms that can produce results on demand.

In the following example, the generator function uses a _for_ loop to increment tthe state of _i_.

```javascript
function* newIterator() {
  for (let i = 0; i < 2; i++) {
    yield i;
  }
}

const iter = newIterator();

console.log(iter.next()); // prints { value: 1, done: false }
console.log(iter.next()); // prints { value: 2, done: false }
console.log(iter.next()); // prints { value: undefined, done: true }
```

### Modification of Internal State

The internal state of a generator can be modified by passing a value into the iterator's _next_ method. In the following example, a boolean flag is passed in to the iterator's _next_ method to reset the count.

```javascript
function* newIterator() {
  for (let i = 0; i < 3; i++) {
    const reset = yield i;

    if (reset) {
      i = -1; // reset for loop
    }
  }
}

const iter = newIterator();

console.log(iter.next());     // prints { value: 0, done: false }
console.log(iter.next());     // prints { value: 1, done: false }
console.log(iter.next(true)); // prints { value: 0, done: false }
console.log(iter.next());     // prints { value: 1, done: false }
console.log(iter.next());     // prints { value: 2, done: false }
console.log(iter.next());     // prints { value: undefined, done: true }
```

## Future

Generators appear to be a fundamental part of the language moving forward. The [Async-Await](http://tc39.github.io/ecmascript-asyncawait/) proposal for ES7 uses generators to improve the languages support for writing asynchronous.

As of this post, generators are supported in [nodejs](https://nodejs.org/en/) and in some major browsers. Unlike with most ES6 features, [babel](https://babeljs.io)'s [polyfill](https://babeljs.io/docs/usage/polyfill) must be used instead of the trans-compiler. As with most polyfills, tread carefully when adding any dependency to your code.
