import { createLoginElement } from '../views/loginView.js';
export const initLoginPage = async () => {
    console.log('login page initialized');
    const userInterface = document.getElementsByTagName('main')[0];
    userInterface.innerHTML = ''; // Clear existing content to avoid duplication
    
    const loginElement = createLoginElement();
    userInterface.appendChild(loginElement);
    }