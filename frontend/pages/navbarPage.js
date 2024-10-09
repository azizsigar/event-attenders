import { createNavbar } from "../views/navbarView.js";

export const navbar = () => {
  console.log("navbar initialized");
  const userInterface = document.getElementsByTagName("nav")[0];

  const navbarElement = createNavbar();
  userInterface.appendChild(navbarElement);
};
