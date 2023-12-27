import { RetrieveData ,scrollToTop ,getCookie,deleteCookie ,showPopup} from "./main.js";
const contactForm= document.getElementById("contactForm");
let popup = document.getElementById("popup");

const emailRegEx = /^[a-z0-9]+@[a-z]+.[a-z]{2,3}$/;
const telRegEx = /^(\+010-|\+012|\+011)?\d{11}$/;


function ValidateEmail() {
let email = contactForm.elements.email.value;
let validatedEmail=emailRegEx.test(email); 
if (!validatedEmail) {
    showPopup("Email Not valid")
return false;   
}
return true
}
function ValidatePhoneNumber() {
let phoneNumber = contactForm.elements.phoneNumber.value;
let validatedPhoneNumber=telRegEx.test(phoneNumber); 
if (!validatedPhoneNumber) {
    showPopup("Please enter a valid phone number")
return false;    
}
return true;   
}
function submitForm() {
    let phoneNumber = contactForm.elements.phoneNumber.value;
    let message = contactForm.elements.message.value;

    let to = 'mr.koupea@gmail.com';
    let subject = 'Thanks!';
    let body = 'Message: ' + message + '\nPhone Number: ' + phoneNumber;

    let encodedSubject = encodeURIComponent(subject);
    let encodedBody = encodeURIComponent(body);
    let mailtoLink = 'mailto:' + to + '?subject=' + encodedSubject + '&body=' + encodedBody;

    // Open the default email client
    window.location.href = mailtoLink;
    setTimeout(function() {
        contactForm.reset();
    }, 3000);  
}

contactForm.addEventListener("submit", function(event) {
    event.preventDefault();
   

    if (ValidateEmail() && ValidatePhoneNumber()) {
    submitForm();
};
})

document.addEventListener("DOMContentLoaded",function(){
    if (!getCookie('logedIn')) {
        location.assign('/index.html')
    }
    RetrieveData();

})

// sign out function 
document.getElementById('signOut').addEventListener('click',()=>{deleteCookie('logedIn')})
  