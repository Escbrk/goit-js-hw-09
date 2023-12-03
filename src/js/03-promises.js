import { Notify } from 'notiflix';

const refs = {
  form: document.querySelector('.form'),
  delay: document.querySelector('[name="delay"]'),
  step: document.querySelector('[name="step"]'),
  amount: document.querySelector('[name="amount"]'),
  submitBtn: document.querySelector('[type="submit"]'),
};

function createPromise(position, delay) {
  const obj = { position, delay };
  const shouldResolve = Math.random() > 0.3;

  return new Promise((res, rej) => {
    setInterval(() => {
      if (shouldResolve) {
        res(obj);
      } else {
        rej(obj);
      }
    }, delay);
  });
}

refs.submitBtn.addEventListener('click', onSubmit);

function onSubmit(e) {
  e.preventDefault();
  let delayToNum = Number(refs.delay.value);
  const stepToNum = Number(refs.step.value);
  const amountToNum = Number(refs.amount.value);

  for (let i = 1; i <= amountToNum; i += 1) {
    if (i <= amountToNum) {
      createPromise(i, delayToNum+=stepToNum)
        .then(({ position, delay }) => {
          Notify.success(`Fulfilled promise ${position} in ${delay}ms`);
        })
        .catch(({ position, delay }) => {
          Notify.failure(`Rejected promise ${position} in ${delay}ms`);
        });
    }
  }

}