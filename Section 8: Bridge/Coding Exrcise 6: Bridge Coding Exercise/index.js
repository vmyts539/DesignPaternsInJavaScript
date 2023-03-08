class Shape {
  constructor(renderer, name) {
    this.renderer = renderer;
    this.name = name;
  }

  toString() {
    return this.renderer.draw(this.name);
  }
}

class Triangle extends Shape {
  constructor(renderer) {
    super(renderer, "triangle");
  }
}

class Square extends Shape {
  constructor(renderer) {
    super(renderer, "square");
  }
}

class VectorRenderer {
  draw(name) {
    return `Drawing ${name} as lines`;
  }
}

class RasterRenderer {
  draw(name) {
    return `Drawing ${name} as pixels`;
  }
}
