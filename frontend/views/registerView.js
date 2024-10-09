export const createRegisterElement = () => {
  console.log("register view initialized");
  const element = document.createElement("div");
  element.classList.add("register");
  element.innerHTML = String.raw`
        <h1>Register</h1>
        <form id="register-form">
            <label for="username">Username</label>
            <input type="text" id="username" name="username" required>
            <label for="password">Password</label>
            <input type="password" id="password" name="password" required>
            <label for="email">Email</label>
            <input type="email" id="email" name="email" required>
            <button type="submit">Register</button>
        </form>
    `;

  const form = element.querySelector("#register-form");
  form.addEventListener("submit", async (event) => {
    event.preventDefault();

    const formData = new FormData(form);
    const data = {
      name: formData.get("username"),
      email: formData.get("email"),
      password: formData.get("password"),
    };

    // Using Axios to send a POST request
    try {
      const response = await axios.post("/users/register", data);
      console.log("User registered:", response.data);
      // Handle successful registration
    } catch (error) {
      console.error("Registration error:", error.response.data.message);
    }
  });

  return element;
};
