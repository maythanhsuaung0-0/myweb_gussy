import * as func from '../../js/main.js'
let username = document.getElementById("username");
let email = document.getElementById("email");
let passwordContainer = document.getElementById("passwordContainer");
let confirmPasswordContainer = document.getElementById("confirmPasswordContainer");
let pwd = document.getElementById("password")
let confirmPw = document.getElementById("confirmPassword");
let pwIcon = document.getElementById("pwIcon");
let confirmPwIcon = document.getElementById("confirmPwIcon");
let signUp = document.getElementById("signUp");
let display = document.getElementById("displayWarning");
let displayWrong = document.getElementById("wrong");
let form = document.getElementById("form");
let user = {};

let data = {"username": "May", "email":"may@gmail.com", "password":"ti1Rpwd1Ru!"};
if(!sessionStorage.getItem("user")){
    sessionStorage.setItem('user', JSON.stringify(data));
}
function Update(value){
    let prevData = JSON.parse(sessionStorage.getItem("user"))
    Object.keys(value).forEach(function(val, key){
        prevData[val] = value[val];
   })
   sessionStorage.setItem('user', JSON.stringify(prevData));
}
function checkPassword(pw){
    if (pw.match( /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,20}$/)) {
      console.log("strong",pw);
      passwordContainer.classList.remove("weak");
      passwordContainer.classList.add("strong");
      display.innerText = ""
    }
    else{
        console.log("weak",pw);
        passwordContainer.classList.remove("strong")
        passwordContainer.classList.add("weak")
        display.innerText = "Your password is not strong enough";
        return false;
      }
    if (pw.length < 6) {
        display.innerText = "minimum number of characters is 6";
        return false;
    }
    return true;
}

function handleForm(){
    let valid = checkPassword(pwd.value);
    console.log(pwd.value == confirmPw.value && valid)
    if(pwd.value == confirmPw.value && valid){
        user["username"] = username.value;
        user["email"] = email.value;
        user["password"] = pwd.value;
        Update(user);
        window.location.href = "./login/loginPage.html"
    }
   
}
pwd.addEventListener("blur",function(event){
        event.preventDefault();
        checkPassword(pwd.value)
})
confirmPw.addEventListener("blur",function(event){
    event.preventDefault();
    if(confirmPw.value != pwd.value){
        confirmPasswordContainer.classList.add("weak");
        displayWrong.innerText = "Type again!! your confirm password is wrong"
    }
    else{
        confirmPasswordContainer.classList.remove("weak");
        displayWrong.innerText = ""
    }
})

pwIcon.onclick = function(e){
    e.preventDefault();
    func.swapIcon(pwd,pwIcon)
}
confirmPwIcon.onclick = function(e){
    e.preventDefault();
    func.swapIcon(confirmPw,confirmPwIcon)
}

signUp.onclick = function(event){
    event.preventDefault();
    handleForm();

}
form.addEventListener("submit",function(e){
    e.preventDefault();
    handleForm();
})


