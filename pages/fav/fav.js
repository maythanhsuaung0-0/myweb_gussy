import * as funcs from '../../js/main.js'
// let myFav = funcs.allStorage();
let myFav = JSON.parse(localStorage.getItem("favList"))
let favContainer = document.getElementById("fav-gallery");
let favAuthorization = document.getElementById('favAuthorization');
funcs.settingProfile(favAuthorization)
if(myFav.length>0){
    myFav.forEach(item => {
        if(item.length != 0){
            const favItem = funcs.createCardElement(item,'fav');
        favContainer.appendChild(favItem);
        }
    });
}


