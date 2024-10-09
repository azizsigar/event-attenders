import { createRegisterElement } from "../views/registerView.js"; 

export const initRegisterPage = async () => {
    console.log('register page initialized');
    const userInterface = document.getElementsByTagName('main')[0];
    userInterface.innerHTML = ''; // Clear existing content to avoid duplication
    
    const registerElement = createRegisterElement();
    userInterface.appendChild(registerElement);
    }       