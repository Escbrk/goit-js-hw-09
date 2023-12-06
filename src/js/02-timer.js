import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import { Report } from 'notiflix';

const refs = {
  input: document.querySelector('#datetime-picker'),
  startBtn: document.querySelector('[data-start]'),
  stopBtn: document.querySelector('[data-stop]'),
  resetBtn: document.querySelector('[data-reset]'),
  timerForm: document.querySelector('.timer'),

  date: {
    days: document.querySelector('[data-days]'),
    hours: document.querySelector('[data-hours]'),
    minutes: document.querySelector('[data-minutes]'),
    seconds: document.querySelector('[data-seconds]'),
  },
};
let timer;

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    refs.resetBtn.disabled = false;

    if (options.defaultDate >= selectedDates[0]) {
      Report.warning('Please, choose a date in the future!');
      refs.startBtn.disabled = true;
    } else {
      refs.startBtn.disabled = false;
    }
  },
};

refs.startBtn.addEventListener('click', onStart);
refs.stopBtn.addEventListener('click', onStop);
refs.resetBtn.addEventListener('click', onReset);

let pickedDate = flatpickr(refs.input, options);

function onStart() {
  refs.startBtn.disabled = true;
  refs.stopBtn.disabled = false;
  refs.resetBtn.disabled = true;
  refs.input.disabled = true;

  const futureDate = pickedDate.selectedDates[0];
  const currentDate = new Date();
  const targetDate = futureDate - currentDate;

  setTimeout(() => {
    refs.input.disabled = false;
    refs.resetBtn.disabled = false;
  }, targetDate);

  Report.success('Timer started');
  timer = setInterval(() => {
    const futureDate = pickedDate.selectedDates[0];
    const currentDate = new Date();
    const targetDate = futureDate - currentDate;
    const intervalTimer = convertMs(targetDate);

    refs.date.days.textContent = padStart(intervalTimer.days);
    refs.date.hours.textContent = padStart(intervalTimer.hours);
    refs.date.minutes.textContent = padStart(intervalTimer.minutes);
    refs.date.seconds.textContent = padStart(intervalTimer.seconds);

    if (targetDate < 1000) {
      clearInterval(timer);
      Report.success("Time's up");
      refs.startBtn.disabled = false;
      refs.stopBtn.disabled = true;
      refs.resetBtn.disabled = true;

      refs.date.days.textContent = '00';
      refs.date.hours.textContent = '00';
      refs.date.minutes.textContent = '00';
      refs.date.seconds.textContent = '00';
    }
  }, 1000);
}

function onStop() {
  clearInterval(timer);

  refs.startBtn.disabled = false;
  refs.stopBtn.disabled = true;
  refs.resetBtn.disabled = false;
  refs.input.disabled = false;
}

function onReset() {
  const date = new Date();
  const currentFormatDate = {
    year: date.getFullYear(),
    month: padStart(date.getMonth() + 1),
    day: padStart(date.getDate()),
    hours: padStart(date.getHours()),
    minutes: padStart(date.getMinutes()),
  };

  refs.startBtn.disabled = true;
  refs.resetBtn.disabled = true;

  refs.input.value = `${currentFormatDate.year}-${currentFormatDate.month}-${currentFormatDate.day} ${currentFormatDate.hours}:${currentFormatDate.minutes}`;

  refs.date.days.textContent = '00';
  refs.date.hours.textContent = '00';
  refs.date.minutes.textContent = '00';
  refs.date.seconds.textContent = '00';
}

function padStart(data) {
  return data.toString().padStart(2, 0);
}
