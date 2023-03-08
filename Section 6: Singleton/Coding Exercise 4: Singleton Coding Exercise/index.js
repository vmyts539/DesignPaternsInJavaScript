class SingletonTester {
  static isSingleton(generator) {
    let result = generator() === new generator().constructor();
    return result;
  }
}

class Singleton {
  constructor() {
    const instance = this.constructor.instance;
    if (instance) return instance;
    this.constructor.instance = this;
  }
}

SingletonTester.isSingleton(function () {
  return [1, 2, 3];
});

SingletonTester.isSingleton(function () {
  return new Singleton();
});
