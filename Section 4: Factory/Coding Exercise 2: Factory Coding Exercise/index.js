let people = [];

class Person {
  constructor(id, name) {
    this.id = id;
    this.name = name;
  }
}

class PersonFactory {
  createPerson(name) {
    let id = people.length;
    let person = new Person(id, name);

    people.push(person);

    return person;
  }
}
