var currentUrl = window.location.pathname;
var userProfile = JSON.parse(sessionStorage.getItem("user")) || [];
let favourites = JSON.parse(localStorage.getItem("favList")) || [];
let show = false;

function removeAllChildNodes(parent) {
  while (parent.firstChild) {
    parent.removeChild(parent.firstChild);
  }
}

function create(element) {
  return document.createElement(element);
}

function sum(data) {
  var result = 0;
  if(data){
    data.forEach((e) => {
      result += e.price;
    });
  }
  return result;
}
function finalCheckout(subtotal, deli, tax) {
  if (!parseInt(deli)) {
    deli = 0;
  } else {
    deli = parseInt(deli);
  }
  tax = parseInt(tax);
  let total = subtotal + deli;
  let afterTax = subtotal * (tax / 100);
  return total + afterTax;
}
function directLink(item, urlId) {
  item.onclick = function () {
    if (currentUrl == "/") {
      window.location.href =
        currentUrl + "/pages/details/details.html?" + "id=" + urlId;
    } else if (currentUrl == "/index.html") {
      window.location.href = "/pages/details/details.html?" + "id=" + urlId;
    } else {
      window.location.href = "../details/details.html?" + "id=" + urlId;
    }
  };
}
function add(item, name) {
  let list = JSON.parse(localStorage.getItem(name)) || [];
  let myList = [...list];
  myList.push(item);
  localStorage.setItem(name, JSON.stringify(myList));
}
function remove(item, name) {
  let list = JSON.parse(localStorage.getItem(name));
  let target = list.map((e) => e.id).indexOf(item.id);
  list.splice(target, 1);
  localStorage.setItem(name, JSON.stringify(list));
  location.reload();
}
function provideURL(rawUrl) {
  if (currentUrl == "http://127.0.0.1:5500/lswm/index.html") {
    return rawUrl;
  } else {
    return "../../" + rawUrl;
  }
}
function swapIcon(pass, passIcon) {
  if (!show) {
    passIcon.innerHTML = `<i class="fa-regular fa-eye-slash"></i>`;
    show = true;
    pass.type = "text";
  } else {
    passIcon.innerHTML = ` <i class="fa-regular fa-eye"></i>`;
    show = false;
    pass.type = "password";
  }
}

function createCardElement(data, page) {
  let itemContainer = create("div");
  let img = create("img");
  let description = create("div");
  let itemData = create("div");
  let h6 = create("h6");
  let ul = create("ul");
  let li1 = create("li");
  let li2 = create("li");
  let li3 = create("li");
  let icons = create("div");
  let cartIcon = create("div");
  // for detail page
  cartIcon.innerHTML = ` <i class="fa-solid fa-cart-shopping"></i>`;
  icons.appendChild(cartIcon);
  description.appendChild(itemData);
  if (page == "normal") {
    let favIcon = create("div");
    let choseIcon = create("div");
    favIcon.innerHTML = ` <i class="fa-regular fa-heart"></i>`;
    choseIcon.innerHTML = `<i class="fa-solid fa-heart"></i>`;
    favIcon.classList = "fav";
    choseIcon.classList = "chosen";
    let target = favourites.map((e) => e.id).indexOf(data.id);
    if (target != -1) {
      icons.append(choseIcon);
    } else {
      icons.append(favIcon);
    }
    favIcon.onclick = function () {
      add(data, "favList");
      location.reload();
    };
    choseIcon.onclick = function () {
      remove(data, "favList");
      location.reload();
    };
  } else {
    let deleteIcon = create("div");
    deleteIcon.innerHTML = `<i class="fa-regular fa-trash-can"></i>`;
    deleteIcon.classList = "fav";
    icons.appendChild(deleteIcon);
    deleteIcon.onclick = function () {
      remove(data, "favList");
    };
  }
  icons.classList = "icons";
  // cartIcon.classList = "cart";
  description.appendChild(icons);
  cartIcon.onclick = function () {
    add(data, "cartList");
    alert("successfully added to the cart")
  };
  itemContainer.classList = "item";
  img.src = provideURL(data.img);
  directLink(img, data.id);
  description.classList = "item-description";
  itemData.classList = "item-data";
  h6.innerText = data.type;
  h6.classList = "item-title";
  directLink(h6, data.id);
  li1.innerText = data.gender;
  li2.innerText = data.color;
  li3.innerText = data.price;
  ul.appendChild(li1);
  ul.appendChild(li2);
  ul.appendChild(li3);
  itemData.appendChild(h6);
  itemData.appendChild(ul);

  itemContainer.appendChild(img);
  itemContainer.appendChild(description);

  return itemContainer;
}
function createSelectedItem(item) {
  let itemContainer = create("div");
  let itemImgContainer = create("div");
  let itemImage = create("img");
  let itemDetailContainer = create("div");
  let itemTitle = create("h5");
  let gender = create("div");
  let color = create("div");
  let size = create("div");
  let divs = create("div");
  let cost = create("div");
  let deleteIcon = create("div");
  divs.classList = "gap";
  deleteIcon.classList = "deleteIcon";
  deleteIcon.innerHTML = `<i class="fa-regular fa-trash-can"></i>`;
  deleteIcon.onclick = function () {
    remove(item, "cartList");
  };
  let selectSize = create("select");
  let sizeLabel = create("label");
  let sizesCount = [];
  let sizes = ["S", "M", "L", "XL"];
  for (let i = 0; i < 4; i++) {
    let option = create("option");
    for (let j = 0; j < sizes.length; j++) {
      if (j == i) {
        option.innerText = sizes[j];
        sizesCount.push(option);
      }
    }
  }
  for (let i = 0; i < sizesCount.length; i++) {
    selectSize.appendChild(sizesCount[i]);
  }
  size.append(sizeLabel, selectSize);
  sizeLabel.innerText = "Sizes";
  sizeLabel.classList = "label";
  color.innerText = item.color;
  gender.innerText = item.gender;
  itemTitle.innerText = item.type;
  itemDetailContainer.append(itemTitle, gender, color, size);
  itemImage.src = provideURL(item.img);
  itemImgContainer.appendChild(itemImage);
  divs.append(cost, deleteIcon);
  itemContainer.append(itemImgContainer, itemDetailContainer, divs);
  itemDetailContainer.classList = "itemDetailContainer";
  cost.classList = "cost";
  itemImgContainer.classList = "itemImg";

  itemContainer.classList = "selectedItem";
  cost.innerText = item.price;

  return itemContainer;
}

