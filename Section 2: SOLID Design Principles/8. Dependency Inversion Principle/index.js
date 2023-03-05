let Relationship = Object.freeze({
  parent: 0,
  child: 1,
  sibling: 2
});

class Person {
  constructor(name) {
    this.name = name;
  }
}

// LOW-LEVEL MODULE

class RelationshipBrowser {
  constructor() {
    if (this.constructor.name === 'RelationshipBrowser') {
      throw new Error('RelationshipBrowser is abstract!')
    }
  }

  findAllChildrenOf(name) {}
}

class Relationships extends RelationshipBrowser{
  constructor() {
    super();
    this.data = [];
  }

  addParentAndChild(parent, child) {
    this.data.push({
      from: parent,
      type: Relationship.parent,
      to: child
    });
  }

  findAllChildrenOf(name) {
    return this.data.filter(r => r.from.name === name && r.type === Relationship.parent).map(r => r.to);
  }
}

// HIGH-LEVEL MODULE

class Research {
  // constructor(relationships) {
  //   // find all children of John
  //   let relations = relationships.data; // here is violation, we use low level `.data` method inside high-level module
  //   for (let rel of relations.filter(r => r.from.name === 'John' && r.type === Relationship.parent)) {
  //     console.log(
  //       `John has a child named ${rel.to.name}`
  //     );
  //   }
  // }

  constructor(browser) {
    for (let p of browser.findAllChildrenOf('John')) { // calling method `findAllChildrenOf` is better option than getting low level `relationships.data` which might change it's data type so we would need to change the algorithm of finding the children
      console.log(
        `John has a child called ${p.name}`
      )
    }
  }
}

let parent = new Person('John');
let child1 = new Person('Chris');
let child2 = new Person('Matt');

let rels = new Relationships();
rels.addParentAndChild(parent, child1);
rels.addParentAndChild(parent, child2)

new Research(rels)

// The DIP principle states that HIGH-LEVE MODULES should not directly depend on LOW-LEVEL MODULES but rather on abstractions (abstract classes/interfaces)
