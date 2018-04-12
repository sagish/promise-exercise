const P = require('./p');

function delay() {
  return new P(resolve => setTimeout(resolve, 1000));
}

console.time('timer')
delay()
  .then(() => console.log(1))
  .then(delay)
  .then(() => console.log(2))
  .then(delay)
  .then(() => console.log(3))
  .then(() => console.timeEnd('timer')) // 3000ms
