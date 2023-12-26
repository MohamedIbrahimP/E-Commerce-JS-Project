import { scrollToTop, RetrieveData,getCookie,deleteCookie,showPopup } from "./main.js";
var cartItems = [];
let cartCount = 0;
let cartCounter = document.getElementById("cartCounter");

//#region slider
let sliderImages = ["slider1.jpg", "slider2.jpg", "slider3.jpg", "slider4.jpg"];
let index = 0;
function SlideShow() {
  let slideImage = document.getElementById("slideImage");
  if (index >= sliderImages.length) {
    index = 0;
  }
  let imageUrl = `assets/${sliderImages[index]}`;
  slideImage.style.opacity = 0;
  setTimeout(function () {
    slideImage.src = imageUrl;
    slideImage.alt = sliderImages[index];
    slideImage.style.opacity = 1;
  }, 500);
  index++;
}
//#endregion
//#region  Functions 'GetAll'&'GetCat' to show all products

function CategoriesProducts(data) {
  let allProducts = data.products;
  let categoriesBtn = document.getElementById("categories");

  let categories = new Set();
  for (let i = 0; i < allProducts.length; i++) {
    let category = allProducts[i].category;
    categories.add(category);
  }
  let categoriesArray = Array.from(categories);
  categoriesArray.unshift("All");

  for (let i = 0; i < categoriesArray.length; i++) {
    let categoryBtn = document.createElement("button");
    categoryBtn.textContent = categoriesArray[i];
    categoryBtn.id = "categoryBtn";
    categoryBtn.addEventListener("click", function () {
      if (categoriesArray[i] === "All") {
        Create(allProducts);
      } else {
        let uniqueCategory = allProducts.filter(
          (allProducts) => allProducts.category == categoriesArray[i]
        );
        Create(uniqueCategory);
      }
    });
    categoriesBtn.appendChild(categoryBtn);
  }

  //     AD.textContent = "Add To Cart"
  //     AD.addEventListener('click', createAddToCartHandler(categoryOfProduct, nameOfProduct));
  //     title.textContent = nameOfProduct;
  //     Price.textContent= priceOfProduct;
  //     imageOfProduct.style.width = '100%'; // Adjust the width as needed

  //     cartItems = [];
  //     cartCount = 0;

  //     // Retrieve cartCount from local storage if available
  //     if (localStorage.getItem('cartCount')) {
  //         cartCount = parseInt(localStorage.getItem('cartCount'));
  //         updateCartCounter();
  //     }
  //     if (localStorage.getItem('cartItems')) {
  //         cartItems = JSON.parse(localStorage.getItem('cartItems'));
  //     }

  //     // Set image source
  //     imageOfProduct.src = products[i].thumbnail;

  //     // Append elements to the parent element
  //     productA.appendChild(imageOfProduct);
  //     row.appendChild(productA);
  //     row.appendChild(title);
  //     row.appendChild(Price);
  //     row.appendChild(AD);
  //     parentElement.appendChild(row); // Append the row to the parent element

  // }
}
function AllProducts(data) {
  let allProducts = data.products;
  Create(allProducts);
}
function Create(data) {
  let content = document.getElementById("content");
  content.innerHTML = "";
  data.forEach((product) => {
    let card = document.createElement("div");
    card.id = "card";
    let productImage = document.createElement("img");
    productImage.id = "productImage";
    let productContent = document.createElement("div");
    productContent.id = "productContent";
    let productTitle = document.createElement("h4");
    productTitle.id = "productTitle";
    let productBrand = document.createElement("span");
    productBrand.id = "productBrand";
    let productDescription = document.createElement("p");
    productDescription.id = "productDescription";
    let EGP = document.createElement("span");
    EGP.id = "EGP";
    let productPrice = document.createElement("b");
    productPrice.id = "productPrice";
    let productAddBtn = document.createElement("button");
    productAddBtn.id = "productAddBtn";
    ///////////////////////////////////
    productImage.src = product.thumbnail;
    productTitle.innerText = product.title;
    productBrand.textContent = product.brand;
    productDescription.textContent = product.description;
    EGP.textContent = "EGP ";
    productPrice.textContent = product.price;
    productPrice.append(".00");
    //////////button/////////////////
    productAddBtn.innerHTML = '<i class="bi bi-cart-plus-fill"></i>';
    productAddBtn.addEventListener("click", function () {
      addToCart(productImage, productTitle, productPrice);
    });
    /////////
    // Append elements to the parent element
    card.appendChild(productImage);
    productContent.appendChild(productTitle);
    productContent.appendChild(productBrand);
    productContent.appendChild(productDescription);
    EGP.append(productPrice);
    productContent.append(EGP);
    productContent.append(productAddBtn);
    card.append(productContent);
    content.append(card);
  });
}

//#endregion
//#region onLoading
function Fun1() {
  fetch("https://dummyjson.com/products")
    .then((response) => response.json())
    .then((data) => {
      CategoriesProducts(data);
      AllProducts(data);
    })
    .catch((error) => {
      console.error("Error fetching JSON data:", error);
    });
}
document.addEventListener("DOMContentLoaded", function () {
  if (!getCookie('logedIn')) {
    location.assign('/register.html')
}
  SlideShow();
  Fun1();
  RetrieveData();
});

setInterval(SlideShow, 5000);
//#endregion
//#region  some static functions
let popup = document.getElementById("popup");
let backToTopBtn = document.getElementById("backToTopBtn");

function addToCart(productImage, productTitle, productPrice) {
  var product = {
    image: productImage.src,
    title: productTitle.textContent,
    price: productPrice.textContent,
  };
  if (localStorage.getItem("cartCount")) {
    cartCount = parseInt(localStorage.getItem("cartCount"));
    cartItems = JSON.parse(localStorage.getItem("cartItems"));
  }
  let isProductInCart = cartItems.some(function (item) {
    return item.title === product.title;
  });
  if (!isProductInCart) {
    cartItems.push(product);
    showPopup(`${productTitle.innerText} added to cart!`);
    cartCount++;
    cartCounter.textContent = cartCount;
    localStorage.setItem("cartCount", cartCount.toString());
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  } else {
    showPopup(`${productTitle.innerText} Already in cart!`);
  }
}

backToTopBtn.addEventListener("click", scrollToTop);
// sign out function 
document.getElementById('signOut').addEventListener('click',()=>{deleteCookie('logedIn')})

//#endregion
