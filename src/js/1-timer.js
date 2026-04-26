// Описаний в документації
import flatpickr from 'flatpickr';
// Додатковий імпорт стилів
import 'flatpickr/dist/flatpickr.min.css';

// Описаний у документації
import iziToast from 'izitoast';
// Додатковий імпорт стилів
import 'izitoast/dist/css/iziToast.min.css';
import { refs } from './refs';

refs.timeBtn.disabled = true;
let userSelectedDate = null;

refs.timeBtn.addEventListener('click', onTimeBtnClick);

function onTimeBtnClick(event) {
  refs.timeBtn.disabled = true;
  refs.inputTime.disabled = true;

  let timerId = setInterval(() => {
    const difference = userSelectedDate - new Date();
    if (difference <= 0) {
      clearInterval(timerId);
      refs.inputTime.disabled = false;
      return;
    }
    const { days, hours, minutes, seconds } = convertMs(difference);

    refs.daysSpan.textContent = addLeaddingZero(days);
    refs.hoursSpan.textContent = addLeaddingZero(hours);
    refs.minutesSpan.textContent = addLeaddingZero(minutes);
    refs.secondsSpan.textContent = addLeaddingZero(seconds);
  }, 1000);
}

flatpickr(refs.inputTime, {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (selectedDates[0] < new Date()) {
      refs.timeBtn.disabled = true;
      iziToast.error({
        message: 'Please choose a date in the future',
      });

      return;
    }
    userSelectedDate = selectedDates[0];
    refs.timeBtn.disabled = false;
  },
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
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

const addLeaddingZero = value => {
  return String(value).padStart(2, '0');
};
