var bankAmount = document.querySelector('#amount');
var profileName = document.querySelector('#userName');
var profileImage = document.querySelector('.profile-image');
var logOutLink = document.querySelector('#log-out');

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
      profileImage.style.backgroundImage = 'url(' + DumpUsers[i][6] + ')';
      bankAmount.innerText = '$' + DumpUsers[i][5];
    }
  }
}

function main() {
  fillDashboard();
}

main();

logOutLink.addEventListener('click', logOut);
profileName.addEventListener('click', function() {
  window.location.replace('../pages/dashboard.html');
});
