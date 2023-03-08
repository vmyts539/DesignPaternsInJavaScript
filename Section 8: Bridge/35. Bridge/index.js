class VectorRenderer {
  renderCircle(radius) {
    console.log(`Drawing a circle of radius ${radius}`);
  }
}

class RasterRenderer {
  renderCircle(radius) {
    console.log(`Drawing pixels for a circle of radius ${radius}`);
  }
}

class Shape {
  constructor(renderer) {
    this.renderer = renderer;
  }
}

class Circle extends Shape {
  constructor(renderer, radius) {
    super(renderer);
    this.radius = radius;
  }

  draw() {
    this.renderer.renderCircle(this.radius);
  }

  resize(factor) {
    this.radius *= factor;
  }
}

class Square {}

// VC VS RC RS to many classes for different variations

// Split to hierarchy
// Shapre - Quare, Circle, Trinagle, ...
// Renderer - Raster, Vector, ...

let raster = new RasterRenderer();
let vector = new VectorRenderer();
let circle = new Circle(raster, 5);
circle.draw();
circle.resize(2);
circle.draw();

// Lesser classes, but more methods. Bridge is just a different way of defining class hierarchy.
