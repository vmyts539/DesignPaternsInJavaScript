class SingleValue {
  constructor(value) {
    this.value = value;
  }

  [Symbol.iterator]() {
    let returned = false;
    return {
      next: () => ({
        value: this.value,
        done: returned++,
      }),
    };
  }
}

class ManyValues extends Array {}

let sum = function (containers) {
  let result = 0;
  for (let c of containers) for (let i of c) result += i;
  return result;
};