function displayDetail(item) {
 if(item){
  let detailContainer = create("main");
  let product = create("div");
  let image = create("img");
  let description = create("div");
  let title = create("h3");
  let dataTable = create("table");
  let btnContainer = create("div");
  let addToCartBtn = create("button");
  btnContainer.classList = "links";
  addToCartBtn.classList = "btn btn-primary";
  addToCartBtn.innerText = "Add to Cart";
  addToCartBtn.onclick = function () {
    add(item, "cartList");
    alert("Successfully added the item to the cart")
  };
  let details = [item.color, item.gender, item.price, item.size];
  let detailsName = ["color", "gender", "price", "size"];
  detailContainer.classList = "detailContainer";
  product.classList = "product";
  description.classList = "description";
  btnContainer.appendChild(addToCartBtn);
  for (let i = 0; i < details.length; i++) {
    let tr = create("tr");
    let td1 = create("td");
    let td2 = create("td");
    td1.classList = "tdata";
    td2.classList = "tdata";
    td1.innerText = detailsName[i];
    td2.innerText = details[i];
    tr.appendChild(td1);
    tr.appendChild(td2);
    dataTable.appendChild(tr);
  }
  title.innerText = item.type;
  description.appendChild(title);
  description.appendChild(dataTable);
  description.appendChild(btnContainer);
  image.src = provideURL(item.img);
  product.appendChild(image);
  detailContainer.appendChild(product);
  detailContainer.appendChild(description);
  return detailContainer;

 }  
}

function settingProfile(parent) {
  if(parent){
    let active = sessionStorage.getItem("activeUser");
  if (active == "true") {
    let profileContainer = document.createElement("div");
    let profile = document.createElement("button");
    let detailPopUp = document.createElement("div");
    let name = document.createElement("div");
    let mail = document.createElement("div");
    let signOut = document.createElement("button");
    profile.classList = "profileBtn";
    profile.setAttribute("data-toggle", "dropdown");
    profile.setAttribute("aria-haspopup", "true");
    profile.setAttribute("aria-expanded", "false");
    profile.setAttribute("id", "dropdownDetail");
    profile.innerText = userProfile["username"].slice(0, 1).toUpperCase();
    profileContainer.classList = "dropdown";
    detailPopUp.classList = "dropdown-menu";
    detailPopUp.classList.add("dropdownContainer");
    detailPopUp.setAttribute("aria-labelledby", "dropdownDetail");
    name.innerText = userProfile["username"];
    name.classList = "username";
    mail.innerText = userProfile["email"];
    signOut.innerText = "Sign Out";
    signOut.classList = "button-sm";
    signOut.onclick = function () {
      sessionStorage.removeItem("user");
      sessionStorage.setItem("activeUser", "false");
      location.reload();
    };
    detailPopUp.append(name, mail, signOut);
    profileContainer.append(profile, detailPopUp);
    parent.replaceChild(profileContainer, parent.children[0]);
  }
  }
}
export {
  removeAllChildNodes,
  createCardElement,
  provideURL,
  displayDetail,
  createSelectedItem,
  settingProfile,
  swapIcon,
  sum,
  finalCheckout,
};
