var logOutButton = document.querySelector('#userName');
var bankAmount = document.querySelector('#amount');
var profileName = document.querySelector('#userName');

var DumpUsers = JSON.parse(localStorage.getItem('DumpUsers'));

function logOut() {
  localStorage.removeItem('index');
  localStorage.removeItem('isLog');

  window.location.replace('../index.html');
}

function fillDashboard() {
  var logIndex = localStorage.getItem('index');

  for (var i = 0; i < DumpUsers.length; i++) {
    if (DumpUsers[i][0] == logIndex) {
      profileName.innerText = DumpUsers[i][1] + ' ' + DumpUsers[i][2];
      bankAmount.innerText = '$' + DumpUsers[i][5];
    }
  }
}

function main() {
  fillDashboard();
}

main();

logOutButton.addEventListener('click', logOut);
