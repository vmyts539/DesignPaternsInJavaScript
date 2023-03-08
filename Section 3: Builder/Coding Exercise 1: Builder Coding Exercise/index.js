class CodeBuilder {
  constructor(className) {
    this.class = new Klass(className);
  }

  addField(name) {
    this.class.addField(name);
    return this;
  }

  toString() {
    let result = `class ${this.class.name} {\n`;

    if (this.class.fields.length === 0) {
      result += `}`;
    } else {
      result +=
        `  constructor(` +
        `${this.class.fields.join(", ")}) {\n` +
        `${this.class.fields.map((f) => `    this.${f} = ${f};\n`).join("")}` +
        `  }\n` +
        `}`;
    }

    return result;
  }
}

class Klass {
  constructor(className) {
    this.className = className;
    this.fields = [];
  }

  get name() {
    return this.className;
  }

  addField(name) {
    this.fields.push(name);
  }
}

let cb = new CodeBuilder("Person");
cb.addField("name").addField("age");
console.log(cb.toString());
