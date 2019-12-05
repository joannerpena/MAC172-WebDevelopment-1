// DOM Interaction
var formAlert = document.querySelector('#signUp-alert');
var closeAlert = document.querySelector('#close-alert');

// Form Sign Up
var inputName = document.forms[0].InputName;
var inputLName = document.forms[0].InputLName;
var inputEmail = document.forms[0].InputEmail;
var inputPass = document.forms[0].InputPassword;
var inputAmount = document.forms[0].InputAmount;
var submitButton = document.querySelector('#signUp-submit');

// Variables
var validated = null;

// Retrieve data from LocalStorage
var DumpUsers = JSON.parse(localStorage.getItem('DumpUsers'));

function main() {
  document.forms[0].reset();

  submitButton.addEventListener('click', registerUser);
  closeAlert.addEventListener('click', closeAlertNotificacion);

  inputName.addEventListener('focus', function() {
    inputName.classList.remove('is-invalid');
  });
  inputLName.addEventListener('focus', function() {
    inputLName.classList.remove('is-invalid');
  });
  inputEmail.addEventListener('keydown', function() {
    inputEmail.classList.remove('is-invalid');
  });
  inputAmount.addEventListener('focus', function() {
    inputAmount.classList.remove('is-invalid');
  });
}

function registerUser() {
  var formValidated = formVerification();
  validated = validateUser();

  if (formValidated) {
    if (validated == true) {
      if ('DumpUsers' in localStorage) {
        var index = DumpUsers.length + 1;
        var newUser = [
          index,
          inputName.value,
          inputLName.value,
          inputEmail.value.toLowerCase(),
          inputPass.value,
          parseInt(inputAmount.value),
          0,
          '../img/default-profile.jpg'
        ];

        DumpUsers.push(newUser);
        localStorage.setItem('DumpUsers', JSON.stringify(DumpUsers));

        localStorage.setItem('isLog', true);
        localStorage.setItem('index', index);
        window.location.replace('../pages/dashboard.html');
      }
    } else {
      return;
    }
  } else {
    triggerAlert('Some needed field are missing.');
    return;
  }
}

function validateUser() {
  for (var i = 0; i < DumpUsers.length; i++) {
    if (DumpUsers[i][3] === inputEmail.value) {
      triggerAlert(
        'This email has been used for another user. Try another one.'
      );
      inputEmail.classList.add('is-invalid');
      validated = false;
      break;
    } else {
      validated = true;
    }
  }

  if (inputAmount.value < 0) {
    inputAmount.classList.add('is-invalid');
    triggerAlert('Not amount below 0 allowed');
    validated = false;
  }

  return validated;
}

function triggerAlert(text) {
  formAlert.firstChild.data = text;
  formAlert.classList.toggle('show');
}

function closeAlertNotificacion() {
  formAlert.classList.remove('show');
}

function formVerification() {
  if (inputName.value == '') {
    inputName.classList.add('is-invalid');
    return false;
  } else if (inputLName.value == '') {
    inputLName.classList.add('is-invalid');
    return false;
  } else if (inputEmail.value == '') {
    inputEmail.classList.add('is-invalid');
    return false;
  } else if (inputPass.value == '') {
    inputPass.classList.add('is-invalid');
    return false;
  } else if (inputAmount.value == '') {
    inputAmount.classList.add('is-invalid');
    return false;
  } else {
    return true;
  }
}

main();
