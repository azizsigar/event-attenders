export const createWelcomeElement = () => {
  console.log("welcome view initialized");
  const element = document.createElement("div");
  element.classList.add("wellcome");
  element.innerHTML = String.raw`
    <h1>Welcome</h1>
  `;
  return element;
  // show random items in the website right to left swifting
};
