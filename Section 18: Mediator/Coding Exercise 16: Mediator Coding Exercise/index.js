class Mediator {
  // todo
}

class Participant {
  constructor(mediator) {
    // todo
  }

  say(n) {
    // todo
  }
}

class Person {
  constructor(name) {
    this.name = name;
    this.chatLog = [];
  }

  receive(sender, message) {
    let s = `${sender}: '${message}'`;
    console.log(`[${this.name}'s chat session] ${s}`);
    this.chatLog.push(s);
  }

  say(message) {
    this.room.broadcast(this.name, message);
  }

  pm(who, message) {
    this.room.message(this.name, who, message);
  }
}

class ChatRoom {
  constructor() {
    this.people = [];
  }

  broadcast(source, message) {
    for (let p of this.people)
      if (p.name !== source) p.receive(source, message);
  }

  join(p) {
    let joinMsg = `${p.name} joins the chat`;
    this.broadcast("room", joinMsg);
    p.room = this;
    this.people.push(p);
  }

  message(source, destination, message) {
    for (let p of this.people)
      if (p.name === destination) p.receive(source, message);
  }
}
