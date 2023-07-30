import data from "./clothing.js";
import * as funcs from "./js/main.js";
// getting elements
var homeGallery = document.getElementById("home-gallery");
var search = document.getElementById("search");
var searchIcon = document.getElementById("searchIcon");
var sidebar = document.getElementById("sidebarNavList");
var filter = document.getElementById("filter");
var indexAuthorization = document.getElementById("indexAuthorization");
var discount = document.getElementById("discount");

// setting navigationbar profile
funcs.settingProfile(indexAuthorization);
function findByKw(item, kw) {
  switch (kw) {
    case item.type:
      return true;
    case item.color:
      return true;
    case item.gender:
      return true;
    case item.price:
      return true;
    case item.size:
      return true;
    case item.variation:
      return true;
  }
}

function removeAllChildNodes(parent) {
  while (parent.firstChild) {
    parent.removeChild(parent.firstChild);
  }
}
function filtering(value) {
  removeAllChildNodes(homeGallery);
  if (value != "all") {
    var searchedData = data.clothing.filter((x) => findByKw(x, value));
    searchedData.forEach((item) => {
      const filteredCard = funcs.createCardElement(item, "normal");
      homeGallery.appendChild(filteredCard);
    });
  } else {
    data.clothing.forEach((item) => {
      const filteredCard = funcs.createCardElement(item, "normal");
      homeGallery.appendChild(filteredCard);
    });
  }
}

function copyToClipBoard(val) {
  val.select();
  navigator.clipboard.writeText(val.value);
  alert("copied the promo code to your clipboard");
}
// events
// filtering
search.addEventListener("keypress", function (event) {
  if (event.key == "Enter") {
    event.preventDefault();
    searchIcon.click();
  }
});

searchIcon.addEventListener("click", function () {
  filtering(search.value);
});

sidebar.onclick = function (event) {
  let target = event.target.closest(".sidebar-nav");
  if (!target) return;
  filtering(target.id);
};
filter.onchange = function (event) {
  event.preventDefault();
  filtering(filter.value);
};
discount.onclick = function () {
  copyToClipBoard(discount);
};

// initial data fetching
data.clothing.forEach((item) => {
  const card = funcs.createCardElement(item, "normal");
  homeGallery.appendChild(card);
});
