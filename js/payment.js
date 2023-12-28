const publishableKey = 'pk_test_51ONLHTBZc1zgzU8bpM8Q664yy4GnG2QY2nqwuShvIvtp2xH2idUrUq3QJsi15rmZExEFzi9ObtxCcVUQp3CYmxB900Vuoc38cY';

const stripe = Stripe(publishableKey);
const elements = stripe.elements();
const card = elements.create('card',{hidePostalCode: true,});
card.mount('#card-element');


let totalPrice = parseInt(localStorage.getItem('totalPrice'));
let paymentFormLabel =document.getElementById('paymentFormLabel')
let form =document.getElementById('payment-form');
paymentFormLabel.innerHTML =`You will pay ${totalPrice} EGP`;
let check ={name:'Check From Our Site' , price: totalPrice}
// Handle form submission.

const pay = document.getElementById('pay');
pay.addEventListener('click', async function(e) {
  e.preventDefault();
  pay.innerText=('Processing...');
  pay.disabled=true;
  const fullName = document.getElementById('fullName').value;
const email =document.getElementById('email').value;
const phoneNumber=document.getElementById('phoneNumber').value;
const address =document.getElementById('address').value;
const pillingInfo={
  name:fullName,
phone:phoneNumber,
email:email,
address:{
  line1:address
}
}
const cardElement =elements.getElement('card');
try {
  const paymentResponse = await fetch('http://localhost:3000/payment', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    amount: check.price * 100,
    metadata: {
      description: check.name,
    },
  }),
});
const paymentIntent = await paymentResponse.json(); // Extract JSON from the response body

const paymentMethodInfo = await stripe.createPaymentMethod({
  type: 'card',
  card: cardElement,
  billing_details: pillingInfo,
});


const confirmed = await stripe.confirmCardPayment(paymentIntent.clientSecret, {
  payment_method: paymentMethodInfo.paymentMethod.id,
});
console.log(confirmed);
if (confirmed.error) {
  console.error(confirmed.error);
  pay.innerText='Error!';
} 
else if (confirmed.paymentIntent.status === 'succeeded') {
  pay.innerText='Payment succeeded!';
  form.reset();
  card.clear();
  clearLocalStorageCart();
  paymentFormLabel.textContent =`Your Paid Succeed, Thank You!` ;
  
  setTimeout(() => {
    location.replace('/E-Commerce-JS-Project/home.html');
  }, 2000);
  
}
} 
catch (error) {
  console.log(error.message);
  pay.innerText='Error!';
  pay.disabled=false;
}

});

function clearLocalStorageCart() {
  localStorage.removeItem('cartItems');
  localStorage.removeItem('cartCount');
  localStorage.removeItem('totalPrice');
  cartItems = [];
  cartCount = 0;
  cartCounter.innerHTML='';
}