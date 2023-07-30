import data from "../../clothing.js";
import * as funcs from "../../js/main.js";

let param = new URLSearchParams(window.location.search);
let id = param.get("id");
let content = document.getElementById("content");
let div = funcs.displayDetail(data.clothing[id]);
let detailAuthorization = document.getElementById("detailAuthorization");
funcs.settingProfile(detailAuthorization);

content.appendChild(div);
