import { throttle } from 'lodash';

const contactFormEl = document.querySelector('.feedback-form');

const userData = {};

const fillFormFields = () => {
  let dataFromLS;
  try {
    dataFromLS = JSON.parse(localStorage.getItem('feedback-form-state'));
  } catch (error) {
    console.log(error);
  }
  //   console.dir(contactFormEl.elements);
  //     console.dir(dataFromLS);
  if (dataFromLS === null) {
    return;
  }
  for (const prop in dataFromLS) {
    if (prop === 'email') {
      contactFormEl.elements[prop].value = dataFromLS[prop];
      //   Перебираем полученный распарсенный JSON массив из функции onFormFieldChange (данные, которые ввел пользователь. А так как elements (ключи) contactFormEl совпадают с ключами dataFromLS, присваиваем значение (value) этих ключей через [prop].value)
    } else {
      userData[prop] = dataFromLS[prop];
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

  const submittedData = {
    email: contactFormEl.elements.email.value,
    message: contactFormEl.elements.message.value,
  };

  console.log(submittedData);

  localStorage.removeItem('feedback-form-state');
  contactFormEl.reset();
};

contactFormEl.addEventListener('input', onFormFieldChange);
contactFormEl.addEventListener('submit', onFormSubmit);
