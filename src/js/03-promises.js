// Завдання 3 - генератор промісів

import Notiflix from 'notiflix';

const form = document.querySelector('.form');

form.addEventListener('submit', promiseFunction);

function promiseFunction(event) {
  event.preventDefault();

  let firstDelay = Number(form.elements.delay.value);
  let stepDelay = Number(form.elements.step.value);
  let amount = Number(form.elements.amount.value);

  if (firstDelay < 0 || stepDelay < 0 || amount <= 0) {
    return Notiflix.Notify.failure(`Please enter the value more then zero`);
  }
  for (let i = 0; i < amount; i += 1) {
    createPromise(i + 1, firstDelay + i * stepDelay)
      .then(({ position, delay }) => {
        Notiflix.Notify.success(
          `✅ Fulfilled promise ${position} in ${delay}ms`
        );
      })
      .catch(({ position, delay }) => {
        Notiflix.Notify.failure(
          `❌ Rejected promise ${position} in ${delay}ms`
        );
      });
  }
}

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
