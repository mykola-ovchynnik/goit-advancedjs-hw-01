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

function getFormData() {
  return localStorage.getItem('feedback-form-state');
}

function restoreFormData() {
  const restoredFormData = JSON.parse(getFormData());
  if (restoredFormData) {
    const { email, message } = restoredFormData;
    form.elements.email.value = email;
    form.elements.message.value = message;
  }
}

function handleFormSubmit(event) {
  event.preventDefault();

  const formData = JSON.parse(getFormData());

  if (!formData.email || !formData.message) {
    alert('All field must be completed!');
    return;
  }

  console.log(formData);
  localStorage.removeItem('feedback-form-state');

  form.reset();
}

restoreFormData();

form.addEventListener('input', throttle(handlerFormInput, 500));
form.addEventListener('submit', handleFormSubmit);
