export var cartItems = [];
let cartCount = 0;
let cartCounter = document.getElementById("cartCounter");
let backToTopBtn =document.getElementById("backToTopBtn");


window.onscroll = function () {
    var scrollThreshold = 300;
    if (document.body.scrollTop > scrollThreshold || document.documentElement.scrollTop > scrollThreshold) {
       backToTopBtn.style.opacity=1;
    }
    else{
        backToTopBtn.style.opacity=0;
    }
}
export function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
}
export function RetrieveData() {
    // Retrieve cartCount from local storage if available
        if (localStorage.getItem('cartCount')) {
            cartCount = parseInt(localStorage.getItem('cartCount'));
            cartCounter.textContent = cartCount;
        }
        if (localStorage.getItem('cartItems')) {
            cartItems = JSON.parse(localStorage.getItem('cartItems'));
        }
}
export function viewCart() {
    if (cartItems.length === 0) {
        clearLocalStorageCart();
    } else {
    
        for (let i in cartItems) {
           DrawTable(i, cartItems[i]);
        }
    }
}
export function saveCookie(key, value ) {
    var expireDate = new Date();
    expireDate.setDate(expireDate.getDate() + 3);
    document.cookie = `${key}=${value};expires=${expireDate}`
}
export function getCookie(key) {
    var allCookiesArr = document.cookie.split("; ")
    for(var i =0;i<allCookiesArr.length;i++){
        if(allCookiesArr[i].startsWith(key)){
            //console.log(allCookiesArr[i].split("=")[1]);
            return allCookiesArr[i].split("=")[1]
        }
    }
}
export function deleteCookie(key) {
    var lastDate = new Date();
    lastDate.setDate(lastDate.getDate() - 1);
    document.cookie = `${key}= ;expires=${lastDate}`
}
export function showPopup(message) {
    popup.textContent = message;
    popup.style.opacity = "1";
    setTimeout(function () {
      popup.style.opacity = "0";
    }, 1500);
}
function DrawTable(index,product) {
index-=0;
    let tbody=document.getElementById('tbody')
    let row =document.createElement('tr'); row.id='row';
    let cell1=document.createElement('td');
    let cell2=document.createElement('td');
    let cell3=document.createElement('td');
    let cell4=document.createElement('td');
    let cell5=document.createElement('td');
    let image=document.createElement('img'); image.id='image';
    let deleteBtn=document.createElement('button'); deleteBtn.id='deleteBtn';
    let plusBtn=document.createElement('button'); plusBtn.id='plusBtn';
    let counter=document.createElement('span'); counter.id=`counter${index}`;
    let negativeBtn=document.createElement('button'); negativeBtn.id='negativeBtn';
// -----------------------
deleteBtn.innerHTML = '<i class="bi bi-trash3-fill"></i>';
plusBtn.innerHTML='<i class="bi bi-plus-square"></i>';
negativeBtn.innerHTML='<i class="bi bi-dash-square"></i>';


deleteBtn.addEventListener('click',function(){DeleteFromCart(index)});
plusBtn.addEventListener('click',function(){Increasing(this,index)});
negativeBtn.addEventListener('click',function(){Decreasing(this,index)});
counter.innerText='1';
// -----------------------
cell1.textContent=index+1;
image.src=product.image;
cell2.append(image);
cell3.textContent=product.title;
cell4.textContent=product.price+ ' EGP';
cell5.append(deleteBtn);
cell5.append(negativeBtn);
cell5.append(counter);
cell5.append(plusBtn);

// ------------
row.append(cell1);
row.append(cell2);
row.append(cell3);
row.append(cell4);
row.append(cell5);
tbody.append(row);


}


document.addEventListener("DOMContentLoaded", function () {
    RetrieveData(); 
});

function DeleteFromCart(index) {
    cartCount--;
    if(cartCount == 0) {
        clearLocalStorageCart();
    }
    cartCounter.textContent = cartCount;
    cartItems = cartItems.filter(function (_, i) {
        return i !== index;
    });
   
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
    localStorage.setItem('cartCount', cartCount.toString());
    tbody.innerHTML='';
    viewCart();
}
function Increasing(btn,index) {
   var counterElement = document.getElementById(`counter${index}`);
   var counterValue = parseInt(counterElement.innerHTML);
   counterValue++;
   counterElement.innerHTML = counterValue;
   var parentElement = btn.parentNode;
   var negativeBtn =parentElement.childNodes[1];
   negativeBtn.disabled=false;
}
function Decreasing(btn,index) {
    var counterElement = document.getElementById(`counter${index}`);
    var counterValue = parseInt(counterElement.innerHTML);
    if (counterValue==0) {
        counterValue=0;
        btn.disabled=true;
    }else{
        counterValue--;
    }
    counterElement.innerHTML = counterValue;
}
function clearLocalStorageCart() {
        localStorage.removeItem('cartItems');
        localStorage.removeItem('cartCount');
        localStorage.removeItem('totalPrice');
        cartItems = [];
        cartCount = 0;
        cartCounter.innerHTML='';
}
   


