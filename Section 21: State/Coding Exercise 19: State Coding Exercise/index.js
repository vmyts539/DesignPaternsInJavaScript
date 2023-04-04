class CombinationLock {
  constructor(combination) {
    this.combination = combination;
    this.reset();
  }

  reset() {
    this.status = "LOCKED";
    this.digitsEntered = 0;
    this.failed = false;
  }

  enterDigit(digit) {
    if (this.status === "LOCKED") this.status = "";
    this.status += digit.toString();
    if (this.combination[this.digitsEntered] !== digit) {
      this.failed = true;
    }
    this.digitsEntered++;

    if (this.digitsEntered === this.combination.length)
      this.status = this.failed ? "ERROR" : "OPEN";
  }
}
