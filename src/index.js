function chainify(instance, initialValue) {
  let promiseChain = Promise.resolve(initialValue);
  let proxyInstance = null;
  
  const methodProxyHandler = {
    apply: function(target, that) {
      promiseChain = promiseChain
      .then(function() {
        return Reflect.apply(target, that, arguments);
      });

      return proxyInstance;
    }
  };

  const methodProxies = {};
  const handler = {
    get: function(target, prop) {
      if (prop === 'unwrapChainify') return () => promiseChain;

      const val = Reflect.get(target, prop);
      if (typeof val !== 'function') return val;
      if(!methodProxies[prop]) methodProxies[prop] = new Proxy(val, methodProxyHandler);
      
      return methodProxies[prop];
    }
  };

  proxyInstance = new Proxy(instance, handler);
  return proxyInstance;
}

module.exports = chainify;
