# **Chainify**

Make functions of an instance chainable

## **How to use `Chainify`**

```js
const chainify = require('@cokencode/chainify');

// An example instance
const calculator = {
  addOne: number => number + 1
  multiplyByTwo: number => number * 2
  addOnePromise: number => Promise.resolve(number + 1)
};

const chainableCaluculator = chainify(calculator, 3);

chainableCalculator
  .addOne()
  .multiplyByTwo()
  .multiplyByTwo()
  .addOne()
  .unwrapChainify()
  .then(result => console.log(result));

```

## **API**
* chainify(instance, initialValue)
  * `instance`: Any `object` whose methods will be able to be chained.
  * `initialValue` (optional): The value that is passed to a first function chained as an parameter

* unwrapChainify(): This method can be called in a chain in order get a result value. It returns `Promise`. Warning: After calling this function, methods can no longer be chained.
