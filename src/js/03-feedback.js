import throttle from 'lodash.throttle';

const form = document.querySelector('.feedback-form');

function handlerFormInput(event) {
  if (event.target.name === 'email' || event.target.name === 'message') {
    const formData = {
      email: form.elements.email.value,
      message: form.elements.message.value,
    };

    saveFormData(formData);
  }
}

function saveFormData(formData) {
  localStorage.setItem('feedback-form-state', JSON.stringify(formData));
}

function restoreFormData() {
  const restoredFormData = localStorage.getItem('feedback-form-state');
  if (restoredFormData) {
    const { email, message } = JSON.parse(restoredFormData);
    form.elements.email.value = email;
    form.elements.message.value = message;
  }
}

function handleFormSubmit(event) {
  event.preventDefault();

  localStorage.removeItem('feedback-form-state');

  form.reset();
}

restoreFormData();

form.addEventListener('input', throttle(handlerFormInput, 500));
form.addEventListener('submit', handleFormSubmit);
