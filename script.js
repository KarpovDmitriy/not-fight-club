const characterList = document.querySelector(".character-list");
const selectedCharacter = document.querySelector(".selected-character");
const characterSelectSection = document.querySelector(".character-select");
const welcomeSection = document.getElementById("welcome-message");
const nameSpan = document.querySelector(".player-name");
const nameInput = document.querySelector(".player-input");
const editButton = document.querySelector(".edit-btn");

document.getElementById("add-name-button").addEventListener("click", addCharacterName);
document.getElementById("fight-button").addEventListener("click", startFight);
document.getElementById("home-icon").addEventListener("click", openMain);
document.getElementById("character-icon").addEventListener("click", openCharacter);
document.getElementById("settings-icon").addEventListener("click", openSettings);

characterList.addEventListener("click", handleCharacterClick);
editButton.addEventListener("click", toggleEditMode);
nameInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
        toggleEditMode();
    }
});

const characterImages = document.querySelectorAll(".character-list img");
let charactersData = JSON.parse(localStorage.getItem("characters")) || [];

if (charactersData.length === 0) {
    charactersData = Array.from(characterImages).map(img => ({
        src: img.getAttribute("src"),
        selected: false,
        wins: 0,
        losses: 0
    }));
    localStorage.setItem("characters", JSON.stringify(charactersData));
}

function saveCharactersData() {
    localStorage.setItem("characters", JSON.stringify(charactersData));
}

characterImages.forEach(img => {
    img.addEventListener("click", () => {
        selectCharacter(img.getAttribute("src"));
    });
});

let userName = localStorage.getItem("username");
if (userName) {
    showHeader();
    hideRegistrationSection();
    showHomePageSection();

    const selectedCharacter = charactersData.find(char => char.selected);
    if (selectedCharacter) {
        addSelectedCharacter(selectedCharacter);
    } else {
        alert("Ни один персонаж не выбран");
    }

    nameSpan.textContent = `Player Name: ${userName}`;
    nameInput.value = userName;
}

function selectCharacter(src) {
    charactersData = charactersData.map(char => ({
        ...char,
        selected: char.src === src
    }));
    saveCharactersData();
}

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

    // if we have selected character then start playing
    // if not then we need to choose one from the list
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
        const imgSrc = e.target.getAttribute("src");
        selectCharacter(imgSrc);

        const selectedCharacter = charactersData.find(char => char.selected);
        addSelectedCharacter(selectedCharacter);

        characterSelectSection.classList.add("hidden");
    }
}

function addSelectedCharacter(imgObject) {
    const selectedImg = document.createElement("img");
    selectedImg.src = imgObject.src;
    selectedImg.classList.add("character");

    const titleText = document.createElement("p");
    titleText.textContent = "Selected character:";
    titleText.classList.add("title-text");

    selectedCharacter.innerHTML = "";
    selectedCharacter.appendChild(titleText);
    addWinsLossesText(imgObject.wins, imgObject.losses);
    selectedCharacter.appendChild(selectedImg);

    selectedImg.addEventListener("click", () => {
        selectedCharacter.innerHTML = "";
        characterSelectSection.classList.remove("hidden");

        charactersData = charactersData.map(char => ({
            ...char,
            selected: false
        }));

        saveCharactersData();
    });
}

function addWinsLossesText(wins, losses) {
    const statsDiv = document.createElement("div");
    statsDiv.classList.add("stats");

    const winsSpan = document.createElement("span");
    winsSpan.classList.add("wins");
    winsSpan.textContent = `Wins: ${wins}`;

    const separator = document.createTextNode(" | ");

    const lossesSpan = document.createElement("span");
    lossesSpan.classList.add("losses");
    lossesSpan.textContent = `Losses: ${losses}`;

    statsDiv.appendChild(winsSpan);
    statsDiv.appendChild(separator);
    statsDiv.appendChild(lossesSpan);

    selectedCharacter.appendChild(statsDiv);
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

    const selectedCharacter = charactersData.find(char => char.selected);
    if (selectedCharacter) {
        characterSelectSection.classList.add("hidden");
        addSelectedCharacter(selectedCharacter);
    } else {
        characterSelectSection.classList.remove("hidden");
    }
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