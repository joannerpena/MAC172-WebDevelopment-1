var bankAmount = document.querySelector('#amount');
var profileName = document.querySelector('#userName');
var profileImage = document.querySelector('.profile-image');
var logOutLink = document.querySelector('#log-out');
var transactionButton = document.querySelector('#transaction-button');
var tableItem = document
  .querySelector('#transaction-item')
  .getElementsByTagName('tbody')[0];

var inputAmount = document.forms[0].InputAmount;
var inputDesc = document.forms[0].InputDesc;
var selectClass = document.forms[0].selectClass;
var submitButton = document.querySelector('#submitButton');

var today = new Date();
var date =
  today.getMonth() + 1 + '-' + today.getDate() + '-' + today.getFullYear();

var logIndex = localStorage.getItem('index');
var DumpUsers = JSON.parse(localStorage.getItem('DumpUsers'));
var transactionItem = JSON.parse(localStorage.getItem('transactionList'));

function logOut() {
  localStorage.removeItem('index');
  localStorage.removeItem('isLog');

  window.location.replace('../index.html');
}

function fillDashboard() {
  for (var i = 0; i < DumpUsers.length; i++) {
    if (DumpUsers[i][0] == logIndex) {
      profileName.innerText = DumpUsers[i][1] + ' ' + DumpUsers[i][2];
      profileImage.style.backgroundImage = 'url(' + DumpUsers[i][6] + ')';
      bankAmount.innerText = '$' + DumpUsers[i][5];
    }
  }
}

function fillTransactionList() {
  var myTransaction = new Array();

  for (var i = 0; i < transactionItem.length; i++) {
    if (transactionItem[i][0] == logIndex) {
      myTransaction.push(transactionItem[i]);
    }
  }

  for (var i = 0; i < myTransaction.length; i++) {
    var tableRow = tableItem.insertRow(i);
    var transactionID = tableRow.insertCell(0);
    var transactionAmount = tableRow.insertCell(1);
    var transactionDesc = tableRow.insertCell(2);
    var transactionDate = tableRow.insertCell(3);

    transactionID.innerHTML = myTransaction[i][1];
    transactionAmount.innerHTML = myTransaction[i][2];
    transactionDesc.innerHTML = myTransaction[i][3];
    transactionDate.innerHTML = myTransaction[i][5];
  }
}

function createTransaction() {
  var newTransaction = [
    logIndex,
    transactionItem.length + 1,
    parseInt(inputAmount.value),
    inputDesc.value,
    selectClass.options[selectClass.selectedIndex].value,
    date
  ];

  transactionItem.push(newTransaction);
  localStorage.setItem('transactionList', JSON.stringify(transactionItem));

  window.location.reload();
}

function main() {
  document.forms[0].reset();

  fillDashboard();
  fillTransactionList();

  logOutLink.addEventListener('click', logOut);
  submitButton.addEventListener('click', createTransaction);

  profileName.addEventListener('click', function() {
    window.location.replace('../pages/dashboard.html');
  });
}

main();
