var inputName = document.forms[0].InputName;
var inputLName = document.forms[0].InputLName;
var inputEmail = document.forms[0].InputEmail;
var inputPass = document.forms[0].InputPassword;
var inputAmount = document.forms[0].InputAmount;
var submitButton = document.querySelector('#signUp-submit');

var DumpUsers = JSON.parse(localStorage.getItem('DumpUsers'));

function registerUser() {
  if ('DumpUsers' in localStorage) {
    var index = DumpUsers.length + 1;
    var newUser = [
      index,
      inputName.value,
      inputLName.value,
      inputEmail.value,
      inputPass.value,
      parseInt(inputAmount.value),
      '../img/default-profile.jpg'
    ];

    DumpUsers.push(newUser);
    localStorage.setItem('DumpUsers', JSON.stringify(DumpUsers));

    localStorage.setItem('isLog', true);
    localStorage.setItem('index', index);
    window.location.replace('../pages/dashboard.html');
  }
}

function main() {
  submitButton.addEventListener('click', registerUser);
}

main();
