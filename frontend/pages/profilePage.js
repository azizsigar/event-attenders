
export const initProfilePage = async () => {
  const mainContent = document.getElementsByTagName("main")[0];
  mainContent.innerHTML = "<p>Loading user profile...</p>"; // Show loading text while fetching data

  try {
    // Fetch user profile data from the backend
    const response = await axios.get("http://127.0.0.1:7890/users/profile");
    console.log("Response from server:", response);

    const userProfile = response.data;
    console.log("User Profile Data:", userProfile);

    // Check if userProfile is valid before rendering
    if (!userProfile || !userProfile.name) {
      console.error("Invalid user profile data:", userProfile);
      mainContent.innerHTML = "<p>Error: Failed to load user profile.</p>";
      return;
    }

    // Clear loading message
    mainContent.innerHTML = "";

    // Creating a profile view with user data
    const profileElement = document.createElement("div");
    profileElement.innerHTML = `
      <h1>${userProfile.name}'s Profile</h1>
      <p><strong>Email:</strong> ${userProfile.email}</p>
      <p><strong>Joined on:</strong> ${new Date(
        userProfile.createdAt
      ).toLocaleDateString()}</p>
      <img src="${userProfile.avatar}" alt="User Avatar" />
    `;

    // Append the profile to the DOM
    mainContent.appendChild(profileElement);
  } catch (error) {
    console.error("Error fetching user profile data:", error);
    mainContent.innerHTML =
      "<p>Error: Failed to load user profile. Please try again later.</p>";
  }
};
