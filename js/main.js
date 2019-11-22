var logLink = document.querySelector('#login-link');

var today = new Date();
var date =
  today.getMonth() + 1 + '-' + today.getDate() + '-' + today.getFullYear();

function StartedSetup() {
  if ('DumpUsers' in localStorage) {
    return;
  } else {
    var DumpUsers = [
      [
        1,
        'Jose',
        'Pena',
        'admin@admin.com',
        'admin',
        10000,
        'https://imgur.com/hdB08vt.jpg'
      ],
      [
        2,
        'Admin',
        'Pena',
        'pena@admin.com',
        'admin',
        90000,
        '../img/default-profile.jpg'
      ]
    ];

    if ('transactionList' in localStorage) {
      return;
    } else {
      var transactionList = [
        [1, 1, 200, 'Coffee', 'Spent', date],
        [2, 1, 400, 'Phone Bill', 'Spent', date]
      ];
      localStorage.setItem('transactionList', JSON.stringify(transactionList));
    }

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
