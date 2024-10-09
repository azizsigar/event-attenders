import { createWelcomeElement } from "../views/welcomeView.js";

export const initWelcomePage = async () => {
  console.log("wellcome page initialized");
  const userInterface = document.getElementsByTagName("main")[0];
  userInterface.innerHTML = ""; // Clear existing content to avoid duplication

  const welcomeElement = createWelcomeElement();
  userInterface.appendChild(welcomeElement);
};
