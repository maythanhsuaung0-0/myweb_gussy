import * as funcs from "../../js/main.js";
let myCart = JSON.parse(localStorage.getItem("cartList"));
let cartContainer = document.getElementById("carts");
let cartAuthorization = document.getElementById("cartAuthorization");
let cartContainerMain = document.getElementById("cartContainerMain")
let checkout = document.getElementById("check")
let subtotal = document.getElementById("subtotal");
let deli = document.getElementById("deli");
let tax = document.getElementById("tax");
let total = document.getElementById("total");
let buyNowBtn = document.getElementById("buyNow");
funcs.settingProfile(cartAuthorization);
if (myCart && myCart.length > 0) {
  myCart.forEach((item) => {
    if (item.length != 0) {
      const favItem = funcs.createSelectedItem(item);
      cartContainer.appendChild(favItem);
    }
  });
}
else if(!myCart){
  funcs.removeAllChildNodes(checkout);
  cartContainerMain.innerHTML = ` <h4 class = "oops">Oops.... There's no item in the cart yet</h4>`

}
let sTotal = funcs.sum(myCart);
subtotal.innerText = sTotal;
deli.innerText = " free";
tax.innerText = "8";
total.innerText = funcs.finalCheckout(sTotal, deli.innerText, tax.innerText);

const paymentMethods = [
  {
    supportedMethods: "https://bobbucks.dev/pay",
  },
];
let items = [];
let itemDetail = {};
if(myCart){
  myCart.forEach((e) => {
    itemDetail["label"] = e.variation + e.type;
    itemDetail["amount"] = { currency: "SGD", value: e.price };
    items.push(itemDetail);
  });
}
let paymentDetails = {
  id: "demo-123",
  displayItems: items,
  total: {
    label: "Total",
    amount: {
      currency: "USD",
      value: funcs.finalCheckout(sTotal, deli.innerText, tax.innerText),
    },
  },
};

buyNowBtn.addEventListener("click", () => {
  const request = new PaymentRequest(paymentMethods, paymentDetails);
  request.show().then((paymentResponse) => {
    paymentResponse.complete("success").then(() => {
      localStorage.removeItem("cartList");
      location.reload()
    });
  });
});
