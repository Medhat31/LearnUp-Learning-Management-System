// Input validation
var userName = document.querySelector(".userName input");
var password = document.querySelector(".password input");
var checkBox = document.querySelector("input[type='checkbox']");
var errorMsgElement = document.querySelector(".error");
var submitBtn = document.querySelector(".submit input");

// Regular Expressions
var uNameRegex = /^(?!\s*$).+/;
var passwordRegex = /^(?!\s*$).{6,}$/;

submitBtn.addEventListener("click", function(e){
    e.preventDefault();
    if((! uNameRegex.test(userName.value)) || (! passwordRegex.test(password.value))){
         errorMsgElement.style.visibility = "visible";
    }else{
        errorMsgElement.style.visibility = "hidden";
    }
});


