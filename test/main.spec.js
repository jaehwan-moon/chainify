import test from 'ava';
import chainify from '../src/index';

const testInstance = {
  addOne: function(value) {
    return value + 1;
  },
  multiplyByTwo: function(value) {
    return value * 2;
  },
};

const testInstanceWithArrowFunction = {
  addOne: value => value + 1,
  multiplyByTwo: value => value * 2,
}

test('Instance methods can be chained', t => {
  const chainified = chainify(testInstance, 2);

  return chainified
    .addOne()
    .multiplyByTwo()
    .addOne()
    .unwrapChainify()
    .then(result => {
      t.is(result, 7);
    });
});

test('Arrow functions can be chained', t => {
  const chainified = chainify(testInstanceWithArrowFunction, 2);

  return chainified
    .addOne()
    .multiplyByTwo()
    .addOne()
    .unwrapChainify()
    .then(result => {
      t.is(result, 7);
    });
})
