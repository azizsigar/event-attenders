import { createNavbar } from "./views/navbarPage.js"; // Adjust path as necessary

export const createNavbar = () => {
  console.log("navbar initialized");
  const element = document.createElement("div");
  element.classList.add("navbar");
  element.innerHTML = String.raw`
        <nav>
            <ul>
                <li><a href="#home">Home</a></li>
                <li><a href="#login">Login</a></li>
                <li><a href="#about">About</a></li>
                <li><a href="#profile">Profile</a></li>
            </ul>
        </nav>
    `;

  const homeLink = element.querySelector('a[href="#home"]');
  homeLink.addEventListener("click", async (event) => {
    event.preventDefault();
    await initWelcomePage();
  });

  const aboutLink = element.querySelector('a[href="#about"]');
  aboutLink.addEventListener("click", async (event) => {
    event.preventDefault();
    await initAboutPage();
  });

  const loginLink = element.querySelector('a[href="#login"]');
  loginLink.addEventListener("click", async (event) => {
    event.preventDefault();
    await initLoginPage();
  });

  const profileLink = element.querySelector('a[href="#profile"]');
  profileLink.addEventListener("click", async (event) => {
    event.preventDefault();
    await initProfilePage(); // Initialize the profile page
  });

  return element;
};
