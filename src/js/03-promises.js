import { Notify } from 'notiflix';

const refs = {
  form: document.querySelector('.form'),
  delay: document.querySelector('[name="delay"]'),
  step: document.querySelector('[name="step"]'),
  amount: document.querySelector('[name="amount"]'),
  submitBtn: document.querySelector('[type="submit"]'),
};

let intervalId;

function createPromise(position, delay) {
  const obj = { position, delay };
  const shouldResolve = Math.random() > 0.3;

  return new Promise((res, rej) => {
    if (shouldResolve) {
      // Fulfill
      res(obj);
    } else {
      // Reject
      rej(obj);
    }
  });
}

refs.submitBtn.addEventListener('click', onSubmit);

function onSubmit(e) {
  e.preventDefault();
  const delayToNum = Number(refs.delay.value);
  const stepToNum = Number(refs.step.value);
  let totalMs;
  const toNum = Number(refs.amount.value);

  for (let i = 0; i < toNum; i += 1) {
    totalMs = delayToNum + stepToNum;
    clearInterval(intervalId);
  }

  intervalId = setInterval(() => {
    createPromise(delayToNum, stepToNum)
      .then(({ position, delay }) => {
        Notify.success(`Fulfilled promise ${position} in ${delay}ms`);
      })
      .catch(({ position, delay }) => {
        Notify.failure(`Rejected promise ${position} in ${delay}ms`);
      });
  }, delayToNum);
}
