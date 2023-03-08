class Square {
  constructor(side) {
    this.side = side;
  }
}

function area(rectangle) {
  return rectangle._width * rectangle._height;
}

class SquareToRectangleAdapter {
  constructor(sq) {
    this.square = sq;
    this._width = this._height = sq.side;
  }
}
