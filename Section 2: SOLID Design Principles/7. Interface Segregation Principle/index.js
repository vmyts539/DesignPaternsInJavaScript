var aggregation = (baseClass, ...mixins) => {
  class base extends baseClass {
    constructor(...args) {
      super(...args);
      mixins.forEach((mixin) => {
        copyProps(this, new mixin());
      });
    }
  }
  let copyProps = (target, source) => {
    // this function copies all properties and symbols, filtering out some special ones
    Object.getOwnPropertyNames(source)
      .concat(Object.getOwnPropertySymbols(source))
      .forEach((prop) => {
        if (
          !prop.match(
            /^(?:constructor|prototype|arguments|caller|name|bind|call|apply|toString|length)$/
          )
        )
          Object.defineProperty(
            target,
            prop,
            Object.getOwnPropertyDescriptor(source, prop)
          );
      });
  };
  mixins.forEach((mixin) => {
    // outside constructor() to allow aggregation(A,B,C).staticFunction() to be called etc.
    copyProps(base.prototype, mixin.prototype);
    copyProps(base, mixin);
  });
  return base;
};

class Document {}

class Machine {
  constructor() {
    if (this.constructor.name === "Machine") {
      throw new Error("Machine is abstract!");
    }
  }

  print(doc) {}
  fax(doc) {}
  scan(doc) {}
}

class MultiFunctionPrinter extends Machine {
  print(doc) {
    // super.print(doc);
  }

  fax(doc) {
    // super.fax(doc);
  }

  scan(doc) {
    // super.scan(doc);
  }
}

class NotImplementedError extends Error {
  constructor(name) {
    let msg = `${name} is not implemented!`;
    super(msg);
    if (Error.captureStackTrace)
      Error.captureStackTrace(this, NotImplementedError);
  }
}

class OldFasionPrinter extends Machine {
  print(doc) {
    // super.print(doc);
    // ok
  }

  fax(doc) {
    // super.fax(doc);
    // doesn't know how to do it
    // do nothing
    // NOTE: principle of least surprise. When pepople use your API they should not be suprised, they should not see some magic behaviour. They need to see predictable behaviour
    // old printer shouldn't have the fax method, customer will be suprised to know that it has such interface
  }

  scan(doc) {
    // super.scan(doc);
    // doesn't know how to do it
    // throw new Error('not implemented!')
    throw new NotImplementedError("OldFasionPrinter.scan");
  }
}

// ISP = segregate (split up interfaces on different parts) so that people don't implement more than they need
// use these classes to extend them in order to provide interfaces explicitly

class Printer {
  constructor() {
    if (this.constructor.name === "Printer") {
      throw new Error("Printer is abstract!");
    }
  }

  print() {}
}

class Scanner {
  constructor() {
    if (this.constructor.name === "Scanner") {
      throw new Error("Scanner is abstract!");
    }
  }

  scan() {}
}

class Photocopier extends aggregation(Printer, Scanner) {
  print() {}
  scan() {}
}

let printer = new OldFasionPrinter();
printer.scan();
