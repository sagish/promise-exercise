const P = require('./p');

describe('P', () => {
  const delay = (resolve) => setTimeout(resolve, 50);

  it('should resolve a callback with a then and carry the value', done => {
    const symbol = Symbol();

    const p = new P(resolve => setTimeout(() => {
      resolve(symbol)
    }, 50))
    .then(value => {
      expect(value).toBe(symbol);
      done();
    });
  });

  it('should chain sync functions', done => {
    const delay = (x) => new P(resolve => setTimeout(() => resolve(x), 50));
    const cb = jest.fn();

    delay(1)
      .then(res => { cb(); return res + 1 })
      .then(res => { cb(); return res + 1 })
      .then(res => {
        expect(res).toBe(3);
        expect(cb).toHaveBeenCalledTimes(2);
        done();
      });
  });

  it('should chain async functions', done => {
    const delay = (x) => new P(resolve => setTimeout(() => resolve(x), 50));
    const cb = jest.fn();

    delay(0)
      .then(delay)
      .then(res => { cb(); return res + 1 })
      .then(res => {
        expect(res).toBe(1);
        expect(cb).toHaveBeenCalledTimes(1);
        done();
      });
  });
});
