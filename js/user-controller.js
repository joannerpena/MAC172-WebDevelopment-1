var submitButton = document.querySelector('#login-button');
// var DumpUsers = [['admin@admin.com', '123456', 'admin', 'admin']];

var DumpUsers = JSON.parse(localStorage.getItem('myStorage'));

function logIn() {
  var emailInput = document.forms[0].InputEmail.value;
  var passwd = document.forms[0].InputPassword.value;

  for (var i = 0; i <= DumpUsers.length; i++) {
    if (emailInput == DumpUsers[i][0] && passwd == DumpUsers[i][1]) {
      window.location.replace('../index.html');
      break;
    }
  }
}

submitButton.addEventListener('click', logIn);
