let Color = Object.freeze({
  red: "red",
  green: "green",
  blue: "blue",
});

let Size = Object.freeze({
  small: "small",
  medium: "medium",
  large: "large",
});

class Product {
  constructor(name, color, size) {
    this.name = name;
    this.color = color;
    this.size = size;
  }
}

// open for extentions, closed for modification

class ProductFilter {
  filterByColor(products, color) {
    return products.filter((p) => p.color === color);
  }

  // class is being modified for extention the functionality
  filterBySize(products, size) {
    return products.filter((p) => p.size === size);
  }

  // state space explotion. Might be dozens of variations of combinations and all will be implemented as different method
  filterBySizeAndColor(products, size, color) {
    return products.filter((p) => {
      p.size === size && p.color === color;
    });
  }
}

// specification
class ColorSpecification {
  constructor(color) {
    this.color = color;
  }

  isSatisfied(item) {
    return item.color === this.color;
  }
}

class SizeSpecification {
  constructor(size) {
    this.size = size;
  }

  isSatisfied(item) {
    return item.size === this.size;
  }
}

class AndSpecification {
  constructor(...specs) {
    this.specs = specs;
  }

  isSatisfied(item) {
    return this.specs.every((x) => x.isSatisfied(item));
  }
}

let apple = new Product("Apple", Color.green, Size.small);
let tree = new Product("Tree", Color.green, Size.large);
let house = new Product("House", Color.blue, Size.large);

let products = [apple, tree, house];

let pf = new ProductFilter();
console.log(`Green products (old):`);
for (let p of pf.filterByColor(products, Color.green)) {
  console.log(` * ${p.name} is green`);
}

class BetterFilter {
  filter(items, spec) {
    return items.filter((x) => spec.isSatisfied(x));
  }
}

let bf = new BetterFilter();
console.log(`Green products (new):`);
for (let p of bf.filter(products, new ColorSpecification(Color.green))) {
  console.log(`* ${p.name} is green`);
}

console.log(`Large and green products:`);
let spec = new AndSpecification(
  new ColorSpecification(Color.green),
  new SizeSpecification(Size.large)
);
for (let p of bf.filter(products, spec)) {
  console.log(`* ${p.name} is green and large`);
}
