import { throttle } from 'lodash';

const contactFormEl = document.querySelector('.feedback-form');

let userData = JSON.parse(localStorage.getItem('feedback-form-state')) || {};

const fillFormFields = () => {
  //   console.dir(contactFormEl.elements);
  //     console.dir(dataFromLS);
  if (userData === null) {
    return;
  }
  for (const prop in userData) {
    if (prop === 'email' || prop === 'message') {
      contactFormEl.elements[prop].value = userData[prop];
      //   Перебираем полученный распарсенный JSON массив из функции onFormFieldChange (данные, которые ввел пользователь. А так как elements (ключи) contactFormEl совпадают с ключами dataFromLS, присваиваем значение (value) этих ключей через [prop].value)
    } else {
      return;
    }
  }
};

fillFormFields();

const onFormFieldChange = throttle(event => {
  const { target } = event;
  const fieldName = target.name;
  const fieldValue = target.value;
  userData[fieldName] = fieldValue;
  localStorage.setItem('feedback-form-state', JSON.stringify(userData));
}, 500);

const onFormSubmit = event => {
  event.preventDefault();
  console.log(userData);
  localStorage.removeItem('feedback-form-state');
  contactFormEl.reset();
  userData = {};
};

// console.log(submittedData);

contactFormEl.addEventListener('input', onFormFieldChange);
contactFormEl.addEventListener('submit', onFormSubmit);
