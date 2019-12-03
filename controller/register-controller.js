var inputName = document.forms[0].InputName;
var inputLName = document.forms[0].InputLName;
var inputEmail = document.forms[0].InputEmail;
var inputPass = document.forms[0].InputPassword;
var inputAmount = document.forms[0].InputAmount;
var submitButton = document.querySelector('#signUp-submit');

var validated = false;
var DumpUsers = JSON.parse(localStorage.getItem('DumpUsers'));

function registerUser() {
  validated = validateUser();
  if (validated == true) {
    if ('DumpUsers' in localStorage) {
      var index = DumpUsers.length + 1;
      var newUser = [
        index,
        inputName.value,
        inputLName.value,
        inputEmail.value,
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
}

function validateUser() {
  for (var i = 0; i < DumpUsers.length; i++) {
    if (inputEmail.value == DumpUsers[i][3]) {
      alert('This email has been used for another user. Try another one.');
      inputEmail.classList.add('is-invalid');
      validated = false;
    } else {
      validated = true;
    }
  }

  if (inputAmount.value < 0) {
    inputAmount.classList.add('is-invalid');
    alert('Not amount below 0 allowed');
    validated = false;
  }

  return validated;
}

function main() {
  submitButton.addEventListener('click', registerUser);
}

main();
