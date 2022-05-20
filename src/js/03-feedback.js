const throttle = require('lodash.throttle');

const formRef = document.querySelector('.feedback-form');

const LOCALSTORAGE_KEY = "feedback-form-state";

const formState = {};

formInitialisation();


formRef.addEventListener('input', throttle(updateLocalStorage, 500));

formRef.addEventListener('submit', onFormSubmit);

function onFormSubmit (evt) {
    evt.preventDefault();
    formStateUpdate();
    localStorage.removeItem(LOCALSTORAGE_KEY);
    console.log(formState);
    formRef.reset();
}

function formStateUpdate () {
    formState.email = formRef.elements.email.value;
    formState.message = formRef.elements.message.value;
}

function updateLocalStorage () {
        formStateUpdate();

    try {
        localStorage.setItem(LOCALSTORAGE_KEY, JSON.stringify(formState));
      } catch (error) {
        console.error("Set state error: ", error.message);
      }
}


function formInitialisation () {

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

