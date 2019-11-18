var registerButton = document.querySelector('#register-button');
var DumpUsers = [['admin@admin.com', '123456', 'admin', 'admin']];

var myStorage;

function registerUser() {
  var fname = document.querySelector('#InputFName').value;
  var lname = document.querySelector('#InputLName').value;
  var rEmail = document.querySelector('#rEmail').value;
  var rPasswd = document.querySelector('#rPasswd').value;
  var newUser = [rEmail, rPasswd, fname, lname];

  DumpUsers.push(newUser);
  myStorage = DumpUsers;
  localStorage.setItem('myStorage', JSON.stringify(DumpUsers));
}

registerButton.addEventListener('click', registerUser);
