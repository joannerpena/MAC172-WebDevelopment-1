var logLink = document.querySelector('#login-link');

function StartedSetup() {
  if ('DumpUsers' in localStorage) {
    return;
  } else {
    var DumpUsers = [
      [1, 'Jose', 'Pena', 'admin@admin.com', 'admin', 10000],
      [2, 'Admin', 'Pena', 'pena@admin.com', 'admin', 90000]
    ];
    localStorage.setItem('DumpUsers', JSON.stringify(DumpUsers));
  }
}

function isLog() {
  var Users = JSON.parse(localStorage.getItem('DumpUsers'));
  var logIndex = localStorage.getItem('index');

  if ('isLog' in localStorage) {
    logLink.setAttribute('href', './pages/dashboard.html');

    for (var i = 0; i < Users.length; i++) {
      if (Users[i][0] == logIndex) {
        logLink.innerText = Users[i][1];
      }
    }
  }
}

function main() {
  StartedSetup();
  isLog();
}

main();
