class Person {
  constructor(age = 0) {
    this.age = age;
  }

  drink() {
    return "drinking";
  }
  drive() {
    return "driving";
  }
  drinkAndDrive() {
    return "driving while drunk";
  }
}

class ResponsiblePerson {
  constructor(person) {
    this.person = person;
  }

  get age() {
    return this.person.age;
  }

  set age(value) {
    this.person.age = value;
  }

  drink() {
    if (this.age >= 18) return this.person.drink();
    return "too young";
  }

  drive() {
    if (this.age >= 16) return this.person.drive();
    return "too young";
  }

  // don't do it, folks!
  drinkAndDrive() {
    return "dead";
  }
}
