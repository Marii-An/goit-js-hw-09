import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

const setDate = document.querySelector('#datetime-picker');
const startButton = document.querySelector('[data-start]');
const leftDays = document.querySelector('[data-days]');
const leftHours = document.querySelector('[data-hours]');
const leftMinutes = document.querySelector('[data-minutes]');
const leftSeconds = document.querySelector('[data-seconds]');
const leftValues = document.querySelectorAll('.value');
let timer = null;

startButton.disabled = true;

flatpickr(setDate, {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (selectedDates[0] <= Date.now()) {
      window.alert('Please choose a date in the future');
    } else {
      startButton.disabled = false;
    }
  },
});

startButton.addEventListener('click', () => {
  leftValues.forEach(item => item.classList.toggle('end'));
  startButton.disabled = true;
  leftDays.disabled = true;
  const userDate = new Date(leftDays.value);
  timer = setInterval(() => {
    const leftTime = userDate - Date.now();

    if (leftTime < 1000) {
      leftValues.forEach(item => item.classList.toggle('end'));
      clearInterval(timer);
      leftDays.disabled = false;
      return;
    }

    const { days, hours, minutes, seconds } = convertMs(leftTime);

    leftDays.textContent = addLeadingZero(days);
    leftHours.textContent = addLeadingZero(hours);
    leftMinutes.textContent = addLeadingZero(minutes);
    leftSeconds.textContent = addLeadingZero(seconds);
  }, 1000);
});

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
  const minutes = Math.floor((ms % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((ms % minute) / second);

  return { days, hours, minutes, seconds };
}

function addLeadingZero(value) {
  return `${value}`.padStart(2, '0');
}
