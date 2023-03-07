class Serializer {
  constructor(types) {
    this.types = types;
  }

  markRecursive(object) {
    let idx = this.types.findIndex((t) => {
      return t.name === object.constructor.name;
    });

    if (idx !== -1) {
      object["typeIndex"] = idx;

      for (let key in object) {
        if (object.hasOwnProperty(key) && object[key] != null)
          this.markRecursive(object[key]); // ^^^^^^^^^^ important
      }
    }
  }

  reconstructRecursive(object) {
    if (object.hasOwnProperty("typeIndex")) {
      let type = this.types[object.typeIndex];
      let obj = new type();

      for (let key in object) {
        if (object.hasOwnProperty(key) && object[key] != null) {
          obj[key] = this.reconstructRecursive(object[key]);
        }
      }

      delete obj.typeIndex;

      return obj;
    }

    return object;
  }

  clone(object) {
    this.markRecursive(object);
    let copy = JSON.parse(JSON.stringify(object));

    return this.reconstructRecursive(copy);
  }
}

class LineFactory {
  static _newLine(proto, start, end) {
    let copy = LineFactory.serializer.clone(proto);

    copy.start.x = start.x;
    copy.start.y = start.y;

    copy.end.x = end.x;
    copy.end.y = end.y;

    return copy;
  }

  static newLineWithPoints(start, end) {
    return this._newLine(LineFactory.main, start, end);
  }
}

class Point {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
}

class Line {
  constructor(start, end) {
    this.start = start;
    this.end = end;
  }

  deepCopy() {
    LineFactory.serializer = new Serializer([Line, Point]);
    LineFactory.main = this;
    return LineFactory.newLineWithPoints(this.start, this.end);
  }
}

let line = new Line(new Point(3, 3), new Point(10, 10));
let line2 = line.deepCopy();

console.log(line2.start, line2.end);
