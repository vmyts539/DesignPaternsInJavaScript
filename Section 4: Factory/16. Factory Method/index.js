// CoordinateSystem = {
//   cartesian: 0,
//   polar: 1
// };

class Point {
  // constructor(a, b, cs=CoordinateSystem.cartesian) {
  //   switch(cs) { // violation of open-closed principal
  //     case CoordinateSystem.cartesian:
  //       this.x = a;
  //       this.y = b;
  //       break;
  //     case CoordinateSystem.polar:
  //       this.x = a * Math.cos(b);
  //       this.y = a * Math.sin(b);
  //       break;
  //   }
  // }

  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  // constructor(rho, theta) {
  //   this.x = rho * Math.cos(theta);
  //   this.y = rho * Math.sin(theta);
  // }

  static newCartesianPoint(x, y) {
    return new Point(x, y);
  }

  static newPolarPoint(rho, theta) {
    return new Point(rho * Math.cos(theta), rho * Math.sin(theta));
  }
}

// let p1 = new Point(2, 3, CoordinateSystem.cartesian)
let p = Point.newCartesianPoint(4, 5);
console.log(p);

let p2 = Point.newPolarPoint(5, Math.PI / 2);
console.log(p2);
