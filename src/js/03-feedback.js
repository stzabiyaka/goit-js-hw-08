const throttle = require('lodash.throttle');

const formRef = document.querySelector('.feedback-form');

const LOCALSTORAGE_KEY = "feedback-form-state";

const formState = {};

initFormState();


formRef.addEventListener('input', throttle(updateLocalStorage, 500));

formRef.addEventListener('submit', onFormSubmit);

function onFormSubmit (evt) {
    evt.preventDefault();
    updateFormState();
    
    if (formState.email === '' || formState.message === '') {
      alert('Please, fill in all the fields');
      return;
    }

    localStorage.removeItem(LOCALSTORAGE_KEY);
    console.log(formState);
    formRef.reset();
}

function updateFormState () {
    formState.email = formRef.elements.email.value;
    formState.message = formRef.elements.message.value;
}

function updateLocalStorage () {
        updateFormState();

    try {
        localStorage.setItem(LOCALSTORAGE_KEY, JSON.stringify(formState));
      } catch (error) {
        console.error("Set state error: ", error.message);
      }
}


function initFormState () {

    const localStorageValue = localStorage.getItem(LOCALSTORAGE_KEY);

    if (!localStorageValue) {
        return
    }

            try {
            const parsedFormState = JSON.parse(localStorageValue);

            formRef.elements.email.value = parsedFormState.email;
            formRef.elements.message.value = parsedFormState.message;  
          } catch (error) {
            console.log('Get state error:', error.message);
          }

            
    }
    

