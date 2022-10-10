//open et close cart
const cartIcon = document.querySelector("#cart-icon");
const cart = document.querySelector(".cart");
const closeCart = document.querySelector("#cart-close");

cartIcon.addEventListener("click", () => {
    cart.classList.add("active");

});
closeCart.addEventListener("click", () => {
    cart.classList.remove("active");
});
//start lorsque le document pret
if(document.readyState == "loading"){
    document.addEventListener('DOMContentLoaded', start);

}else{
    start();
}
//===start===
function start(){
    addEvents();

}
  
//==update & rerender==
function update(){
addEvents();
updateTotal();
}
//====add events==
function addEvents(){
    //remove items from carte
    let cartRemove_btns = document.querySelectorAll('.cart-remove');
    console.log(cartRemove_btns);
    cartRemove_btns.forEach((btn) => {
        btn.addEventListener("click", handle_removeCartItem);
    });
    
//===change item quantity
let cartQuantity_inputs = document.querySelectorAll('.cart-quantity');
cartQuantity_inputs.forEach(input => {
    input.addEventListener("change", handle_changeItemQuantity);
});
}
//add item to cart
let addCart_btns = document.querySelectorAll(".add-cart");
addCart_btns.forEach(btn =>{
    btn.addEventListener("click",handle_addCartItem);
});

//==handle function ==
let itemsAdded =[]

function handle_addCartItem(){
    let product = this.parentElement;
    let title =product.querySelector(".product-title").innerHTML;
    let price =product.querySelector(".product-price").innerHTML;
    let imgSrc =product.querySelector(".product-img").src;
    console.log(title, price, imgSrc);

    let newToAdd ={
        title,
        price,
        imgSrc,
    };
    if(itemsAdded.find((el) => el.title == newToAdd.title)){
        alert("this item is already Exist!");
        return;
    }else{
        itemsAdded.push(newToAdd);
    }
    // add prod to cart
    let cartBoxElement = cartBoxcomponent(title, price, imgSrc);
    let newNode = document.createElement("div");
    newNode.innerHTML = cartBoxElement;
    const cartContent = cart.querySelector(".cart-content");
    cartContent.appendChild(newNode);

    update();

}
//==== handle events function====
function handle_removeCartItem(){
    this.parentElement.remove();

    update();

}
function handle_changeItemQuantity(){
    if(isNaN(this.value) || this.value <1) {
        this.value =1;
    }
    this.value = Math.floor(this.value);
    
    update();

}




//======== update & render function===
function updateTotal(){
    let cartBoxes = document.querySelectorAll('.cart-box');
    const totalElement = cart.querySelector('.total-price');
    let total = 0;
    cartBoxes.forEach(cartBox =>{
        let priceElement = cartBox.querySelector('.cart-price');
        let price = parseFloat(priceElement.innerHTML.replace("$",""));
        let quantity = cartBox.querySelector(".cart-quantity").value;
        total +=price*quantity;
    });
    total = total.toFixed(2);
    
    totalElement.innerHTML = "$" +total;
}
//======html====
function cartBoxcomponent(title, price, imgSrc){
    return `
    <div class="cart-box">
    <img src=${imgSrc} alt="" class="cart-img">
     <div class="dtail-box">
        <div class="cart-product-tittle">${title}</div>
        <div class="cart-price">${price}</div>
        <input type="number" value="1" class="cart-quantity">
     </div>
     <!--remove cart-->
     <i class='bx bxs-trash-alt cart-remove' ></i>
</div>` ;
}
VANTA.NET({
    el: "#net",
    mouseControls: true,
    touchControls: true,
    gyroControls: false,
    minHeight: 200.00,
    minWidth: 200.00,
    scale: 1.00,
    scaleMobile: 1.00,
    color: 0x3fe8ff,
    backgroundColor: 0xf2a52
  })