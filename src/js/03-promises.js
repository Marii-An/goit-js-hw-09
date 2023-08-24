const form = document.querySelector('.form');
const submitBtn = document.querySelector('[type="submit"]');

form.addEventListener('submit', evt => {
  evt.preventDefault();
  const { delay, step, amount } = evt.currentTarget.elements;

  for (let i = 0; i < amount.value; i++) {
    const result = Number(delay.value) + step.value * i;

    createPromise(i + 1, result)
      .then(({ position, delay }) => {
        console.log(`✅ Fulfilled promise ${position} in ${delay}ms`);
        window.alert(`✅ Fulfilled promise ${position} in ${delay}ms`);
      })
      .catch(({ position, delay }) => {
        console.log(`❌ Rejected promise ${position} in ${delay}ms`);
        window.alert(`❌ Rejected promise ${position} in ${delay}ms`);
      });
  }
});

function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    const shouldResolve = Math.random() > 0.3;

    setTimeout(() => {
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  });
}
