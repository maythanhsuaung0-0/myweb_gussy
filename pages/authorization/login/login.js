import * as func from "../../../js/main.js";
let form = document.getElementById("signInForm");
let mail = document.getElementById("signInMail");
let pwdContainer = document.getElementById("signInPwdContainer");
let password = document.getElementById("signInPwd");
let displayErrEmail = document.getElementById("displayErrEmail");
let displayErrPwd = document.getElementById("displayErrPwd");
let loginIcon = document.getElementById("loginIcon");

let data = { username: "May", email: "may@gmail.com", password: "ti1Rpwd1Ru!" };
sessionStorage.setItem("activeUser", "false");

if (!sessionStorage.getItem("user")) {
  sessionStorage.setItem("user", JSON.stringify(data));
}

let existingUser = JSON.parse(sessionStorage.getItem("user"));
function checkMailExist(val) {
  if (existingUser["email"] != val) {
    mail.classList.add("weak");
    displayErrEmail.innerText =
      "Sorry, there is no account with this email address";
    return false;
  } else {
    mail.classList.remove("weak");
    displayErrEmail.innerText = "";
    return true;
  }
}
function checkPw(val) {
  if (existingUser["password"] != val) {
    pwdContainer.classList.add("weak");
    displayErrPwd.innerText = "Password incorrect, try again!";
    return false;
  } else {
    pwdContainer.classList.remove("weak");
    displayErrPwd.innerText = "";
    return true;
  }
}

function handleSignIn(pw, address) {
  let validPassword = checkPw(pw);
  let validEmail = checkMailExist(address);
  if (validPassword && validEmail) {
    sessionStorage.setItem("activeUser", "true");
    // window.location.href = "../../../index.html"
    window.location.href = "../welcome.html";
  }
}

mail.addEventListener("blur", function (e) {
  e.preventDefault();
  checkMailExist(mail.value);
});
password.addEventListener("blur", function (e) {
  e.preventDefault();
  checkPw(password.value);
});
loginIcon.onclick = function (e) {
  e.preventDefault();
  func.swapIcon(password, loginIcon);
};
form.addEventListener("submit", function (e) {
  e.preventDefault();
  handleSignIn(password.value, mail.value);
});
