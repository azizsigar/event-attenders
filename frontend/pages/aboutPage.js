import { createAboutElement } from "../views/aboutView.js";

export const initAboutPage = async () => {
  console.log("about page initialized");
  const userInterface = document.getElementsByTagName("main")[0];
  userInterface.innerHTML = ""; // Clear existing content to avoid duplication

  const aboutElement = createAboutElement();
  userInterface.appendChild(aboutElement);
};
