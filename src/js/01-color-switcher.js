// Завдання 1 - перемикач кольорів

const btnStart = document.querySelector('button[data-start]');
const btnStop = document.querySelector('button[data-stop]');
const colorBody = document.querySelector('body');
let timerId = null;

btnStart.addEventListener('click', onBtnStart);
btnStop.addEventListener('click', onBtnStop);

function onBtnStart(event) {
  event.preventDefault();
  btnStart.disabled = true;
  btnStop.disabled = false;
  timerId = setInterval(() => {
    colorBody.style.backgroundColor = getRandomHexColor();
  }, 1000);
}

function onBtnStop(event) {
  btnStart.disabled = false;
  btnStop.disabled = true;
  clearInterval(timerId);
}

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}
