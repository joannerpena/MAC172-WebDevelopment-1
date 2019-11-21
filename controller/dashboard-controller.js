var bankAmount = document.querySelector('#amount');
var profileName = document.querySelector('#userName');
var profileImage = document.querySelector('.profile-image');
var logOutLink = document.querySelector('#log-out');
var transactionButton = document.querySelector('#transaction-button');
// var transactionForm = document.querySelector('#transaction-form');

var today = new Date();
var date =
  today.getMonth() + 1 + '-' + today.getDate() + '-' + today.getFullYear();

var DumpUsers = JSON.parse(localStorage.getItem('DumpUsers'));
var transactionList = [[1, 200, 'Coffee', 'Spent', date]];

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
      profileImage.style.backgroundImage = 'url(' + DumpUsers[i][6] + ')';
      bankAmount.innerText = '$' + DumpUsers[i][5];
    }
  }
}

function main() {
  fillDashboard();

  logOutLink.addEventListener('click', logOut);

  profileName.addEventListener('click', function() {
    window.location.replace('../pages/dashboard.html');
  });
}

main();
