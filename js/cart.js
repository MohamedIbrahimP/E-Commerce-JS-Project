import { scrollToTop, RetrieveData,viewCart,cartItems,getCookie,deleteCookie } from "./main.js";
let totalPriceCell= document.getElementById('totalPrice')
let goCheckBtn= document.getElementById('goCheckBtn');
let cartTable= document.getElementById('cartTable')

window.addEventListener('DOMContentLoaded',function(){
    if (!getCookie('logedIn')) {
        location.assign('/index.html')
    }
    viewCart();
    CalcTotal();
    if (cartItems.length === 0) {
        goCheckBtn.disabled=true
        cartTable.style.display='none'
    }
})

setInterval(()=>{CalcTotal();},0)
function CalcTotal() {
    if (cartItems.length === 0) {
        totalPriceCell.innerHTML='';
            goCheckBtn.disabled=true
            cartTable.style.display='none'
        
    } else {
    let totalPrice=0
        for (let i in cartItems) {
          let counter=document.getElementById(`counter${i}`);
          let counterValue = parseInt(counter.innerHTML);
          let price =cartItems[i].price;
          let totalForProduct=price*counterValue;
          totalPrice+=totalForProduct;
          
        }
        if (totalPrice===0) {
            totalPriceCell.innerHTML='---<b>EGP</b>';
            goCheckBtn.disabled=true
        }else{
        totalPriceCell.innerHTML=totalPrice+' <b>EGP</b>';
        localStorage.setItem('totalPrice', totalPrice.toString());
        goCheckBtn.disabled=false
    }}
}


// sign out function 
document.getElementById('signOut').addEventListener('click',()=>{deleteCookie('logedIn')})
backToTopBtn.addEventListener("click", scrollToTop);
goCheckBtn.addEventListener('click',function(){
    location.assign('/payment.html');
});