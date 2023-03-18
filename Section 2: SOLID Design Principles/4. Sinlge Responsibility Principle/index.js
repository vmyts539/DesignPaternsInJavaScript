const fs = require("fs");

class Journal {
  constructor() {
    this.entries = {};
  }

  addEntry(text) {
    let c = ++Journal.count;
    let entry = `${c}: ${text}`;
    this.entries[c] = entry;
    return c;
  }

  removeEntry(index) {
    delete this.entries[index];
  }

  toString() {
    return Object.values(this.entries).join("\n");
  }

  // NOTE: wrong approach. Class takes the responsibility of interacting with the file system.

  // save(filename) {
  //   fs.writeFileSync(filename, this.toString());
  // }

  // load(filename) {
  //   //
  // }

  // loadFromUrl(url) {
  //   //
  // }
}

Journal.count = 0;

// NOTE: correct approach. Move file system interaction to another class. Also, allows you to use it somewhere else.

class PersistenceManager {
  preprocess(j) {
    //
  }

  saveToFile(journal, filename) {
    fs.writeFileSync(filename, journal.toString());
  }
}

let j = new Journal();
j.addEntry("Beautiful day");
j.addEntry("Just ate");
console.log(j.toString());

let p = new PersistenceManager();
let filename =
  "/home/vmyts/Learning/Udemy/Design Patterns in Javascript/Section 2: SOLID Design Principles/4. Sinlge Responsibility Principle/journal.txt";
p.saveToFile(j, filename);

// separation of concerns. Separate different parts that somehow related into components e.g. Persistance, Postprocessing, Paralelism should be separate components of the same framework, thus better manageable, testable, debbugeable, refactorable
