class P {
  stack = [];

  constructor(callback) {
    callback(this.resolve);
  }

  resolve = (carry) => {
    const fn = this.stack.splice(0, 1)[0];

    const executed = fn(carry);

    if (executed instanceof P) {
      executed.then(result => this.next(result));
    } else {
      // sync
      this.next(executed);
    }
  }

  next = (result) => {
    if (this.stack.length) {
      this.resolve(result);
    }
  }

  then = (fn) => {
    this.stack.push(fn);

    return this;
  }
}

module.exports = P;
