let userName = localStorage.getItem("username");

const characterList = document.querySelector(".character-list");
const selectedCharacter = document.querySelector(".selected-character");
const characterSelectSection = document.querySelector(".character-select");

characterList.addEventListener("click", handleCharacterClick);

if (userName) {
    document.getElementById("welcome-message").innerText = `${userName}`;

    showHeader();
    hideRegistrationSection();
    showHomePageSection();
}

document.getElementById("add-name-button").addEventListener("click", addCharacterName);
document.getElementById("fight-button").addEventListener("click", startFight);

function startFight(e) {
    e.preventDefault();
    hideHomePageSection();
    showCharacterSection();
}

function addCharacterName(e) {
    e.preventDefault();

    let characterName = document.getElementById("character-name").value;

    if (characterName) {
        localStorage.setItem("username", characterName);
        document.getElementById("welcome-message").innerText = `${characterName}`;

        showHeader();
        hideRegistrationSection();
        showHomePageSection();

    } else {
        document.getElementById("welcome-message").innerText = "";
    }
}

function handleCharacterClick(e) {
    if (e.target.classList.contains("character")) {
        const selectedImg = e.target.cloneNode();
        selectedCharacter.innerHTML = "";

        const infoText = document.createElement("p");
        infoText.textContent = "Selected character:";
        infoText.classList.add("title-text");

        selectedCharacter.appendChild(infoText);
        selectedCharacter.appendChild(selectedImg);

        characterSelectSection.classList.add("hidden");

        selectedImg.addEventListener("click", () => {
            characterSelectSection.classList.remove("hidden");
            selectedCharacter.innerHTML = "";
        });
    }
}

function showHomePageSection() {
    const homePageSection = document.querySelector(".home-page-section");
    homePageSection.classList.remove("hidden");
}

function hideHomePageSection() {
    const homePageSection = document.querySelector(".home-page-section");
    homePageSection.classList.add("hidden");
}

function showHeader() {
    const header = document.querySelector(".header");
    header.classList.remove("hidden");
}

function hideRegistrationSection() {
    const registrationSection = document.querySelector(".registration-section");
    registrationSection.classList.add("hidden");
}

function showCharacterSection() {
    const characterSection = document.querySelector(".character-section");
    characterSection.classList.remove("hidden");
}