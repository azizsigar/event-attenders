export const createProfileElement = async () => {
  const profileElement = document.createElement("div");

  // Default content before data is loaded
  profileElement.innerHTML = `
      <h1>Profile</h1>
      <p>Loading profile data...</p>
  `;

  try {
    // Fetch user profile data from the backend (modify the URL as necessary)
    const response = await axios.get("http://127.0.0.1:7890/users/profile");
    const userProfile = response.data; // Assuming the backend sends user data

    // Update the profile page with user data
    profileElement.innerHTML = `
    <img src="${userProfile.avatar}" alt="User Avatar" />
      <h1>${userProfile.name}'s Profile</h1>
      <p><strong>Email:</strong> ${userProfile.email}</p>
      <p><strong>Joined on:</strong> ${new Date(
        userProfile.createdAt
      ).toLocaleDateString()}</p>
    `;
  } catch (error) {
    console.error("Error fetching profile data:", error);

    // Handle error (e.g., display a message)
    profileElement.innerHTML = `
      <h1>Profile</h1>
      <p>Failed to load profile data. Please try again later.</p>
    `;
  }

  return profileElement;
};
