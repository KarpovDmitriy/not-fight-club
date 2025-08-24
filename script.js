function addCharacterName(e){
    e.preventDefault();

    let name = document.getElementById("character-name").value;
    let test = `${name}`;
    document.getElementById("welcome-message").innerHTML = test;
}


document.getElementById("add-name-button").addEventListener("click", addCharacterName);