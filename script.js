// Fight zone elements:
let player = {
    name: localStorage.getItem("username") || "Player",
    health: 150,
    baseDamage: 15,
    critChance: 0.25,
    critMultiplier: 1.5
};

let enemy = null;

const zones = ["Head", "Neck", "Body", "Belly", "Legs"];
const battleLogs = [];

const playerNameEl = document.querySelector(".player-name");
const playerImgEl = document.querySelector(".player-img");
const playerHealthEl = document.querySelector(".player-health");
const enemyNameEl = document.querySelector(".enemy-name");
const enemyImgEl = document.querySelector(".enemy-img");
const enemyHealthEl = document.querySelector(".enemy-health");
const attackRadios = document.querySelectorAll('input[name="attack"]');
const defenseCheckboxes = document.querySelectorAll('input[name="defense"]');
let gameOver = false;

const attackButton = document.querySelector(".attack-button");
const newGameButton = document.querySelector(".new-game-button");
const resultMessageEl = document.querySelector(".result-message");
const logList = document.querySelector(".log-list");

const enemyImages = [
    { src: "assets/img/buffalo.png", name: "Buffalo", attackZonesCount: 1, defenseZonesCount: 2, baseDamage: 15 },
    { src: "assets/img/dwarf.png", name: "Dwarf", attackZonesCount: 2, defenseZonesCount: 1, baseDamage: 10 },
    { src: "assets/img/punisher.png", name: "Punisher", attackZonesCount: 3, defenseZonesCount: 1, baseDamage: 8 }
];

// Other sections elements
const characterList = document.querySelector(".character-list");
const selectedCharacter = document.querySelector(".selected-character");
const characterSelectSection = document.querySelector(".character-select");
const welcomeSection = document.getElementById("welcome-message");
const nameSpan = document.querySelector(".settings-player-name");
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

let userName = localStorage.getItem("username");
if (userName) {
    hideRegistrationSection();
    showHeader();
    showHomePageSection();

    nameSpan.textContent = `Player Name: ${userName}`;
    nameInput.value = userName;
}

characterImages.forEach(img => {
    img.addEventListener("click", () => {
        selectCharacter(img.getAttribute("src"));
    });
});

function selectCharacter(src) {
    charactersData = charactersData.map(char => ({
        ...char,
        selected: char.src === src
    }));
    saveCharactersData();
}

