
import { navbar } from "./views/navbarPage.js";
const loadApp = async () => {
  //init welcome page
  navbar();
};
window.addEventListener("load", loadApp);
console.log("app intialized");
