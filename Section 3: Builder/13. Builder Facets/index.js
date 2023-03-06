class Person {
  constructor() {
    // address
    this.streetAddress = this.postcode = this.city = '';

    // employment
    this.companyName = this.position = '';
    this.annualIncome = 0;
  }

  toString() {
    return `Person lives at ${this.streetAddress}, ${this.city}, ${this.postcode}\n`
      + `and works at ${this.companyName} as a ${this.position} earning ${this.annualIncome}`;
  }
}

class PersonBuilder {
  constructor(person=new Person()) {
    this.person = person;
  }

  get lives() {
    return new PersonAddressbuilder(this.person);
  }

  get works() {
    return new PersonJobBuilder(this.person);
  }

  build() {
    return this.person;
  }
}

class PersonJobBuilder extends PersonBuilder {
  constructor(person) {
    super(person);
  }

  at(companyName) {
    this.person.companyName = companyName;
    return this;
  }

  asA(position) {
    this.person.position = position;
    return this;
  }

  earning(annualIncome) {
    this.person.annualIncome = annualIncome;
    return this;
  }
}

class PersonAddressbuilder extends PersonBuilder
{
  constructor(person)
  {
    super(person);
  }

  at(streetAddress)
  {
    this.person.streetAddress = streetAddress;
    return this;
  }

  withPostcode(postcode)
  {
    this.person.postcode = postcode;
    return this;
  }

  in(city)
  {
    this.person.city = city;
    return this;
  }
}

let pb = new PersonBuilder();
let person = pb
  .lives.at('123 London Road').in('London').withPostcode('SW12BC')
  .works.at('Fabrikam').asA('Engineer').earning(123000)
  .build();
console.log(person.toString());


// TODO: Exercise
class CodeBuilder {
  constructor(className) {
    this.class = new Klass(className)
  }

  addField(name) {
    this.class.addField(name)
    return this;
  }

  toString() {
    let result = `class ${this.class.name} {\n`

    if (this.class.fields.length === 0) {
      result += `}`
    } else {
      result += `  constructor(` + `${this.class.fields.join(', ')}) {\n` +
                     `${this.class.fields.map(f => `    this.${f} = ${f};\n`).join('')}` +
                   `  }\n` +
      `}`
    }

    return result;
  }
}

class Klass {
  constructor(className) {
    this.className = className;
    this.fields = [];
  }

  get name() { return this.className }

  addField(name) {
    this.fields.push(name)
  }
}

let cb = new CodeBuilder('Person');
cb.addField('name').addField('age');
console.log(cb.toString());