function saveCharactersData() {
    localStorage.setItem("characters", JSON.stringify(charactersData));
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

    const selectedCharacter = charactersData.find(char => char.selected);
    if (selectedCharacter) {
        hideHomePageSection();
        playerImgEl.src = selectedCharacter.src;
        playerNameEl.textContent = localStorage.getItem("username");
        player.name = localStorage.getItem("username");
        document.querySelector(".battle-section").style.display = "flex";
    } else {
        alert("Select your character!");
    }
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

        const actualCharacterData = JSON.parse(localStorage.getItem("characters"));
        const selectedCharacter = actualCharacterData.find(char => char.selected);
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

        const actualCharactersData = JSON.parse(localStorage.getItem("characters"));

        charactersData = actualCharactersData.map(char => ({
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
    document.querySelector(".battle-section").style.display = "none";
    showHomePageSection();
}

function openCharacter(e) {
    e.preventDefault();
    welcomeSection.innerText = "Character";

    hideRegistrationSection();
    hideHomePageSection();
    hideSettingsSection();
    document.querySelector(".battle-section").style.display = "none";

    showCharacterSection();

    const actualCharacterData = JSON.parse(localStorage.getItem("characters"));
    const selectedCharacter = actualCharacterData.find(char => char.selected);
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
    document.querySelector(".battle-section").style.display = "none";

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

function showBattleSection() {
    const fightSection = document.querySelector(".battle-section");
    fightSection.classList.remove("hidden");
}

function hideBattleSection() {
    const fightSection = document.querySelector(".battle-section");
    fightSection.classList.add("hidden");
}


function capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}

function pickRandomEnemy() {
    const randomIndex = Math.floor(Math.random() * enemyImages.length);
    const picked = enemyImages[randomIndex];
    enemy = {
        name: picked.name,
        src: picked.src,
        health: 150,
        baseDamage: picked.baseDamage,
        critChance: 0.18,
        critMultiplier: 1.5,
        attackZonesCount: picked.attackZonesCount,
        defenseZonesCount: picked.defenseZonesCount
    };
}

function getRandomZones(count) {
    const shuffled = [...zones].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
}

function calculateDamage(attacker, defender, attackZones, defenseZones) {
    let totalDamage = 0;
    const logs = [];
    attackZones.forEach(zone => {
        const isBlocked = defenseZones.includes(zone);
        const isCrit = Math.random() < attacker.critChance;
        let damage = 0;
        if (isBlocked) damage = isCrit ? attacker.baseDamage * attacker.critMultiplier : 0;
        else damage = isCrit ? attacker.baseDamage * attacker.critMultiplier : attacker.baseDamage;
        totalDamage += damage;
        logs.push({
            attacker: attacker.name,
            defender: defender.name,
            zone,
            damage: Math.round(damage),
            crit: isCrit
        });
    });
    return { totalDamage, logs };
}

function updateHealthBars() {
    const playerPercent = Math.max(0, player.health) / 150 * 100;
    const enemyPercent = Math.max(0, enemy.health) / 150 * 100;

    let playerColor = playerPercent < 30 ? "darkred" : "red";
    let enemyColor = enemyPercent < 30 ? "darkred" : "red";

    playerHealthEl.innerHTML = `<div class="player-health-fill" style="width: ${playerPercent}%; background-color: ${playerColor}">${Math.max(0, player.health)}/150</div>`;
    enemyHealthEl.innerHTML = `<div class="enemy-health-fill" style="width: ${enemyPercent}%; background-color: ${enemyColor}">${Math.max(0, enemy.health)}/150</div>`;
}

function renderBattleLogs() {
    logList.innerHTML = "";

    battleLogs.forEach(entry => {
        const p = document.createElement("p");
        const attackerColor = entry.attacker === player.name ? "green" : "red";
        const defenderColor = entry.defender === player.name ? "green" : "red";
        const damageColor = "blue";
        const zoneColor = "blue";

        if (entry.crit) {
            p.innerHTML = `<span style="color:${attackerColor}; font-weight:bold">${entry.attacker.toUpperCase()}</span> attacked 
                <span style="color:${defenderColor}; font-weight:bold">${entry.defender.toUpperCase()}</span> in 
                <span style="color:${zoneColor}">${entry.zone.toUpperCase()}</span> and dealt 
                <span style="color:${damageColor}; font-weight:bold">${entry.damage}</span> damage <strong>(CRIT!)</strong>`;
        } else {
            p.innerHTML = `<span style="color:${attackerColor}; font-weight:bold">${entry.attacker.toUpperCase()}</span> attacked 
                <span style="color:${defenderColor}; font-weight:bold">${entry.defender.toUpperCase()}</span> in 
                <span style="color:${zoneColor}">${entry.zone.toUpperCase()}</span> and dealt 
                <span style="color:${damageColor}">${entry.damage}</span> damage`;
        }

        logList.appendChild(p);
    });
    logList.scrollTop = logList.scrollHeight;
}

function saveBattleState() {
    localStorage.setItem("battleState", JSON.stringify({
        player,
        enemy,
        battleLogs,
        gameOver,
        resultMessage: resultMessageEl?.textContent || ""
    }));
}

function loadBattleState() {
    const state = JSON.parse(localStorage.getItem("battleState"));
    if (state) {
        player = state.player;
        enemy = state.enemy;
        battleLogs.push(...state.battleLogs);
    }
}

function initBattle() {
    const savedState = JSON.parse(localStorage.getItem("battleState"));

    if (savedState && savedState.enemy) {
        enemy = savedState.enemy;
    } else {
        pickRandomEnemy();
    }

    enemyImgEl.src = enemy.src;
    enemyNameEl.innerText = enemy.name;
    playerNameEl.innerText = player.name;

    const selectedCharacter = charactersData.find(char => char.selected);

    if (selectedCharacter) {
        playerImgEl.src = selectedCharacter.src;
    }

    updateHealthBars();
    renderBattleLogs();
}

function checkZonesSelection() {
    if (gameOver) {
        attackButton.disabled = true;
        return;
    }
    const attackSelected = document.querySelector('input[name="attack"]:checked');
    const defenseSelected = document.querySelectorAll('input[name="defense"]:checked');
    attackButton.disabled = !(attackSelected && defenseSelected.length === 2);
}

function attackHandler() {
    if (gameOver) return;

    const playerAttack = [document.querySelector('input[name="attack"]:checked').value];
    const playerDefense = Array.from(document.querySelectorAll('input[name="defense"]:checked')).map(el => el.value);

    const enemyAttack = getRandomZones(enemy.attackZonesCount);
    const enemyDefense = getRandomZones(enemy.defenseZonesCount);

    const playerResult = calculateDamage(player, enemy, playerAttack, enemyDefense);
    const enemyResult = calculateDamage(enemy, player, enemyAttack, playerDefense);

    player.health = Math.max(0, player.health - enemyResult.totalDamage);
    enemy.health = Math.max(0, enemy.health - playerResult.totalDamage);

    battleLogs.push(...playerResult.logs, ...enemyResult.logs);

    updateHealthBars();
    renderBattleLogs();

    if (enemy.health <= 0 && player.health <= 0) {
        endBattle("draw");
    } else if (enemy.health <= 0) {
        endBattle("win");
    } else if (player.health <= 0) {
        endBattle("lose");
    } else {
        saveBattleState();
    }

    checkZonesSelection();
}

function endBattle(result) {
    gameOver = true;
    attackButton.disabled = true;

    let msg = "";
    if (result === "win") msg = "Victory! You win!";
    if (result === "lose") msg = "Defeat! You lose!";
    if (result === "draw") msg = "Draw!";

    resultMessageEl.textContent = msg;
    resultMessageEl.classList.remove("win", "lose", "draw");
    resultMessageEl.classList.add(result);

    if (result === "win" || result === "lose") {
        try {
            const raw = localStorage.getItem("characters");
            if (raw) {
                const list = JSON.parse(raw);
                const idx = list.findIndex(c => c.selected === true);
                if (idx !== -1) {
                    if (result === "win") list[idx].wins = (list[idx].wins || 0) + 1;
                    if (result === "lose") list[idx].losses = (list[idx].losses || 0) + 1;
                    localStorage.setItem("characters", JSON.stringify(list));
                }
            }
        } catch (e) {
            console.warn("Failed to update charactersData:", e);
        }
    }

    saveBattleState();
}


attackRadios.forEach(r => r.addEventListener("change", checkZonesSelection));
defenseCheckboxes.forEach(c => c.addEventListener("change", checkZonesSelection));
attackButton.addEventListener("click", attackHandler);

loadBattleState();
initBattle();


function resetBattle() {
    gameOver = false;
    resultMessageEl.textContent = "";
    resultMessageEl.classList.remove("win", "lose", "draw");

    player.health = 150;
    enemy.health = 150;

    pickRandomEnemy();
    enemyImgEl.src = enemy.src;
    enemyNameEl.textContent = enemy.name;

    battleLogs.length = 0;
    renderBattleLogs();
    updateHealthBars();

    const checkedAttack = document.querySelector('input[name="attack"]:checked');
    if (checkedAttack) checkedAttack.checked = false;
    document.querySelectorAll('input[name="defense"]:checked').forEach(cb => cb.checked = false);

    checkZonesSelection();
    saveBattleState();
}

newGameButton.addEventListener("click", resetBattle);