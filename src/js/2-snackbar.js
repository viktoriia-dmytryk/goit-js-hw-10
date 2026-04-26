import { refs } from './refs';

// Описаний у документації
import iziToast from 'izitoast';
// Додатковий імпорт стилів
import 'izitoast/dist/css/iziToast.min.css';

refs.formSnackbar.addEventListener('submit', onFormSnackbarSubmit);

function onFormSnackbarSubmit(event) {
  event.preventDefault();
  const settingsPromise = {
    delay: refs.inputDelay.value,
    status: refs.formSnackbar.elements.state.value,
  };
  const { delay, status } = settingsPromise;

  const promise = new Promise((resolve, reject) => {
    setTimeout(() => {
      if (status === 'fulfilled') {
        resolve(delay);
      } else {
        reject(delay);
      }
    }, delay);
  });
  promise
    .then(ms => {
      iziToast.show({
        message: `✅ Fulfilled promise in ${ms}ms`,
      });
    })
    .catch(ms => {
      iziToast.error({
        message: `❌ Rejected promise in ${ms}ms`,
      });
    });
}
