// DOM Interactions
var bankAmount = document.querySelector('#amount');
var bankSpent = document.querySelector('#spent');
var profileName = document.querySelector('#userName');
var profileImage = document.querySelector('.profile-image');
var logOutLink = document.querySelector('#log-out');
var transactionButton = document.querySelector('#transaction-button');
var tableItem = document
  .querySelector('#transaction-item')
  .getElementsByTagName('tbody')[0];

// Form Transfer
var accountID = document.forms[0].accountID;
var transferAmount = document.forms[0].transferAmount;
var submitTransferButton = document.querySelector('#submitTransferButton');

// Form New Transaction
var inputAmount = document.forms[1].InputAmount;
var inputDesc = document.forms[1].InputDesc;
var selectClass = document.forms[1].selectClass;
var submitButton = document.querySelector('#submitButton');

// Set date for transactions
var today = new Date();
var date =
  today.getMonth() + 1 + '-' + today.getDate() + '-' + today.getFullYear(); // 12-3-2019

// Retrieve from LocalStorage
var logIndex = localStorage.getItem('index');
var DumpUsers = JSON.parse(localStorage.getItem('DumpUsers'));
var transactionItem = JSON.parse(localStorage.getItem('transactionList'));

// Use the Main function to work with onLoad callings.
function main() {
  document.forms[0].reset();

  fillDashboard();
  fillTransactionList();

  logOutLink.addEventListener('click', logOut);
  submitButton.addEventListener('click', createTransaction);
  submitTransferButton.addEventListener('click', createTransfer);

  profileName.addEventListener('click', function() {
    window.location.replace('../pages/dashboard.html');
  });
}

// When log out remove Index and isLog from LocalStorage.
function logOut() {
  localStorage.removeItem('index');
  localStorage.removeItem('isLog');

  window.location.replace('../index.html');
}

// Fill the dashboard with the user's information.
function fillDashboard() {
  var accountLogged = findAccount(logIndex);

  profileName.innerText = accountLogged[1] + ' ' + accountLogged[2];
  profileImage.style.backgroundImage = 'url(' + accountLogged[7] + ')';
  bankAmount.innerText = '$' + accountLogged[5];
  bankSpent.innerText = '$' + accountLogged[6];
}

// Fill the transactions from this user to the dashboard.
function fillTransactionList() {
  var myTransaction = new Array();

  for (var i = 0; i < transactionItem.length; i++) {
    if (transactionItem[i][0] == logIndex) {
      myTransaction.push(transactionItem[i]);
    }
  }

  myTransaction.reverse();

  // When the information have been fetched, we start to fill
  // the table with the multiple information.
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

// Take the data from the Form New Transaction
// and create a new transaction.
function createTransaction() {
  var Index = logIndex - 1;

  var newTransaction = [
    logIndex,
    transactionItem.length + 1,
    parseInt(inputAmount.value),
    inputDesc.value,
    selectClass.options[selectClass.selectedIndex].value,
    date
  ];

  if (selectClass.options[selectClass.selectedIndex].value == 'spent') {
    DumpUsers[Index][5] = DumpUsers[Index][5] - parseInt(inputAmount.value);
    DumpUsers[Index][6] = DumpUsers[Index][6] + parseInt(inputAmount.value);
  } else {
    DumpUsers[Index][5] = DumpUsers[Index][5] + parseInt(inputAmount.value);
  }

  transactionItem.push(newTransaction);
  localStorage.setItem('transactionList', JSON.stringify(transactionItem));
  localStorage.setItem('DumpUsers', JSON.stringify(DumpUsers));

  window.location.reload();
}

// Sent money from user to another account.
function createTransfer() {
  var transaction = transferMoney();
  transferTransaction(transaction[0], transaction[1]); // Transaction, Account

  window.location.reload();
}

// Create transfer transaction to be sent and to be receive.
function transferTransaction(transaction, account) {
  var Index = logIndex - 1;
  var thisUser = findAccount(logIndex);

  var newTransaction = [
    logIndex,
    transactionItem.length + 1,
    parseInt(transferAmount.value),
    'Sent money to ' + account[1] + ' ' + account[2],
    'spent',
    date
  ];

  var transactionTo = [
    account[0],
    transactionItem.length + 1,
    parseInt(transaction[1]),
    'Received money from ' + thisUser[1] + ' ' + thisUser[2],
    'earn',
    date
  ];

  DumpUsers[Index][5] = DumpUsers[Index][5] - parseInt(transferAmount.value); // Balance - Transfer money
  DumpUsers[Index][6] = DumpUsers[Index][6] + parseInt(transferAmount.value); // Spent + Transfer money
  DumpUsers[account[0] - 1][5] =
    DumpUsers[account[0] - 1][5] + parseInt(transferAmount.value); //Another User Balance + Transfer money

  transactionItem.push(newTransaction);
  transactionItem.push(transactionTo);

  localStorage.setItem('transactionList', JSON.stringify(transactionItem));
  localStorage.setItem('DumpUsers', JSON.stringify(DumpUsers));
}

//If accountID found, get user information, else alert 'not found'
function transferMoney() {
  var accountToTransfer = findAccount(accountID.value);
  var transferInfo = null;

  if (accountToTransfer == '') {
    alert('Account not found');
  } else {
    transferInfo = [[accountID.value, transferAmount.value]];
  }

  transferInfo.push(accountToTransfer);
  return transferInfo;
}

// Given an ID get the user information.
function findAccount(id) {
  var accountFound = new Array();

  for (var i = 0; i < DumpUsers.length; i++) {
    if (DumpUsers[i][0] == id) {
      accountFound = DumpUsers[i];
    }
  }

  return accountFound;
}

main();
