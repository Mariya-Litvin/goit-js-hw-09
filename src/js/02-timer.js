// Завдання 2 - таймер зворотного відліку

import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from 'notiflix';

const startBtn = document.querySelector('button[data-start]');
const dataDays = document.querySelector('span[data-days]');
const dataHours = document.querySelector('span[data-hours]');
const dataMinutes = document.querySelector('span[data-minutes]');
const dataSeconds = document.querySelector('span[data-seconds]');
const dataTime = document.querySelector('input#datetime-picker');
let timerId = null;
startBtn.disabled = true;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (selectedDates[0] < new Date()) {
      startBtn.disabled = true;
      Notiflix.Notify.failure('Please choose a date in the future');
    } else {
      startBtn.disabled = false;
    }
  },
};

flatpickr(dataTime, options);

startBtn.addEventListener('click', onBtnStart);

function onBtnStart(event) {
  timerId = setInterval(() => {
    let countTime = new Date(dataTime.value) - Date.now();
    let timeObject = convertMs(countTime);
    if (countTime > 0) {
      dataDays.textContent = addLeadingZero(timeObject.days);
      dataHours.textContent = addLeadingZero(timeObject.hours);
      dataMinutes.textContent = addLeadingZero(timeObject.minutes);
      dataSeconds.textContent = addLeadingZero(timeObject.seconds);
    } else if (countTime <= 0) {
      clearInterval(timerId);
      Notiflix.Notify.success('Congratulation!');
      startBtn.disabled = true;
    }
  }, 1000);
}

/-----------------------------------------------------/;

function addLeadingZero(value) {
  return String(value).padStart(2, 0);
}

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
