function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, 0)}`;
}

const refs = {
  start: document.querySelector('[data-start]'),
  stop: document.querySelector('[data-stop]'),
};

refs.start.addEventListener('click', fn.start);
refs.stop.addEventListener('click', fn.stop);

const fn = {
  INTERVAL_ID: undefined,
  // Начинам менять цвет
  start: function onStart() {
    refs.start.disabled = true;
    refs.stop.disabled = false;

    fn.INTERVAL_ID = setInterval(() => {
      document.body.style.backgroundColor = getRandomHexColor();
    }, 1000);

  },

  // Останавливаем менять цвет
  stop: function onStop(re) {
    refs.start.disabled = false;
    refs.stop.disabled = true;

    clearInterval(fn.INTERVAL_ID);
  },
};

