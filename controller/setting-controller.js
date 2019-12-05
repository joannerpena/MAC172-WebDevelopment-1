var logIndex = localStorage.getItem('index');

var profileName = document.querySelector('#userName');
var profileImage = document.querySelector('.profile-image');
var logOutLink = document.querySelector('#log-out');
var logOutMenu = document.querySelector('#logOut-menu');

var inputName = document.forms[0].InputName;
var inputLName = document.forms[0].InputLName;
var inputEmail = document.forms[0].InputEmail;
var inputAmount = document.forms[0].InputAmount;
var thumbnail = document.querySelector('#profile-image-setting');
var inputImage = document.forms[0].InputImage;
var saveButton = document.querySelector('#profile-saveButton');

var DumpUsers = JSON.parse(localStorage.getItem('DumpUsers'));

function logOut() {
  localStorage.removeItem('index');
  localStorage.removeItem('isLog');

  window.location.replace('../index.html');
}

function fillNav() {
  for (var i = 0; i < DumpUsers.length; i++) {
    if (DumpUsers[i][0] == logIndex) {
      profileName.innerText = DumpUsers[i][1] + ' ' + DumpUsers[i][2];
      profileImage.style.backgroundImage = 'url(' + DumpUsers[i][7] + ')';
    }
  }
}

function fillProfileForm() {
  for (var i = 0; i < DumpUsers.length; i++) {
    if (DumpUsers[i][0] == logIndex) {
      inputName.value = DumpUsers[i][1];
      inputLName.value = DumpUsers[i][2];
      inputEmail.value = DumpUsers[i][3];
      inputAmount.value = DumpUsers[i][5];
      thumbnail.setAttribute('src', DumpUsers[i][7]);
    }
  }
}

function changeProfileValue() {
  for (var i = 0; i < DumpUsers.length; i++) {
    if (DumpUsers[i][0] == logIndex) {
      DumpUsers[i][1] =
        inputName.value.charAt(0).toUpperCase() + inputName.value.slice(1);
      DumpUsers[i][2] =
        inputLName.value.charAt(0).toUpperCase() + inputLName.value.slice(1);
      DumpUsers[i][3] = inputEmail.value.toLowerCase();
      DumpUsers[i][5] = parseInt(inputAmount.value);
      if (inputImage.value.length !== 0) {
        DumpUsers[i][7] = inputImage.value + '.jpg';
      }

      localStorage.setItem('DumpUsers', JSON.stringify(DumpUsers));
      window.location.reload();
    }
  }
}

function logOut() {
  localStorage.removeItem('index');
  localStorage.removeItem('isLog');

  window.location.replace('../index.html');
}

function main() {
  document.forms[0].reset();

  fillNav();
  fillProfileForm();

  logOutLink.addEventListener('click', logOut);
  logOutMenu.addEventListener('click', logOut);
  saveButton.addEventListener('click', changeProfileValue);

  profileName.addEventListener('click', function() {
    window.location.replace('../pages/dashboard.html');
  });
}

main();
