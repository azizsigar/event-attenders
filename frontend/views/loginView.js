import { initRegisterPage } from "../pages/registerPage.js"; // Ensure the path is correct
import { initLoginPage } from "../pages/loginPage.js";
import { renderUserDetails } from "../pages/profilePage.js";
export const createLoginElement = () => {
  console.log("login view initialized");
  const element = document.createElement("div");
  element.classList.add("login");
  element.innerHTML = String.raw`
        <h1>Login</h1>
        <form id="login-form">
            <label for="username">Username:</label>
            <input type="text" id="username" name="username" required>
            <label for="password">Password:</label>
            <input type="password" id="password" name="password" required>
            <button type="submit">Login</button>
        </form>
        <a href="#register">Register</a>
    `;
  const registerLink = element.querySelector('a[href="#register"]');
  registerLink.addEventListener("click", async (event) => {
    event.preventDefault(); // Prevent default link behavior
    console.log("register link clicked");
    await initRegisterPage(); // Initialize the register page
  });
  const loginLink = element.querySelector("button");
  loginLink.addEventListener("click", async (event) => {
    event.preventDefault();
    console.log("login button clicked");
    await initLoginPage();
  });
  const form = element.querySelector("#login-form");
  form.addEventListener("submit", async (event) => {
    event.preventDefault();
    const formData = new FormData(form);
    const data = {
      name: formData.get("username"),
      password: formData.get("password"),
    };
    try {
      const response = await axios.post(
        "http://127.0.0.1:7890/users/login",
        data
      );
      const userData = response.data.user;

      console.log("User logged in:", response.data);
      renderUserDetails(userData);

      // Handle successful login
      //go to profile page
    } catch (error) {
      console.error("Login error:", error.response.data.message);
    }
  });
  return element;
};
