var inputEmail = document.forms[0].InputEmail;
var inputPass = document.forms[0].InputPassword;
var submitButton = document.querySelector('#logIn-submit');

var DumpUsers = JSON.parse(localStorage.getItem('DumpUsers'));
var userFound = false;

function logIn() {
  for (var i = 0; i < DumpUsers.length; i++) {
    if (
      inputEmail.value == DumpUsers[i][3] &&
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

  if (userFound != true) {
    alert('User Not Found - Are You A New User?');
  }
}

submitButton.addEventListener('click', logIn);
