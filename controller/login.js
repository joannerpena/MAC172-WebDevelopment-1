// DOM Interaction
var formAlert = document.querySelector('#logIn-alert');
var closeAlert = document.querySelector('#close-alert');

// Variables
var userFound = null;

// Form Login
var inputEmail = document.forms[0].InputEmail;
var inputPass = document.forms[0].InputPassword;
var submitButton = document.querySelector('#logIn-submit');

// Retrieve data from LocalStorage
var DumpUsers = JSON.parse(localStorage.getItem('DumpUsers'));

function main() {
  document.forms[0].reset();

  closeAlert.addEventListener('click', closeAlertNotificacion);

  submitButton.addEventListener('click', logIn);

  inputEmail.addEventListener('keydown', function() {
    inputEmail.classList.remove('is-invalid');
  });
  inputPass.addEventListener('keydown', function() {
    inputPass.classList.remove('is-invalid');
  });
}

function logIn() {
  var emailValidation = validateEmail(inputEmail);

  for (var i = 0; i < DumpUsers.length; i++) {
    if (!emailValidation) {
      triggerAlert('Please provide a valid email address');
      inputEmail.classList.add('is-invalid');
      inputPass.value = '';
      break;
    }

    if (
      inputEmail.value.toLowerCase() == DumpUsers[i][3] &&
      inputPass.value == DumpUsers[i][4]
    ) {
      userFound = true;

      if ('isLog' in localStorage) {
        return;
      } else {
        localStorage.setItem('isLog', true);
        localStorage.setItem('index', DumpUsers[i][0]);
      }

      window.location.replace('dashboard.html');
    } else {
      userFound = false;
    }
  }

  if (userFound == false) {
    inputEmail.classList.add('is-invalid');
    inputPass.classList.add('is-invalid');
    inputPass.value = '';
    triggerAlert('Wrong Email or Password');
  }
}

function closeAlertNotificacion() {
  formAlert.classList.remove('show');
}

function triggerAlert(text) {
  formAlert.firstChild.data = text;
  formAlert.classList.add('show');
}

function validateEmail(email) {
  var filter = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;

  if (!filter.test(email.value)) {
    email.classList.add('is-invalid');
    return false;
  }

  return true;
}

main();
