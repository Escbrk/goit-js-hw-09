function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, 0)}`;
}

let INTERVAL_ID

const refs = {
  start: document.querySelector('[data-start]'),
  stop: document.querySelector('[data-stop]'),
};
refs.start.addEventListener('click', onStart);
refs.stop.addEventListener('click', onStop);

function onStart() {
  refs.start.disabled = true;
  refs.stop.disabled = false;

  INTERVAL_ID = setInterval(() => {
    document.body.style.backgroundColor = getRandomHexColor();
  }, 1000);
}
function onStop() {
  refs.start.disabled = false;
  refs.stop.disabled = true;

  clearInterval(INTERVAL_ID);
}
