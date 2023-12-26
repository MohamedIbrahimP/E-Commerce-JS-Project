import { saveCookie } from "./main.js";

let logInBtn =document.getElementById('logInBtn');
let registertionForm =document.getElementById("registertionForm");
let logInForm=document.getElementById("logInForm");
let replaceFormBtn1 =document.getElementById('replaceFormBtn1');
let replaceFormBtn2 =document.getElementById('replaceFormBtn2');
replaceFormBtn1.addEventListener("click",()=> {
    toggleClass(replaceFormBtn1);
})
replaceFormBtn2.addEventListener("click",()=> {
    toggleClass(replaceFormBtn2);
})
logInBtn.addEventListener('click',()=>{
    saveCookie('logedIn',true)
})
function toggleClass(element) {
    element.classList.toggle('click');
    registertionForm.classList.toggle('hide');
    logInForm.classList.toggle('show');
}