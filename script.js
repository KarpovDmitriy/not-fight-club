let userName = localStorage.getItem("username");

const characterList = document.querySelector(".character-list");
const selectedCharacter = document.querySelector(".selected-character");
const characterSelectSection = document.querySelector(".character-select");
const welcomeSection = document.getElementById("welcome-message");

const nameSpan = document.querySelector(".player-name");
const nameInput = document.querySelector(".player-input");
const editButton = document.querySelector(".edit-btn");

characterList.addEventListener("click", handleCharacterClick);

if (userName) {
    showHeader();
    hideRegistrationSection();
    showHomePageSection();

    nameSpan.textContent = `Player Name: ${userName}`;
    nameInput.value = userName;
}

document.getElementById("add-name-button").addEventListener("click", addCharacterName);
document.getElementById("fight-button").addEventListener("click", startFight);
document.getElementById("home-icon").addEventListener("click", openMain);
document.getElementById("character-icon").addEventListener("click", openCharacter);
document.getElementById("settings-icon").addEventListener("click", openSettings);

editButton.addEventListener("click", toggleEditMode);
nameInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
        toggleEditMode();
    }
});

function toggleEditMode() {
    if (editButton.textContent === "Edit") {
        nameSpan.style.display = "none";
        nameInput.style.display = "inline";
        nameInput.focus();
        editButton.textContent = "Save";
    } else {
        userName = nameInput.value;
        localStorage.setItem("username", userName);

        nameSpan.textContent = `Player Name: ${userName}`;
        nameSpan.style.display = "inline";
        nameInput.style.display = "none";
        editButton.textContent = "Edit";
    }
}

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
        nameSpan.textContent = `Player Name: ${characterName}`;
        nameInput.value = characterName;

        welcomeSection.innerText = "Main";

        showHeader();
        hideRegistrationSection();
        showHomePageSection();

    } else {
        welcomeSection.innerText = "";
    }
}

function handleCharacterClick(e) {
    if (e.target.classList.contains("character")) {
        const selectedImg = e.target.cloneNode();
        selectedCharacter.innerHTML = "";

        const titleText = document.createElement("p");
        titleText.textContent = "Selected character:";
        titleText.classList.add("title-text");

        selectedCharacter.appendChild(titleText);
        selectedCharacter.appendChild(selectedImg);

        characterSelectSection.classList.add("hidden");

        selectedImg.addEventListener("click", () => {
            characterSelectSection.classList.remove("hidden");
            selectedCharacter.innerHTML = "";
        });
    }
}

function openMain(e) {
    e.preventDefault();
    welcomeSection.innerText = "Main";

    hideRegistrationSection();
    hideCharacterSection();
    hideSettingsSection();
    showHomePageSection();
}

function openCharacter(e) {
    e.preventDefault();
    welcomeSection.innerText = "Character";

    hideRegistrationSection();
    hideHomePageSection();
    hideSettingsSection();

    showCharacterSection();
}

function openSettings(e) {
    e.preventDefault();
    welcomeSection.innerText = "Settings";

    hideRegistrationSection();
    hideCharacterSection();
    hideHomePageSection();
    showSettingsSection();
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

function hideCharacterSection() {
    const characterSection = document.querySelector(".character-section");
    characterSection.classList.add("hidden");
}

function showSettingsSection() {
    const settingsSection = document.querySelector(".settings-section");
    settingsSection.classList.remove("hidden");
}

function hideSettingsSection() {
    const settingsSection = document.querySelector(".settings-section");
    settingsSection.classList.add("hidden");
}