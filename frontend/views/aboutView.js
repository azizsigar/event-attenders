export const createAboutElement = () => {
    console.log("about view initialized");
    const element = document.createElement("div");
    element.classList.add("about");
    element.innerHTML = String.raw`
        <h1>About</h1>
    `;
    return element;
};